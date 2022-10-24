import http from 'k6/http';

// export const options = {
//   vus: 10, // Virtual Users
//   duration: '10s',
// }

export const options = {
  stages: [
    { duration: '10s', target: 20 },
  ],
}

// Init code runs first and is called only once per VU (Virtual User). On the other hand, default code executes as many times as the test options set.

// Open a file to upload
const file = open('../images/postgres.PNG', 'b');

export default function () {

  const data = {
    description: 'this is a standard form field',
    file: http.file(file, 'postgresImagen'),
  };

  http.post('http://127.0.0.1:8000/api/upload/', data);
}

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}