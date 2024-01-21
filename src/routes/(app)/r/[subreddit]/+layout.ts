import type { LayoutLoad } from './$types';
import { jsrwrap } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';

export const load: LayoutLoad = async ({ params }) => {
	const subreddit = params.subreddit;
	console.log(subreddit);
	const jsrwrapSubreddit = jsrwrap.getSubreddit(subreddit);
	if (subreddit === 'all' || subreddit === 'popular') {
		return {
			about: null,
			sidebarPromise: null,
			moderators: null
		};
	}

	const now = new Date().getTime();
	let about;
	const aboutMaybe = await db.get('subredditAbout', subreddit.toLowerCase());
	let sidebarPromise;
	const sidebarMaybe = await db.get('subredditSidebar', subreddit.toLowerCase());
	if (aboutMaybe && now < aboutMaybe.cached + 86400000) {
		about = aboutMaybe.value;
	} else {
		about = await jsrwrapSubreddit.getAbout();
		db.put(
			'subredditAbout',
			{ value: about, cached: new Date().getTime() },
			subreddit.toLowerCase()
		);
	}
	let moderators = null;
	const moderatorsMaybe = await db.get('subredditModerators', subreddit.toLowerCase());
	if (moderatorsMaybe && now < moderatorsMaybe.cached + 360000) {
		moderators = moderatorsMaybe.value;
	} else {
		const loggedIn = Boolean(await db.get('redditOauthMe', 'reddit'));
		if (loggedIn) {
			moderators = jsrwrapSubreddit.getModerators();
		}
	}

	if (sidebarMaybe && now < sidebarMaybe.cached + 360000) {
		sidebarPromise = sidebarMaybe.value;
	} else {
		sidebarPromise = jsrwrapSubreddit.getSidebar();
	}

	return { about, sidebarPromise, moderators };
};