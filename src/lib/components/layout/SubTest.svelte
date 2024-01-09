<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';

	export let submissions: SubmissionData[];
</script>

{#each submissions as submission}
	<p><a class="text-blue-500" href={submission.permalink.toLowerCase()}>{submission.title}</a></p>
{/each}
