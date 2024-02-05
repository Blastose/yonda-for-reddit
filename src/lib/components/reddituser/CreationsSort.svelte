<script lang="ts">
	import { page } from '$app/stores';
	import type { RedditUser } from 'jsrwrap/types';
	import SortTime from '../subreddit/SortTime.svelte';
	import Sort from './Sort.svelte';
	import SortItem from './SortItem.svelte';

	export let username: string;
	export let currentUser: RedditUser | undefined;

	const whereOptions = [
		{ name: 'Overview', url: null },
		{ name: 'Posts', url: 'submitted' },
		{ name: 'Comments', url: 'comments' },
		{ name: 'Saved', url: 'saved', requiresIsUser: true },
		{ name: 'Hidden', url: 'hidden', requiresIsUser: true },
		{ name: 'Upvoted', url: 'upvoted', requiresIsUser: true },
		{ name: 'Downvoted', url: 'downvoted', requiresIsUser: true }
	];

	function buildUrl(username: string, u: string | null) {
		if (u) {
			return `/user/${username}/${u}`;
		}
		return `/user/${username}`;
	}

	$: userWhere = $page.params.userWhere;
	$: t = $page.url.searchParams.get('sort') ?? 'new';
</script>

<div class="flex flex-col gap-2">
	<div class="grid">
		<div class="thin-scrollbar flex gap-4 overflow-x-auto">
			{#each whereOptions as where}
				{#if !where.requiresIsUser || currentUser?.name.toLowerCase() === username}
					{@const href = buildUrl(username, where.url)}
					<SortItem name={where.name} {href} active={$page.url.pathname === href} />
				{/if}
			{/each}
		</div>
	</div>

	{#if userWhere === undefined || userWhere === 'submitted' || userWhere === 'comments'}
		<div class="flex">
			<Sort />
			{#if t === 'top' || t === 'hot' || t === 'controversial'}
				<SortTime defaultSort="all" />
			{/if}
		</div>
	{/if}
</div>
