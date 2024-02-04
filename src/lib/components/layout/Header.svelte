<script lang="ts">
	import Drawer from './Drawer.svelte';
	import YondaIcon from './YondaIcon.svelte';
	import { createAuthUrl } from '$lib/reddit/reddit';
	import type { RedditUser } from 'jsrwrap/types';
	import UserMenu from './UserMenu.svelte';
	import Search from './Search.svelte';

	export let loggedIn: boolean;
	export let me: RedditUser | undefined;
</script>

<header class="header">
	<div class="flex gap-2">
		<div class="block lg:hidden">
			<Drawer />
		</div>
		<div class="flex items-center lg:hidden">
			<a class="block text-2xl font-bold" aria-label="Yonda homepage" href="/"><YondaIcon /></a>
		</div>
		<div class="hidden lg:flex">
			<a class="flex items-center gap-2 text-2xl font-bold" aria-label="Yonda homepage" href="/">
				<YondaIcon />Yonda</a
			>
		</div>
	</div>

	<div class="flex grow justify-center">
		<Search />
	</div>

	{#if !loggedIn || !me}
		<button
			class="flex h-10 items-center justify-center whitespace-nowrap rounded-3xl bg-[#43465f] px-4 text-sm font-semibold"
			on:click={() => {
				window.location.href = createAuthUrl();
			}}
		>
			Log In
		</button>
	{:else}
		<UserMenu user={me} />
	{/if}
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
