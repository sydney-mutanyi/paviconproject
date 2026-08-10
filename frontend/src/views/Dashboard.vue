<template>
  <div class="space-y-8 animate-in fade-in duration-500">

    <div class="bg-gradient-to-r from-[#1e1e2e] to-[#181825] rounded-2xl border border-[#3f3f5a] shadow-xl overflow-hidden">
      <div class="px-6 py-8 sm:px-8 flex items-center gap-6">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
        </div>
      </div>

      <div class="border-t border-[#3f3f5a] bg-[#181825] px-6 py-6 sm:px-8">
        <dl class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div class="bg-[#1e1e2e] border border-[#3f3f5a] rounded-xl p-5 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group">
            <dt class="text-xs font-semibold text-[#7f849c] uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
              Projects
            </dt>
            <dd class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {{ loading ? '—' : stats.totalProjects }}
            </dd>
          </div>

          <div class="bg-[#1e1e2e] border border-[#3f3f5a] rounded-xl p-5 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <dt class="text-xs font-semibold text-[#7f849c] uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              Total Tasks
            </dt>
            <dd class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {{ loading ? '—' : stats.totalTasks }}
            </dd>
          </div>

          <div class="bg-[#1e1e2e] border border-[#3f3f5a] rounded-xl p-5 hover:border-slate-400/50 transition-all duration-300">
            <dt class="text-xs font-semibold text-[#7f849c] uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0"></span>
              Pending
            </dt>
            <dd class="text-4xl font-bold text-slate-300">{{ loading ? '—' : stats.pending }}</dd>
          </div>

          <div class="bg-[#1e1e2e] border border-[#3f3f5a] rounded-xl p-5 hover:border-yellow-500/50 transition-all duration-300">
            <dt class="text-xs font-semibold text-[#7f849c] uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></span>
              In Progress
            </dt>
            <dd class="text-4xl font-bold text-yellow-300">{{ loading ? '—' : stats.inProgress }}</dd>
          </div>

          <div class="bg-[#1e1e2e] border border-[#3f3f5a] rounded-xl p-5 hover:border-green-500/50 transition-all duration-300 col-span-2 sm:col-span-1">
            <dt class="text-xs font-semibold text-[#7f849c] uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></span>
              Completed
            </dt>
            <dd class="text-4xl font-bold text-green-300">{{ loading ? '—' : stats.completed }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div>
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-xl font-bold text-white tracking-tight">Recent Projects</h2>
        <router-link to="/projects" class="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
          View all
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </router-link>
      </div>

      <div v-if="!loading && projects.length === 0" class="bg-[#1e1e2e] p-12 rounded-2xl border border-dashed border-[#3f3f5a] text-center">
        <svg class="mx-auto h-12 w-12 text-[#7f849c] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
        </svg>
        <p class="text-sm text-[#a6adc8]">No projects yet. <router-link to="/projects" class="text-indigo-400 hover:underline">Create your first one →</router-link></p>
      </div>

      <div v-else-if="loading" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 3" :key="i" class="rounded-2xl border border-[#3f3f5a] bg-[#1e1e2e] px-6 py-6 animate-pulse">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-lg bg-[#313149]"></div>
            <div class="h-4 bg-[#313149] rounded-md flex-1"></div>
          </div>
          <div class="h-3 bg-[#313149] rounded-md mb-2"></div>
          <div class="h-3 bg-[#313149] rounded-md w-3/4"></div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <router-link
          v-for="project in projects.slice(0, 6)"
          :key="project.id"
          :to="`/projects/${project.id}/tasks`"
          class="relative rounded-2xl border border-[#3f3f5a] bg-[#1e1e2e] px-6 py-6 shadow-lg flex flex-col hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 focus-within:ring-offset-[#1e1e2e] transition-all duration-300 group"
        >
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg bg-[#313149] flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
            </div>
            <p class="text-base font-semibold text-white truncate flex-1">{{ project.name }}</p>
          </div>
          <p class="text-sm text-[#a6adc8] line-clamp-2 flex-1">{{ project.description || 'No description provided.' }}</p>
          <div class="mt-4 pt-4 border-t border-[#3f3f5a] flex items-center justify-between text-xs text-[#7f849c]">
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"/></svg>
              {{ project._count?.tasks ?? 0 }} task{{ (project._count?.tasks ?? 0) !== 1 ? 's' : '' }}
            </span>
            <span class="text-[#585b70]">{{ new Date(project.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../plugins/axios'

const loading = ref(true)
const projects = ref<any[]>([])
const stats = ref({
  totalProjects: 0,
  totalTasks: 0,
  pending: 0,
  inProgress: 0,
  completed: 0,
})

onMounted(async () => {
  try {
    const [projectsRes, statsRes] = await Promise.all([
      api.get('/projects'),
      api.get('/projects/stats'),
    ])
    projects.value = projectsRes.data
    stats.value = statsRes.data
  } catch (error) {
    console.error('Failed to load dashboard data', error)
  } finally {
    loading.value = false
  }
})
</script>
