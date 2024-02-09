<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1 class="text-lg font-bold">An error has occurred!</h1>
<p>Some reasons why this error occurred:</p>
<ul>
	<li>
		If you are using Firefox and have Enhanced Tracking Protection on, you need to turn it off for
		this site. See <a href="https://stackoverflow.com/a/69185304"
			>this StackOverflow page for more info.</a
		>
	</li>
	<li>
		Reddit is down. Check <a href="https://www.redditstatus.com/">redditstatus.com</a> or
		<a href="https://downdetector.com/status/reddit/">DownDetector</a>.
	</li>
	<li>The page you are visiting does not exist.</li>
	<li>
		An unexpected error has occurred. Check the browser console logs to see if they have more info.
	</li>
</ul>

{#if $page.error}
	<p class="mt-4">Error message: {$page.error?.code} ({$page.error?.message})</p>
{/if}

<style>
	ul > li {
		list-style: disc;
		margin-left: 2rem;
	}

	a {
		color: var(--link-color);
	}
	a:hover {
		text-decoration: underline;
	}
</style>
