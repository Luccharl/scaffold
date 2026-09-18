<script setup>
import { ref, onMounted } from 'vue'
import notesService from '../services/notes.js'

const notes = ref([])
const title = ref('')
const body = ref('')
const loading = ref(false)
const error = ref(null)

async function loadNotes() {
  loading.value = true
  error.value = null
  try {
    notes.value = await notesService.getAll()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function addNote() {
  if (!title.value.trim()) return
  try {
    await notesService.create({ title: title.value, body: body.value })
    title.value = ''
    body.value = ''
    await loadNotes()
  } catch (err) {
    error.value = err.message
  }
}

async function deleteNote(id) {
  try {
    await notesService.remove(id)
    await loadNotes()
  } catch (err) {
    error.value = err.message
  }
}

onMounted(loadNotes)
</script>

<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Notes</h1>

    <form @submit.prevent="addNote" class="mb-6 space-y-2">
      <input
          v-model="title"
          type="text"
          placeholder="Title"
          class="w-full border rounded px-3 py-2"
      />
      <textarea
          v-model="body"
          placeholder="Body (optional)"
          class="w-full border rounded px-3 py-2"
      ></textarea>
      <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Note
      </button>
    </form>

    <p v-if="error" class="text-red-600 mb-4">{{ error }}</p>
    <p v-if="loading" class="text-gray-500">Loading...</p>

    <ul class="space-y-2">
      <li
          v-for="note in notes"
          :key="note.id"
          class="border rounded px-3 py-2 flex justify-between items-start"
      >
        <div>
          <p class="font-semibold">{{ note.title }}</p>
          <p v-if="note.body" class="text-gray-600 text-sm">{{ note.body }}</p>
        </div>
        <button
            @click="deleteNote(note.id)"
            class="text-red-600 hover:text-red-800 text-sm ml-4"
        >
          Delete
        </button>
      </li>
    </ul>

    <p v-if="!loading && notes.length === 0" class="text-gray-500">No notes yet.</p>
  </div>
</template>