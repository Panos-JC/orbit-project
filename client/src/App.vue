<template>
  <div id="app">
    <v-app>
      <page-header />
      <main>
        <v-content>
          <v-container fluid class="pa-0">
            <router-view></router-view>
            <create-post v-if="$store.state.isUserLoggedIn" @isCreated="postCreated = true" @isNotCreated="postNotCreated = true"></create-post>
            <v-snackbar
              top
              color="success"
              :timeout = 2000
              v-model="postCreated">
              Post Created
              <v-btn flat @click.native="postCreated = false">Close</v-btn>
            </v-snackbar>
            <v-snackbar
              top
              color="error"
              :timeout = 2000
              v-model="postNotCreated">
              Something Went Wrong
              <v-btn flat @click.native="postCreated = false">Close</v-btn>
            </v-snackbar>
          </v-container>
        </v-content>
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
import CreatePost from '@/components/CreatePost'

export default {
  name: 'App',
  data () {
    return {
      postCreated: false,
      postNotCreated: false
    }
  },
  components: {
    PageHeader,
    CreatePost
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
