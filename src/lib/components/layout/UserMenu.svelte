<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/components/icon/Icon.svelte';
	import type { RedditUser } from 'jsrwrap/types';
	import { logout } from '$lib/reddit/reddit';

	export let user: RedditUser;

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		preventScroll: false,
		positioning: { placement: 'bottom-end', gutter: 16 }
	});
</script>

<button
	use:melt={$trigger}
	class="flex h-10 w-10 items-center justify-center rounded-full bg-[#5a6397]"
	type="button"
	aria-label="Open profile"
>
	<Icon name="reddit" />
</button>

{#if $open}
	<section
		class="flex w-64 flex-col gap-2 rounded-md bg-[var(--accent-l1)] p-2"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}
	>
		<a class="item" use:melt={$item} href="/u/{user.name}">
			<Icon name="reddit"></Icon>
			<span class="flex flex-col">
				<span>View profile</span>
				<span class="text-sm opacity-60">u/{user.name}</span>
			</span>
		</a>
		<a class="item" use:melt={$item} href="/settings"><Icon name="settings"></Icon>Settings</a>
		<button class="item" use:melt={$item} on:click={logout}>
			<Icon name="logout"></Icon>
			Logout</button
		>
	</section>
{/if}

<style>
	.item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-radius: 1rem;
		padding: 0.25rem 0.75rem;
	}
	.item:hover {
		background-color: var(--accent-l1-hover);
	}
</style>
