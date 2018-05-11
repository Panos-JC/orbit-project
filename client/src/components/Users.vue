<template>
<v-container grid-list-md v-if="$store.state.isUserLoggedIn">
  <v-layout>
    <v-flex xs12>
      <jawn v-if="showLoading" size="100" class="spinner"></jawn>
    </v-flex>
  </v-layout>
  <v-layout wrap v-if="!showLoading">
    <v-flex xs3 v-for="(user) in users" :key="user.userData.username" v-if="user.userData.username !== $store.state.user.properties.username">
      <user-card
        v-if="!showLoading"
        :user="user.userData"
        :following="user.isFollowing"
        @followed="follow = true"
        @unfollow="unfollow = true"
      ></user-card>
    </v-flex>
  </v-layout>
  <v-snackbar
    top
    color="success"
    :timeout = 2000
    v-model="follow">
    Followed
    <v-btn flat @click.native="follow = false">Close</v-btn>
  </v-snackbar>
  <v-snackbar
    top
    color="error"
    :timeout = 2000
    v-model="unfollow">
    Unfollowed
    <v-btn flat @click.native="unfollow = false">Close</v-btn>
  </v-snackbar>
</v-container>
</template>

<script>
import {Jawn} from 'vue-loading-spinner'
import UsersService from '@/services/UsersService'
import UserCard from '@/components/UserCard'

export default {
  data () {
    return {
      users: [],
      showLoading: true,
      follow: false,
      unfollow: false
    }
  },
  async created () {
    const data = (await UsersService.index()).data
    const following = this.$store.state.following

    this.showButtons(data, following)

    this.showLoading = false
  },
  methods: {
    async showButtons (data, following) {
      let found = false
      for (let i = 0; i < data.length; i++) {
        if (following) {
          for (let j = 0; j < following.length; j++) {
            if (data[i].properties.username === following[j]) {
              found = true
              break
            }
          }
          if (found) {
            this.users[i] = {
              userData: data[i].properties,
              isFollowing: true
            }
          } else {
            this.users[i] = {
              userData: data[i].properties,
              isFollowing: false
            }
          }
        } else {
          this.users[i] = { userData: data[i].properties }
        }
        found = false
      }
    }
  },
  components: {
    Jawn,
    UserCard
  }
}
</script>

<style lang="scss" scoped>
.spinner {
  display: inline-block;
  margin: 200px auto;
}
</style>
