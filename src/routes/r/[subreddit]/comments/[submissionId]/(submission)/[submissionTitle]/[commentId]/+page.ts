import type { Sort } from 'jsrwrap/types';
import type { PageLoad } from './$types';
import { jsrwrap } from '$lib/reddit/reddit';

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

	let submission;
	if (sort) {
		submission = jsrwrap.getSubmission(submissionId).fetch({ sort, ...options });
	} else {
		submission = jsrwrap.getSubmission(submissionId).fetch({ ...options });
	}

	return {
		submission
	};
};
