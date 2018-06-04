<template>
  <v-card v-if="postData">
    <v-container class="pb-1">
      <v-layout wrap>
        <v-flex xs12 v-if="postData.reposter">
          <div class="postContext">
            <span class="repostIcon">
              <v-icon>repeat</v-icon>
            </span>
            <span class="repostText">
              <a href="">{{reposter}}</a>
              Reposted
            </span>
          </div>
        </v-flex>
        <v-flex xs1>
          <a :href="'#/users/' + postData.poster.username">
            <v-avatar>
              <img :src="'https://api.adorable.io/avatars/285/' + postData.poster.username + '.png'" alt="avatar">
            </v-avatar>
          </a>
        </v-flex>
        <v-flex xs11 class="pb-0">
          <div class="post-header ml-3">
            <a :href="'#/users/' + postData.poster.username" class="post-header-link text-xs-left">
              <span class="fullNameGroup text-xs-left">
              <strong class="fullName text-xs-left">
                {{fullName}}
              </strong>
              </span>
              <span class="username">@{{postData.poster.username}}</span>
              <small class="date">15h</small>
            </a>
          </div>
          <div class="post-container ml-3">
            <p class="postText text-xs-left mb-1">
              {{postData.content}}
            </p>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon :to="'/post/' + postData.id">
              <v-icon>reply</v-icon>
            </v-btn>
            <button v-if="!liked" class="postActionButton" @click="like">
              <div class="iconContainer">
                <v-icon>favorite_border</v-icon>
              </div>
              <span class="actionCount">{{likeCounter}}</span>
            </button>
            <button v-if="liked" class="postActionButton postActionButton-active" @click="unlike">
              <div class="iconContainer">
                <v-icon>favorite</v-icon>
              </div>
              <span class="actionCount">{{likeCounter}}</span>
            </button>

            <button v-if="!reposted" class="postActionButton" @click="repost">
              <div class="iconContainer iconRepost">
                <v-icon>repeat</v-icon>
              </div>
              <span class="actionCount actionCount-repost">{{repostCounter}}</span>
            </button>
            <button v-if="reposted" class="postActionButton postActionButton-active-repost" @click="removeRepost">
              <div class="iconContainer iconRepost">
                <v-icon>repeat</v-icon>
              </div>
              <span class="actionCount actionCount-repost">{{repostCounter}}</span>
            </button>
          </v-card-actions>
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
  </v-card>
</template>

<script>
import ExtendedPost from '@/components/ExtendedPost'
import PostService from '@/services/PostService'

export default {
  data () {
    return {
      liked: false,
      likeCounter: 0,
      reposted: false,
      repostCounter: 0,
      dialog: false,
      message: '',
      successSnackbar: false,
      errorSnackbar: false,
      isRepost: false
    }
  },
  computed: {
    fullName () {
      return this.postData.poster.fname + ' ' + this.postData.poster.lname
    },
    reposter () {
      if (this.postData.reposter === this.$store.state.user.properties.username) {
        return 'You'
      } else {
        return this.postData.reposter
      }
    }
  },
  methods: {
    async like () {
      try {
        const data = {
          username: this.$store.state.user.properties.username,
          postId: this.postData.id
        }

        // like post
        const response = (await PostService.like(data))
        console.log(response)

        // add post id into store's likedPosts array
        this.$store.commit('addLikedPost', this.postData.id)

        this.liked = true
        this.likeCounter++
        this.message = 'You liked a post'
        this.successSnackbar = true
      } catch (error) {
        this.message = 'Something went wrong'
        this.errorSnackbar = true
      }
    },
    async unlike () {
      try {
        const data = {
          username: this.$store.state.user.properties.username,
          postId: this.postData.id
        }

        // unlike post
        const response = (await PostService.unlike(data))
        console.log(response)

        // remove post id from store's likedPosts array
        this.$store.commit('removeLikedPost', this.postData.id)

        this.liked = false
        this.likeCounter--
        this.message = 'Unlikes post'
        this.successSnackbar = true
      } catch (error) {
        this.message = 'Something went wrong'
        this.errorSnackbar = true
      }
    },
    async repost () {
      try {
        const data = {
          username: this.$store.state.user.properties.username,
          postId: this.postData.id
        }

        // repost
        const response = (await PostService.repost(data))
        console.log(response)

        // ass post id into store's reposts array
        this.$store.commit('addRepost', this.postData.id)

        this.reposted = true
        this.repostCounter++
        this.message = 'Reposted'
        this.successSnackbar = true
      } catch (error) {
        this.message = 'Something went wrong'
        this.errorSnackbar = true
      }
      console.log('repost')
    },
    async removeRepost () {
      try {
        const data = {
          username: this.$store.state.user.properties.username,
          postId: this.postData.id
        }

        const response = (await PostService.removeRepost(data))
        console.log(response)

        this.$store.commit('removeRepost', this.postData.id)

        this.reposted = false
        this.repostCounter--
        this.message = 'Repost removed'
        this.successSnackbar = true
      } catch (error) {
        this.message = 'Something went wrong'
        this.errorSnackbar = true
      }
    }
  },
  created () {
    if (this.$store.state.likedPosts.includes(this.postData.id)) {
      this.liked = true
    }

    if (this.$store.state.reposts.includes(this.postData.id)) {
      this.reposted = true
    }

    this.likeCounter = this.postData.likes
    this.repostCounter = this.postData.reposts
  },
  components: {
    ExtendedPost
  },
  props: [
    'postData'
  ]
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

small.date {
  color: #657786;
  white-space: nowrap;
  margin-left: 5px;
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
