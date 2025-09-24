<template>
	<section class="bg-gradient-to-b from-primary-50 to-transparent">
		<div class="container py-10 md:py-16">
			<div class="max-w-2xl">
				<h1>Write, share, and discover great posts</h1>
				<p class="mt-3 text-gray-600">A minimal blog platform built with Vue 3 and Tailwind CSS.</p>
				<div class="mt-6 flex gap-3">
					<RouterLink to="/posts/new" class="btn-primary">Create a Post</RouterLink>
				</div>
			</div>
		</div>
	</section>

	<div class="container py-8">
		<h2 class="mb-4">Latest Posts</h2>
		<div v-if="loading">Loading...</div>
		<p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
		<div v-if="posts.length" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			<article v-for="p in posts" :key="p._id" class="card overflow-hidden">
				<div class="card-body">
					<RouterLink :to="{ name: 'post-detail', params: { id: p._id } }" class="text-lg font-semibold hover:underline">{{ p.title }}</RouterLink>
					<div class="mt-1 text-xs text-gray-500">{{ formatDate(p.createdAt) }} · by {{ authorName(p) }}</div>
					<p class="mt-3 clamp-3 text-sm text-gray-700" v-if="p.content">{{ p.content }}</p>
				</div>
			</article>
		</div>
		<div v-else-if="!loading" class="text-gray-600">No posts yet.</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PostDto, PostService } from '../services/api';

const posts = ref<PostDto[]>([]);
const loading = ref(false);
const error = ref('');

function formatDate(iso: string) {
	return new Date(iso).toLocaleString();
}

function authorName(p: PostDto): string {
	if (typeof p.author === 'string') return p.author;
	return p.author?.name || 'Unknown';
}

onMounted(async () => {
	try {
		loading.value = true;
		const res = await PostService.list();
		posts.value = res.data || [];
	} catch (e: any) {
		error.value = String(e);
	} finally {
		loading.value = false;
	}
});
</script>
