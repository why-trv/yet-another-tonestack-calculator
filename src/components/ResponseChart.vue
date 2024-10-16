<template>
  <div>
    <!-- Checkboxes -->
    <div class="flex justify-center gap-x-2 sm:gap-x-8 mb-2">
      <label class="flex items-center">
        <input
          type="checkbox"
          v-model="responseSettings.magnitude"
        >
        <span class="ml-1 sm:ml-2 text-sm text-gray-700">Magnitude</span>
      </label>
      <label class="flex items-center">
        <input
          type="checkbox"
          v-model="responseSettings.phase"
        >
        <span class="ml-1 sm:ml-2 text-sm text-gray-700">Phase</span>
      </label>
      <label class="flex items-center">
        <input
          type="checkbox"
          v-model="responseSettings.scope"
        >
        <span class="ml-1 sm:ml-2 text-sm leading-tight text-gray-700">Scope <small class="text-gray-400">(experimental)</small></span>
      </label>
    </div>

    <!-- Plots -->
    <div class="gap-y-2">
      <div v-show="responseSettings.magnitude">
        <div ref="magnitudeChartContainer" class="chart"></div>
      </div>
      <div v-show="responseSettings.phase">
        <div ref="phaseChartContainer" class="chart"></div>
      </div>
      <div v-show="responseSettings.scope" class="mt-4 flex flex-col">
        <FrequencySlider v-model="responseSettings.scopeFrequency" />
        <div ref="scopeChartContainer" class="chart"></div>
        <div class="self-center text-xs text-gray-500">
          <p>Note that this is just a response of a linear tonestack model to square wave input.</p>
          <p>Opamps, if present, are ideal opamps with infinite slew rate.</p>
          <p>This might break in edge cases, please <a href="https://github.com/why-trv/yet-another-tonestack-calculator/issues/new" target="_blank" rel=" noopener noreferrer">report</a> if you find any issues.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { generateFrequencies, isMobileOrTablet } from '~/utils/utils';
