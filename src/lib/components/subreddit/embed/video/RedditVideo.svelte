<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import Hls from 'hls.js';
	import Icon from '$lib/components/icon/Icon.svelte';
	import Controls from './Controls.svelte';
	import { lsdb } from '$lib/idb/ls';

	export let submission: SubmissionData;
	console.log(submission);
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
		hls = new Hls({ autoStartLoad: false });
		hls.loadSource(source);
		hls.attachMedia(node);
	}

	$: console.log(submission.media);
	$: poster =
		submission.preview.images.at(0)?.resolutions.at(3)?.url ??
		submission.preview.images.at(0)?.resolutions.at(0)?.url;
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
	let volume: number = Number(lsdb.get('videoVolume')) || 0;
	let setInputValue: (v: number) => void;

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
	class="stop-click-func video-player group relative flex max-h-[512px] w-full justify-center overflow-hidden rounded-2xl border border-[#303030] bg-black"
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
	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		bind:this={videoNode}
		bind:currentTime
		bind:duration
		bind:paused
		bind:ended
		bind:volume
		use:useHls
		on:play|once={async () => {
			volume = Number(lsdb.get('videoVolume')) || 0;
			setInputValue(volume);
			hls.startLoad();
		}}
		on:click={() => {
			if (paused || ended || !videoStarted) {
				videoStarted = true;
				videoNode.play();
				console.log('plays');
			} else videoNode.pause();
		}}
		style:aspect-ratio={(redditVideo?.width ?? 0) / (redditVideo?.height ?? 0)}
		class="w-full object-contain"
		controls={false}
		{poster}
		height={redditVideo?.height}
		width={redditVideo?.width}
	/>

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
