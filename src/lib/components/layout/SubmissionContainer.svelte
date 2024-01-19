<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import Submission from './Submission.svelte';
	import InfiniteScrolling from './InfiniteScrolling.svelte';
	import { jsrwrap, type SubredditSort, type Time } from '$lib/reddit/reddit';
	import { db } from '$lib/idb/idb';
	import { page } from '$app/stores';
	import { transformUrlForIDBKey } from '$lib/url/url';

	export let subreddit: string;
	export let submissions: SubmissionData[];
	export let sort: SubredditSort;

	$: lastPostId = submissions.at(submissions.length - 1)?.id || null;

	async function getMoreSubmissions() {
		const jsrwrapSubreddit = jsrwrap.getSubreddit(subreddit);
		const res = await jsrwrapSubreddit.getSubmissions({
			sort,
			params: {
				after: `t3_${lastPostId}` ?? '',
				t: ($page.url.searchParams.get('t') ?? 'day') as Time
			}
		});
		lastPostId = res.at(res.length - 1)?.id || null;
		return res;
	}

	async function onSuccess() {
		await db.put('submissions', submissions, transformUrlForIDBKey($page.url));
	}
</script>

<Submission {submissions} />
<InfiniteScrolling bind:results={submissions} fetchMoreResults={getMoreSubmissions} {onSuccess} />
