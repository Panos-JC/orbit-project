const db = require('../config/database').db

// Private constructor
let Place = module.exports = function Place (_node) {
  this._node = _node
}

// Create country
Place.createCountry = (data, callback) => {
  const qp = {
    query: [
      'MERGE (place:Place {name: {name}, place_id: {id}, type: {type}})',
      'RETURN place'
    ].join('\n'),
    params: {
      name: data.name,
      id: data.place_id,
      type: data.type
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

// Create locality
Place.createLocality = (data, callback) => {
  const qp = {
    query: [
      'MERGE (c:Place {name: {countryName}, place_id: {countryId}, type: "country"})',
      'MERGE (l:Place {name: {localityName}, place_id: {localityId}, type: "locality"})',
      'MERGE (l)-[:LOCATED_IN]->(c)',
      'RETURN c,l'
    ].join('\n'),
    params: {
      countryName: data.country.name,
      countryId: data.country.place_id,
      localityName: data.locality.name,
      localityId: data.locality.place_id
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

// Create place
Place.createPlace = (data, callback) => {
  const qp = {
    query: [
      'MERGE (c:Place {name: {countryName}, place_id: {countryId}, type: "country"})',
      'MERGE (l:Place {name: {localityName}, place_id: {localityId}, type: "locality"})',
      'MERGE (p:Place {name: {placeName}, place_id: {placeId}, type: {placeType}})',
      'MERGE (p)-[:LOCATED_IN]->(l)',
      'MERGE (l)-[:LOCATED_IN]->(c)',
      'RETURN c,l,p'
    ].join('\n'),
    params: {
      countryName: data.country.name,
      countryId: data.country.place_id,
      localityName: data.locality.name,
      localityId: data.locality.place_id,
      placeName: data.place.name,
      placeId: data.place.place_id,
      placeType: data.place.type
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

// add visited relationship between a user and a place
Place.visit = (placeId, username, callback) => {
  const qp = {
    query: [
      'MERGE (place:Place {place_id: {placeId}})',
      'WITH place',
      'MATCH (user:User {username: {username}})',
      'MERGE (user)-[:VISITED]->(place)',
      'RETURN place, user'
    ].join('\n'),
    params: {
      placeId,
      username
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

// add user's rating for a place
Place.rate = (placeId, username, rating, callback) => {
  const qp = {
    query: [
      'MERGE (place:Place {place_id: {placeId}})',
      'WITH place',
      'MATCH (user:User {username: {username}})',
      'MERGE (user)-[:RATED {rating: {rating}}]->(place)',
      'RETURN place, user'
    ].join('\n'),
    params: {
      placeId,
      username,
      rating: parseInt(rating)
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

// create interest post
Place.interest = (placeId, username, postContent, callback) => {
  const qp = {
    query: [
      'MERGE (id:UniqueId {name: "Post"})',
      'ON CREATE SET id.count = 1',
      'ON MATCH SET id.count = id.count + 1',
      'WITH id.count AS uid',
      'MERGE (place:Place {place_id: {placeId}})',
      'WITH place, uid',
      'MATCH (user:User {username: {username}})',
      'CREATE (post:Post {id: uid, content: {postContent}})',
      'CREATE (user)-[:POSTED {timestamp: timestamp()}]->(post)-[:INTERESTED_IN]->(place)',
      'RETURN place, user, post'
    ].join('\n'),
    params: {
      placeId,
      username,
      postContent
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    callback(null, result)
  })
}
