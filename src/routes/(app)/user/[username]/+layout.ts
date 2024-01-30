import { db } from '$lib/idb/idb';
import { jsrwrap } from '$lib/reddit/reddit';
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
		about = await user.getAbout();

		db.put('redditUser', { cached: new Date().getTime(), value: about }, username);
	}

	return {
		about,
		username
	};
};