import { areApproximatelyEqual } from '~/utils/js';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {
  GridComponent,
  DataZoomComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import FrequencySlider from './FrequencySlider.vue';

echarts.use([
  LineChart,
  CanvasRenderer,
  GridComponent,
  DataZoomComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent
]);

const props = defineProps({
  responses: Array,
  plotRanges: {
    type: Object,
    default: () => ({
      magnitude: [-48, 0]
      // Phase is always -180..180
    })
  },
  responseSettings: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:responseSettings']);

const PHASE_RANGE = [-180, 180];
const SCOPE_INPUT_SERIES_ID = 'i';

const magnitudeChartContainer = ref(null);
const phaseChartContainer = ref(null);
const scopeChartContainer = ref(null);
let magnitudeChart = null;
let phaseChart = null;
let scopeChart = null;

function createCharts() {
  if (magnitudeChart) magnitudeChart.dispose();
  if (phaseChart) phaseChart.dispose();
  if (scopeChart) scopeChart.dispose();

  magnitudeChart = echarts.init(magnitudeChartContainer.value);
  phaseChart = echarts.init(phaseChartContainer.value);
  scopeChart = echarts.init(scopeChartContainer.value);

  initializeCharts();

  [magnitudeChart, phaseChart, scopeChart].forEach((chart) => {
    // Gonna synchronize zooming between magnitude and phase charts
    // (but not for the scope chart)
    if (chart !== scopeChart) {
      chart.group = 'responses';
    }

    // Don't enable click-and-drag zoom for mobiles and tablets, because it
    // interferes with scrolling, AND there's an issue with double click to zoom out
    // (see https://github.com/apache/echarts/issues/19341)
    if (!isMobileOrTablet()) {
      // Enable click-and-drag zoom
      chart.on('finished', () => {
        chart.dispatchAction({
          type: 'takeGlobalCursor',
          key: 'dataZoomSelect',
          dataZoomSelectActive: true,
        });
        chart.off('finished');
      });
    }

    // Add double-click event listeners to reset zoom
    let zr = chart.getZr();
    zr.on('dblclick', function (params) {
      chart.dispatchAction({
        type: 'dataZoom',
        start: 0,
        end: 100
      })
    });
  });

  // Synchronize zooming between magnitude and phase charts
  echarts.connect('responses');
}

function formatFrequency(value) {
  if (value >= 1000) {
    return (value / 1000) + 'k';
  }
  return value.toString();
}

function generateLabelValues(interval, range) {
  let start = range[0];
  let end = range[1];
  // Adjust the start to the first number divisible by interval
  start = Math.ceil(start / interval) * interval;
  // Generate the array of numbers
  const result = [];
  for (let i = start; i <= end; i += interval) {
    result.push(i);
  }
  return result;
}

// Expects a sequence of interleaved color and number of repeats pairs
function makeColorPattern(pattern) {
  const colors = [];
  for (let i = 0; i < pattern.length; i += 2) {
    for (let k = 0; k < pattern[i + 1]; k++) {
      colors.push(pattern[i]);
    }
  }
  return colors;
};

// Sets constant parts of the options object
function initializeCharts() {
  if (!magnitudeChart || !phaseChart || !scopeChart) {
    return;
  }

  const freqAxis = {
    type: 'log',
    name: 'Frequency (Hz)',
    nameLocation: 'middle',
    nameGap: 23,
    min: 10,
    max: 1e5,
    axisLabel: {
      customValues: [1e1, 1e2, 1e3, 1e4, 1e5],
      formatter: (value) => formatFrequency(value),
      fontFamily: 'retni-sans, sans-serif'
    },
    axisLine: { onZero: false },
    nameTextStyle: {
      fontFamily: 'retni-sans, sans-serif'
    },
    axisTick: {
      show: false,
      alignWithLabel: true,
      customValues: generateFrequencies(10, 1e5)
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: makeColorPattern([
          'rgba(0, 0, 0, 0.25)', 1,
          'rgba(0, 0, 0, 0.05)', 3,
          'rgba(0, 0, 0, 0.08)', 1,
          'rgba(0, 0, 0, 0.05)', 4])
      }
    }
  };

  const timeAxis = {
    type: 'value',
    name: 'Time (ms)',
    nameLocation: 'middle',
    nameGap: 23,
    min: (value) => value.min,
    max: (value) => value.max,
    axisLabel: {
      formatter: (value) => value.toFixed(2).replace(/\.?0+$/, ''),
      fontFamily: 'retni-sans, sans-serif'
    },
    axisLine: { onZero: false },
    nameTextStyle: {
      fontFamily: 'retni-sans, sans-serif'
    },
    axisTick: {
      show: false,
      alignWithLabel: true,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(0, 0, 0, 0.15)'
      }
    }
  };

  // TODO: Figure out how to clip grid lines outside the plot area when zooming
  function createCommonOptions(plotType) {
    return {
      textStyle: {
        fontFamily: 'retni-sans, sans-serif'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); border-radius: 0;',
        transitionDuration: 0.35,
        formatter: function (params) {
          const xValue = params[0].axisValue;
          let xFormatted, xUnit, yUnit, yDecimals;

          if (plotType === 'magnitude') {
            xFormatted = formatFrequency(xValue);
            xUnit = 'Hz';
            yUnit = 'dB';
            yDecimals = 1;
          } else if (plotType === 'phase') {
            xFormatted = formatFrequency(xValue);
            xUnit = 'Hz';
            yUnit = '°';
            yDecimals = 1;
          } else if (plotType === 'scope') {
            xFormatted = xValue.toFixed(2);
            xUnit = 'ms';
            yUnit = '';
            yDecimals = 3;

            // Workaround for https://github.com/apache/echarts/issues/15488, that makes it so
            // that series with x value not exactly matching the rest of the series don't
            // get passed as params to the tooltip formatter.
            // We're gonna manually add required properties for the missing series.
            const refParam = params.find(p => p.seriesId !== SCOPE_INPUT_SERIES_ID);
            const existingIds = params.map(p => p.seriesId);
            const initialLength = params.length;

            if (refParam === undefined) {
              return;
            }

            for (const s of scopeChart.getOption().series) {
              if (s && s.id !== SCOPE_INPUT_SERIES_ID
                 && !existingIds.includes(s.id)) {
                const dataIndex = binaryFindClosest(s.data, xValue,
                                                    (a, b) => a[0] - b, refParam.dataIndex);

                if (areApproximatelyEqual(s.data[dataIndex][0], xValue, 1e-4)) {
                  params.push({
                    seriesId: s.id,
                    seriesName: s.name,
                    data: s.data[refParam.dataIndex],
                    color: s.color
                  })
                }
              }
            }

            if (params.length !== initialLength) {
              params.sort((a, b) => a.seriesId - b.seriesId);
            }
          }

          let result = `<div style="text-align: center; margin-bottom: 5px; font-size: 0.9em;">${xFormatted} ${xUnit}</div>`;
          result += '<table style="width: 100%; font-size: 0.9em;">';
          for (const param of params) {
            if (param.seriesId === SCOPE_INPUT_SERIES_ID) {
              continue;
            }

            const value = param.data[1].toFixed(yDecimals);
            const color = param.color;
            result += `
              <tr>
                <td style="padding: 1px 0;">
                  <span style="background-color: ${color}; color: white; font-weight: 500; padding: 1px 4px; margin-right: 5px;">${param.seriesName}</span>
                </td>
                <td style="width: 4em; text-align: right; padding: 1px 0;">
                  ${value}${yUnit}
                </td>
              </tr>`;
          }
          result += '</table>';
          return result;
        },
      },
      grid: {
        left: '43px',
        // Now adding the same 20px (+1) offset to the right to make it
        // look inline with the surrounding layout
        right: '21px',
        top: '6em',
        bottom: '10%',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        show: true
      },
      xAxis: plotType === 'scope' ? timeAxis : freqAxis,
      animationEasingUpdate: 'cubicOut',
      animationDuration: 120,
      animationDurationUpdate: 120,
      toolbox: {
        id: 'toolbox',
        feature: {
          dataZoom: {
            icon: {
              // A hack to remove zoom-related buttons until there's a proper way
              // to just enable area zoom on click
              // (see https://github.com/apache/echarts/issues/13397)
              zoom: 'path://',
              back: 'path://'
            }
          },
          // Cannot reliably do this because we have to dispatchAction() of type
          // 'takeGlobalCursor' to do click-and-drag zooming
          // saveAsImage: {
          //   name: 'Tonestack Response',
          //   pixelRatio: 2
          //   // excludeComponents: ['toolbox', 'tooltip']
          // }
        },
        iconStyle: {
          borderColor: 'rgb(55, 65, 81)'
        },
        emphasis: {
          iconStyle: {
            borderColor: 'rgb(55, 65, 81)',
            textFill: 'rgb(55, 65, 81)'
          }
        },
        top: '5px'
      },
      dataZoom: [
        {
          type: 'select',
          xAxisIndex: [0],
          filterMode: 'none'
        },
        {
          type: 'select',
          yAxisIndex: [0],
          filterMode: 'none'
        }
      ],
    }
  }

  const magnitudeOption = {
    ...createCommonOptions('magnitude'),
    yAxis: {
      name: 'Magnitude (dB)',
      nameLocation: 'middle',
      nameGap: 44,
      nameRotate: 90,
      type: 'value',
      min: props.plotRanges.magnitude[0] - 1,
      max: props.plotRanges.magnitude[1] + 1,
      minInterval: 1,
      axisLabel: {
        fontFamily: 'retni-sans, sans-serif',
        // Setting custom labels seems important to avoid labels with
        // decimals when zooming in or
        customValues: generateLabelValues(6, props.plotRanges.magnitude),
      },
      nameTextStyle: {
        fontFamily: 'retni-sans, sans-serif',
        align: 'right',
        verticalAlign: 'top',
        padding: [0, 0, 20, 0]
      },
      axisTick: {
        show: false,
        alignWithLabel: true,
        customValues: generateLabelValues(1, props.plotRanges.magnitude)
      },
      splitLine: {
        show: true,
        interval: 6,
        lineStyle: {
          // Dark lines every 6 dB, lighter every 3 dB, even lighter every 1 dB
          color: makeColorPattern([
            'rgba(0, 0, 0, 0.25)', 1,
            'rgba(0, 0, 0, 0.033)', 2,
            'rgba(0, 0, 0, 0.08)', 1,
            'rgba(0, 0, 0, 0.033)', 2
          ])
        }
      }
    }
  };

  const phaseOption = {
    ...createCommonOptions('phase'),
    yAxis: {
      name: 'Phase (degrees)',
      nameLocation: 'middle',
      nameGap: 44,
      nameRotate: 90,
      type: 'value',
      // Make the range a bit wider to have some place for lines at the edges
      min: PHASE_RANGE[0] - 0.5,
      max: PHASE_RANGE[1] + 0.5,
      interval: 30,
      axisTick: {
        show: false,
        alignWithLabel: true,
        customValues: generateLabelValues(10, PHASE_RANGE)
      },
      splitLine: {
        show: true,
        interval: 30,
        lineStyle: {
          // Dark lines every 90 deg, lighter every 30 deg, even lighter every 10 deg
          color: makeColorPattern([
            'rgba(0, 0, 0, 0.25)', 1,
            'rgba(0, 0, 0, 0.033)', 2,
            'rgba(0, 0, 0, 0.08)', 1,
            'rgba(0, 0, 0, 0.033)', 2,
            'rgba(0, 0, 0, 0.08)', 1,
            'rgba(0, 0, 0, 0.033)', 2
          ])
        }
      },
      axisLabel: {
        fontFamily: 'retni-sans, sans-serif',
        // Setting custom labels seems important to avoid labels with
        // decimals when zooming in
        customValues: generateLabelValues(30, PHASE_RANGE)
      },
      nameTextStyle: {
        fontFamily: 'retni-sans, sans-serif',
        align: 'right',
        verticalAlign: 'top',
        padding: [0, 0, 20, 0]
      }
    }
  };

  const timeOption = {
    ...createCommonOptions('scope'),
    yAxis: {
      name: 'Voltage',
      nameLocation: 'middle',
      nameGap: 44,
      nameRotate: 90,
      interval: 0.5,
      min: (value) => Math.min(value.min, -1.4) - 0.1,
      max: (value) => Math.max(value.max, 1.4) + 0.1,
      type: 'value',
      axisLabel: {
        fontFamily: 'retni-sans, sans-serif',
      },
      nameTextStyle: {
        fontFamily: 'retni-sans, sans-serif',
        align: 'right',
        verticalAlign: 'top',
        padding: [0, 0, 20, 0]
      },
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
      axisLabel: {
        fontFamily: 'retni-sans, sans-serif',
      },
      splitLine: {
        show: true,
        // interval: 0.5,
        lineStyle: {
          color: makeColorPattern([
            'rgba(0, 0, 0, 0.25)', 1,
            'rgba(0, 0, 0, 0.05)', 4
          ])
        }
      }
    }
  };

  magnitudeChart.setOption(magnitudeOption, { replaceMerge: 'series' });
  phaseChart.setOption(phaseOption, { replaceMerge: 'series' });
  scopeChart.setOption(timeOption, { replaceMerge: 'series' });

  updateCharts();
}

