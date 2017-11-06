import _ from 'underscore';
import check, { assert } from 'check-types';

export const mdBreakpoints = (function(breakpoints) {
  const breakpointArray = breakpoints.slice(0);
  const breakpointObject = {};
  while (breakpointArray.length) {
    let breakpoint = breakpointArray.shift()
    breakpointObject['from' + breakpoint] = { minWidth: breakpoint };
    breakpointArray.forEach(function(tobreakpoint) {
      breakpointObject['from' + breakpoint + 'to' + tobreakpoint] = {
        minWidth: breakpoint, maxWidth: tobreakpoint-1
      }
    })
    breakpointObject['to' + breakpoint] = { maxWidth: breakpoint-1 };
  }
  return breakpointObject;
})([0, 360, 400, 480, 600, 720, 840, 960, 1024, 1280, 1440, 1600, 1920]);

export const removeOverlap = function (primary, secondary) {
  assert.string(primary);
  assert.string(secondary);

  secondary = secondary.replace(' - ', ' ');
  if (primary == secondary || primary.indexOf(secondary) !== -1) {
    return '';
  }
  if (secondary.indexOf(primary) !== -1) {
    return secondary.replace(primary, "");
  }
  let primaryWords = primary.split(' ');
  let secondaryWords = secondary.split(' ');
  let uniqWords = _.uniq(primaryWords.concat(secondaryWords));
  secondaryWords = uniqWords.slice(primaryWords.length);
  return secondaryWords.join(' ').trim();
};

export const calculatePayout = function (odds){
  assert.array.of.number(odds);

  let impliedProbabilities = _.map(odds,(odd)=>1/odd);
  let totalProbability = (1/_.reduce(impliedProbabilities,(memo, impliedProbability)=>{
    return memo + impliedProbability;
  },0));

  assert.number(totalProbability);
  return totalProbability;
};
