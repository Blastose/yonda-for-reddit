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
			const creations = await data.creations;
			db.put('redditUserCreations', creations, transformUrlForIDBKey($page.url));
		})();
	}
</script>

<div class="flex flex-col gap-4">
	{#await data.creations}
		{#each { length: 5 } as _}
			<SubmissionSkeleton />
		{/each}
	{:then creation}
		<Creations
			creations={{
				data: creation.data,
				type: 'both'
			}}
		/>

		<Pagination
			before={creation.before}
			after={creation.after}
			count={data.count}
			dist={creation.dist}
		/>
	{/await}
</div>
