require('dotenv').config()
const request = require('request')
const fetch = require('node-fetch')

const apiKey = process.env.API_KEY

// search place
function search (req, res) {
  const query = req.body.query
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`
  request(url, (error, response, body) => {
    if (error) res.status('400').send(error)

    res.send(body)
  })
}

// get place by name
function getPlaceByName (req, res) {
  const placeName = req.params.placeName
  let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&fields=name,place_id&inputtype=textquery&key=${apiKey}`
  request(url, (error, response, body) => {
    if (error) res.status('400').send(error)

    res.send(body)
  })
}

/**
 * Sends a place's information to the frontend including any places it is located in.
 * @param {object} req The request object
 * @param {object} res The response object
 */
async function getPlace (req, res) {
  const placeId = req.params.placeId

  let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`
  try {
    const response = await fetch(url)
    const json = await response.json()

    let place = {
      place_id: json.result.place_id,
      name: json.result.name,
      lat: json.result.geometry.location.lat,
      lng: json.result.geometry.location.lng,
      type: json.result.types[0],
      vicinity: json.result.vicinity,
      rating: json.result.rating,
      photo_reference: json.result.photos[0].photo_reference
    }

    if (json.result.types.includes('locality')) {
      place.country = await getCountry(json.result.address_components)
    } else if (json.result.types.includes('establishment')) {
      place.country = await getCountry(json.result.address_components)
      console.log(place.country.name)
      place.locality = await getLocality(json.result.address_components, place.country.name)
    }
    res.send(place)
  } catch (error) {
    console.log(error)
    res.status('400').send(error)
  }
}

/**
 * Returns information about the city or town a place is located in
 * @param {array} placeAddressComponents An array of the address components of a place given by Google Places API
 * @param {string} countryName The name of the country the city is located in.
 * @return {object} An object containing the information
 */
async function getLocality (placeAddressComponents, countryName) {
  let placeLocality = {}

  for (let i = 0; i < placeAddressComponents.length; i++) {
    if (placeAddressComponents[i].types[0].indexOf('administrative_area_level') > -1 ||
    placeAddressComponents[i].types.includes('locality') ||
    placeAddressComponents[i].types.includes('postal_town')) {
      // Fetch the locality data
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeAddressComponents[i].long_name}+${countryName}&key=${apiKey}`
      const response = await fetch(url)
      const json = await response.json()

      const locality = json.results[0]

      if (locality.types.includes('locality')) {
        placeLocality = {
          place_id: locality.place_id,
          name: locality.name,
          lat: locality.geometry.location.lat,
          lng: locality.geometry.location.lng,
          type: locality.types[0],
          photo_reference: locality.photos[0].photo_reference
        }
        break
      }
    }
  }

  return placeLocality
}

/**
 * Returns information about the country a place is located in
 * @param {array} placeAddressComponents An array of the address components of a place given by Google Places API
 * @return {object} An object containing the information
 */
async function getCountry (placeAddressComponents) {
  let placeCountry = {}

  for (let i = 0; i < placeAddressComponents.length; i++) {
    if (placeAddressComponents[i].types.includes('country')) {
      // Fetch the country data
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeAddressComponents[i].long_name}&key=${apiKey}`
      const response = await fetch(url)
      const json = await response.json()

      const country = json.results[0]

      placeCountry = {
        place_id: country.place_id,
        name: country.name,
        lat: country.geometry.location.lat,
        lng: country.geometry.location.lng,
        type: country.types[0],
        photo_reference: country.photos[0].photo_reference
      }
      break
    }
  }

  return placeCountry
}

module.exports = {
  search,
  getPlace,
  getPlaceByName
}
