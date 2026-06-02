<script lang="ts">
	import type { Service } from '$lib/types/service';
	import type { ServiceStatus } from '$lib/types/status';

	interface Props {
		service: Service;
		status?: ServiceStatus;
	}

	let { service, status }: Props = $props();

	const statusColor = $derived.by(() => {
		if (!status) {
			return 'bg-slate-500';
		}

		switch (status.status) {
			case 'online':
				return 'bg-green-500 animate-pulse';

			case 'offline':
				return 'bg-red-500';

			default:
				return 'bg-yellow-500';
		}
	});

	const statusLabel = $derived.by(() => {
		if (!status) {
			return 'Checking...';
		}

		switch (status.status) {
			case 'online':
				return 'Online';

			case 'offline':
				return 'Offline';

			default:
				return 'Unknown';
		}
	});
</script>

<a
	href={service.url}
	target={service.same_tab ? '_self' : '_blank'}
	rel="external noopener noreferrer"
	data-sveltekit-reload
	class="service-card"
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

			{#if service.status.enabled}
				<div class="group relative">
					<span class={`status-dot block h-2 w-2 shrink-0 cursor-help rounded-full ${statusColor}`}
					></span>

					<div
						class="pointer-events-none absolute top-4 right-0 z-10 w-52 rounded-md border border-slate-700 bg-slate-900 p-3 text-xs opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
					>
						<p class="font-medium text-white">
							{statusLabel}
						</p>

						{#if status?.responseTime}
							<p class="mt-1 text-slate-400">
								Response time:
								{status.responseTime}ms
							</p>
						{/if}

						{#if status?.error}
							<p class="mt-1 wrap-break-word text-red-400">
								{status.error}
							</p>
						{/if}
					</div>
				</div>
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
