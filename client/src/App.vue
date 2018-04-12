<template>
  <div id="app">
    <v-app>
      <page-header />
      <main>
        <v-content>
          <v-container fluid class="pa-0">
            <router-view></router-view>
          </v-container>
        </v-content>
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'
import ProfileCard from '@/components/homepage/ProfileCard'
import Posts from '@/components/homepage/Posts'

export default {
  name: 'App',
  components: {
    PageHeader,
    ProfileCard,
    Posts
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
