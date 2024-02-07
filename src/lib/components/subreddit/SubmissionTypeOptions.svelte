<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/components/icon/Icon.svelte';
	import { submissionDisplayStore, displayTypes } from '$lib/stores/submissionDisplayStore';

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		preventScroll: false
	});
</script>

<button
	use:melt={$trigger}
	class="flex px-2"
	type="button"
	aria-label="open more options for comment"
>
	{#if $submissionDisplayStore === 'card'}<Icon
			name="cardOutline"
		/>{:else if $submissionDisplayStore === 'classic'}<Icon
			class="rotate-180"
			name="tableOfContents"
		/>{/if}<Icon name="chevronDown" />
</button>

{#if $open}
	<section
		class="flex flex-col overflow-hidden rounded-md bg-[var(--accent-l1)] text-sm"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}
	>
		<span class="px-4 py-2 font-bold">View</span>
		{#each displayTypes as displayType}
			<button
				use:melt={$item}
				class="item capitalize"
				class:active={displayType === $submissionDisplayStore}
				on:click={() => {
					submissionDisplayStore.set(displayType);
				}}
				>{#if displayType === 'card'}<Icon
						name="cardOutline"
					/>{:else if displayType === 'classic'}<Icon
						class="rotate-180"
						name="tableOfContents"
					/>{/if}{displayType}</button
			>
		{/each}
	</section>
{/if}

<!-- TODO refactor this style with other dropdowns -->
<style>
	.item {
		display: flex;
		align-items: center;
		padding: 0.5rem 1rem;
		gap: 0.5rem;
	}
	.item.active {
		background-color: var(--accent-l1-hover);
	}
	.item:hover {
		background-color: var(--accent-l1-hover);
	}
</style>
