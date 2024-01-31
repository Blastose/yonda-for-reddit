<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Icon from '../icon/Icon.svelte';
	import type { Action } from 'svelte/action';

	let searchTerm: string;
	let inputNode: HTMLInputElement;

	function useSlashJumpToSearchBar(_node: HTMLFormElement) {
		function jumpTosearch(e: KeyboardEvent) {
			if (e.key === '/') {
				if (document.activeElement !== inputNode) {
					e.preventDefault();
					inputNode.focus();
				}
			}
		}

		addEventListener('keydown', jumpTosearch);

		return {
			destroy() {
				removeEventListener('keydown', jumpTosearch);
			}
		};
	}

	const mousedownOutside: Action<Node, Node | undefined, { 'on:mouseoutside': () => void }> = (
		node: Node,
		toggleButton?: Node
	) => {
		const handleClick = (event: Event) => {
			if (!node.contains(event.target as Node) && !toggleButton?.contains(event.target as Node)) {
				node.dispatchEvent(new CustomEvent('mouseoutside'));
			}
		};
		document.addEventListener('mousedown', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('mousedown', handleClick, true);
			}
		};
	};

	let inputIsFocused: boolean = false;
	$: q = $page.url.searchParams.get('q') ?? '';
	$: searchTerm = q;
	$: subreddit = $page.params.subreddit;

	beforeNavigate(() => {
		inputIsFocused = false;
	});
</script>

<form
	use:useSlashJumpToSearchBar
	class="flex w-full max-w-[586px] items-center"
	on:submit={async (e) => {
		e.preventDefault();
		if (!searchTerm) {
			return;
		}
		if (subreddit) {
			await goto(`/r/${subreddit}/search?q=${searchTerm}`);
		} else {
			await goto(`/search?q=${searchTerm}&type=link`);
		}
	}}
>
	<div
		class="relative w-full"
		use:mousedownOutside
		on:mouseoutside={() => {
			inputIsFocused = false;
		}}
	>
		<button class="absolute left-2 top-2">
			<Icon name="search"></Icon>
		</button>

		<input
			bind:this={inputNode}
			bind:value={searchTerm}
			on:focus={() => {
				inputIsFocused = true;
			}}
			class="w-full rounded-3xl bg-[var(--search-input-bg)] py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-white"
			type="text"
			placeholder="Search"
			spellcheck="false"
		/>

		{#if searchTerm && searchTerm.length > 0}
			<button
				transition:fade={{ duration: 150 }}
				on:click={() => {
					searchTerm = '';
				}}
				class="absolute right-2 top-2"
			>
				<Icon name="close"></Icon>
			</button>
		{/if}

		{#if inputIsFocused && searchTerm && searchTerm.length > 0}
			<div class="absolute mt-3 w-full overflow-hidden rounded-2xl text-sm">
				{#if subreddit}
					<a href="/r/{subreddit}/search?q={searchTerm}" class="suggestion"
						>Search for "{searchTerm}" in r/{subreddit}</a
					>
				{/if}
				<a href="/r/{searchTerm}" class="suggestion">Go to r/{searchTerm}</a>
				<a href="/search?q={searchTerm}&type=link" class="suggestion"
					>Search posts for "{searchTerm}"</a
				>
				<a href="/search?q={searchTerm}&type=sr" class="suggestion"
					>Search subreddits for "{searchTerm}"</a
				>
				<a href="/search?q={searchTerm}&type=user" class="suggestion"
					>Search users for "{searchTerm}"</a
				>
			</div>
		{/if}
	</div>
</form>

<style>
	.suggestion {
		display: flex;
		padding: 0.75rem 1rem;
		background-color: var(--accent-l1);
	}

	.suggestion:hover {
		background-color: var(--accent-l1-hover);
	}
</style>
