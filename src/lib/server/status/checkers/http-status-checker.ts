import type { Service } from '$lib/types/service';
import type { ServiceStatus } from '$lib/types/status';
import type { StatusChecker } from '../status-checker';

export class HttpStatusChecker implements StatusChecker {
	async check(service: Service): Promise<ServiceStatus> {
		const startedAt = Date.now();

		try {
			const controller = new AbortController();

			const timeout = setTimeout(() => controller.abort(), 5000);

			await fetch(service.url, {
				signal: controller.signal
			});

			clearTimeout(timeout);

			return {
				status: 'online',
				responseTime: Date.now() - startedAt,
				lastChecked: new Date()
			};
		} catch (error) {
			return {
				status: 'offline',
				responseTime: Date.now() - startedAt,
				lastChecked: new Date(),
				error: error instanceof Error ? error.message : 'Unknown error'
			};
		}
	}
}
