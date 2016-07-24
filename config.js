const env = process.env.ENV ? process.env.ENV : 'production'

export default {
  development: {
    domain: "http://localhost:3000"
  },
  staging: {
    domain: "http://114.34.175.159:3011"
  },
  production: {
    domain: "http://www.zu-edu.com:3000"
  }
}[env]
