import { dev } from '$app/environment';
import { PUBLIC_CLIENT_ID } from '$env/static/public';
import { clearIdb, db } from '$lib/idb/idb';
import { Jsrwrap, Submission } from 'jsrwrap';
import type { SubredditData } from 'jsrwrap/types';

export const redirectUri = dev
	? 'http://localhost:5173/auth'
	: 'https://yonda-for-reddit.vercel.app';

async function createJsrwrap() {
	const oauth = await db?.get('redditOauth', 'reddit');
	let jsrwrap;
	if (oauth) {
		jsrwrap = await Jsrwrap.fromRefreshToken({
			clientId: PUBLIC_CLIENT_ID,
			clientSecret: '',
			grantType: 'https://oauth.reddit.com/grants/installed_client',
			userAgent: 'web:yonda-for-reddit:0.1.0 (by /u/blastose)',
			deviceId: '63V92W6D11SI1HPZMYPS91ZV',
			refreshToken: oauth.refreshToken
		});
	} else {
		jsrwrap = await Jsrwrap.fromApplicationOnlyAuth({
			clientId: PUBLIC_CLIENT_ID,
			clientSecret: '',
			grantType: 'https://oauth.reddit.com/grants/installed_client',
			userAgent: 'web:yonda-for-reddit:0.1.0 (by /u/blastose)',
			deviceId: '63V92W6D11SI1HPZMYPS91ZV'
		});
	}

	return jsrwrap;
}

const jsrwrap = await createJsrwrap();
function createAuthUrl() {
	return Jsrwrap.createAuthUrl({
		clientId: PUBLIC_CLIENT_ID,
		duration: 'permanent',
		redirectUri: redirectUri,
		scope: ['*'],
		state: 'state'
	});
}

async function logout() {
	// await clearIdb();
	await db.clear('redditOauth');
	window.location.href = '/';
}

async function login(code: string) {
	try {
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
		await db.put(
			'redditOauth',
			{
				accessToken: jsrwrap.accessToken,
				refreshToken: jsrwrap.refreshToken!
			},
			'reddit'
		);
	} catch (e) {
		console.log(e);
	}
}

export { jsrwrap, createAuthUrl, logout, login };

// TODO export these from jsrwrap
export type SubredditSort = 'top' | 'new' | 'controversial' | 'hot' | 'best' | 'rising';
export type Time = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
export type SubmissionFull = Awaited<ReturnType<Submission['fetch']>>;

export type PinnedSubreddit = Pick<SubredditData, 'display_name_prefixed'> &
	Partial<Pick<SubredditData, 'community_icon'>> & {
		url: string;
		order: number;
	};
