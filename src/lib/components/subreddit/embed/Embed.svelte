<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import RedditImage from './RedditImage.svelte';
	import RedditVideo from './video/RedditVideo.svelte';
	import RedditGallery from './RedditGallery.svelte';
	import Youtube from './Youtube.svelte';

	export let submission: SubmissionData;
</script>

{#if submission.post_hint === 'image'}
	<!-- TODO -->
	<!-- {#if submission.preview.images.at(0)?.variants?.mp4} -->
	<!-- svelte-ignore a11y-media-has-caption -->
	<!-- <video controls={true} src={submission.preview.images.at(0)?.variants?.mp4?.source.url}></video> -->
	<!-- {:else} -->
	<RedditImage {submission} />
	<!-- {/if} -->
{:else if submission.is_gallery}
	<RedditGallery {submission} />
{:else if submission.is_video || submission.url.match(/https?:\/\/v.redd.it\/.*/)}
	<RedditVideo {submission} />
{:else if !submission.is_self && (submission.url.startsWith('https://www.youtube') || submission.url.startsWith('https://youtu.be'))}
	<Youtube {submission} />
{/if}
