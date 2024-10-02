import { Tapers, PotDisplayRangeID, PotDisplayRanges, PotAuxDisplayMode } from '~/utils/components';
import { topologies, defaultTopology } from '~/models/tonestacks/_index';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  saveToFile,
  loadFromFile,
  generateUrl,
  loadFromUrl
} from '~/utils/stateManagement';

const colorPalette = [
  '#1d4ed8', '#dc2626', '#059669', '#f97316', '#6b21a8',
  '#60a5fa', '#f472b6', '#34d399', '#eab308', '#a855f7' 
];

const flatTopologies = Object.values(topologies).flat();
// Array of tonestack responses to reuse in recalculation
const responses = [];
let autosaveDebounceTimer;

// App state
// Note that tonestacks is an array of tonestack instances added and possibly
// edited by the user, while topologies are tonestacks in their default states,
// despite being instances of the same classes
const state = reactive({
  tonestacks: [],
  selectedIndex: 0,
  selectedTopologyIndex: 0,
  globalControlEnabled: false,
  globalControls: {},
  globalControlValues: {},
  potDisplayRange: PotDisplayRanges[PotDisplayRangeID.DEFAULT],
  potAuxDisplayMode: PotAuxDisplayMode.Values,
  selectedTonestack: computed(() => state.tonestacks[state.selectedTonestackIndex]),
  selectedTopology: computed(() => flatTopologies[state.selectedTopologyIndex]),
  currentControls: computed(() => (state.globalControlEnabled
    ? state.globalControls
    : state.selectedTonestack.controls)),
  currentControlValues: computed(() => (state.globalControlEnabled
    ? state.globalControlValues
    : state.selectedTonestack.controlValues)),
  tonestackNotesComponent: computed(() => state.selectedTonestack.getNotesComponent()),
  plotRanges: computed(() => {
    return state.tonestacks.reduce((range, ts) => {
      range.magnitude[0] = Math.min(range.magnitude[0], ts.magnitudePlotRange[0]);
      range.magnitude[1] = Math.max(range.magnitude[1], ts.magnitudePlotRange[1]);
      return range;
    }, {
      magnitude: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
    });
  }),
  responses: computed(() => {
    // If null, the tonestack will use its own control values
    const overrideValues = state.globalControlEnabled ? state.globalControlValues : null;

    // Make sure the responses array is long enough
    while (responses.length < state.tonestacks.length) {
      responses.push({});
    }

    return state.tonestacks.map((ts, index) => {
      if (!ts.visible) {
        // Skip calculation if tonestack is not visible
        return null;
      }

      const response = ts.calculateResponse(overrideValues, responses[index]);
      return {
        // tonestack index as the id for ECharts 
        // (crucial to be able to delete chart series)
        id: index,
        label: ts.displayLabel,
        response,
        color: getTonestackColor(index)
      };
    }).filter(Boolean); // Filter out null invisible responses
  })
});

watch(() => state.tonestacks, (tonestacks) => {
  let controls = {}

  for (const ts of tonestacks) {
    for (const key in ts.controls) {
      if (!controls.hasOwnProperty(key)) {
        controls[key] = {};
        Object.assign(controls[key], ts.controls[key]);

        // Add default global control value
        if (!state.globalControlValues.hasOwnProperty(key)) {
          state.globalControlValues[key] = 0.5;
        }
      }
    }
  }

  state.globalControls = controls;
}, { deep: true, flush: 'post' });

watch(() => state.selectedTonestackIndex, (newIndex) => {
  selectTopologyWithId(state.tonestacks[newIndex].id);
}, { flush: 'post' });

// Watch relevant properties to auto-save state
watch(() => [state.tonestacks,
state.selectedTonestackIndex,
state.globalControlEnabled,
state.globalControlValues,
state.potDisplayRange,
state.potAuxDisplayMode],
  () => {
    // Debounce auto-saving to local storage
    clearTimeout(autosaveDebounceTimer);
    autosaveDebounceTimer = setTimeout(() => {
      saveToLocalStorage(getStateDataToSave());
    }, 300);
  },
  { flush: 'post', deep: true });

function initialize() {
  // Try to load state from URL first
  const urlData = loadFromUrl();
  if (urlData && Object.keys(urlData).length > 0) {
    setStateFromCompactSavedData(urlData);
  } else {
    // If no URL state, try to load from local storage
    const data = loadFromLocalStorage();
    if (data) {
      setStateFromSavedData(data);
    } else {
      // If no saved state, initialize with default topology
      reset();
    }
  }
}

function reset() {
  selectTopologyWithId(defaultTopology.id);
  const tonestack = createNewTonestackWithSelectedTopology();
  state.tonestacks = [tonestack];
  selectTonestack(0);  
}

