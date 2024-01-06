import type { PageLoad } from './$types';
import { jsrwrap } from '$lib/reddit/reddit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache: any = {
	has: (s: URL) => {
		s;
	}
};

export const load: PageLoad = async ({ url }) => {
	if (cache.has(url)) {
		// load data from cache
	}

	const games = jsrwrap.getSubreddit('games');
	const submissions = await games.getSubmissions({ sort: 'hot' });

	return { submissions };
};
