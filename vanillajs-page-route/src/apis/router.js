const ROUTE_CHANGE_EVENT_DISPATCHER = 'route-change'

export const initRouter = onRoute => {
  window.addEventListener(ROUTE_CHANGE_EVENT_DISPATCHER, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl !== null) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  })
}

export const push = (nextUrl = null) => {
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT_DISPATCHER, { 
    detail: { 
      nextUrl 
    }
  }))
}