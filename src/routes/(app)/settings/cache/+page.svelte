<script lang="ts">
	import { addToast } from '$lib/components/toast/Toaster.svelte';
	import { db } from '$lib/idb/idb';

	let loading = false;
	async function clearCache() {
		loading = true;
		const clear1 = db.clear('submission');
		const clear2 = db.clear('submissions');
		const clear3 = db.clear('redditUser');
		const clear4 = db.clear('redditUserCreations');
		const clear5 = db.clear('submissionCommentCount');
		const clear6 = db.clear('subredditAbout');
		const clear7 = db.clear('subredditModerators');
		const clear8 = db.clear('subredditSidebar');
		await Promise.all([clear1, clear2, clear3, clear4, clear5, clear6, clear7, clear8]);
		loading = false;
		addToast({ data: { title: 'Cleared cache!', type: 'success' } });
	}
</script>

<div>
	<h2 class="text-lg font-bold">Cache</h2>

	<button on:click={clearCache}>Clear cache</button>
</div>
