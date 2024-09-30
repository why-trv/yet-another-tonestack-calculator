<template>
  <div v-if="noteData" class="flex flex-wrap justify-between">
    <table class="inline-table mb-2 mr-6 text-left">
      <thead>
        <tr class="border-b border-gray-300">
          <th colspan="4">Biasing</th>
        </tr>
        <tr>
          <th><strong>V<sub>C1</sub></strong></th>
          <th><strong>V<sub>E1</sub></strong></th>
          <th><strong>r<sub>&pi;1</sub></strong></th>
          <th><strong>r<sub>&pi;2</sub></strong></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="pr-4">{{ noteData.VC1.toFixed(2) }} V</td>
          <td class="pr-4">{{ noteData.VE2.toFixed(2) }} V</td>
          <td class="pr-4">{{ noteData.rpi1.toFixed(0) }} &Omega;</td>
          <td class="pr-4">{{ noteData.rpi2.toFixed(0) }} &Omega;</td>
        </tr>
      </tbody>
    </table>

    <table class="inline-table text-left">
      <thead>
        <tr class="border-b border-gray-300">
          <th colspan="4">Frequency</th>
        </tr>
        <tr>
          <th><strong>f<sub>max</sub></strong></th>
          <th><strong>f<sub>min</sub></strong></th>
          <th><strong>Q<sub>max</sub></strong></th>
          <th><strong>Q<sub>min</sub></strong></th>
        </tr>
      </thead>  
      <tbody>
        <tr>
          <td class="pr-4">{{ noteData.fmax.toFixed(0) }} Hz</td>
          <td class="pr-4">{{ noteData.fmin.toFixed(0) }} Hz</td>
          <td class="pr-4">{{ noteData.Qmax.toFixed(2) }}</td>
          <td class="pr-4">{{ noteData.Qmin.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  tonestack: {
    type: Object,
    required: true
  }
});

const noteData = computed(() => props.tonestack.noteData);

</script>