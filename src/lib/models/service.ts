export interface Service {
	name: string;
	url: string;

	description?: string;
	icon?: string;

	status_check?: boolean;
	same_tab?: boolean;
}
