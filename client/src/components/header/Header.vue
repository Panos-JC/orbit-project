<template>
  <v-toolbar>
    <v-toolbar-title class="mr-3">orbit-project</v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/home">Home</v-btn>
      <v-btn flat to="/users">Users</v-btn>
      <v-btn flat to="/places">Places</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
      <v-btn flat to="/login">
        Login
      </v-btn>
      <v-btn flat to="/register">
        Register
      </v-btn>
    </v-toolbar-items>
    <notifications v-if="$store.state.isUserLoggedIn"></notifications>
    <user-actions v-if="$store.state.isUserLoggedIn"></user-actions>
  </v-toolbar>
</template>

<script>
import UserActions from '@/components/header/UserActions'
import Notifications from '@/components/header/Notifications'

export default {
  components: {
    UserActions,
    Notifications
  }
}
</script>

<style scoped>
</style>
