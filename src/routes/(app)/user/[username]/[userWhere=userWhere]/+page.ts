import { jsrwrap } from '$lib/reddit/reddit';
import type { PageLoad } from './$types';

import type { UserSortOptions, UserTOptions } from 'jsrwrap';

export const load: PageLoad = async ({ params, url }) => {
	const username = params.username;
	const jsrwrapUser = jsrwrap.getUser(username);
	const where = params.userWhere;

	const sort = url.searchParams.get('sort') as UserSortOptions | undefined;
	const t = url.searchParams.get('t') as UserTOptions | undefined;
	const before = url.searchParams.get('before') as string | undefined;
	const after = url.searchParams.get('after') as string | undefined;
	const count = Number(url.searchParams.get('count')) || undefined;

	const options = { sort, t, before, after, count };

	let creations;
	if (where === 'comments') {
		creations = jsrwrapUser.getComments(options);
	} else if (where === 'submitted') {
		creations = jsrwrapUser.getSubmitted(options);
	} else {
		// TODO implement saved/hidden/upvoted/downvoted
		creations = jsrwrapUser.getOverview(options);
	}

	return {
		creations: await creations,
		count, 
		where
	};
};
