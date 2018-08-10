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
  }
}
