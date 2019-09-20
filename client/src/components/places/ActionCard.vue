<template>
  <div>
    <v-card>
      <v-img
        :src="`https://maps.googleapis.com/maps/api/staticmap?center=${placeDetails.lat},${placeDetails.lng}&size=300x200&zoom=17&key=AIzaSyBBbWdvzj7X7wbMFQWQnXA_lWaXFVIwykc`"
        height="200px"
      ></v-img>
      <div class="dial-wrapper">
        <v-speed-dial
          v-model="fab"
          class="speed-dial"
          absolute
        >
          <v-btn v-model="fab" small slot="activator" fab dark color="primary">
            <v-icon>add</v-icon>
            <v-icon>clear</v-icon>
          </v-btn>
          <v-btn fab dark small :color="interestedColor" @click="$emit('interestBtnClicked')">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn fab dark small :color="visitedColor" @click="$emit('visitBtnClicked')">
            <v-icon>directions_car</v-icon>
          </v-btn>
          <v-btn fab dark small :color="ratedColor" @click="$emit('rateBtnClicked')">
            <v-icon>favorite</v-icon>
          </v-btn>
        </v-speed-dial>
      </div>
      <v-card-title>
        <v-layout row wrap class="list">
          <v-flex xs12>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <v-icon>{{fetchIcon(placeDetails.type)}}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Type</v-list-tile-title>
                  <v-list-tile-sub-title>{{ placeDetails.type }}</v-list-tile-sub-title>
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
  </div>
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
      if (this.placeStats.visited) {
        return 'cyan'
      }
      return 'grey darken-2'
    },
    ratedColor () {
      if (this.placeStats.rated) {
        return 'red'
      }
      return 'grey darken-2'
    },
    interestedColor () {
      if (this.placeStats.interested) {
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
    },
    placeStats: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.dial-wrapper {
  position: relative;
}

.speed-dial {
  right: 5px;
  top: -23px;
}

.list {
  overflow: hidden;
}
</style>
