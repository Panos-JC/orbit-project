<template>
  <div class="userInfo">
    <h1 class="userInfo-name text-xs-left">{{userData.fname}} {{userData.lname}}</h1>
    <h2 class="userInfo-username text-xs-left">@{{userData.username}}</h2>
  </div>
</template>

<script>
export default {
  props: [
    'userData'
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
