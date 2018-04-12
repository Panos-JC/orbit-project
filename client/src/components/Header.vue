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
      <v-btn flat to="/login">Login</v-btn>
      <v-btn flat to="/register">Register</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>
