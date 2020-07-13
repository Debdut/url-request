import bent from 'bent'
// const bent = require('bent')

class Url {
  constructor (baseUri, headers = {}, path = [], queries = {}, fragments = [], responseEncoding = 'json', invokeCommands = []) {
    this.baseUri = baseUri
    this.headers = headers
    this.path = path
    this.queries = queries
    this.fragments = fragments
    this.responseEncoding = responseEncoding
    this.invokeCommands = invokeCommands
  }

  fork () {
    const clone = new Url(this.baseUri, this.headers, this.path, this.queries, this.fragments, this.responseEncoding, this.invokeCommands)

    return clone
  }

  go (p) {
    this.path.push(p)
    return this
  }

  query (q) {
    this.queries = { ...this.queries, ...q }
    return this
  }

  fragment (f) {
    this.fragments.push(f)
    return this
  }

  encodeResponse (encoding) {
    this.responseEncoding = encoding
    return this
  }

  header (headers) {
    this.headers = headers
    return this
  }

  get _query () {
    return Object.keys(this.queries)
      .map(key => `${key}=${this.queries[key]}`)
      .join('&')
  }

  get remainder () {
    const query = this._query
    return (this.path.length > 0 ? '/' : '') + this.path.join('/') +
      (query.length > 0 ? '?' : '') + query +
      (this.fragments.length > 0 ? '#' : '') + this.fragments.join('#')
  }

  get url () {
    return this.baseUri + this.remainder
  }

  request (method, body, statusCode) {
    let args = [this.baseUri, method, this.responseEncoding]
    if (statusCode) {
      args.push(statusCode)
    }
    const req = bent(...args)

    args = [this.remainder]
    if (body) {
      args.push(body)
    }

    return req(...args)
  }

  post (body, statusCode) {
    return this.request('POST', body, statusCode)
  }

  get (body, statusCode) {
    return this.request('GET', body, statusCode)
  }

  put (body, statusCode) {
    return this.request('PUT', body, statusCode)
  }

  patch (body, statusCode) {
    return this.request('PATCH', body, statusCode)
  }

  delete (body, statusCode) {
    return this.request('DELETE', body, statusCode)
  }

  // Lazy Execute and Programability
  invoke (command, ...args) {
    this.invokeCommands.push([ command, args ])
    return this
  }

  execute (invokeCommands = []) {
    let pairs = this.invokeCommands
    if (invokeCommands.length > 0) {
      pairs = pairs.concat(invokeCommands)
    }
    for (let index = 0; index < pairs.length - 1; index++) {
      const [ command, ...args ] = pairs[index]
      this[command](...args)
    }
    const [ command, ...args ] = pairs[pairs.length - 1]
    return this[command](...args)
  }
}

export default Url
// module.exports = Url