const Place = require('../models/Place')

module.exports = {
  async createCountry (req, res, next) {
    await Place.createCountry(req.body.data, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  },

  async createLocality (req, res, next) {
    await Place.createLocality(req.body.data, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
  },

  async createPlace (req, res, next) {
    await Place.createPlace(req.body.data, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    })
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
  }
}
