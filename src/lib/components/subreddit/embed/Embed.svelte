<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import RedditImage from './RedditImage.svelte';
	import RedditVideo from './RedditVideo.svelte';

	export let submission: SubmissionData;
</script>

{#if submission.post_hint === 'image'}
	<RedditImage {submission} />
{:else if submission.is_video || submission.url.match(/https?:\/\/v.redd.it\/.*/)}
	<RedditVideo {submission} />
{/if}
