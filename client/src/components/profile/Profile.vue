<template>
<div>
  <profile-header v-if="dataLoaded" :userInfo="userInfo"></profile-header>
  <v-container grid-list-md v-if="dataLoaded">
    <v-layout>
      <v-flex xs3>
        <user-info v-if="dataLoaded" :userInfo="userInfo"></user-info>
      </v-flex>
      <v-flex xs9>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import UsersService from '@/services/UsersService'
import ProfileHeader from './ProfileHeader'
import UserInfo from './UserInfo'
import Posts from '@/components/profile/Posts'

export default {
  data () {
    return {
      userInfo: {},
      dataLoaded: false
    }
  },
  async created () {
    const username = this.$store.state.route.params.username
    this.userInfo = (await UsersService.show(username)).data
    this.dataLoaded = true
  },
  components: {
    Posts,
    ProfileHeader,
    UserInfo
  }
}
</script>

<style lang="scss" scoped>
</style>
