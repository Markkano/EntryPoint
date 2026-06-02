import type { ServiceRepository } from './service-repository';
import { JsonServiceRepository } from './json-service-repository';

// Singleton de ServiceRepository
export const serviceRepository: ServiceRepository = new JsonServiceRepository();
