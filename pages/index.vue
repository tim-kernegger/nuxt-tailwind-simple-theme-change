<template>
  <div>
    <ColorChangeSection
      v-for="(section, key) in sections"
      :key="key"
      v-bind="section"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      sections: [
        {
          cssVar: '--color-primary',
          options: ['147, 3, 46', '198, 159, 137'],
          colorClass: 'bg-primary',
        },
        {
          cssVar: '--color-secondary',
          options: ['166, 161, 94', '3, 76, 60'],
          colorClass: 'bg-secondary',
        },
      ],
    }
  },
}
</script>
