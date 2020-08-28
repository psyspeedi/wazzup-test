<template>
  <div class="container">
    <table-search @search="search" />

    <table v-if="data.length" class="content-table">
      <thead>
        <tr>
          <th :class="{ active: index === sortItem }" v-for="(title, index) in titles" :key="index">
            <span @click="sort(index)">
              {{ title }}
            </span>
            <svg
              class="table-arrow"
              :class="directionArrow === 'up' ? 'up' : null"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style="enable-background:new 0 0 512 512;"
              xml:space="preserve"
            >
              <path
                d="M441.156,322.876l-48.666-47.386c-3.319-3.243-8.619-3.234-11.93,0.017l-81.894,80.299V8.533
			c0-4.71-3.823-8.533-8.533-8.533h-68.267c-4.71,0-8.533,3.823-8.533,8.533v347.273l-81.894-80.299
			c-3.311-3.243-8.602-3.251-11.921-0.017l-48.666,47.386c-1.655,1.604-2.586,3.806-2.586,6.11c0,2.304,0.939,4.506,2.586,6.11
			l179.2,174.481c1.655,1.613,3.806,2.423,5.948,2.423c2.15,0,4.292-0.811,5.956-2.423l179.2-174.481
			c1.647-1.604,2.577-3.806,2.577-6.11C443.733,326.682,442.803,324.48,441.156,322.876z"
              />
            </svg>
          </th>
        </tr>
      </thead>

      <tbody>
        <table-row
          @click="rowClick(row)"
          v-for="(row, index) in data[activePage]"
          :key="index"
          :row="row"
        />
      </tbody>
    </table>

    <table-pagination
      v-if="data.length"
      @click="changePage"
      :totalPages="totalPages"
      :activePage="activePage"
    />

    <h3 v-if="!data.length">Nothing found</h3>
  </div>
</template>

<script>
  import tableRow from './tableRow'
  import tableSearch from './tableSearch'
  import tablePagination from './tablePagination'
  export default {
    name: 'Table',
    components: { tableRow, tableSearch, tablePagination },
    props: {
      data: {
        type: Array,
        required: true
      },
      titles: {
        type: Array,
        required: true
      },
      activePage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      },
      sortItem: {
        type: Number
      },
      directionArrow: {
        type: String,
        default: 'down'
      }
    },
    methods: {
      rowClick(row) {
        this.$emit('rowClick', row)
      },
      search(value) {
        this.$emit('search', value)
      },
      changePage(page) {
        this.$emit('changePage', page)
      },
      sort(index) {
        this.$emit('sortBy', index)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/_variables.scss';

  .content-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    min-width: 900px;
  }

  .content-table thead tr {
    background-color: $mainColor;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  .content-table th {
    padding: 12px 15px;

    span {
      cursor: pointer;
      max-width: max-content;

      &:hover + .table-arrow {
        opacity: 0.5;
      }
    }
  }

  .content-table th.active .table-arrow {
    opacity: 1;
  }

  .table-arrow {
    fill: #fff;
    width: 9px;
    opacity: 0;
    text-align: right;
    transition: 0.15s;
  }

  .table-arrow.up {
    transform: rotate(180deg);
  }
</style>
