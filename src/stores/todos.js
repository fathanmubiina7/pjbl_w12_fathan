import { defineStore } from 'pinia'

export const useTodos = defineStore('useTodos', {
  state: () => ({
    // 1. Cek apakah ada data tersimpan di LocalStorage? Jika ada, pakai itu.
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    nextId: parseInt(localStorage.getItem('nextId')) || 0,
  }),
  getters: {
    pendingTodos: (state) => {
      return state.todos.filter((todo) => !todo.isCompleted)
    },
    completedTodos: (state) => {
      return state.todos.filter((todo) => todo.isCompleted)
    },
    // Ini getter yang kamu tambahkan sebelumnya
    getTodoById: (state) => {
      return (id) => state.todos.find((todo) => todo.id == id)
    },
  },
  actions: {
    // Fungsi bantuan untuk menyimpan data ke browser
    saveToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
      localStorage.setItem('nextId', this.nextId)
    },

    storeTodo(payload) {
      this.todos.push({
        id: this.nextId++,
        text: payload.text,
        isCompleted: false,
      })
      this.saveToLocalStorage() // Simpan setiap kali tambah data
    },

    updateTodo(payload) {
      // Pastikan ID dianggap sama walaupun tipe datanya string/number
      const index = this.todos.findIndex((item) => item.id == payload.id)
      if (index !== -1) {
        this.todos[index] = {
          ...this.todos[index],
          text: payload.text,
          isCompleted: payload.isCompleted,
        }
        this.saveToLocalStorage() // Simpan setiap kali update data
      }
    },

    destroyTodo(id) {
      const index = this.todos.findIndex((item) => item.id == id)
      if (index !== -1) {
        this.todos.splice(index, 1)
        this.saveToLocalStorage() // Simpan setiap kali hapus data
      }
    },
  },
})
