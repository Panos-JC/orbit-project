<template>
  <v-container grid-list-md>
    <v-layout row>
      <v-flex xs3>
        <v-card dark color="primary">
          <v-card-text class="px-0">TODO: Follow Recomendations</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-layout wrap>
          <v-flex xs12 v-for="post in posts" :key="post.id">
            <v-card>
              <post :post="post"></post>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs3>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TagService from '@/services/TagService'
import Post from '@/components/Post'

export default {
  data () {
    return {
      posts: []
    }
  },

  async created () {
    this.posts = (await TagService.getTagged(this.$route.params.name)).data
  },
  components: {
    Post
  }
}
</script>

<style lang="scss" scoped>
</style>
