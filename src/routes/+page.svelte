<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import ServiceSection from '$lib/components/ServiceSection.svelte';
	import type { PageData } from './$types';
	import type { ServiceStatus } from '$lib/types/status';

	let { data }: { data: PageData } = $props();
	let statuses = $state<Record<string, ServiceStatus>>({});

	onMount(() => {
		void loadStatuses();

		const interval = setInterval(() => {
			void loadStatuses();
		}, 5000);

		return () => clearInterval(interval);
	});

	async function loadStatuses() {
		try {
			const response = await fetch('/api/status');

			statuses = await response.json();
		} catch (error) {
			console.error('Failed to load statuses', error);
		}
	}
</script>

<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Title Section -->
	<div class="mb-8">
		<h2 class="mb-2 text-3xl font-bold text-white">Personal Services Dashboard</h2>
		<p class="text-slate-400">Access all your self-hosted applications and services</p>
	</div>

	{#if data.services.length}
		<ServiceSection services={data.services} {statuses} />
	{/if}

	{#each data.categories as category (category.name)}
		<ServiceSection title={category.name} services={category.services} {statuses} />
	{/each}

	<!-- Add Service -->
	<div class="mb-12">
		<h3 class="mb-4 text-sm font-semibold tracking-wide text-slate-300 uppercase">Add Service</h3>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<a href={resolve('/')} class="service-card group">
				<div
					class="flex h-full flex-col items-center justify-center rounded-lg border border-slate-800 bg-slate-900 p-4 text-center transition-colors hover:border-slate-700"
				>
					<div class="mb-2 text-3xl">➕</div>
					<h4 class="text-sm font-semibold text-slate-400">Add Service</h4>
					<p class="mt-1 text-xs text-slate-500">Create a new service</p>
				</div>
			</a>
		</div>
	</div>
</main>
