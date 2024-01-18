<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import Hr from '../Hr.svelte';
	import SidebarSection from './SidebarSection.svelte';
	import SidebarSub from './SidebarSub.svelte';

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
		<SidebarSub url={'/r/genshin_impact'} display="Genshin" />
		<SidebarSub url={'/r/webdev'} display="Webdev" />
		<SidebarSub url={'/r/games'} display="games" />
		<SidebarSub url={'/r/games'} display="gamesgamesgamesgamesgamesgamesgames" />
	</div>

	<Hr />
	<SidebarSection heading="Pinned">
		{#each { length: 47 } as _}
			<SidebarSub
				url={'/r/arknights'}
				display="r/Arknights"
				icon="https://styles.redditmedia.com/t5_3ptom/styles/communityIcon_ozhi2qzq64v71.png"
			/>
		{/each}
	</SidebarSection>
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
