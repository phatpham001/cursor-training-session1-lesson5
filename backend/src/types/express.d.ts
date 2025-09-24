import 'express';

export interface JwtUserPayload {
	id: string;
	email: string;
	name: string;
}

declare module 'express-serve-static-core' {
	interface Request {
		user?: JwtUserPayload;
	}
}
