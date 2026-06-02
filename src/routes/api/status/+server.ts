import { json } from '@sveltejs/kit';

import { statusService } from '$lib/server/status';

export async function GET() {
	await statusService.initialize();

	return json(statusService.getStatuses());
}
