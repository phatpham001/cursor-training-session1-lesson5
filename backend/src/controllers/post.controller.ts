import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { sendJson } from '../utils/response';
import { createPostSchema, updatePostSchema } from '../validators/post';

/**
 * List posts with author populated minimal info.
 */
export async function listPosts(_req: Request, res: Response) {
	const posts = await Post.find()
		.sort({ createdAt: -1 })
		.populate('author', 'name email');
	return sendJson(res, 200, { success: true, data: posts });
}

/**
 * Get single post by id.
 */
export async function getPost(req: Request, res: Response) {
	const { id } = req.params;
	const post = await Post.findById(id).populate('author', 'name email');
	if (!post) return sendJson(res, 404, { success: false, message: 'Post not found' });
	return sendJson(res, 200, { success: true, data: post });
}

/**
 * Create a new post. Requires auth.
 */
export async function createPost(req: Request, res: Response) {
	const parse = createPostSchema.safeParse(req.body);
	if (!parse.success) {
		return sendJson(res, 400, { success: false, message: parse.error.errors[0]?.message || 'Invalid input' });
	}
	const { title, content } = parse.data;
	const authorId = req.user?.id;
	if (!authorId) return sendJson(res, 401, { success: false, message: 'Unauthorized' });
	const post = await Post.create({ title, content, author: authorId });
	return sendJson(res, 201, { success: true, data: post, message: 'Post created' });
}

/**
 * Update a post by id. Only author can update.
 */
export async function updatePost(req: Request, res: Response) {
	const { id } = req.params;
	const parse = updatePostSchema.safeParse(req.body);
	if (!parse.success) {
		return sendJson(res, 400, { success: false, message: parse.error.errors[0]?.message || 'Invalid input' });
	}
	const existing = await Post.findById(id);
	if (!existing) return sendJson(res, 404, { success: false, message: 'Post not found' });
	if (existing.author.toString() !== req.user?.id) return sendJson(res, 403, { success: false, message: 'Forbidden' });
	existing.set(parse.data);
	await existing.save();
	return sendJson(res, 200, { success: true, data: existing, message: 'Post updated' });
}

/**
 * Delete a post by id. Only author can delete.
 */
export async function deletePost(req: Request, res: Response) {
	const { id } = req.params;
	const existing = await Post.findById(id);
	if (!existing) return sendJson(res, 404, { success: false, message: 'Post not found' });
	if (existing.author.toString() !== req.user?.id) return sendJson(res, 403, { success: false, message: 'Forbidden' });
	await existing.deleteOne();
	return sendJson(res, 200, { success: true, message: 'Post deleted' });
}
