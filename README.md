# Nuxt + Tailwind - multiple themes change

## Changing Tailwind class colors with css variables

Simply using the color hex code will not work for this because `bg-opacity-*` and `text-opacity-*` will not work anymore. Tailwind also mentions this problem on this page https://tailwindcss.com/docs/customizing-colors as well as a [solution](https://github.com/adamwathan/tailwind-css-variable-text-opacity-demo) for it ❤️.

### `css variables`

For a clear structure I defined the default values of my css-variables in the `~/assets/styles/css/variables.css` file.

```css
/* ~/assets/styles/css/variables.css */
:root {
  --color-primary: 147, 3, 46;
  --color-secondary: 166, 161, 94;
}
```

### `css color transition`

I imported the variables.css file into the `~/assets/styles/css/main.css` file and also created a class for the color transitions so that they look more smoother.

```css
/* ~/assets/styles/css/main.css */
@import url("./variables.css");

.theme-change * {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
```

After completing the styles I told Nuxt to load the main.css in the `nuxt.config.js` file. 

```js
/* nuxt.config.js */
export default {
  ...
  css: [
    "~/assets/styles/css/main.css"
  ],
  ...
}
```

### `tailwind.config.js modification`

Writing a small function for creating the colors so we don't have to repeat the same code over and over again.


```js
/* tailwind.config.js */

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
  ...
  theme: {
    extend: {
      colors: {
        primary: ({ opacityVariable, opacityValue }) => colorCreator({ opacityVariable, opacityValue, cssVar: '--color-primary' }),
        secondary: ({ opacityVariable, opacityValue }) => colorCreator({ opacityVariable, opacityValue, cssVar: '--color-secondary' })
      }
    },
  },
  ...
}
```

### `trigger theme change`

Now we can change the color by just changing the variable. (`~/pages/index.vue` and `~/components/ColorChangeSection.vue` contain an example for the theme change)

```js
export default {
  methods: {
    changeColor() {
      document.documentElement.classList.add('theme-change')
      document.documentElement.style.setProperty(
        '--color-primary',
        '1, 101, 201'
      )
      setTimeout(() => {
        document.documentElement.classList.remove('theme-change')
      }, 150)
    },
  }
}
```
