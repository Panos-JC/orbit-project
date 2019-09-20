<template>
  <div>
    <user-grid v-if="dataLoaded" :users="following"></user-grid>
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
      following: [],
      dataLoaded: false
    }
  },
  async created () {
    const username = this.$store.state.route.params.username
    const data = (await UsersService.show(username)).data
    this.userInfo = data.userInfo
    this.userStats = data.stats

    this.following = (await UsersService.following(username)).data.following
    this.dataLoaded = true
  },
  components: {
    ProfileHeader,
    UserInfo,
    UserGrid
  }
}
</script>
