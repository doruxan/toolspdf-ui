export function encodeStateToUrl<T extends Record<string, unknown>>(state: T): string {
  const params = new URLSearchParams()
  
  Object.entries(state).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      params.set(key, String(value))
    }
  })
  
  return params.toString()
}

export function decodeStateFromUrl<T extends Record<string, unknown>>(
  searchParams: URLSearchParams,
  defaultState: T
): T {
  const state = { ...defaultState }
  
  Object.keys(defaultState).forEach((key) => {
    const value = searchParams.get(key)
    if (value !== null) {
      const defaultValue = defaultState[key]
      
      if (typeof defaultValue === 'number') {
        const parsed = parseFloat(value)
        if (!isNaN(parsed)) {
          ;(state as any)[key] = parsed
        }
      } else if (typeof defaultValue === 'boolean') {
        ;(state as any)[key] = value === 'true'
      } else {
        ;(state as any)[key] = value
      }
    }
  })
  
  return state
}

export function updateUrlWithState<T extends Record<string, unknown>>(state: T): void {
  if (typeof window === 'undefined') return
  
  const url = new URL(window.location.href)
  const encoded = encodeStateToUrl(state)
  url.search = encoded
  
  window.history.replaceState({}, '', url.toString())
}


