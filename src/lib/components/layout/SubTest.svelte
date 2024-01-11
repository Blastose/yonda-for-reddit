<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import SubmissionCard from '../subreddit/SubmissionCard.svelte';

	export let submissions: SubmissionData[];
</script>

<!-- TODO rename file -->
<div class="flex flex-col gap-2">
	{#each submissions as submission}
		<SubmissionCard {submission} />
		<hr class="border-[#2c2c2c]" />
	{/each}
</div>
