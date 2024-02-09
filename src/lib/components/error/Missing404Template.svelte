<script lang="ts">
	export let text: string;
	export let subtext: string | undefined = undefined;
</script>

<div class="mx-auto flex max-w-sm flex-col items-center gap-2 pt-8 text-center">
	<p class="text-lg font-semibold">{text}</p>
	{#if subtext}
		<p>{subtext}</p>
	{/if}

	<a href="/" class="w-full rounded-3xl bg-white px-2 py-1 text-center font-semibold text-black"
		>Go home</a
	>
</div>
