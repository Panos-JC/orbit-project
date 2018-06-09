<template>
  <div class="userInfo" v-if="userInfo">
    <h1 class="userInfo-name text-xs-left">{{userInfo.fname}} {{userInfo.lname}}</h1>
    <h2 class="userInfo-username text-xs-left">@{{userInfo.username}}</h2>
  </div>
</template>

<script>
export default {
  props: [
    'userInfo'
  ]
}
</script>

<style lang="scss" scoped>
.userInfo {
  margin-top: 40px;
  .userInfo-name {
    line-height: 1;
    font-size: 21px;
  }

  .userInfo-username {
    font-size: 14px;
    line-height: 20px;
    color: #66757f;
  }
}
</style>
