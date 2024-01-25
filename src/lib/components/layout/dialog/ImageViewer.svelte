<script lang="ts">
	export const rotateImage = (direction: 'left' | 'right') => {
		{
			if (direction === 'left') {
				rotate--;
			} else {
				rotate++;
			}
		}
	};

	let zoom = 1;
	let imageContainer: HTMLDivElement;
	let diffXFromCenter = 0;
	let diffYFromCenter = 0;
	let lastZoom = zoom;
	function handleWheel(e: WheelEvent) {
		const rect = imageContainer.getBoundingClientRect();
		diffXFromCenter = (e.x - rect.x - rect.width / 2) / zoom;
		diffYFromCenter = (e.y - rect.y - rect.height / 2) / zoom;
		lastZoom = zoom;

		const scaleFactor = 1 + zoom;
		zoom += -e.deltaY * 0.001 * scaleFactor;

		if (zoom < 0.25) {
			zoom = 0.25;
		}
		if (zoom > 6) {
			zoom = 6;
		}
		const zoomDiff = lastZoom - zoom;
		const adjustX = zoomDiff * diffXFromCenter;
		const adjustY = zoomDiff * diffYFromCenter;
		translateX += adjustX;
		translateY += adjustY;
		lastZoom = zoom;
	}

	let rotate = 0;
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
		window.addEventListener('wheel', handleWheel);

		return {
			destroy() {
				node.removeEventListener('pointerdown', handlePointerDown);
				window.removeEventListener('wheel', handleWheel);
			}
		};
	}
</script>

<div
	bind:this={imageContainer}
	class="pointer-events-auto cursor-grab"
	use:pan
	style:transform="translate({translateX}px, {translateY}px) scale({zoom}) rotate({90 * rotate}deg) "
>
	<slot />
</div>
