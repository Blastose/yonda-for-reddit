<script lang="ts">
</script>

<div class="flex flex-col">
	<header class="header fixed top-0 z-10 h-14 w-full border-b border-[#3a3a3a] bg-[#101010]">
		Header
	</header>

	<div class="mt-14 flex gap-4">
		<aside
			class="sidebar-wrapper sidebar-animation thin-scrollbar sticky top-14 h-[calc(100vh-3.5rem)] w-[256px] overflow-y-scroll border-r border-[#3a3a3a] p-4"
		>
			{#each { length: 100 } as _}
				<p>Sidebar</p>
			{/each}
		</aside>

		<main class="container-doku">
			<slot />
		</main>
	</div>
</div>

<style>
	.header {
		view-transition-name: header;
	}

	.sidebar-wrapper {
		view-transition-name: sidebar;
		margin-left: -16rem;
		visibility: hidden;
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
