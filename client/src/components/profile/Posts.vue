<template>
<div>
  <v-flex xs9 v-for="post in posts" :key="post.timestamp">
    <v-card>
      <post :post="post"></post>
    </v-card>
  </v-flex>
</div>
</template>

<script>
import UsersService from '@/services/UsersService'
import Post from '@/components/Post'

export default {
  data () {
    return {
      posts: []
    }
  },
  async created () {
    const username = this.$store.state.route.params.username
    this.posts = (await UsersService.getProfilePosts(username)).data
    console.log(this.posts)
  },
  components: {
    Post
  }
}
</script>

<style lang="scss" scoped>
</style>
