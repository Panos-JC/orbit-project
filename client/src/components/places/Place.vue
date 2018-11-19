<template>
<div v-if="placeDetails">
  <v-jumbotron
    height="300px"
    dark
    :gradient="'to top right, rgba(0,0,0, .4), rgba(100,100,100, .4)'"
    :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=2500&photoreference=' + placeDetails.photos[0].photo_reference + '&key=AIzaSyBBbWdvzj7X7wbMFQWQnXA_lWaXFVIwykc'"
  >
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>
          <h3 class="display-3 name">{{placeDetails.name}}</h3>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
  <place-info :rated="rated" :userRating="rating" :placeId="placeDetails.place_id"></place-info>
  <v-container grid-list-md>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <p class="title text-xs-left mb-3 mt-2">Google Reviews</p>
        <place-content :reviews="placeDetails.reviews"></place-content>
      </v-flex>
      <v-flex xs3>
        <p class="title text-xs-left mb-3 mt-2">Info</p>
        <action-card
          :placeDetails="placeDetails"
          :visited="visited"
          :rated="rated"
          :interested="interested"
          @showRate="showActionDialog('rate')"
          @showVisit="showActionDialog('visit')"
          @showInterest="showActionDialog('interest')"
        ></action-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-dialog v-model="rateDialog" max-width="250px">
    <v-card class="rateCard">
      <heart-rating
        :spacing="3"
        :increment="1"
        :fixed-points="2"
        :item-size="27"
        :active-color="'#F44336'"
        :inactive-color="'#E0E0E0'"
        :border-color="'#fff'"
        @rating-selected="rate($event)">
      </heart-rating>
    </v-card>
  </v-dialog>
  <v-dialog v-model="visitDialog" max-width="250px">
    <v-card>
      <v-card-title class="headline">
        Have you visited this place?
      </v-card-title>
      <v-card-text>
        Do you want to add this place in your visited list?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          dark
          color="green darken-1"
          @click="visit()"
        >
          Yes
        </v-btn>
        <v-btn
          flat
          color="green darken-1"
          @click="visitDialog = false">
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="interestDialog" max-width="600px">
    <v-card color="cyan" dark>
      <v-card-title>
        <span class="headline">Are you interested in this place?</span>
      </v-card-title>
      <v-card-text>
        <v-textarea
          solo-inverted
          flat
          no-resize
          height="150"
          :value="postText"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat round @click.native="interestDialog = false">Cancel</v-btn>
        <v-btn color="primary" depressed round dark @click="postInterest">Post</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar
    top
    :color="color"
    :timeout = 2000
    v-model="snackbar">
    {{message}}
    <v-btn flat @click.native="rated = false">Close</v-btn>
  </v-snackbar>
  <loading
    :show="showLoader"></loading>
</div>
</template>

<script>
import Loading from 'vue-full-loading'
import PlacesService from '@/services/PlacesService'
import PlaceInfo from '@/components/places/PlaceInfo'
import PlaceContent from '@/components/places/PlaceContent'
import ActionCard from '@/components/places/ActionCard'
import {HeartRating} from 'vue-rate-it'

