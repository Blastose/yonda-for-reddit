import { jsrwrap } from '$lib/reddit/reddit';
import type { PageLoad } from './$types';

import type { UserSortOptions, UserTOptions } from 'jsrwrap';

export const load: PageLoad = async ({ params, url }) => {
	const username = params.username;
	const jsrwrapUser = jsrwrap.getUser(username);

	const sort = url.searchParams.get('sort') as UserSortOptions | undefined;
	const t = url.searchParams.get('t') as UserTOptions | undefined;
	const before = url.searchParams.get('before') as string | undefined;
	const after = url.searchParams.get('after') as string | undefined;

	const options = { sort, t, before, after };

	const overview = jsrwrapUser.getOverview(options);

	return {
		overview
	};
};
