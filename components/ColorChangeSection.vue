<template>
  <div
    class="flex items-center justify-center w-full h-screen"
    :class="colorClass"
  >
    <div class="flex items-center bg-white border-2 border-black p-4">
      <div
        class="w-3 h-3"
        :style="{ backgroundColor: `rgb(${currentOption})` }"
      />
      <select v-model="currentOption" name="color" @change="changeColor">
        <option v-for="(option, key) in options" :key="key" :value="option">
          {{
            rgbToHex(
              ...option
                .replace(/ /g, '')
                .split(',')
                .map((val) => +val)
            )
          }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
function componentToHex(c) {
  const hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

export default {
  props: {
    cssVar: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    colorClass: {
      type: String,
      required: true,
    },
    default: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentOption: this.options[this.default],
    }
  },
  methods: {
    rgbToHex(r, g, b) {
      return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
    },
    changeColor() {
      document.documentElement.classList.add('theme-change')
      document.documentElement.style.setProperty(
        this.cssVar,
        this.currentOption
      )
      setTimeout(() => {
        document.documentElement.classList.remove('theme-change')
      }, 150)
    },
  },
}
</script>