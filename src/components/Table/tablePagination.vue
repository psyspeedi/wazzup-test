<template>
  <nav>
    <ul class="pagination custom-icons">
      <li @click="click(activePage - 1)" class="button" :class="{ disabled: activePage === 0 }"><a>Prev</a></li>
      <li @click="click(0)" v-show="activePage >= 3"><a>1</a></li>
      <li @click="click(middleStart)" v-show="activePage > 3"><span>...</span></li>

      <li v-show="page >= 0 && page < totalPages" v-for="page in showPages" :key="page" @click="click(page)">
        <a :class="{ current: activePage === page }">{{ page + 1 }}</a>
      </li>

      <li @click="click(middleEnd)" v-show="activePage < totalPages - 4"><span>...</span></li>
      <li v-show="activePage < totalPages - 3" @click="click(totalPages - 1)">
        <a>{{ totalPages }}</a>
      </li>
      <li @click="click(activePage + 1)" class="button" :class="{ disabled: activePage + 1 === totalPages }"><a>Next</a></li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'tablePagination',
    props: {
      activePage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    },
    computed: {
      showPages() {
        if (this.activePage < 3) {
          return [
            this.activePage - 2,
            this.activePage - 1,
            this.activePage,
            this.activePage + 1,
            this.activePage + 2
          ]
        }

        if (this.activePage >= 3) {
          return [
            this.activePage - 2,
            this.activePage - 1,
            this.activePage,
            this.activePage + 1,
            this.activePage + 2
          ]
        }
        return this.activePage
      },
      middleStart() {
        return Math.trunc(this.activePage / 2)
      },
      middleEnd() {
        return Math.trunc((this.totalPages - this.activePage) / 2 + this.activePage)
      }
    },
    methods: {
      click(page) {
        this.$emit('click', page)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/_variables.scss';

  .pagination {
    max-width: 768px;
    margin: 2em auto 4em;
    text-align: center;
  }

  .pagination li {
    display: inline-block;
    margin: 0 0.2em;
    cursor: pointer;
  }

  .pagination li.button {
    display: inline-block;
  }

  .pagination a,
  .pagination span {
    display: inline-block;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 0.6em 0.8em;
  }

  .pagination a {
    border: 1px solid #e6e6e6;
    border-radius: 0.25em;
    color: $textColor;
    text-decoration: none;
  }

  .no-touch .pagination a:hover {
    background-color: #f2f2f2;
  }

  .pagination a:active {
    -webkit-transform: scale(0.9);
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -o-transform: scale(0.9);
    transform: scale(0.9);
  }

  .pagination .disabled {
    color: rgba(46, 64, 87, 0.4);
    pointer-events: none;
    opacity: 0.4;
  }

  .pagination .current {
    background-color: $mainColor;
    border-color: $mainColor;
    color: #ffffff;
    pointer-events: none;
  }

  .pagination.custom-icons .button a {
    position: relative;
  }
  .pagination.custom-icons .button:first-of-type a {
    padding-left: 2.4em;
  }
  .pagination.custom-icons .button:last-of-type a {
    padding-right: 2.4em;
  }
  .pagination.custom-icons .button:first-of-type a::before,
  .pagination.custom-icons .button:last-of-type a::after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 16px;
    height: 16px;
    top: 50%;
    margin-top: -8px;
    background: transparent
      url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='16px' height='16px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' xml:space='preserve'%3E%3Cline fill='none' stroke='%23009879' stroke-miterlimit='10' x1='2' y1='8' x2='15' y2='8'/%3E%3Cpolyline fill='none' stroke='%23009879' stroke-miterlimit='10' points='7,3 2,8 7,13 '/%3E%3C/svg%3E")
      no-repeat center center;
  }
  .pagination.custom-icons .button:first-of-type a::before {
    left: 0.8em;
  }
  .pagination.custom-icons .button:last-of-type a::after {
    right: 0.8em;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .pagination.custom-buttons a,
  .pagination.custom-buttons span {
    vertical-align: middle;
  }

  .pagination.custom-buttons .button:last-of-type a {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .no-touch .pagination.custom-buttons .button:last-of-type a:active {
    -webkit-transform: scale(0.9) rotate(180deg);
    -moz-transform: scale(0.9) rotate(180deg);
    -ms-transform: scale(0.9) rotate(180deg);
    -o-transform: scale(0.9) rotate(180deg);
    transform: scale(0.9) rotate(180deg);
  }

  .pagination.no-space.custom-buttons .button:last-of-type a {
    border-radius: 0.25em 0 0 0.25em;
  }
</style>
