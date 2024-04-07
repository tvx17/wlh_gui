const { Octokit } = require("@octokit/rest");
const { readFileSync } = require('fs');

const token = JSON.parse(readFileSync('C:\\Users\\ckoeste1\\OneDrive - Axel Springer SE\\.gh', 'utf8'))

const octokit = new Octokit({
  auth: token.token,
  userAgent: "tvx17 v1.2.3"
                            })
