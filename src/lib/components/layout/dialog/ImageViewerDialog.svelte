<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import ImageViewer from './ImageViewer.svelte';

	export let title: string;
	export let gallery:
		| {
				previousGalleryImage: () => void;
				nextGalleryImage: () => void;
				currentPage: number;
				totalPages: number;
		  }
		| undefined = undefined;

	const {
		elements: { trigger, overlay, content, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true,
		preventScroll: false,
		closeOnOutsideClick: false
	});

	function keyboardControls(_: HTMLDivElement) {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'a' || e.key === 'ArrowLeft') {
				gallery?.previousGalleryImage();
				reset();
			}
			if (e.key === 'd' || e.key === 'ArrowRight') {
				gallery?.nextGalleryImage();
				reset();
			}
		}
		window.addEventListener('keydown', handleKeydown);
		return {
			destroy() {
				window.removeEventListener('keydown', handleKeydown);
			}
		};
	}

	$: if ($open) {
		document.body.style.setProperty('overflow', 'hidden');
	} else {
		document.body.style.setProperty('overflow', '');
	}

	let rotateImage: (direction: 'left' | 'right') => void;
	let reset: () => void;
	let zoomIn: () => void;
	let zoomOut: () => void;
</script>

{#if !gallery}
	<div use:melt={$trigger} class="stop-click-func items-center justify-center">
		<slot name="trigger" />
	</div>
{:else}
	<slot name="trigger" trigger={$trigger} />
{/if}

<div use:melt={$portalled}>
	{#if $open}
		<div use:keyboardControls></div>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/80"
			transition:fade={{ duration: 150 }}
			on:click={() => {
				open.set(false);
			}}
		/>

		<div
			transition:fade={{ duration: 150 }}
			class="pointer-events-none fixed inset-0 z-50"
			use:melt={$content}
		>
			<div
				class="pointer-events-none fixed left-[50%] top-[50%]
            translate-x-[-50%] translate-y-[-50%] outline-none"
			>
				<ImageViewer bind:rotateImage bind:reset bind:zoomIn bind:zoomOut>
					<slot name="content" />
				</ImageViewer>
			</div>

			<!-- Controls -->
			<div class="pointer-events-auto absolute top-0 w-full bg-black/80 px-8 py-4">
				<p class="line-clamp-1 text-lg font-bold">{title}</p>
			</div>
			<button
				use:melt={$close}
				aria-label="close"
				class="close-btn btn pointer-events-auto bg-black/90"
			>
				<Icon name="close" />
			</button>

			{#if gallery}
				<button
					class="pointer-events-auto absolute left-2 top-[50%] -translate-y-1/2 rounded-full bg-black/80 p-2"
					aria-label="previous image"
					on:click={() => {
						if (!gallery) return;
						gallery.previousGalleryImage();
						reset();
					}}><Icon name="chevronLeft" height="48" width="48" /></button
				>
				<button
					class="pointer-events-auto absolute right-2 top-[50%] -translate-y-1/2 rounded-full bg-black/80 p-2"
					aria-label="next image"
					on:click={() => {
						if (!gallery) return;
						gallery.nextGalleryImage();
						reset();
					}}><Icon name="chevronRight" height="48" width="48" /></button
				>
			{/if}

			<div
				class="pointer-events-auto absolute bottom-0 flex w-full items-center justify-center bg-black/80 p-4"
			>
				{#if gallery}
					<p>{gallery.currentPage} / {gallery.totalPages}</p>
				{/if}

				<button aria-label="zoom in" on:click={zoomIn}><Icon name="plus" /></button>
				<button aria-label="zoom out" on:click={zoomOut}><Icon name="minus" /></button>
				<button aria-label="reset image position" on:click={reset}><Icon name="restart" /></button>

				{#if gallery}
					<button
						aria-label="previous image"
						on:click={() => {
							if (!gallery) return;
							gallery.previousGalleryImage();
							reset();
						}}><Icon name="chevronLeft" /></button
					>
					<button
						aria-label="next image"
						on:click={() => {
							if (!gallery) return;
							gallery.nextGalleryImage();
							reset();
						}}><Icon name="chevronRight" /></button
					>
				{/if}
				<button
					aria-label="rotate image left"
					on:click={() => {
						rotateImage('left');
					}}><Icon name="rotateLeft" /></button
				>
				<button
					aria-label="rotate image right"
					on:click={() => {
						rotateImage('right');
					}}><Icon name="rotateRight" /></button
				>
			</div>
		</div>
	{/if}
</div>
