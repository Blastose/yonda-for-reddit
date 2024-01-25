<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import ImageViewer from './ImageViewer.svelte';

	const {
		elements: { trigger, overlay, content, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true,
		preventScroll: false,
		closeOnOutsideClick: false
	});

	$: if ($open) {
		document.body.style.setProperty('overflow', 'hidden');
	} else {
		document.body.style.setProperty('overflow', '');
	}

	let rotateImage: (direction: 'left' | 'right') => void;
</script>

<div use:melt={$trigger} class="stop-click-func items-center justify-center">
	<slot name="trigger" />
</div>

<div use:melt={$portalled}>
	{#if $open}
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
			class="pointer-events-none fixed left-[50%] top-[50%] z-50
            translate-x-[-50%] translate-y-[-50%] outline-none"
			transition:fade={{
				duration: 150
			}}
			use:melt={$content}
		>
			<ImageViewer bind:rotateImage>
				<slot name="content" />
			</ImageViewer>
		</div>

		<div transition:fade={{ duration: 150 }} class="pointer-events-none fixed inset-0 z-50">
			<!-- Controls -->
			<button
				use:melt={$close}
				aria-label="close"
				class="close-btn btn pointer-events-auto bg-black/90"
			>
				<Icon name="close" />
			</button>
			<div class="pointer-events-auto absolute bottom-0 flex w-full justify-center bg-black/80 p-4">
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
