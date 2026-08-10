<template>
  <div>
    <div class="space-y-8 animate-in fade-in duration-500">

      <div class="flex items-center justify-between bg-[#1e1e2e] p-6 rounded-2xl shadow-lg border border-[#3f3f5a]">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <router-link to="/projects" class="text-[#7f849c] hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </router-link>
            Tasks
          </h2>
          <p class="mt-2 text-sm text-[#a6adc8] flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            Project: <span class="font-medium text-white">{{ project?.name || 'Loading...' }}</span>
          </p>
        </div>
        <button @click="showCreateModal = true" class="inline-flex items-center px-5 py-2.5 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#1e1e2e] transition-all duration-300 transform hover:scale-105">
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </button>
      </div>


      <div class="bg-[#1e1e2e] p-5 shadow-lg rounded-2xl border border-[#3f3f5a] flex flex-wrap gap-4 items-end">
        <div class="flex-1 min-w-[150px]">
          <label class="block text-xs font-semibold text-[#a6adc8] uppercase tracking-wider mb-2">Status</label>
          <select v-model="filters.status" @change="loadTasks" class="block w-full bg-[#181825] border border-[#3f3f5a] text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5 transition-colors appearance-none">
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <div class="flex-1 min-w-[150px]">
          <label class="block text-xs font-semibold text-[#a6adc8] uppercase tracking-wider mb-2">Priority</label>
          <select v-model="filters.priority" @change="loadTasks" class="block w-full bg-[#181825] border border-[#3f3f5a] text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5 transition-colors appearance-none">
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div class="flex-1 min-w-[150px]">
          <label class="block text-xs font-semibold text-[#a6adc8] uppercase tracking-wider mb-2">Sort By</label>
          <select v-model="filters.sortBy" @change="loadTasks" class="block w-full bg-[#181825] border border-[#3f3f5a] text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5 transition-colors appearance-none">
            <option value="createdAt">Created Date</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div class="flex-1 min-w-[150px]">
          <label class="block text-xs font-semibold text-[#a6adc8] uppercase tracking-wider mb-2">Order</label>
          <select v-model="filters.sortOrder" @change="loadTasks" class="block w-full bg-[#181825] border border-[#3f3f5a] text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5 transition-colors appearance-none">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>


      <div class="bg-[#1e1e2e] shadow-lg rounded-2xl border border-[#3f3f5a] overflow-hidden">
        <ul role="list" class="divide-y divide-[#3f3f5a]">
          <li v-if="tasks.length === 0" class="px-6 py-12 text-center">
            <svg class="mx-auto h-12 w-12 text-[#7f849c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 class="mt-2 text-sm font-semibold text-white">No tasks found</h3>
            <p class="mt-1 text-sm text-[#a6adc8]">Try adjusting your filters or create a new task.</p>
          </li>
          <li v-for="task in tasks" :key="task.id" class="group transition-colors hover:bg-[#27273a] cursor-pointer" @click="viewTask(task)">
            <div class="px-6 py-5 flex items-center justify-between">
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-3">
                  <p class="text-base font-semibold text-white truncate">{{ task.title }}</p>
                  <div class="flex gap-2">
                    <span :class="['px-2.5 py-0.5 inline-flex text-[11px] font-bold uppercase tracking-wider rounded-full border', statusClass(task.status)]">
                      {{ task.status.replace('_', ' ') }}
                    </span>
                    <span :class="['px-2.5 py-0.5 inline-flex text-[11px] font-bold uppercase tracking-wider rounded-full border', priorityClass(task.priority)]">
                      {{ task.priority }}
                    </span>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="text-sm text-[#a6adc8] line-clamp-2">{{ task.description || 'No description provided.' }}</p>
                </div>
                <div class="mt-3 flex items-center gap-4 text-xs text-[#7f849c] font-medium">
                  <div v-if="task.dueDate" class="flex items-center gap-1.5 bg-[#181825] px-2 py-1 rounded-md border border-[#3f3f5a]">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <time :datetime="task.dueDate">{{ new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) }}</time>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Created {{ new Date(task.createdAt).toLocaleDateString() }}</span>
                  </div>
                </div>
              </div>
              <div class="ml-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" @click.stop>
                <button @click="editTask(task)" class="p-2 text-[#a6adc8] hover:text-indigo-400 bg-[#313149] hover:bg-[#3f3f5a] rounded-lg transition-colors" title="Edit Task">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
                <button @click="deleteTask(task.id)" class="p-2 text-[#a6adc8] hover:text-red-400 bg-[#313149] hover:bg-red-500/20 rounded-lg transition-colors" title="Delete Task">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
          </li>
        </ul>
        

        <div v-if="totalPages > 1" class="bg-[#181825] px-6 py-4 border-t border-[#3f3f5a] flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm text-[#a6adc8]">
            Page <span class="font-semibold text-white">{{ filters.page }}</span> of <span class="font-semibold text-white">{{ totalPages }}</span>
          </p>
          <div class="flex items-center gap-1.5">

            <button @click="goToPage(1)" :disabled="filters.page <= 1"
              class="px-2.5 py-1.5 rounded-lg border border-[#3f3f5a] bg-[#313149] text-sm font-medium text-white hover:bg-[#3f3f5a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors" title="First page">
              «
            </button>

            <button @click="goToPage(filters.page - 1)" :disabled="filters.page <= 1"
              class="px-3 py-1.5 rounded-lg border border-[#3f3f5a] bg-[#313149] text-sm font-medium text-white hover:bg-[#3f3f5a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              ‹ Prev
            </button>

            <template v-for="p in pageNumbers" :key="p">
              <span v-if="p === '...'" class="px-2 py-1.5 text-sm text-[#585b70]">…</span>
              <button v-else @click="goToPage(p as number)"
                :class="['px-3 py-1.5 rounded-lg border text-sm font-semibold transition-colors',
                  p === filters.page
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'border-[#3f3f5a] bg-[#313149] text-white hover:bg-[#3f3f5a]']">
                {{ p }}
              </button>
            </template>

            <button @click="goToPage(filters.page + 1)" :disabled="filters.page >= totalPages"
              class="px-3 py-1.5 rounded-lg border border-[#3f3f5a] bg-[#313149] text-sm font-medium text-white hover:bg-[#3f3f5a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              Next ›
            </button>

            <button @click="goToPage(totalPages)" :disabled="filters.page >= totalPages"
              class="px-2.5 py-1.5 rounded-lg border border-[#3f3f5a] bg-[#313149] text-sm font-medium text-white hover:bg-[#3f3f5a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors" title="Last page">
              »
            </button>
          </div>
        </div>

      </div>
    </div>


    <div v-if="viewingTask" class="fixed z-50 inset-0 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-[#11111b]/80 backdrop-blur-sm" @click="closeViewModal"></div>

      <div class="relative z-10 w-full max-w-lg bg-[#1e1e2e] rounded-2xl border border-[#3f3f5a] shadow-2xl flex flex-col max-h-[90vh]">
        <div class="flex items-start justify-between p-6 border-b border-[#3f3f5a] flex-shrink-0">
          <div class="flex-1 min-w-0 pr-4">
            <h3 class="text-xl font-semibold text-white leading-snug">{{ viewingTask.title }}</h3>
            <div class="flex flex-wrap gap-2 mt-3">
              <span :class="['px-2.5 py-0.5 inline-flex text-[11px] font-bold uppercase tracking-wider rounded-full border', statusClass(viewingTask.status)]">
                {{ viewingTask.status.replace('_', ' ') }}
              </span>
              <span :class="['px-2.5 py-0.5 inline-flex text-[11px] font-bold uppercase tracking-wider rounded-full border', priorityClass(viewingTask.priority)]">
                {{ viewingTask.priority }} Priority
              </span>
            </div>
          </div>
          <button @click="closeViewModal" class="flex-shrink-0 p-1.5 text-[#7f849c] hover:text-white bg-[#313149] hover:bg-[#3f3f5a] rounded-lg transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="overflow-y-auto flex-1 p-6 space-y-6">
          <div>
            <p class="text-xs font-semibold text-[#7f849c] uppercase tracking-wider mb-2">Description</p>
            <p class="text-sm text-[#cdd6f4] leading-relaxed whitespace-pre-wrap">{{ viewingTask.description || 'No description provided.' }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-[#181825] rounded-xl p-4 border border-[#3f3f5a]">
              <p class="text-xs font-semibold text-[#7f849c] uppercase tracking-wider mb-1.5">Due Date</p>
              <p class="text-sm font-medium text-white">
                {{ viewingTask.dueDate ? new Date(viewingTask.dueDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : '—' }}
              </p>
            </div>
            <div class="bg-[#181825] rounded-xl p-4 border border-[#3f3f5a]">
              <p class="text-xs font-semibold text-[#7f849c] uppercase tracking-wider mb-1.5">Created</p>
              <p class="text-sm font-medium text-white">
                {{ new Date(viewingTask.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) }}
              </p>
            </div>
            <div class="bg-[#181825] rounded-xl p-4 border border-[#3f3f5a] col-span-2">
              <p class="text-xs font-semibold text-[#7f849c] uppercase tracking-wider mb-1.5">Last Updated</p>
              <p class="text-sm font-medium text-white">
                {{ new Date(viewingTask.updatedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 p-6 border-t border-[#3f3f5a] flex-shrink-0">
          <button @click="closeViewModal" class="px-5 py-2.5 rounded-xl border border-[#3f3f5a] bg-[#313149] text-sm font-semibold text-white hover:bg-[#3f3f5a] transition-colors">
            Close
          </button>
          <button @click="editFromView" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all">
            Edit Task
          </button>
        </div>
      </div>
    </div>

    <div v-if="showCreateModal" class="fixed z-50 inset-0 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="fixed inset-0 bg-[#11111b]/80 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

      <div class="relative z-10 w-full max-w-lg bg-[#1e1e2e] rounded-2xl border border-[#3f3f5a] shadow-2xl flex flex-col max-h-[90vh]">
        <div class="flex items-center justify-between p-6 border-b border-[#3f3f5a] flex-shrink-0">
          <h3 class="text-xl font-semibold text-white" id="modal-title">
            {{ editingTask ? 'Edit Task' : 'Create Task' }}
          </h3>
          <button @click="closeModal" class="p-1.5 text-[#7f849c] hover:text-white bg-[#313149] hover:bg-[#3f3f5a] rounded-lg transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="overflow-y-auto flex-1 p-6 space-y-5">
          <div>
            <label class="block text-sm font-medium text-[#a6adc8] mb-2">Title</label>
            <input type="text" v-model="form.title" class="block w-full bg-[#181825] border border-[#3f3f5a] rounded-xl text-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 transition-colors" placeholder="Task title">
          </div>
          <div>
            <label class="block text-sm font-medium text-[#a6adc8] mb-2">Description</label>
            <textarea rows="4" v-model="form.description" class="block w-full bg-[#181825] border border-[#3f3f5a] rounded-xl text-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 transition-colors" placeholder="Optional description"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-[#a6adc8] mb-2">Status</label>
              <select v-model="form.status" class="block w-full bg-[#181825] border border-[#3f3f5a] text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 transition-colors appearance-none">
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#a6adc8] mb-2">Priority</label>
              <select v-model="form.priority" class="block w-full bg-[#181825] border border-[#3f3f5a] text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 transition-colors appearance-none">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-[#a6adc8] mb-2">Due Date (Optional)</label>
            <input type="date" v-model="form.dueDate" class="block w-full bg-[#181825] border border-[#3f3f5a] rounded-xl text-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 transition-colors" style="color-scheme: dark;">
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 p-6 border-t border-[#3f3f5a] flex-shrink-0">
          <button type="button" @click="closeModal" class="px-5 py-2.5 rounded-xl border border-[#3f3f5a] bg-[#313149] text-sm font-semibold text-white hover:bg-[#3f3f5a] transition-colors">
            Cancel
          </button>
          <button type="button" @click="saveTask" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#1e1e2e] transition-all">
            {{ editingTask ? 'Save Changes' : 'Create Task' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../../plugins/axios'

const route = useRoute()
const projectId = route.params.id as string

const project = ref<any>(null)
const tasks = ref<any[]>([])
const totalPages = ref(1)


const pageNumbers = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const cur = filters.value.page
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (cur > 3) pages.push('...')
    for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i)
    if (cur < total - 2) pages.push('...')
    pages.push(total)
  }
  return pages
})

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  filters.value.page = page
  loadTasks()
}

const showCreateModal = ref(false)
const editingTask = ref<any>(null)
const viewingTask = ref<any>(null)

const filters = ref({
  status: '',
  priority: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 10
})

const form = ref({
  title: '',
  description: '',
  status: 'PENDING',
  priority: 'MEDIUM',
  dueDate: ''
})

const loadProject = async () => {
  const response = await api.get(`/projects/${projectId}`)
  project.value = response.data
}

const loadTasks = async () => {
  const query = new URLSearchParams()
  if (filters.value.status) query.append('status', filters.value.status)
  if (filters.value.priority) query.append('priority', filters.value.priority)
  query.append('sortBy', filters.value.sortBy)
  query.append('sortOrder', filters.value.sortOrder)
  query.append('page', filters.value.page.toString())
  query.append('limit', filters.value.limit.toString())

  const response = await api.get(`/tasks/project/${projectId}?${query.toString()}`)
  tasks.value = response.data.tasks
  totalPages.value = Math.ceil(response.data.total / response.data.limit) || 1
}

onMounted(() => {
  loadProject()
  loadTasks()
})


const viewTask = (task: any) => {
  viewingTask.value = task
}

const closeViewModal = () => {
  viewingTask.value = null
}

const editFromView = () => {
  const task = viewingTask.value
  closeViewModal()
  editTask(task)
}


const closeModal = () => {
  showCreateModal.value = false
  editingTask.value = null
  form.value = {
    title: '',
    description: '',
    status: 'PENDING',
    priority: 'MEDIUM',
    dueDate: ''
  }
}

const editTask = (task: any) => {
  editingTask.value = task
  form.value = {
    title: task.title,
    description: task.description || '',
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  }
  showCreateModal.value = true
}

const saveTask = async () => {
  const payload = {
    ...form.value,
    dueDate: form.value.dueDate ? new Date(form.value.dueDate).toISOString() : null
  }

  if (editingTask.value) {
    await api.patch(`/tasks/${editingTask.value.id}`, payload)
  } else {
    await api.post('/tasks', { ...payload, projectId })
  }
  await loadTasks()
  closeModal()
}

const deleteTask = async (id: string) => {
  if (confirm('Are you sure you want to delete this task?')) {
    await api.delete(`/tasks/${id}`)
    await loadTasks()
  }
}


const statusClass = (status: string) => {
  switch (status) {
    case 'PENDING': return 'bg-[#313149] text-[#cdd6f4] border-[#3f3f5a]'
    case 'IN_PROGRESS': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    case 'COMPLETED': return 'bg-green-500/20 text-green-300 border-green-500/30'
    default: return 'bg-[#313149] text-[#cdd6f4] border-[#3f3f5a]'
  }
}

const priorityClass = (priority: string) => {
  switch (priority) {
    case 'LOW': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    case 'HIGH': return 'bg-red-500/20 text-red-300 border-red-500/30'
    default: return 'bg-[#313149] text-[#cdd6f4] border-[#3f3f5a]'
  }
}
</script>
