<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import type { SubmissionData } from 'jsrwrap/types';
	import ThumbnailHint from './ThumbnailHint.svelte';

	export let hasThumbnail: boolean;
	export let submission: SubmissionData;
	export let handleClick: () => void;
</script>

<button class="w-full" on:click={handleClick}>
	{#if hasThumbnail}
		<span class="thumbnail-image relative">
			<img src={submission.thumbnail} alt="" />
			<ThumbnailHint {submission} />
		</span>
	{:else if submission.thumbnail !== ''}
		<span>
			{#if submission.thumbnail === 'self'}
				<span class="thumbnail">
					<Icon height="24" width="24" name="selftext" />
				</span>
			{:else if submission.thumbnail === 'default'}
				<span class="thumbnail">
					<Icon height="24" width="24" name="externalLink" />
				</span>
			{:else}
				<span class="thumbnail relative">
					{submission.thumbnail}
					<ThumbnailHint {submission} />
				</span>
			{/if}
		</span>
	{/if}
</button>

<style>
	img {
		border-radius: 0.125rem;
	}

	.thumbnail {
		height: 70px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--accent-l1);
		border-radius: 0.5rem;
	}
</style>
