<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade, fly } from 'svelte/transition';
	import Icon from '$lib/components/icon/Icon.svelte';
	import { writable } from 'svelte/store';
	import { quintOut } from 'svelte/easing';
	import Sidebar from './Sidebar.svelte';

	const customOpen = writable(false);

	const {
		elements: { trigger, overlay, content, close, portalled, title }
	} = createDialog({
		forceVisible: true,
		preventScroll: false,
		open: customOpen
	});

	function handleNavigation() {
		customOpen.set(false);
	}
</script>

<button use:melt={$trigger} class="btn rounded-sm p-1" aria-label="Open sidebar">
	<Icon name="menu" />
</button>

<div use:melt={$portalled}>
	{#if $customOpen}
		<div use:melt={$overlay} class="modal-bg" transition:fade={{ duration: 150 }} />
		<div
			use:melt={$content}
			class="modal-drawer"
			transition:fly={{
				x: -312,
				duration: 450,
				opacity: 1,
				easing: quintOut
			}}
		>
			<button use:melt={$close} aria-label="Close" class="close-btn btn">
				<Icon name="close" />
			</button>

			<p class="hidden" use:melt={$title}>Sidebar</p>
			<div class="pt-8">
				<Sidebar type="drawer" />
			</div>
		</div>
	{/if}
</div>

<style>
	.modal-drawer {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999999;
		height: 100dvh;
		width: 100%;
		max-width: var(--sidebar-width);
		background-color: var(--bg);
		outline: 2px solid transparent;
		outline-offset: 2px;
	}
</style>
