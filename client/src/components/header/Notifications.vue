<template>
<div>
<v-menu left offset-y transition="slide-y-transition" :close-on-content-click="false" min-width=290>
  <v-btn icon slot="activator">
    <v-badge
      color="red"
      left
      overlap>
      <span><v-icon>notifications</v-icon></span>
      <span v-if="notifications.length > 0" slot="badge"> {{notifications.length}} </span>
    </v-badge>
  </v-btn>
  <v-card>
    <v-list two-line>
      <v-subheader>
        Notifications
        <v-icon class="float-right" @click="deleteNotifications()">clear_all</v-icon>
      </v-subheader>
      <template v-for="notification in notifications">
        <v-list-tile
          :key="notification"
          avatar
          @click="''"
        >
          <v-list-tile-avatar>
            <img src="https://api.adorable.io/avatars/285/panos.jpg" alt="">
          </v-list-tile-avatar>
          <v-list-tile-content class="notification">
            <v-list-tile-title>{{notification}}</v-list-tile-title>
            <v-list-tile-sub-title>Share your thoughts with him.</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</v-menu>
<v-snackbar
  bottom
  left
  :timeout=2000
  color="error"
  v-model="errorSnackbar"
>
  Something went wrong
  <v-btn flat @click.native="errorSnackbar = false">Close</v-btn>
</v-snackbar>
</div>
</template>

<script>
import UsersService from '@/services/UsersService'

export default {
  data () {
    return {
      notifications: this.$store.state.notifications,
      errorSnackbar: false
    }
  },

  methods: {
    async deleteNotifications () {
      try {
        await UsersService.deleteNotifications(this.$store.state.user.properties.username)
        this.$store.dispatch('deleteNotifications')
        this.notifications = []
        console.log('OK')
      } catch (error) {
        this.errorSnackbar = true
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  text-align: left;
}
</style>
