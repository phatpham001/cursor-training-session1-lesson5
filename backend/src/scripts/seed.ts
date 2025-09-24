import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/db';
import { config } from '../config/env';
import { User } from '../models/User';
import { Post } from '../models/Post';

async function main() {
	await connectDatabase();

	const email = 'demo@example.com';
	const name = 'Demo User';
	const plainPassword = 'password123';

	let user = await User.findOne({ email });
	if (!user) {
		const passwordHash = await bcrypt.hash(plainPassword, 10);
		user = await User.create({ name, email, passwordHash });
		// eslint-disable-next-line no-console
		console.log(`Created demo user: ${email} / ${plainPassword}`);
	} else {
		// eslint-disable-next-line no-console
		console.log(`Demo user already exists: ${email}`);
	}

	const count = await Post.countDocuments();
	if (count === 0) {
		await Post.insertMany([
			{ title: 'Welcome to the Mini Blog', content: 'This is your first post. Enjoy writing!', author: user._id },
			{ title: 'Getting Started', content: 'Login using the demo account and create your own posts.', author: user._id },
		]);
		// eslint-disable-next-line no-console
		console.log('Inserted sample posts.');
	} else {
		// eslint-disable-next-line no-console
		console.log('Posts already present, skipping inserts.');
	}
}

main()
	.then(() => {
		// eslint-disable-next-line no-console
		console.log(`Seed completed. MongoDB: ${config.mongoUri}`);
		return mongoose.disconnect();
	})
	.catch((err) => {
		// eslint-disable-next-line no-console
		console.error('Seed failed', err);
		process.exitCode = 1;
		return mongoose.disconnect();
	});
