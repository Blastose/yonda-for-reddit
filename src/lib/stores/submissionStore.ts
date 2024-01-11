import { writable } from 'svelte/store';
import type { SubmissionData } from 'jsrwrap/types';

export const submissionStore = writable<{ url: string; submission: SubmissionData } | null>(null);

export function setSubmissionStore(url: string, submission: SubmissionData) {
	submissionStore.set({ url, submission });
}

export function submissionStoreClick(
	node: HTMLElement,
	data: { url: string; submission: SubmissionData }
) {
	function handleClick() {
		submissionStore.set(data);
	}
	node.addEventListener('click', handleClick);

	return {
		destroy() {
			node.removeEventListener('click', handleClick);
		}
	};
}
