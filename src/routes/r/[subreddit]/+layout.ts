import type { LayoutLoad } from './$types';
import { jsrwrap } from '$lib/reddit/reddit';

export const load: LayoutLoad = async ({ params }) => {
	const subreddit = params.subreddit;
	const jsrwrapSubreddit = jsrwrap.getSubreddit(subreddit);

	const about = await jsrwrapSubreddit.getAbout();
	const sidebarPromise = jsrwrapSubreddit.getSidebar();

	return { about, sidebarPromise };
};
