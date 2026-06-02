import fs from 'fs/promises';
import path from 'path';

import type { ResolvedServicesConfig, ServicesConfig } from '$lib/models/services-config';
import type { ServiceRepository } from './service-repository';

const DATA_DIR = 'data';
const CONFIG_PATH = path.join(DATA_DIR, 'services.json');
const EXAMPLE_CONFIG_PATH = path.join(DATA_DIR, 'services.example.json');

export class JsonServiceRepository implements ServiceRepository {
	async getConfig(): Promise<ResolvedServicesConfig> {
		await this.ensureConfigExists();

		const raw = await fs.readFile(CONFIG_PATH, 'utf-8');

		const config: ServicesConfig = JSON.parse(raw);

		return {
			services: config.services ?? [],
			categories: config.categories ?? []
		};
	}

	private async ensureConfigExists(): Promise<void> {
		try {
			await fs.access(CONFIG_PATH);
		} catch {
			await fs.mkdir(DATA_DIR, { recursive: true });

			await fs.copyFile(EXAMPLE_CONFIG_PATH, CONFIG_PATH);

			console.log(`Created config from example at ${CONFIG_PATH}`);
		}
	}
}
