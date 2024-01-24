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
	if (submission.media?.type === 'youtube.com') {
		return 'video';
	}

	return 'self';
}

export function hasEmbed(submission: SubmissionData) {
	if (submission.post_hint === 'image') {
		return true;
	}
	if (submission.is_gallery) {
		return true;
	}
	if (submission.is_video) {
		return true;
	}
	if (submission.secure_media) {
		return true;
	}
	return false;
}
