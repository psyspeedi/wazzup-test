<template>
  <div class="search">
    <div class="input">
      <input
        @keypress.enter="search"
        v-model="value"
        @focus="focus"
        @blur="blur"
        ref="input"
        type="text"
      />
      <span class="bar"></span>
      <label :class="{ active: active }">Search</label>
      <svg
        v-if="active"
        @click="cancel"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 511.995 511.995"
        style="enable-background:new 0 0 511.995 511.995;"
        xml:space="preserve"
      >
        <path
          d="M437.126,74.939c-99.826-99.826-262.307-99.826-362.133,0C26.637,123.314,0,187.617,0,256.005
			s26.637,132.691,74.993,181.047c49.923,49.923,115.495,74.874,181.066,74.874s131.144-24.951,181.066-74.874
			C536.951,337.226,536.951,174.784,437.126,74.939z M409.08,409.006c-84.375,84.375-221.667,84.375-306.042,0
			c-40.858-40.858-63.37-95.204-63.37-153.001s22.512-112.143,63.37-153.021c84.375-84.375,221.667-84.355,306.042,0
			C493.435,187.359,493.435,324.651,409.08,409.006z"
        />

        <path
          d="M341.525,310.827l-56.151-56.071l56.151-56.071c7.735-7.735,7.735-20.29,0.02-28.046
			c-7.755-7.775-20.31-7.755-28.065-0.02l-56.19,56.111l-56.19-56.111c-7.755-7.735-20.31-7.755-28.065,0.02
			c-7.735,7.755-7.735,20.31,0.02,28.046l56.151,56.071l-56.151,56.071c-7.755,7.735-7.755,20.29-0.02,28.046
			c3.868,3.887,8.965,5.811,14.043,5.811s10.155-1.944,14.023-5.792l56.19-56.111l56.19,56.111
			c3.868,3.868,8.945,5.792,14.023,5.792c5.078,0,10.175-1.944,14.043-5.811C349.28,331.117,349.28,318.562,341.525,310.827z"
        />
      </svg>
    </div>
    <Button :disabled="!value" @click="search">Search</Button>
  </div>
</template>

<script>
  import Button from '../Button'
  export default {
    name: 'tableSearch',
    components: { Button },
    data: () => ({
      active: false,
      value: ''
    }),
    methods: {
      focus() {
        this.active = true
      },
      blur() {
        if (!this.value) {
          this.active = false
        }
      },
      search() {
        this.$emit('search', this.value)
      },
      cancel() {
        this.active = false
        this.value = ''
        this.search()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/_variables.scss';

  .search {
    margin-bottom: 30px;
    display: flex;

    .input {
      position: relative;
      margin-right: 30px;

      svg {
        position: absolute;
        right: -20px;
        top: 10px;
        width: 20px;
        fill: $mainColor;
        cursor: pointer;
      }

      input {
        font-size: 16px;
        padding: 10px;
        display: block;
        width: 300px;
        border: none;
        border-bottom: 1px solid #ccc;
        color: $textColor;
        outline: none;
      }

      label {
        color: #999;
        font-size: 18px;
        position: absolute;
        pointer-events: none;
        left: 10px;
        top: 15px;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
      }

      .active {
        top: -15px;
        font-size: 14px;
        color: $mainColor;
      }

      .bar {
        position: relative;
        display: block;
        width: 320px;
      }
      .bar:before,
      .bar:after {
        content: '';
        height: 2px;
        width: 0;
        bottom: 0;
        position: absolute;
        background: $mainColor;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
      }
      .bar:before {
        left: 50%;
      }
      .bar:after {
        right: 50%;
      }

      input:focus ~ .bar:before,
      input:focus ~ .bar:after {
        width: 50%;
      }
    }
  }
</style>
