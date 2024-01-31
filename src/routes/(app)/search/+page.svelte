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
	import SearchUser from '$lib/components/search/SearchUser.svelte';
	import Hr from '$lib/components/layout/Hr.svelte';
	import SearchSubreddit from '$lib/components/search/SearchSubreddit.svelte';

	export let data;

	$: sort = $page.url.searchParams.get('sort');
	$: q = $page.url.searchParams.get('q');
	$: type = $page.url.searchParams.get('type');
</script>

<svelte:head><title>Searching for {q}</title></svelte:head>

<div class="flex flex-col gap-4 pt-4">
	<div class="flex gap-2 py-4">
		<p>Search results</p>
		<a href="/search?q={q}&type=link">Posts</a>
		<a href="/search?q={q}&type=sr">Subreddits</a>
		<a href="/search?q={q}&type=user">Users</a>
	</div>

	<Hr />
	<div class="flex flex-col gap-2">
		{#if type === 'link'}
			<div class="flex gap-1">
				<Sort />
				{#if sort === 'top' || sort === 'relevance' || sort === 'comments'}
					<SortTime defaultSort="all" />
				{/if}
			</div>
		{/if}

		{#key getFullUrl($page.url)}
			{#await data.searched}
				{#each { length: 5 } as _}
					<SubmissionSkeleton />
				{/each}
			{:then searched}
				<div class="grid grid-cols-1 gap-8 md:grid-cols-[1fr_256px] lg:grid-cols-[1fr_312px]">
					{#if searched.data.type === 'post'}
						<div>
							<Submission submissions={searched.data.data} />
						</div>
					{:else if searched.data.type === 'subreddit'}
						<div class="flex flex-col gap-2">
							{#each searched.data.data as d}
								<SearchSubreddit subreddit={d} />
								<Hr />
							{/each}
						</div>
					{:else if searched.data.type === 'user'}
						<div class="flex flex-col gap-2">
							{#each searched.data.data as d}
								<SearchUser user={d} />
								<Hr />
							{/each}
						</div>
					{/if}
				</div>

				<Pagination
					after={searched.after}
					before={searched.before}
					count={data.count}
					dist={searched.dist}
				/>
			{/await}
		{/key}
	</div>
</div>
