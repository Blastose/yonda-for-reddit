<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import RedditImage from './RedditImage.svelte';

	export let submission: SubmissionData;
</script>

{#if submission.post_hint === 'image'}
	<RedditImage {submission} />
{/if}
