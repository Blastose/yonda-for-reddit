<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import type { SubmissionData } from 'jsrwrap/types';
	import { getSubmissionType } from './embed/embed';

	export let submission: SubmissionData;

	$: submissionType = getSubmissionType(submission);
</script>

<span class="absolute bottom-0 right-0 m-1 flex rounded-md bg-black/80">
	{#if submissionType === 'image'}
		<Icon class="text-white" name="image"></Icon>
	{:else if submissionType === 'gallery'}
		<Icon class="text-white" name="imageMultiple"></Icon>
	{:else if submissionType === 'link'}
		<Icon class="text-white" name="externalLink"></Icon>
	{:else if submissionType === 'self'}
		<Icon class="text-white" name="selftext"></Icon>
	{:else if submissionType === 'video'}
		<Icon class="text-white" name="video"></Icon>
	{/if}
</span>
