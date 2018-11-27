<template>
<v-container grid-list-md v-if="$store.state.isUserLoggedIn">
  <v-layout>
    <v-flex xs12>
      <circle-spinner v-if="loading" size="100" class="spinner"></circle-spinner>
    </v-flex>
  </v-layout>
  <v-layout wrap v-if="!loading">
    <v-flex xs3 v-for="user in users" :key="user.username">
      <user-card
        v-if="!loading"
        :initialUser="user"
        @success="showMessage"
        @error="error = true"
      ></user-card>
    </v-flex>
  </v-layout>
  <v-snackbar
    top
    color="success"
    :timeout = 2000
    v-model="success">
    {{message}}
    <v-btn flat @click.native="success = false">Close</v-btn>
  </v-snackbar>
  <v-snackbar
    top
    color="error"
    :timeout = 2000
    v-model="error">
    Something went wrong.
    <v-btn flat @click.native="error = false">Close</v-btn>
  </v-snackbar>
</v-container>
</template>

<script>
import {Circle} from 'vue-loading-spinner'
import UsersService from '@/services/UsersService'
import UserCard from '@/components/UserCard'

export default {
  data () {
    return {
      users: [],
      loading: true,
      success: false,
      error: false,
      message: ''
    }
  },
  async created () {
    this.loadUsers()
  },
  methods: {
    async loadUsers () {
      try {
        this.users = (await UsersService.index({
          username: this.$store.state.user.properties.username
        })).data
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    showMessage (value) {
      this.success = true
      switch (value) {
        case 'follow':
          this.message = 'You followed a user.'
          break

        case 'unfollow':
          this.message = 'You unfollowed a user.'
          break
      }
    }
  },
  components: {
    CircleSpinner: Circle,
    UserCard
  }
}
</script>

<style lang="scss" scoped>
.spinner {
  display: inline-block;
  margin: 200px auto;
}
</style>
