const Place = require('../models/Place')

module.exports = {
  async createPlace (req, res) {
    if (req.body.type === 'country') {
      await Place.createCountry(req.body, (err, country) => {
        if (err) res.status(400).send(err)
        res.send(country)
      })
    } else if (req.body.type === 'locality') {
      const countryData = req.body.country
      delete req.body.country

      await Place.createLocality(countryData, req.body, (err, locality) => {
        if (err) res.status(400).send(err)
        res.send(locality)
      })
    } else {
      const countryData = req.body.country
      const localityData = req.body.locality

      delete req.body.country
      delete req.body.locality

      await Place.createPlace(countryData, localityData, req.body, (err, place) => {
        if (err) res.status(400).send(err)
        res.send(place)
      })
    }
  },

  async visit (req, res) {
    await Place.visit(req.body.placeId, req.body.username, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  },

  async rate (req, res) {
    await Place.rate(req.body.placeId, req.body.username, req.body.rating, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  },

  async interest (req, res) {
    await Place.interest(req.body.placeId, req.body.username, req.body.postContent, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  },

  /**
   * Calls the getStats method from the Place model and sends the data. If no data is returned,
   * sends an initialized object.
   * @param {object} req The request object
   * @param {object} res The response object
   */
  async getStats (req, res) {
    await Place.getStats(req.params.placeId, req.body.username, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else if (result.length < 1) {
        res.send({
          rateCount: 0,
          visitCount: 0,
          interests: 0,
          ratingAvg: 0,
          rated: false,
          visited: false
        })
      } else {
        res.send(result[0])
      }
    })
  },

  async friendsVisited (req, res) {
    await Place.friendsVisited(req.body.placeId, req.body.username, (err, result) => {
      if (err) res.status(400).send(err)
      res.send(result)
    })
  }
}
