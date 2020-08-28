<template>
  <div @keyup.esc="close" @click.self="close" class="modal-container">
    <div class="modal">
      <div class="header">
        <h3 class="name">
          <slot name="name"></slot>
        </h3>
        <div @click="close" class="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            width="18px"
            height="18px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </div>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close')
      },
      closeEscape($event) {
        if ($event.key === 'Escape') {
          this.$emit('close')
        }
      }
    },
    mounted() {
      addEventListener('keyup', this.closeEscape)
    },
    beforeDestroy() {
      removeEventListener('keyup', this.closeEscape)
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/_variables.scss';

  .modal-container {
    position: fixed;
    z-index: 10;
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    background: #fff;
    margin-bottom: 200px;
    border-radius: 0.3rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    padding: 10px 25px 20px 25px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .close {
    cursor: pointer;
    svg {
      transition: 0.15s;
    }

    &:hover svg {
      fill: $mainColor;
    }
  }
</style>
