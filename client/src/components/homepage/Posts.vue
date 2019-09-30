<template>
<v-layout column>
  <v-flex xs12 v-for="post in posts" :key="post.timestamp">
    <circle-spinner v-if="loading"></circle-spinner>
    <v-card v-if="!loading">
      <post :post="post"></post>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import {Circle} from 'vue-loading-spinner'
import Post from '@/components/Post'
import PostService from '@/services/PostService'

export default {
  data () {
    return {
      posts: [],
      loading: true
    }
  },

  async created () {
    this.loadData()
  },

  methods: {
    async loadData () {
      try {
        this.posts = (await PostService.getPosts(this.$store.state.user.properties.username)).data
        this.loading = false
        console.log(this.posts)
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    }
  },

  components: {
    Post,
    CircleSpinner: Circle
  }
}
</script>

<style lang="scss" scoped>
</style>
