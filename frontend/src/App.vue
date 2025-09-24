<template>
	<div class="min-h-screen flex flex-col">
		<header class="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
			<div class="container h-14 flex items-center justify-between">
				<RouterLink to="/" class="flex items-center gap-2">
					<span class="w-8 h-8 rounded-lg bg-primary-600 inline-block"></span>
					<span class="font-bold">Mini Blog</span>
				</RouterLink>
				<nav class="hidden md:flex items-center gap-4">
					<RouterLink class="hover:underline" to="/">Home</RouterLink>
					<RouterLink class="hover:underline" to="/posts/new">New Post</RouterLink>
					<template v-if="isAuthed">
						<span class="text-sm text-gray-700">Hi! {{ userName }}</span>
						<button class="btn bg-gray-200 hover:bg-gray-300" @click="onLogout">Logout</button>
					</template>
					<template v-else>
						<RouterLink class="hover:underline" to="/login">Login</RouterLink>
					</template>
				</nav>
			</div>
		</header>
		<main class="flex-1">
			<RouterView />
		</main>
		<footer class="mt-10 border-t bg-white">
			<div class="container py-6 text-sm text-gray-600 flex items-center justify-between">
				<p>© {{ new Date().getFullYear() }} Mini Blog. All rights reserved.</p>
				<p>
					Built with <a href="https://vuejs.org/" target="_blank" rel="noreferrer">Vue</a> & Tailwind.
				</p>
			</div>
		</footer>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';

const auth = useAuthStore();
const isAuthed = computed(() => auth.isAuthenticated);
const userName = computed(() => auth.userName || 'User');
function onLogout() {
	auth.logout();
}
</script>

<style scoped></style>
