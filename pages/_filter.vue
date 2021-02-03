<template>
  <div class="container flex-auto mx-auto mt-5 px-4 sm:px-6 xl:px-8 pt-10 pb-16">
    <section v-show="!checkAuth" class="relative flex flex-col items-center w-full px-4 py-8 mx-auto text-center rounded-lg shadow-2xl lg:text-left lg:block bg-gradient-to-br from-purple-600 via-indigo-500 to-teal-400 sm:px-6 md:pb-0 md:pt-12 lg:px-12 lg:py-12">
        <h2
          class="my-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:my-0 xl:text-4xl sm:leading-tight">
          Want to use <span class="block text-indigo-200 xl:inline">todos everywhere?</span>
        </h2>
        <p class="mt-1 mb-10 text-sm font-medium text-indigo-200 uppercase xl:text-base xl:tracking-wider lg:mb-0">
          Sign up using your google account to share todos between devices!</p>
        <div class="flex mb-8 lg:mt-6 lg:mb-0">
          <div class="inline-flex">
            <button @click="login"
               class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-indigo-700 transition duration-150 ease-in-out bg-indigo-100 border border-transparent rounded-md hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline focus:border-indigo-300">
              Sign in
            </button>
          </div>
        </div>
        <div class="bottom-0 right-0 mb-0 mr-3 lg:absolute lg:-mb-12">
          <img src="https://cdn.devdojo.com/images/september2020/cta-1.png"
               class="max-w-xs mb-4 opacity-75 md:max-w-2xl lg:max-w-lg xl:mb-0 xl:max-w-md">
        </div>
    </section>
    <section
      class="flex flex-wrap justify-between md:flex-no-wrap items-center bg-gray-800 shadow-lg rounded-2xl py-6 md:py-4 px-6 md:pr-5 space-y-4 md:space-y-0 md:space-x-8 mt-5">
      <input @keypress.enter="addTodo" class="flex-auto rounded-lg outline-none py-3 px-4" placeholder="Your todo..." type="text" v-model="text"
             autofocus/>
      <button
        class="flex-none bg-white hover:bg-gray-100 transition-colors duration-200 text-gray-900 font-semibold rounded-lg py-3 px-4"
        @click="addTodo">Add todo
      </button>
    </section>
    <section class="relative mt-5">
      <div class="flex items-center justify-between p-4 bg-white rounded-t-2xl">
        <span>
          {{ filteredTodos.length }}/{{ todos.length }}
        </span>
        <nav class="inline-flex overflow-hidden">
          <button v-for="(val, key) in filters" :key="key"
                  :class="key === visibility ? 'border-blue-500' : 'border-gray-300'" @click="changeTab(key)"
                  class="mr-1 text-gray-600 sm:py-4 sm:px-6 py-1 px-2 hover:text-blue-500 focus:outline-none border-b-2 text-sm">
            {{ key.toUpperCase() }}
          </button>
        </nav>
      </div>
      <div class="bg-white rounded-b-2xl">
        <template v-for="todo in filteredTodos">
          <div class="flex w-full block border-t border-gray-300"></div>
          <todo-item :key="todo.uid" :todo="todo"/>
        </template>
      </div>
    </section>
    <section v-if="checkAuth" class="mt-5 flex flex-col space-y-2 justify-center items-center text-gray-500">
      <button @click="logout">Logout</button>
      <p>2020/2021 PWA MP Todo list</p>
    </section>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
import {mapActions} from "vuex";

const filters = {
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done),
  all: todos => todos
}

export default {
  components: {TodoItem},
  data() {
    return {
      text: '',
      filters: filters,
      visibility: this.filter = this.$route.params.filter ?? 'active',
    }
  },
  async mounted() {
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user)

        this.$store.state.todos.forEach(todo => {
          this.saveFirebaseTodos(todo)
        })

        this.$fire.database.ref('todos').child(this.$fire.auth.currentUser.uid).get().then((snapshot) => {
          snapshot.forEach((todo) => {
            this.fetchTodos(todo.val())
          })
        })
      }
    })
  },
  computed: {
    todos() {
      return this.$store.state.todos
    },
    allChecked() {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    checkAuth() {
      return this.$store.getters.isAuthenticated
    },
  },
  methods: {
    ...mapActions([
      'login',
      'logout',
      'setUser',
      'fetchTodos',
      'saveFirebaseTodos'
    ]),
    addTodo() {
      const text = this.text

      if (text) {
        this.$store.dispatch('addTodo', text);
      }

      this.text = ''
    },
    changeTab(tab) {
      this.$router.push(tab)
    },
  }
}
</script>
