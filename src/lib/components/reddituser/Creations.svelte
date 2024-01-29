<script lang="ts">
	import type { UserCreation } from '$lib/reddit/reddit';
	import { submissionDisplayStore } from '$lib/stores/submissionDisplayStore';
	import type { Comment, SubmissionData } from 'jsrwrap/types';
	import UserComment from '../comment/UserComment.svelte';
	import Hr from '../layout/Hr.svelte';
	import SubmissionCard from '../subreddit/SubmissionCard.svelte';
	import SubmissionClassic from '../subreddit/SubmissionClassic.svelte';

	export let creations:
		| { data: UserCreation[]; type: 'both' }
		| { data: SubmissionData[]; type: 'submission' }
		| { data: (Comment & { type: 'comment' })[]; type: 'comment' };
</script>

<div class="flex flex-col gap-2">
	{#if creations.type == 'both'}
		{#each creations.data as creation}
			{#if creation.type === 'post'}
				{#if $submissionDisplayStore === 'card'}
					<SubmissionCard submission={creation} />
				{:else}
					<SubmissionClassic submission={creation} />
				{/if}
			{:else}
				<UserComment comment={creation} />
			{/if}
			<Hr />
		{/each}
	{:else if creations.type === 'submission'}
		{#each creations.data as creation}
			{#if $submissionDisplayStore === 'card'}
				<SubmissionCard submission={creation} />
			{:else}
				<SubmissionClassic submission={creation} />
			{/if}
			<Hr />
		{/each}
	{:else if creations.type === 'comment'}
		{#each creations.data as creation}
			<UserComment comment={creation} />
			<Hr />
		{/each}
	{/if}
</div>
