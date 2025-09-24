<template>
	<section class="container py-8">
		<div v-if="loading">Loading...</div>
		<p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
		<article v-if="post" class="card">
			<div class="card-body">
				<h2 class="text-3xl font-bold mb-2">{{ post.title }}</h2>
				<div class="text-sm text-gray-500 mb-6">{{ new Date(post.createdAt).toLocaleString() }} · by {{ authorName }}</div>
				<div class="prose max-w-none" v-html="contentHtml"></div>
				<div class="mt-6 flex gap-3" v-if="canEdit">
					<RouterLink :to="{ name: 'post-edit', params: { id: post._id } }" class="btn-secondary">Edit</RouterLink>
					<button @click="onDelete" class="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors bg-red-600 text-white hover:bg-red-700">Delete</button>
				</div>
			</div>
		</article>
	</section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PostDto, PostService } from '../services/api';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const post = ref<PostDto | null>(null);
const loading = ref(false);
const error = ref('');

const authorName = computed(() => {
	if (!post.value) return '';
	const a = post.value.author;
	return typeof a === 'string' ? a : a?.name || 'Unknown';
});

const canEdit = computed(() => Boolean(auth.isAuthenticated));
const contentHtml = computed(() => post.value?.content || '');

async function load() {
	try {
		loading.value = true;
		const id = String(route.params.id);
		const res = await PostService.get(id);
		post.value = res.data;
	} catch (e: any) {
		error.value = String(e);
	} finally {
		loading.value = false;
	}
}

async function onDelete() {
	if (!post.value) return;
	if (!confirm('Delete this post?')) return;
	await PostService.remove(post.value._id);
	router.replace('/');
}

onMounted(load);
</script>
