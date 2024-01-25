<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import { MediaPlayer } from 'dashjs';
	import VideoBase from './VideoBase.svelte';

	export let submission: SubmissionData;
	let dashPlayer: dashjs.MediaPlayerClass;

	function dash(node: HTMLVideoElement) {
		dashPlayer = MediaPlayer().create();
		dashPlayer.initialize();
		dashPlayer.setAutoPlay(false);
		dashPlayer.attachView(node);

		function play() {
			dashPlayer.attachSource(source);
		}
		node.addEventListener('play', play, { once: true });

		return {
			destroy() {
				node.removeEventListener('play', play);
			}
		};
	}

	$: console.log(submission.media);
	$: redditVideo = submission.media?.reddit_video;
	$: source = submission.media?.reddit_video?.dash_url ?? '';

	$: poster =
		submission.preview?.images.at(0)?.resolutions.at(3)?.url ??
		submission.preview?.images.at(0)?.resolutions.at(0)?.url;
</script>

<VideoBase
	action={dash}
	height={redditVideo?.height ?? 0}
	width={redditVideo?.width ?? 0}
	{poster}
	{submission}
	loop={false}
/>
