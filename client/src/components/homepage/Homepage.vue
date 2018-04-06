<template>
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
