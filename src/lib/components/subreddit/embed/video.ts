import type { SubmissionData } from 'jsrwrap/types';

export function isRedditVideo(submission: SubmissionData) {
	if (!submission.is_video || !submission.media || !submission.media.reddit_video) return false;

	if (submission.post_hint !== 'hosted:video') return false;
	return true;
}

export function formatVideoTime(seconds: number) {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.round(seconds % 60);
	const t = [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s].filter(Boolean).join(':');
	return s < 0 && seconds ? `-${t}` : t;
}
