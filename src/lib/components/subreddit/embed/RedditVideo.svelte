<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import { getRedditVideoLinks } from './video';
	import Hls from 'hls.js';

	export let submission: SubmissionData;

	function getBaseUrl(url: string) {
		const match = url.match(/https:\/\/v.redd.it\/.*?\//);
		if (match) {
			return match[0];
		}
		return url;
	}

	function useHls(node: HTMLVideoElement) {
		const source = submission.media?.reddit_video?.hls_url ?? '';
		const hls = new Hls();
		hls.loadSource(source);
		hls.attachMedia(node);
	}

	$: console.log(submission.media);
	$: redditVideo = submission.media?.reddit_video;
	$: baseUrl = getBaseUrl(submission.media?.reddit_video?.fallback_url ?? '');
	// $: console.log(getRedditVideoLinks(baseUrl));
</script>

<div
	class="flex max-h-[512px] justify-center overflow-hidden rounded-2xl border border-[#303030] bg-black"
>
	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		style:aspect-ratio={(redditVideo?.width ?? 0) / (redditVideo?.height ?? 0)}
		class="object-contain"
		use:useHls
		controls
		height={redditVideo?.height}
		width={redditVideo?.width}
	/>
</div>
