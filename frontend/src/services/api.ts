import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

// Attach Authorization header if token present
api.interceptors.request.use((config) => {
	const auth = useAuthStore();
	if (auth.token) {
		config.headers = config.headers || {};
		config.headers.Authorization = `Bearer ${auth.token}`;
	}
	return config;
});

// Simple error normalization
api.interceptors.response.use(
	(r) => r,
	(err) => Promise.reject(err?.response?.data?.message || err.message || 'Request failed')
);

export const AuthService = {
	async login(email: string, password: string) {
		const res = await api.post('/auth/login', { email, password });
		return res.data as { success: boolean; data?: { token: string }; message?: string };
	},
	async register(name: string, email: string, password: string) {
		const res = await api.post('/auth/register', { name, email, password });
		return res.data as { success: boolean; data?: { token: string }; message?: string };
	},
};

export interface PostDto {
	_id: string;
	title: string;
	content: string;
	author: { _id: string; name: string; email: string } | string;
	createdAt: string;
	updatedAt: string;
}

export const PostService = {
	async list() {
		const res = await api.get('/posts');
		return res.data as { success: boolean; data: PostDto[] };
	},
	async get(id: string) {
		const res = await api.get(`/posts/${id}`);
		return res.data as { success: boolean; data: PostDto };
	},
	async create(payload: { title: string; content: string }) {
		const res = await api.post('/posts', payload);
		return res.data as { success: boolean; data: PostDto };
	},
	async update(id: string, payload: { title?: string; content?: string }) {
		const res = await api.put(`/posts/${id}`, payload);
		return res.data as { success: boolean; data: PostDto };
	},
	async remove(id: string) {
		const res = await api.delete(`/posts/${id}`);
		return res.data as { success: boolean; message?: string };
	},
};

export default api;
