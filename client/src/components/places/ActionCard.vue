<template>
<v-card>
  <v-card-media
    :src="`https://maps.googleapis.com/maps/api/staticmap?center=${placeDetails.geometry.location.lat},${placeDetails.geometry.location.lng}&size=300x200&zoom=17&key=AIzaSyBBbWdvzj7X7wbMFQWQnXA_lWaXFVIwykc`"
    height="200px"
  ></v-card-media>
  <v-speed-dial
  v-model="fab"
    direction="top"
    top
    left
  >
    <v-btn
      v-model="fab"
      small
      slot="activator"
      fab
      class="fab"
      dark
      color="primary"
    >
      <v-icon>add</v-icon>
      <v-icon>clear</v-icon>
    </v-btn>
    <v-btn
      fab
      class="fab fab1"
      dark
      small
      :color="interestedColor"
      @click="$emit('showInterest')"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn
      fab
      class="fab fab2"
      dark
      small
      :color="visitedColor"
      @click="$emit('showVisit')"
    >
      <v-icon>directions_car</v-icon>
    </v-btn>
    <v-btn
      fab
      class="fab fab3"
      dark
      small
      :color="ratedColor"
      @click="$emit('showRate')"
    >
      <v-icon>favorite</v-icon>
    </v-btn>
  </v-speed-dial>
  <v-card-title>
    <v-layout row wrap class="list">
      <v-flex xs12>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon>{{fetchIcon(placeDetails.types[0])}}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Type</v-list-tile-title>
              <v-list-tile-sub-title>{{ placeDetails.types[0] }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>location_city</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Location</v-list-tile-title>
              <v-list-tile-sub-title>{{ placeDetails.vicinity }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>star</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Google Rating</v-list-tile-title>
              <v-list-tile-sub-title>{{ placeDetails.rating }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-card-title>
</v-card>
</template>

<script>
export default {
  data () {
    return {
      fab: false
    }
  },

  computed: {
    visitedColor () {
      if (this.visited) {
        return 'cyan'
      }
      return 'grey darken-2'
    },
    ratedColor () {
      if (this.rated) {
        return 'red'
      }
      return 'grey darken-2'
    },
    interestedColor () {
      if (this.interested) {
        return 'green'
      }
      return 'grey darken-2'
    }
  },

  methods: {
    fetchIcon (type) {
      let icon = ''
      switch (type) {
        case 'lodging':
          icon = 'hotel'
          break

        case 'locality':
          icon = 'place'
          break

        case 'cafe':
          icon = 'local_cafe'
          break

        case 'restaurant':
          icon = 'restaurant'
          break

        default:
          icon = 'business_center'
          break
      }

      return icon
    }
  },

  props: {
    placeDetails: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.fab {
  position: absolute;
  bottom: -10px;
  right: 20px;
}

.fab1 {
  bottom: 40px;
}

.fab2 {
  bottom: 90px;
}

.fab3 {
  bottom: 140px;
}

.list {
  overflow: hidden;
}
</style>
