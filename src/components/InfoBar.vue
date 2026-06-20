<template>
  <div class="text-sm px-3 pr-8 py-2 relative min-[530px]:-mt-1 mb-2" :class="styles[variant]?.bar" :role="variant === 'error' ? 'alert' : 'status'">
    <span class="block sm:inline">
      <slot />
    </span>
    <span class="absolute top-0 bottom-0 right-0 px-2 py-2 cursor-pointer" @click="$emit('close')">
      <svg class="stroke-current h-5 w-5" :class="styles[variant]?.icon" role="button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20">
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
  variant: {
    type: String,
    default: 'info',
    validator: (v) => ['info', 'error'].includes(v)
  }
});

defineEmits(['close']);

const styles = {
  info:  { bar: 'bg-blue-100 text-blue-800', icon: 'text-blue-800' },
  error: { bar: 'bg-red-100 text-red-700',   icon: 'text-red-700' },
};
</script>
