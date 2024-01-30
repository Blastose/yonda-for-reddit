<script lang="ts">
	import { page } from '$app/stores';
	import SortItem from './SortItem.svelte';

	export let username: string;

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
</script>

<div class="flex gap-2">
	<div class="thin-scrollbar flex gap-4 overflow-x-auto">
		{#each whereOptions as where}
			{#if !where.requiresIsUser}
				{@const href = buildUrl(username, where.url)}
				<SortItem name={where.name} {href} active={$page.url.pathname === href} />
			{/if}
		{/each}
	</div>
</div>
