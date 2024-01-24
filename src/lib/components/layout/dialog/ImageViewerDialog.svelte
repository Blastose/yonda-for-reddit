<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade, fly } from 'svelte/transition';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true,
		preventScroll: false
	});

	$: if ($open) {
		document.body.style.setProperty('overflow', 'hidden');
	} else {
		document.body.style.setProperty('overflow', '');
	}

	let zoom = 1;

	let imageContainer: HTMLDivElement;

	let diffX = 0;
	let diffY = 0;
	let lastZoom = zoom;
	function handleWindowPointerMove(e: PointerEvent) {
		const rect = imageContainer.getBoundingClientRect();
		diffX = (e.x - rect.x - rect.width / 2) / zoom;
		diffY = (e.y - rect.y - rect.height / 2) / zoom;
		lastZoom = zoom;
	}
	function handleWheel(e: WheelEvent & { currentTarget: EventTarget & Window }) {
		const scaleFactor = 1 + zoom;
		zoom += -e.deltaY * 0.001 * scaleFactor;

		if (zoom < 0.25) {
			zoom = 0.25;
		}
		if (zoom > 6) {
			zoom = 6;
		}
		const zoomDiff = lastZoom - zoom;
		const adjustX = zoomDiff * diffX;
		const adjustY = zoomDiff * diffY;
		translateX += adjustX;
		translateY += adjustY;
		lastZoom = zoom;
	}

	let translateX = 0;
	let translateY = 0;
	function pan(node: HTMLDivElement) {
		let isDragging = false;
		let offsetX: number;
		let offsetY: number;

		function handlePointerDown(e: PointerEvent) {
			isDragging = true;
			offsetX = e.x - translateX;
			offsetY = e.y - translateY;
			node.style.cursor = 'grabbing';

			window.addEventListener('pointermove', handlePointerMove);
			window.addEventListener('pointerup', handlePointerUp);
		}

		function handlePointerMove(e: PointerEvent) {
			if (!isDragging) return;

			const newLeft = e.x - offsetX;
			const newTop = e.y - offsetY;
			translateX = newLeft;
			translateY = newTop;
		}

		function handlePointerUp(_e: PointerEvent) {
			isDragging = false;
			node.style.cursor = 'grab';

			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerup', handlePointerUp);
		}

		node.addEventListener('pointerdown', handlePointerDown);
		window.addEventListener('pointermove', handleWindowPointerMove);

		return {
			destroy() {
				node.removeEventListener('pointerdown', handlePointerDown);
				window.removeEventListener('pointermove', handleWindowPointerMove);
			}
		};
	}
</script>

<svelte:window on:wheel={handleWheel} />

<div use:melt={$trigger} class="stop-click-func items-center justify-center">
	<slot name="trigger" />
</div>

<div class="" use:melt={$portalled}>
	{#if $open}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/50"
			transition:fade={{ duration: 150 }}
		>
			<!-- Controls -->
			<button use:melt={$close} aria-label="close" class="close-btn btn bg-black/90">
				<Icon name="close" />
			</button>
		</div>
		<div
			class="pointer-events-none fixed left-[50%] top-[50%]
            z-50 translate-x-[-50%] translate-y-[-50%]"
			transition:fly={{
				duration: 150,
				y: 8
			}}
			use:melt={$content}
		>
			<div
				bind:this={imageContainer}
				class="pointer-events-auto cursor-grab"
				use:pan
				style:transform="translate({translateX}px, {translateY}px) scale({zoom})"
			>
				<slot name="content" />
			</div>
		</div>
	{/if}
</div>
