# Url
Build Urls and Send Requests 🤟and forget 🥱😴


## Initialize

```js
const Url = require('url-request')
```

## Examples

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
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('Error - ', err))
```

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
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err))
```

## Functions

```js
class Url {
  constructor (baseUri) {} // Start with the baseUri
  go (path) {} // Go to Sub Path
  query (q) {} // q is query object
  fragment (f) {} // add fragments like #profile
  encode (encoding) {} // default encoding is json, can be 'string', 'buffer'
  header (headers) {} // add headers
  get url () {} // get the formed url as a string
  async get () {} // GET Request
  async post (body) {} // POST Request
  async put (body) {} // PUT Request
  async delete (body) {} // DELETE Request
  async patch (body) {} // PATCH Request
}
```
