import fs from 'fs/promises';
import path from 'path';

import { createHash } from 'crypto';
import type { ServiceRepository } from './service-repository';

import type {
	Category,
	CategoryConfig,
	DashboardConfigFile,
	DashboardConfig,
	Service,
	ServiceConfig
} from '$lib/types/service';

const DATA_DIR = 'data';
const CONFIG_PATH = path.join(DATA_DIR, 'services.json');
const EXAMPLE_CONFIG_PATH = path.join(DATA_DIR, 'services.example.json');

export class JsonServiceRepository implements ServiceRepository {
	private cache?: DashboardConfig;

	private lastModified?: number;

	public async getConfig(): Promise<DashboardConfig> {
		await this.ensureConfigExists();
		const stat = await fs.stat(CONFIG_PATH);

		if (this.cache && this.lastModified === stat.mtimeMs) {
			return this.cache;
		}

		const json = await fs.readFile(CONFIG_PATH, 'utf-8');
		const raw = JSON.parse(json);
		const config = this.normalize(raw);
		this.cache = config;
		this.lastModified = stat.mtimeMs;

		return config;
	}

	public async getAllServices(): Promise<Service[]> {
		const config = await this.getConfig();

		return [...config.services, ...config.categories.flatMap((category) => category.services)];
	}

	private async ensureConfigExists(): Promise<void> {
		try {
			await fs.access(CONFIG_PATH);
		} catch {
			await fs.mkdir(DATA_DIR, {
				recursive: true
			});

			await fs.copyFile(EXAMPLE_CONFIG_PATH, CONFIG_PATH);
		}
	}

	private normalize(raw: DashboardConfigFile): DashboardConfig {
		return {
			services: (raw.services ?? []).map((service: ServiceConfig) =>
				this.normalizeService(service)
			),

			categories: (raw.categories ?? []).map((category: CategoryConfig) =>
				this.normalizeCategory(category)
			)
		};
	}

	private normalizeCategory(category: CategoryConfig): Category {
		return {
			name: category.name,

			services: (category.services ?? []).map((service) =>
				this.normalizeService(service, category.name)
			)
		};
	}

	private normalizeService(service: ServiceConfig, categoryName?: string): Service {
		return {
			key: this.generateKey(service, categoryName),
			name: service.name,
			url: service.url,
			description: service.description,
			icon: service.icon ? `/api/icons/${service.icon}` : undefined,
			same_tab: service.same_tab ?? false,
			status: {
				enabled: service.status?.enabled ?? false
			}
		};
	}

	private generateKey(service: ServiceConfig, categoryName?: string): string {
		return createHash('sha1')
			.update(`${categoryName ?? 'root'}:${service.name}:${service.url}`)
			.digest('hex')
			.slice(0, 12);
	}
}
