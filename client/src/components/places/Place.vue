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
  <place-info></place-info>
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
          @showRate="rateDialog = true"
          @showVisit="visitDialog = true"
          @showInterest="showInterestDialog"
        ></action-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-dialog v-model="rateDialog" max-width="250px">
    <v-card class="rateCard">
      <heart-rating
        :spacing="3"
        :increment="0.5"
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
</div>
</template>

<script>
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

      // Interested input
      postText: ''
    }
  },
  created () {
    this.getPlaceDetails()
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
        // DO RATE

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
        // DO VISIT

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
    async showInterestDialog () {
      this.interestDialog = true
      this.postText = `I'm interested in visiting ${this.placeDetails.name}, any thoughts?`

      let locality = ''
      let country = ''

      if (this.placeDetails.types.includes('country')) {
        console.log(this.placeDetails.name)
      } else if (this.placeDetails.types.includes('locality')) {
        for (let i = 0; i < this.placeDetails.address_components.length; i++) {
          if (this.placeDetails.address_components[i].types.includes('country')) {
            country = this.placeDetails.address_components[i].long_name
          }
        }
        console.log(`${this.placeDetails.name}-->${country}`)
      } else {
        for (let i = 0; i < this.placeDetails.address_components.length; i++) {
          if (this.placeDetails.address_components[i].types.includes('locality')) {
            locality = this.placeDetails.address_components[i].long_name
          }
          if (this.placeDetails.address_components[i].types.includes('country')) {
            country = this.placeDetails.address_components[i].long_name
          }
        }
        console.log(`${this.placeDetails.name}-->${locality}-->${country}`)
      }
    },
    async postInterest () {
      try {
        // DO POST

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
    }
  },
  components: {
    PlaceInfo,
    PlaceContent,
    ActionCard,
    HeartRating
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
