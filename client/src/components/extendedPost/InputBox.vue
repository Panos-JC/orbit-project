<template>
  <div class="post-box">
    <v-avatar class="avatar" size="32px">
      <img :src="'https://api.adorable.io/avatars/285/'+ $store.state.user.properties.username +'.png'" alt="avatar">
    </v-avatar>
    <v-textarea
      solo
      flat
      no-resize
      counter = "140"
      label="Post your reply"
      class="tf"
      v-model="replytext"
    ></v-textarea>
    <v-layout justify-end>
      <v-btn
        color="primary"
        depressed
        round
        right
        class="mb-0 mt-3"
        @click="reply"
      >Post</v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      replytext: ''
    }
  },
  methods: {
    reply () {
      let reply = {
        content: this.replytext,
        fname: this.$store.state.user.properties.fname,
        lname: this.$store.state.user.properties.lname,
        username: this.$store.state.user.properties.username,
        likes: 0,
        reposts: 0
      }
      this.$emit('reply', reply)
    }
  },
  props: [
    'poster'
  ]
}
</script>

<style lang="scss" scoped>
.post-box {
  background-color: #f5f8fa;
  padding: 15px 40px 15px 95px;
  border-top: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
  position: relative;

  .avatar {
    position: absolute;
    display: block;
    top: 22px;
    left: 30px;
  }

  .tf {
    border: 2px solid #A4D9F9;
    border-radius: 10px;
  }
}
</style>
