// Function to parse log file
// @logData: String - accepts string log data to parse
function parseLogFile(logData) {
  const lines = logData.split("\n");

  //New set for Unique IP addresses and empty object to store URL counts and IP counts
  const ipAddresses = new Set();
  const urlCounts = {};
  const ipCounts = {};

  lines.forEach((line) => {
    if (!line.trim()) return; // Skip empty lines

    //Trim the line for empty spaces before and after the text
    const parts = line.trim().split(" ");

    const ip = parts[0];
    const url = parts[6];

    // Add unique IP addresses
    ipAddresses.add(ip);

    // Count URL visits
    if (urlCounts[url]) {
      urlCounts[url]++;
    } else {
      urlCounts[url] = 1;
    }

    // Count IP activity
    if (ipCounts[ip]) {
      ipCounts[ip]++;
    } else {
      ipCounts[ip] = 1;
    }
  });

  // Get number of unique IP addresses
  const uniqueIPCount = ipAddresses.size;

  // Get top 3 most visited URLs
  const topURLs = Object.entries(urlCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .slice(0, 3) // Get top 3
    .map(([url, count]) => ({ url, count }));

  // Get top 3 most active IP addresses
  const topIPs = Object.entries(ipCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .slice(0, 3) // Get top 3
    .map(([ip, count]) => ({ ip, count }));

  return {
    uniqueIPCount,
    topURLs,
    topIPs,
  };
}

module.exports = { parseLogFile };
