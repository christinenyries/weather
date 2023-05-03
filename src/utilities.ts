import type { Current as CurrentWeather } from './api/OpenWeatherMap'

export type LocalStorageValue = {
  id: string
  placeId: string
  coords: {
    lat: number
    lon: number
  }
  name: string
}

export const getLocalStorage = (key: 'savedPlaces'): LocalStorageValue[] => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : []
}

export const setLocalStorage = (key: 'savedPlaces', value: LocalStorageValue[]) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export interface Place extends LocalStorageValue {
  weather: CurrentWeather
}
export const toDateString = (date: Date) => {
  return date.toLocaleDateString('en-us', {
    weekday: 'short',
    day: '2-digit',
    month: 'long'
  })
}
export const toTimeString = (date: Date) => {
  return date.toLocaleTimeString('en-us', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
export const toHourString = (date: Date) => {
  return date.toLocaleTimeString('en-us', {
    hour: 'numeric'
  })
}
export const toDayString = (date: Date) => {
  return date
    .toLocaleTimeString('en-us', {
      weekday: 'long'
    })
    .split(' ')[0]
}
