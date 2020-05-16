module.exports = {<% if(coverage){ %>
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],<% } %>
  moduleFileExtensions: [
    'js',
    'json',
    // 告诉 jest 处理 .vue 文件
    'vue'
  ],
  transform: {
    // 用 vue-jest 处理 .vue 文件
    '.*\\.(vue)$': 'vue-jest',
    // 支持ES6，用 babel-jest 处理 js
    '.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    // 支持源码中 @ 别名，对应到 src
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
