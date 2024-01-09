<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';

	export let submission: SubmissionData;
</script>

<article>
	<h2 class="text-xl font-bold">
		<a href={submission.permalink.toLowerCase()}>{submission.title}</a>
	</h2>
</article>
