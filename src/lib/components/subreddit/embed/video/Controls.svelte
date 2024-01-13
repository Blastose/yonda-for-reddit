<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
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
	export let setInputValue: (v: number) => void;

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

<div
	class="absolute bottom-0 left-0 flex w-full flex-col gap-4 bg-gradient-to-b
from-transparent from-10% via-[#000000ff] to-[#000000be] p-4"
>
	<button
		on:click={() => {
			videoNode.currentTime = 4;
		}}
		class="h-1 w-full bg-gray-700"
	>
		<div style:width="{progress * 100}%" class="h-1 bg-white"></div>
	</button>

	<div class="flex justify-between">
		<div class="flex items-center gap-2">
			<button class="control-button" on:click={togglePlayStatus}>
				{#if !paused && !ended}
					<Icon name="pause" />
				{:else if ended}
					<Icon name="replay" />
				{:else if paused}
					<Icon name="play" />
				{/if}
			</button>

			<Volume bind:volume bind:setInputValue />

			<div class="whitespace-nowrap">
				{formatVideoTime(Math.floor(currentTime))} / {formatVideoTime(Math.floor(duration))}
			</div>
		</div>

		<div class="flex items-center gap-2">
			<button>
				<Icon name="settings" />
			</button>

			<button class="control-button" on:click={toggleFullscreen}>
				{#if !fullscreen}
					<Icon name="fullscreen" />
				{:else}
					<Icon name="fullscreenExit" />
				{/if}
			</button>
		</div>
	</div>
</div>

<style>
	.control-button:hover {
		transition: transform 300ms;
		transform: scaleX(1.125) scaleY(1.125);
	}
</style>
