<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>
              Login
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
            </v-form>
            <div class="error">{{error}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import UsersService from '@/services/UsersService'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        })

        // get followees
        const data = (await UsersService.following(this.username)).data.following

        // extract usernames from data
        let following = []
        for (let i = 0; i < data.length; i++) {
          following[i] = data[i].properties.username
        }

        // get liked posts
        const likedPosts = (await UsersService.getLikedPosts(this.username)).data

        // extract ids from posts
        let likedPostsIdArray = []
        for (let i = 0; i < likedPosts.length; i++) {
          likedPostsIdArray[i] = likedPosts[i].post.properties.id
        }

        // get reposts
        const reposts = (await UsersService.getReposts(this.username)).data

        // extract ids from posts
        let repostsIdArray = []
        for (let i = 0; i < reposts.length; i++) {
          repostsIdArray[i] = reposts[i].post.properties.id
        }

        // get visits
        const visits = (await UsersService.getVisits(this.username)).data[0].places

        // get ratings
        const ratings = (await UsersService.getRatings(this.username)).data

        // get interests
        const interests = (await UsersService.getInterests(this.username)).data[0].interests

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        // store only the usernames
        this.$store.dispatch('setFollowing', following)

        // store only the ids
        this.$store.dispatch('setLikedPosts', likedPostsIdArray)
        this.$store.dispatch('setReposts', repostsIdArray)

        // store user's visits, ratings and interests
        this.$store.dispatch('setVisits', visits)
        this.$store.dispatch('setRatings', ratings)
        this.$store.dispatch('setInterests', interests)

        this.$router.push({
          name: 'profile',
          params: {
            username: this.$store.state.user.properties.username
          }})
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
