import type { Service } from './service';
import type { Category } from './category';

export interface ServicesConfig {
	services?: Service[];
	categories?: Category[];
}

export interface ResolvedServicesConfig {
	services: Service[];
	categories: Category[];
}
