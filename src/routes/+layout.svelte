<script lang="ts">
	import '../app.css';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { navigating } from '$app/stores';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { navigationTypeStore } from '$lib/stores/navigationTypeStore';

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
</script>

<div class="container mx-auto px-4 py-2">
	<slot />
</div>
