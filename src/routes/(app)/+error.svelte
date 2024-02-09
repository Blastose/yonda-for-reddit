<script lang="ts">
	import { page } from '$app/stores';
	import Missing404Template from '$lib/components/error/Missing404Template.svelte';

	type PageError = typeof $page.error;

	function getErrorTexts(err: PageError) {
		let text = 'This page does not exist';
		let subtext: string | undefined = undefined;
		if (!err) return { text, subtext };

		if (err.type === 'user') {
			if (err.reason === 'banned') {
				text = 'This account has been suspended.';
			} else {
				text = 'Sorry, nobody on Reddit goes by that name.';
				subtext = 'The person may have been banned or the username is incorrect.';
			}
		} else if (err.type === 'subreddit') {
			if (err.reason === 'banned') {
				text = 'This subreddit has been banned.';
				subtext =
					'This subreddit has been banned for violating the Reddit rules to keep everyone safe.';
			} else {
				text = "Sorry, there aren't any subreddits on Reddit with that name.";
				subtext = 'The subreddit may have been banned or the subreddit name is incorrect.';
			}
		}

		return { text, subtext };
	}

	$: ({ text, subtext } = getErrorTexts($page.error));
</script>

<Missing404Template {text} {subtext} />
