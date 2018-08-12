<template>
<v-card class="card">
  <div class="trends-container">
    <div class="header">
      <h3>Popular tags</h3>
    </div>
    <div class="content">
      <ul class="trend-items pl-0">
        <li class="trend-item" v-for="tag in tags" :key="tag.name">
          <a :href="`#/tags/${tag.name.substr(1)}`">
            <span class="trend-name">{{tag.name}}</span>
            <div class="trend-item-stats">{{tag.count}} Posts</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</v-card>
</template>

<script>
import TagService from '@/services/TagService'

export default {
  data () {
    return {
      tags: []
    }
  },
  async created () {
    this.tags = (await TagService.getPopularTags()).data
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 15px;
}
.header {
  line-height: 20px;
  margin-bottom: 10px;
  text-align: left;
  h3 {
    font-size: 18px;
    font-weight: bold;
  }
}

.content {
  color: #657786;
  font-size: 12px;
  text-align: left;
  .trend-items {
    margin-top: -4px;
    list-style: none;
    .trend-item {
      line-height: 17px;
      margin-bottom: 10px;
      font-size: 14px;
      word-wrap: break-word;
      a {
        display: block;
        text-decoration: none;
        color: #1b95e0;
        &:hover .trend-name{
          text-decoration: underline;
        }
        .trend-name {
          font-weight: bold;
        }
        .trend-item-stats {
          color: #657786;
          font-size: 12px;
          line-height: 16px;
          overflow: hidden;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
