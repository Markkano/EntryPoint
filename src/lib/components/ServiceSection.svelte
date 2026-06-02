<script lang="ts">
	import ServiceCard from './ServiceCard.svelte';

	import type { Service } from '$lib/models/service';

	interface Props {
		title?: string;
		services: Service[];
	}

	let { title, services }: Props = $props();
</script>

<section class="mb-12">
	{#if title}
		<h3 class="mb-4 text-sm font-semibold tracking-wide text-slate-300 uppercase">
			{title}
		</h3>
	{/if}

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each services as service (service.name)}
			<ServiceCard {service} />
		{/each}
	</div>
</section>
