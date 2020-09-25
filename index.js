const { nextISSTimesForMyLocation } = require("./iss");
const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (const pass of passTimes) {
    printPass(pass);
  }
});

const printPass = (pass) => {
  let dateTime = new Date(pass.risetime * 1000);
  
  console.log(`Next pass at ${days[dateTime.getDay()]} ${months[dateTime.getMonth()]} ${dateTime.getDate()} ${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()} ${new Date().getTimezoneOffset()} for ${pass.duration} seconds!`);
};