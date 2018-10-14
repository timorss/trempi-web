const env = {
  development: {
    BASE_URL: 'http://localhost:3000/api'
  },
  production: {
    BASE_URL: 'https://tranquil-savannah-17116.herokuapp.com/'
  }
}
export default env[process.env.NODE_ENV];
// export default () => {
//   return env[process.env.NODE_ENV]
// }