# url-request

[![Generic badge](https://img.shields.io/badge/build-passing-color.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/async/await-on-blue.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/functional-on-red.svg)](https://shields.io/)

> _A Url Builder and Request Library with Functional Chaining, Async/Await and Fork Capabilities to build your all API calls. Build Urls and Send Requests 🤟and forget 🥱😴!_

## Initialize

```js
const Url = require('url-request')
```

## Examples

### GET Request w/ Promise

Send a GET request to `https://my-json-server.typicode.com/typicode/demo/posts/comments` with an access token, then display the result or catch errors.

```js
new Url('https://my-json-server.typicode.com')
  .go('typicode/demo')
  .go('posts')
  .query({ access_token: 'MyAccessToken' })
  .get() // GET Request
  .then(json => console.log(json)) 
  .catch(err => console.error('Error - ', err))
```
```js
[{ id: 1, post: 'Post 1' },
 { id: 2, post: 'Post 2' }]
```

### Build A Complex Url

Build Complex Urls with deep paths, multiple queries (lists are supported) and fragments.

```js
const url = new Url('https://api.workpay.com')
  .go('rooms')
  .go('open/users')
  .query({ id: [10, 12, 13, 14] })
  .query({ access_token: '<TOKEN>', password: '<PASSWORD>'})
  .fragment('bio')
  .url
  
// https://api.workpay.com//rooms/open/users?id=10,12,13,14&
// access_token=<TOKEN>&password=<PASSWORD>#bio
```

### POST Request w/ Promise

A POST request with a body `{ subscrbe: 'Apple Music' }` at `https://api.workpay.com/user/123#subscriptions`

```js
new Url('https://api.workpay.com')
  .go('user')
  .go(123)
  .fragment('subscriptions')
  .post({ subscrbe: 'Apple Music' })
  .then(json => console.log(json)) // { success: true }
  .catch(err => console.error(err))
```

### Async/Await

```js
const post = async () => {
  const request = new Url('https://postman-echo.com')
    .go('post')
    .post({ foo1: 'bar1', foo2: 'bar2' })
  
  return await request
}
```

### Invoke / Execute

```js
new Url('https://postman-echo.com')
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
const userApi = new Url('https://api.workpay.com')
  .go('user')
  .go(123)

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
  go (path) // Go to Sub Path
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
