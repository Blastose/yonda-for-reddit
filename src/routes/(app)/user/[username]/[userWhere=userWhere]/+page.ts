import { getRedditPagination, jsrwrap } from '$lib/reddit/reddit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

import type { UserSortOptions, UserTOptions } from 'jsrwrap';
import { navigationTypeStore } from '$lib/stores/navigationTypeStore';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';

export const load: PageLoad = async ({ params, url }) => {
	const username = params.username;
	const jsrwrapUser = jsrwrap.getUser(username);
	const where = params.userWhere;

	const options = getRedditPagination<UserSortOptions, UserTOptions>(url);
	const count = options.count;

	let creations;

	if (get(navigationTypeStore) === 'bfbutton') {
		const creationsMaybe = await db.get('redditUserCreations', transformUrlForIDBKey(url));
		if (creationsMaybe) {
			creations = creationsMaybe;

			return {
				creations,
				count,
				where
			};
		}
	}

	if (where === 'comments') {
		creations = jsrwrapUser.getComments(options);
	} else if (where === 'submitted') {
		creations = jsrwrapUser.getSubmitted(options);
	} else if (where === 'saved' || where === 'hidden' || where==="upvoted" || where==="downvoted") {
		creations = jsrwrapUser.getWhere(where, options);
	} else {
		creations = jsrwrapUser.getOverview(options);
	}

	return {
		creations,
		count,
		where
	};
};
