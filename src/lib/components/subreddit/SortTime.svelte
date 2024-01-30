<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import Icon from '../icon/Icon.svelte';

	export let defaultSort: string = 'day';

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

	$: currentTimeSort = ($page.url.searchParams.get('t') ?? defaultSort) as keyof typeof timeMap;
	$: display = `${timeMap[currentTimeSort]}`;

	export function addSearchParamToUrl(
		url: URL,
		newSearchParam: string,
		newSearchParamValue: string
	) {
		const urlClone = new URL(url);
		console.log(urlClone.search);
		const toDelete: string[] = [];
		for (const [key, _] of urlClone.searchParams) {
			if (key !== 'sort' && key !== 'q') {
				toDelete.push(key);
			}
		}
		for (const key of toDelete) {
			urlClone.searchParams.delete(key);
		}
		urlClone.searchParams.set(newSearchParam, newSearchParamValue);

		return urlClone.toString();
	}
</script>

<button
	type="button"
	class="flex w-fit items-center gap-1 rounded-3xl px-4 py-1 text-sm hover:bg-[var(--accent-l1)]"
	use:melt={$trigger}
>
	<span>{display}</span>
	<Icon name="chevronDown" />
</button>

{#if $open}
	<div
		class="flex flex-col overflow-hidden rounded-md bg-[var(--accent-l1)] text-sm shadow-lg"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}
	>
		<span class="px-4 py-2 font-bold">Sort by</span>
		{#each timeOptions as sortOption}
			<a
				use:melt={$item}
				href={addSearchParamToUrl($page.url, 't', sortOption.value)}
				class=" px-8 py-2 capitalize hover:bg-[var(--accent-l1-hover)]
        {currentTimeSort === sortOption.value ? 'bg-[var(--accent-l1-hover)]' : ''} "
			>
				{sortOption.display}
			</a>
		{/each}
	</div>
{/if}
