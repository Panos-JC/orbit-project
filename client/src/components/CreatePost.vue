<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn fab dark bottom right fixed color="red" slot="activator">
      <v-icon dark>add</v-icon>
    </v-btn>
    <v-card color="cyan" dark>
      <v-card-title>
        <span class="headline">Create Post</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          :rules="[(v) => v.length <= 140 || 'Max 140 characters']"
          :counter = "140"
          v-model="post"
          class="text"
          name="input-1"
          label="What's happening?"
          multi-line
          no-resize
          solo
          flat
          light
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat round @click.native="dialog = false">Cancel</v-btn>
        <v-btn color="primary" depressed round dark @click="createPost">Post</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import PostService from '@/services/PostService'

export default {
  data () {
    return {
      dialog: false,
      post: '',
      postData: {}
    }
  },
  methods: {
    async createPost () {
      const data = {
        username: this.$store.state.user.properties.username,
        content: this.post
      }

      try {
        // Create post
        const response = (await PostService.create(data)).data

        this.dialog = false
        this.$emit('isCreated')
      } catch (error) {
        this.$emit('isNotCreated')
      }
    },
    createPostData () {
      this.postData = {
        tags: [],
        mentions: []
      }

      const mentions = this.post.match(/@\w*/g)
      const tags = this.post.match(/#\w*/g)

      if (mentions) {
        for (let i = 0; i < mentions.length; i++) {
          this.postData.mentions[i] = {value: mentions[i], href: '/' + mentions[i].substr(1)}
        }
      }

      if (tags) {
        for (let i = 0; i < tags.length; i++) {
          this.postData.tags[i] = {value: tags[i], href: '/' + tags[i].substr(1)}
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
