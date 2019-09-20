<template>
  <v-card v-if="place" class="fill-height align-end">
    <a :href="'#/places/' + place.place_id">
      <v-img :src="photo" height="200px" class="white--text" gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.6)">
        <v-card-title
          class="fill-height align-end title"
          v-text="place.name"
        ></v-card-title>
      </v-img>
    </a>
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

</style>
