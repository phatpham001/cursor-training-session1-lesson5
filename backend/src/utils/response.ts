import { Response } from 'express';

export type ApiResponse<T> = {
	success: boolean;
	data?: T;
	message?: string;
};

/**
 * Send a standardized JSON response ensuring consistent structure.
 */
export function sendJson<T>(res: Response, status: number, payload: ApiResponse<T>): Response {
	return res.status(status).json(payload);
}