function updateCharts() {
  if (!magnitudeChart || !phaseChart || !scopeChart) return;

  // Update only the charts that are currently visible and only the part
  // of 'option' that may have changed.
  //
  // { replaceMerge: 'series' } makes sure series that no longer exists is
  // removed for the chart. For this it's crucial that we provide consistent
  // unique ids (in our case tonestack index should work well)
  if (props.responseSettings.magnitude) {
    const magnitudeOption = {
      yAxis: {
        min: props.plotRanges.magnitude[0] - 1,
        max: props.plotRanges.magnitude[1] + 1,
        axisLabel: {
          customValues: generateLabelValues(6, props.plotRanges.magnitude),
        },
        axisTick: {
          customValues: generateLabelValues(1, props.plotRanges.magnitude)
        }
      },
      series: props.responses.map((response) => ({
        id: response.id,
        name: response.label,
        type: 'line',
        data: response.response.magnitudes,
        color: response.color,
        symbol: 'none',
      }))
    };
    magnitudeChart.setOption(magnitudeOption, { replaceMerge: 'series' });
  }

  if (props.responseSettings.phase) {
    const phaseOption = {
      series: props.responses.map((response) => ({
        id: response.id,
        name: response.label,
        type: 'line',
        data: response.response.phases,
        color: response.color,
        symbol: 'none'
      }))
    };
    phaseChart.setOption(phaseOption, { replaceMerge: 'series' });
  }

  if (props.responseSettings.scope) {
    const fundamental = props.responseSettings.scopeFrequency;
    const halfPeriod = 1000 / (2 * fundamental);
    const repeats = 3;
    const inputScope = [];
    for (let i = 0; i < repeats * 2; i += 2) {
      inputScope.push(
        [i * halfPeriod, -1],
        [i * halfPeriod + 0.000001, 1],
        [(i + 1) * halfPeriod - 0.000001, 1],
        [(i + 1) * halfPeriod, -1]
      );
    }
    inputScope.push([repeats * 2 * halfPeriod, -1]);

    const series = props.responses.map((response) => ({
      id: response.id,
      name: response.label,
      type: 'line',
      data: response.response.scope,
      color: response.color,
      symbol: 'none',
      sampling: 'minmax'
    }));
    series.push({
      id: SCOPE_INPUT_SERIES_ID,
      name: 'Input',
      type: 'line',
      data: inputScope,
      color: 'rgba(0, 0, 130, 0.3)',
      symbol: 'none',
      silent: true
    });

    // These defaults have to match the yAxis.min and yAxis.max functions above
    let max = 1.4;
    let min = -1.4;
    for (const s of series) {
      for (const d of s.data) {
        max = Math.max(max, d[1]);
        min = Math.min(min, d[1]);
      }
    }
    max += 0.1;
    min -= 0.1;

    const tickInterval = max > 5 ? 1 : 0.1;
    let patternStart = Math.round((((Math.floor(-min / tickInterval) * tickInterval) % 0.5) / tickInterval));
    const timeOption = {
      series: series,
      yAxis: {
        axisTick: {
          customValues: generateLabelValues(tickInterval,
                                            [Math.ceil(min / tickInterval) * tickInterval,
                                             Math.floor(max / tickInterval) * tickInterval])
        },
        axisLabel: {
          customValues: generateLabelValues(1,
                                            [Math.ceil(min),
                                             Math.floor(max)])
        },
        splitLine: {
          lineStyle: {
            color: makeColorPattern([
              'rgba(0, 0, 0, 0.05)', patternStart,
              'rgba(0, 0, 0, 0.25)', 1,
              'rgba(0, 0, 0, 0.05)', 4 - patternStart
            ])
          }
        }
      }
    };
    scopeChart.setOption(timeOption, { replaceMerge: 'series' });
  }
}

function handleResize() {
  magnitudeChart?.resize();
  phaseChart?.resize();
  scopeChart?.resize();
}

onMounted(() => {
  createCharts();
  window.addEventListener('resize', handleResize);
});

watch(() => props.responses, updateCharts, { deep: true });
watch(() => props.responseSettings, (newSettings, oldSettings) => {
  nextTick(() => {
    magnitudeChart?.resize();
    phaseChart?.resize();
    scopeChart?.resize();
    updateCharts();
  });
}, { deep: true });

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (magnitudeChart) magnitudeChart.dispose();
  if (phaseChart) phaseChart.dispose();
  if (scopeChart) scopeChart.dispose();
});
</script>

<style scoped>
.chart {
  width: calc(100% + 20px);
  height: 400px;
}
</style>