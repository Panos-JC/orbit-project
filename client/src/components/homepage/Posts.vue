<template>
<v-layout column>
  <v-flex xs12 v-for="n in 5" :key="n">
    <post></post>
  </v-flex>
</v-layout>
</template>

<script>
import Post from '@/components/Post'

export default {
  components: {
    Post
  }
}
</script>

<style lang="scss" scoped>
</style>
