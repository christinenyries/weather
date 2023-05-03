<template>
  <div v-for="place in savedPlaces" :key="place.id">
    <PlaceCard :place="place" @click="goToPlaceView(place)" />
  </div>
  <p v-if="savedPlaces.length === 0" class="text-center">
    No places added. To start tracking a place, search in the field above.
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { getLocalStorage, type Place } from '@/utilities'

import { get } from '@/api/OpenWeatherMap'
import PlaceCard from '@/components/PlaceCard.vue'

const router = useRouter()
const savedPlaces = ref<Place[]>([])

const getWeathers = async () => {
  savedPlaces.value = getLocalStorage('savedPlaces') as Place[]
  const promises = savedPlaces.value.map((place) =>
    get('weather', { lat: place.coords.lat, lon: place.coords.lon })
  )
  const weathers = await Promise.all(promises)

  for (const index in weathers) {
    savedPlaces.value[index].weather = weathers[index]
  }
}

await getWeathers()
const goToPlaceView = (place: Place) => {
  const { lat, lon } = place.coords
  router.push({
    name: 'place',
    params: { id: place.placeId },
    query: {
      id: place.id,
      name: place.name,
      lat,
      lon
    }
  })
}
</script>
