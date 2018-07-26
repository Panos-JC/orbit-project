<template>
  <v-card>
    <a :href="'#/places/' + place.place_id">
      <v-card-media :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + place.photos[0].photo_reference + '&key=AIzaSyBBbWdvzj7X7wbMFQWQnXA_lWaXFVIwykc'" height="200px">
        <v-container fluid fill-height>
          <v-layout fill-height>
            <v-flex xs12 flexbox>
              <span class="headline white--text title">{{place.name}}</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
    </a>
    <v-card-actions>
      <v-btn flat v-if="!visited" @click="visited=true">
        <v-icon>bookmark_border</v-icon>
        Visit
      </v-btn>
      <v-btn flat color="success" v-if="visited" @click="visited=false">
        <v-icon>bookmark</v-icon>
        Visited
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>reply</v-icon>
      </v-btn>
      <v-btn icon  @click="liked=true" v-if="!liked">
        <v-icon color="black">favorite</v-icon>
      </v-btn>
      <v-btn icon  @click="liked=false" v-if="liked">
        <v-icon color="red">favorite</v-icon>
      </v-btn>
      <v-btn icon @click="reposted=true" v-if="!reposted">
        <v-icon color="black">repeat</v-icon>
      </v-btn>
      <v-btn icon @click="reposted=false" v-if="reposted">
        <v-icon color="green">repeat</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      liked: false,
      reposted: false,
      visited: false
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
.red {
  color: red
}
.title {
  float: left;
  text-shadow: 0 0 20px #000;
}
</style>
