<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import { addToast } from '$lib/components/toast/Toaster.svelte';
	import { jsrwrap } from '$lib/reddit/reddit';
	import { pinnedSubsStore } from '$lib/stores/subscribedSubsStore';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade, fly } from 'svelte/transition';

	const {
		elements: { trigger, overlay, content, title, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true,
		preventScroll: false
	});

	let text: string;
	let loading = false;

	async function handleAddSub() {
		try {
			if (!text) return;
			loading = true;
			const sub = jsrwrap.getSubreddit(text);
			const about = await sub.getAbout();
			pinnedSubsStore.update((v) => {
				const icon = about?.community_icon || about?.icon_img || undefined;
				v.push({ displayName: about.display_name, iconUrl: icon });
				// v.sort((a, b) => a.displayName.localeCompare(b.displayName, 'en', { sensitivity: 'base' }));
				return v;
			});
			open.set(false);
			addToast({ data: { title: 'Added subreddit!', type: 'success' } });
		} catch (e) {
			addToast({ data: { title: 'Unable to add subreddit!', type: 'error' } });
		} finally {
			loading = false;
		}
	}
</script>

<button
	use:melt={$trigger}
	class="flex w-full items-center gap-2 rounded-2xl px-4 py-2 hover:bg-[var(--bg-hover)]"
	><Icon name="plus" />Add subreddit</button
>

<div class="" use:melt={$portalled}>
	{#if $open}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/50"
			transition:fade={{ duration: 150 }}
		/>
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-[var(--bg)]
            p-6 shadow-lg"
			transition:fly={{
				duration: 150,
				y: 8
			}}
			use:melt={$content}
		>
			<h2 use:melt={$title} class="m-0 mb-2 text-lg font-medium">Add subreddit to pinned</h2>

			<fieldset class="flex flex-col gap-2">
				<label for="name">Subreddit</label>
				<input
					bind:value={text}
					placeholder="subreddit"
					class="rounded-2xl bg-[var(--search-input-bg)] px-4 py-2"
					id="name"
				/>
			</fieldset>

			<div class="mt-6 flex justify-end gap-4">
				<button use:melt={$close} class="px-2 py-1"> Cancel </button>
				<button
					disabled={loading}
					on:click={handleAddSub}
					class="rounded-2xl bg-[#4a5086] px-4 py-1 font-medium">Add subreddit</button
				>
			</div>
			<button
				use:melt={$close}
				aria-label="close"
				class="absolute right-4 top-4 h-6 w-6 items-center justify-center
                rounded-full p-1"
			>
				<Icon name="close" />
			</button>
		</div>
	{/if}
</div>
