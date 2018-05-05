<template>
  <v-toolbar>
    <v-toolbar-title class="mr-3">orbit-project</v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/home">Home</v-btn>
      <v-btn flat to="/users">Users</v-btn>
      <v-btn flat>Browse</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/login" v-if="!$store.state.isUserLoggedIn">
        Login
      </v-btn>
      <v-btn flat to="/register" v-if="!$store.state.isUserLoggedIn">
        Register
      </v-btn>
      <v-btn flat @click="logout" v-if="$store.state.isUserLoggedIn">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setFollowing', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>
</style>
