export function saveToLocalStorage<T>(key: string, data: T): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    const serialized = JSON.stringify(data)
    localStorage.setItem(key, serialized)
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return false
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  
  try {
    const item = localStorage.getItem(key)
    if (item === null) {
      return defaultValue
    }
    return JSON.parse(item) as T
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return defaultValue
  }
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

export function listLocalStorageKeys(prefix?: string): string[] {
  if (typeof window === 'undefined') return []
  
  try {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (!prefix || key.startsWith(prefix))) {
        keys.push(key)
      }
    }
    return keys
  } catch (error) {
    console.error('Error listing localStorage keys:', error)
    return []
  }
}

export interface SavedPreset<T> {
  id: string
  name: string
  data: T
  timestamp: number
}

export function savePreset<T>(category: string, name: string, data: T): boolean {
  const preset: SavedPreset<T> = {
    id: `${Date.now()}-${Math.random()}`,
    name,
    data,
    timestamp: Date.now()
  }
  
  const key = `preset-${category}-${preset.id}`
  return saveToLocalStorage(key, preset)
}

export function loadPresets<T>(category: string): SavedPreset<T>[] {
  const keys = listLocalStorageKeys(`preset-${category}-`)
  const presets: SavedPreset<T>[] = []
  
  keys.forEach((key) => {
    const preset = loadFromLocalStorage<SavedPreset<T> | null>(key, null)
    if (preset) {
      presets.push(preset)
    }
  })
  
  return presets.sort((a, b) => b.timestamp - a.timestamp)
}


