<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import Hls from 'hls.js';
	import { fade } from 'svelte/transition';
	import Icon from '$lib/components/icon/Icon.svelte';
	import Controls from './Controls.svelte';

	export let submission: SubmissionData;
	let hls: Hls;

	function getBaseUrl(url: string) {
		const match = url.match(/https:\/\/v.redd.it\/.*?\//);
		if (match) {
			return match[0];
		}
		return url;
	}

	function useHls(node: HTMLVideoElement) {
		const source = submission.media?.reddit_video?.hls_url ?? '';
		hls = new Hls();
		hls.loadSource(source);
		hls.attachMedia(node);

		// const interval = setInterval(function () {
		// 	if (hls) {
		// 		console.log(hls.currentLevel);
		// 		console.log(hls.levels);
		// 	} else {
		// 		console.log('askldjsjl');
		// 	}
		// }, 1000);

		// return {
		// 	destroy() {
		// 		clearInterval(interval);
		// 	}
		// };
	}

	$: console.log(submission.media);
	$: redditVideo = submission.media?.reddit_video;
	$: baseUrl = getBaseUrl(submission.media?.reddit_video?.fallback_url ?? '');
	// $: console.log(getRedditVideoLinks(baseUrl));

	let hoveringVideoPlayer = false;
	let videoStarted = false;
	let videoContainer: HTMLElement;
	let videoNode: HTMLVideoElement;
	let currentTime: number;
	let duration: number;
	let paused: boolean;
	let ended: boolean;
	let volume: number = 0.33; // TODO load from somewhere

	function videoControls(node: HTMLElement) {
		function a() {
			hoveringVideoPlayer = true;
		}
		function b() {
			hoveringVideoPlayer = false;
		}
		node.addEventListener('pointerover', a);
		node.addEventListener('pointerout', b);
		return {
			destroy() {
				node.removeEventListener('pointerover', a);
				node.removeEventListener('pointerout', b);
			}
		};
	}
</script>

<div
	use:videoControls
	bind:this={videoContainer}
	class="video-player group relative flex max-h-[512px] justify-center overflow-hidden rounded-2xl border border-[#303030] bg-black"
>
	{#if !videoStarted}
		<button
			class="absolute flex h-full w-full items-center justify-center bg-[#0000007a]"
			on:click={() => {
				console.log('aklsdjslkdjsjdd');
				videoStarted = true;
				videoNode.play();
			}}
		>
			<Icon
				class="text-white duration-200 group-hover:scale-125"
				name="play"
				height="48"
				width="48"
			/>
		</button>
	{/if}
	{#if (videoStarted && hoveringVideoPlayer) || paused}
		<Controls {videoContainer} {videoNode} {currentTime} {duration} {paused} {ended} bind:volume />
	{/if}

	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		bind:this={videoNode}
		bind:currentTime
		bind:duration
		bind:paused
		bind:ended
		bind:volume
		use:useHls
		style:aspect-ratio={(redditVideo?.width ?? 0) / (redditVideo?.height ?? 0)}
		class="pointer-events-none object-contain"
		controls={false}
		height={redditVideo?.height}
		width={redditVideo?.width}
	/>
</div>
