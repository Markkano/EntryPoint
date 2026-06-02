import type { ResolvedServicesConfig } from '$lib/models/services-config';

export interface ServiceRepository {
	getConfig(): Promise<ResolvedServicesConfig>;
}
