<template>
<div>
  <profile-header v-if="dataLoaded" :userStats="userStats" :username="user.properties.username"></profile-header>
  <v-container grid-list-md v-if="dataLoaded">
    <v-layout>
      <v-flex xs3>
        <user-info v-if="dataLoaded" :userData="user.properties"></user-info>
      </v-flex>
      <v-flex xs6>
        <v-layout column>
          <v-flex xs12 v-for="postData in userPosts" :key="postData.post.properties.id">
            <post :postData="postData"></post>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs3></v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import UsersService from '@/services/UsersService'
import ProfileHeader from './ProfileHeader'
import UserInfo from './UserInfo'
import Post from '@/components/Post'

export default {
  data () {
    return {
      user: {},
      userStats: {},
      userPosts: [],
      dataLoaded: false
    }
  },
  async mounted () {
    const username = this.$store.state.route.params.username
    const data = (await UsersService.show(username)).data
    this.user = data.user
    this.userStats = data.stats
    this.userPosts = data.posts
    this.dataLoaded = true
  },
  components: {
    Post,
    ProfileHeader,
    UserInfo
  }
}
</script>

<style lang="scss" scoped>
</style>
