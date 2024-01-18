import { PUBLIC_CLIENT_ID } from '$env/static/public';
import { PUBLIC_CLIENT_SECRET } from '$env/static/public';
import { Jsrwrap, Submission } from 'jsrwrap';
import type { SubredditData } from 'jsrwrap/types';

const jsrwrap = await Jsrwrap.fromApplicationOnlyAuth({
	clientId: PUBLIC_CLIENT_ID,
	clientSecret: PUBLIC_CLIENT_SECRET,
	grantType: 'client_credentials',
	userAgent: 'web:dokusha-for-reddit:0.1.0 (by /u/blastose)'
});

export { jsrwrap };

// TODO export these from jsrwrap
export type SubredditSort = 'top' | 'new' | 'controversial' | 'hot' | 'best' | 'rising';
export type Time = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
export type SubmissionFull = Awaited<ReturnType<Submission['fetch']>>;

export type PinnedSubreddit = Pick<SubredditData, 'display_name_prefixed'> &
	Partial<Pick<SubredditData, 'community_icon'>> & {
		url: string;
		order: number;
	};
