<template>
  <div>
    <user-grid v-if="dataLoaded" :users="followers"></user-grid>
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
