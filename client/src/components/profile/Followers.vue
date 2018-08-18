<template>
  <div>
    <profile-header v-if="dataLoaded" :userInfo="userInfo"></profile-header>
    <v-container grid-list-md v-if="dataLoaded">
      <v-layout>
        <v-flex xs3>
          <user-info v-if="dataLoaded" :userInfo="userInfo"></user-info>
        </v-flex>
        <v-flex xs9>
          <user-grid v-if="dataLoaded" :users="followers"></user-grid>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'
import ProfileHeader from '@/components/profile/ProfileHeader'
import UserInfo from '@/components/profile/UserInfo'
import UserGrid from '@/components/profile/UserGrid'

export default {
  data () {
    return {
      userInfo: {},
      followers: [],
      dataLoaded: false
    }
  },
  async created () {
    const username = this.$store.state.route.params.username
    const data = (await UsersService.show(username)).data
    this.userInfo = data.userInfo
    console.log(this.userInfo)
    this.userStats = data.stats

    this.followers = (await UsersService.followers(username)).data.followers
    this.dataLoaded = true
  },
  components: {
    ProfileHeader,
    UserInfo,
    UserGrid
  }
}
</script>
