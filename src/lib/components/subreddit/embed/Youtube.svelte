<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import Icon from '$lib/components/icon/Icon.svelte';

	export let submission: SubmissionData;

	let show = false;
</script>

<div class="h-full max-h-[512px] w-full">
	{#if show}
		<div class="youtube-embed">
			{@html submission.secure_media_embed.content}
		</div>
	{:else}
		<button
			class="relative h-full w-full"
			on:click={() => {
				show = true;
			}}
		>
			<span class="absolute left-0 flex h-full w-full items-center justify-center bg-black/40">
				<Icon height="68" width="68" class="" name="youtube" />
			</span>
			{#if submission.preview}
				<img src={submission.preview?.images.at(0)?.source.url} alt="" />
			{:else}
				<span class="block aspect-video h-full w-full bg-black"></span>
			{/if}
		</button>
	{/if}
</div>

<style>
	img {
		width: 100%;
		height: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
	}
	.youtube-embed > :global(iframe) {
		width: 100%;
		height: 100%;
		aspect-ratio: 16 / 9;
	}
</style>
