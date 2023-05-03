<template>
  <div class="flex cursor-pointer rounded-md bg-weather-secondary px-3 py-6 shadow-md">
    <div class="flex flex-1 flex-col">
      <h2 class="text-3xl">{{ place.name }}</h2>
    </div>
    <div class="flex flex-col gap-2">
      <p class="self-end text-3xl">{{ Math.round(place.weather.main.temp) }}&deg;C</p>
      <div class="flex gap-2">
        <span class="text-xs"> H: {{ Math.round(place.weather.main.temp_max) }} </span>
        <span class="text-xs"> L: {{ Math.round(place.weather.main.temp_min) }} </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Place } from '@/utilities'

defineProps<{ place: Place }>()
</script>
