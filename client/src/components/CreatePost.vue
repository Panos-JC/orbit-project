<template>
  <v-dialog v-model="dialog" max-width="500px" style="background-color: red">
    <v-btn fab dark bottom right fixed color="red" slot="activator">
      <v-icon dark>add</v-icon>
    </v-btn>
    <v-card color="cyan" dark id="lol">
      <v-card-title>
        <span class="headline">Create Post</span>
      </v-card-title>
      <v-card-text>
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
        <!-- <v-text-field
          :rules="[(v) => v.length <= 140 || 'Max 140 characters']"
          :counter = "140"
          v-model="post"
          class="text"
          name="input-1"
          label="What's happening?"
          multi-line
          no-resize
          solo
          flat
          light
        ></v-text-field> -->
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat round @click.native="dialog = false">Cancel</v-btn>
        <v-btn color="primary" depressed round dark @click="createPost">Post</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import PostService from '@/services/PostService'
import At from 'vue-at'

export default {
  data () {
    return {
      dialog: false,
      post: '',
      postData: {}
    }
  },
  methods: {
    // Get tags from post
    getTags () {
      return this.post.match(/(#)\w+/g)
    },
    // Get mentions from post and remove the @ symbol
    getMentions () {
      let mentions = this.post.match(/(@)\w+/g)
      if (mentions) {
        for (let i = 0; i < mentions.length; i++) {
          mentions[i] = mentions[i].slice(1)
        }
      }
      return mentions
    },
    async createPost () {
      try {
        const data = {
          username: this.$store.state.user.properties.username,
          content: this.post,
          tags: this.getTags(),
          mentions: this.getMentions()
        }

        console.log(data)

        // Create post
        const response = (await PostService.create(data)).data
        console.log(response)

        this.dialog = false
        this.$emit('isCreated')
      } catch (error) {
        this.$emit('isNotCreated')
      }
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
.v-dialog {
  background: red!important;
}
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
