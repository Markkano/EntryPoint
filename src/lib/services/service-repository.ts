import type { DashboardConfig } from '$lib/types/service';

export interface ServiceRepository {
	getConfig(): Promise<DashboardConfig>;
}
