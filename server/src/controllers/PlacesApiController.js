const request = require('request')

const apiKey = 'AIzaSyBBbWdvzj7X7wbMFQWQnXA_lWaXFVIwykc'

module.exports = {
  search (req, res, next) {
    const query = req.body.query
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`
    request(url, (error, response, body) => {
      if (error) {
        res.status('400').send(error)
      } else {
        res.send(body)
      }
    })
  },

  getPlace (req, res, next) {
    const placeId = req.params.placeId
    let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`
    request(url, (error, response, body) => {
      if (error) {
        res.status('400').send(error)
      } else {
        res.send(body)
      }
    })
  }
}
