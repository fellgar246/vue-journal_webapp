<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  
  </div>
</template>

<script>

export default{
  methods: {
    goToDaybook() {
      this.$router.push({ name: 'no-entry' })
    }
  },
}
</script>
