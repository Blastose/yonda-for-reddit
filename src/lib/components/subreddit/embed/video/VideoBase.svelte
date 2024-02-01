<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import Icon from '$lib/components/icon/Icon.svelte';
	import Controls from './Controls.svelte';
	import { lsdb } from '$lib/idb/ls';

	export let submission: SubmissionData;
	export let width: number;
	export let height: number;
	export let loop: boolean = false;
	export let autoplay: boolean = false;
	export let src: string | undefined = undefined;
	export let action: (v: HTMLVideoElement) => void = () => {};
	export let poster: string | undefined;

	let hoveringVideoPlayer = false;
	let videoStarted = autoplay;
	let videoContainer: HTMLElement;
	let videoNode: HTMLVideoElement;
	let currentTime: number;
	let duration: number;
	let paused: boolean;
	let ended: boolean;
	let volume: number = Number(lsdb.get('videoVolume')) || 0;
	let setInputValue: (v: number) => void;

	function videoControls(node: HTMLElement) {
		function pointerOver() {
			hoveringVideoPlayer = true;
		}
		function pointerOut() {
			hoveringVideoPlayer = false;
		}
		node.addEventListener('pointerover', pointerOver);
		node.addEventListener('pointerout', pointerOut);
		return {
			destroy() {
				node.removeEventListener('pointerover', pointerOver);
				node.removeEventListener('pointerout', pointerOut);
			}
		};
	}
</script>

<div
	use:videoControls
	bind:this={videoContainer}
	class="item stop-click-func video-player group relative flex max-h-[512px] w-full justify-center overflow-hidden rounded-2xl border border-[#303030] bg-black"
>
	{#if !videoStarted}
		<button
			class="absolute flex h-full w-full items-center justify-center bg-[#0000007a]"
			on:click={() => {
				videoStarted = true;
				videoNode.play();
			}}
			aria-label="Play video {submission.title}"
		>
			<Icon
				class="text-white duration-200 group-hover:scale-125"
				name="play"
				height="48"
				width="48"
			/>
		</button>
	{/if}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		bind:this={videoNode}
		bind:currentTime
		bind:duration
		bind:paused
		bind:ended
		bind:volume
		use:action
		on:play|once={() => {
			volume = Number(lsdb.get('videoVolume')) || 0;
			setInputValue(volume);
		}}
		on:click={() => {
			if (paused || ended || !videoStarted) {
				videoStarted = true;
				videoNode.play();
			} else videoNode.pause();
		}}
		style:aspect-ratio={(width ?? 0) / (height ?? 0)}
		class="w-full object-contain"
		controls={false}
		{poster}
		{height}
		{width}
		{loop}
		{autoplay}
	>
		{#if src}
			<source {src} />
		{/if}
	</video>

	<div
		class="duration-300 {(videoStarted && hoveringVideoPlayer) || paused
			? 'opacity-100'
			: 'pointer-events-none opacity-0'}"
	>
		<Controls
			{videoContainer}
			{videoNode}
			bind:currentTime
			{duration}
			{paused}
			{ended}
			bind:volume
			bind:setInputValue
		/>
	</div>
</div>

<style>
	.item {
		display: flex;
		flex: 0 0 100%;
	}
</style>
