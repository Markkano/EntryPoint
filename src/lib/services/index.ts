import type { ServiceRepository } from './service-repository';

import { JsonServiceRepository } from './json-service-repository';

export const serviceRepository: ServiceRepository = new JsonServiceRepository();
