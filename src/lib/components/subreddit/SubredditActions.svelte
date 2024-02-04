<script lang="ts">
	import { jsrwrap } from '$lib/reddit/reddit';
	import { loggedInStore } from '$lib/stores/loggedInStore';
	import type { SubredditData } from 'jsrwrap/types';
	import { addToast } from '../toast/Toaster.svelte';
	import { db } from '$lib/idb/idb';
	import { page } from '$app/stores';
	import Icon from '../icon/Icon.svelte';
	import { subscribedSubsStore } from '$lib/stores/subscribedSubsStore';

	export let about: SubredditData;

	$: subreddit = $page.params.subreddit;

	async function handleJoin() {
		if (!about.user_is_subscriber) {
			jsrwrap
				.getActions()
				.subscribe({ action: 'sub', skip_initial_defaults: true, sr: about.name });
			about.user_is_subscriber = true;
			addToast({
				data: { title: `Subscribed to ${about.display_name_prefixed}!`, type: 'success' }
			});

			subscribedSubsStore.update((v) => {
				v.value.push(about);
				v.value.sort((a, b) =>
					a.display_name.localeCompare(b.display_name, 'en', { sensitivity: 'base' })
				);
				return v;
			});
		} else {
			jsrwrap.getActions().subscribe({ action: 'unsub', sr: about.name });
			about.user_is_subscriber = false;
			addToast({
				data: { title: `Unsubscribed from ${about.display_name_prefixed}!`, type: 'success' }
			});

			subscribedSubsStore.update((v) => {
				v.value = v.value.filter((d) => d.display_name !== about.display_name);
				v.value.sort((a, b) =>
					a.display_name.localeCompare(b.display_name, 'en', { sensitivity: 'base' })
				);
				return v;
			});
		}

		db.put(
			'subredditAbout',
			{ value: about, cached: new Date().getTime() },
			subreddit.toLowerCase()
		);
	}
</script>

{#if $loggedInStore}
	{#if about.subreddit_type !== 'restricted'}
		<a
			href="/{about.display_name_prefixed.toLowerCase()}/submit"
			class="flex items-center gap-2 rounded-3xl bg-[#5763a5] px-4 py-1 text-sm"
			><Icon name="plus" />Create a post</a
		>
	{:else}
		<p class="rounded-3xl bg-[var(--accent-l1)] px-4 py-1 text-sm">Submissions restricted</p>
	{/if}
	<button on:click={handleJoin} class="rounded-3xl bg-[var(--accent-l1)] px-4 py-1 text-sm"
		>{about.user_is_subscriber ? 'Joined' : 'Join'}</button
	>
{/if}
