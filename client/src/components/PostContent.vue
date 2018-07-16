<template>
<div>
  <template v-for="word in wordArray">
    <template v-if="word.charAt(0) === '#'">
      <a href="" :key="word" class="link">{{word}}</a>&nbsp;
    </template>
    <template v-else-if="word.charAt(0) === '@'">
      <a :href="'#/users/' + word.substr(1)" :key="word" class="link">@{{word.substr(1)}}</a>&nbsp;
    </template>
    <template v-else>{{word + ' '}}</template>
  </template>
</div>
</template>

<script>
export default {
  data () {
    return {
      wordArray: []
    }
  },
  created () {
    this.wordArray = this.paragraph.split(' ')
  },
  props: {
    paragraph: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  color: #1c94e0;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
