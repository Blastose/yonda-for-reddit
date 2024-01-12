<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import { fade } from 'svelte/transition';
	import { formatVideoTime } from '../video';
	import Volume from './Volume.svelte';

	export let videoContainer: HTMLElement;
	export let videoNode: HTMLVideoElement;
	export let currentTime: number;
	export let duration: number;
	export let ended: boolean;
	export let paused: boolean;
	export let volume: number;

	let fullscreen = false;

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
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="absolute left-0 top-0 flex h-full w-full items-end"
	on:click={(e) => {
		if (e.currentTarget !== e.target) return;
		togglePlayStatus();
	}}
>
	<div
		class="controls-container flex w-full gap-2 bg-gradient-to-b from-transparent from-10% via-[#000000ff] to-black pb-4 pl-4 pt-4"
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
			<button
				on:click={() => {
					videoNode.currentTime = 4;
				}}
				class="h-1 w-full bg-gray-700"
			>
				<div style:width="{progress * 100}%" class="h-full bg-white"></div>
			</button>
		</div>

		<div class="whitespace-nowrap">
			{formatVideoTime(Math.floor(currentTime))} / {formatVideoTime(Math.floor(duration))}
		</div>

		<button class="control-button" on:click={toggleFullscreen}>
			{#if !fullscreen}
				<Icon name="fullscreen" />
			{:else}
				<Icon name="fullscreenExit" />
			{/if}
		</button>
	</div>

	<Volume bind:volume />
</div>

<style>
	.controls-container {
		display: grid;
		gap: 1rem;
		grid-template-columns: 24px 1fr min-content 24px;
	}

	.control-button:hover {
		transition: transform 300ms;
		transform: scaleX(1.125) scaleY(1.125);
	}
</style>
