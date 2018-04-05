<template>
  <div id="app">
    <v-app>
      <page-header />
      <main>
        <v-content>
          <v-container fluid>
            <router-view></router-view>
            <v-container grid-list-md>
              <v-layout row>
                <v-flex xs3>
                  <profile-card></profile-card>
                </v-flex>
                <v-flex xs6>
                  <posts></posts>
                </v-flex>
                <v-flex xs3>
                  <v-card dark color="primary">
                    <v-card-text class="px-0">TODO: Follow Recomendations</v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
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
