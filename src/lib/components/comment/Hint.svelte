<script context="module" lang="ts">
	export type HintType = {
		distinguished: 'moderator' | 'admin' | null;
		stickied: boolean;
		locked: boolean;
		archived?: boolean;
		pinned?: boolean;
		is_submitter?: boolean;
	};
</script>

<script lang="ts">
	import Icon from '../icon/Icon.svelte';

	export let hint: HintType;

	export let type: 'submission' | 'comment';
</script>

{#if hint.distinguished === 'moderator'}
	<span class="mod author"><Icon height={'16'} width={'16'} name="shield" /></span>
{:else if hint.distinguished === 'admin'}
	<span class="admin" aria-label="admin"><Icon height={'16'} width={'16'} name="reddit" /></span>
{/if}
{#if hint.is_submitter}
	<span class="submitter author">OP</span>
{/if}

{#if hint.stickied || hint.pinned}
	<span class="mod flex flex-wrap items-center gap-1 font-semibold">
		<Icon class="rotate-45" height={'16'} width={'16'} name="pin" />
		{type === 'comment' ? 'Stickied comment' : ''}
	</span>
{/if}

{#if hint.locked}
	<span role="img" aria-label="locked" class="lock"
		><Icon height={'12'} width={'12'} name="lock" /></span
	>
{/if}
{#if hint.archived && type === 'submission'}
	<span role="img" aria-label="archived" class="archived"
		><Icon height={'12'} width={'12'} name="treasureChest" /></span
	>
{/if}

<style>
	span {
		font-weight: 600;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.submitter {
		color: rgb(99, 145, 214);
	}

	.mod {
		color: #57a858;
	}

	.admin {
		color: rgb(255, 88, 91);
	}

	.lock {
		color: #e7c129;
	}

	.archived {
		color: #f3d766;
	}
</style>
