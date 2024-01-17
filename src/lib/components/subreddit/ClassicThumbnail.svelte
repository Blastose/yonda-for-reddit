<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import type { SubmissionData } from 'jsrwrap/types';

	export let hasThumbnail: boolean;
	export let submission: SubmissionData;
	export let handleClick: () => void;
</script>

<button class="w-full" on:click={handleClick}>
	{#if hasThumbnail}
		<span class="thumbnail-image">
			<img src={submission.thumbnail} alt="" />
		</span>
	{:else if submission.thumbnail !== ''}
		<span class="thumbnail">
			{#if submission.thumbnail === 'self'}
				<span class="thumbnail-svg">
					<Icon height="24" width="24" name="selftext" />
				</span>
			{:else if submission.thumbnail === 'default'}
				<span class="thumbnail-svg">
					<Icon height="24" width="24" name="linkVariant" />
				</span>
			{:else}
				<p class="thumbnail-background">{submission.thumbnail}</p>
			{/if}
		</span>
	{/if}
</button>

<style>
	img {
		border-radius: 0.125rem;
	}

	.thumbnail-svg {
		height: 70px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgb(53, 52, 56);
		border-radius: 0.5rem;
	}

	.thumbnail-background {
		height: 70px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgb(53, 52, 56);
		border-radius: 0.5rem;
		color: white;
	}
</style>
