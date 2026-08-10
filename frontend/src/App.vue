<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-[#13131f] text-[#cdd6f4]">
    <nav v-if="authStore.isAuthenticated" class="bg-[#1e1e2e] border-b border-[#3f3f5a] shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-8">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              </div>
              <span class="font-bold text-xl tracking-tight text-white">TaskMaster</span>
            </div>
            <div class="hidden md:flex space-x-1">
              <router-link to="/" class="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-[#a6adc8] hover:text-white hover:bg-[#313149]" active-class="bg-[#313149] text-white shadow-inner">Dashboard</router-link>
              <router-link to="/projects" class="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-[#a6adc8] hover:text-white hover:bg-[#313149]" active-class="bg-[#313149] text-white shadow-inner">Projects</router-link>
            </div>
          </div>
          <div>
            <button @click="logout" class="bg-[#313149] hover:bg-red-500/20 text-[#a6adc8] hover:text-red-400 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border border-transparent hover:border-red-500/30">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>
