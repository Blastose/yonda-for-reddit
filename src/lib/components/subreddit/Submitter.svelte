<script lang="ts">
	import Hint, { type HintType } from '../comment/Hint.svelte';
	import RelativeTime from './RelativeTime.svelte';
	import UserFlair, { type AuthorFlair } from './UserFlair.svelte';

	export let submitter: {
		author: string;
		created_utc: number;
		edited: number | boolean;
		subreddit_name_prefixed: string;
	} & HintType &
		AuthorFlair;
	export let type: 'submission' | 'comment';
	export let showSubreddit: boolean = false;
</script>

<div class="flex flex-wrap items-center gap-1">
	<div class="flex flex-wrap gap-2 text-sm">
		{#if submitter.author !== '[deleted]'}
			<a
				href="/user/{submitter.author}"
				class="text-sm font-semibold text-[var(--reddit-username-color)]">{submitter.author}</a
			>
		{:else}
			<p class="text-sm font-semibold text-[var(--reddit-username-color)]">{submitter.author}</p>
		{/if}

		<UserFlair author={submitter} />
	</div>

	<div class="text-xs {type === 'submission' ? 'font-semibold' : 'text-xs'}">
		•
		<RelativeTime postedTimeSeconds={submitter.created_utc} editedTimeSeconds={submitter.edited} />
	</div>
	{#if showSubreddit}
		<span class="text-sm font-semibold text-[var(--visited-link-color)]">in</span>
		<a
			class="text-sm font-semibold text-[var(--reddit-username-color)]"
			href="/{submitter.subreddit_name_prefixed.toLowerCase()}"
			>{submitter.subreddit_name_prefixed}</a
		>
	{/if}

	<Hint hint={submitter} {type} />
</div>
