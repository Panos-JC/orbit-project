<template>
  <v-card>
    <v-list two-line>
      <span class="header">Who to follow</span>
      <template v-for="user in recs">
        <v-divider :key="user.username"></v-divider>
        <v-list-tile
          :key="user.username + ' '"
          avatar
          @click="''"
        >
          <v-list-tile-avatar>
            <img :src="'https://api.adorable.io/avatars/285/' + user.username">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{user.fname}} {{user.lname}}</v-list-tile-title>
            <v-list-tile-sub-title>@{{user.username}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn small outline round color="primary">Follow</v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import UsersService from '@/services/UsersService'

export default {
  data () {
    return {
      recs: []
    }
  },

  async created () {
    const response = (await UsersService.getRecommendations(this.$store.state.user.properties.username)).data
    this.recs = response
  }
}
</script>

<style lang="scss" scoped>
.header {
  font-size: 18px;
  font-weight: bold;
  color: #14171a;
}
</style>
