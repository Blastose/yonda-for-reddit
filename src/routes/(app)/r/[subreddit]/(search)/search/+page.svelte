<script lang="ts">
	import { page } from '$app/stores';
	import { getFullUrl, transformUrlForIDBKey } from '$lib/url/url.js';
	import { db } from '$lib/idb/idb.js';
	import type { SubredditSort } from '$lib/reddit/reddit.js';
	import SubmissionSkeleton from '$lib/components/subreddit/SubmissionSkeleton.svelte';
	import Submission from '$lib/components/layout/Submission.svelte';
	import Pagination from '$lib/components/reddit/Pagination.svelte';
	import Sort from '$lib/components/search/Sort.svelte';
	import SortTime from '$lib/components/subreddit/SortTime.svelte';

	export let data;

	$: subreddit = $page.params.subreddit;
	$: {
		$page;
		(async () => {
			// const submissions = await data.submissions;
			// console.log(submissions);
			// await db.put('submissions', submissions, transformUrlForIDBKey($page.url));
		})();
	}

	$: sort = $page.url.searchParams.get('sort');
	$: q = $page.url.searchParams.get('q');
</script>

<svelte:head><title>Searching for {q} in r/{subreddit}</title></svelte:head>

<p>Searching {subreddit}</p>

<div class="flex gap-1">
	<Sort />
	{#if sort === 'top' || sort === 'relevance' || sort === 'comments'}
		<SortTime defaultSort="all" />
	{/if}
</div>

{#key getFullUrl($page.url)}
	{#await data.submissions}
		{#each { length: 5 } as _}
			<SubmissionSkeleton />
		{/each}
	{:then submissions}
		<div>
			<Submission submissions={submissions.data} />
		</div>

		<Pagination
			after={submissions.after}
			before={submissions.before}
			count={data.count}
			dist={submissions.dist}
		/>
	{/await}
{/key}
