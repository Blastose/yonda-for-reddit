import type { LayoutLoad } from './$types';
import { jsrwrap } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';
import { navigationTypeStore } from '$lib/stores/navigationTypeStore';
import { get } from 'svelte/store';
import type { Sort } from 'jsrwrap/types';

export const load: LayoutLoad = async ({ params, url }) => {
	const submissionId = params.submissionId;
	const sort = (url.searchParams.get('sort') ?? undefined) as Sort | undefined;

	console.log(get(navigationTypeStore));
	// TODO we use url here, which will rerun in the commentId for single comment threads
	// fix somehow?
	const maybeSubmission = await db.get('submission', transformUrlForIDBKey(url));
	if (maybeSubmission) {
		return {
			submission: maybeSubmission,
			sort
		};
	}
	let submission;
	if (sort) {
		submission = jsrwrap.getSubmission(submissionId).fetch({ sort });
	} else {
		submission = jsrwrap.getSubmission(submissionId).fetch();
	}

	return {
		submission,
		sort
	};
};
