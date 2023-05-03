<template>
  <Teleport to="body ">
    <Transition name="modal-outer">
      <div
        v-show="showModal"
        class="absolute left-0 top-0 flex h-screen w-full justify-center bg-black bg-opacity-30"
      >
        <Transition name="modal-inner">
          <div v-show="showModal" class="mt-32 max-w-screen-md self-start rounded-md bg-white p-10">
            <slot></slot>
            <div class="text-right">
              <button
                class="mt-8 rounded-md bg-weather-secondary px-6 py-2 uppercase tracking-wide hover:bg-weather-secondary-focus hover:text-white"
                @click="toggle"
              >
                Close
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const showModal = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})
const toggle = () => {
  showModal.value = !showModal.value
}
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
