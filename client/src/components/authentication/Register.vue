<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>
              Register
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="username"
                label="Username"
                type="text"
                v-model="username"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-text-field
                prepend-icon="person"
                name="fname"
                label="First Name"
                id="fname"
                type="text"
                v-model="fname"
              ></v-text-field>
              <v-text-field
                prepend-icon="person"
                name="lname"
                label="Last Name"
                id="lname"
                type="text"
                v-model="lname"
              ></v-text-field>
            </v-form>
            <div class="error">{{error}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="register">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      username: '',
      password: '',
      fname: '',
      lname: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          username: this.username,
          password: this.password,
          fname: this.fname,
          lname: this.lname
        })

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.$router.push({
          name: 'profile',
          params: {
            username: this.$store.state.user.properties.username
          }})
      } catch (error) {
        this.error = error.response.data.message
      }
    }
  }
}
</script>
