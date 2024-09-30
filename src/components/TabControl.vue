<template>
  <div class="flex justify-between items-center border-b border-gray-800">
    <div class="flex border-x border-t border-gray-800 rounded-none overflow-hidden">
      <button
        v-for="option in options"
        :key="option.value"
        @click="$emit('update:modelValue', option.value)"
        :class="[
          'px-3 py-1 text-sm focus:outline-none transition-colors',
          modelValue === option.value
            ? 'bg-gray-700 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        ]"
      >
        {{ option.label }}
      </button>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  options: {
    type: Array,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>