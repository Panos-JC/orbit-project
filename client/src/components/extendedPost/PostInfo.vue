<template>
  <v-container v-if="post">
    <v-layout wrap>
      <v-flex xs1>
        <v-avatar>
          <img :src="'https://api.adorable.io/avatars/285/'+ post.username +'.png'" alt="avatar">
        </v-avatar>
      </v-flex>
      <v-flex xs8>
        <a href="" class="account">
          <span class="fullNameGroup">
            <strong class="fullName">{{post.fname}} {{post.lname}}</strong>
          </span>
          <span class="username">@{{post.username}}</span>
        </a>
      </v-flex>
      <v-flex xs3>
        <v-btn color="primary" outline round>Follow</v-btn>
      </v-flex>
      <v-flex xs12 class="text mt-3">
        <post-content :paragraph="post.content"></post-content>
      </v-flex>
      <v-flex xs12>
        <ul class="stats">
          <li class="stat">
            <a href="">
              <strong>{{post.reposts}}</strong>
              Reposts
            </a>
          </li>
          <li class="stat">
            <a href="">
              <strong>{{post.likes}}</strong>
              Likes
            </a>
          </li>
          <li class="avatar-row">
            <template v-for="liker in post.liked">
              <a href="" :key="liker" class="likerAvatar">
                <v-avatar size="24px">
                  <img :src="'https://api.adorable.io/avatars/285/'+ liker +'.png'" alt="">
                </v-avatar>
              </a>
            </template>
          </li>
        </ul>
      </v-flex>
      <v-flex xs12>
        <v-card-actions>
          <v-btn icon>
            <v-icon color="black">reply</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="black">repeat</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="black">favorite_border</v-icon>
          </v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PostContent from '@/components/PostContent'

export default {
  props: [
    'post'
  ],
  components: {
    PostContent
  }
}
</script>

<style lang="scss" scoped>
a.account {
  text-decoration: none;
  &:hover .fullNameGroup .fullName {
    color: #3f51b5;
    text-decoration: underline;
  }
  .fullNameGroup {
    margin-left: 5px;
    display: flex;
    color: #14171a;
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
  }

  .username {
    margin-left: 5px;
    font-size: 14px;
    color: #657786;
    display: flex;
  }
}

.text {
  font-size: 27px;
  line-height: 32px;
  letter-spacing: .01em;
  text-align: left;
}

.stats {
  border-bottom: 1px solid #e6ecf0;
  border-top: 1px solid #e6ecf0;
  width: 100%;
  overflow: hidden;
  margin: 0;
  list-style: none;
  padding: 0;

  .stat {
    margin-right: 10px;
    overflow: hidden;
    display: block;
    float: left;
    a {
      font-size: 14px;
      font-weight: normal;
      padding-right: 0;
      padding-top: 12px;
      width: auto;
      float: left;
      color: #657786;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
        color: #1DA1F2;
      }
    }
  }

  .avatar-row {
    display: block;
    float: left;
    overflow: hidden;
    padding: 11px 0 11px 12px;
    border-left: 1px solid #e6ecf0;
    .likerAvatar {
      margin-right: 5px
    }
    img {
      float: left;
      margin-right: 5px;
    }
  }
}
</style>
