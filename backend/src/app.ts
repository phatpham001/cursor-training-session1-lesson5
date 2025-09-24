import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';
import { errorHandler } from './middleware/errorHandler';

/**
 * Build and configure the Express application.
 */
export function createApp() {
	const app = express();
	app.use(cors());
	app.use(express.json());

	app.get('/api/health', (_req, res) => {
		res.json({ success: true, data: { status: 'ok' } });
	});

	app.use('/api/auth', authRoutes);
	app.use('/api/posts', postRoutes);

	app.use(errorHandler);
	return app;
}
