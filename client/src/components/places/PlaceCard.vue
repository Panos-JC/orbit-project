<template>
  <v-card v-if="place">
    <a :href="'#/places/' + place.place_id">
      <v-card-media :src="photo" height="200px">
        <v-container fluid fill-height>
          <v-layout fill-height>
            <v-flex xs12 flexbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
    </a>
    <v-card-actions class="pa-3" >
      <div class="name">{{place.name}}</div>
      <v-btn fab small color="primary" class="add-btn">
        <v-icon>add</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      visited: false
    }
  },
  computed: {
    photo () {
      if (this.place.photos) {
        return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + this.place.photos[0].photo_reference + '&key=AIzaSyBBbWdvzj7X7wbMFQWQnXA_lWaXFVIwykc'
      } else {
        return 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg'
      }
    }
  },
  props: [
    'place'
  ],
  methods: {
    visit () {
      this.visited = !this.visited
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  float: left;
  text-shadow: 0 0 20px #000;
}

.name {
  display: block;
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: .01em;
}

.add-btn {
  position: absolute;
  right: 10px;
  bottom: 32px;
}
</style>
