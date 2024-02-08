<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import Hr from '../Hr.svelte';
	import SidebarSection from './SidebarSection.svelte';
	import SidebarSub from './SidebarSub.svelte';
	import { subscribedSubsStore, pinnedSubsStore } from '$lib/stores/subscribedSubsStore';
	import { loggedInStore } from '$lib/stores/loggedInStore';
	import { pinnedSubsOpenStore, subscribedSubsOpenStore } from '$lib/stores/sidebarSubsOpenStore';
	import AddPinnedSub from './AddPinnedSub.svelte';

	export let type: 'sidebar' | 'drawer';

	let pinnedSubsSection: HTMLDivElement;
	function swap(targetIndex: number, direction: 'up' | 'down') {
		return () => {
			if (targetIndex < 0) return;
			if (targetIndex + 1 === $pinnedSubsStore.length) return;

			pinnedSubsStore.update((v) => {
				[v[targetIndex], v[targetIndex + 1]] = [v[targetIndex + 1], v[targetIndex]];

				return v;
			});

			const items = pinnedSubsSection.querySelectorAll('div.sidebar-sub-buttons');
			const indexFromDirection = direction === 'up' ? targetIndex : targetIndex + 1;
			const button = items[indexFromDirection].querySelector<HTMLButtonElement>(
				`button[data-${direction === 'up' ? 'up' : 'down'}]`
			);
			if (button) {
				button.focus();
			}
		};
	}
	let reorderingPinned = false;
</script>

<div
	class="sidebar-container thin-scrollbar flex flex-col gap-2 {type === 'sidebar'
		? 'sidebar'
		: 'drawer'} "
>
	<div>
		<SidebarSub url="/" useSlot={true} display="Home" reorder={undefined}>
			<Icon name="home" /></SidebarSub
		>
		<SidebarSub url="/r/popular" useSlot={true} display="Popular" reorder={undefined}>
			<Icon name="trendingUp" /></SidebarSub
		>
		<SidebarSub url="/r/all" useSlot={true} display="All" reorder={undefined}>
			<Icon name="alphaABox" /></SidebarSub
		>
	</div>

	<Hr />
	<SidebarSection
		bind:container={pinnedSubsSection}
		heading="Pinned"
		open={$pinnedSubsOpenStore}
		toggleOpen={() => {
			pinnedSubsOpenStore.update((v) => !v);
		}}
	>
		<AddPinnedSub />
		<button
			class="flex w-full items-center gap-2 rounded-2xl px-4 py-2 hover:bg-[var(--bg-hover)]"
			on:click={() => {
				reorderingPinned = !reorderingPinned;
			}}><Icon name="swapVertical" />{!reorderingPinned ? 'Reorder' : 'Exit reordering'}</button
		>
		{#each $pinnedSubsStore as sub, index}
			<SidebarSub
				url="/r/{sub.displayName.toLowerCase()}"
				display="r/{sub.displayName}"
				icon={sub.iconUrl}
				reorder={{
					moveDown: swap(index, 'down'),
					moveUp: swap(index - 1, 'up'),
					reordering: reorderingPinned
				}}
			/>
		{/each}
	</SidebarSection>

	<Hr />

	{#if $loggedInStore}
		<SidebarSection
			heading="Subscribed"
			open={$subscribedSubsOpenStore}
			toggleOpen={() => {
				subscribedSubsOpenStore.update((v) => !v);
			}}
		>
			{#each $subscribedSubsStore.value as sub}
				{@const icon = sub?.community_icon || sub?.icon_img}
				<SidebarSub
					url="/{sub.display_name_prefixed.toLowerCase()}"
					display={sub.display_name_prefixed}
					{icon}
					reorder={undefined}
				/>
			{/each}
		</SidebarSection>
	{/if}
</div>

<style>
	.sidebar-container {
		overflow-y: auto;
		width: var(--sidebar-width);
	}

	.sidebar-container.sidebar {
		height: 100%;
		padding: 1rem;
	}

	.sidebar-container.drawer {
		height: calc(100dvh - 2rem);
		padding: 0rem 1rem;
	}
</style>
