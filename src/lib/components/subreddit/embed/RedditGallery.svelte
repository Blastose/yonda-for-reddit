<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import { getGalleryData } from '../images/image';
	import Icon from '$lib/components/icon/Icon.svelte';
	import Image from './Image.svelte';
	import RedditGifVideo from './video/RedditGifVideo.svelte';
	import ImageViewerDialog from '$lib/components/layout/dialog/ImageViewerDialog.svelte';
	import { melt } from '@melt-ui/svelte';

	export let submission: SubmissionData;
	$: gallery = getGalleryData(submission);

	let width: number;
	let currentGalleryIndex = 0;

	function nextGalleryImage() {
		currentGalleryIndex++;
		if (currentGalleryIndex > gallery.length - 1) {
			currentGalleryIndex = 0;
		}
	}
	function previousGalleryImage() {
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
	console.log(submission);

	$: currentImage = gallery.at(currentGalleryIndex);
</script>

<ImageViewerDialog
	title={submission.title}
	gallery={{
		nextGalleryImage,
		previousGalleryImage,
		currentPage: currentGalleryIndex + 1,
		totalPages: gallery.length,
		caption: currentImage?.caption,
		outboundUrl: currentImage?.outboundUrl
	}}
>
	<div class="cursor-pointer" slot="trigger" let:trigger>
		<div>
			<div
				bind:this={gridContainer}
				class="grid-gallery-container relative grid overflow-x-hidden rounded-3xl"
				bind:clientWidth={width}
			>
				<div
					bind:this={galleryContainer}
					class="stop-click-func flex"
					style:transform="translateX(-{translateX}px)"
				>
					{#each gallery as g}
						{#if g.type !== 'mp4'}
							{@const defaultImageUrl = g.source.url}
							{@const aspectRatio = maxAspectRatio}
							{@const bgImageUrl = g.resolutions.at(0)?.url ?? ''}
							<div class="item" use:melt={trigger}>
								<Image
									{aspectRatio}
									{bgImageUrl}
									{defaultImageUrl}
									sizes={g.srcsetAndSizes?.sizes}
									srcset={g.srcsetAndSizes?.srcset}
									altText="{submission.subreddit_name_prefixed} - {submission.title}"
								/>
							</div>
						{:else}
							<RedditGifVideo {submission} video={g.source} />
						{/if}
					{/each}
				</div>

				<div class="absolute right-2 top-2 w-fit rounded-2xl bg-black/80 px-2 py-1 text-xs">
					{currentGalleryIndex + 1}/{gallery.length}
				</div>
				<button
					class="arrow-button left-2"
					on:click={previousGalleryImage}
					aria-label="gallery image previous"
				>
					<Icon height="24" width="24" name="chevronLeft" />
				</button>
				<button
					class="arrow-button right-2"
					on:click={nextGalleryImage}
					aria-label="gallery image next"
				>
					<Icon height="24" width="24" name="chevronRight" />
				</button>
				{#if currentImage?.caption || currentImage?.outboundUrl}
					<p class="absolute bottom-0 flex w-full flex-col bg-black/80 px-4 py-2">
						{#if currentImage.caption}<span>{currentImage.caption}</span>{/if}
						{#if currentImage.outboundUrl}<a
								class="line-clamp-1 text-[var(--link-color)]"
								href={currentImage.outboundUrl}
								target="_blank"
								rel="noreferrer">{currentImage.outboundUrl}</a
							>{/if}
					</p>
				{/if}
			</div>
		</div>
	</div>

	<div class="pointer-events-none select-none" slot="content">
		{#if currentImage?.type !== 'mp4'}
			<img
				class="max-h-[calc(100vh-120px)]"
				src={currentImage?.source.url}
				srcset={currentImage?.srcsetAndSizes?.srcset}
				sizes={currentImage?.srcsetAndSizes?.sizes}
				alt=""
			/>
		{:else}
			{#key currentGalleryIndex}
				<RedditGifVideo autoplay={true} {submission} video={currentImage.source} />
			{/key}
		{/if}
	</div>
</ImageViewerDialog>

<style>
	.arrow-button {
		opacity: 0;
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		border-radius: 9999px;
		padding: 0.5rem;
		background-color: rgba(0, 0, 0, 0.8);
		transition: opacity 300ms;
	}

	.grid-gallery-container:hover .arrow-button {
		opacity: 100%;
	}

	.item {
		display: flex;
		flex: 0 0 100%;
	}
</style>
