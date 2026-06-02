export type ServiceStatusType = 'online' | 'offline' | 'unknown';

export interface ServiceStatus {
	status: ServiceStatusType;

	responseTime?: number;

	lastChecked: Date;

	error?: string;
}
