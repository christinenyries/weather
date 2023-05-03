<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import type { Place } from '@/api/Mapbox'
import PlaceList from '@/components/AsyncPlaceList.vue'
import PlaceCardSkeleton from '@/components/PlaceCardSkeleton.vue'

type QueryTimer = number | null

const mapboxAPIKey =
  'pk.eyJ1IjoiY3lhbWJhbyIsImEiOiJjbGg2MWhoMjkwMW90M2tuNzgwemVueGNjIn0.TCKKJac2GeZf2o1BQBHVHg'

const router = useRouter()

const searchQuery = ref('') // holds value of search input where user can enter the place they wanted to check the weather of.
const searchTimer = ref<QueryTimer>(null)
const searchError = ref(false)

const places = ref<Place[] | null>(null)
const searchPlaces = () => {
  if (searchTimer.value) {
    clearTimeout(searchTimer.value)
  }
  searchTimer.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const { data } = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        )
        places.value = data.features
      } catch {
        searchError.value = true
      }
      return
    }
    places.value = []
  }, 300)
}

const previewCity = (place: Place) => {
  const [lon, lat] = place.geometry.coordinates
  router.push({
    name: 'place',
    params: { id: place.id.replace('place.', '') },
    query: {
      name: place.place_name.split(',')[0],
      lat,
      lon,
      preview: 1
    }
  })
}
</script>

<template>
  <main class="container">
    <div class="relative mb-8 pt-4">
      <input
        v-model="searchQuery"
        class="w-full border-b border-b-weather-secondary bg-transparent px-1 py-2 focus:border-weather-secondary-focus focus:shadow-[0px_1px_0_0_#004e71] focus:outline-none"
        type="search"
        @input="searchPlaces"
        placeholder="Search for a city or province"
      />
      <div v-if="places" class="top-[66px] w-full bg-weather-secondary px-1 py-2 shadow-md">
        <p v-if="searchError">
          Sorry, something went wrong. Please try refreshing your page or try again after a minute.
        </p>
        <ul v-else>
          <li v-show="places.length === 0">No results match your query. Try a different term.</li>
          <li
            v-show="places.length > 0"
            class="cursor-pointer py-2"
            v-for="place in places"
            :key="place.id"
            @click="previewCity(place)"
          >
            {{ place.place_name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <BaseSuspense>
        <PlaceList />
        <template #fallback>
          <PlaceCardSkeleton />
        </template>
      </BaseSuspense>
    </div>
  </main>
</template>
