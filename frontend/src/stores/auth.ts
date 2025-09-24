import { defineStore } from 'pinia';

function decodeJwt(token: string): { name?: string; email?: string } | null {
	try {
		const base64 = token.split('.')[1];
		const payload = JSON.parse(atob(base64));
		return { name: payload.name, email: payload.email };
	} catch {
		return null;
	}
}

export const useAuthStore = defineStore('auth', {
	state: () => ({ token: localStorage.getItem('token') || '', userName: '' as string }),
	getters: {
		isAuthenticated: (state) => Boolean(state.token),
	},
	actions: {
		/** Save token to state and localStorage */
		setToken(token: string) {
			this.token = token;
			localStorage.setItem('token', token);
			const info = decodeJwt(token);
			this.userName = info?.name || '';
		},
		/** Hydrate user from stored token on app start */
		initFromStorage() {
			if (!this.token) return;
			const info = decodeJwt(this.token);
			this.userName = info?.name || '';
		},
		/** Clear token from state and localStorage */
		logout() {
			this.token = '';
			this.userName = '';
			localStorage.removeItem('token');
		},
	},
});
