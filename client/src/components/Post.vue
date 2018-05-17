<template>
  <v-card v-if="postData">
    <v-container class="pb-1">
      <v-layout wrap>
        <v-flex xs1>
          <a :href="'#/users/' + postData.user.properties.username">
            <v-avatar>
              <img :src="'https://api.adorable.io/avatars/285/' + postData.user.properties.username + '.png'" alt="avatar">
            </v-avatar>
          </a>
        </v-flex>
        <v-flex xs11 class="pb-0">
          <div class="post-header ml-3">
            <a :href="'#/users/' + postData.user.properties.username" class="post-header-link text-xs-left">
              <span class="fullNameGroup text-xs-left">
              <strong class="fullName text-xs-left">
                {{fullName}}
              </strong>
              </span>
              <span class="username">@{{postData.user.properties.username}}</span>
              <small class="date">15h</small>
            </a>
          </div>
          <div class="post-container ml-3">
            <p class="postText text-xs-left mb-1">
              {{postData.post.properties.content}}
            </p>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon :to="'post/' + postData.post.properties.id">
              <v-icon>reply</v-icon>
            </v-btn>
            <v-btn icon  @click="liked=true" v-if="!liked">
              <v-icon color="black">favorite_border</v-icon>
            </v-btn>
            <v-btn icon  @click="liked=false" v-if="liked">
              <v-icon color="red">favorite</v-icon>
            </v-btn>
            <v-btn icon @click="reposted=true" v-if="!reposted">
              <v-icon color="black">repeat</v-icon>
            </v-btn>
            <v-btn icon @click="reposted=false" v-if="reposted">
              <v-icon color="green">repeat</v-icon>
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import ExtendedPost from '@/components/ExtendedPost'

export default {
  data () {
    return {
      liked: false,
      reposted: false,
      dialog: false
    }
  },
  computed: {
    fullName () {
      return this.postData.user.properties.fname + ' ' + this.postData.user.properties.lname
    }
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
</style>
