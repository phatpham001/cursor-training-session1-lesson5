<template>
	<section class="container py-8">
		<div class="max-w-2xl mx-auto card">
			<div class="card-body">
				<h2 class="text-xl font-semibold mb-1">{{ isEdit ? 'Edit Post' : 'New Post' }}</h2>
				<p class="text-sm text-gray-600 mb-6">{{ isEdit ? 'Update your content' : 'Share your thoughts with the world' }}</p>
				<form @submit.prevent="onSubmit" class="space-y-4">
					<div>
						<label class="label">Title</label>
						<input v-model="title" class="input" required />
					</div>
					<div>
						<label class="label">Content</label>
						<textarea v-model="content" class="input h-56" required></textarea>
					</div>
					<div class="flex items-center gap-2">
						<button :disabled="loading" class="btn-primary disabled:opacity-50">{{ isEdit ? 'Update' : 'Create' }}</button>
						<RouterLink to="/" class="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors bg-gray-200 hover:bg-gray-300">Cancel</RouterLink>
					</div>
					<p v-if="error" class="text-sm text-red-600">{{ error }}</p>
				</form>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PostService } from '../services/api';

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => Boolean(route.params.id));

const title = ref('');
const content = ref('');
const loading = ref(false);
const error = ref('');

async function loadIfEdit() {
	if (!isEdit.value) return;
	try {
		loading.value = true;
		const id = String(route.params.id);
		const res = await PostService.get(id);
		title.value = res.data.title;
		content.value = res.data.content;
	} catch (e: any) {
		error.value = String(e);
	} finally {
		loading.value = false;
	}
}

async function onSubmit() {
	try {
		loading.value = true;
		error.value = '';
		if (isEdit.value) {
			const id = String(route.params.id);
			await PostService.update(id, { title: title.value, content: content.value });
			router.replace({ name: 'post-detail', params: { id } });
		} else {
			const res = await PostService.create({ title: title.value, content: content.value });
			router.replace({ name: 'post-detail', params: { id: res.data._id } });
		}
	} catch (e: any) {
		error.value = String(e);
	} finally {
		loading.value = false;
	}
}

onMounted(loadIfEdit);
</script>
