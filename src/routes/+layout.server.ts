import packageJson from '../../package.json';

export function load() {
	return {
		appVersion: packageJson.version
	};
}
