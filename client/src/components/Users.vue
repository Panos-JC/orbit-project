<template>
<v-container grid-list-md>
  <v-layout wrap>
    <v-flex xs3 v-for="user in users" :key="user">
      <v-card>
        <v-card-media
          class="white--text"
          height="100px"
          src="https://dummyimage.com/600x200/858585/ffffff"
        >
        </v-card-media>
        <v-card-title class="card-title">
          <div class="card-container">
            <v-avatar class="avatar" size="65">
              <img :src="'https://api.adorable.io/avatars/285/' + user.user.properties.username + 'panos.png'" alt="">
            </v-avatar>
            <a href="" class="name text-xs-left">{{user.user.properties.fname}} {{user.user.properties.lname}}</a>
            <a href="" class="username text-xs-left">@{{user.user.properties.username}}</a>
          </div>
          <v-btn v-if="!following" small outline round color="primary" class="follow">Follow</v-btn>
          <v-btn v-if="following" small depressed round color="primary" class="follow following" v-on:mouseover="word='Unfollow'" @mouseleave="word='Following'">{{word}}</v-btn>
        </v-card-title>
        <v-card-actions class="actions">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import UsersService from '@/services/UsersService'

export default {
  data () {
    return {
      following: false,
      word: 'Following',
      users: null
    }
  },
  async mounted () {
    this.users = (await UsersService.index()).data
    console.log(this.users[0].user.properties)
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
