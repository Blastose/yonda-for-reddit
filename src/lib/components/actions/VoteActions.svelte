<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import { formatter } from '$lib/reddit/number';
	import { jsrwrap } from '$lib/reddit/reddit';
	import { loggedInStore } from '$lib/stores/loggedInStore';

	type Votable = {
		likes: boolean | null;
		name: string;
		score: number;
	};
	export let votable: Votable;
	export let preventVotes: boolean;
	export let persistVote: (v?: { score: number; likes: boolean | null }) => void;
	export let type: 'submission' | 'comment';

	async function upvote() {
		if (!$loggedInStore) return;
		if (votable.likes === null) {
			votable.score++;
		} else if (votable.likes === false) {
			votable.score += 2;
		}
		votable.likes = true;
		persistVote(votable);
		await jsrwrap.getActions().vote({ id: votable.name, dir: 1 });
	}

	async function downvote() {
		if (!$loggedInStore) return;
		if (votable.likes === true) {
			votable.score -= 2;
		} else if (votable.likes === null) {
			votable.score--;
		}
		votable.likes = false;
		persistVote(votable);
		await jsrwrap.getActions().vote({ id: votable.name, dir: -1 });
	}

	async function resetVote() {
		if (!$loggedInStore) return;
		if (votable.likes === true) {
			votable.score--;
		} else if (votable.likes === false) {
			votable.score++;
		}
		votable.likes = null;
		persistVote(votable);
		await jsrwrap.getActions().vote({ id: votable.name, dir: 0 });
	}

	function getVoteStatus(votable: Votable) {
		if (votable.likes === true) {
			return 'upvoted';
		} else if (votable.likes === false) {
			return 'downvoted';
		} else {
			return 'none';
		}
	}

	$: voteStatus = getVoteStatus(votable);
</script>

{#if preventVotes}
	<div
		class="flex w-fit items-center gap-1 overflow-hidden rounded-2xl text-sm
{voteStatus === 'upvoted' && type === 'submission' ? 'bg-[var(--upvote-color)]' : ''}
{voteStatus === 'downvoted' && type === 'submission' ? 'bg-[var(--downvote-color)]' : ''}
{voteStatus === 'none' && type === 'submission' ? 'bg-[var(--accent-l1)]' : ''}"
	>
		<button
			disabled={true}
			class="rounded-r-full px-1 py-1
		{voteStatus === 'upvoted' && type === 'comment' ? 'text-[var(--upvote-color)]' : ''}
		{voteStatus === 'none' ? 'opacity-30' : ''}"
			type="button"
		>
			{#if voteStatus === 'upvoted'}
				<Icon name="arrowUpBold" />
			{:else}
				<Icon name="arrowUpOutline" />
			{/if}
		</button>
		<span class="" title={votable.score.toString()}>{formatter.format(votable.score)}</span>
		<button
			disabled={true}
			class="rounded-l-full px-1 py-1
		{voteStatus === 'downvoted' && type === 'comment' ? 'text-[var(--downvote-color)]' : ''}
		{voteStatus === 'none' ? 'opacity-30' : ''}"
			type="button"
		>
			{#if voteStatus === 'downvoted'}
				<Icon name="arrowDownBold" />
			{:else}
				<Icon name="arrowDownOutline" />
			{/if}
		</button>
	</div>
{:else}
	<div
		class="flex w-fit items-center gap-1 overflow-hidden rounded-2xl text-sm
{voteStatus === 'upvoted' && type === 'submission' ? 'bg-[var(--upvote-color)]' : ''}
{voteStatus === 'downvoted' && type === 'submission' ? 'bg-[var(--downvote-color)]' : ''}
{voteStatus === 'none' && type === 'submission' ? 'bg-[var(--accent-l1)]' : ''}"
	>
		<button
			class="rounded-r-full px-1 py-1
		{voteStatus === 'upvoted' && type === 'comment' ? 'text-[var(--upvote-color)]' : ''}
		{type === 'submission' ? 'hover:bg-black/40' : 'hover:bg-white/10'}
		{voteStatus === 'none' ? 'hover:text-[var(--upvote-color)]' : ''}"
			type="button"
			aria-label="upvote"
			on:click={() => {
				if (voteStatus === 'upvoted') {
					resetVote();
				} else {
					upvote();
				}
			}}
		>
			{#if voteStatus === 'upvoted'}
				<Icon name="arrowUpBold" />
			{:else}
				<Icon name="arrowUpOutline" />
			{/if}
		</button>
		<span class="" title={votable.score.toString()}>{formatter.format(votable.score)}</span>
		<button
			class="rounded-l-full px-1 py-1
		{voteStatus === 'downvoted' && type === 'comment' ? 'text-[var(--downvote-color)]' : ''}
		{type === 'submission' ? 'hover:bg-black/40' : 'hover:bg-white/10'}
		{voteStatus === 'none' ? 'hover:text-[var(--downvote-color)]' : ''}"
			type="button"
			aria-label="downvote"
			on:click={() => {
				if (voteStatus === 'downvoted') {
					resetVote();
				} else {
					downvote();
				}
			}}
		>
			{#if voteStatus === 'downvoted'}
				<Icon name="arrowDownBold" />
			{:else}
				<Icon name="arrowDownOutline" />
			{/if}
		</button>
	</div>
{/if}
