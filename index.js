const bent = require('bent')

class Url {
  constructor (baseUri) {
    this.baseUri = baseUri
    this.headers = {}
    this.path = []
    this.queries = []
    this.fragments = []
    this.responseEncoding = 'json'
    this.invokeCommands = []
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

  encode (encoding) {
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
    const remainder = this.remainder
    return this.baseUri +
      (remainder.length > 0 ? '/' : '') + remainder
  }

  async request (method, body) {
    const req = bent(this.baseUri, method, responseEncoding)
    let res
    if (body) {
      res = await req(this.remainder, body)
    } else {
      res = await req(this.remainder)
    }
    return res
  }

  async post (body) {
    await this.request('POST', body)
  }

  async get (body) {
    await this.request('GET', body)
  }

  // Lazy Execute and Programability
  invoke (command, ...args) {
    this.invokeCommands.push([ command, args ])
    return this
  }

  async execute (invokeCommands) {
    const pairs = this.invokeCommands.concat(invokeCommands)
    for (const index = 0; index < pairs.length - 1; index++) {
      const [ command, args ] = pairs[index]
      const out = this[command](...args)
      if (out.constructor.name === 'Promise') {
        await out
      }
    }
    const [ command, args ] = pairs[pairs.length - 1]
    let out = this[command](...args)
    if (out.constructor.name === 'Promise') {
        out = await out
    }
    return out
  }
}

module.exports = Url