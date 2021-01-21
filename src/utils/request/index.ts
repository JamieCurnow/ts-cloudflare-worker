interface Options {
  includeHeaders?: boolean
}

export const proxyRequest = (request: Request, opts?: Options) => {
  const includeHeaders = opts && opts.includeHeaders || false

  if (includeHeaders) {
    return new Request(request.url, request)
  }

  // proxy the request, removing headers - for security
  const init = {
    method: request.method,
    headers: {
      // default user agent
      'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)'
    } as { [key: string]: string }
  }

  const proxyHeaders = ['Accept', 'Accept-Encoding', 'Accept-Language', 'Referer', 'User-Agent']

  for (let name of proxyHeaders) {
    let value = request.headers.get(name)
    if (value) init.headers[name] = value
  }

  return new Request(request.url, init)
}
