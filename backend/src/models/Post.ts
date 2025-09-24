import mongoose, { Schema, Document, Types } from 'mongoose';

export interface PostDocument extends Document {
	title: string;
	content: string;
	author: Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

const postSchema = new Schema<PostDocument>(
	{
		title: { type: String, required: true, trim: true },
		content: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: true }
);

export const Post = mongoose.model<PostDocument>('Post', postSchema);
