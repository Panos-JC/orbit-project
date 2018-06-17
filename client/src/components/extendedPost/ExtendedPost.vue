<template>
<div>
  <v-toolbar dark color="primary" flat extended>
  </v-toolbar>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card class="card--flex-toolbar" width="640px">
          <post-info :postData="postData" v-if="dataLoaded"></post-info>
          <input-box :poster="postData.poster" @reply="reply"></input-box>
          <v-layout wrap>
            <v-flex xs12>
              <ol class="comments">
                <li class="comment" v-for="reply in replies" :key="reply.id">
                  <post :postData="reply"></post>
                </li>
              </ol>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-snackbar
    bottom
    left
    :timeout=2000
    color="success"
    v-model="successSnackbar"
  >
    {{ message }}
    <v-btn flat @click.native="successSnackbar = false">Close</v-btn>
  </v-snackbar>
  <v-snackbar
    bottom
    left
    :timeout=2000
    color="error"
    v-model="errorSnackbar"
  >
    {{ message }}
    <v-btn flat @click.native="errorSnackbar = false">Close</v-btn>
  </v-snackbar>
</div>
</template>

<script>
import PostInfo from '@/components/extendedPost/PostInfo'
import InputBox from '@/components/extendedPost/InputBox'
import Post from '@/components/Post'
import PostService from '@/services/PostService'

export default {
  data () {
    return {
      postData: {},
      replies: [],
      dataLoaded: false,
      successSnackbar: false,
      errorSnackbar: false,
      message: ''
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      this.postData = (await PostService.getPost(this.$route.params.id)).data
      this.replies = (await PostService.getReplies(this.$route.params.id)).data

      this.dataLoaded = true
    },
    async reply (value) {
      try {
        const data = {
          username: this.$store.state.user.properties.username,
          postId: this.postData.post.id,
          reply: value.content
        }

        const response = (await PostService.createReply(data)).data
        console.log(response)
        // -->Create reply
        this.replies.push(value)
        this.successSnackbar = true
        this.message = 'Posted Reply'
      } catch (error) {
        this.errorSnackbar = true
        this.message = 'Something went wrong'
      }
    }
  },
  components: {
    PostInfo,
    InputBox,
    Post
  }
}
</script>

<style lang="scss" scoped>
.card--flex-toolbar {
  margin: -75px auto 0 auto
}

// Comments
.comments {
  position: relative;
  margin-left: 0;
  list-style: none;
  .comment {
    border-bottom: 1px solid #e6ecf0;
  }
}
</style>
