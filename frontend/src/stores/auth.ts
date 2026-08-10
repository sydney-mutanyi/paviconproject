import { defineStore } from 'pinia'
import api from '../plugins/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any | null,
    token: localStorage.getItem('token') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(credentials: any) {
      const response = await api.post('/auth/login', credentials)
      this.token = response.data.access_token
      localStorage.setItem('token', this.token!)
    },
    async register(userData: any) {
      await api.post('/auth/register', userData)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
