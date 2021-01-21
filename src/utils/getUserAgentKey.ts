export const getUserAgentKey = (userAgent: string) => {
  let os = ''
  const osRegex = /^[^(]*\(\s*(\w+)/mgi
  let match = osRegex.exec(userAgent)
  if (match) os = match[1]

  let mobile = ''
  if (userAgent.match(/Mobile/mgi)) mobile = 'Mobile'

  // Detect Edge first since it includes Chrome and Safari
  const edgeRegex = /\s+Edge\/(\d+)/mgi
  match = edgeRegex.exec(userAgent)
  if (match) return 'Edge' + match[1] + os + mobile

  // Detect Chrome next (and browsers using the Chrome UA/engine)
  const chromeRegex = /\s+Chrome\/(\d+)/mgi
  match = chromeRegex.exec(userAgent)
  if (match) return 'Chrome' + match[1] + os + mobile

  // Detect Safari and Webview next
  const webkitRegex = /\s+AppleWebKit\/(\d+)/mgi
  match = webkitRegex.exec(userAgent)
  if (match) return 'WebKit' + match[1] + os + mobile

  // Detect Firefox
  const firefoxRegex = /\s+Firefox\/(\d+)/mgi
  match = firefoxRegex.exec(userAgent)
  if (match) return 'Firefox' + match[1] + os + mobile
  return null
}
