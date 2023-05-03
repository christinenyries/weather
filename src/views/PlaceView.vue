<template>
  <div>
    <BaseSuspense>
      <AsyncPlaceView />
      <template #fallback>
        <PlaceViewSkeleton />
      </template>
    </BaseSuspense>
  </div>
</template>

<script setup lang="ts">
import AsyncPlaceView from '@/components/AsyncPlaceView.vue'
import PlaceViewSkeleton from '@/components/PlaceViewSkeleton.vue'
</script>
