import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const usersUrl =
  'http://www.filltext.com/?rows=1000&id=%7Bindex%7D&fullname=%7BfirstName%7D~%7BlastName%7D&company=%7Bbusiness%7D&email=%7Bemail%7D&uname=%7Busername%7D&address=%7BaddressObject%7D'

// вспомогательные методы //

const filterSearch = (array, value) => {
  return array.filter(user =>
    Object.values(user).some(item => item.toLowerCase().includes(value.toLowerCase()))
  )
}

const splitArray = (array, size) => {
  const result = []
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    result[i] = array.slice(i * size, i * size + size)
  }
  return result
}

const sortData = (data, property, direction) => {
  if (direction === 'minMAX') {
    return data.sort((a, b) => a[property].localeCompare(b[property]))
  }

  if (direction === 'MAXmin') {
    return data.sort((a, b) => b[property].localeCompare(a[property]))
  }
}

// ------ //

export default new Vuex.Store({
  state: {
    users: [],
    activeUserId: null,
    searchValue: '',
    loading: false,
    error: false,
    perPage: 10,
    activePage: 0,
    sort: {
      direction: 'minMAX',
      item: null
    }
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setActiveUserId(state, id) {
      state.activeUserId = id
    },
    setSearchValue(state, value) {
      state.searchValue = value
    },
    setError(state, err) {
      state.error = err
    },
    setActivePage(state, page) {
      state.activePage = page
    },
    setSortDirection(state, direction) {
      state.sort.direction = direction
    },
    setSortItem(state, item) {
      state.sort.item = item
    }
  },
  getters: {
    tableData(state) {
      let result = state.users.map(user => {
        const obj = {
          fullname: user.fullname,
          uname: user.uname,
          company: user.company,
          email: user.email,
          state: user.address.state,
          _id: user.id
        }

        Object.defineProperty(obj, '_id', {
          enumerable: false
        })

        return obj
      })

      if (state.sort.item !== null) {
        let property
        switch (state.sort.item) {
          case 0:
            property = 'fullname'
            break
          case 1:
            property = 'uname'
            break
          case 2:
            property = 'company'
            break
          case 3:
            property = 'email'
            break
          case 4:
            property = 'state'
            break
        }
        result = sortData(result, property, state.sort.direction)
      }

      if (state.searchValue !== '') {
        result = filterSearch(result, state.searchValue)
      }

      if (state.perPage) {
        result = splitArray(result, state.perPage)
      }

      return result
    },
    tableDataTitle() {
      return ['Full name', 'Nick', 'Company', 'Email', 'State']
    },
    modalContent(state) {
      return state.users.filter(user => user.id === +state.activeUserId)[0]
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      commit('setLoading', true)
      commit('setError', false)
      try {
        const response = await fetch(usersUrl)
        const users = await response.json()
        commit('setUsers', users)
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', true)
        throw new Error(e)
      }
    },
    setSort({ commit, state }, item) {
      if (state.sort.item === item) {
        let direction = this.state.sort.direction === 'minMAX' ? 'MAXmin' : 'minMAX'
        commit('setSortDirection', direction)
      }
      commit('setSortItem', item)
    }
  }
})
