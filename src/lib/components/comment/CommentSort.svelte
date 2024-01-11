<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import type { Sort, SubmissionData } from 'jsrwrap/types';
	import { page } from '$app/stores';
	import Icon from '../icon/Icon.svelte';
	import { addSearchParamToUrl } from '$lib/url/url';

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({
		loop: true,
		preventScroll: false,
		forceVisible: true,
		positioning: { placement: 'bottom-start' }
	});

	export let submission: SubmissionData;

	$: suggestedSort = submission.suggested_sort ?? 'confidence';
	$: paramSort = $page.url.searchParams.get('sort') as Sort | undefined;
	$: currentSort = paramSort ?? suggestedSort;

	const sortMap = {
		confidence: 'Best',
		top: 'Top',
		new: 'New',
		controversial: 'Controversial',
		old: 'Old',
		qa: 'Q&a',
		random: 'Random'
	};

	const sortOptions = [
		{
			display: 'Best',
			value: 'confidence'
		},
		{
			display: 'Top',
			value: 'top'
		},
		{
			display: 'New',
			value: 'new'
		},
		{
			display: 'Controversial',
			value: 'controversial'
		},
		{
			display: 'Old',
			value: 'old'
		},
		{
			display: 'Q&a',
			value: 'qa'
		}
	];

	function showSuggestedText(paramSortParameter: Sort | undefined) {
		// We want to show suggested text only if:
		// 1. The url is `/` (no sort?) and the suggested_sort key is not confidence
		// 2. The sort? param is equal to the suggested_sort key and the suggested_sort key is not confidence
		if (suggestedSort !== 'confidence') {
			if (!paramSortParameter) {
				return true;
			}
			if (paramSortParameter === suggestedSort) {
				return true;
			}
		}
		return false;
	}

	$: dropdownDisplayText = `Sort By: ${sortMap[currentSort]} ${
		showSuggestedText(paramSort) ? '(Suggested)' : ''
	}`;

	function isActive(currentOption: string) {
		return currentOption === currentSort;
	}
</script>

<button type="button" class="flex w-fit items-center gap-1 text-sm" use:melt={$trigger}>
	{dropdownDisplayText}
	<Icon name="chevronDown" />
</button>

{#if $open}
	<div
		class="flex flex-col overflow-hidden rounded-md bg-neutral-700 text-sm"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}
	>
		<span class="px-4 py-2 font-bold">Sort by</span>
		{#each sortOptions as sortOption}
			<a
				data-sveltekit-noscroll
				data-sveltekit-replacestate
				use:melt={$item}
				class="px-8 py-2 hover:bg-neutral-600
        {isActive(sortOption.value) ? 'bg-neutral-600' : ''} "
				href={addSearchParamToUrl($page.url, 'sort', sortOption.value)}>{sortOption.display}</a
			>
		{/each}
	</div>
{/if}
