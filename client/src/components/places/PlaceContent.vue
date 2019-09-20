<template>
  <div v-if="friendsVisited.length > 0">
    <p class="title text-xs-left mb-3 mt-2">Friends Visited</p>
      <v-card class="pa-4 text-md-left">
        <v-tooltip
          bottom
          v-for="visitor in friendsVisited"
          v-bind:key="visitor.username">
          <v-avatar
            slot="activator"
            class="mr-3">
            <img :src="'https://api.adorable.io/avatars/285/' + visitor.username + '.jpg'" alt="">
          </v-avatar>
          <span>{{visitor.username}}</span>
        </v-tooltip>
      </v-card>
  </div>
</template>

<script>
export default {
  props: {
    friendsVisited: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
