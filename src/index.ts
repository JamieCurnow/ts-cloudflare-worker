const DEBUG = true
const sendDebugResponse = (event: FetchEvent, e: any) => {
  return event.respondWith(
    new Response(e.message || e.toString(), {
      status: 500
    })
  )
}

addEventListener('fetch', (event: FetchEvent) => {
  try {
    event.passThroughOnException()
    event.respondWith(handleEvent(event))
  } catch (e) {
    return DEBUG
      ? sendDebugResponse(event, e)
      : event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

const handleEvent = async (event: FetchEvent) => {
  const url = new URL(event.request.url)
  const { pathname } = url

  // check if this is the /x route and handle
  if (pathname.startsWith('/x')) {
    return new Response('Hello worker', { status: 200 })
  }

  // otherwise, just fetch the request
  return fetch(event.request)
}
