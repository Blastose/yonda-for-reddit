<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import Icon from '../icon/Icon.svelte';
	import { addSearchParamToUrl } from '$lib/url/url';

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({
		loop: true,
		preventScroll: false,
		forceVisible: true
	});

	type Time = {
		display: string;
		value: string;
	};

	const timeMap = {
		hour: 'Now',
		day: 'Today',
		week: 'This Week',
		month: 'This Month',
		year: 'This Year',
		all: 'All Time'
	};

	const timeOptions: Time[] = [
		{
			display: 'Now',
			value: 'hour'
		},
		{
			display: 'Today',
			value: 'day'
		},
		{
			display: 'This Week',
			value: 'week'
		},
		{
			display: 'This Month',
			value: 'month'
		},
		{
			display: 'This Year',
			value: 'year'
		},
		{
			display: 'All Time',
			value: 'all'
		}
	];

	$: currentTimeSort = ($page.url.searchParams.get('t') ?? 'day') as keyof typeof timeMap;
	$: currentSort = $page.params.sort ?? 'hot';
	$: display = `${timeMap[currentTimeSort]}`;
</script>

{#if currentSort === 'top' || currentSort === 'controversial'}
	<button
		type="button"
		class="flex w-fit items-center gap-1 rounded-3xl px-4 py-1 text-sm hover:bg-neutral-700"
		use:melt={$trigger}
	>
		<span>{display}</span>
		<Icon name="chevronDown" />
	</button>

	{#if $open}
		<div
			class="flex flex-col overflow-hidden rounded-md bg-neutral-700 text-sm"
			use:melt={$menu}
			transition:fly={{ duration: 150, y: -10 }}
		>
			<span class="px-4 py-2 font-bold">Sort by</span>
			{#each timeOptions as sortOption}
				<a
					use:melt={$item}
					href={addSearchParamToUrl($page.url, 't', sortOption.value)}
					class=" px-8 py-2 capitalize hover:bg-neutral-600
        {currentTimeSort === sortOption.value ? 'bg-neutral-600' : ''} "
				>
					{sortOption.display}
				</a>
			{/each}
		</div>
	{/if}
{/if}
