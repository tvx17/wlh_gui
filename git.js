const path = require('path')
const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const fs = require('fs')
const dir = path.join(process.cwd())


git.add({fs, dir, filepath: '.'})
console.log('Added README.md to the git index')
git.commit({fs, dir, author: {name: 'tvx17'}, message: 'Add README.md'})
