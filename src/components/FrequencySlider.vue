<template>
  <div class="flex items-center gap-x-2 mt-2 mb-1 ml-11 mr-5">
    <div class="w-56 text-sm leading-none text-gray-700">Square Wave Frequency: <strong class="ml-2">{{ formatFrequency(modelValue) }}</strong></div>
    <input
     @input="updateFrequency(parseInt($event.target.value))"
     type="range"
     :min="0"
     :max="frequencies.length - 1"
     :step="1"
     :value="currentIndex"
     class="grow"
     @wheel.prevent="handleWheel" />    
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { generateFrequencies } from '~/utils/utils';

const frequencies = generateFrequencies(20, 20e3, 0.1);

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const currentIndex = computed(() => {
  return frequencies.findIndex(f => f >= props.modelValue);
});

function updateFrequency(index) {
  emit('update:modelValue', frequencies[index]);
}

function handleWheel(event) {
  const delta = event.deltaY > 0 ? -1 : 1;
  const newIndex = Math.max(0, Math.min(frequencies.length - 1, currentIndex.value + delta));
  emit('update:modelValue', frequencies[newIndex]);
}

function formatFrequency(freq) {
  if (freq >= 1000) {
    return (freq / 1000).toFixed(1) + 'kHz';
  } else {
    return freq.toFixed(0) + ' Hz';
  }
}

</script>