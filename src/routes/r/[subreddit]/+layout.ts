import type { LayoutLoad } from './$types';
import { jsrwrap } from '$lib/reddit/reddit';

export const load: LayoutLoad = async ({ params }) => {
	const subreddit = params.subreddit;
	const jsrwrapSubreddit = jsrwrap.getSubreddit(subreddit);

	const about = await jsrwrapSubreddit.getAbout();
	const sidebar = await jsrwrapSubreddit.getSidebar();

	return { about, sidebar };
};
