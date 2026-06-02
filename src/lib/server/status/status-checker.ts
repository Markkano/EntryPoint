import type { Service } from '$lib/types/service';

import type { ServiceStatus } from '$lib/types/status';

export interface StatusChecker {
	check(service: Service): Promise<ServiceStatus>;
}
