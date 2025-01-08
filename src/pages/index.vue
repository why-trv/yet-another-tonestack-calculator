<template>
  <!-- Use ClientOnly on Teleport to avoid 'Hydration children mismatch' with Nuxt -->
  <ClientOnly>
    <Teleport to="#nav-slot">
      <div class="col-span-3 flex justify-center space-x-4">
        <button @click="clearCurrentState"
          class="flex flex-col items-center p-1 text-gray-800 stroke-gray-800 hover:text-black hover:stroke-black group relative ring-focus"
          title="New List">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20">
            <g>
              <path d="M16.3758 1.0605H2.1544V22.9395H21.8456V6.5302L16.3758 1.0605Z" stroke-width="1.5"></path>
              <path d="M15.2819 1.0605V7.6242H21.8456" stroke-width="1.5"></path>
            </g>
          </svg>
          <span class="tooltip">New List</span>
        </button>
        <button @click="triggerFileInput"
          class="flex flex-col items-center p-1 text-gray-800 stroke-gray-800 hover:text-black hover:stroke-black group relative ring-focus"
          title="Open File">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20">
            <g>
              <path d="M1.0605 1.0605H22.9395V22.9395H1.0605Z" stroke-width="1.5"></path>
              <path d="M7.6242 11.453L12 7.0772L16.3758 11.453" stroke-width="1.5"></path>
              <path d="M12 18.0167V7.0772" stroke-width="1.5"></path>
            </g>
          </svg>
          <span class="tooltip">Open File</span>
        </button>
        <button @click="exportState"
          class="flex flex-col items-center p-1 text-gray-800 stroke-gray-800 hover:text-black hover:stroke-black group relative ring-focus"
          title="Save to File">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20">
            <g>
              <path d="M7.6242 12.547L12 16.9228L16.3758 12.547" stroke-width="1.5"></path>
              <path d="M12 16.9228V5.9833" stroke-width="1.5"></path>
              <path d="M1.0605 1.0605H22.9395V22.9395H1.0605Z" stroke-width="1.5"></path>
            </g>
          </svg>
          <span class="tooltip">Save to File</span>
        </button>
        <input type="file" ref="fileInput" @change="importState" class="hidden" accept=".json">
        <button @click="generateShareableLink"
          class="flex flex-col items-center p-1 text-gray-800 stroke-gray-800 hover:text-black hover:stroke-black group relative ring-focus"
          title="Share Link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20">
            <g>
              <path d="M12 4.3423H1.0605V22.9395H19.6577V12" stroke-width="1.5"></path>
              <path d="M9.8121 14.1879L22.9395 1.0605" stroke-width="1.5"></path>
              <path d="M14.1879 1.0605H22.9395V9.8121" stroke-width="1.5"></path>
            </g>
          </svg>
          <span class="tooltip">Share Link</span>
        </button>
      </div>
    </Teleport>
  </ClientOnly>

  <div>
    <!-- Tonestack Instances List -->
    <div class="mb-3 border-b border-gray-400">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-3">
        <div v-for="(ts, index) in state.tonestacks" :key="index"
          class="rounded-none text-sm overflow-hidden border cursor-pointer ring-focus"
          :class="state.selectedTonestackIndex === index ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300'"
          @click="store.selectTonestack(index)">
          <div class="flex justify-between space-x-2 items-center p-1.5">
            <div class="flex items-center space-x-2">
              <span class="font-semibold px-1.5 py-1 rounded-none text-white"
                :style="{ backgroundColor: store.getTonestackColor(index) }">
                {{ ts.displayLabel }}
              </span>
              <span v-if="!areGainsAppoximatelyEqual(ts.gainOffset, 0)" class="text-xs text-gray-600">
                {{ formatGain(ts.gainOffset) }}
              </span>
            </div>
            <span v-if="ts.displayLabel !== ts.name" class="text-xs text-gray-400">
              {{ ts.name }}
            </span>
            <div class="flex space-x-2">
              <!-- Toggle visibility button -->
              <button @click.stop="store.toggleTonestackVisibility(index)"
                class="text-gray-600 hover:text-blue-500 ring-focus"
                :title="ts.visible ? 'Hide response' : 'Show response'">
                <svg class="stroke-current h-5 w-5" role="button" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" height="24" width="24">
                  <g v-if="ts.visible">
                    <path
                      d="M12.081 4c-4.664 0 -7 4 -10.5 8 3.5 4 5.836 8 10.5 8s7 -4 10.5 -8c-3.5 -4 -5.836 -8 -10.5 -8Z"
                      stroke-width="1.5"></path>
                    <path d="M9.081 12a3 3 0 1 0 6 0 3 3 0 1 0 -6 0" stroke-width="1.5"></path>
                  </g>
                  <g v-if="!ts.visible">
                    <path
                      d="M1.024 6.7732C5.1201 10.4319 7.1246 14.0906 12 14.0906C16.8754 14.0906 18.7095 10.4319 22.976 6.7732"
                      stroke-width="1.5"></path>
                    <path d="M1.4614 12.0002L3.8903 9.5714" stroke-width="1.5"></path>
                    <path d="M22.3681 11.9999L19.9885 9.6203" stroke-width="1.5"></path>
                    <path d="M7.2108 17.2268L9.0443 13.5597" stroke-width="1.5"></path>
                    <path d="M16.6188 17.2266L14.8093 13.6077" stroke-width="1.5"></path>
                  </g>
                </svg>
              </button>
              <!-- Not letting to delete a tonestack if it's the last one left -->
              <button v-if="state.tonestacks.length > 1" @click.stop="store.deleteTonestack(index)" title="Delete"
                class="self-start text-gray-600 hover:text-red-500 ring-focus">
                <svg class="stroke-current h-5 w-5" role="button" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" height="20" width="20">
                  <title>Delete</title>
                  <g>
                    <path d="M4.3423 4.3423L19.6577 19.6577" stroke-width="1.7"></path>
                    <path d="M4.3423 19.6577L19.6577 4.3423" stroke-width="1.7"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <div class="px-1.5 pb-1 pt-0">
            <table class="w-full table-fixed text-xs">
              <thead>
                <tr>
                  <th v-for="name in visibleComponentNames[index]" :key="name" :class="{ 'w-3': name === false }"
                    class="font-medium text-left pr-1">
                    {{ name === false ? '...' : ts.getComponentDisplayLetter(name) }}<sub v-if="name !== false">{{
                      ts.getComponentDisplaySubscript(name) }}</sub>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-for="name in visibleComponentNames[index]" :key="name"
                    :style="{ color: !ts.hasDefaultComponentValue(name) ? store.getTonestackColor(index) : '' }"
                    class="pr-1">
                    {{ name === false ? '' : formatComponentValue(ts.components[name]) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- New Instance Button -->
        <div @click="store.addTonestack()" tabindex="0"
          class="p-1 bg-gray-100 rounded-none text-sm flex items-center justify-center cursor-pointer hover:bg-gray-200 border border-gray-50 ring-focus">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Left Column: Controls and Components -->
      <div>
        <!-- Controls and Components -->
        <div v-if="state.selectedTonestack">
          <div class="mb-4">
            <div class="flex flex-wrap 2xl:flex-nowrap justify-stretch md:justify-between items-center gap-x-3 gap-y-2 mb-2">
              <div class="flex grow justify-stretch md:justify-start">
                <!-- Tonestack Topology Select -->
                <select :value="state.selectedTopology.id"
                  aria-label="Tonestack Topology"
                  class="topology-select grow md:w-[17.5rem] border border-gray-400 rounded-none px-2 py-1 text-sm sm:text-base font-bold bg-white focus:border-r ring-focus"
                  @change="store.selectTopologyWithId($event.target.value)">
                  <optgroup v-for="(array, category) in store.topologies" :label="category">
                    <option v-for="topology in array" :key="topology.id" :value="topology.id">
                      {{ topology.name }}
                    </option>
                  </optgroup>
                </select>
                <!-- Previous Topology Button -->
                <button @click="store.nudgeSelectedTopology(-1)"
                 aria-label="Previous Topology"
                  class="self-stretch px-2 py-1 -ml-px border border-solid border-gray-700 bg-gray-100 text-gray-700 text-xs rounded-none hover:bg-gray-700 hover:text-white ring-focus">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <!-- Next Topology Button -->
                <button @click="store.nudgeSelectedTopology(1)" aria-label="Next Topology"
                  class="self-stretch px-2 py-1 -ml-px border border-solid border-gray-700 bg-gray-100 text-gray-700 text-xs rounded-none hover:bg-gray-700 hover:text-white ring-focus">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
              <div class="flex flex-grow 2xl:justify-end gap-2">
                <input type="text" v-model="state.selectedTonestack.label" placeholder="Label"
                  class="2xl:max-w-60 flex-grow hover:cursor-text text-sm placeholder:italic placeholder:text-gray-300 bg-transparent border-b border-gray-300 hover:text-gray-700 focus:outline-none focus:ring-2 focus:border-slate-500" />
                <GainControl v-model="state.selectedTonestack.gainOffset" />
              </div>
            </div>
          </div>

          <div
            class="pb-3 mb-3 border-b border-gray-400 grid grid-cols-1 md:grid-cols-[1fr_10rem] items-start gap-4">
            <!-- SVG Schematic -->
            <div class="min-h-full h-full flex flex-col">
              <div class="grow p-4 border bg-white border-gray-300">
                <img :src="`/images/schematics/${state.selectedTonestack.schematic}.svg`"
                  :alt="state.selectedTonestack.name + ' Tonestack Schematic'" class="object-contain mx-auto min-h-64 min-w-[50%] h-full" />
              </div>
              <div v-if="state.selectedTonestack.description" v-html="state.selectedTonestack.description"
                class="mt-2 text-xs text-gray-600">
              </div>
              <component v-if="state.selectedTonestack.getNotesComponent()"
                :is="state.selectedTonestack.getNotesComponent()" :tonestack="state.selectedTonestack" class="my-2">
              </component>
            </div>

            <!-- Component Values -->
            <div class="min-w-8">
              <div class="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-1 gap-x-4 gap-y-1 md:gap-1">
                <ComponentValueEditor v-for="(value, name) in state.selectedTonestack.components" :key="name"
                  :name="name" :tonestack="state.selectedTonestack"
                  :highlightColor="store.getTonestackColor(state.selectedTonestackIndex)"
                  v-model="state.selectedTonestack.components[name]" />
              </div>
              <div class="w-full mt-3">
                <button @click="store.resetSelectedTonestackComponentValues()"
                  class="w-full h-8 px-2 py-1 bg-gray-700 border border-gray-900 text-gray-50 text-sm rounded-none hover:bg-gray-600 ring-focus">
                  Default
                </button>
              </div>
            </div>
          </div>

          <div class="mb-4 border-b border-gray-400">
            <!-- Control Mode-->
            <TabControl v-model="state.globalControlEnabled" :options="[
              { value: false, label: 'This Tonestack' },
              { value: true, label: 'Global' }
            ]" class="mb-2">
              <div class="max-w-32 xs:max-w-max flex justify-end flex-wrap gap-x-1">
                <select v-if="!state.globalControlEnabled"
                  aria-label="Extra Display Value"
                  @change="updatePotAuxDisplayMode($event.target.value)"
                  class="grow text-sm border-x border-t border-gray-400 rounded-none px-2 py-1 bg-white ring-focus">
                  <optgroup label="Extra">
                    <option v-for="(value, key) in PotAuxDisplayMode" :key="value" :value="value"
                      :selected="state.potAuxDisplayMode === value">
                      {{ key }}
                    </option>
                  </optgroup>
                </select>
                <select
                  aria-label="Slider Numbering"
                  @change="updatePotDisplayRange($event.target.value)"
                  class="grow text-sm border-x border-t border-gray-400 rounded-none px-2 py-1 bg-white ring-focus">
                  <optgroup label="Numbering">
                    <option v-for="(range, id) in PotDisplayRanges" :key="id" :value="id"
                      :selected="state.potDisplayRange.id === id">
                      {{ range.name }}
                    </option>
                  </optgroup>
                </select>
              </div>
            </TabControl>

            <!-- Sliders -->
            <div class="grid grid-cols-1 gap-3 mb-2">
              <SliderBlock v-for="(taper, controlName) in state.currentControls" :key="controlName" :name="controlName"
                v-model="state.currentControlValues[controlName]"
                :taper="taper"
                :options="state.selectedTonestack.controlOptions[controlName]"
                :is-global="state.globalControlEnabled"
                :display-range="state.potDisplayRange" :aux-display-mode="state.potAuxDisplayMode"
                :component-value="state.selectedTonestack.components[controlName]"
                @update:taper="store.setSelectedTonestackControlTaper(controlName, $event)"
                @update:modelValue="store.setControlValue(controlName, $event)" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Plots -->
      <div class="md:sticky md:top-4">
        <ResponseChart
          v-model:responseSettings="state.responseSettings"
          :responses="state.responses"
          :plotRanges="state.plotRanges"
        />
      </div>
    </div>
    <ShareLinkModal :is-open="isShareLinkModalOpen" :link="shareableLink" @close="isShareLinkModalOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

import { useStore } from '~/utils/state';
import {
  formatComponentValue,
  formatGain,
  areGainsAppoximatelyEqual,
  PotDisplayRanges,
  PotAuxDisplayMode
} from '~/utils/components';

import TabControl from '../components/TabControl.vue';
import ComponentValueEditor from '../components/ComponentValueEditor.vue';
import SliderBlock from '../components/SliderBlock.vue';
import GainControl from '../components/GainControl.vue';
import ShareLinkModal from '../components/ShareLinkModal.vue';

const store = useStore();
const state = store.state;

const fileInput = ref(null);
const isShareLinkModalOpen = ref(false);
const shareableLink = ref('');

const emit = defineEmits(['error']);

const visibleComponentNames = computed(() => {
  // Limit to the number of components displayed below the tonestack name/label
  // in the list, otherwise it gets crowded and the values overlap
  const maxNumComponentsInList = 10;

  let res = [];
  state.tonestacks.map((ts, index) => {
    let names = Object.keys(ts.components);

    if (names.length > maxNumComponentsInList) {
      // Gonna show only the first few components
      names = [...names.slice(0, maxNumComponentsInList - 1), false];
    }

    res[index] = names;
  });

  return res;
});

onMounted(() => {
  try {
    store.initialize();
  } catch (error) {
    store.reset();
    console.warn('Unable to load configuration: ', error);
    emit('error', 'Unable to load configuration from URL or autosave, sticking to defaults');
  }
});

function updatePotDisplayRange(id) {
  state.potDisplayRange = PotDisplayRanges[id];
}

function updatePotAuxDisplayMode(value) {
  state.potAuxDisplayMode = value;
}

function exportState() {
  store.saveStateToFile();
}

function triggerFileInput() {
  fileInput.value.click();
}

function importState(event) {
  store.loadStateFromFile(event.target.files[0])
    .catch(error => {
      console.error('Error loading state from file:', error);
      emit('error', "Unable to load state from file. Are you sure it's the right format?");
    });
}

function generateShareableLink() {
  const url = store.generateShareableUrl();
  shareableLink.value = url;
  isShareLinkModalOpen.value = true;
}

function clearCurrentState() {
  if (confirm('This will clear the current tonestack list. Do you want to proceed?')) {
    store.reset();
  }
}
</script>

<style scoped>
.topology-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.2rem center;
  background-size: 1.25em;
}

.topology-select::-ms-expand {
  display: none;
}

.tooltip {
  @apply mb-0 absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-0.5 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300;
  text-align: center;
  white-space: nowrap;
}
</style>