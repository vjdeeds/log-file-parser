const { parseLogFile } = require("./fileParser");
const path = require("path");
const fs = require("fs");

//Get the path to log file
const logFilePath = path.join(
  __dirname,
  "./logFiles/programming-task-example-data.log"
);

const logData = fs.readFileSync(logFilePath, "utf-8"); //Read the log file data
const report = parseLogFile(logData); //Get the parsed output from the log parser function

//Print the output to the screen
console.log("Number of unique IP addresses:", report.uniqueIPCount);
console.log("Top 3 most visited URLs:", report.topURLs);
console.log("Top 3 most active IP addresses:", report.topIPs);
