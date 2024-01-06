import type { LayoutLoad } from './$types';
import { jsrwrap } from '$lib/reddit/reddit';

export const load: LayoutLoad = async ({ params }) => {
	const submissionId = params.submissionId;
	const submission = jsrwrap.getSubmission(submissionId).fetch();

	return {
		submission
	};
};
