import type { PageLoad } from './$types';
import { login } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';

export const load: PageLoad = async ({ url }) => {
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	if (state && code) {
		try {
			await login(code, state);
			const me = await db.get('redditOauthMe', 'reddit');
			if (me) {
				window.location.replace('/');
			}
		} catch (e) {
			console.log(e);
		}
	}
};
