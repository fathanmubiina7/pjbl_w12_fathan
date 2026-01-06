import { createRouter, createWebHistory } from 'vue-router'

import Todo from '@/views/Todo.vue'
import Completed from '@/views/Completed.vue'
import EditTodo from '@/views/EditTodo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Todo },
    { path: '/completed', component: Completed },
    {
      path: '/todo/:id',
      name: 'edit-todo',
      component: EditTodo,
    },
  ],
})

export default router
