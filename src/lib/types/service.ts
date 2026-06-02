export interface ServiceConfig {
	name: string;

	url: string;

	description?: string;

	icon?: string;

	same_tab?: boolean;

	status?: {
		enabled?: boolean;
	};
}

export interface Service {
	key: string;

	name: string;

	url: string;

	description?: string;

	icon?: string;

	same_tab: boolean;

	status: {
		enabled: boolean;
	};
}

export interface CategoryConfig {
	name: string;

	services?: ServiceConfig[];
}

export interface Category {
	name: string;

	services: Service[];
}

export interface DashboardConfigFile {
	services?: ServiceConfig[];

	categories?: CategoryConfig[];
}

export interface DashboardConfig {
	services: Service[];

	categories: Category[];
}
