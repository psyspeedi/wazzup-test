<template>
  <tr @click="click">
    <td v-for="(row, index) in data" :key="index">{{ row }}</td>
  </tr>
</template>

<script>
  export default {
    name: 'Row',
    props: {
      row: {
        type: Object
      }
    },
    computed: {
      data() {
        return Object.values(this.row)
      }
    },
    methods: {
      click() {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/_variables.scss';

  tr {
    cursor: pointer;
    text-align: left;
    display: table-row;
    border-bottom: 1px solid #dddddd;
    color: $textColor;

    &:hover {
      color: $mainColor;
    }

    &:nth-of-type(even) {
      background-color: #f3f3f3;
    }

    &:nth-of-type(even) {
      background-color: #f3f3f3;
    }

    &:last-of-type {
      border-bottom: 2px solid $mainColor;
    }

    td {
      padding: 12px 15px;
    }
  }
</style>
