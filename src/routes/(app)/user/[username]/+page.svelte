<script lang="ts">
	import { page } from '$app/stores';
	import Pagination from '$lib/components/reddit/Pagination.svelte';
	import Creations from '$lib/components/reddituser/Creations.svelte';
	import SubmissionSkeleton from '$lib/components/subreddit/SubmissionSkeleton.svelte';
	import { db } from '$lib/idb/idb.js';
	import { transformUrlForIDBKey } from '$lib/url/url.js';

	export let data;

	$: {
		$page;
		(async () => {
			const creations = await data.overview;
			db.put('redditUserCreations', creations, transformUrlForIDBKey($page.url));
		})();
	}
</script>

<svelte:head><title>{data.about.name} (u/{data.about.name})</title></svelte:head>

<div class="flex flex-col gap-4">
	{#await data.overview}
		{#each { length: 5 } as _}
			<SubmissionSkeleton />
		{/each}
	{:then overview}
		<Creations creations={{ data: overview.data, type: 'both' }} />

		<Pagination
			before={overview.before}
			after={overview.after}
			count={data.count}
			dist={overview.dist}
		/>
	{/await}
</div>
