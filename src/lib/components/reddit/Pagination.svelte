<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '../icon/Icon.svelte';

	export let before: string | null;
	export let after: string | null;
	export let count: number | undefined;
	export let dist: number;

	function getCurrent(url: URL) {
		if (url.searchParams.get('before')) {
			return 'before';
		}
		if (url.searchParams.get('after')) {
			return 'after';
		}
		return 'after';
	}

	function createNewUrl(beforeAfter: string, paramName: 'before' | 'after', currentUrl: URL) {
		const url = new URL($page.url);
		const current = getCurrent(currentUrl);
		let newCount = 0;
		if (paramName === 'before') {
			url.searchParams.delete('after');
			if (current === 'after') {
				newCount = (count ?? 0) + 1;
			} else {
				newCount = (count ?? 0) - dist;
			}
		} else if (paramName === 'after') {
			url.searchParams.delete('before');
			if (current === 'after') {
				newCount = (count ?? 0) + dist;
			} else {
				newCount = (count ?? 0) - 1;
			}
		}

		url.searchParams.set('count', newCount.toString());
		url.searchParams.set(paramName, beforeAfter);
		return url.href;
	}
</script>

<div class="flex gap-2">
	{#if before}
		<a href={createNewUrl(before, 'before', $page.url)}><Icon name="chevronLeft" />prev</a>
	{/if}
	{#if after}
		<a href={createNewUrl(after, 'after', $page.url)}>next<Icon name="chevronRight" /></a>
	{/if}
</div>

<style>
	/* TODO refactor out */
	a {
		background-color: #3b3b3f;
		padding: 0.25rem 1rem;
		border-radius: 2rem;
		transition-duration: 150ms;
		display: flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		gap: 0.125rem;
	}

	a:hover {
		background-color: #2f2f33;
	}
</style>
