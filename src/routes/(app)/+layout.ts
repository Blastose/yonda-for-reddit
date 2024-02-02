import { db } from '$lib/idb/idb';
import { jsrwrap } from '$lib/reddit/reddit';
import { loggedInStore } from '$lib/stores/loggedInStore';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const me = await db.get('redditOauthMe', 'reddit');
	const loggedIn = Boolean(me);
	let subscribedSubs;
	if (loggedIn) {
		const now = new Date().getTime();
		const subscribedSubsMaybe = await db.get('subscribedSubreddits', 'reddit');
		if (subscribedSubsMaybe && now < subscribedSubsMaybe.cached + 360000) {
			subscribedSubs = subscribedSubsMaybe.value;
		} else {
			subscribedSubs = jsrwrap.getMe().getSubscribedSubreddits();
		}
		loggedInStore.set(true);
	} else {
		loggedInStore.set(false);
	}

	return { loggedIn, subscribedSubs, me };
};
