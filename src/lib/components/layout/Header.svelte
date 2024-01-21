<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import Drawer from './Drawer.svelte';
	import YondaIcon from './YondaIcon.svelte';
	import { createAuthUrl, logout } from '$lib/reddit/reddit';
	import type { SubredditData } from 'jsrwrap/types';

	export let loggedIn: boolean;
	export let subscribedSubs: Promise<SubredditData[]> | undefined;
	export let me: { username: string } | undefined;
</script>

<header class="header">
	<div class="flex gap-2">
		<div class="block lg:hidden">
			<Drawer {subscribedSubs} />
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
		{#if !loggedIn && !me}
			<button
				on:click={() => {
					window.location.href = createAuthUrl();
				}}
			>
				<Icon name="profile"></Icon>
			</button>
		{:else}
			<button
				on:click={() => {
					logout();
				}}
			>
				{me?.name}
			</button>
		{/if}
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
