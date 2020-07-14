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
    this.isCatch = false
    this.requestStore = null
  }

  fork () {
    const clone = Url(this.baseUri, this.headers, this.path, this.queries, this.fragments, this.responseEncoding, this.invokeCommands)

    return clone
  }

  go (...args) {
    this.path = this.path.concat(args)
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
    this.requestStore = this.request('POST', body, statusCode)
    this.isCatch = false
    return this
  }

  get (body, statusCode) {
    this.requestStore = this.request('GET', body, statusCode)
    this.isCatch = false
    return this
  }

  put (body, statusCode) {
    this.requestStore = this.request('PUT', body, statusCode)
    this.isCatch = false
    return this
  }

  patch (body, statusCode) {
    this.requestStore = this.request('PATCH', body, statusCode)
    this.isCatch = false
    return this
  }

  delete (body, statusCode) {
    this.requestStore = this.request('DELETE', body, statusCode)
    this.isCatch = false
    return this
  }

  then (handle, reject) {
    if (!this.isCatch) {
      this.requestStore = this.requestStore
        .then(handle, reject)
    }
    return this
  }

  catch (reject) {
    this.isCatch = false
    this.requestStore = this.requestStore
      .catch(reject)
    return this
  }

  finally (all) {
    this.requestStore = this.requestStore
      .finally(all)
    return this
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

const _Url = (...args) => new Url(...args)
export default _Url
// module.exports = Url