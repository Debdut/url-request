# Url
Build Urls and Send Requests 🤟and forget 🥱😴


## Initialize

```js
const Url = require('url-request')
```

## Examples

### GET Request w/ Promise

```js
// Send a GET request to 
// https://my-json-server.typicode.com/typicode/demo/posts/comments
// with an access token
// then display the result
// or catch errors

new Url('https://my-json-server.typicode.com') // Base URI
  .go('typicode/demo') // Go to Path
  .go('posts')
  .go('comments')
  .query({ access_token: 'MyAccessToken' }) // Queries
  .query({ object: page })
  .get() // GET Request
  .then(json => console.log(json))
  .catch(err => console.error('Error - ', err))
```

### Build A Complex Url

```js
// Build a complex URL
// with queries, fragments

const url = new Url('https://api.workpay.com')
  .go('rooms')
  .go('open/users')
  .query({ id: [10, 12, 13, 14] })
  .query({ access_token: '<TOKEN>', password: '<PASSWORD>'})
  .fragment('bio')
  .url
  
// https://api.workpay.com//rooms/open/users?id=10,12,13,14&access_token=<TOKEN>&password=<PASSWORD>#bio
```

### POST Request w/ Promise

```js
// A Post request
// with a body

new Url(config.baseUri)
  .go(218382378)
  .go('subscriptions')
  .query({ object: page })
  .query({ fields })
  .query({ include_values: true })
  .post()
  .then(json => console.log(json))
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

## Functions

```js
class Url {

  // Url Construction
  constructor (baseUri) // Start with the baseUri
  go (path) // Go to Sub Path
  query (q) // q is query object
  fragment (f) // add fragments like #profile
  
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
