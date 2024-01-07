import type { LayoutLoad } from './$types';
import { jsrwrap } from '$lib/reddit/reddit';
import { db } from '$lib/idb/idb';
import { transformUrlForIDBKey } from '$lib/url/url';

export const load: LayoutLoad = async ({ params, url }) => {
	const submissionId = params.submissionId;
	const maybeSubmission = await db.get('subredditv2', transformUrlForIDBKey(url));
	if (maybeSubmission) {
		return {
			submission: maybeSubmission
		};
	}
	const submission = jsrwrap.getSubmission(submissionId).fetch();
	console.log(db);
	const res = await db.get('sub', 1);
	console.log(res);
	await db.put('sub', { name: 'pringles', price: 1, productCode: 'p' }, 1);
	await db.add('subreddit', await submission);
	await db.put('subredditv2', await submission, transformUrlForIDBKey(url));
	console.log(await db.get('subreddit', 1));

	return {
		submission
	};
};
