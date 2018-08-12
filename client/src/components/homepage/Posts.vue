<template>
<v-layout column>
  <v-flex xs12 v-for="post in posts" :key="post.timestamp">
    <v-card>
      <post :post="post"></post>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import Post from '@/components/Post'
import PostService from '@/services/PostService'

export default {
  data () {
    return {
      posts: []
    }
  },
  async created () {
    this.posts = (await PostService.getPosts(this.$store.state.user.properties.username)).data
  },
  components: {
    Post
  }
}
</script>

<style lang="scss" scoped>
</style>
