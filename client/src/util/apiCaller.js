// import fetch from 'isomorphic-fetch'
// // import Config from '../../config/config'

// //export const API_URL = process.env.BASE_URL || (`http://localhost:${Config.port || process.env.PORT}/api`)
// export const API_URL = `http://18.222.97.182/webservice/rest/object?apikey=b7019d0ba8faa2b1cbc681c880ce384e7a544c0060c362c8ef269415a2f1d6af`
// export default function callApi (method = 'get' || 'post', body) {
//   
//   

//   return fetch(`${API_URL}`, {
//     headers: { 'content-type': 'application/json' },
//     method,
//     body: JSON.stringify(body)
//   })
//     .then(response => response.json().then(json => ({ json, response })))
//     .then(({ json, response }) => {
//       if (!response.ok) {
//         return Promise.reject(json)
//       }
//       return json
//     })
//     .then(
//       response => response,
//       error => error
//     )
// }

