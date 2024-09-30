<template>
  <div>
    <!-- Adding 20px right side overflow to make sure the rightmost x-axis label 
     doesn't get clipped - we'll compensate for that later in chart setup -->
    <div ref="magnitudeChartContainer" style="width: calc(100% + 20px); height: 400px;"></div>
    <div ref="phaseChartContainer" style="width: calc(100% + 20px); height: 400px; margin-top: 5px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { generateFrequencies, isMobileOrTablet } from '~/utils/utils';

const props = defineProps({
  responses: Array,
  plotRanges: {
    type: Object,
    default: {
      magnitude: [-48, 0]
      // Phase is always -180..180
    }
  }
});

const PHASE_RANGE = [-180, 180];

const magnitudeChartContainer = ref(null);
const phaseChartContainer = ref(null);
let magnitudeChart = null;
let phaseChart = null;

function createCharts() {
  if (magnitudeChart) magnitudeChart.dispose();
  if (phaseChart) phaseChart.dispose();

  magnitudeChart = echarts.init(magnitudeChartContainer.value);
  phaseChart = echarts.init(phaseChartContainer.value);

  initializeCharts();

  [magnitudeChart, phaseChart].forEach((chart) => {
    // Gonna synchronize zooming between magnitude and phase charts
    chart.group = 'responses';

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

// Sets constant parts of the options object
function initializeCharts() {
  if (!magnitudeChart || !phaseChart) {
    return;
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

  const xAxis = {
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

  // TODO: Figure out how to clip grid lines outside the plot area when zooming
  function createCommonOptions(isMagnitude) {
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
          const freq = params[0].axisValue;
          let freqFormatted = formatFrequency(freq);
          const unit = isMagnitude ? 'dB' : '°';

          let result = `<div style="text-align: center; margin-bottom: 5px; font-size: 0.9em;">${freqFormatted} Hz</div>`;
          result += '<table style="width: 100%; font-size: 0.9em;">';
          params.forEach(param => {
            const value = param.data[1].toFixed(1);
            const color = param.color;
            result += `
              <tr>
                <td style="padding: 1px 0;">
                  <span style="background-color: ${color}; color: white; font-weight: 500; padding: 1px 4px; margin-right: 5px;">${param.seriesName}</span>
                </td>
                <td style="width: 4em; text-align: right; padding: 1px 0;">
                  ${value} ${unit}
                </td>
              </tr>`;
          });
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
      xAxis: xAxis,
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
  };

  const magnitudeOption = {
    ...createCommonOptions(true),
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
    ...createCommonOptions(false),
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

  magnitudeChart.setOption(magnitudeOption, { replaceMerge: 'series' });
  phaseChart.setOption(phaseOption, { replaceMerge: 'series' });

  updateCharts();
}

function updateCharts() {
  if (!magnitudeChart || !phaseChart) return;

  // Update only the part of 'option' that may have changed
  const magnitudeOption = {
    yAxis: {
      min: props.plotRanges.magnitude[0] - 1,
      max: props.plotRanges.magnitude[1] + 1,
      axisLabel: {
        // Setting custom labels seems important to avoid labels with 
        // decimals when zooming in or
        customValues: generateLabelValues(6, props.plotRanges.magnitude),
      },
      axisTick: {
        customValues: generateLabelValues(1, props.plotRanges.magnitude)
      }
    },
    series: props.responses.map((response, index) => ({
      id: response.id,
      name: response.label,
      type: 'line',
      data: response.response.magnitudes,
      color: response.color,
      symbol: 'none',
    }))
  };

  const phaseOption = {
    // NB: Not changing phase range, lines and labels, unlike magnitude
    series: props.responses.map((response, index) => ({
      id: response.id,
      name: response.label,
      type: 'line',
      data: response.response.phases,
      color: response.color,
      symbol: 'none'
    }))
  };

  // { replaceMerge: 'series' } makes sure series that no longer exists is 
  // removed for the chart. For this it's crucial that we provide consistent 
  // unique ids (in our case tonestack index should work well)
  magnitudeChart.setOption(magnitudeOption, { replaceMerge: 'series' });
  phaseChart.setOption(phaseOption, { replaceMerge: 'series' });
}

function handleResize() {
  magnitudeChart.resize();
  phaseChart.resize();
}

onMounted(() => {
  createCharts();
  window.addEventListener('resize', handleResize);
});

watch(() => props.responses, updateCharts, { deep: true });

onUnmounted(() => {
  window.addEventListener('resize', handleResize);
  if (magnitudeChart) magnitudeChart.dispose();
  if (phaseChart) phaseChart.dispose();
});
</script>