<template>
  <div>
    <div class="space-y-8 animate-in fade-in duration-500">
      <div class="flex items-center justify-between bg-[#1e1e2e] p-6 rounded-2xl shadow-lg border border-[#3f3f5a]">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-white">Projects</h2>
        </div>
        <button @click="showCreateModal = true" class="inline-flex items-center px-5 py-2.5 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#1e1e2e] transition-all duration-300 transform hover:scale-105">
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>

      <div v-if="projects.length === 0" class="bg-[#1e1e2e] p-12 rounded-2xl shadow-sm border border-[#3f3f5a] text-center border-dashed">
        <svg class="mx-auto h-12 w-12 text-[#7f849c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-semibold text-white">No projects</h3>
        <p class="mt-1 text-sm text-[#a6adc8]">Get started by creating a new project.</p>
      </div>

      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="project in projects" :key="project.id" class="bg-[#1e1e2e] overflow-hidden shadow-lg rounded-2xl border border-[#3f3f5a] transition-all duration-300 hover:shadow-indigo-500/10 hover:border-indigo-500/50 group flex flex-col h-full">
          <div class="px-6 py-6 flex-1">
            <div class="flex items-center justify-between mb-4">
              <div class="w-10 h-10 rounded-lg bg-[#313149] flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
              </div>
              <div class="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button @click.stop="editProject(project)" class="p-2 text-[#a6adc8] hover:text-indigo-400 bg-[#313149] hover:bg-[#3f3f5a] rounded-lg transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
                <button @click.stop="deleteProject(project.id)" class="p-2 text-[#a6adc8] hover:text-red-400 bg-[#313149] hover:bg-red-500/20 rounded-lg transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
            <router-link :to="`/projects/${project.id}/tasks`" class="block focus:outline-none">
              <h3 class="text-lg font-semibold text-white truncate">{{ project.name }}</h3>
              <p class="mt-2 text-sm text-[#a6adc8] line-clamp-3">
                {{ project.description || 'No description provided.' }}
              </p>
            </router-link>
          </div>
          <div class="px-6 py-4 bg-[#181825] border-t border-[#3f3f5a] flex items-center justify-between">
            <router-link :to="`/projects/${project.id}/tasks`" class="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center">
              View Tasks
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showCreateModal" class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-[#11111b]/80 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="relative inline-block align-bottom bg-[#1e1e2e] rounded-2xl border border-[#3f3f5a] px-4 pt-5 pb-4 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div class="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 class="text-xl leading-6 font-semibold text-white" id="modal-title">
                {{ editingProject ? 'Edit Project' : 'Create Project' }}
              </h3>
              <div class="mt-6 space-y-5">
                <div>
                  <label for="project-name" class="block text-sm font-medium text-[#a6adc8]">Project Name</label>
                  <div class="mt-2">
                    <input type="text" name="project-name" id="project-name" v-model="form.name" class="block w-full bg-[#181825] border border-[#3f3f5a] rounded-xl text-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 transition-colors" placeholder="My project">
                  </div>
                </div>
                <div>
                  <label for="project-desc" class="block text-sm font-medium text-[#a6adc8]">Description</label>
                  <div class="mt-2">
                    <textarea id="project-desc" name="project-desc" rows="4" v-model="form.description" class="block w-full bg-[#181825] border border-[#3f3f5a] rounded-xl text-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 transition-colors" placeholder="Optional description"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8 sm:mt-6 sm:flex sm:flex-row-reverse sm:gap-3">
            <button type="button" @click="saveProject" class="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-base font-semibold text-white hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#1e1e2e] sm:w-auto sm:text-sm transition-all">
              {{ editingProject ? 'Save Changes' : 'Create Project' }}
            </button>
            <button type="button" @click="closeModal" class="mt-3 w-full inline-flex justify-center rounded-xl border border-[#3f3f5a] shadow-sm px-5 py-2.5 bg-[#313149] text-base font-semibold text-white hover:bg-[#3f3f5a] focus:outline-none sm:mt-0 sm:w-auto sm:text-sm transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../../plugins/axios'

const projects = ref<any[]>([])
const showCreateModal = ref(false)
const editingProject = ref<any>(null)
const form = ref({ name: '', description: '' })

const loadProjects = async () => {
  const response = await api.get('/projects')
  projects.value = response.data
}

onMounted(loadProjects)

const closeModal = () => {
  showCreateModal.value = false
  editingProject.value = null
  form.value = { name: '', description: '' }
}

const editProject = (project: any) => {
  editingProject.value = project
  form.value = { name: project.name, description: project.description || '' }
  showCreateModal.value = true
}

const saveProject = async () => {
  if (editingProject.value) {
    await api.patch(`/projects/${editingProject.value.id}`, form.value)
  } else {
    await api.post('/projects', form.value)
  }
  await loadProjects()
  closeModal()
}

const deleteProject = async (id: string) => {
  if (confirm('Are you sure you want to delete this project?')) {
    await api.delete(`/projects/${id}`)
    await loadProjects()
  }
}
</script>
