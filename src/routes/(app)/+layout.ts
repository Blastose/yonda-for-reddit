import { db } from '$lib/idb/idb';
import { jsrwrap } from '$lib/reddit/reddit';
import { loggedInStore } from '$lib/stores/loggedInStore';
import { subscribedSubsStore } from '$lib/stores/subscribedSubsStore';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const me = await db.get('redditOauthMe', 'reddit');
	const loggedIn = Boolean(me);
	let subscribedSubs;
	if (loggedIn) {
		const now = new Date().getTime();

		const st = get(subscribedSubsStore);
		if (st && now < st.cached + 360000) {
			subscribedSubs = st.value;
		} else {
			subscribedSubs = jsrwrap.getMe().getSubscribedSubreddits();
		}

		if (me) {
			loggedInStore.set(me.name);
		}
	} else {
		loggedInStore.set(null);
	}

	return { loggedIn, subscribedSubs, me };
};
