import type { PageLoad } from './$types';
import { jsrwrap, redirectUri } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';
import { Jsrwrap } from 'jsrwrap';
import { PUBLIC_CLIENT_ID } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ url, parent }) => {
	await parent();
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	if (state && code) {
		try {
			console.log(code);
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
		redirect(303, '/');
	}

	const jsrwrapSubreddit = jsrwrap.getSubreddit();

	const submissionsMaybe = await db.get('submissions', transformUrlForIDBKey(url));

	if (submissionsMaybe) {
		const submissions = submissionsMaybe;
		return { submissions };
	}
	const submissions = jsrwrapSubreddit.getSubmissions({ sort: 'best' });

	return { submissions };
};
