<template>
  <v-dialog v-model="dialog" max-width="500px" style="background-color: red">
    <v-btn fab dark bottom right fixed color="red" slot="activator">
      <v-icon dark>add</v-icon>
    </v-btn>
    <v-card color="cyan" dark id="lol">
      <v-card-title>
        <span class="headline">Create Post</span>
      </v-card-title>
      <v-card-text>
        <create-post-input @postChange="updatePost"></create-post-input>
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
import CreatePostInput from '@/components/CreatePostInput'

export default {
  data () {
    return {
      dialog: false,
      post: '',
      postData: {}
    }
  },
  methods: {
    updatePost (newText) {
      this.post = newText
      console.log(this.post)
    },
    // Get tags from post
    getTags () {
      return this.post.match(/(#)\w+/g)
    },
    // Get mentions from post and remove the @ symbol
    getMentions () {
      let mentions = this.post.match(/(@)\w+/g)
      if (mentions) {
        for (let i = 0; i < mentions.length; i++) {
          mentions[i] = mentions[i].slice(1)
        }
      }
      return mentions
    },
    async createPost () {
      try {
        const data = {
          username: this.$store.state.user.properties.username,
          content: this.post,
          tags: this.getTags(),
          mentions: this.getMentions()
        }

        console.log(data)

        // Create post
        const response = (await PostService.create(data)).data
        console.log(response)

        this.dialog = false
        this.$emit('isCreated')
      } catch (error) {
        this.$emit('isNotCreated')
      }
    }
  },
  computed: {
    members () {
      let members = []

      for (let i = 0; i < this.$store.state.following.length; i++) {
        let member = {username: ''}
        member.username = this.$store.state.following[i]
        members[i] = member
      }
      return members
    }
  },
  components: {
    CreatePostInput
  }
}
</script>

<style lang="scss" scoped>
</style>
