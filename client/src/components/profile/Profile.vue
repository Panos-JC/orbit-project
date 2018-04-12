<template>
<div>
  <v-jumbotron height="300" color="primary" dark>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>
          <h3 class="display-3">Custom Color</h3>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
  <v-toolbar color="white">
    <v-layout row style="height: 100%">
      <v-flex xs3>
        <v-avatar class="avatar" size="130">
          <img src="https://api.adorable.io/avatars/285/panos.png" alt="">
      </v-avatar>
      </v-flex>
      <v-flex xs6 style="height: 100%">
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat class="stat">
            <span class="label">Posts</span>
            <span class="value">25</span>
          </v-btn>
          <v-btn flat class="stat">
            <span class="label">Followers</span>
            <span class="value">25</span>
          </v-btn>
          <v-btn flat class="stat">
            <span class="label">Following</span>
            <span class="value">25</span>
          </v-btn>
        </v-toolbar-items>
      </v-flex>
      <v-flex xs3>
        <v-btn outline round color="grey darken-3" class="edit-btn">Edit Profile</v-btn>
      </v-flex>
    </v-layout>
  </v-toolbar>
  <v-container grid-list-md>
    <v-layout>
      <v-flex xs3>
        <div class="userInfo">
          <h1 class="userInfo-name text-xs-left">Panos Chatz</h1>
          <h2 class="userInfo-username text-xs-left">@panos</h2>
        </div>
      </v-flex>
      <v-flex xs6>
        <profile-posts></profile-posts>
      </v-flex>
      <v-flex xs3></v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import ProfilePosts from '@/components/profile/ProfilePosts'
export default {
  components: {
    ProfilePosts
  }
}
</script>

<style lang="scss" scoped>
.jumbotron {
  height: 320px !important;
}

.avatar {
  position: absolute;
  img {
    border: 5px solid white;
    position: absolute;
    top: -40px;
    left: -65px;
  }
}

.stat {
  .label {
    display: block;
    color: #657786;
    font-weight: bold;
    font-size: 12px;
    letter-spacing: 0.02em;
    transition: color 0.15s ease-in-out;
    position: absolute;
    top: 20%;
  }
  .value {
    display: block;
    color: #657786;
    font-size: 18px;
    font-weight: bold;
    transition: color 0.15s ease-in-out;
    position: absolute;
    bottom: 15%;
  }
}

.edit-btn {
  position: absolute;
  top: 12%;
}
// userinfo
.userInfo {
  margin-top: 40px;
  .userInfo-name {
    line-height: 1;
    font-size: 21px;
  }

  .userInfo-username {
    font-size: 14px;
    line-height: 20px;
    color: #66757f;
  }
}
</style>
