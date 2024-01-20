import { db } from '$lib/idb/idb';
import { jsrwrap } from '$lib/reddit/reddit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const loggedIn = Boolean(await db.get('redditOauth', 'reddit'));
	let subscribedSubs;
	if (loggedIn) {
		subscribedSubs = jsrwrap.getMe().getSubscribedSubreddits();
	}

	return { loggedIn, subscribedSubs };
};
