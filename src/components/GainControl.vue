<template>
  <div class="flex items-center space-x-2">
    <label for="gain" class="w-10 text-sm font-medium">Offset</label>
    <input 
      id="gain"
      :value="inputValue"
      @focus="(input) => input.target.select()"
      @input="handleInput($event.target.value)"
      @keypress="restrictInput"
      @change="updateValue($event.target.value)"      
      @wheel.prevent="handleWheel"
      class="w-[4.75rem] h-7 bg-white border border-gray-400 outline-none focus:ring-2 rounded-none px-2 py-1 text-sm text-center hover:bg-gray-50 ring-focus" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { formatGain, parseGain, sanitizeGainInput } from '~/utils/components';

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  }
});

const inputValue = ref(formatGain(props.modelValue));
const emit = defineEmits(['update:modelValue']);

watch(() => props.modelValue, (newValue) => {
  inputValue.value = formatGain(newValue);
});

function restrictInput(event) {
  if (!testGainInputChar(event.key) && event.key !== 'Enter') {
    event.preventDefault();
  }
}

function handleInput(value) {
  inputValue.value = sanitizeGainInput(value);
}

function updateValue(inputValue) {
  const parsedValue = parseGain(inputValue);
  if (parsedValue !== null && parsedValue != props.modelValue) {
    emit('update:modelValue', parsedValue);
  } else {
    // If parsing fails, or the value is the same (but may have been typed 
    // differently and looking wrong), revert to the formatted value of the
    // current modelValue
    inputValue.value = formatGain(props.modelValue);
  }
}

function handleWheel(event) {
  const delta = event.deltaY > 0 ? -0.1 : 0.1;
  updateValue(props.modelValue + delta);
}
</script>