const fs = require('fs')

const config = JSON.parse(fs.readFileSync(`${__dirname}/.jest.swcrc`, 'utf-8'))

module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      { ...config /* custom configuration in Jest */ },
    ],
  },
  verbose: true,
}
