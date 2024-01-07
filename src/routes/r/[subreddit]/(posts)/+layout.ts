import type { LayoutLoad } from './$types';
import { jsrwrap } from '$lib/reddit/reddit';
import type { SubmissionData } from 'jsrwrap/types';

export const load: LayoutLoad = async ({ params, url }) => {
	const subreddit = params.subreddit;
	const jsrwrapSubreddit = jsrwrap.getSubreddit(subreddit);

	const submissionsMaybe = localStorage.getItem(url.pathname + url.search);
	if (submissionsMaybe) {
		const submissions = JSON.parse(submissionsMaybe) as SubmissionData[];
		return { submissions };
	}
	const submissions = jsrwrapSubreddit.getSubmissions({ sort: 'hot' });

	return { submissions };
};
