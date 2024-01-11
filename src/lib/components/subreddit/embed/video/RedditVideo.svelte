<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import { getRedditVideoLinks } from '../video';
	import Hls from 'hls.js';
	import { fade } from 'svelte/transition';
	import Icon from '$lib/components/icon/Icon.svelte';

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
	let videoNode: HTMLVideoElement;

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
	{#if videoStarted && hoveringVideoPlayer}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			transition:fade={{ duration: 250 }}
			class="controls-container absolute bottom-0 w-full gap-2 bg-gradient-to-b from-transparent from-10% via-[#000000ff] to-black px-4 py-2"
			on:click={() => {
				if (videoNode.paused) videoNode.play();
				else videoNode.pause();
			}}
		>
			<button>
				<Icon name="play" />
			</button>
			<div class="h-2 w-full bg-white"></div>
			<button>
				<Icon name="play" />
			</button>
			<button>
				<Icon name="volumeHigh" />
			</button>
		</div>
	{/if}

	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		on:click={() => {
			console.log('asldkjsldj');
		}}
		bind:this={videoNode}
		style:aspect-ratio={(redditVideo?.width ?? 0) / (redditVideo?.height ?? 0)}
		class="pointer-events-none object-contain"
		use:useHls
		controls={false}
		height={redditVideo?.height}
		width={redditVideo?.width}
	/>
</div>

<style>
	.controls-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
</style>
