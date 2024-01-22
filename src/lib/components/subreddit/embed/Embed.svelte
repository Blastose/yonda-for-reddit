<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import RedditImage from './RedditImage.svelte';
	import RedditGallery from './RedditGallery.svelte';
	import Youtube from './Youtube.svelte';
	import RedditVideoDash from './video/RedditVideoDash.svelte';
	import RedditGifVideo from './video/RedditGifVideo.svelte';

	export let submission: SubmissionData;
</script>

{#if submission.post_hint === 'image'}
	{#if submission.preview.images.at(0)?.variants?.mp4}
		<RedditGifVideo {submission} />
	{:else}
		<RedditImage {submission} />
	{/if}
{:else if submission.is_gallery}
	<RedditGallery {submission} />
{:else if submission.is_video || submission.url.match(/https?:\/\/v.redd.it\/.*/)}
	<RedditVideoDash {submission} />
{:else if !submission.is_self && (submission.url.startsWith('https://www.youtube') || submission.url.startsWith('https://youtu.be'))}
	<Youtube {submission} />
{/if}
