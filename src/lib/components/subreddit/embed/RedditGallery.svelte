<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import { getGalleryData, getSrcsetAndSizes } from '../images/image';
	import Icon from '$lib/components/icon/Icon.svelte';
	import Image from './Image.svelte';

	export let submission: SubmissionData;
	$: gallery = getGalleryData(submission);

	let width: number;
	let currentGalleryIndex = 0;

	function handleClick() {
		currentGalleryIndex++;
		if (currentGalleryIndex > gallery.length - 1) {
			currentGalleryIndex = 0;
		}
	}
	function handleClick2() {
		currentGalleryIndex--;
		if (currentGalleryIndex < 0) {
			currentGalleryIndex = gallery.length - 1;
		}
	}

	let galleryContainer: HTMLElement;
	let gridContainer: HTMLElement;
	let gridContainerWidth: number;
	$: {
		width;
		gridContainerWidth = gridContainer?.getBoundingClientRect().width;
	}

	$: translateX = gridContainerWidth * currentGalleryIndex;
	// Width and height are swapped in the api response for source, but correct on some resolutions
	// that aren't the source resolution
	$: maxAspectRatio = Math.max(
		...gallery.map(
			(g) =>
				(g.resolutions.at(-2)?.width ?? g.source.width) /
				(g.resolutions.at(-2)?.height ?? g.source.height)
		)
	);
	$: console.log(gallery?.map((g) => g.source.width));
	$: console.log(gallery?.map((g) => g.source.height));
	$: console.log(gallery);
</script>

<div class="w-fit rounded-2xl bg-neutral-600 px-2 py-1 text-xs">
	{currentGalleryIndex + 1}/{gallery.length}
</div>
<div class="flex items-center">
	<button class="chevron-button" on:click={handleClick2} aria-label="gallery image previous">
		<Icon height="24" width="24" name="chevronLeft" />
	</button>
	<button class="chevron-button" on:click={handleClick} aria-label="gallery image next">
		<Icon height="24" width="24" name="chevronRight" />
	</button>
</div>

<div bind:this={gridContainer} class="grid overflow-x-hidden" bind:clientWidth={width}>
	<div bind:this={galleryContainer} class="flex" style:transform="translateX(-{translateX}px)">
		{#each gallery as g}
			{@const srcsetAndSizes = getSrcsetAndSizes(g)}
			{@const defaultImageUrl = g.source.url}
			{@const aspectRatio = maxAspectRatio}
			{@const bgImageUrl = g.resolutions.at(0)?.url ?? ''}
			<Image
				{aspectRatio}
				{bgImageUrl}
				{defaultImageUrl}
				sizes={srcsetAndSizes?.sizes}
				srcset={srcsetAndSizes?.srcset}
				altText="{submission.subreddit_name_prefixed} - {submission.title}"
			/>
		{/each}
	</div>
</div>
{#each gallery as g, index}
	{#if currentGalleryIndex === index}
		{#if g.caption}
			<p>{g.caption}</p>
		{/if}
		{#if g.outboundUrl}
			<div class="reddit-md">
				<a href={g.outboundUrl} target="_blank" rel="noreferrer">{g.outboundUrl}</a>
			</div>
		{/if}
	{/if}
{/each}