function addTonestack() {
  // Use the currently selected topology
  const tonestack = createNewTonestackWithSelectedTopology();

  const index = state.tonestacks.push(tonestack) - 1;
  selectTonestack(index);
}

function deleteTonestack(index) {
  // Not letting delete the last remaining tonestack
  if (state.tonestacks.length < 2) {
    return;
  }

  state.tonestacks.splice(index, 1);
  if (state.selectedTonestackIndex === index) {
    // If it's the selected tonestacked that was deleted, default to the first one
    selectTonestack(0);
  } else if (state.selectedTonestackIndex > index) {
    // Make sure the selected tonestack stay selected, despite its index changing    
    selectTonestack(state.selectedTonestackIndex - 1);
  }
}

function toggleTonestackVisibility(index) {
  if (state.tonestacks[index]) {
    state.tonestacks[index].visible = !state.tonestacks[index].visible;
  }
}

function selectTonestack(index) {
  state.selectedTonestackIndex = index;
}

function getTonestackColor(index) {
  return colorPalette[index % colorPalette.length];
}

function resetSelectedTonestackComponentValues() {
  if (state.selectedTonestack) {
    state.selectedTonestack.resetToDefaultComponents();
  }
}

function setSelectedTonestackControlTaper(controlName, taperName) {
  if (state.globalControlEnabled) {
    throw new Error("You aren't supposed to change control taper while in global control mode");
  }

  state.selectedTonestack.controls[controlName] = Tapers[taperName];
}

// Sets the control value for global controls or selected tonestack,
// depending on global control state
function setControlValue(controlName, value) {
  if (state.globalControlEnabled) {
    state.globalControlValues[controlName] = value;
  } else {
    state.selectedTonestack.controlValues[controlName] = value;
  }
}

function selectTopology(index) {
  state.selectedTopologyIndex = index;

  if (state.selectedTonestack && state.selectedTonestack.id === state.selectedTopology.id) {
    return;
  }

  const tonestack = createNewTonestackWithSelectedTopology();
  const tsIndex = state.selectedTonestackIndex;
  state.tonestacks.splice(tsIndex, 1, tonestack);
  selectTonestack(tsIndex);
}

function selectTopologyWithId(id) {
  selectTopology(flatTopologies.findIndex(t => t.id === id));
}

function nudgeSelectedTopology(increment) {
  const length = flatTopologies.length;
  const newIndex = (state.selectedTopologyIndex + increment + length) % length;
  selectTopology(newIndex);
}

function saveStateToFile() {
  let filename = state.tonestacks[0].displayLabel;
  if (state.tonestacks.length > 1) {
    filename += ' and others';
  }
  saveToFile(getStateDataToSave(), filename);
}

function loadStateFromFile(file) {
  if (file) {
    return loadFromFile(file)
      .then(data => {
        setStateFromSavedData(data);
        return state;
      });
  }

  return Promise.reject(new Error('No file provided'));
}

function generateShareableUrl() {
  return generateUrl(getCompactStateDataToSave());
}

function createNewTonestackWithSelectedTopology() {
  const selectedTopology = flatTopologies[state.selectedTopologyIndex];
  const constructor = selectedTopology.__proto__.constructor;
  return new constructor();
}

function createNewTonestackWithId(id) {
  const topology = flatTopologies.find(t => t.id === id);
  const constructor = topology.__proto__.constructor;
  return new constructor();
}

// 'Regular' serialization
function getStateDataToSave() {
  return {
    selectedTonestackIndex: state.selectedTonestackIndex,
    globalControlEnabled: state.globalControlEnabled,
    globalControlValues: state.globalControlValues,
    potDisplayRange: state.potDisplayRange.id,
    potAuxDisplayMode: state.potAuxDisplayMode,
    tonestacks: state.tonestacks.map(ts => {
      const obj = {
        id: ts.id,
        components: {}
      };

      if (typeof ts.label === 'string' && ts.label.length > 0) {
        obj.label = ts.label;
      }
      if (typeof ts.gainOffset === 'number' && ts.gainOffset !== 0) {
        obj.gainOffset = ts.gainOffset;
      }
      if (ts.visible === false) {
        obj.visible = ts.visible;
      }

      // Combine components and controls (pots)
      Object.entries(ts.components).forEach(([name, value]) => {
        if (ts.controls[name]) {
          // This is a control (potentiometer)
          obj.components[name] = {
            value: formatComponentValue(value),
            taper: ts.controls[name].id,
            control: ts.controlValues[name]
          };
        } else {
          // This is a 'static' component
          obj.components[name] = formatComponentValue(value);
        }
      });

      return obj;
    })
  };
}

