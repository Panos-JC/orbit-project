<template>
<v-menu left offset-y transition="slide-y-transition">
  <v-btn icon slot="activator" v-if="$store.state.isUserLoggedIn" class="mr-4">
    <v-avatar size="32">
      <img :src="'https://api.adorable.io/avatars/285/' + $store.state.user.properties.username + '.png'" alt="avatar">
    </v-avatar>
  </v-btn>
  <v-list class="indigo" dark>
    <v-list-tile  @click="profile">
      <v-list-tile-action>
        <v-icon>person</v-icon>
      </v-list-tile-action>
      <v-list-tile-content class="white--text">
        <v-list-tile-title>Profile</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile  @click="profile">
      <v-list-tile-action>
        <v-icon>settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-content class="white--text">
        <v-list-tile-title>Settings</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
    <v-list-tile @click="logout">
      <v-list-tile-action>
        <v-icon>exit_to_app</v-icon>
      </v-list-tile-action>
      <v-list-tile-content class="white--text">
        <v-list-tile-title>Log Out</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</v-menu>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('clearStore', null)
      this.$router.push({
        name: 'login'
      })
    },
    profile () {
      this.$router.push({
        name: 'profile',
        params: {username: this.$store.state.user.properties.username}
      })
    }
  }
}
</script>
