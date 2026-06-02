import fs from 'fs/promises';
import path from 'path';

import { error } from '@sveltejs/kit';

const ICONS_DIR = path.resolve('data/icons');

export async function GET({ params }: { params: { filename: string } }) {
	const filename = params.filename;

	// Seguridad básica
	if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
		throw error(400, 'Invalid filename');
	}

	const filePath = path.join(ICONS_DIR, filename);

	try {
		const file = await fs.readFile(filePath);

		const ext = path.extname(filename).toLowerCase();

		const contentType =
			ext === '.png'
				? 'image/png'
				: ext === '.jpg' || ext === '.jpeg'
					? 'image/jpeg'
					: ext === '.webp'
						? 'image/webp'
						: ext === '.svg'
							? 'image/svg+xml'
							: 'application/octet-stream';

		return new Response(file, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=86400'
			}
		});
	} catch {
		throw error(404, 'Icon not found');
	}
}
