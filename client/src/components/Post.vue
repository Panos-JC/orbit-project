<template>
  <v-container class="pb-1">
    <v-layout wrap>
      <v-flex xs12 v-if="post.reposter || post.reposted">
        <div class="postContext">
          <span class="repostIcon">
            <v-icon>repeat</v-icon>
          </span>
          <span class="repostText">
            <a v-if="post.reposter" :href="'#/users/' + post.reposter + '/posts'">{{post.reposter}}</a>
            <a v-else :href="'#/users/' + $store.state.user.properties.username + '/posts'">You</a>
            Reposted
          </span>
        </div>
      </v-flex>
      <v-flex xs1>
        <a :href="'#/users/' + post.username">
          <v-avatar>
            <img :src="'https://api.adorable.io/avatars/285/' + post.username + '.png'" alt="avatar">
          </v-avatar>
        </a>
      </v-flex>
      <v-flex xs11 class="pb-0">
        <div class="post-header ml-3">
          <a :href="'#/users/' + post.username" class="post-header-link text-xs-left">
            <span class="fullNameGroup text-xs-left">
            <strong class="fullName text-xs-left">
              {{fullName}}
            </strong>
            </span>
            <span class="username">@{{post.username}}</span>
          </a>
        </div>
        <div class="replyContext text-xs-left" v-if="post.reply">
          Replying to <a :href="'#/users/' + post.reply">@{{post.reply}}'s</a> post
        </div>
        <div class="post-container ml-3">
          <p class="postText text-xs-left mb-1">
            <post-content :paragraph="post.content"></post-content>
          </p>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon :to="'/post/' + post.id">
            <v-icon>reply</v-icon>
          </v-btn>
          <button v-if="!post.liked" class="postActionButton" @click="like">
            <div class="iconContainer">
              <v-icon>favorite_border</v-icon>
            </div>
            <span class="actionCount">{{post.likes}}</span>
          </button>
          <button v-if="post.liked" class="postActionButton postActionButton-active" @click="unlike">
            <div class="iconContainer">
              <v-icon>favorite</v-icon>
            </div>
            <span class="actionCount">{{post.likes}}</span>
          </button>

          <button v-if="!post.reposted" class="postActionButton" @click="repost">
            <div class="iconContainer iconRepost">
              <v-icon>repeat</v-icon>
            </div>
            <span class="actionCount actionCount-repost">{{post.reposts}}</span>
          </button>
          <button v-if="post.reposted" class="postActionButton postActionButton-active-repost" @click="removeRepost">
            <div class="iconContainer iconRepost">
              <v-icon>repeat</v-icon>
            </div>
            <span class="actionCount actionCount-repost">{{post.reposts}}</span>
          </button>
        </v-card-actions>
      </v-flex>
    </v-layout>
    <v-snackbar
      bottom
      left
      :timeout=2000
      color="error"
      v-model="errorSnackbar"
    >
      Something went wrong
      <v-btn flat @click.native="errorSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import PostService from '@/services/PostService'
import PostContent from '@/components/PostContent'

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      errorSnackbar: false
    }
  },
  computed: {
    fullName () {
      return this.post.fname + ' ' + this.post.lname
    }
  },
  methods: {
    async like () {
      try {
        const data = {
          username: this.$store.state.user.properties.username,
          postId: this.post.id
        }

        // like post
        const response = (await PostService.like(data))
        console.log(response)

        // update UI
        this.post.liked = true
        this.post.likes++
      } catch (error) {
        this.errorSnackbar = true
      }
    },
    async unlike () {
      try {
        const data = {
          username: this.$store.state.user.properties.username,
          postId: this.post.id
        }

        // unlike post
        const response = (await PostService.unlike(data))
        console.log(response)

        // update UI
        this.post.liked = false
        this.post.likes--
      } catch (error) {
        this.errorSnackbar = true
      }
    },
    async repost () {
      try {
        const data = {
          username: this.$store.state.user.properties.username,
          postId: this.post.id
        }

        // repost
        const response = (await PostService.repost(data))
        console.log(response)

        // update UI
        this.post.reposted = true
        this.post.reposts++
      } catch (error) {
        this.errorSnackbar = true
      }
    },
    async removeRepost () {
      try {
        const data = {
          username: this.$store.state.user.properties.username,
          postId: this.post.id
        }

        // delete repost
        const response = (await PostService.removeRepost(data))
        console.log(response)

        this.post.reposted = false
        this.post.reposts--
      } catch (error) {
        this.errorSnackbar = true
      }
    }
  },
  components: {
    PostContent
  }
}
</script>

<style lang="scss" scoped>
.post-header-link {
  display: block;
  text-decoration: none;
}

.post-header:hover .fullName{
  text-decoration: underline;
  color: #3f51b5
}

.replyContext {
  color: #657786;
  font-size: 14px;
  line-height: 20px;
  margin-left: 16px;
  padding-top: 4px;
  padding-bottom: 4px;
  a {
    color: #1c94e0;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

.fullNameGroup {
  max-width: 100%;
  .fullName {
    word-break: break-all;
    color: #14171a;
    font-size: 14px;
    font-weight: bold;
    max-width: 100%;
    overflow: hidden!important;
    white-space: nowrap!important;
    word-wrap: normal!important;

    &:hover {
      text-decoration: underline;
      color: #3f51b5
    }
  }
}

.username {
  margin-left: 5px;
  font-size: 14px;
  color: #657789;
  text-align: left;
  max-width: 100%;
  overflow: hidden!important;
  text-overflow: ellipsis!important;
  white-space: nowrap!important;
  word-wrap: normal!important;
}

.postActionButton {
  display: inline-block;
  font-size: 16px;
  line-height: 1;
  padding: 0 2px;
  position: relative;
  &:hover .iconContainer i, &:hover .actionCount {
    color: #e0245e;
  }
  &:hover .iconRepost i, &:hover .actionCount-repost {
    color: #17bf63;
  }
  .iconContainer {
    color: #657786;
    display: inline-block;
    line-height: 0;
    position: relative;
    vertical-align: middle;
    width: 30px;
    transition: color 0s;
  }
  .actionCount {
    color: #657786;
    display: inline-block;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    position: relative;
    vertical-align: text-bottom;
    transition: color 0s;
  }
}

.postActionButton-active {
  .iconContainer i{
    color: #e0245e;
  }
  .actionCount {
    color: #e0245e;
  }
}

.postActionButton-active-repost {
  .iconContainer i{
    color: #17bf63;
  }
  .actionCount {
    color: #17bf63;
  }
}

*:focus {
  outline: none;
}

.postContext {
  margin-top: -5px;
  display: flex;
  .repostIcon {
    color: #657786;
    font-size: 14px;
    position: relative;
    top: -2px;
  }
  .repostText {
    font-size: 12px;
    color: #657786;
    margin-left: 7px;
    a {
      color: #657786;
      text-decoration: none;
      margin-right: 3px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
