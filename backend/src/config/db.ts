import mongoose from 'mongoose';
import { config } from './env';

/**
 * Establish a MongoDB connection using Mongoose.
 */
export async function connectDatabase(): Promise<void> {
	mongoose.set('strictQuery', true);
	await mongoose.connect(config.mongoUri);
}
