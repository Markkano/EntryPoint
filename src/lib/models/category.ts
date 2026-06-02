import type { Service } from './service';

export interface Category {
	name: string;
	icon?: string;
	services: Service[];
}
