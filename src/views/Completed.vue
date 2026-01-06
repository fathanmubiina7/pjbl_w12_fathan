<template>
  <div class="completed-container">
    <h3>Completed ✅</h3>

    <div v-if="completedTodos.length > 0">
      <ul>
        <li
          v-for="completedTodo in completedTodos"
          :key="completedTodo.id"
          style="margin-bottom: 10px"
        >
          <span style="margin-right: 10px">{{ completedTodo.text }}</span>

          <button @click="deleteTask(completedTodo.id)" style="color: red">Remove</button>
        </li>
      </ul>
    </div>

    <p v-else>Belum ada tugas yang selesai.</p>
  </div>
</template>

<script setup>
import { useTodos } from '../stores/todos'
import { storeToRefs } from 'pinia'

// 1. Panggil Store
const store = useTodos()

// 2. Ambil data completedTodos agar reaktif
const { completedTodos } = storeToRefs(store)

// 3. Fungsi untuk menghapus
const deleteTask = (id) => {
  // Memanggil action destroyTodo yang sudah ada di store
  store.destroyTodo(id)
}
</script>

<style scoped>
button {
  cursor: pointer;
  border: 1px solid red;
  background-color: white;
  padding: 2px 8px;
  border-radius: 4px;
}
button:hover {
  background-color: red;
  color: white;
}
</style>
