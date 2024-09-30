<template>
  <div class="text-sm bg-red-100 text-red-700 px-3 py-2 relative -mt-1 mb-2" role="alert">    
    <span class="block sm:inline">{{ message }}</span>
    <span class="absolute top-0 bottom-0 right-0 px-2 py-2" @click="$emit('close')">
      <svg class="stroke-current h-5 w-5 text-red-700" role="button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20">
        <title>Close</title>
        <g>
          <path d="M4.3423 4.3423L19.6577 19.6577" stroke-width="1.7"></path>
          <path d="M4.3423 19.6577L19.6577 4.3423" stroke-width="1.7"></path>
        </g>
      </svg>
    </span>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
});

defineEmits(['close']);
</script>