const env = {
  development: {
    BASE_URL: 'http://localhost:3000'
  },
  production: {
    BASE_URL: 'https://tranquil-savannah-17116.herokuapp.com'
  }
}
export default env[process.env.NODE_ENV];
// export default () => {
//   return env[process.env.NODE_ENV]
// } git remote add origin https://github.com/timorss/trempi-web.git