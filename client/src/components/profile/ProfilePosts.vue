<template>
<v-layout column>
  <v-flex xs12 v-for="post in posts" :key="post._id">
    <v-card hover>
      <v-container>
        <v-layout>
          <v-flex xs1>
            <v-avatar>
              <img :src="'https://api.adorable.io/avatars/285/' + userData.username + '.png'" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex xs11>
            <div class="post-header ml-3">
              <a href="" class="post-header-link text-xs-left">
                <span class="fullNameGroup text-xs-left">
                <strong class="fullName text-xs-left">
                  {{userData.fname}} {{userData.lname}}
                </strong>
                </span>
                <span class="username">@{{userData.username}}</span>
                <small class="date">15h</small>
              </a>
            </div>
            <div class="post-container ml-3">
              <p class="postText text-xs-left">{{post.properties.content}}</p>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  props: [
    'posts',
    'userData'
  ]
}
</script>

<style lang="scss" scoped>
.post-header-link {
  display: block;
  text-decoration: none;
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
