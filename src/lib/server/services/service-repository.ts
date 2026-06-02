import type { DashboardConfig, Service } from '$lib/types/service';

export interface ServiceRepository {
	getConfig(): Promise<DashboardConfig>;
	getAllServices(): Promise<Service[]>;
}
