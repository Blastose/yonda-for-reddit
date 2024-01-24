<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import ThumbnailHint from './ThumbnailHint.svelte';

	export let submission: SubmissionData;
</script>

<a target="_blank" rel="noreferrer" href={submission.url} class="flex">
	<span class="thumbnail-image relative">
		<img src={submission.thumbnail} alt="" />
		<ThumbnailHint {submission} />
	</span>
</a>

<style>
	img {
		border-radius: 0.125rem;
	}
</style>
