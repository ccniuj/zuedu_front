const env = process.env.ENV ? process.env.ENV : 'production'

export default {
  development: {
    domain: "http://localhost:3000"
  },
  staging: {
    domain: "http://www.zu-edu.com:3010"
  },
  production: {
    domain: "http://api.zu-edu.com"
  }
}[env]
