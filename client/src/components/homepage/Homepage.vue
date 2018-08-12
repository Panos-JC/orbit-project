<template>
  <v-container grid-list-md>
    <v-layout row>
      <v-flex xs3>
        <v-layout wrap>
          <v-flex xs12>
            <profile-card></profile-card>
          </v-flex>
          <v-flex xs12>
            <popular-tags></popular-tags>
          </v-flex>
        </v-layout>
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
import PopularTags from '@/components/homepage/PopularTags'

export default {
  name: 'App',
  components: {
    PageHeader,
    ProfileCard,
    Posts,
    PopularTags
  }
}
</script>
