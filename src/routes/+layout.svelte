<script lang="ts">
	import type { LayoutData } from './$types';

	import './layout.css';

	import favicon from '$lib/assets/favicon.svg';

	let {
		children,
		data
	}: {
		children: import('svelte').Snippet;
		data: LayoutData;
	} = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="bg-slate-950 text-slate-100">
	<!-- Header -->
	<header class="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between gap-4">
				<div class="flex items-center gap-3">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-cyan-500"
					>
						<span class="text-sm font-bold text-white">EP</span>
					</div>
					<h1 class="hidden text-xl font-bold text-white sm:block">EntryPoint</h1>
				</div>

				<div class="max-w-sm flex-1">
					<div class="relative">
						<input
							type="text"
							placeholder="Search services..."
							class="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-slate-600 focus:outline-none"
						/>
						<svg
							class="absolute top-2.5 right-3 h-4 w-4 text-slate-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</div>
				</div>

				<div class="hidden text-right md:block">
					<p class="text-xs text-slate-500">Status</p>
					<p class="flex items-center justify-end gap-1 text-sm font-medium text-green-400">
						<span class="h-2 w-2 rounded-full bg-green-500"></span>
						Online
					</p>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	{@render children()}

	<!-- Footer -->
	<footer class="mt-16 border-t border-slate-800 bg-slate-950/50">
		<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div class="flex flex-col items-center gap-4 text-right sm:items-end">
				<div>
					<p class="font-semibold text-white">EntryPoint</p>
					<p class="text-sm text-slate-400">v{data.appVersion}</p>
				</div>
			</div>
		</div>
	</footer>
</div>
