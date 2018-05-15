<template>
<div>
  <v-toolbar dark color="primary" flat extended>
  </v-toolbar>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card class="card--flex-toolbar" width="640px">
          <v-container>
            <v-layout wrap>
              <v-flex xs1>
                <v-avatar>
                  <img :src="'https://api.adorable.io/avatars/285/panos.png'" alt="avatar">
                </v-avatar>
              </v-flex>
              <v-flex xs8>
                <a href="" class="account">
                  <span class="fullNameGroup">
                    <strong class="fullName">Panos J. Chatziioannou</strong>
                  </span>
                  <span class="username">@panos</span>
                </a>
              </v-flex>
              <v-flex xs3>
                <v-btn color="primary" outline round>Follow</v-btn>
              </v-flex>
              <v-flex xs12 class="text mt-3">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat unde culpa numquam corporis?</p>
              </v-flex>
              <v-flex xs12>
                <ul class="stats">
                  <li class="stat">
                    <a href="">
                      <strong>12</strong>
                      Reposts
                    </a>
                  </li>
                  <li class="stat">
                    <a href="">
                      <strong>52</strong>
                      Likes
                    </a>
                  </li>
                  <li class="avatar-row">
                    <a href="">
                      <v-avatar size="24px">
                        <img src="https://api.adorable.io/avatars/285/1.png" alt="">
                      </v-avatar>
                    </a>
                    <a href="">
                      <v-avatar size="24px">
                        <img src="https://api.adorable.io/avatars/285/2.png" alt="">
                      </v-avatar>
                    </a>
                    <a href="">
                      <v-avatar size="24px">
                        <img src="https://api.adorable.io/avatars/285/3.png" alt="">
                      </v-avatar>
                    </a>
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
          <div class="post-box" v-if="!isTextfieldFocused">
            <v-avatar class="avatar" size="32px">
              <img :src="'https://api.adorable.io/avatars/285/panos.png'" alt="avatar">
            </v-avatar>
            <v-text-field
              solo
              flat
              label="Post your reply"
            ></v-text-field>
          </div>
          <div class="post-box" v-if="isTextfieldFocused">
            <v-avatar class="avatar" size="32px">
              <img :src="'https://api.adorable.io/avatars/285/5.png'" alt="avatar">
            </v-avatar>
            <v-text-field
              solo
              flat
              multi-line
              no-resize
              counter = "140"
              label="Post your reply"
            ></v-text-field>
            <v-layout justify-end>
              <v-btn
                color="primary"
                depressed
                round
                right
                class="mb-0 mt-3"
              >Post</v-btn>
            </v-layout>
          </div>
          <v-layout wrap>
            <v-flex xs12>
              <ol class="comments">
                <li class="comment" v-for="n in 5" :key="n">
                  <div class="post">
                    <v-container class="pb-0">
                      <v-layout wrap>
                        <v-flex xs1>
                          <v-avatar class="avatar">
                            <img :src="'https://api.adorable.io/avatars/285/1.png'" alt="avatar">
                          </v-avatar>
                        </v-flex>
                        <v-flex xs11 class="post-content">
                          <a href="">
                            <div class="header">
                              <span class="fullNameGroup">
                                <strong class="fullname">John Doe</strong>
                              </span>
                              <span class="username">@j_doe</span>
                            </div>
                          </a>
                          <div class="text-container">
                            <p>You will always grow more as a person experiencing something first hand. its the fastest way to learn anything.</p>
                          </div>
                        </v-flex>
                      </v-layout>
                      <v-card-actions class="pt-0">
                        <v-btn icon>
                          <v-icon color="black">favorite_border</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-container>
                  </div>
                </li>
              </ol>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
export default {
  data () {
    return {
      isTextfieldFocused: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card--flex-toolbar {
  margin: -75px auto 0 auto
}

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
    img {
      float: left;
      margin-right: 5px;
    }
  }
}

// Input Box
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
}

// Comments
.comments {
  position: relative;
  margin-left: 0;
  list-style: none;
  .comment {
    border-bottom: 1px solid #e6ecf0;
    .post-content {
      a {
        color: #14171a;
        overflow: hidden;
        display: flex;
        text-decoration: none;
        &:hover .fullNameGroup .fullname {
          color: #3f51b5;
          text-decoration: underline;
        }
        .fullNameGroup {
          font-size: 14px;
          margin-left: 8px;
        }
        .username {
          font-size: 14px;
          color: #657786;
        }
      }
      .text-container p {
        text-align: left;
        margin-left: 8px;
        line-height: 20px;
      }
    }
  }
}
</style>
