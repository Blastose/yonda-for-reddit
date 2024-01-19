<script lang="ts">
	import Hint, { type HintType } from '../comment/Hint.svelte';
	import RelativeTime from './RelativeTime.svelte';
	import UserFlair, { type AuthorFlair } from './UserFlair.svelte';

	export let submitter: {
		author: string;
		created_utc: number;
		edited: number | boolean;
	} & HintType &
		AuthorFlair;
	export let type: 'submission' | 'comment';
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

	<div
		class="{type === 'submission'
			? 'text-sm font-semibold'
			: 'text-xs'} text-[var(--visited-link-color)]"
	>
		•
		<RelativeTime postedTimeSeconds={submitter.created_utc} editedTimeSeconds={submitter.edited} />
	</div>
	<Hint hint={submitter} {type} />
</div>
