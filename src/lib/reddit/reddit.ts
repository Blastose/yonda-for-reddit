import { PUBLIC_CLIENT_ID } from '$env/static/public';
import { clearIdb, db } from '$lib/idb/idb';
import { Jsrwrap, Submission } from 'jsrwrap';
import type { SubredditData } from 'jsrwrap/types';

export const redirectUri = 'http://localhost:5173/auth';

async function createJsrwrap() {
	const oauth = await db?.get('redditOauth', 'reddit');
	const jsrwrap = await Jsrwrap.fromApplicationOnlyAuth({
		clientId: PUBLIC_CLIENT_ID,
		clientSecret: '',
		grantType: 'https://oauth.reddit.com/grants/installed_client',
		userAgent: 'web:yonda-for-reddit:0.1.0 (by /u/blastose)',
		deviceId: '63V92W6D11SI1HPZMYPS91ZV'
	});
	if (oauth) {
		jsrwrap.refreshToken = oauth.refreshToken;
		await jsrwrap.refreshAccessToken();
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

export { jsrwrap, createAuthUrl, logout };

// TODO export these from jsrwrap
export type SubredditSort = 'top' | 'new' | 'controversial' | 'hot' | 'best' | 'rising';
export type Time = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
export type SubmissionFull = Awaited<ReturnType<Submission['fetch']>>;

export type PinnedSubreddit = Pick<SubredditData, 'display_name_prefixed'> &
	Partial<Pick<SubredditData, 'community_icon'>> & {
		url: string;
		order: number;
	};
