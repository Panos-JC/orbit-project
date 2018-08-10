<template>
  <at :members="members" v-model="post" name-key="username">
    <template class="temp" slot="item" slot-scope="s">
      <v-avatar class="avatar mr-2" size="25px">
        <img :src="'https://api.adorable.io/avatars/285/'+ s.item.username +'.png'" alt="avatar">
      </v-avatar>
      <span v-text="s.item.username"></span>
    </template>
    <div contenteditable data-text="Post your reply..." class="editor"></div>
  </at>
</template>

<script>
import At from 'vue-at'

export default {
  data () {
    return {
      post: ''
    }
  },
  watch: {
    post: function () {
      this.$emit('postChange', this.post)
    }
  },
  computed: {
    members () {
      let members = []

      for (let i = 0; i < this.$store.state.following.length; i++) {
        let member = {username: ''}
        member.username = this.$store.state.following[i]
        members[i] = member
      }
      return members
    }
  },
  components: {
    At
  }
}
</script>

<style lang="scss" scoped>
.editor {
  color: black;
  overflow: auto;
  background: white;
  width: 100%;
  height: 140px;
  padding: 8px 16px;
  font-size: 16px;
  resize: none;
  text-align: left;
  &:focus {
    outline: none;
  }
}

[contenteditable=true]:empty:not(:focus):before {
  content:attr(data-text);
  color: gray;
}
</style>
