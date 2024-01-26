import type { SubmissionData } from 'jsrwrap/types';

export function getSubmissionObfuscatedType(
	submission: SubmissionData
): 'nsfw' | 'spoiler' | 'none' {
	if (submission.over_18) {
		return 'nsfw';
	}
	if (submission.spoiler) {
		return 'spoiler';
	}
	return 'none';
}
