<script lang="ts">
	import { addToast } from '$lib/components/toast/Toaster.svelte';
	import { db } from '$lib/idb/idb';

	let loading = false;
	async function clearCache() {
		loading = true;
		const clear1 = db.clear('submission');
		const clear2 = db.clear('submissions');
		await Promise.all([clear1, clear2]);
		loading = false;
		addToast({ data: { title: 'Cleared cache!', type: 'success' } });
	}
</script>

<div>
	<h2 class="text-lg font-bold">Cache</h2>

	<button on:click={clearCache}>Clear cache</button>
</div>
