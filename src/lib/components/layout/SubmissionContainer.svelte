<script lang="ts">
	import Submission from './Submission.svelte';
	import { type SubmissionDataFull } from '$lib/reddit/reddit';
	import Pagination from '../reddit/Pagination.svelte';

	export let submissions: SubmissionDataFull;
	export let count: number | undefined;
</script>

<div class="flex flex-col gap-2">
	<Submission submissions={submissions.data} />
	<Pagination
		after={submissions.after}
		before={submissions.before}
		{count}
		dist={submissions.dist}
	/>
</div>
