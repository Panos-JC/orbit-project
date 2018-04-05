<template>
<v-layout column>
  <v-flex xs12>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs2>
            <v-avatar size="35" class="avatar-top">
              <img src="https://api.adorable.io/avatars/285/panos.png" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex xs10 class="input pr-5">
            <v-text-field
            class="post-input"
              name="input-1"
              label="What's happening?"
              id="testing"
              multi-line
              no-resize
            ></v-text-field>
            <v-btn depressed round color="primary" class="post-btn">Post</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
  <v-flex xs12 v-for="n in 5" :key="n">
    <v-card hover>
      <v-container>
        <v-layout>
          <v-flex xs1>
            <v-avatar>
              <img src="https://api.adorable.io/avatars/285/panos.png" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex xs11>
            <div class="post-header ml-3">
              <a href="" class="post-header-link text-xs-left">
                <span class="fullNameGroup text-xs-left">
                <strong class="fullName text-xs-left">
                  Panos Chatz
                </strong>
                </span>
                <span class="username">@panos</span>
                <small class="date">15h</small>
              </a>
            </div>
            <div class="post-container ml-3">
              <p class="postText text-xs-left">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus dolorem beatae magnam reiciendis consequatur cupiditate magni officia est, minima cum inventore quasi voluptate blanditiis molestias voluptatem, recusandae omnis sit veniam?</p>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.avatar-top > img {
  position: absolute;
  top: 20px;
}

.post-btn {
  float: right;
}

.post-header-link {
  display: block;
  text-decoration: none;
}

.fullNameGroup {
  max-width: 100%;
  .fullName {
    word-break: break-all;
    color: #14171a;
    font-size: 14px;
    font-weight: bold;
    max-width: 100%;
    overflow: hidden!important;
    white-space: nowrap!important;
    word-wrap: normal!important;
  }
}

.username {
  margin-left: 5px;
  font-size: 14px;
  color: #657789;
  text-align: left;
  max-width: 100%;
  overflow: hidden!important;
  text-overflow: ellipsis!important;
  white-space: nowrap!important;
  word-wrap: normal!important;
}

small.date {
  color: #657786;
  white-space: nowrap;
  margin-left: 5px;
}
</style>
