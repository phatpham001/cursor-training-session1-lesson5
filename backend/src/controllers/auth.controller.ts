import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { sendJson } from '../utils/response';
import { config } from '../config/env';
import { loginSchema, registerSchema } from '../validators/auth';

/**
 * Register a new user, hashing password and returning a jwt.
 */
export async function register(req: Request, res: Response) {
	const parse = registerSchema.safeParse(req.body);
	if (!parse.success) {
		return sendJson(res, 400, { success: false, message: parse.error.errors[0]?.message || 'Invalid input' });
	}
	const { name, email, password } = parse.data;
	const existing = await User.findOne({ email });
	if (existing) return sendJson(res, 409, { success: false, message: 'Email already registered' });
	const passwordHash = await bcrypt.hash(password, 10);
	const user = await User.create({ name, email, passwordHash });
	const token = jwt.sign({ id: user._id.toString(), email: user.email, name: user.name }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
	return sendJson(res, 201, { success: true, data: { token }, message: 'Registered successfully' });
}

/**
 * Login an existing user and return a jwt.
 */
export async function login(req: Request, res: Response) {
	const parse = loginSchema.safeParse(req.body);
	if (!parse.success) {
		return sendJson(res, 400, { success: false, message: parse.error.errors[0]?.message || 'Invalid input' });
	}
	const { email, password } = parse.data;
	const user = await User.findOne({ email });
	if (!user) return sendJson(res, 401, { success: false, message: 'Invalid credentials' });
	const ok = await bcrypt.compare(password, user.passwordHash);
	if (!ok) return sendJson(res, 401, { success: false, message: 'Invalid credentials' });
	const token = jwt.sign({ id: user._id.toString(), email: user.email, name: user.name }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
	return sendJson(res, 200, { success: true, data: { token }, message: 'Logged in' });
}
