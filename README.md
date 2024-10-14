# HTTP Log Parser

A simple Node.js application that parses HTTP request log files to report statistics such as > Unique IP addresses > The most visited URLs > The most active IP addresses.

## Features

- Count the number of unique IP addresses.
- Identify the top 3 most visited URLs.
- Determine the top 3 most active IP addresses.

## Assumptions

- The log file entries are formatted consistently, following the standard combined log format.
- Each log entry is a single line, with fields separated by spaces.
- The URL is always the seventh element in the log entry.
- IP addresses are valid and well-formed.
- The log file does not contain malformed entries or mixed formats

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or later)
- npm (Node Package Manager, comes with Node.js)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/vjdeeds/log-file-parser.git
   cd log-file-parser

   ```

2. Install the dependencies:

   npm install

### Usage

1. Create a log file (e.g., test.log) with your HTTP request logs in the LogFiles directory.
2. Update the filename in main.js line no:6
3. Run the parser:

   node main.js

The output will display the number of unique IP addresses, the top 3 most visited URLs, and the top 3 most active IP addresses.

### Example Log Format

177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574

### Example Output Format

    Number of unique IP addresses: 11
    Top 3 most visited URLs: [
        { url: '/docs/manage-websites/', count: 2 },
        { url: '/intranet-analytics/', count: 1 },
        { url: 'http://example.net/faq/', count: 1 }
    ]
    Top 3 most active IP addresses: [
        { ip: '168.41.191.40', count: 4 },
        { ip: '177.71.128.21', count: 3 },
        { ip: '50.112.00.11', count: 3 }
    ]

### Running Tests

1. Make sure Jest is installed (it should be installed as a dev dependency):

   npm install --save-dev jest

2. Run the tests:

   npx jest
