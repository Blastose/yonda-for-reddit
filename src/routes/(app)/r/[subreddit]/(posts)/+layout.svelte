<script lang="ts">
	import { page } from '$app/stores';
	import SubmissionContainer from '$lib/components/layout/SubmissionContainer.svelte';
	import { getFullUrl, transformUrlForIDBKey } from '$lib/url/url.js';
	import { db } from '$lib/idb/idb.js';
	import SubmissionSkeleton from '$lib/components/subreddit/SubmissionSkeleton.svelte';

	export let data;

	$: {
		$page;
		(async () => {
			const submissions = await data.submissions;
			await db.put('submissions', submissions, transformUrlForIDBKey($page.url));
		})();
	}
</script>

{#key getFullUrl($page.url)}
	{#await data.submissions}
		{#each { length: 5 } as _}
			<SubmissionSkeleton />
		{/each}
	{:then submissions}
		<SubmissionContainer {submissions} count={data.count} />
	{/await}
{/key}

<!-- This slot does not display any content, but is needed to silence a SK warning -->
<slot />
