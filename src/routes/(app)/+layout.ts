import { db } from '$lib/idb/idb';
import { jsrwrap } from '$lib/reddit/reddit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const me = await db.get('redditOauthMe', 'reddit');
	const loggedIn = Boolean(me);
	let subscribedSubs;
	if (loggedIn) {
		subscribedSubs = jsrwrap.getMe().getSubscribedSubreddits();
	}

	return { loggedIn, subscribedSubs, me };
};
