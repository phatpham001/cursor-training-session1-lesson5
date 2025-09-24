import { NextFunction, Request, Response } from 'express';
import { sendJson } from '../utils/response';

/**
 * Global error handling middleware to ensure consistent error responses.
 */
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';
	return sendJson(res, status, { success: false, message });
}
