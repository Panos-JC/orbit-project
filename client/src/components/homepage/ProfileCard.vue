<template>
<v-card v-if="$store.state.isUserLoggedIn">
  <v-card-media
    class="white--text"
    height="100px"
    src="https://dummyimage.com/600x200/858585/ffffff"
  >
  </v-card-media>
  <v-card-title class="card-title">
    <div class="card-container">
      <v-avatar class="avatar" size="65">
        <img :src="'https://api.adorable.io/avatars/285/' + $store.state.user.properties.username + '.png'" alt="">
      </v-avatar>
      <a href="" class="name text-xs-left">{{$store.state.user.properties.fname}} {{$store.state.user.properties.lname}}</a>
      <a href="" class="username text-xs-left">@{{$store.state.user.properties.username}}</a>
    </div>
  </v-card-title>
  <v-card-actions class="actions">
    <ul class="stats">
      <li class="stat">
        <a href="">
          <span class="stat-label">Posts</span>
          <span class="stat-value">4</span>
        </a>
      </li>
      <li class="stat">
        <a href="">
          <span class="stat-label">Following</span>
          <span class="stat-value">51</span>
        </a>
      </li>
      <li class="stat">
        <a href="">
          <span class="stat-label">Followers</span>
          <span class="stat-value">126</span>
        </a>
      </li>
    </ul>
  </v-card-actions>
</v-card>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.card-title {
  padding: 10px;
}
.card-container {
  position: relative;

  .name {
    display: block;
    color: #14171a;
    text-decoration: none;
    margin-left: 80px;
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
    margin-left: 80px;
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

.actions {
  .stats {
    list-style: none;
    box-sizing: border-box;
    display: table;
    margin: 0;
    min-width: 100%;
    padding: 0;
    .stat {
      width: 1%;
      vertical-align: bottom;
      display: table-cell;
      padding: 0;
      box-sizing: border-box;
      line-height: 1;
      overflow: hidden;
      a {
        color: #1b95e0;
        text-decoration: none!important;
        display: block!important;
        &:hover .stat-label {
          color: #1b95e0;
        }
      }
      .stat-label {
        color: #657786;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: .02em;
        line-height: 16px;
        overflow: hidden;
        display: block!important;
        transition: color .15s ease-in-out;
      }
      .stat-value {
        display: block;
        font-size: 18px;
        font-weight: bold;
        padding-top: 3px;
        color: #1b95e0;
      }
    }
  }
}
</style>
