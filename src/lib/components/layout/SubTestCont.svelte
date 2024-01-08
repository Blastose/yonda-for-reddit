<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import SubTest from './SubTest.svelte';
	import InfiniteScrolling from './InfiniteScrolling.svelte';
	import { jsrwrap } from '$lib/reddit/reddit';
	import { db } from '$lib/idb/idb';
	import { page } from '$app/stores';
	import { transformUrlForIDBKey } from '$lib/url/url';

	export let subreddit: string;
	export let submissions: SubmissionData[];

	$: lastPostId = submissions.at(submissions.length - 1)?.id || null;

	async function getMoreSubmissions() {
		const jsrwrapSubreddit = jsrwrap.getSubreddit(subreddit);
		const res = await jsrwrapSubreddit.getSubmissions({
			sort: 'hot',
			params: {
				after: `t3_${lastPostId}` ?? '',
				t: 'day'
			}
		});
		// lastPostId = res.at(res.length - 1)?.id || null;
		return res;
	}

	async function onSuccess() {
		await db.put('submissions', submissions, transformUrlForIDBKey($page.url));
	}
</script>

{lastPostId}
<SubTest {submissions} />
<InfiniteScrolling bind:results={submissions} fetchMoreResults={getMoreSubmissions} {onSuccess} />
