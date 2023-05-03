<template>
  <div class="flex flex-col items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class="w-full bg-weather-primary-focus p-4 text-center">
      <p>
        You are currently previewing this place, click the "+" icon to start tracking this place.
      </p>
    </div>

    <!-- Current Weather -->
    <div v-if="current" class="flex flex-col items-center py-12">
      <h1 class="mb-2 text-4xl">{{ route.query.name || 'Place Name' }}</h1>
      <p class="mb-12 text-sm">
        {{ toDateString(new Date(current.date)) }}
        {{ toTimeString(new Date(current.date)) }}
      </p>
      <p class="mb-8 text-8xl">{{ Math.round(current.main.temp) }}&deg;C</p>
      <p>Feels like {{ Math.round(current.main.feels_like) }}&deg;C</p>
      <p class="capitalize">
        {{ current.weather[0].description }}
      </p>
      <img
        class="h-auto w-[150px]"
        :src="`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`"
        alt="current weather icon"
      />
    </div>

    <hr class="w-full border border-black border-opacity-10" />

    <!-- Hourly Weather -->
    <div v-if="hourly" class="w-full max-w-screen-md py-12">
      <div class="mx-8">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll pb-6">
          <div
            class="flex flex-col items-center gap-4"
            v-for="forecast in hourly"
            :key="forecast.dt"
          >
            <p class="text-md whitespace-nowrap">
              {{ toHourString(new Date(forecast.date)) }}
            </p>
            <img
              class="h-[50px] w-auto object-cover"
              :src="`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`"
              alt="hourly weather forecast icon"
            />
            <p class="text-xl">{{ Math.round(forecast.main.temp) }}&deg;C</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Weather -->
    <div v-if="daily" class="w-full max-w-screen-md py-12">
      <div class="mx-8">
        <h2 class="mb-4">5 Day Forecast</h2>
        <div v-for="forecast in daily" :key="forecast.dt" class="flex items-center">
          <p class="flex-1">
            {{ toDayString(new Date(forecast.date)) }}
          </p>
          <img
            class="h-[50px] w-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`"
            alt="daily weather forecast icon"
          />
          <div class="flex flex-1 justify-end gap-2">
            <p>H: {{ Math.round(forecast.main.temp_max) }}</p>
            <p>L: {{ Math.round(forecast.main.temp_min) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="!route.query.preview"
    class="flex cursor-pointer place-content-center gap-2 py-12 duration-150 hover:text-red-500"
    @click="removePlace"
  >
    <i class="fa-solid fa-trash"></i>
    <p>Remove Place</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import { type Current, type Forecast, get } from '@/api/OpenWeatherMap'

import {
  toDateString,
  toHourString,
  toTimeString,
  toDayString,
  getLocalStorage,
  setLocalStorage
} from '@/utilities'

const router = useRouter()
const route = useRoute()

const { lat, lon } = route.query as Record<string, string>
const params = { lat: parseInt(lat), lon: parseInt(lon) }

const getWeather = async () => {
  try {
    // current weather
    const current = (await get('weather', params)) as Current

    // hourly weather forecasts
    const forecasts = (await get('forecast', params)) as Forecast

    const localOffset = new Date().getTimezoneOffset() // minutes
    const localOffsetMillis = localOffset * 60 * 1000

    const currentOffset = current.timezone // seconds
    const currentOffsetMillis = currentOffset * 1000
    const currentDate = current.dt // seconds
    const currentDateMillis = currentDate * 1000

    // add custom prop for holding date with correct timezone in millis
    current.date = currentDateMillis + currentOffsetMillis + localOffsetMillis

    const hourlyOffset = forecasts.city.timezone // seconds
    const hourlyOffsetMillis = hourlyOffset * 1000
    for (const f of forecasts.list) {
      const hourlyDate = f.dt // seconds
      const hourlyDateMillis = hourlyDate * 1000

      // add custom prop for holding date with correct timezone in millis
      f.date = hourlyDateMillis + hourlyOffsetMillis + localOffsetMillis
    }

    return { current, forecasts }
  } catch (err) {
    console.log(err)
    return { current: null, forecasts: null }
  }
}

const { current, forecasts } = await getWeather()

// forecasts contains a 5 days forecast with 3-hour step
const hourly = forecasts?.list
// 1 day will have 8 hourly forecasts (24hr/day / 3-hr)
// so use every 8th forecast, (the first hourly forecast) to approximate a daily forecast
const daily = forecasts?.list.filter((_, index) => index % 8 === 0)

const removePlace = () => {
  const savedPlaces = getLocalStorage('savedPlaces')
  const newSavedPlaces = savedPlaces.filter((place) => place.id !== route.query.id)
  setLocalStorage('savedPlaces', newSavedPlaces)
  router.push({ name: 'home' })
}
</script>
