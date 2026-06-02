import type { Service } from '$lib/types/service';
import type { ServiceStatus } from '$lib/types/status';
import { serviceRepository } from '$lib/server/services';
import { HttpStatusChecker } from './checkers/http-status-checker';

export class StatusService {
	private readonly checker = new HttpStatusChecker();

	private readonly cache = new Map<string, ServiceStatus>();

	private initialized = false;

	private interval?: NodeJS.Timeout;

	public async initialize(): Promise<void> {
		if (this.initialized) {
			return;
		}

		this.initialized = true;

		await this.updateStatuses();

		this.interval = setInterval(() => {
			void this.updateStatuses();
		}, 5000);
	}

	public getStatuses(): Record<string, ServiceStatus> {
		return Object.fromEntries(this.cache.entries());
	}

	private async updateStatuses(): Promise<void> {
		const config = await serviceRepository.getConfig();

		const services = this.getAllServices(config);

		const enabledServices = services.filter((service) => service.status.enabled);

		await Promise.all(
			enabledServices.map(async (service) => {
				const status = await this.checker.check(service);

				this.cache.set(service.key, status);
			})
		);
	}

	private getAllServices(config: {
		services: Service[];
		categories: { services: Service[] }[];
	}): Service[] {
		return [...config.services, ...config.categories.flatMap((category) => category.services)];
	}
}
