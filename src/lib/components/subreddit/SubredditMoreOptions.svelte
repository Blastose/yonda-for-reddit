<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/components/icon/Icon.svelte';
	import type { SubredditData } from 'jsrwrap/types';
	import { addToast } from '../toast/Toaster.svelte';
	import { pinnedSubsStore } from '$lib/stores/subscribedSubsStore';

	export let about: SubredditData;

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		preventScroll: false
	});

	$: isPinned = $pinnedSubsStore.find((v) => v.displayName === about.display_name);

	function handlePin() {
		if (isPinned) {
			pinnedSubsStore.update((v) => {
				v = v.filter((d) => d.displayName !== about.display_name);
				return v;
			});
			addToast({ data: { title: 'Unpinned!', type: 'success' } });
		} else {
			pinnedSubsStore.update((v) => {
				const icon = about?.community_icon || about?.icon_img || undefined;
				v.push({ displayName: about.display_name, iconUrl: icon });
				v.sort((a, b) => a.displayName.localeCompare(b.displayName, 'en', { sensitivity: 'base' }));
				return v;
			});
			addToast({ data: { title: 'Pinned subreddit!', type: 'success' } });
		}
	}
</script>

<button use:melt={$trigger} class="px-1" type="button" aria-label="open more options for comment">
	<Icon name="dotsVertical" />
</button>

{#if $open}
	<section
		class="flex flex-col overflow-hidden rounded-md bg-[var(--accent-l1)] text-sm"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}
	>
		<button use:melt={$item} class="item" on:click={handlePin}
			><Icon name="pin" />{isPinned ? 'Unpin' : 'Pin'}</button
		>
		<a
			class="item"
			target="_blank"
			rel="noreferrer"
			href="https://www.reddit.com/{about.display_name_prefixed}"
			><Icon name="reddit" />Open in Reddit</a
		>
	</section>
{/if}

<!-- TODO refactor this style with other dropdowns -->
<style>
	.item {
		display: flex;
		align-items: center;
		padding: 0.5rem 1rem;
		gap: 0.5rem;
	}
	.item:hover {
		background-color: var(--accent-l1-hover);
	}
</style>
