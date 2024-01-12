<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import { fade } from 'svelte/transition';
	import { formatVideoTime } from '../video';

	export let videoContainer: HTMLElement;
	export let videoNode: HTMLVideoElement;
	export let currentTime: number;
	export let duration: number;
	export let ended: boolean;
	export let paused: boolean;
	export let volume: number;

	let fullscreen = false;
	let muted = false;
	let lastVolumeValue = volume;

	$: progress = currentTime / duration;

	function togglePlayStatus() {
		if (paused || ended) videoNode.play();
		else videoNode.pause();
	}

	function toggleFullscreen() {
		if (fullscreen) {
			document.exitFullscreen();
		} else {
			videoContainer.requestFullscreen();
		}
		fullscreen = !fullscreen;
	}

	function toggleMute() {
		if (muted) {
			volume = lastVolumeValue;
		} else {
			lastVolumeValue = volume;
			volume = 0;
		}
		muted = !muted;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="absolute left-0 top-0 h-full w-full"
	on:click={(e) => {
		if (e.currentTarget !== e.target) return;
		togglePlayStatus();
	}}
>
	<div
		transition:fade={{ duration: 250 }}
		class="controls-container absolute bottom-0 w-full gap-2 bg-gradient-to-b from-transparent from-10% via-[#000000ff] to-black px-4 py-4"
	>
		<button class="control-button" on:click={togglePlayStatus}>
			{#if !paused && !ended}
				<Icon name="pause" />
			{:else if ended}
				<Icon name="replay" />
			{:else if paused}
				<Icon name="play" />
			{/if}
		</button>

		<div class="flex h-full w-full items-center">
			<div class="h-1 w-full bg-white"></div>
		</div>

		<div class="whitespace-nowrap">
			{formatVideoTime(Math.floor(currentTime))} / {formatVideoTime(Math.floor(duration))}
		</div>

		<button class="control-button" on:click={toggleFullscreen}>
			<Icon name="fullscreen" />
		</button>

		<button on:click={toggleMute} class="control-button">
			{#if muted}
				<Icon name="volumeMute" />
			{:else if volume > 0.5}
				<Icon name="volumeHigh" />
			{:else if volume > 0.3}
				<Icon name="volumeMedium" />
			{:else}
				<Icon name="volumeLow" />
			{/if}
		</button>
	</div>
</div>

<style>
	.controls-container {
		display: grid;
		gap: 1rem;
		grid-template-columns: 24px 1fr min-content 24px 24px;
	}

	.control-button:hover {
		transition: transform 300ms;
		transform: scaleX(1.125) scaleY(1.125);
	}
</style>
