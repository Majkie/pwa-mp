<template>
  <div class="flex justify-start items-center">
    <div class="p-4">
      <input type="checkbox" @change="toggleTodo(todo)" :checked="todo.done">
    </div>
    <div @click="editing = true" class="p-4 flex-auto">{{ todo.text }}</div>
    <div class="p-4">
      <button class="flex items-center justify-center" @click="removeTodo(todo)">
        <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
    <todo-modal :show="editing" @close="cancelEdit">
      <template #title>
        Edit Todo
      </template>
      <template #content>
        <textarea v-model="text" class="w-full focus:outline-none" placeholder="Edit todo..."></textarea>
      </template>
      <template #footer>
        <button @click="cancelEdit"
          class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mr-3">
          Nevermind
        </button>
        <button @click="doneEdit"
          class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150">
          Save
        </button>
      </template>
    </todo-modal>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import TodoModal from "@/components/TodoModal";

export default {
  components: {TodoModal},
  props: ['todo'],
  data() {
    return {
      editing: false,
      text: this.todo.text,
    }
  },
  methods: {
    ...mapActions([
      'removeTodo',
      'editTodo',
      'toggleTodo'
    ]),
    cancelEdit() {
      this.editing = false;
    },
    doneEdit() {
      const value = this.text;

      const {todo} = this;

      if (!value) {
        this.removeTodo(todo)
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })

        this.editing = false;
      }
    }
  }
}
</script>
