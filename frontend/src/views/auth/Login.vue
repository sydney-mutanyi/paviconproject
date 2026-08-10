<template>
  <div class="min-h-screen flex items-center justify-center bg-[#13131f] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-[#1e1e2e] p-10 rounded-2xl shadow-2xl border border-[#3f3f5a]">
      <div>
        <div class="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-6">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
        </div>
        <h2 class="text-center text-3xl font-extrabold text-white tracking-tight">Welcome back</h2>

      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="email-address" class="block text-sm font-medium text-[#a6adc8] mb-2">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required v-model="email"
              class="block w-full bg-[#181825] border border-[#3f3f5a] text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 transition-colors placeholder-[#7f849c]"
              placeholder="you@example.com">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-[#a6adc8] mb-2">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required v-model="password"
              class="block w-full bg-[#181825] border border-[#3f3f5a] text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 transition-colors placeholder-[#7f849c]"
              placeholder="••••••••">
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <router-link to="/register" class="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              Don't have an account? Register
            </router-link>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#1e1e2e] shadow-lg transform transition-all hover:scale-[1.02] disabled:opacity-70 disabled:scale-100">
            <span v-if="loading" class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign in</span>
          </button>
        </div>
        
        <div v-if="error" class="bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center p-3 rounded-xl mt-4">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    await authStore.login({ email: email.value, password: password.value })
    router.push('/')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to login'
  } finally {
    loading.value = false
  }
}
</script>
