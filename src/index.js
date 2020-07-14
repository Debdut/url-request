import bent from '@debdut/bent'
// const bent = require('@debdut/bent')

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
    this.delayTotal = 0
    this.delayBefore = 0
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
    this.lastRequest = { method: method.toLowerCase(), body, statusCode }

    let args = [this.baseUri, method, this.responseEncoding]
    if (statusCode) {
      args.push(statusCode)
    }
    const req = bent(...args)
    args = [ this.remainder, body, this.headers, this.delayTotal, this.delayFunc, this.delayBefore ]

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
    this.thenArgs = [handle, reject]
    return this
  }

  catch (reject) {
    this.isCatch = false
    this.requestStore = this.requestStore
      .catch(reject)
    this.catchArgs = [reject]
    return this
  }

  finally (all) {
    this.requestStore = this.requestStore
      .finally(all)
    this.finallyArgs = [all]
    return this
  }

  delay(time, func) {
    this.delayBefore = this.delayTotal
    this.delayTotal += time
    this.delayFunc = func
    return this
  }

  repeat(time, count = 0) {
    if (!this.lastRequest) {
      return this
    }

    let { method, body, statusCode } = this.lastRequest
    let node

    const commands = [
      [ 'delay', [ time ] ],
      [ method, [ body, statusCode ] ],
    ]

    if (this.thenArgs) {
      commands.push([ 'then', this.thenArgs ])
    }
    if (this.catchArgs) {
      commands.push([ 'catch', this.catchArgs ])
    }

    count = count === 0 ? 0 : count - 1
    while (count > 0) {
      node = this.execute(commands)
      count--
    }
    
    return node
  }

  // Lazy Execute and Programability
  invoke (command, ...args) {
    this.invokeCommands.push([ command, args ])
    return this
  }

  execute (invokeCommands = []) {
    this.invokeCommands = this.invokeCommands.concat(invokeCommands)
    let pairs = this.invokeCommands

    if (pairs.length === 0) {
      return this
    }

    while (pairs.length > 1) {
      const [ command, args ] = pairs.shift()
      this[command](...args)
    }
    const [ command, args ] = pairs.shift()

    return this[command](...args)
  }
}

const _Url = (...args) => new Url(...args)
export default _Url
// module.exports = Url