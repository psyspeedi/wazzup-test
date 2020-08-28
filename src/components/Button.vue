<template>
  <button @click="click" :disabled="disabled" class="button">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      click() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/_variables.scss';

  .button {
    background: #eee;
    color: $mainColor;
    text-decoration: none;
    outline: none;
    border: none;
    display: block;
    cursor: pointer;
    text-align: center;
    padding: 10px 10px;
    transition: all 0.3s;

    &:disabled {
      pointer-events: none;
      filter: opacity(40%);
    }

    &:hover {
      box-shadow: 0px -5px 0 $mainColor inset;
    }
  }
</style>