'use strict'

browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    const cleaned = new URL(details.url)
    let path = '/embed/'

    if (! cleaned.searchParams.get('v')) {
      return
    }

    path += cleaned.searchParams.get('v')

    cleaned.pathname = path
    cleaned.search = ''

    if (cleaned.href === details.url) {
      return
    }

    return {
      redirectUrl: cleaned.href
    }
  },
  {
    urls: ['*://*.youtube.com/watch*'],
    types: ['main_frame']
  },
  ['blocking']
)
