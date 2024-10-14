<template>
  <div v-if="modelValue || (modelValue === 0)" class="flex items-center h-6 gap-x-2 sm:gap-x-3">
    <label :for="name" class="w-7 text-sm font-medium">{{ getComponentLetter(name) }}<sub>{{ getComponentSubscript(name)
        }}</sub></label>
    <select v-if="!isGlobal" :value="taper.name" @change="$emit('update:taper', $event.target.value)"
      aria-label="Taper"
      class="w-18 text-sm bg-transparent ring-focus">
      <option v-for="(taperOption, taperName) in Tapers" :key="taperName" :value="taperName">
        {{ taperName }}
      </option>
    </select>
    <div class="inline-block w-7 text-sm font-medium">{{ getDisplayValue() }}</div>
    <div v-if="!isGlobal && auxDisplayMode !== PotAuxDisplayMode.None" class="inline-block w-9 flex flex-col">
      <span class="leading-none text-xs text-gray-500 text-right">
        {{ auxDisplayValue1 }}
      </span>
      <span v-if="auxDisplayMode === PotAuxDisplayMode.Values && options?.role === PotRole.Pot"
        class="leading-none text-xs text-gray-500 text-right border-t border-gray-400">
        {{ auxDisplayValue2 }}
      </span>
    </div>
    <input :id="name" @input="$emit('update:modelValue', normalizeValue(parseFloat($event.target.value)))" type="range"
      :min="range[0]" :max="range[1]" :step="STEP" :value="unnormalizedValue" class="grow"
      @wheel.prevent="handleWheel" />
  </div>
</template>

<script setup>
import {
  getComponentLetter,
  getComponentSubscript,
  formatComponentValue,
  Tapers,
  PotRole,
  PotDisplayRanges,
  PotDisplayRangeID,
  PotAuxDisplayMode
} from "~/utils/components"

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  },
  taper: {
    type: Object,
    required: true
  },
  options: {
    type: Object,    
  },
  isGlobal: {
    type: Boolean,
    default: false
  },
  displayRange: {
    type: Object,
    required: true
  },
  auxDisplayMode: {
    type: String,
    required: true
  },
  componentValue: {
    type: Number
  }
});

const STEP = 0.1;

const emit = defineEmits(['update:modelValue', 'update:taper']);

const range = computed(() => {
  const dr = props.displayRange || PotDisplayRanges[PotDisplayRangeID.DEFAULT];
  return dr.range;
});

const unnormalizedValue = computed(() => {
  return range.value[0] + props.modelValue * (range.value[1] - range.value[0])
});

const taperedValue = computed(() => {
  let v = props.taper.positionToValue(props.modelValue);
  
  if (props.options?.reverse) {
    v = 1 - v;
  }

  if (props.auxDisplayMode !== PotAuxDisplayMode.Values) {
    return v;
  }

  v = props.componentValue * v;
  // Limit precision to avoid floating-point quirks in some cases
  v = Math.round((10e5 * v)) / 10e5;
  return v;
});

const auxDisplayValue1 = computed(() => {
  switch (props.auxDisplayMode) {
    case PotAuxDisplayMode.Values:
      return formatComponentValue(taperedValue.value);
    case PotAuxDisplayMode.Percentage:
      return Math.round(taperedValue.value * 100).toFixed(0) + '%';
    default:
      return '';
  }
});

const auxDisplayValue2 = computed(() => {
  if (props.auxDisplayMode !== PotAuxDisplayMode.Values || props.options?.role !== PotRole.Pot) {
    return '';
  }

  return formatComponentValue(props.componentValue - taperedValue.value);
});

function getDisplayValue() {
  return unnormalizedValue.value.toFixed(1);
}

function normalizeValue(value) {
  let norm = (value - range.value[0]) / (range.value[1] - range.value[0]); // Normalize range  
  return Math.max(0, Math.min(1, norm)); // Clamp between 0 and 1
}

function handleWheel(event) {
  const normalSpeed = 2 * STEP; // Faster scroll without Shift
  const slowSpeed = STEP; // Slower scroll with Shift

  // Go slow if Shift is pressed or if scrolling horizontally 
  const useSlowSpeed = event.shiftKey;

  const change = useSlowSpeed ? slowSpeed : normalSpeed;
  const delta = event.wheelDelta / 120;

  let value = unnormalizedValue.value + (delta * change);
  value = normalizeValue(value);
  emit('update:modelValue', value);
}
</script>
