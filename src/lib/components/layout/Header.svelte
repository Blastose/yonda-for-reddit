<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import Drawer from './Drawer.svelte';
</script>

<header class="header">
	<div class="flex gap-2">
		<div class="block lg:hidden">
			<Drawer />
		</div>
		<div class="block lg:hidden">
			<a class="block text-2xl font-bold" aria-label="Dokusha homepage" href="/">D</a>
		</div>
		<div class="hidden lg:block">
			<a class="block text-2xl font-bold" aria-label="Dokusha homepage" href="/">Dokusha</a>
		</div>
	</div>

	<div class="flex grow justify-center">
		<div class="flex w-full max-w-[586px] items-center">
			<button class="relative left-8">
				<Icon name="search"></Icon>
			</button>
			<input
				class="w-full rounded-3xl bg-[var(--search-input-bg)] px-4 py-2 pl-10"
				type="text"
				placeholder="Search"
			/>
		</div>
	</div>

	<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600">
		<Icon name="profile"></Icon>
	</div>
</header>

<style>
	.header {
		display: flex;
		gap: 2rem;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		padding: 0rem 1rem;
		top: 0;
		z-index: 10;
		height: var(--header-height);
		width: 100%;
		border-bottom-width: 1px;
		border-color: var(--divider-color);
		background-color: var(--bg);
		view-transition-name: header;
	}
</style>
