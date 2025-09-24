<template>
	<section class="container py-10">
		<div class="max-w-md mx-auto card">
			<div class="card-body">
				<h2 class="text-xl font-semibold mb-1">Welcome back</h2>
				<p class="text-sm text-gray-600 mb-6">Login to continue writing and managing your posts.</p>
				<form @submit.prevent="onSubmit" class="space-y-4">
					<div>
						<label class="label">Email</label>
						<input v-model="email" type="email" class="input" required />
					</div>
					<div>
						<label class="label">Password</label>
						<input v-model="password" type="password" class="input" required />
					</div>
					<div class="flex items-center justify-between">
						<button :disabled="loading" class="btn-primary disabled:opacity-50">{{ loading ? 'Logging in...' : 'Login' }}</button>
						<button type="button" @click="loginDemo" class="text-sm text-primary-600 hover:underline">Use demo account</button>
					</div>
					<p v-if="error" class="text-sm text-red-600">{{ error }}</p>
				</form>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { AuthService } from '../services/api';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

async function onSubmit() {
	try {
		loading.value = true;
		error.value = '';
		const res = await AuthService.login(email.value, password.value);
		if (res.success && res.data?.token) {
			auth.setToken(res.data.token);
			const redirect = (route.query.redirect as string) || '/';
			router.replace(redirect);
		} else {
			error.value = res.message || 'Login failed';
		}
	} catch (err: any) {
		error.value = String(err);
	} finally {
		loading.value = false;
	}
}

async function loginDemo() {
	email.value = 'demo@example.com';
	password.value = 'password123';
	await onSubmit();
}
</script>
