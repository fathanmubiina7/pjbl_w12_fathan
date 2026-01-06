<template>
  <div>
    <p>ID dari URL: {{ $route.params.id }}</p>
    <p>Data ditemukan? {{ currentTodo ? 'YA' : 'TIDAK' }}</p>
    <hr />
    <h2>Edit Tugas</h2>

    <div v-if="currentTodo">
      <form @submit.prevent="handleUpdate">
        <div style="margin-bottom: 10px">
          <label>Nama Tugas: </label>
          <input
            v-model="form.text"
            type="text"
            placeholder="Edit nama tugas..."
            style="padding: 5px"
          />
        </div>

        <div style="margin-bottom: 20px">
          <label>Status: </label>
          <select v-model="form.isCompleted" style="padding: 5px">
            <option :value="false">Belum Selesai</option>
            <option :value="true">Selesai</option>
          </select>
        </div>

        <button type="submit" style="margin-right: 10px">Simpan Perubahan</button>
        <button type="button" @click="cancelEdit">Batal</button>
      </form>
    </div>

    <div v-else>
      <p>Tugas tidak ditemukan!</p>
      <button @click="cancelEdit">Kembali</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodos } from '../stores/todos' // Sesuaikan path jika perlu

const route = useRoute()
const router = useRouter()
const store = useTodos()

// 1. Ambil ID dari URL (Routing)
const todoId = route.params.id

// 2. Cari data todo berdasarkan ID (Pinia Getter)
// Kita gunakan computed agar reaktif, tapi untuk form kita butuh data yang bisa diedit
const currentTodo = computed(() => store.getTodoById(todoId))

// 3. Siapkan state lokal untuk form
const form = reactive({
  text: '',
  isCompleted: false,
})

// 4. Isi form saat halaman dibuka
onMounted(() => {
  if (currentTodo.value) {
    form.text = currentTodo.value.text
    form.isCompleted = currentTodo.value.isCompleted
  }
})

// 5. Fungsi Simpan (Pinia Action)
const handleUpdate = () => {
  store.updateTodo({
    id: todoId,
    text: form.text,
    isCompleted: form.isCompleted,
  })

  // Kembali ke halaman utama setelah simpan
  router.push('/')
}

const cancelEdit = () => {
  router.push('/')
}
</script>

<style scoped>
/* Styling sederhana agar rapi */
button {
  cursor: pointer;
  padding: 5px 10px;
}
</style>
