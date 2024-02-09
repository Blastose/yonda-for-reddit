import type { LayoutLoad } from './$types';
import { jsrwrap, type RedditError } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ params }) => {
	const subreddit = params.subreddit;
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
		try {
			about = await jsrwrapSubreddit.getAbout();
		} catch (e) {
			const err = e as RedditError;
			if (err.reason === 'banned') {
				error(404, { code: 404, message: 'SR not found', type: 'subreddit', reason: 'banned' });
			}
			error(404, { code: 404, message: 'SR not found', type: 'subreddit' });
		}
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
		sidebarPromise = jsrwrapSubreddit.getWidgets();
	}

	return { about, sidebarPromise, moderators };
};
