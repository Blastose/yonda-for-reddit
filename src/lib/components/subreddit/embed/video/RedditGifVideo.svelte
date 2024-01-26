<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import VideoBase from './VideoBase.svelte';

	export let submission: SubmissionData;
	export let video:
		| {
				width: number;
				height: number;
				url: string;
		  }
		| undefined;
	export let poster: string | undefined = undefined;
	export let autoplay: boolean = false;
</script>

<VideoBase
	loop={true}
	{submission}
	{poster}
	{autoplay}
	width={video?.width ?? 0}
	height={video?.height ?? 0}
	src={video?.url ?? ''}
/>
