import type { PageLoad } from './$types';
import { jsrwrap } from '$lib/reddit/reddit';

export const load: PageLoad = async () => {
	const games = jsrwrap.getSubreddit('games');
	const submissions = await games.getSubmissions({ sort: 'hot' });

	return { submissions };
};
