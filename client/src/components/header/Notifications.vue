<template>
<v-menu left offset-y transition="slide-y-transition">
  <v-btn icon slot="activator">
    <v-badge
      color="red"
      left
      overlap>
      <span><v-icon>notifications</v-icon></span>
      <span slot="badge"> {{data.length}} </span>
    </v-badge>
  </v-btn>
  <v-card>
    <v-list two-line>
      <v-subheader>
        Notifications
      </v-subheader>
      <template v-for="n in 3">
        <v-list-tile
          :key="n"
          avatar
          @click="''"
        >
          <v-list-tile-avatar>
            <img src="https://api.adorable.io/avatars/285/panos.jpg" alt="">
          </v-list-tile-avatar>
          <v-list-tile-content class="notification">
            <v-list-tile-title>Tax is interested in visiting Paris.</v-list-tile-title>
            <v-list-tile-sub-title>Share your thoughts with him.</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">clear</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="n" v-if="n < 3"></v-divider>
      </template>
    </v-list>
  </v-card>
</v-menu>
</template>

<script>
export default {
  data () {
    return {
      data: [1, 2, 3, 4]
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  text-align: left;
}
</style>
