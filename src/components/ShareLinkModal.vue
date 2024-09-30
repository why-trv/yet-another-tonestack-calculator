<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white px-4 py-2.5 rounded-sm shadow-lg w-full max-w-xl border border-gray-300 relative">
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close"
      >
        <svg class="stroke-current h-5 w-5" role="button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20">
          <title>Close</title>
          <g>
            <path d="M4.3423 4.3423L19.6577 19.6577" stroke-width="1.7"></path>
            <path d="M4.3423 19.6577L19.6577 4.3423" stroke-width="1.7"></path>
          </g>
        </svg>
      </button>
      <h2 class="leading-tight text-xl font-bold mb-2 text-gray-800 pr-8">Share Link</h2>
      <div class="mb-1">
        <textarea
          ref="linkTextarea"
          :value="link"
          readonly
          rows="5"
          class="w-full border border-gray-300 px-2 py-1 ring-focus text-sm resize-none hyphens-none break-all"
        ></textarea>
      </div>
      <div class="flex justify-end items-center">
        <button
          @click="copyToClipboard"
          class="w-20 ml-2 px-4 py-1 bg-gray-700 text-white text-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {{ copyButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  link: String,
});

const emit = defineEmits(['close']);

const copyButtonText = ref('Copy');
const linkTextarea = ref(null);

function copyToClipboard() {
  navigator.clipboard.writeText(props.link)
    .then(() => {
      copyButtonText.value = 'Copied!';
      setTimeout(() => {
        copyButtonText.value = 'Copy';
      }, 2000);
    })
    .catch((err) => {
      console.error('Failed to copy link: ', err);
      copyButtonText.value = 'Error';
      setTimeout(() => {
        copyButtonText.value = 'Copy';
      }, 2000);
    });
};

function handleKeydown(event) {
  if (event.key === 'Escape' && props.isOpen) {
    emit('close');
  }
};

function selectTextareaContent() {
  if (linkTextarea.value) {
    linkTextarea.value.select();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  selectTextareaContent();
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    // Use nextTick to ensure the DOM has updated
    nextTick(selectTextareaContent);
  }
});
</script>