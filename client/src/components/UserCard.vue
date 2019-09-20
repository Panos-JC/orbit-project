<template>
  <v-card>
    <img
      height="100%"
      width="100%"
      src="https://dummyimage.com/500x200/545454/8c8c8c"
    >
    <v-card-title class="card-title">
      <div class="card-container">
        <v-avatar class="avatar" size="65">
          <img :src="'https://api.adorable.io/avatars/285/' + user.username + '.png'" alt="">
        </v-avatar>
        <a :href="'#/users/' + user.username" class="name text-xs-left">{{user.fname}} {{user.lname}}</a>
        <a href="" class="username text-xs-left">@{{user.username}}</a>
      </div>
      <!-- Follow button -->
      <v-btn
        small
        outline
        round
        color="primary"
        class="follow"
        @click="follow"
        v-if="!user.isFriend"
      >
        Follow
      </v-btn>
      <!-- Unfollow button -->
      <v-btn
        small
        depressed
        round
        color="primary"
        class="follow following"
        @click="unfollow"
        v-if="user.isFriend"
      >
        Following
      </v-btn>
    </v-card-title>
    <v-card-actions class="actions">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </v-card-actions>
  </v-card>
</template>

<script>
import UsersService from '@/services/UsersService'

export default {
  props: {
    initialUser: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      user: this.initialUser,
      message: ''
    }
  },
  methods: {
    // Follow user
    async follow () {
      const data = {
        user1: this.$store.state.user.properties.username,
        user2: this.user.username
      }

      try {
        // follow user
        this.message = (await UsersService.follow(data)).data

        this.user.isFriend = true

        this.$emit('success', 'follow')
      } catch (error) {
        console.log('Error: Not followed')
        this.$emit('error')
      }
    },

    async unfollow () {
      const data = {
        user1: this.$store.state.user.properties.username,
        user2: this.user.username
      }
      try {
        // unfollow user
        this.message = (await UsersService.unfollow(data)).data

        this.user.isFriend = false

        this.$emit('success', 'unfollow')
      } catch (error) {
        console.log('Error: Did not unfollow')
        this.$emit('error')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-title {
  padding: 10px;
}
.card-container {
  position: relative;
  max-width: 60%;

  .name {
    display: block;
    color: #14171a;
    text-decoration: none;
    margin-top: 30px;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    max-width: 100%;
    overflow: hidden!important;
    text-overflow: ellipsis!important;
    white-space: nowrap!important;
    word-wrap: normal!important;
    &:hover {
      text-decoration: underline;
    }
  }
  .username {
    display: block;
    font-size: 12px;
    padding-right: 12px;
    color: #66757f;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

.avatar {
  position: absolute;
  top: -40px;
  left: 0;
  img {
    border: 3px solid #fff;
  }
}

.follow {
  position: absolute;
  right: 10px;
  font-size: 11px;
}

.following {
  &:hover {
    background-color: #ac002b!important;
    content: "ela";
  }
}
</style>
