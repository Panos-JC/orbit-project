<template>
  <div>
    <v-responsive height="300">
    <v-img
      src="https://picsum.photos/id/626/1500/500"
      max-height="300"
    ></v-img>
  </v-responsive>
    <v-toolbar color="white">
      <v-layout row style="height: 100%">
        <v-flex xs3>
          <v-avatar class="avatar" size="130">
            <img :src="'https://api.adorable.io/avatars/285/' + userInfo.username + '.png'" alt="">
        </v-avatar>
        </v-flex>
        <v-flex xs6 style="height: 100%">
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat class="stat" :to="'/users/' + userInfo.username + '/posts'">
              <span class="label">Posts</span>
              <span class="value">{{userInfo.posts}}</span>
            </v-btn>
            <v-btn flat class="stat" :to="'/users/' + userInfo.username + '/followers'">
              <span class="label">Followers</span>
              <span class="value">{{userInfo.followers}}</span>
            </v-btn>
            <v-btn flat class="stat" :to="'/users/' + userInfo.username + '/following'">
              <span class="label">Following</span>
              <span class="value">{{userInfo.following}}</span>
            </v-btn>
            <v-btn flat class="stat" :to="'/users/' + userInfo.username + '/visits'">
              <span class="label">Visits</span>
              <span class="value">{{userInfo.visited}}</span>
            </v-btn>
          </v-toolbar-items>
        </v-flex>
      </v-layout>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  computed: {
    // If this user is logged in return true
    isLoggedIn () {
      if (this.$store.state.isUserLoggedIn) {
        return this.$store.state.user.properties.username === this.userInfo.username
      } else {
        return false
      }
    }
  },
  props: [
    'userInfo'
  ]
}
</script>

<style lang="scss" scoped>
.jumbotron {
  height: 270px !important;
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
</style>
