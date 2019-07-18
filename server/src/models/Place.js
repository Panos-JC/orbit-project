const db = require('../config/database').db

// Private constructor
let Place = module.exports = function Place (_node) {
  this._node = _node
}

/**
 * Merges a country. If the country is created, sets its properties.
 * @param {object} data An object containing the country properties
 * @param {function} callback A callback function
 */
Place.createCountry = (data, callback) => {
  console.log(data)
  const qp = {
    query: [
      'MERGE (c:Place {place_id: {id}})',
      'ON CREATE SET c += {data}',
      'RETURN c'
    ].join('\n'),
    params: {
      id: data.place_id,
      data
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

/**
 * Merges a locality type place and the country it is located in.
 * @param {object} countryData An object containing the country properties
 * @param {object} localityData An object containing the locality properties
 * @param {function} callback A callback function
 */
Place.createLocality = (countryData, localityData, callback) => {
  const qp = {
    query: [
      'MERGE (c:Place {place_id: {countryId}})',
      'ON CREATE SET c += {countryData}',
      'MERGE (l:Place {place_id: {localityId}})',
      'ON CREATE SET l += {localityData}',
      'MERGE (l)-[:LOCATED_IN]->(c)',
      'RETURN c, l'
    ].join('\n'),
    params: {
      countryId: countryData.place_id,
      countryData,
      localityId: localityData.place_id,
      localityData
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

/**
 * Merges an establishment type place, the locality and the country is is located in.
 * @param {object} countryData An object containing the country's properties
 * @param {object} localityData An object containing the locality's properties
 * @param {object} placeData An object containing the establishment's properties
 * @param {function} callback A callback function
 */
Place.createPlace = (countryData, localityData, placeData, callback) => {
  const qp = {
    query: [
      'MERGE (c:Place {place_id: {countryId}})',
      'ON CREATE SET c += {countryData}',
      'MERGE (l:Place {place_id: {localityId}})',
      'ON CREATE SET l += {localityData}',
      'MERGE (p:Place {place_id: {placeId}})',
      'ON CREATE SET p += {placeData}',
      'MERGE (l)-[:LOCATED_IN]->(c)',
      'MERGE (p)-[:LOCATED_IN]->(l)',
      'RETURN c,l,p'
    ].join('\n'),
    params: {
      countryId: countryData.place_id,
      localityId: localityData.place_id,
      placeId: placeData.place_id,
      countryData,
      localityData,
      placeData
    }
  }

  db.cypher(qp, (err, result) => {
    if (err) return callback(err)
    callback(null, result)
  })
}

/**
 * Creates the VISITED relationship between a user and a place
 * @param {string} placeId The id of the place
 * @param {string} username The username of the user
 * @param {function} callback A callback function
 */
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

/**
 * Creates the RATED relationship between a user and a place
 * @param {string} placeId The id of the place
 * @param {string} username The username of the user
 * @param {string} rating The rating of the place by the user
 * @param {function} callback A callback function
 */
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

/**
 * Creates a post indicating that a user is interested in a place
 * @param {string} placeId The id of the place
 * @param {string} username The username of the user
 * @param {string} postContent The text of the post
 * @param {function} callback A callback function
 */
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

/**
 * Returns information about a place. These information include how many visits or ratings
 * does a place have and weather or not a user has visited rated or is interested in this place.
 * @param {string} placeId The google id of the place.
 * @param {string} username The username of the logged in user.
 * @param {function} callback A callback function.
 */
Place.getStats = (placeId, username, callback) => {
  const qp = {
    query: [
      'MATCH (place:Place {place_id: {placeId}})',
      'MATCH (user:User {username: {username}})',
      'OPTIONAL MATCH (user)-[r1:RATED]->(place)',
      'WITH place, user, r1',
      'OPTIONAL MATCH (place)<-[r:RATED]-(rateUsers)',
      'WITH place,',
      '     user,',
      '     r1,',
      '     count(DISTINCT rateUsers) AS rateCount,',
      '     avg(r.rating) AS ratingAvg,',
      '     collect(rateUsers.username) AS ratings',
      'OPTIONAL MATCH (place)<-[:VISITED]-(visitUsers)',
      'WITH place,',
      '     user,',
      '     r1,',
      '     rateCount,',
      '     ratingAvg,',
      '     ratings,',
      '     count(DISTINCT visitUsers) AS visitCount,',
      '     collect(visitUsers.username) AS visits',
      'OPTIONAL MATCH (place)<-[:INTERESTED_IN]-(interestPost)<-[:POSTED]-(interestUsers)',
      'WITH user,',
      '     r1,',
      '     rateCount,',
      '     visitCount,',
      '     ratingAvg,',
      '     count(DISTINCT interestUsers) AS interestCount,',
      '     collect(interestUsers.username) AS interests,',
      '     ratings,',
      '     visits',
      'RETURN rateCount,',
      '       visitCount,',
      '       interestCount,',
      '       ratingAvg,',
      '       CASE WHEN user.username IN ratings THEN r1.rating ELSE false END AS rated,',
      '       CASE WHEN user.username IN visits THEN true ELSE false END AS visited,',
      '       CASE WHEN user.username IN interests THEN true ELSE false END AS interested'
    ].join('\n'),
    params: { placeId, username }
  }

  db.cypher(qp, (err, result) => {
    if (err) callback(err)
    callback(null, result)
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
