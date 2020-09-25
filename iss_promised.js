const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  let locationData = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${locationData.data.latitude}&lon=${locationData.data.longitude}`);
};

const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

const printFlyOver = (body) => {
  let flyOverData = JSON.parse(body).response;
  for (const pass of flyOverData) {
    let dateTime = new Date(pass.risetime * 1000);
    console.log(`Next pass at ${days[dateTime.getDay()]} ${months[dateTime.getMonth()]} ${dateTime.getDate()} ${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()} ${new Date().getTimezoneOffset()} for ${pass.duration} seconds!`);
  }
};
const nextISSTimesForMyLocation = () => {
  fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(printFlyOver)
    .catch((error) => {
      console.log("It didn't work: ", error.message);
    });
};

module.exports = {nextISSTimesForMyLocation};