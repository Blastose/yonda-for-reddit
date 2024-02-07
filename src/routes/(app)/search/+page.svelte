<script lang="ts">
	import { page } from '$app/stores';
	import { getFullUrl, transformUrlForIDBKey } from '$lib/url/url.js';
	import { db } from '$lib/idb/idb.js';
	import type { SubmissionDataFull } from '$lib/reddit/reddit.js';
	import SubmissionSkeleton from '$lib/components/subreddit/SubmissionSkeleton.svelte';
	import Submission from '$lib/components/layout/Submission.svelte';
	import Pagination from '$lib/components/reddit/Pagination.svelte';
	import Sort from '$lib/components/search/Sort.svelte';
	import SortTime from '$lib/components/subreddit/SortTime.svelte';
	import SearchUser from '$lib/components/search/SearchUser.svelte';
	import Hr from '$lib/components/layout/Hr.svelte';
	import SearchSubreddit from '$lib/components/search/SearchSubreddit.svelte';
	import SubmissionTypeOptions from '$lib/components/subreddit/SubmissionTypeOptions.svelte';

	export let data;

	$: sort = $page.url.searchParams.get('sort');
	$: q = $page.url.searchParams.get('q');
	$: type = $page.url.searchParams.get('type');

	const searchTypes = [
		{ type: 'link', display: 'Posts' },
		{ type: 'sr', display: 'Subreddits' },
		{ type: 'user', display: 'Users' }
	];

	$: {
		$page;
		(async () => {
			const searched = await data.searched;
			// We can cast as SubmissionDataFull since in the page.ts file we also cast it,
			// and we know that the data corressponding to the /search urls have this structure
			await db.put(
				'submissions',
				searched as unknown as SubmissionDataFull,
				transformUrlForIDBKey($page.url)
			);
		})();
	}
</script>

<svelte:head><title>Searching for {q}</title></svelte:head>

<div class="flex flex-col gap-2 pt-4">
	<div class="flex items-center gap-2 py-4">
		<p class="mr-4">Search results</p>
		{#each searchTypes as searchType}
			<a
				class="rounded-3xl px-4 py-2 {type === searchType.type
					? 'bg-[var(--accent-l1-hover)]'
					: 'hover:bg-[var(--accent-l1)]'}"
				href="/search?q={q}&type={searchType.type}">{searchType.display}</a
			>
		{/each}
	</div>

	<div class="flex flex-col gap-2">
		{#if type === 'link'}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-[1fr_256px] lg:grid-cols-[1fr_312px]">
				<div class="flex justify-between">
					<div class="flex gap-1">
						<Sort />
						{#if sort === 'top' || sort === 'relevance' || sort === 'comments'}
							<SortTime defaultSort="all" />
						{/if}
					</div>
					<SubmissionTypeOptions />
				</div>
			</div>
		{/if}

		{#key getFullUrl($page.url)}
			{#await data.searched}
				{#each { length: 5 } as _}
					<div class="grid grid-cols-1 gap-8 md:grid-cols-[1fr_256px] lg:grid-cols-[1fr_312px]">
						<SubmissionSkeleton />
					</div>
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
