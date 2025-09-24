import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const Home = () => import('../views/Home.vue');
const Login = () => import('../views/Login.vue');
const PostDetail = () => import('../views/PostDetail.vue');
const PostForm = () => import('../views/PostForm.vue');

function requireAuth(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
	const auth = useAuthStore();
	if (!auth.isAuthenticated) return next({ name: 'login', query: { redirect: to.fullPath } });
	next();
}

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', name: 'home', component: Home },
		{ path: '/login', name: 'login', component: Login },
		{ path: '/posts/new', name: 'post-new', component: PostForm, beforeEnter: requireAuth },
		{ path: '/posts/:id', name: 'post-detail', component: PostDetail },
		{ path: '/posts/:id/edit', name: 'post-edit', component: PostForm, beforeEnter: requireAuth },
	],
});

export default router;
