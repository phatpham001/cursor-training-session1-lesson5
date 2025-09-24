import { createServer } from 'http';
import { createApp } from './app';
import { config, assertConfig } from './config/env';
import { connectDatabase } from './config/db';

async function bootstrap() {
	assertConfig();
	await connectDatabase();
	const app = createApp();
	const server = createServer(app);
	server.listen(config.port, () => {
		// eslint-disable-next-line no-console
		console.log(`API listening on http://localhost:${config.port}`);
	});
}

bootstrap().catch((err) => {
	// eslint-disable-next-line no-console
	console.error('Failed to start server', err);
	process.exit(1);
});
