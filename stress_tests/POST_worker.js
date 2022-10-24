import http from 'k6/http';

// export const options = {
//   vus: 10, // Virtual Users
//   duration: '10s',
// }

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
}

// Init code runs first and is called only once per VU (Virtual User). On the other hand, default code executes as many times as the test options set.

export default function () {
  const user = {
    "name": "Daniel",
    "email": "dsvivass@unal.edu.co"
  }

  http.post(
    'http://127.0.0.1:8000/api/worker/',
    JSON.stringify(user),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}