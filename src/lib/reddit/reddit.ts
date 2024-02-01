import { browser, dev } from '$app/environment';
import { PUBLIC_CLIENT_ID } from '$env/static/public';
import { db } from '$lib/idb/idb';
import { lsdb } from '$lib/idb/ls';
import { Jsrwrap, Submission, Subreddit, User } from 'jsrwrap';
import type { SubredditData } from 'jsrwrap/types';

export const redirectUri = dev
	? 'http://localhost:5173/auth'
	: 'https://yonda-for-reddit.vercel.app/auth';

async function createJsrwrap() {
	const oauth = await db?.get('redditOauth', 'reddit');
	let jsrwrap;
	if (
		oauth &&
		((oauth.expires && oauth.expires > new Date().getTime() / 1000) || Boolean(oauth?.refreshToken))
	) {
		jsrwrap = await Jsrwrap.fromAccessAndRefreshToken({
			clientId: PUBLIC_CLIENT_ID,
			clientSecret: '',
			grantType: 'https://oauth.reddit.com/grants/installed_client',
			userAgent: 'web:yonda-for-reddit:0.1.0 (by /u/blastose)',
			deviceId: 'DO_NOT_TRACK_THIS_DEVICE',
			refreshToken: oauth.refreshToken,
			accessToken: oauth.accessToken,
			expiresIn: oauth.expires ?? new Date().getTime() / 1000 + 3600
		});
	} else {
		if (oauth && oauth.expires && oauth.expires > new Date().getTime() / 1000) {
			jsrwrap = await Jsrwrap.fromApplicationOnlyAuth({
				clientId: PUBLIC_CLIENT_ID,
				clientSecret: '',
				grantType: 'https://oauth.reddit.com/grants/installed_client',
				userAgent: 'web:yonda-for-reddit:0.1.0 (by /u/blastose)',
				deviceId: 'DO_NOT_TRACK_THIS_DEVICE',
				existingAccessToken: {
					accessToken: oauth.accessToken,
					expires: oauth.expires
				}
			});
		} else {
			jsrwrap = await Jsrwrap.fromApplicationOnlyAuth({
				clientId: PUBLIC_CLIENT_ID,
				clientSecret: '',
				grantType: 'https://oauth.reddit.com/grants/installed_client',
				userAgent: 'web:yonda-for-reddit:0.1.0 (by /u/blastose)',
				deviceId: 'DO_NOT_TRACK_THIS_DEVICE'
			});
		}
	}
	if (jsrwrap.expires && jsrwrap.expires < new Date().getTime() / 1000) {
		await jsrwrap.refreshAccessToken();
	}
	if (browser) {
		await db.put(
			'redditOauth',
			{
				accessToken: jsrwrap.accessToken,
				refreshToken: jsrwrap.refreshToken,
				expires: jsrwrap.expires
			},
			'reddit'
		);
	}

	return jsrwrap;
}

const jsrwrap = await createJsrwrap();
function createAuthUrl() {
	const state = crypto.randomUUID();
	lsdb.set('state', state);
	return Jsrwrap.createAuthUrl({
		clientId: PUBLIC_CLIENT_ID,
		duration: 'permanent',
		redirectUri: redirectUri,
		scope: ['*'],
		state: state,
		responseType: 'code'
	});
}

if (browser) {
	setInterval(async () => {
		await db.put(
			'redditOauth',
			{
				accessToken: jsrwrap.accessToken,
				refreshToken: jsrwrap.refreshToken,
				expires: jsrwrap.expires
			},
			'reddit'
		);
	}, 600000);
}
async function logout() {
	// await clearIdb();
	await jsrwrap.revokeToken({
		token: jsrwrap.refreshToken ?? '',
		type: 'refresh_token'
	});
	await db.clear('redditOauth');
	await db.clear('subscribedSubreddits');
	await db.clear('redditOauthMe');
	window.location.href = '/';
}

async function login(code: string, state: string) {
	try {
		if (state !== lsdb.get('state')) {
			throw new Error('Invalid state');
		}
		const jsrwarpLoggedIn = await Jsrwrap.fromAuthCode({
			clientId: PUBLIC_CLIENT_ID,
			clientSecret: '',
			code,
			redirectUri: redirectUri,
			userAgent: 'web:yonda-for-reddit:0.1.0 (by /u/blastose)'
		});
		jsrwrap.accessToken = jsrwarpLoggedIn.accessToken;
		jsrwrap.refreshToken = jsrwarpLoggedIn.refreshToken;
		jsrwrap.expires = jsrwarpLoggedIn.expires;
		// await clearIdb();
		const me = await jsrwrap.getMe().getMe();
		await db.put('redditOauthMe', me, 'reddit');
		await db.put(
			'redditOauth',
			{
				accessToken: jsrwrap.accessToken,
				refreshToken: jsrwrap.refreshToken!,
				expires: jsrwrap.expires
			},
			'reddit'
		);
		lsdb.remove('state');
	} catch (e) {
		console.log(e);
	}
}

export { jsrwrap, createAuthUrl, logout, login };

// TODO export these from jsrwrap
export type SubredditSort = 'top' | 'new' | 'controversial' | 'hot' | 'best' | 'rising';
export type Time = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
export type SubmissionFull = Awaited<ReturnType<Submission['fetch']>>;
export type Moderators = Awaited<ReturnType<Subreddit['getModerators']>>;
export type PinnedSubreddit = Pick<SubredditData, 'display_name_prefixed'> &
	Partial<Pick<SubredditData, 'community_icon'>> & {
		url: string;
		order: number;
	};
export type UserCreation = Awaited<ReturnType<User['getOverview']>>['data'][number];
export type UserCreationFull = Awaited<ReturnType<User['getOverview']>>;
export type SubmissionDataFull = Awaited<ReturnType<Subreddit['getSubmissions']>>;

export function getRedditPagination<SortT, T>(
	url: URL,
	defaults?: { defaultSort?: SortT; defaultT?: T }
) {
	const sort = (url.searchParams.get('sort') ?? defaults?.defaultSort ?? undefined) as
		| SortT
		| undefined;
	const t = (url.searchParams.get('t') ?? defaults?.defaultT ?? undefined) as T | undefined;
	const before = (url.searchParams.get('before') ?? undefined) as string | undefined;
	const after = (url.searchParams.get('after') ?? undefined) as string | undefined;
	const count = Number(url.searchParams.get('count')) || undefined;
	const options = { sort, t, before, after, count };
	return options;
}
