# url-request

[![Generic badge](https://img.shields.io/badge/build-passing-color.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/async/await-yes-blue.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/functional-yes-red.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/tests-passing-green.svg)](https://shields.io/)

> _A HTTP Client and Url Builder with Functional Chaining, Async/Await and Fork for building your Complex APIs easily._

Alternative to Requests, Axios, and Got.

## Installation

```sh
npm install url-request --save
```

## Initialize

```js
const Url = require('url-request')
```

## Examples

Look [Examples](/examples)

### GET Request w/ Promise

Send a GET request with an access token, then display the result or catch errors.
`GET https://my-json-server.typicode.com/typicode/demo/posts/comments`

```js
Url('https://my-json-server.typicode.com')
  .go('typicode/demo')
  .go('posts')
  .query({ access_token: 'MyAccessToken' })
  .get() // GET Request
  .then(json => console.log(json)) 
  .catch(err => console.error('[Error]', err))
```
```js
[{ id: 1, post: 'Post 1' },
 { id: 2, post: 'Post 2' }]
```

### Build A Complex Url

Build Complex Urls with deep paths, multiple queries (lists are supported) and fragments.

```js
const url = Url('https://api.workpay.com')
  .go('rooms', 'open', 'users')
  .query({ id: [10, 12, 13, 14] })
  .query({ access_token: 'my-token', password: 'password'})
  .fragment('bio')
  .url
  
// https://api.workpay.com//rooms/open/users?id=10,12,13,14&
// access_token=my-token&password=password#bio
```

### POST Request w/ Promise

A POST request with a body `{ subscrbe: 'Apple Music' }` at `https://api.workpay.com/user/123#subscriptions`

```js
Url('https://api.workpay.com')
  .go('user', 123)
  .fragment('subscriptions')
  .post({ subscrbe: 'Apple Music' })
  .then(json => console.log(json)) // { success: true }
  .catch(err => console.error(err))
```

### Async/Await

```js
const post = async () => {
  const request = Url('https://postman-echo.com')
    .go('post')
    .post({ foo1: 'bar1', foo2: 'bar2' })
  
  return await request
}
```

### Invoke / Execute

```js
Url('https://postman-echo.com')
  .invoke('go', 'post')
  .invoke('encodeResponse', null) // To Get Full Response Object
  .invoke('post', { foo1: 'bar1', foo2: 'bar2' })
  .execute()
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err))
```

### Fork

```js
const userApi = Url('https://api.workpay.com')
  .go('user', 123)

const subscriptionsApi = userApi
  .fork()
  .fragment('subscriptions')

const achievementsApi = userApi
  .fork()
  .fragment('achievements')

[ userApi, subscriptionsApi, achievementsApi ]
  .forEach(api => api
    .then(json => console.log(json))
    .catch(err => console.log(err)))
```

## Functions

```js
class Url {

  // Url Construction
  constructor (baseUri) // Start with the baseUri
  go (...paths) // Go to Sub Path
  query (q) // q is query object
  fragment (f) // add fragments like #profile

  // Fork
  fork ()
  
  // default encoding is 'json', can be null, 'string', 'buffer'
  encodeResponse (encoding) 
  
  // Set headers
  header (headers) 

  // get the formed url as a string
  get url ()

  // Requests
  get (body, statusCode) // GET Request
  post (body, statusCode) // POST Request
  put (body, statusCode) // PUT Request
  delete (body, statusCode) // DELETE Request
  patch (body, statusCode) // PATCH Request

  // Command Control, Lazy Execution
  invoke (command, ...args)
  execute (invokeCommands)
}
```
