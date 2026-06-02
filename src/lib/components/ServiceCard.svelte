<script lang="ts">
	import type { Service } from '$lib/models/service';

	interface Props {
		service: Service;
	}

	let { service }: Props = $props();
</script>

<a
	href={service.url}
	target={service.same_tab ? '_self' : '_blank'}
	rel="external noopener noreferrer"
	data-sveltekit-reload
	class="service-card group"
>
	<div
		class="flex h-full flex-col rounded-lg border border-slate-800 bg-slate-900 p-4 transition-all hover:scale-[1.01] hover:border-slate-700"
	>
		<div class="mb-3 flex items-start justify-between gap-3">
			<div
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800/50 p-2"
			>
				{#if service.icon}
					<img src={service.icon} alt={service.name} class="h-full w-full object-contain" />
				{/if}
			</div>

			{#if service.status_check}
				<span class="status-dot h-2 w-2 shrink-0 rounded-full bg-green-500"></span>
			{/if}
		</div>

		<h4 class="mb-1 text-sm font-semibold text-white">
			{service.name}
		</h4>

		{#if service.description}
			<p class="text-xs text-slate-400">
				{service.description}
			</p>
		{/if}
	</div>
</a>
