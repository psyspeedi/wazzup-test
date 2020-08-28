<template>
  <div id="app">
    <Loader v-if="loading" />

    <Error v-else-if="error" @click="fetchUsers" />

    <div v-else-if="users.length === 0" class="show-users-container">
      <Button @click="fetchUsers">
        Show users
      </Button>
    </div>

    <div v-else class="container">

      <Table
        @rowClick="openModal"
        @search="filterUsers"
        @changePage="changePage"
        @sortBy="sortBy"
        :data="tableData"
        :titles="tableDataTitle"
        :activePage="activePage"
        :totalPages="tableData.length"
        :sortItem="sort.item"
        :directionArrow="directionArrow"
      />

      <Modal v-if="modalOpened" @close="closeModal">
        <template v-slot:name>
          {{ modalContent.fullname }}
        </template>

        <template v-slot:content>
          Address:
          {{ modalContent.address.zip }},
          {{ modalContent.address.state }},
          {{ modalContent.address.city }},
          {{ modalContent.address.streetAddress }}
        </template>
      </Modal>

    </div>
  </div>
</template>

<script>
  import Button from './components/Button'
  import Modal from './components/Modal'
  import Loader from './components/Loader'
  import Error from './components/Error'
  import Table from './components/Table/Table'
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'App',
    components: { Modal, Loader, Table, Button, Error },
    data: () => ({
      modalOpened: false
    }),
    computed: {
      ...mapState(['loading', 'users', 'error', 'activePage', 'sort']),
      ...mapGetters(['tableData', 'tableDataTitle', 'modalContent']),
      directionArrow() {
        return this.sort.direction === 'minMAX' ? 'up' : 'down'
      }
    },
    methods: {
      ...mapMutations(['setActiveUserId', 'setSearchValue', 'setActivePage']),
      ...mapActions(['fetchUsers', 'setSort']),

      closeModal() {
        this.setActiveUserId(null)
        this.modalOpened = false
      },
      openModal(row) {
        this.setActiveUserId(row._id)
        this.modalOpened = true
      },
      filterUsers(value) {
        this.setSearchValue(value)
        this.setActivePage(0)
      },
      changePage(page) {
        this.setActivePage(page)
      },
      sortBy(index) {
        this.setSort(index)
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  @import '~normalize-scss/sass/normalize/import-now';
  @import './assets/_variables.scss';

  #app {
    font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
    margin-top: 60px;
    box-sizing: border-box;
  }

  .show-users-container {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
