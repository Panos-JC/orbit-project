<template>
  <v-container grid-list-md>
    <v-layout wrap>
      <v-flex xs4 v-for="user in users" :key="user._id">
        <v-card>
          <v-img
            class="white--text"
            height="100px"
            src="https://dummyimage.com/600x200/858585/ffffff"
          >
          </v-img>
          <v-card-title class="card-title">
            <div class="card-container">
              <v-avatar class="avatar" size="65">
                <img :src="'https://api.adorable.io/avatars/285/' + user.properties.username + '.png'" alt="">
              </v-avatar>
              <a href="" class="name text-xs-left">{{user.properties.fname}} {{user.properties.lname}}</a>
              <a href="" class="username text-xs-left">@{{user.properties.username}}</a>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    users: {
      type: Array
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
</style>
