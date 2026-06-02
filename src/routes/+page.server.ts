import type { PageServerLoad } from './$types';

import { serviceRepository } from '$lib/server/services';

export const load: PageServerLoad = async () => {
	const config = await serviceRepository.getConfig();

	return {
		services: config.services,
		categories: config.categories
	};
};
