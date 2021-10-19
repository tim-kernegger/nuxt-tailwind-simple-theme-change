function colorCreator({ opacityVariable, opacityValue, cssVar}) {
  if (opacityValue !== undefined) {
    return `rgba(var(${cssVar}), ${opacityValue})`
  }
  if (opacityVariable !== undefined) {
    return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`
  }
  return `rgb(var(${cssVar}))`
}

module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: ({ opacityVariable, opacityValue }) => colorCreator({ opacityVariable, opacityValue, cssVar: '--color-primary' }),
        secondary: ({ opacityVariable, opacityValue }) => colorCreator({ opacityVariable, opacityValue, cssVar: '--color-secondary' })
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
