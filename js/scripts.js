const getAlignedTicksForTwoAxes = require('../src/index');
const DEFAULTS = require('../src/constants');

$(document).ready(function () {
  $('#ticks-min')[0].value = DEFAULTS.minTicks;
  $('#ticks-max')[0].value = DEFAULTS.maxTicks;

  $('#calc-form').on('submit', function (e) {
    e.preventDefault();
    const {
      axisOneMin,
      axisOneMax,
      axisTwoMin,
      axisTwoMax,
      ticksMin,
      ticksMax,
    } = e.target.elements;

    const y1 = {
      min: axisOneMin.value,
      max: axisOneMax.value,
    };
    const y2 = {
      min: axisTwoMin.value,
      max: axisTwoMax.value,
    };
    const minTicks = ticksMin.value;
    const maxTicks = ticksMax.value;

    const result = getAlignedTicksForTwoAxes(y1, y2, minTicks, maxTicks);

    if (typeof result === 'object') {
      $('#result-text')[0].value = JSON.stringify(result, null, 2);
    } else if (result === 'None') {
      $('#result-text')[0].value = 'No alignment fitting those requirements found.';
    } else {
      $('#result-text')[0].value = 'Error performing calculation.';
    }
  });
});