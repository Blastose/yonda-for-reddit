import type { Sort } from 'jsrwrap/types';
import type { PageLoad } from './$types';
import { jsrwrap } from '$lib/reddit/reddit';
import { navigationTypeStore } from '$lib/stores/navigationTypeStore';
import { get } from 'svelte/store';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';

export const load: PageLoad = async ({ params, url }) => {
	const submissionId = params.submissionId;
	const commentId = params.commentId;
	const sort = (url.searchParams.get('sort') ?? undefined) as Sort | undefined;
	const context = Number(url.searchParams.get('context')) || undefined;
	const depth = Number(url.searchParams.get('depth')) || undefined;

	const options = {
		context,
		depth,
		comment: commentId
	};

	if (get(navigationTypeStore) === 'bfbutton') {
		const maybeSubmission = await db.get('submission', transformUrlForIDBKey(url));
		if (maybeSubmission) {
			return {
				submissionSingleComment: maybeSubmission,
				sort
			};
		}
	}

	let submissionSingleComment;
	if (sort) {
		submissionSingleComment = jsrwrap.getSubmission(submissionId).fetch({ sort, ...options });
	} else {
		submissionSingleComment = jsrwrap.getSubmission(submissionId).fetch({ ...options });
	}

	return {
		submissionSingleComment
	};
};