// 'Compact' serialization (short keys, control properties are packed as arrays)
// intended for URL generation, packing maximum amount of data into minimum text
function getCompactStateDataToSave() {
  return {
    s: state.selectedTonestackIndex,
    g: state.globalControlEnabled,
    v: state.globalControlValues,
    r: state.potDisplayRange.id,
    x: state.potAuxDisplayMode,
    t: state.tonestacks.map(ts => {
      const obj = {
        i: ts.id,
        c: {}
      };

      if (typeof ts.label === 'string' && ts.label.length > 0) {
        obj.l = ts.label;
      }
      if (typeof ts.gainOffset === 'number' && ts.gainOffset !== 0) {
        obj.g = ts.gainOffset;
      }
      if (ts.visible === false) {
        obj.vi = ts.visible;
      }

      // Combine components and controls (pots)
      Object.entries(ts.components).forEach(([name, value]) => {
        if (ts.controls[name]) {
          // This is a control (potentiometer)
          obj.c[name] = [
            formatComponentValue(value),
            ts.controls[name].id,
            ts.controlValues[name]
          ];
        } else {
          // This is a 'static' component
          obj.c[name] = formatComponentValue(value);
        }
      });

      return obj;
    })
  };
}

// 'Regular' deserialization
function setStateFromSavedData(data) {
  state.selectedTonestackIndex = data.selectedTonestackIndex || 0,
  state.globalControlEnabled = data.globalControlEnabled || false;
  state.globalControlValues = data.globalControlValues || {};
  state.potDisplayRange = PotDisplayRanges[data.potDisplayRange] || PotDisplayRanges[PotDisplayRangeID.DEFAULT];
  state.potAuxDisplayMode = data.potAuxDisplayMode || PotAuxDisplayMode.None;
  state.tonestacks = data.tonestacks.map(data => {
    const ts = createNewTonestackWithId(data.id);
    ts.label = data.label || '';
    ts.gainOffset = data.gainOffset || 0;
    ts.visible = data.visible !== undefined ? data.visible : true;

    const controlValues = {};

    // Iterate tonestack components, not data.components, to avoid getting extraneous data
    // in there (e.g. components that have since been renamed)
    for (const name in ts.components) {
      const value = data.components[name];

      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        // This is a control (potentiometer)
        ts.setComponentValue(name, value.value);        

        const taper = Object.keys(Tapers).find(id => id === value.taper);
        if (taper) {
          ts.controls[name] = Tapers[taper];
        }

        controlValues[name] = value.control;
      } else {
        // This is a 'static' component
        ts.setComponentValue(name, value);        
      }
    }

    ts.controlValues = controlValues;

    return ts;
  }).filter(ts => ts !== null);
}

// 'Compact' deserialization (short keys, control properties are packed as arrays)
function setStateFromCompactSavedData(data) {
  state.selectedTonestackIndex = data.s || 0,
  state.globalControlEnabled = data.g || false;
  state.globalControlValues = data.v || {};
  state.potDisplayRange = state.potDisplayRange = PotDisplayRanges[data.r] || PotDisplayRanges[PotDisplayRangeID.DEFAULT];
  state.potAuxDisplayMode = data.x || PotAuxDisplayMode.None;
  state.tonestacks = data.t.map(data => {
    const ts = createNewTonestackWithId(data.i);
    ts.label = data.l || '';
    ts.gainOffset = data.g || 0;
    ts.visible = data.vi !== undefined ? data.vi : true;

    const controlValues = {};

    // Iterate tonestack components, not data.c, to avoid getting extraneous data
    // in there (e.g. components that have since been renamed)
    for (const name in ts.components) {
      const value = data.c[name];

      if (Array.isArray(value)) {
        // This is a control (potentiometer)
        ts.setComponentValue(name, value[0]);        

        const taper = Object.keys(Tapers).find(id => id === value[1]);
        if (taper) {
          ts.controls[name] = Tapers[taper];
        }

        controlValues[name] = value[2];
      } else {
        // This is a 'static' component
        ts.setComponentValue(name, value);        
      }
    }

    ts.controlValues = controlValues;

    return ts;
  }).filter(ts => ts !== null);
}

export function useStore() {
  return {
    state,
    topologies,
    initialize,
    reset,
    addTonestack,
    deleteTonestack,
    toggleTonestackVisibility,
    selectTonestack,
    getTonestackColor,
    setSelectedTonestackControlTaper,
    setControlValue,
    selectTopology,
    selectTopologyWithId,
    nudgeSelectedTopology,
    resetSelectedTonestackComponentValues,
    saveStateToFile,
    loadStateFromFile,
    generateShareableUrl
  };
}