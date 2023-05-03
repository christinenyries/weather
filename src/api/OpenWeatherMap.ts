import axios from 'axios'

const key = '60b194c94e459abddff37e1437e83611'
const url = `https://api.openweathermap.org/data/2.5`

export const get = async (service: 'weather' | 'forecast', params: Params) => {
  return (await axios.get(`${url}/${service}?${makeQuery(params)}`)).data
}

export type Weather = {
  description: string
  icon: string
}

export type Main = {
  temp: number
  feels_like: number
  temp_max: number
  temp_min: number
}

export type Current = {
  timezone: number
  dt: number
  date: number
  name: string
  main: Main
  weather: Weather[]
}

export type Forecast = {
  city: {
    timezone: number
  }
  list: {
    dt: number
    date: number
    weather: Weather[]
    main: Main
  }[]
}

type Params = {
  lat: number
  lon: number
}

const makeQuery = (params: Params) => {
  const { lat, lon } = params
  return `lat=${lat}&lon=${lon}&appid=${key}&units=metric`
}
