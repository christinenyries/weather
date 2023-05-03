<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col items-center gap-4 py-6 sm:flex-row">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-xl"></i>
          <p class="text-2xl">The Local Weather</p>
        </div>
      </RouterLink>

      <div class="flex flex-1 justify-end gap-3">
        <i
          class="fa-solid fa-circle-info cursor-pointer text-xl duration-150 hover:text-weather-secondary-focus"
          @click="showModal = !showModal"
        ></i>
        <i
          v-if="route.query.preview"
          class="fa-solid fa-plus cursor-pointer text-xl duration-150 hover:text-weather-secondary-focus"
          @click="savePlace"
        ></i>
      </div>

      <BaseModal v-model="showModal">
        <h1 class="mb-1 text-2xl">About:</h1>
        <p class="mb-4">
          The Local Weather allows you to track the current and future weather of cities of your
          choosing.
        </p>
        <h2 class="text-2xl">How it works:</h2>
        <ol class="mb-4 list-inside list-decimal">
          <li>Search for your city by entering the name into the search bar.</li>
          <li>
            Select a city within the results, this will take you to the current weather for your
            selection.
          </li>
          <li>
            Track the city by clicking on the "+" icon in the top right. This will save the city to
            view at a later time on the home page.
          </li>
        </ol>

        <h2 class="text-2xl">Removing a city</h2>
        <p>
          If you no longer wish to track a city, simply select the city within the home page. At the
          bottom of the page, there will be an option to delete the city.
        </p>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { uid } from 'uid'

import { type LocalStorageValue, getLocalStorage, setLocalStorage } from '@/utilities'

const route = useRoute()
const router = useRouter()

const savedPlaces = ref<LocalStorageValue[]>([])

const savePlace = () => {
  savedPlaces.value = getLocalStorage('savedPlaces')

  if (route.name !== 'place') return

  const { id: placeId } = route.params as Record<string, string>
  const { lat, lon, name } = route.query as Record<string, string>

  const currentPlace = {
    id: uid(),
    placeId,
    name,
    coords: {
      lat: parseInt(lat),
      lon: parseInt(lon)
    }
  }

  savedPlaces.value.push(currentPlace)
  setLocalStorage('savedPlaces', savedPlaces.value)

  const newQuery = {
    ...route.query,
    id: currentPlace.id, // to use when place is removed from `savedPlaces`
    preview: undefined // remove `currentPlace` is no longer a preview after save
  }
  router.replace({ query: newQuery })
}

const showModal = ref(false)
</script>
