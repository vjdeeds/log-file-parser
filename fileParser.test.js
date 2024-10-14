const { parseLogFile } = require("./fileParser");

describe("Log Parser", () => {
  test("should count unique IP addresses correctly", () => {
    const logData = `
        177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574
        177.71.128.22 - - [10/Jul/2018:22:21:30 +0200] "GET /home/ HTTP/1.1" 200 1234
        177.71.128.21 - - [10/Jul/2018:22:21:35 +0200] "GET /about/ HTTP/1.1" 200 5678
    `;

    const result = parseLogFile(logData);
    expect(result.uniqueIPCount).toBe(2);
  });

  test("should identify the top 3 most visited URLs", () => {
    const logData = `
        177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574
        177.71.128.22 - - [10/Jul/2018:22:21:30 +0200] "GET /home/ HTTP/1.1" 200 1234
        177.71.128.21 - - [10/Jul/2018:22:21:35 +0200] "GET /home/ HTTP/1.1" 200 5678
        177.71.128.22 - - [10/Jul/2018:22:21:40 +0200] "GET /about/ HTTP/1.1" 200 2345
      `;

    const result = parseLogFile(logData);
    expect(result.topURLs).toEqual([
      { url: "/home/", count: 2 },
      { url: "/intranet-analytics/", count: 1 },
      { url: "/about/", count: 1 },
    ]);
  });

  test("should identify the top 3 most active IP addresses", () => {
    const logData = `
        177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574
        177.71.128.22 - - [10/Jul/2018:22:21:30 +0200] "GET /home/ HTTP/1.1" 200 1234
        177.71.128.21 - - [10/Jul/2018:22:21:35 +0200] "GET /home/ HTTP/1.1" 200 5678
        177.71.128.22 - - [10/Jul/2018:22:21:40 +0200] "GET /about/ HTTP/1.1" 200 2345
      `;

    const result = parseLogFile(logData);
    expect(result.topIPs).toEqual([
      { ip: "177.71.128.21", count: 2 },
      { ip: "177.71.128.22", count: 2 },
    ]);
  });

  test("should handle empty log data gracefully", () => {
    const logData = "";
    const result = parseLogFile(logData);
    expect(result.uniqueIPCount).toBe(0);
    expect(result.topURLs).toEqual([]);
    expect(result.topIPs).toEqual([]);
  });
});
