import type { PageServerLoad } from './$types';
import { JsonServiceRepository } from '$lib/services/json-service-repository';

const repository = new JsonServiceRepository();

export const load: PageServerLoad = async () => {
	const config = await repository.getConfig();

	return {
		services: config.services,
		categories: config.categories
	};
};
