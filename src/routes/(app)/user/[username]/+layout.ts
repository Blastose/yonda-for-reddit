import { db } from '$lib/idb/idb';
import { jsrwrap, type RedditError } from '$lib/reddit/reddit';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const username = params.username;

	const user = jsrwrap.getUser(username);
	const now = new Date().getTime();

	let about;
	const userMaybe = await db.get('redditUser', username);
	if (userMaybe && now < userMaybe.cached + 86400000) {
		about = userMaybe.value;
	} else {
		try {
			about = await user.getAbout();
		} catch (e) {
			const err = e as RedditError;
			if (err.message == 'Forbidden') {
				error(404, { type: 'user', message: 'Banned', code: 404, reason: 'banned' });
			}
			error(404, { type: 'user', message: 'User not found', code: 404 });
		}

		db.put('redditUser', { cached: new Date().getTime(), value: about }, username);
	}

	const currentUser = await db.get('redditOauthMe', 'reddit');

	return {
		about,
		username,
		currentUser
	};
};
