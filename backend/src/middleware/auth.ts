import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { sendJson } from '../utils/response';

/**
 * Express middleware that validates a Bearer JWT and attaches its payload to req.user.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization || '';
	const [scheme, token] = authHeader.split(' ');
	if (scheme !== 'Bearer' || !token) {
		return sendJson(res, 401, { success: false, message: 'Unauthorized' });
	}
	try {
		const decoded = jwt.verify(token, config.jwtSecret) as any;
		req.user = { id: decoded.id, email: decoded.email, name: decoded.name };
		return next();
	} catch {
		return sendJson(res, 401, { success: false, message: 'Invalid token' });
	}
}
