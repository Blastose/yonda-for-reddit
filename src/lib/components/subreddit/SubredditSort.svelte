<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import Icon from '../icon/Icon.svelte';

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({
		loop: true,
		preventScroll: false,
		forceVisible: true
	});

	$: currentSubreddit = $page.params.subreddit || undefined;
	$: currentSort = currentSubreddit ? $page.params.sort ?? 'hot' : $page.params.sort ?? 'best';
	const sortOptions = ['hot', 'new', 'top', 'rising', 'controversial'];
	const sortOptionsWithBest = ['best', 'hot', 'new', 'top', 'rising', 'controversial'];

	$: usedSortOptions = currentSubreddit === undefined ? sortOptionsWithBest : sortOptions;
	function buildSortUrl(subreddit: string | undefined, sort: string) {
		if (subreddit === undefined) {
			return `/${sort}`;
		}
		return `/r/${subreddit}/${sort}`;
	}
</script>

<button
	type="button"
	class="flex w-fit items-center gap-1 rounded-3xl px-4 py-1 text-sm hover:bg-[var(--accent-l1)]"
	use:melt={$trigger}
>
	<span class="capitalize">{currentSort}</span>
	<Icon name="chevronDown" />
</button>

<!-- TODO refactor styles with other dropdown -->
{#if $open}
	<div
		class="flex flex-col overflow-hidden rounded-md bg-[var(--accent-l1)] text-sm shadow-lg"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}
	>
		<span class="px-4 py-2 font-bold">Sort by</span>
		{#each usedSortOptions as sortOption}
			<a
				use:melt={$item}
				href={buildSortUrl(currentSubreddit, sortOption)}
				class=" px-8 py-2 capitalize hover:bg-[var(--accent-l1-hover)]
        {currentSort === sortOption ? 'bg-[var(--accent-l1-hover)]' : ''} "
			>
				{sortOption}
			</a>
		{/each}
	</div>
{/if}
