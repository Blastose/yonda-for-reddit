<script lang="ts">
	import UserComment from '$lib/components/comment/UserComment.svelte';
	import Hr from '$lib/components/layout/Hr.svelte';
	import SubmissionCard from '$lib/components/subreddit/SubmissionCard.svelte';
	import SubmissionClassic from '$lib/components/subreddit/SubmissionClassic.svelte';
	import { submissionDisplayStore } from '$lib/stores/submissionDisplayStore';

	export let data;
</script>

<svelte:head><title>{data.about.name} (u/{data.about.name})</title></svelte:head>

<div>
	{#await data.overview then overview}
		<div class="flex flex-col gap-2">
			{#each overview.data as d}
				{#if d.type === 'post'}
					{#if $submissionDisplayStore === 'card'}
						<SubmissionCard submission={d} />
					{:else}
						<SubmissionClassic submission={d} />
					{/if}
				{:else}
					<UserComment comment={d} />
				{/if}
				<Hr />
			{/each}
		</div>

		<a href="/{overview.after}">next</a>
	{/await}
</div>
