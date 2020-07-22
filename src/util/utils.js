
const getGeocodeURL = (lat, long) => { 
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1Ijoic2hyZWRoZWFkMjEiLCJhIjoiY2tjZmxyZnZyMGhxMzJwcDZiMThsdTRmbSJ9.nkPCY4JFkwtuET-JO54Gug`
}

const getWeatherstackURL = (lat, long) => {
    return `http://api.weatherstack.com/current?access_key=c88aa39b1209c0356ebc119f4c386865&query=${lat},${long}`
}
module.exports = ({
    getGeocodeURL,
    getWeatherstackURL
})

