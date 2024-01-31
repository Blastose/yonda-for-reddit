<script lang="ts">
	import type { RedditUser } from 'jsrwrap/types';
	import ClickableDivWrapper from '../layout/ClickableDivWrapper.svelte';

	export let user: RedditUser;
</script>

<ClickableDivWrapper href="/user/{user.name}">
	<article class="grid grid-cols-[48px_1fr] gap-2">
		<img
			class="h-[48px] w-[48px] rounded-full"
			height="48"
			width="48"
			src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png"
			alt=""
		/>
		<div>
			<p class="text-lg font-bold">u/{user.name}</p>
			<p class="text-sm text-[var(--visited-link-color)]">
				{(user.comment_karma + user.link_karma).toLocaleString()} karma
			</p>
		</div>
	</article>
</ClickableDivWrapper>

<style>
	article {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
	}

	article:hover {
		background-color: var(--bg-hover);
	}
</style>
