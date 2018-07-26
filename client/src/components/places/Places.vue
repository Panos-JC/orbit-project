<template>
  <div>
    <v-jumbotron color="primary" dark height="200px" class="mb-3">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center xs6 offset-xs3>
            <v-text-field
              prepend-icon="search"
              label="Search"
              solo-inverted
              flat
              @keyup.enter="getPlaces"
              v-model="query"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <div v-if="loading">Loading...</div>
    <div v-if="places.length === 0 && !loading">No Results</div>
    <v-container grid-list-lg>
      <v-layout wrap>
        <v-flex xs4 v-for="place in places" :key="place.id">
          <place-card :place="place"></place-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PlacesService from '@/services/PlacesService'
import PlaceCard from '@/components/places/PlaceCard'

export default {
  data () {
    return {
      places: [],
      query: '',
      loading: false
    }
  },
  methods: {
    async getPlaces () {
      this.loading = true
      try {
        this.places = (await PlacesService.search({query: this.query})).data.results
        this.loading = false
        console.log(this.places)
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    }
  },
  components: {
    PlaceCard
  }
}
</script>

<style lang="scss" scoped>
.place {
  margin-top: 20px;
}
</style>
