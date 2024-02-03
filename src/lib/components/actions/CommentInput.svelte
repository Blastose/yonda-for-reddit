<script lang="ts">
	import { jsrwrap } from '$lib/reddit/reddit';
	import type { Comment } from 'jsrwrap/types';
	import Icon from '../icon/Icon.svelte';

	export let thingId: string;
	export let focus = false;
	export let afterComment: (c: Comment & { type: 'comment' }) => void;

	let text: string = '';
	let postingComment = false;
	async function comment() {
		try {
			postingComment = true;
			const c = await jsrwrap.getActions().comment({
				api_type: 'json',
				return_rtjson: true,
				text: text,
				thing_id: thingId
			});
			postingComment = false;
			text = '';
			afterComment({ ...c, type: 'comment' });
		} catch (e) {}
	}

	function focusOnShow(node: HTMLElement) {
		if (focus) {
			node.focus();
		}
	}
</script>

<div
	class="overflow-hidden rounded-2xl bg-[var(--search-input-bg)] p-2 focus-within:ring-1 focus-within:ring-white"
>
	<textarea
		class="w-full bg-[var(--search-input-bg)] p-2 focus:outline-none"
		placeholder="Add a comment"
		use:focusOnShow
		bind:value={text}
	/>
	<div class="flex justify-end">
		<button
			on:click={comment}
			disabled={text.length === 0 || postingComment}
			class="rounded-3xl bg-[#50568b] px-4 py-1 text-sm
       {text.length === 0 ? 'cursor-not-allowed' : ''}"
		>
			{#if !postingComment}
				Comment
			{:else}
				<Icon class="animate-spin" name="loading" height="20" width="20" />
			{/if}
		</button>
	</div>
</div>
