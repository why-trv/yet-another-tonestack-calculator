<template>
  <div class="flex items-center space-x-2">
    <label :for="name" class="text-sm font-medium w-[1.375rem] flex-shrink-0">
      {{ tonestack.getComponentDisplayLetter(name) }}<sub>{{ tonestack.getComponentDisplaySubscript(name) }}</sub>
    </label>
    <div class="flex items-center flex-grow">
      <input :id="name" :value="inputValue" :style="{ color: highlighted ? highlightColor : '' }"
        @focus="(input) => input.target.select()" @input="handleInput($event.target.value)"
        @change="updateValue($event.target.value)" @keypress="restrictInput" @wheel.prevent="handleWheel"
        class="cursor-text w-full h-7 bg-white border border-gray-400 outline-none focus:ring-2 rounded-none px-2 py-1 text-sm text-center hover:bg-gray-50 ring-focus focus:border-r" />
      <div class="flex flex-row">
        <button @mousedown="startChanging(-1)" @mouseup="stopChanging" @mouseleave="stopChanging" tabindex="-1"
          class="w-7 h-7 align-middle -ml-px border border-solid border-gray-700 bg-gray-100 text-gray-700 text-base rounded-none hover:bg-gray-700 hover:text-white ring-focus focus:border-l">−</button>
        <button @mousedown="startChanging(1)" @mouseup="stopChanging" @mouseleave="stopChanging" tabindex="-1"
          class="w-7 h-7 align-middle -ml-px border border-solid border-gray-700 bg-gray-100 text-gray-700 text-base rounded-none hover:bg-gray-700 hover:text-white ring-focus focus:border-l">+</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  formatComponentValue,
  parseComponentValue,
  testComponentValueInputChar,
  sanitizeComponentValueInput
} from '~/utils/components';
import { areApproximatelyEqual } from '~/utils/js'

const props = defineProps({
  tonestack: {
    type: Object,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  },
  highlightColor: {
    type: String,
    required: true
  }
});

const inputValue = ref(formatComponentValue(props.modelValue));
const emit = defineEmits(['update:modelValue']);

let changeTimeout = null;
const startRepeatInterval = 350;
const minRepeatInterval = 100;
let repeatInterval = startRepeatInterval;

const highlighted = computed(() => !props.tonestack.hasDefaultComponentValue(props.name));

watch(() => props.modelValue, (newValue) => {
  inputValue.value = formatComponentValue(newValue);
});

function restrictInput(event) {
  if (!testComponentValueInputChar(event.key, props.name)) {
    event.preventDefault();
  }
}

function handleInput(value) {
  inputValue.value = sanitizeComponentValueInput(value, props.name);
}

function updateValue(value) {
  const parsedValue = parseComponentValue(value, props.name);
  if (parsedValue !== null && parsedValue != props.modelValue) {
    emit('update:modelValue', parsedValue);
  } else {
    // If parsing fails, or the value is the same (but may have been typed 
    // differently and looking wrong), revert to the formatted value of the
    // current modelValue
    inputValue.value = formatComponentValue(props.modelValue);
  }
}

function handleWheel(event) {
  emit('update:modelValue',
    findNextStandardValue(props.modelValue, event.deltaY < 0));
}

function startChanging(direction) {
  emit('update:modelValue',
    findNextStandardValue(props.modelValue, direction > 0));

  repeatInterval = startRepeatInterval;
  timeoutTick(direction);
}

function timeoutTick(direction) {
  changeTimeout = setTimeout(() => {
    emit('update:modelValue',
      findNextStandardValue(props.modelValue, direction > 0));
    repeatInterval = Math.max(repeatInterval - 20, minRepeatInterval);
    timeoutTick(direction);
  }, repeatInterval);
}

function stopChanging() {
  if (changeTimeout) {
    clearTimeout(changeTimeout);
    changeTimeout = null;
  }
}

// R, C, L or B (transistor beta), basically
const componentType = computed(() => props.name.substring(0, 1));

const componentRanges = {
  R: { min: 0, max: 1e9, smallest: 1 },
  C: { min: 0, max: 100e-6, smallest: 1e-12 },
  L: { min: 0, max: 100, smallest: 1e-6 },
  B: { min: 1, max: 1000, smallest: 1 }
};

const standardMantissas = [
  1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0,
  3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1
];

function findNextStandardValue(value, increase) {
  const type = componentType.value;
  const range = componentRanges[type] || { min: 0, max: Number.MAX_VALUE, smallest: 1 };

  if (type === 'B') {
    return increase
      ? Math.min(Math.floor(value) + 1, range.max)
      : Math.max(Math.floor(value) - 1, range.min);
  }

  if (!increase && value === 0) return 0;
  if (increase && value === 0) return range.smallest;

  const exp = Math.floor(Math.log10(value));
  const scale = Math.pow(10, exp);
  const mantissa = value / Math.pow(10, exp);

  let nextValue;
  if (increase) {
    const nextIndex = standardMantissas.findIndex(v => v > mantissa && !areApproximatelyEqual(v, mantissa));
    if (nextIndex === -1) {
      nextValue = standardMantissas[0] * Math.pow(10, exp + 1);
    } else {
      nextValue = standardMantissas[nextIndex] * Math.pow(10, exp);
    }
  } else {
    const prevIndex = standardMantissas.findLastIndex(v => v < mantissa && !areApproximatelyEqual(v, mantissa));
    if (prevIndex === -1) {
      if (scale <= range.smallest) return 0; // If we're at the smallest magnitude, go to 0
      nextValue = standardMantissas[standardMantissas.length - 1] * Math.pow(10, exp - 1);
    } else {
      nextValue = standardMantissas[prevIndex] * Math.pow(10, exp);
    }
  }

  return Math.min(nextValue, range.max);
}
</script>