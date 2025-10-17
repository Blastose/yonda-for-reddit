<script lang="ts">
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { navigating } from '$app/stores';
	import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';
	import { navigationTypeStore } from '$lib/stores/navigationTypeStore';
	import Layout from '$lib/components/layout/Layout.svelte';
	import { submissionDisplayStore } from '$lib/stores/submissionDisplayStore';
	import { onMount } from 'svelte';
	import { db } from '$lib/idb/idb.js';
	import { transformUrlForIDBKey } from '$lib/url/url.js';
	import { historyStore } from '$lib/stores/historyStore.js';
	import { subscribedSubsStore } from '$lib/stores/subscribedSubsStore.js';

	export let data;
	let nprogressTimeoutId: ReturnType<typeof setTimeout>;

	NProgress.configure({
		showSpinner: false
	});

	function setTimeoutNprogress() {
		clearTimeout(nprogressTimeoutId);
		nprogressTimeoutId = setTimeout(() => {
			NProgress.start();
		}, 500);
	}

	$: {
		if ($navigating) {
			setTimeoutNprogress();
		} else if (!$navigating) {
			clearTimeout(nprogressTimeoutId);
			NProgress.done();
		}
	}

	beforeNavigate((nav) => {
		if (nav.type === 'popstate') {
			navigationTypeStore.set('bfbutton');
		}
	});

	afterNavigate((nav) => {
		console.log(nav);
		console.log($historyStore);
		if (nav.to) {
			const url = transformUrlForIDBKey(nav.to?.url);
			if (nav.type === 'popstate' && nav.delta) {
				const delta = nav.delta;
				historyStore.update((v) => {
					return { urls: v.urls, index: v.index + delta };
				});
			} else if (nav.type === 'goto' || nav.type === 'link') {
				if (nav.from?.url === null) {
					historyStore.set({ urls: [], index: -1 });
				}
				historyStore.update((v) => {
					if (v.index < 0) {
						v.urls = [];
						v.index = -1;
					}
					v.urls = v.urls.slice(0, v.index + 1);
					v.urls.push(url);
					v.index++;
					return v;
				});
			}
		}
		navigationTypeStore.set(null);
		console.log($historyStore);
	});

	function handleKeydown(e: KeyboardEvent) {
		const nodeName = document.activeElement?.nodeName;
		if (nodeName !== 'INPUT' && nodeName !== 'TEXTAREA') {
			if (e.key === 't') {
				if ($submissionDisplayStore === 'classic') {
					$submissionDisplayStore = 'card';
				} else {
					$submissionDisplayStore = 'classic';
				}
			}
		}
	}

	onMount(async () => {
		if (data.subscribedSubs) {
			const subscribedSubs = await data.subscribedSubs;
			subscribedSubs.sort((a, b) =>
				a.display_name.localeCompare(b.display_name, 'en', { sensitivity: 'base' })
			);
			subscribedSubsStore.set({ value: subscribedSubs, cached: new Date().getTime() });
		}
	});
</script>

<svelte:document on:keydown={handleKeydown} />

<Layout loggedIn={data.loggedIn} me={data.me}>
	<slot />
</Layout>
