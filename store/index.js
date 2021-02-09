const STORAGE_KEY = 'mp-todolist'

export const strict = false

export const state = () => ({
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
  user: null
})

export const mutations = {
  addTodo(state, todo) {
    state.todos.push(todo)
  },
  removeTodo(state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  editTodo(state, {todo, text = todo.text, done = todo.done}) {
    todo.text = text
    todo.done = done
  },
  addFirebaseTodo(state, todo) {
    this.$fire.database.ref('todos').child(this.$fire.auth.currentUser.uid).child(todo.uid).set(todo)
  },
  editFirebaseTodo(state, {todo, text = todo.text, done = todo.done}) {
    this.$fire.database.ref('todos').child(this.$fire.auth.currentUser.uid).child(todo.uid).update({
      text: text,
      done: done
    })
  },
  removeFirebaseTodo(state, todo) {
    this.$fire.database.ref('todos').child(this.$fire.auth.currentUser.uid).child(todo.uid).remove()
  },
  setUser(state, payload) {
    state.user = payload
  },
}

export const actions = {
  addTodo({commit}, text) {

    let uid = Date.now()

    commit('addTodo', {
      uid: uid,
      text,
      done: false
    })

    if (this.getters.isAuthenticated) {
      commit('addFirebaseTodo', {
        uid: uid,
        text: text,
        done: false
      })
    }
  },
  removeTodo({commit}, todo) {
    commit('removeTodo', todo)

    if (this.getters.isAuthenticated) {
      commit('removeFirebaseTodo', todo)
    }
  },
  toggleTodo({commit}, todo) {
    commit('editTodo', {todo, done: !todo.done})

    if (this.getters.isAuthenticated) {
      commit('editFirebaseTodo', {todo, done: !todo.done})
    }
  },
  editTodo({commit}, {todo, value}) {
    commit('editTodo', {todo, text: value})

    if (this.getters.isAuthenticated) {
      commit('editFirebaseTodo', {todo, text: value})
    }
  },
  clearCompleted({state, commit}) {
    state.todos.filter(todo => todo.done)
      .forEach(todo => {
        commit('removeTodo', todo)

        if (this.getters.isAuthenticated) {
          commit('removeFirebaseTodo', todo)
        }
      })
  },
  setUser({commit}, payload) {
    commit('setUser', payload)
  },
  fetchTodos({state, commit}, todo) {
    if (!state.todos.some(object => object.uid === todo.uid)) {
      commit('addTodo', todo)
    }
  },
  saveFirebaseTodos({state, commit}, todo) {
    this.$fire.database.ref('todos').child(state.user.uid).once('value').then(snapshot => {
      if (!snapshot.child(todo.uid).exists()) {
        commit('addFirebaseTodo', todo)
      }
    })
  },
  login() {
    return new Promise((resolve, reject) => {
      let provider = new this.$fireModule.default.auth.GoogleAuthProvider();

      this.$fire.auth.signInWithPopup(provider).then(() => resolve())
    })
  },
  logout({commit}) {
    return new Promise((resolve, reject) => {
      this.$fire.auth.signOut().then(() => {
        commit('setUser', null)
        resolve()
      })
    })
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  }
}

export const plugins = [store => {
  store.subscribe((mutation, {todos}) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  })
}]
