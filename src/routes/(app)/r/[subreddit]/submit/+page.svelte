<script lang="ts">
	import { goto } from '$app/navigation';
	import { jsrwrap } from '$lib/reddit/reddit';

	export let data;

	async function handleSubmit(e: Event) {
		e.preventDefault();
		let res;
		if (type === 'link') {
			res = await jsrwrap.getActions().submit({
				api_type: 'json',
				kind: 'link',
				title: title || undefined,
				url: url || undefined,
				sr: data.about?.display_name
			});
		} else {
			res = await jsrwrap.getActions().submit({
				api_type: 'json',
				kind: 'self',
				title: title || undefined,
				text: text || undefined,
				sr: data.about?.display_name
			});
		}

		goto(`/${data.about?.display_name_prefixed.toLowerCase()}/comments/${res.id}/title`);
	}

	let type: 'link' | 'text' = 'link';
	let url: string;
	let title: string;
	let text: string;
</script>

<h1 class="text-lg font-bold">Submit to {data.about?.display_name_prefixed}</h1>

<div class="flex">
	<button
		on:click={() => {
			type = 'link';
		}}
		class="px-4 py-1 {type === 'link' ? 'bg-[#434b7c]' : 'bg-[var(--accent-l1)]'}">link</button
	>
	<button
		on:click={() => {
			type = 'text';
		}}
		class="px-4 py-1 {type === 'text' ? 'bg-[#434b7c]' : 'bg-[var(--accent-l1)]'}">text</button
	>
</div>
<form on:submit={handleSubmit} class="flex flex-col gap-2">
	{#if type === 'link'}
		<label>
			<span>Url (required)</span>
			<input type="text" bind:value={url} />
		</label>
	{/if}

	<label>
		<span>Title (required)</span>
		<input type="text" bind:value={title} />
	</label>

	{#if type === 'text'}
		<label>
			<span>Text (optional)</span>
			<textarea bind:value={text} />
		</label>
	{/if}

	<button disabled={true} class="mt-2 rounded-3xl bg-neutral-700 px-2 py-1" type="submit"
		>Submit</button
	>
</form>

<style>
	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	input,
	textarea {
		background-color: var(--search-input-bg);
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
	}
</style>
