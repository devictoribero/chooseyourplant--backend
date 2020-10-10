module.exports = {
  "roots": [
    "<rootDir>"
  ],
  "testMatch": [
    "**/tests/**/*.+(ts|js)",
    "**/?(*.)+(test).+(ts|js)"
  ],
  "transform": {
    "^.+\\.(ts)$": "ts-jest"
  },
}