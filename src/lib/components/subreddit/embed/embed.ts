import type { SubmissionData } from 'jsrwrap/types';

export type SubmissionType = 'image' | 'self' | 'gallery' | 'video' | 'link';

export function getSubmissionType(submission: SubmissionData): SubmissionType {
	if (
		submission.post_hint === 'image' ||
		submission.post_hint === 'self' ||
		submission.post_hint === 'link'
	) {
		return submission.post_hint;
	}
	if (submission.is_gallery) {
		return 'gallery';
	}
	if (submission.is_video) {
		return 'video';
	}
	if (
		submission.url.startsWith('https://www.youtube') ||
		submission.url.startsWith('https://youtube') ||
		submission.url.startsWith('https://youtu.be')
	) {
		return 'video';
	}

	return 'link';
}
