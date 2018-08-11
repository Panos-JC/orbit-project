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
                <div class="rating">{{ratingPercentage}}%</div>
                <div class="votes">{{votes}} votes</div>
              </div>
            </li>
            <li class="userRating">
              <div class="rated-text" v-if="rated">
                <div class="icon">
                  <v-icon large color="red">favorite</v-icon>
                </div>
                <div class="number">
                  <div class="rating">{{userRating}}</div>
                  <div class="votes alt">Good</div>
                </div>
              </div>
              <div class="rating-text" v-if="!rated">
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
                <div class="stat">{{visits}}</div>
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
                <div class="stat">{{interested}}</div>
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
import PlacesService from '@/services/PlacesService'

export default {
  data () {
    return {
      visits: 0,
      interested: 0,
      rating: 0,
      votes: 0
    }
  },
  async created () {
    const response = (await PlacesService.getStats(this.placeId)).data
    this.interested = response.interested
    this.visits = response.visited
    this.votes = response.rated
    this.rating = response.ratingAvg
    console.log(response)
  },
  computed: {
    ratingPercentage () {
      return this.rating * 2 * 10
    }
  },
  props: {
    rated: {
      type: Boolean,
      required: true
    },
    userRating: {
      required: true
    },
    placeId: {
      required: true
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
