<template>
  <Suspense @resolve="resolve">
    <slot v-if="showContent" />
    <slot v-else name="fallback" />
    <template #fallback>
      <slot name="fallback" />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const minFallbackTime = 800
const start = Date.now()
const showContent = ref(false)
const resolve = async () => {
  // wait at least one sec to render data so fallback component doesn't flicker
  const end = Date.now()
  const elapsed = end - start
  if (elapsed < minFallbackTime) {
    // async function completed in less than a sec
    const wait = minFallbackTime - elapsed
    await new Promise((res) => setTimeout(res, wait))
  }
  showContent.value = true
}
</script>