export default {
  data () {
    return {
      placeDetails: null,
      fab: false,
      heart: '',

      // loader
      showLoader: false,

      // Dialogs
      rateDialog: false,
      visitDialog: false,
      interestDialog: false,

      // Snackbar
      snackbar: false,
      message: '',
      color: '',

      // Actions
      visited: false,
      rated: false,
      interested: false,
      rating: null,

      // Interested input
      postText: ''
    }
  },
  created () {
    this.getPlaceDetails()
      .then(() => {
        if (this.$store.state.visits.includes(this.placeDetails.place_id)) {
          this.visited = true
        }

        if (this.$store.state.interests.includes(this.placeDetails.place_id)) {
          this.interested = true
        }

        this.$store.state.ratings.forEach((rating) => {
          if (rating.place === this.placeDetails.place_id) {
            this.rated = true
            this.rating = rating.rating
          }
        })
      })
  },
  methods: {
    async getPlaceDetails () {
      try {
        this.placeDetails = (await PlacesService.getPlace(this.$route.params.placeId)).data.result
      } catch (error) {
        console.log(error)
      }
    },

    async rate (rating) {
      try {
        const response = (await PlacesService.rate(
          this.placeDetails.place_id,
          this.$store.state.user.properties.username,
          rating
        ))

        console.log(response)

        this.snackbar = true
        this.rated = true
        this.color = 'success'
        this.message = `Rated ${rating} hearts`
        this.rateDialog = false
      } catch (error) {
        this.rated = false
        this.color = 'error'
        this.message = 'Something went wrong'
      }
    },

    async visit () {
      try {
        const response = (await PlacesService.visit(
          this.placeDetails.place_id,
          this.$store.state.user.properties.username
        ))

        console.log(response)

        this.snackbar = true
        this.visited = true
        this.color = 'success'
        this.message = 'Added to visited'
        this.visitDialog = false
      } catch (error) {
        this.visited = false
        this.color = 'error'
        this.message = 'Something went wrong'
      }
    },

    async postInterest () {
      try {
        const response = (await PlacesService.interest(
          this.placeDetails.place_id,
          this.$store.state.user.properties.username,
          this.postText
        ))

        console.log(response)

        this.snackbar = true
        this.interested = true
        this.color = 'success'
        this.message = `Posted interest for ${this.placeDetails.name}`
        this.interestDialog = false
      } catch (error) {
        this.interested = false
        this.color = 'error'
        this.message = 'Something went wrong'
      }
    },

    async showActionDialog (action) {
      this.showLoader = true
      switch (action) {
        case 'interest':
          try {
            this.mergePlace()
              .then(() => {
                setTimeout(() => {
                  this.showLoader = false
                  this.interestDialog = true
                  this.postText = `I'm interested in visiting ${this.placeDetails.name}, any thoughts?`
                }, 1000)
              })
          } catch (error) {
            this.showLoader = false
            this.color = 'error'
            this.message = 'Something went wrong'
          }
          break

        case 'rate':
          try {
            this.mergePlace()
              .then(() => {
                setTimeout(() => {
                  this.showLoader = false
                  this.rateDialog = true
                }, 1000)
              })
          } catch (error) {
            this.showLoader = false
            this.color = 'error'
            this.message = 'Something went wrong'
          }
          break

        case 'visit':
          try {
            this.mergePlace()
              .then(() => {
                setTimeout(() => {
                  this.visitDialog = true
                  this.showLoader = false
                }, 1000)
              })
          } catch (error) {
            this.showLoader = false
            this.color = 'error'
            this.message = 'Something went wrong'
          }
          break
      }
    },

    async getPlaceLocations () {
      let locality = ''
      let country = ''

      if (this.placeDetails.types.includes('country')) {
        return {
          data: {
            name: this.placeDetails.name,
            place_id: this.placeDetails.place_id,
            type: 'country',
            lat: this.placeDetails.geometry.location.lat,
            lng: this.placeDetails.geometry.location.lng
          },
          type: 'country'
        }
      } else if (this.placeDetails.types.includes('locality') || this.placeDetails.types.includes('natural_feature')) {
        for (let i = 0; i < this.placeDetails.address_components.length; i++) {
          if (this.placeDetails.address_components[i].types.includes('country')) {
            country = this.placeDetails.address_components[i].long_name
            let c = (await PlacesService.getPlaceByName(country)).data.candidates

            return {
              data: {
                locality: {
                  name: this.placeDetails.name,
                  place_id: this.placeDetails.place_id,
                  type: 'locality',
                  lat: this.placeDetails.geometry.location.lat,
                  lng: this.placeDetails.geometry.location.lng
                },
                country: {
                  name: c[0].name,
                  place_id: c[0].place_id,
                  type: 'country',
                  lat: c[0].geometry.location.lat,
                  lng: c[0].geometry.location.lng
                }
              },
              type: 'locality'
            }
          }
        }
      } else {
        let localityDetails = ''
        let countryDetails = ''

        for (let i = 0; i < this.placeDetails.address_components.length; i++) {
          if (this.placeDetails.address_components[i].types.includes('locality')) {
            locality = this.placeDetails.address_components[i].long_name
            localityDetails = (await PlacesService.getPlaceByName(locality)).data.candidates
            console.log('localityDetails')
            console.log(locality)
          }
          if (this.placeDetails.address_components[i].types.includes('country')) {
            country = this.placeDetails.address_components[i].long_name
            countryDetails = (await PlacesService.getPlaceByName(country)).data.candidates
          }
        }

        return {
          data: {
            place: {
              name: this.placeDetails.name,
              place_id: this.placeDetails.place_id,
              type: this.placeDetails.types[0],
              lat: this.placeDetails.geometry.location.lat,
              lng: this.placeDetails.geometry.location.lng
            },
            locality: {
              name: localityDetails[0].name,
              place_id: localityDetails[0].place_id,
              type: 'locality',
              lat: localityDetails[0].geometry.location.lat,
              lng: localityDetails[0].geometry.location.lng
            },
            country: {
              name: countryDetails[0].name,
              place_id: countryDetails[0].place_id,
              type: 'country',
              lat: countryDetails[0].geometry.location.lat,
              lng: countryDetails[0].geometry.location.lng
            }
          },
          type: 'place'
        }
      }
    },

    // Create place if not exist
    async mergePlace () {
      this.getPlaceLocations()
        .then(async placeDetails => {
          console.log(placeDetails)
          let placeData = {
            data: null
          }
          if (placeDetails.type === 'country') {
            placeData.data = placeDetails.data
            let response = (await PlacesService.createCountry(placeData))
            console.log('This is a country')
            console.log(placeData)
            console.log(response)
          } else if (placeDetails.type === 'locality') {
            placeData.data = placeDetails.data
            let response = (await PlacesService.createLocality(placeData))
            console.log('This is a locality')
            console.log(placeData)
            console.log(response)
          } else {
            placeData.data = placeDetails.data
            let response = (await PlacesService.createPlace(placeData))
            console.log('This is a place')
            console.log(placeData)
            console.log(response)
          }
        })
    }
  },
  components: {
    PlaceInfo,
    PlaceContent,
    ActionCard,
    HeartRating,
    Loading
  }
}
</script>

<style lang="scss" scoped>
.jumbotron__image {
  top: 0px !important;
}

.icon {
  font-size: 30px;
}

.rateCard {
  padding: 20px;
}
</style>
