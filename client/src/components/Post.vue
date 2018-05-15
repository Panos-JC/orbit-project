<template>
<div>
  <v-card>
    <v-container class="pb-1">
      <v-layout wrap>
        <v-flex xs1>
          <a :href="'#/users/panos'">
            <v-avatar>
              <img :src="'https://api.adorable.io/avatars/285/panos.png'" alt="avatar">
            </v-avatar>
          </a>
        </v-flex>
        <v-flex xs11 class="pb-0">
          <div class="post-header ml-3">
            <a :href="'#/users/panos'" class="post-header-link text-xs-left">
              <span class="fullNameGroup text-xs-left">
              <strong class="fullName text-xs-left">
                Panos J. Chatziioannou
              </strong>
              </span>
              <span class="username">@panos</span>
              <small class="date">15h</small>
            </a>
          </div>
          <div class="post-container ml-3">
            <p class="postText text-xs-left mb-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa natus expedita a doloribus enim debitis porro nam quaerat beatae, neque quia velit, unde veritatis doloremque odio provident officia itaque. Consequatur?
            </p>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon to="users/panos/post/1">
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
</div>
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
  components: {
    ExtendedPost
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
