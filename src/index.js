const bent = require('bent')

class Url {
  constructor (baseUri, headers = {}, path = [], queries = [], fragments = [], responseEncoding = 'json', invokeCommands = []) {
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
    this.queries.push(this.resolveQuery(q))
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

  resolveQuery (q) {
    let qs = []
    for (const key in q) {
      if (Object.prototype.hasOwnProperty.call(q, key)) {
        let val = q[key]
        if (Array.isArray(val)) {
          val = val
            .join(',')
        }
        qs.push(`${key}=${val}`)
      }
    }
    return qs.join('&')
  }

  header (headers) {
    this.headers = headers
    return this
  }

  get remainder () {
    return (this.path.length > 0 ? '/' : '') + this.path.join('/') +
      (this.queries.length > 0 ? '?' : '') + this.queries.join('&') +
      (this.fragments.length > 0 ? '#' : '') + this.fragments.join('#')
  }

  get url () {
    return this.baseUri + this.remainder
  }

  request (method, body, statusCode) {
    let args = [this.baseUri, method]
    if (this.responseEncoding) {
      args.push(this.responseEncoding)
    } else if (body && typeof body === 'object') {
      args.push('json')
    }
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

  execute (invokeCommands) {
    const pairs = this.invokeCommands.concat(invokeCommands)
    for (const index = 0; index < pairs.length - 1; index++) {
      const [ command, args ] = pairs[index]
      this[command](...args)
    }
    const [ command, args ] = pairs[pairs.length - 1]
    return this[command](...args)
  }
}

module.exports = Url