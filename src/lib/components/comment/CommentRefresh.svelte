<script lang="ts">
	import { jsrwrap, type SubmissionFull } from '$lib/reddit/reddit';
	import type { Sort } from 'jsrwrap/types';
	import Icon from '../icon/Icon.svelte';

	export let sort: Sort | undefined;
	export let submission: SubmissionFull;
	export let submissionId: string;
	export let persistSubmission: () => void;

	let loading = false;
	let intervalId: ReturnType<typeof setInterval>;
	let autoRefreshTimeLeft = 10;
	let autoRefresh: boolean = false;

	async function refreshComments() {
		loading = true;
		autoRefreshTimeLeft = 10;
		if (sort) {
			submission = await jsrwrap.getSubmission(submissionId).fetch({ sort });
		} else {
			submission = await jsrwrap.getSubmission(submissionId).fetch();
		}
		persistSubmission();
		loading = false;
	}

	function setAutoRefreshCommentsTimer() {
		autoRefreshTimeLeft = 10;
		intervalId = setInterval(async () => {
			if (autoRefreshTimeLeft > 0) {
				autoRefreshTimeLeft--;
			}
			if (autoRefreshTimeLeft === 0) {
				if (loading) {
					return;
				}
				await refreshComments();
				autoRefreshTimeLeft = 10;
			}
		}, 1000);
	}

	function clearRefreshCommentsTimer() {
		clearInterval(intervalId);
	}

	$: {
		if (autoRefresh) {
			setAutoRefreshCommentsTimer();
		} else {
			clearRefreshCommentsTimer();
		}
	}
</script>

{#if true}
	<div class="flex items-center justify-between gap-2 text-nowrap text-sm">
		<div class="flex gap-2">
			<button class="w-fit" on:click={refreshComments} disabled={loading}>Refresh comments</button>
			{#if loading && !autoRefresh}
				<Icon class="animate-spin" height="20" width="20" name="loading" />
			{/if}
		</div>
		<hr class="w-full border-[#58585a]" />
		<div class="flex gap-1">
			<input
				class="hidden accent-[#747CB8]"
				id="refresh-comments"
				type="checkbox"
				bind:checked={autoRefresh}
			/>
			<label for="refresh-comments" class="cursor-pointer">
				<span class="select-none">Auto refresh comments</span>
			</label>
			{#if autoRefresh}
				{autoRefreshTimeLeft}
			{/if}
			{#if loading && autoRefresh}
				<Icon class="animate-spin" height="20" width="20" name="loading" />
			{/if}
		</div>
	</div>
{/if}
