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
			sidebarPromise: null
		};
	}

	const now = new Date().getTime();
	const sidebarPromise = jsrwrapSubreddit.getSidebar();
	const aboutMaybe = await db.get('subredditAbout', subreddit.toLowerCase());
	if (aboutMaybe && now < aboutMaybe.cached + 86400000) {
		return { about: aboutMaybe.value, sidebarPromise };
	}
	const about = await jsrwrapSubreddit.getAbout();
	db.put('subredditAbout', { value: about, cached: new Date().getTime() }, subreddit.toLowerCase());

	return { about, sidebarPromise };
};
