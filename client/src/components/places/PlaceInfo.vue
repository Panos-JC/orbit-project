<template>
  <v-card class="info-card">
    <v-layout>
      <v-flex xs12>
        <div class="ul-wrapper">
          <ul class="ratings">
            <li class="viewRating">
              <div class="icon">
                <v-icon large color="red">favorite</v-icon>
              </div>
              <div class="number">
                <div class="rating">{{ratingToPercent}}%</div>
                <div class="votes">{{placeStats.rateCount}} votes</div>
              </div>
            </li>
            <li class="userRating">
              <div class="rated-text" v-if="placeStats.rated">
                <div class="icon">
                  <v-icon large color="red">favorite</v-icon>
                </div>
                <div class="number">
                  <div class="rating">{{placeStats.rated}}</div>
                  <div class="votes alt">Good</div>
                </div>
              </div>
              <div class="rating-text" v-if="!placeStats.rated">
                <div class="icon">
                  <v-icon large>favorite_border</v-icon>
                </div>
                <div class="number">
                  <div class="rating-question">Rate this place</div>
                  <div class="votes">What did you think?</div>
                </div>
              </div>
            </li>
          </ul>
          <ul class="stats">
            <li>
              <div class="number">
                <div class="stat">{{placeStats.visitCount}}</div>
                <div class="stat-name">visits</div>
              </div>
            </li>
            <li>
              <div class="number">
                <div class="stat">0</div>
                <div class="stat-name">comments</div>
              </div>
            </li>
            <li>
              <div class="number">
                <div class="stat">{{placeStats.interests}}</div>
                <div class="stat-name">intrested</div>
              </div>
            </li>
            <li>
              <div class="number">
                <div class="stat">0</div>
                <div class="stat-name">reviews</div>
              </div>
            </li>
          </ul>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    placeStats: {
      type: Object,
      required: true,
      default () {
        return {
          rateCount: 0,
          visitCount: 0,
          interests: 0,
          ratingAvg: 0,
          rated: false,
          visited: false
        }
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ratingToPercent () {
      return Math.round(this.placeStats.ratingAvg * 2 * 10)
    }
  }
}
</script>

<style lang="scss" scoped>
.info-card {
  text-align: left;
  .ul-wrapper {
    width: 53%;
    padding-left: 30px;
    margin: 5px auto;
  }
}

.ratings {
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-right: 40px;
  .viewRating {
    display: inline-block;
    margin: 0 30px 0 0;
    padding: 0;
    .icon {
      float: left;
      color: #F44336;
      vertical-align: top;
      margin-right: 7px;
    }
    .number {
      float: left;
      line-height: 1;
      margin-top: 5px;
      .rating {
        font-weight: 800;
        font-size: 20px;
        color: #424242;
      }
      .votes {
        font-size: 12px;
        color: #aaa;
      }
    }
  }

  .userRating {
    margin-right: 0;
    cursor: pointer;
    display: inline-block;
    margin: 0 30px 0 0;
    padding: 0;
    .rated-text {
      .icon {
        color: #F44336;
        float: left;
        vertical-align: top;
        margin-right: 7px;
      }
      .number {
        float: left;
        line-height: 1;
        margin-top: 5px;
        .rating {
          font-weight: 800;
          font-size: 20px;
          color: #424242;
          text-align: center;
        }
        .votes {
          font-size: 12px;
        }
      }
    }

    .rating-text {
      .icon {
        float: left;
        vertical-align: top;
        margin-right: 7px;
      }
      .number {
        float: left;
        line-height: 1;
        margin-top: 5px;
        .rating-question {
          font-weight: 700;
          font-size: 14px;
          padding: 2px 0;
          color: #424242;
        }
        .votes {
          font-size: 12px;
          color: #aaa;
        }
      }
    }
  }
}

.stats {
  display: inline-block;
  margin-left: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    display: inline-block;
    margin: 0 30px 0 0;
    padding: 0;
    .number {
      float: left;
      line-height: 1;
      .stat {
        font-weight: 800;
        font-size: 20px;
        color: #424242;
        text-align: center;
      }
      .stat-name {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
}
</style>
