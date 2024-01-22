<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import VideoBase from './VideoBase.svelte';

	export let submission: SubmissionData;

	$: source = submission.preview.images.at(0)?.variants?.mp4?.source;
</script>

<VideoBase
	loop={true}
	{submission}
	width={source?.width ?? 0}
	height={source?.height ?? 0}
	src={source?.url ?? ''}
/>
