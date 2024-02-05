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
</script>

<div
	class="sidebar-container thin-scrollbar flex flex-col gap-2 {type === 'sidebar'
		? 'sidebar'
		: 'drawer'} "
>
	<div>
		<SidebarSub url="/" useSlot={true} display="Home">
			<Icon name="home" /></SidebarSub
		>
		<SidebarSub url="/r/popular" useSlot={true} display="Popular">
			<Icon name="trendingUp" /></SidebarSub
		>
		<SidebarSub url="/r/all" useSlot={true} display="All">
			<Icon name="alphaABox" /></SidebarSub
		>
	</div>

	<Hr />
	<SidebarSection
		heading="Pinned"
		open={$pinnedSubsOpenStore}
		toggleOpen={() => {
			pinnedSubsOpenStore.update((v) => !v);
		}}
	>
		<AddPinnedSub />
		{#each $pinnedSubsStore as sub}
			<SidebarSub
				url="/r/{sub.displayName.toLowerCase()}"
				display="r/{sub.displayName}"
				icon={sub.iconUrl}
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
				/>
			{/each}
		</SidebarSection>
	{/if}
</div>

<style>
	.sidebar-container {
		overflow-y: auto;
		width: 100%;
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
