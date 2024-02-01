<script lang="ts">
	import type { RedditUser } from 'jsrwrap/types';
	import Hr from '../layout/Hr.svelte';
	import { formatDate } from '$lib/reddit/number';

	export let redditUser: RedditUser;
</script>

<div class="flex flex-col gap-2 rounded-md bg-[var(--accent-l2)] p-4 text-sm">
	<p class="text-lg font-bold">{redditUser.name}</p>

	<Hr />

	<div class="flex flex-wrap gap-x-10 gap-y-2 text-sm font-semibold">
		<div class="stats" title={redditUser.link_karma.toString()}>
			{redditUser.link_karma.toLocaleString()}
			<span>Post Karma</span>
		</div>
		<div class="stats" title={redditUser.comment_karma.toString()}>
			{redditUser.comment_karma.toLocaleString()}
			<span>Comment Karma</span>
		</div>
		<div class="stats">
			{formatDate(new Date(redditUser.created * 1000))}
			<span>Cake day</span>
		</div>
	</div>
</div>

<style>
	.stats {
		display: flex;
		flex-direction: column;
	}

	.stats > span {
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--visited-link-color);
	}
</style>
