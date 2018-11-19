<template>
<v-layout wrap>
  <v-flex xs12>
    <circle-spinner v-if="loading"></circle-spinner>
  </v-flex>
  <v-flex xs4 v-for="place in visits" :key="place.place_id" v-if="!loading">
    <v-card color="blue-grey darken-2" class="white--text">
      <v-card-title primary-title>
        <div class="headline">{{place.name}}</div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat dark>Visit page</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import {Circle} from 'vue-loading-spinner'
import UsersService from '@/services/UsersService'

export default {

  data () {
    return {
      visits: [],
      loading: true
    }
  },

  async created () {
    this.visits = (await UsersService.getVisits(this.$route.params.username)).data
    this.loading = false
  },

  components: {
    CircleSpinner: Circle
  }
}
</script>

<style lang="scss" scoped>
.spinner {
  margin-top: 100px;
}
</style>
