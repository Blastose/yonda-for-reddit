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
		<RedditGifVideo {submission} video={submission.preview.images.at(0)?.variants?.mp4?.source} />
	{:else}
		<RedditImage {submission} />
	{/if}
{:else if submission.is_gallery}
	<RedditGallery {submission} />
{:else if submission.is_video || submission.url.match(/https?:\/\/v.redd.it\/.*/)}
	<RedditVideoDash {submission} />
{:else if submission.media?.type === 'youtube.com'}
	<Youtube {submission} />
{:else if submission.media?.type === 'clips.twitch.tv'}
	<!-- TODO twitch clips embed -->
	<!-- <div class="reddit-md">
		{@html submission.secure_media_embed.content}
	</div> -->
{:else if submission.media?.type === 'twitter.com'}
	<div class="reddit-md">
		{@html submission.secure_media_embed.content?.replace(
			`<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
			''
		)}
	</div>
{:else if submission.secure_media}
	<!-- TODO -->
	<!-- <div class="reddit-md"> -->
	<!-- {@html submission.secure_media_embed.content} -->
	<!-- </div> -->
{/if}
