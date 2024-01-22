<script lang="ts">
	import { page } from '$app/stores';
	import SubmissionContainer from '$lib/components/layout/SubmissionContainer.svelte';
	import SubmissionSkeleton from '$lib/components/subreddit/SubmissionSkeleton.svelte';
	import Subreddit from '$lib/components/subreddit/Subreddit.svelte';
	import { db } from '$lib/idb/idb.js';
	import { getFullUrl, transformUrlForIDBKey } from '$lib/url/url.js';

	export let data;

	$: {
		$page;
		(async () => {
			const submissions = await data.submissions;
			console.log(submissions);
			await db.put('submissions', submissions, transformUrlForIDBKey($page.url));
		})();
	}
</script>

<svelte:head><title>{data.sort} : Yonda for Reddit</title></svelte:head>

<Subreddit about={null} sidebarPromise={null} moderatorsPromise={null}>
	{#key getFullUrl($page.url)}
		{#await data.submissions}
			{#each { length: 5 } as _}
				<SubmissionSkeleton />
			{/each}
		{:then submissions}
			<div>
				<SubmissionContainer {submissions} subreddit={$page.params.subreddit} sort={data.sort} />
			</div>
		{/await}
	{/key}
</Subreddit>
