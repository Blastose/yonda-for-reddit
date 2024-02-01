<script lang="ts">
	import { fade } from 'svelte/transition';
	import { tick } from 'svelte';
	import { formatVideoTime } from '../video';

	export let current: number;
	export let max: number;
	export let videoNode: HTMLVideoElement;

	$: left = (current / max) * 100;
	$: thumbLeft = left;
	$: progressTrackLeft = 0;
	$: progressTrackRight = 100 - left;

	let track: HTMLSpanElement;
	let showTooltip = false;
	let tooltip: HTMLSpanElement;
	let tooltipText: string = '0:00';
	let tooltipLeft: number;
	let mousePressed = false;
	let thumb: HTMLSpanElement;
	let continuePlayingVideoAfterPointerUp = !videoNode?.paused;

	function getCurrentFromPercentage(percentage: number) {
		if (percentage >= 0 && percentage <= 1) {
			return percentage * max;
		}
		if (percentage < 0) {
			return 0;
		}
		if (percentage > 1) {
			return max;
		}
		return 0;
	}

	function updateCurrent(percentage: number) {
		current = getCurrentFromPercentage(percentage);
	}

	function pointerDown(e: PointerEvent) {
		if (e.button !== 0) return;
		const target = e.target as HTMLElement;
		if (!track.contains(target)) return;

		if (!videoNode.paused) {
			continuePlayingVideoAfterPointerUp = true;
		} else {
			continuePlayingVideoAfterPointerUp = false;
		}
		videoNode.pause();

		e.preventDefault();
		mousePressed = true;
	}

	function pointerUp(e: PointerEvent) {
		const target = e.target as HTMLElement;
		if (!track.contains(target) && !mousePressed) return;
		if (continuePlayingVideoAfterPointerUp) {
			videoNode.play();
		}
		continuePlayingVideoAfterPointerUp = !videoNode.paused;
		mousePressed = false;
	}

	function pointerMove(e: PointerEvent) {
		if (!mousePressed) return;

		const rect = track.getBoundingClientRect();
		const relPosX = e.clientX - rect.left;
		thumb.focus();
		const percentage = relPosX / track.offsetWidth;
		updateCurrent(percentage);
	}
</script>

<svelte:document
	on:pointerdown={pointerDown}
	on:pointerup={pointerUp}
	on:pointermove={pointerMove}
	on:pointerleave={pointerUp}
/>

<div class="relative">
	{#if showTooltip}
		<div transition:fade>
			<span
				bind:this={tooltip}
				style:left="{tooltipLeft}px"
				class="pointer-events-none absolute bottom-10 select-none whitespace-nowrap rounded-md bg-black px-4 py-2 text-center text-sm shadow-md"
			>
				{tooltipText}
			</span>
		</div>
	{/if}
	<button
		bind:this={track}
		on:click={(e) => {
			const rect = track.getBoundingClientRect();
			const relPosX = e.clientX - rect.left;
			const percentage = relPosX / track.offsetWidth;
			updateCurrent(percentage);
		}}
		on:pointerleave={() => {
			showTooltip = false;
		}}
		on:pointermove={async (e) => {
			const rectTrack = track.getBoundingClientRect();
			showTooltip = true;
			await tick();
			const percentage = (e.clientX - rectTrack.left) / track.offsetWidth;
			tooltipLeft = e.clientX - rectTrack.left - tooltip.offsetWidth / 2;
			await tick();
			const rectTooltip = tooltip.getBoundingClientRect();
			if (rectTooltip.x < 0) {
				tooltipLeft = -rectTrack.left;
			} else if (rectTooltip.x + rectTooltip.width > window.innerWidth) {
				tooltipLeft = window.innerWidth - rectTooltip.width - rectTrack.left;
			}
			tooltipText = formatVideoTime(Math.floor(getCurrentFromPercentage(percentage)));
		}}
		class="relative flex h-[40px] w-full select-none items-center"
	>
		<span class="block h-[4px] w-full bg-white/40">
			<span
				style:position="absolute"
				style:left="{progressTrackLeft}%"
				style:right="{progressTrackRight}%"
				class="primary-bg-color h-[4px]"
			/>
		</span>
		<span
			bind:this={thumb}
			style:position="absolute"
			style:translate="-50%"
			style:left="{thumbLeft}%"
			class="primary-bg-color block h-4 w-4 rounded-full"
		/>
	</button>
</div>

<style>
	.primary-bg-color {
		background-color: white;
	}
</style>
