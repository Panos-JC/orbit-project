<template>
<div v-if="placeDetails">
  <v-responsive height="300">
    <v-img
      :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=2500&photoreference=' + placeDetails.photo_reference + '&key=AIzaSyBBbWdvzj7X7wbMFQWQnXA_lWaXFVIwykc'"
      max-height="300"
      :gradient="'to top right, rgba(0,0,0, .4), rgba(100,100,100, .4)'"
    >
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>
          <h3 class="display-3 name white--text">{{placeDetails.name}}</h3>
        </v-flex>
      </v-layout>
    </v-container>
    </v-img>
  </v-responsive>
  <place-info :placeStats="placeStats"></place-info>
  <v-container grid-list-md>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <place-content :friendsVisited="friendsVisited"></place-content>
      </v-flex>
      <v-flex xs3>
        <p class="title text-xs-left mb-3 mt-2">Info</p>
        <action-card
          :placeDetails="placeDetails"
          :placeStats="placeStats"
          @visitBtnClicked="visitDialog = true"
          @rateBtnClicked="rateDialog = true"
          @interestBtnClicked="interestDialog = true"
        ></action-card>
      </v-flex>
    </v-layout>
  </v-container>

  <!-- VISIT DIALOG -->
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
          :loading="btnLoading"
          :disabled="btnLoading"
          depressed
          :dark ="!btnLoading"
          color="green darken-1"
          @click="visit()"
        >
          Yes
        </v-btn>
        <v-btn
          flat
          :disabled="btnLoading"
          color="green darken-1"
          @click="visitDialog = false">
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- RATE DIALOG -->
  <v-dialog v-model="rateDialog" max-width="250px">
    <v-card class="rateCard">
      <v-rating
        v-model="rating"
        empty-icon="favorite_border"
        full-icon="favorite"
        hover
        dense
        size='35'
        color="#F44336"
        background-color="grey lighten-1"
        @input="rate()"
      ></v-rating>
    </v-card>
  </v-dialog>

  <!-- INTEREST DIALOG -->
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
          v-model="postText"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat round @click.native="interestDialog = false">Cancel</v-btn>
        <v-btn color="primary" depressed round dark @click="postInterest()">Post</v-btn>
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
import UsersService from '@/services/UsersService'
import PlaceInfo from '@/components/places/PlaceInfo'
import PlaceContent from '@/components/places/PlaceContent'
import ActionCard from '@/components/places/ActionCard'

export default {
  data () {
    return {
      placeDetails: null,
      placeStats: {},
      friendsVisited: [],
      pageLoading: true,

      isTooltipActive: true,

      btnLoading: false,
      rating: 0,

      // Dialogs
      rateDialog: false,
      visitDialog: false,
      interestDialog: false,

      // Snackbar
      snackbar: false,
      message: '',
      color: '',

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
        // Get place details from Google Places API
        this.placeDetails = (await PlacesService.getPlace(this.$route.params.placeId)).data

        // Get place statistics from database if place exists
        this.placeStats = (await PlacesService.getStats(
          this.$route.params.placeId,
          this.$store.state.user.properties.username
        )).data

        // Get friends who visited
        this.friendsVisited = (await PlacesService.getFriendsVisited(
          this.$route.params.placeId,
          this.$store.state.user.properties.username
        )).data

        this.postText = `I'm interested in visiting ${this.placeDetails.name}, any thoughts?`

        this.pageLoading = false
      } catch (error) {
        this.pageLoading = false
        console.log(error)
      }
    },

    async rate () {
      try {
        // Merge place
        await PlacesService.mergePlace(this.placeDetails)
        console.log('MERGE complete')

        // Rate place
        await PlacesService.rate(
          this.placeDetails.place_id,
          this.$store.state.user.properties.username,
          this.rating
        )

        // UI confirmation
        this.message = `You rated this place ${this.rating} hearts`
        this.color = 'green'
        this.snackbar = true

        // Get updated place statistics
        this.placeStats = (await PlacesService.getStats(
          this.$route.params.placeId,
          this.$store.state.user.properties.username
        )).data

        console.log('Rated')

        this.rateDialog = false
      } catch (error) {
        console.log(error)
        this.rateDialog = false

        this.message = 'Something went wrong'
        this.color = 'red'
        this.snackbar = true
      }
    },

    async visit () {
      this.btnLoading = true

      try {
        // Merge place
        await PlacesService.mergePlace(this.placeDetails)
        console.log('MERGE complete')

        // Visit place
        await PlacesService.visit(
          this.placeDetails.place_id,
          this.$store.state.user.properties.username
        )

        // UI confirmation
        this.message = `You visited this place`
        this.color = 'green'
        this.snackbar = true

        // Update frontend
        this.placeStats.visited = true

        console.log('Visited')

        this.btnLoading = false
        this.visitDialog = false
      } catch (error) {
        console.log(error)
        this.btnLoading = false

        this.message = 'Something went wrong'
        this.color = 'red'
        this.snackbar = true
      }
    },

    async postInterest () {
      try {
        // Merge place
        await PlacesService.mergePlace(this.placeDetails)
        console.log('MERGE complete')

        // Post interest
        await PlacesService.interest(
          this.placeDetails.place_id,
          this.$store.state.user.properties.username,
          this.postText
        )

        // Get friends who visited this place
        const visitors = (await UsersService.getVisitorFriends(
          this.$store.state.user.properties.username,
          this.placeDetails.place_id
        )).data.friendVisitors
        console.log(visitors)

        for (const visitor of visitors) {
          await UsersService.createNotification(
            visitor,
            this.$store.state.user.properties.username + ' is interested in ' + this.placeDetails.name
          )
        }

        // UI confirmation
        this.message = `You posted an interest for this place`
        this.color = 'green'
        this.snackbar = true

        // Update frontend
        this.placeStats.interested = true

        console.log('Posted interest')

        this.interestDialog = false
      } catch (error) {
        console.log(error)
        this.interestDialog = false

        this.message = 'Something went wrong'
        this.color = 'red'
        this.snackbar = true
      }
    }
  },
  components: {
    PlaceInfo,
    PlaceContent,
    ActionCard
  }
}
</script>

<style lang="scss" scoped>
.icon {
  font-size: 30px;
}

.spinner {
  display: inline-block;
  margin: 200px auto;
}

.rateCard {
  padding: 20px;
}
</style>
