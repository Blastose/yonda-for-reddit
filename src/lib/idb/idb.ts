import { browser } from '$app/environment';
import type { SubmissionFull } from '$lib/reddit/reddit';
import { openDB, type DBSchema } from 'idb';
import type { SubmissionData, SubredditData } from 'jsrwrap/types';

interface MyDB extends DBSchema {
	sub: {
		value: {
			name: string;
			price: number;
			productCode: string;
		};
		key: number;
	};
	subreddit: {
		value: SubmissionFull;
		key: number;
	};
	subredditv2: {
		value: SubmissionFull;
		key: string;
	};
	submissions: {
		value: SubmissionData[];
		key: string;
	};
	submissionCommentCount: {
		value: number;
		key: string;
	};
	subredditAbout: {
		value: {
			cached: number;
			value: SubredditData;
		};
		key: string;
	};
}

// For some reason, browser is false, which means idb is undefined when it first loads or something
// but, whenever we use db, it is always in the browser so we can assert that it
// is not null
export const db = (browser
	? await openDB<MyDB>('dokusha', 1, {
			upgrade(db) {
				db.createObjectStore('sub', { autoIncrement: true });
				db.createObjectStore('subreddit', { autoIncrement: true });
				db.createObjectStore('subredditv2');
				db.createObjectStore('submissionCommentCount');
				db.createObjectStore('submissions');
				db.createObjectStore('subredditAbout');
			}
		})
	: null) as unknown as Awaited<ReturnType<typeof openDB<MyDB>>>;
