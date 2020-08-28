<template>
  <div class="error">
    <h3 class="title">Something went wrong :( </h3>
    <p class="again" @click="click">Try again.</p>
  </div>
</template>

<script>
  export default {
    name: 'Error',
    methods: {
      click() {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/_variables.scss';

  .error {
    position: absolute;
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .title {
      color: $textColor;
    }

    .again {
      color: $mainColor;
      cursor: pointer;

      &:hover {
        font-weight: 700;
      }
    }
  }

</style>