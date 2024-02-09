<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.error?.type === 'user'}
	<div class="mx-auto flex max-w-sm flex-col items-center gap-2 pt-8">
		<p class="text-lg font-semibold">Sorry, nobody on Reddit goes by that name.</p>
		<p>The person may have been banned or the username is incorrect.</p>

		<a href="/" class="w-full rounded-3xl bg-white px-2 py-1 text-center font-semibold text-black"
			>Go home</a
		>
	</div>
{/if}
