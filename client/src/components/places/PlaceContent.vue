<template>
<div>
  <v-layout wrap>
    <v-flex xs12 v-for="review in reviews" :key="review.time">
      <v-card>
        <v-container>
          <v-layout wrap>
            <v-flex xs1>
              <a :href="review.author_url">
                <v-avatar>
                  <img :src="review.profile_photo_url" alt="avatar">
                </v-avatar>
              </a>
            </v-flex>
            <v-flex xs11>
              <div class="post-header ml-3">
                <a :href="review.author_url" class="post-header-link text-xs-left">
                  <span class="fullNameGroup text-xs-left">
                  <strong class="fullName text-xs-left">
                    {{review.author_name}}
                  </strong>
                  </span>
                  <!-- <span class="username">@{{postData.poster.username}}</span> -->
                  <small class="rating">{{review.rating}}/5</small>
                </a>
              </div>
              <div class="post-container ml-3">
                <p class="postText text-xs-left mb-1">
                  {{review.text}}
                </p>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
export default {
  props: {
    reviews: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.post-header-link {
  display: block;
  text-decoration: none;
}

.post-header:hover .fullName{
  text-decoration: underline;
  color: #3f51b5
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

    &:hover {
      text-decoration: underline;
      color: #3f51b5
    }
  }
}

small.rating {
  color: #657786;
  white-space: nowrap;
  margin-left: 5px;
}
</style>
