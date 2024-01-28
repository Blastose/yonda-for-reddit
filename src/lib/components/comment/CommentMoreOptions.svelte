<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/components/icon/Icon.svelte';
	import type { Comment } from 'jsrwrap/types';
	import { formatSubmissionPermalink } from '$lib/url/url';

	export let comment: Comment & {
		type: 'comment';
	};

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		preventScroll: false
	});

	let iconDimension = '16';
</script>

<button use:melt={$trigger} class="px-2" type="button" aria-label="open more options for comment">
	<Icon name="dotsHorizontal" />
</button>

{#if $open}
	<section
		class="flex flex-col overflow-hidden rounded-md bg-[var(--accent-l1)] text-sm"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}
	>
		<a href={formatSubmissionPermalink(comment.permalink)} use:melt={$item} class="item"
			><Icon name="linkVariant" height={iconDimension} width={iconDimension} />Permalink</a
		>
		<a
			href="https://reddit.com{comment.permalink}"
			target="_blank"
			rel="noreferrer"
			use:melt={$item}
			class="item"
			><Icon name="reddit" height={iconDimension} width={iconDimension} />Open in Reddit</a
		>
		<button use:melt={$item} class="item"
			><Icon name="bookmark" height={iconDimension} width={iconDimension} />Save</button
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
