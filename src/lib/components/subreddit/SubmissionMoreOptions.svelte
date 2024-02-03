<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/components/icon/Icon.svelte';
	import type { SubmissionData } from 'jsrwrap/types';
	import { jsrwrap } from '$lib/reddit/reddit';
	import { addToast } from '../toast/Toaster.svelte';

	export let submission: SubmissionData;

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		preventScroll: false
	});

	let iconDimension = '16';

	function handleSave() {
		if (submission.saved) {
			jsrwrap.getActions().unsave({ id: submission.name });
			submission.saved = false;
			addToast({ data: { title: 'Unsaved!', type: 'success' } });
		} else {
			jsrwrap.getActions().save({ id: submission.name });
			addToast({ data: { title: 'Saved!', type: 'success' } });
			submission.saved = true;
		}
	}

	function handleHide() {
		if (submission.hidden) {
			jsrwrap.getActions().unhide({ id: submission.name });
			submission.hidden = false;
			addToast({ data: { title: 'Unhidden!', type: 'success' } });
		} else {
			jsrwrap.getActions().hide({ id: submission.name });
			addToast({ data: { title: 'Hidden!', type: 'success' } });
			submission.hidden = true;
		}
	}
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
		<a
			href="https://reddit.com{submission.permalink}"
			target="_blank"
			rel="noreferrer"
			use:melt={$item}
			class="item"
			><Icon name="reddit" height={iconDimension} width={iconDimension} />Open in Reddit</a
		>
		<button use:melt={$item} class="item" on:click={handleSave}
			><Icon name="bookmark" height={iconDimension} width={iconDimension} />{submission.saved
				? 'Unsave'
				: 'Save'}</button
		>
		<button use:melt={$item} class="item" on:click={handleHide}
			><Icon name="eyeOff" height={iconDimension} width={iconDimension} />{submission.hidden
				? 'Unhide'
				: 'Hide'}</button
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
