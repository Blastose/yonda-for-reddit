import { persistedStore } from '$lib/idb/persistedStore';

export const displayTypes = ['card', 'classic'] as const;
export type SubmissionDisplayType = (typeof displayTypes)[number];

export const submissionDisplayStore = persistedStore<SubmissionDisplayType>(
	'submissionDisplay',
	'card',
	'local'
);
