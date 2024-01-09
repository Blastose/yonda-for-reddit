<script lang="ts">
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
</script>

<div class="flex flex-col">
	<Header />

	<div class="mt-14 flex gap-4">
		<aside class="sidebar-wrapper sidebar-animation sticky top-14 border-r border-[#3a3a3a]">
			<Sidebar type="sidebar" />
		</aside>

		<main class="container-doku">
			<slot />
		</main>
	</div>
</div>

<style>
	.sidebar-wrapper {
		view-transition-name: sidebar;
		margin-left: -16rem;
		visibility: hidden;
		width: var(--sidebar-width);
		height: calc(100dvh - var(--header-height));
	}

	.sidebar-animation {
		transition-duration: 0.45s;
		transition-timing-function: cubic-bezier(0.17, 0.67, 0.23, 1.02);
	}

	@media (min-width: 1024px) {
		.sidebar-wrapper {
			margin-left: 0px;
			visibility: visible;
		}
	}
</style>
