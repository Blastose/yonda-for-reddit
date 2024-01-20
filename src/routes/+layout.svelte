<script lang="ts">
	import '../app.css';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { navigating } from '$app/stores';
	import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';
	import { navigationTypeStore } from '$lib/stores/navigationTypeStore';
	import Layout from '$lib/components/layout/Layout.svelte';
	import { submissionDisplayStore } from '$lib/stores/submissionDisplayStore';

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

	afterNavigate(() => {
		navigationTypeStore.set(null);
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise(async (resolve) => {
			if (navigation.delta && navigation.delta < 0) {
				document.documentElement.classList.add('back-transition');
			}

			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});

			try {
				await transition.finished;
			} finally {
				document.documentElement.classList.remove('back-transition');
			}
		});
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 't') {
			if ($submissionDisplayStore === 'classic') {
				$submissionDisplayStore = 'card';
			} else {
				$submissionDisplayStore = 'classic';
			}
		}
	}
</script>

<svelte:document on:keydown={handleKeydown} />

<Layout loggedIn={data.loggedIn}>
	<slot />
</Layout>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	@keyframes slide-to-right {
		to {
			transform: translateX(30px);
		}
	}

	@keyframes slide-from-left {
		from {
			transform: translateX(-30px);
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		:root::view-transition-old(root) {
			animation:
				90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
		}

		:root::view-transition-new(root) {
			animation:
				210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
		}

		:root.back-transition::view-transition-old(root) {
			animation-name: fade-out, slide-to-right;
		}

		:root.back-transition::view-transition-new(root) {
			animation-name: fade-in, slide-from-left;
		}
	}
</style>
