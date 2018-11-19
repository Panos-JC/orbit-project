const db = require('../config/database').db

// Private constructor
let Place = module.exports = function Place (_node) {
  this._node = _node
}

// Create country
Place.createCountry = (data, callback) => {
  const qp = {
    query: [
      'MERGE (place:Place {name: {name}, place_id: {id}, type: {type}, lat: {lat}, lng: {lng}})',
      'RETURN place'
    ].join('\n'),
    params: {
      name: data.name,
      id: data.place_id,
      type: data.type,
      lat: data.lat,
      lng: data.lng
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
      'MERGE (c:Place {name: {countryName}, place_id: {countryId}, type: "country", lat: {countryLat}, lng: {countryLng}})',
      'MERGE (l:Place {name: {localityName}, place_id: {localityId}, type: "locality", lat: {localityLat}, lng: {localityLng}})',
      'MERGE (l)-[:LOCATED_IN]->(c)',
      'RETURN c,l'
    ].join('\n'),
    params: {
      countryName: data.country.name,
      countryId: data.country.place_id,
      countryLat: data.country.lat,
      countryLng: data.country.lng,
      localityName: data.locality.name,
      localityId: data.locality.place_id,
      localityLat: data.locality.lat,
      localityLng: data.locality.lng
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
      'MERGE (c:Place {name: {countryName}, place_id: {countryId}, type: "country", lat: {countryLat}, lng: {countryLng}})',
      'MERGE (l:Place {name: {localityName}, place_id: {localityId}, type: "locality", lat: {localityLat}, lng: {localityLng}})',
      'MERGE (p:Place {name: {placeName}, place_id: {placeId}, type: {placeType}, lat: {placeLat}, lng: {placeLng}})',
      'MERGE (p)-[:LOCATED_IN]->(l)',
      'MERGE (l)-[:LOCATED_IN]->(c)',
      'RETURN c,l,p'
    ].join('\n'),
    params: {
      countryName: data.country.name,
      countryId: data.country.place_id,
      countryLat: data.country.lat,
      countryLng: data.country.lng,
      localityName: data.locality.name,
      localityId: data.locality.place_id,
      localityLat: data.locality.lat,
      localityLng: data.locality.lng,
      placeName: data.place.name,
      placeId: data.place.place_id,
      placeType: data.place.type,
      placeLat: data.place.lat,
      placeLng: data.place.lng
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

// Get place stats
Place.getStats = (placeId, callback) => {
  const qp = {
    query: [
      'MATCH (place:Place {place_id: {placeId}})',
      'OPTIONAL MATCH (place)<-[r:RATED]-()',
      'OPTIONAL MATCH (place)<-[i:INTERESTED_IN]-()',
      'OPTIONAL MATCH (place)<-[v:VISITED]-()',
      'RETURN count(DISTINCT i) AS interested,',
      '       count(DISTINCT v) AS visited,',
      '       count(DISTINCT r) AS rated,',
      '       avg(r.rating) AS ratingAvg'
    ].join('\n'),
    params: { placeId }
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    callback(null, result[0])
  })
}

// Add user's home location
Place.addHomeLocation = (data, username, callback) => {
  const qp = {
    query: [
      'MATCH (user:User {username: {username}})',
      'MERGE (place:Place {place_id: {place_id}})',
      'ON CREATE SET place += {data}',
      'MERGE (user)-[:LIVES_IN]->(place)',
      'RETURN place.name AS name'
    ].join('\n'),
    params: {
      username,
      data,
      place_id: data.place_id
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    callback(null, result[0])
  })
}
