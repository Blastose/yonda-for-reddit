<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import SubmissionCard from '../subreddit/SubmissionCard.svelte';
	import SubmissionClassic from '../subreddit/SubmissionClassic.svelte';
	import { submissionDisplayStore } from '$lib/stores/submissionDisplayStore';
	import Hr from './Hr.svelte';

	export let submissions: SubmissionData[];
</script>

<div class="flex flex-col gap-2">
	{#each submissions as submission}
		{#if $submissionDisplayStore === 'card'}
			<SubmissionCard {submission} />
		{:else}
			<SubmissionClassic {submission} />
		{/if}
		<Hr />
	{/each}
</div>
