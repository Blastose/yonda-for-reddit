<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import SubmissionCard from '../subreddit/SubmissionCard.svelte';

	export let submissions: SubmissionData[];
</script>

{#each submissions as submission}
	<SubmissionCard {submission} />
{/each}
