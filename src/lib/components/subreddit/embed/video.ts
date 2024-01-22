import type { SubmissionData } from 'jsrwrap/types';

export function isRedditVideo(submission: SubmissionData) {
	if (!submission.is_video || !submission.media || !submission.media.reddit_video) return false;

	if (submission.post_hint !== 'hosted:video') return false;
	return true;
}

export function formatVideoTime(seconds: number) {
	if (typeof seconds !== 'number' || Number.isNaN(seconds)) {
		return '0:00';
	}

	let hours: string | number = Math.floor(seconds / 3600);
	let minutes: string | number = Math.floor((seconds % 3600) / 60);
	let newSeconds: string | number = seconds - hours * 3600 - minutes * 60;
	let time = '';

	if (hours > 0 && minutes < 10) {
		minutes = '0' + minutes;
	}
	if (hours > 0) {
		if (hours < 10) {
			hours = '0' + hours;
		}
		time += hours;
		time += ':';
	}
	time += minutes;
	time += ':';
	if (newSeconds < 10) {
		newSeconds = '0' + newSeconds;
	}
	time += newSeconds;
	return time;
}
