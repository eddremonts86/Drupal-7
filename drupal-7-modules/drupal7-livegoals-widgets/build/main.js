(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18n = undefined;

var _i18next = require("i18next");

var _i18next2 = _interopRequireDefault(_i18next);

var _numeral = require("numeral");

var _numeral2 = _interopRequireDefault(_numeral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//let userLanguage = JSON.parse(document.getElementById("js-livegoals-schedule").dataset.config).language || window.navigator.userLanguage || window.navigator.language

var i18n = exports.i18n = _i18next2.default.init({
  interpolation: {
    escapeValue: false
  },
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        "payout": "Payout",
        "loading": "Loading...",
        "overGoals": "Over {{goals}} Goals",
        "underGoals": "Under {{goals}} Goals",
        "longDate": "dddd, MMMM [<b>]Do[</b>]",
        "streamProviders": "Streams provided by: ",
        "poweredBy": "Powered by Livegoals",
        "gamecenter": {
          "commentary": {
            "full": "Full timeline"
          },
          "statistics": {
            "possession": "Possession",
            "cross": "Crosses",
            "corner": "Corner shots",
            "throwin": "Throw-ins",
            "blocked_shots": "Blocked Shots",
            "foulcommit": "Fouls",
            "pass": "Passes",
            "offside": "Offsides",
            "counter": "Counterattacks",
            "goalkick": "Goal kicks",
            "shoton": "Shots on",
            "goal": "Goals",
            "treatment": "Treatments",
            "shotoff": "Shots off",
            "red_cards": "Red Cards",
            "yellow_cards": "Yellow Cards",
            "subst": "Substitutions"
          },
          "lineup": {
            "substitutes": "Substitutes",
            "coach": "Coach"
          },
          "matches": {
            "head2head": "Head to Head",
            "recent": "{{team}} recent games"
          },
          "odds": {
            "ThreeWayOdds": {
              "title": "Match"
            },
            "HalfTimeFullTimeOdds": {
              "title": "Half time / Full time"
            },
            "OverUnderOdds": {
              "title": "Over / Under",
              "Over": "Over",
              "Under": "Under",
              "optionSuffix": " Goals"
            },
            "AsianHandicapOdds": {
              "title": "Asian Handicaps"
            },
            "OddEvenOdds": {
              "title": "Even / Odd score",
              "even": "Even",
              "odd": "Odd"
            },
            "CorrectScoreOdds": {
              "title": "Correct Score"
            },
            "FirstGoalScorerOdds": {
              "title": "First Goal by"
            },
            "LastGoalScorerOdds": {
              "title": "Last Goal by"
            }
          }
        }
      }
    },
    da: {
      translation: {
        "payout": "Udbetaling",
        "loading": "Henter...",

        "overGoals": "Over {{goals}} Mål",
        "underGoals": "Under {{goals}} Mål",
        "longDate": "dddd, [d.] [<b>]Do[</b>] MMMM",
        "streamProviders": "Streams fra: "
      }
    }
  }
});

},{"i18next":154,"numeral":157}],2:[function(require,module,exports){
'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactContainerQuery = require('react-container-query');

var _i18n = require('./i18n.js');

var _widgets = require('./widgets.jsx');

var _gamecenter = require('./widgets/gamecenter.jsx');

var _utils = require('./utils.jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import $ from 'jquery';
/* We use the global because drupal includes it anyway so we might as well save 100kb on the bundle */
/**
 * @file
 */

//remember these
//http://app.livegoals.dk/api/v2.0/tables/league_table/3e645c40-14d4-11e5-80d5-5254005a5aa0/total
//http://app.livegoals.dk/api/v1.2/tournament/3e645c40-14d4-11e5-80d5-5254005a5aa0/odds

//import { createStore } from 'redux';

//console.log(createStore);

$ = window.jQuery;
//import 'moment/locale/sv';


$(function () {
  if (document.getElementById('js-livegoals-schedule')) {
    var config = null;
    if ('config' in document.getElementById('js-livegoals-schedule').dataset) config = JSON.parse(document.getElementById('js-livegoals-schedule').dataset.config);

    var userLanguage = config && 'language' in config && config.language || window.navigator.userLanguage || window.navigator.language;
    _i18n.i18n.changeLanguage(userLanguage);

    _moment2.default.updateLocale('en', {
      ordinal: function ordinal(number, token) {
        var b = number % 10;
        var output = ~ ~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
        return number + '<sup>' + output + '</sup>';
      }
    });
    _moment2.default.locale(userLanguage);

    var CQWidgetSchedule = (0, _reactContainerQuery.applyContainerQuery)(_widgets.WidgetSchedule, _utils.mdBreakpoints);
    (0, _reactDom.render)(_react2.default.createElement(CQWidgetSchedule, {
      config: config
    }), document.getElementById('js-livegoals-schedule'));
  }

  if (document.getElementById('js-livegoals-gamecenter')) {
    var CQWidgetGamecenter = (0, _reactContainerQuery.applyContainerQuery)(_gamecenter.WidgetGamecenter, _utils.mdBreakpoints);
    (0, _reactDom.render)(_react2.default.createElement(CQWidgetGamecenter, JSON.parse(document.getElementById('js-livegoals-gamecenter').dataset.config)), document.getElementById('js-livegoals-gamecenter'));
  }

  if (document.getElementById('js-livegoals-competitiontable')) {
    var CQWidgetCompetitiontable = (0, _reactContainerQuery.applyContainerQuery)(_widgets.WidgetCompetitiontable, _utils.mdBreakpoints);
    (0, _reactDom.render)(_react2.default.createElement(CQWidgetCompetitiontable, JSON.parse(document.getElementById('js-livegoals-competitiontable').dataset.config)), document.getElementById('js-livegoals-competitiontable'));
  }
  if (document.getElementById('js-livegoals-competitiontables')) {
    var CQWidgetCompetitiontables = (0, _reactContainerQuery.applyContainerQuery)(_widgets.WidgetCompetitiontables, _utils.mdBreakpoints);
    (0, _reactDom.render)(_react2.default.createElement(CQWidgetCompetitiontables, JSON.parse(document.getElementById('js-livegoals-competitiontables').dataset.config)), document.getElementById('js-livegoals-competitiontables'));
  }
});

},{"./i18n.js":1,"./utils.jsx":338,"./widgets.jsx":339,"./widgets/gamecenter.jsx":340,"moment":156,"react":328,"react-container-query":162,"react-dom":164}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = fixCase;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _camelcase = require('camelcase');

// If the property is prefixed (i.e., it starts with a hyphen) we have to uppercase the first
// character for React to recognise it properly.

var _camelcase2 = _interopRequireDefault(_camelcase);

function fixCase(prop) {
  var ret = (0, _camelcase2['default'])(prop);
  return (/^-(?!ms)/.test(prop) ? '' + ret.charAt(0).toUpperCase() + ret.substr(1) : ret
  );
}

module.exports = exports['default'];
},{"camelcase":125}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = autoprefix;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _autoprefixerCore = require('autoprefixer-core');

var _autoprefixerCore2 = _interopRequireDefault(_autoprefixerCore);

var _decamelize = require('decamelize');

var _decamelize2 = _interopRequireDefault(_decamelize);

var _fixCase = require('./fix-case');

var _fixCase2 = _interopRequireDefault(_fixCase);

function isRule(_ref) {
  var type = _ref.type;

  return type === 'rule';
}
function isDeclaration(_ref2) {
  var type = _ref2.type;

  return type === 'decl';
}

function parseDeclaration(_ref3) {
  var prop = _ref3.prop;
  var value = _ref3.value;

  return { key: (0, _fixCase2['default'])(prop), value: value };
}
function parseRule(_ref4) {
  var nodes = _ref4.nodes;

  return nodes.filter(isDeclaration).map(parseDeclaration);
}

function objectToStyle(object) {
  return Object.keys(object).map(function (k) {
    return (0, _decamelize2['default'])(k, '-') + ': ' + object[k] + ';';
  }).join('');
}

function cssRule(style) {
  return '* {' + style + '}';
}

function autoprefix(object) {
  var css = cssRule(objectToStyle(object));

  return _autoprefixerCore2['default'].process(css).root.nodes.filter(isRule).map(parseRule).reduce(function (p, c) {
    return p.concat(c);
  }, []).reduce(function (p, c) {
    if (p.hasOwnProperty(c.key)) {
      Array.isArray(p[c.key]) ? p[c.key].push(c.value) : p[c.key] = [p[c.key], c.value];
    } else {
      p = _extends({}, p, _defineProperty({}, c.key, c.value));
    }
    return p;
  }, {});
}

module.exports = exports['default'];
},{"./fix-case":3,"autoprefixer-core":7,"decamelize":126}],5:[function(require,module,exports){
(function() {
  var add, crispedges, feature, flexbox, gradients, logicalProps, prefix, resolution, result, sort, textDecoration,
    slice = [].slice;

  sort = function(array) {
    return array.sort(function(a, b) {
      var d;
      a = a.split(' ');
      b = b.split(' ');
      if (a[0] > b[0]) {
        return 1;
      } else if (a[0] < b[0]) {
        return -1;
      } else {
        d = parseFloat(a[1]) - parseFloat(b[1]);
        if (d > 0) {
          return 1;
        } else if (d < 0) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  };

  feature = function(data, opts, callback) {
    var browser, match, need, ref, ref1, support, version, versions;
    if (!callback) {
      ref = [opts, {}], callback = ref[0], opts = ref[1];
    }
    match = opts.match || /\sx($|\s)/;
    need = [];
    ref1 = data.stats;
    for (browser in ref1) {
      versions = ref1[browser];
      for (version in versions) {
        support = versions[version];
        if (support.match(match)) {
          need.push(browser + ' ' + version);
        }
      }
    }
    return callback(sort(need));
  };

  result = {};

  prefix = function() {
    var data, i, j, k, len, name, names, results;
    names = 2 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 1) : (j = 0, []), data = arguments[j++];
    results = [];
    for (k = 0, len = names.length; k < len; k++) {
      name = names[k];
      result[name] = {};
      results.push((function() {
        var results1;
        results1 = [];
        for (i in data) {
          results1.push(result[name][i] = data[i]);
        }
        return results1;
      })());
    }
    return results;
  };

  add = function() {
    var data, j, k, len, name, names, results;
    names = 2 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 1) : (j = 0, []), data = arguments[j++];
    results = [];
    for (k = 0, len = names.length; k < len; k++) {
      name = names[k];
      results.push(result[name].browsers = sort(result[name].browsers.concat(data.browsers)));
    }
    return results;
  };

  module.exports = result;

  feature(require('caniuse-db/features-json/border-radius'), function(browsers) {
    return prefix('border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius', {
      mistakes: ['-ms-', '-o-'],
      transition: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-boxshadow'), function(browsers) {
    return prefix('box-shadow', {
      transition: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-animation'), function(browsers) {
    return prefix('animation', 'animation-name', 'animation-duration', 'animation-delay', 'animation-direction', 'animation-fill-mode', 'animation-iteration-count', 'animation-play-state', 'animation-timing-function', '@keyframes', {
      mistakes: ['-ms-'],
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-transitions'), function(browsers) {
    return prefix('transition', 'transition-property', 'transition-duration', 'transition-delay', 'transition-timing-function', {
      mistakes: ['-ms-'],
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/transforms2d'), function(browsers) {
    return prefix('transform', 'transform-origin', {
      transition: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/transforms3d'), function(browsers) {
    prefix('perspective', 'perspective-origin', {
      transition: true,
      browsers: browsers
    });
    return prefix('transform-style', 'backface-visibility', {
      browsers: browsers
    });
  });

  gradients = require('caniuse-db/features-json/css-gradients');

  feature(gradients, {
    match: /y\sx/
  }, function(browsers) {
    return prefix('linear-gradient', 'repeating-linear-gradient', 'radial-gradient', 'repeating-radial-gradient', {
      props: ['background', 'background-image', 'border-image', 'list-style', 'list-style-image', 'content', 'mask-image', 'mask'],
      mistakes: ['-ms-'],
      browsers: browsers
    });
  });

  feature(gradients, {
    match: /a\sx/
  }, function(browsers) {
    browsers = browsers.map(function(i) {
      if (/op/.test(i)) {
        return i;
      } else {
        return i + " old";
      }
    });
    return add('linear-gradient', 'repeating-linear-gradient', 'radial-gradient', 'repeating-radial-gradient', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css3-boxsizing'), function(browsers) {
    return prefix('box-sizing', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-filters'), function(browsers) {
    return prefix('filter', {
      transition: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/multicolumn'), function(browsers) {
    prefix('columns', 'column-width', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-width', {
      transition: true,
      browsers: browsers
    });
    return prefix('column-count', 'column-rule-style', 'column-span', 'column-fill', 'break-before', 'break-after', 'break-inside', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/user-select-none'), function(browsers) {
    return prefix('user-select', {
      browsers: browsers
    });
  });

  flexbox = require('caniuse-db/features-json/flexbox');

  feature(flexbox, {
    match: /a\sx/
  }, function(browsers) {
    browsers = browsers.map(function(i) {
      if (/ie|firefox/.test(i)) {
        return i;
      } else {
        return i + " 2009";
      }
    });
    prefix('display-flex', 'inline-flex', {
      props: ['display'],
      browsers: browsers
    });
    prefix('flex', 'flex-grow', 'flex-shrink', 'flex-basis', {
      transition: true,
      browsers: browsers
    });
    return prefix('flex-direction', 'flex-wrap', 'flex-flow', 'justify-content', 'order', 'align-items', 'align-self', 'align-content', {
      browsers: browsers
    });
  });

  feature(flexbox, {
    match: /y\sx/
  }, function(browsers) {
    add('display-flex', 'inline-flex', {
      browsers: browsers
    });
    add('flex', 'flex-grow', 'flex-shrink', 'flex-basis', {
      browsers: browsers
    });
    return add('flex-direction', 'flex-wrap', 'flex-flow', 'justify-content', 'order', 'align-items', 'align-self', 'align-content', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/calc'), function(browsers) {
    return prefix('calc', {
      props: ['*'],
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/background-img-opts'), function(browsers) {
    return prefix('background-clip', 'background-origin', 'background-size', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/font-feature'), function(browsers) {
    return prefix('font-feature-settings', 'font-variant-ligatures', 'font-language-override', 'font-kerning', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/border-image'), function(browsers) {
    return prefix('border-image', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-selection'), function(browsers) {
    return prefix('::selection', {
      selector: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-placeholder'), function(browsers) {
    browsers = browsers.map(function(i) {
      var name, ref, version;
      ref = i.split(' '), name = ref[0], version = ref[1];
      if (name === 'firefox' && parseFloat(version) <= 18) {
        return i + ' old';
      } else {
        return i;
      }
    });
    return prefix(':placeholder-shown', '::placeholder', {
      selector: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-hyphens'), function(browsers) {
    return prefix('hyphens', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/fullscreen'), function(browsers) {
    return prefix(':fullscreen', {
      selector: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css3-tabsize'), function(browsers) {
    return prefix('tab-size', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/intrinsic-width'), function(browsers) {
    return prefix('max-content', 'min-content', 'fit-content', 'fill-available', {
      props: ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height'],
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css3-cursors-newer'), function(browsers) {
    prefix('zoom-in', 'zoom-out', {
      props: ['cursor'],
      browsers: browsers.concat(['chrome 3'])
    });
    return prefix('grab', 'grabbing', {
      props: ['cursor'],
      browsers: browsers.concat(['firefox 24', 'firefox 25', 'firefox 26'])
    });
  });

  feature(require('caniuse-db/features-json/css-sticky'), function(browsers) {
    return prefix('sticky', {
      props: ['position'],
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/pointer'), function(browsers) {
    return prefix('touch-action', {
      browsers: browsers
    });
  });

  textDecoration = require('caniuse-db/features-json/text-decoration');

  feature(textDecoration, function(browsers) {
    return prefix('text-decoration-style', {
      browsers: browsers
    });
  });

  feature(textDecoration, {
    match: /y\sx($|\s)/
  }, function(browsers) {
    return prefix('text-decoration-line', 'text-decoration-color', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/text-size-adjust'), function(browsers) {
    return prefix('text-size-adjust', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-masks'), function(browsers) {
    prefix('mask-clip', 'mask-composite', 'mask-image', 'mask-origin', 'mask-repeat', {
      browsers: browsers
    });
    return prefix('clip-path', 'mask', 'mask-position', 'mask-size', {
      transition: true,
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-boxdecorationbreak'), function(brwsrs) {
    return prefix('box-decoration-break', {
      browsers: brwsrs
    });
  });

  feature(require('caniuse-db/features-json/object-fit'), function(browsers) {
    return prefix('object-fit', 'object-position', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-shapes'), function(browsers) {
    return prefix('shape-margin', 'shape-outside', 'shape-image-threshold', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/text-overflow'), function(browsers) {
    return prefix('text-overflow', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/text-emphasis'), function(browsers) {
    return prefix('text-emphasis', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-deviceadaptation'), function(browsers) {
    return prefix('@viewport', {
      browsers: browsers
    });
  });

  resolution = require('caniuse-db/features-json/css-media-resolution');

  feature(resolution, {
    match: /( x($| )|a #3)/
  }, function(browsers) {
    return prefix('@resolution', {
      browsers: browsers
    });
  });

  feature(require('caniuse-db/features-json/css-text-align-last'), function(browsers) {
    return prefix('text-align-last', {
      browsers: browsers
    });
  });

  crispedges = require('caniuse-db/features-json/css-crisp-edges');

  feature(crispedges, {
    match: /y x/
  }, function(browsers) {
    return prefix('crisp-edges', {
      props: ['image-rendering'],
      browsers: browsers
    });
  });

  feature(crispedges, {
    match: /a x #2/
  }, function(browsers) {
    return prefix('image-rendering', {
      browsers: browsers
    });
  });

  logicalProps = require('caniuse-db/features-json/css-logical-props');

  feature(logicalProps, function(browsers) {
    return prefix('border-inline-start', 'border-inline-end', 'margin-inline-start', 'margin-inline-end', 'padding-inline-start', 'padding-inline-end', {
      transition: true,
      browsers: browsers
    });
  });

  feature(logicalProps, {
    match: /x\s#2/
  }, function(browsers) {
    return prefix('border-block-start', 'border-block-end', 'margin-block-start', 'margin-block-end', 'padding-block-start', 'padding-block-end', {
      transition: true,
      browsers: browsers
    });
  });

}).call(this);

},{"caniuse-db/features-json/background-img-opts":54,"caniuse-db/features-json/border-image":55,"caniuse-db/features-json/border-radius":56,"caniuse-db/features-json/calc":57,"caniuse-db/features-json/css-animation":58,"caniuse-db/features-json/css-boxdecorationbreak":59,"caniuse-db/features-json/css-boxshadow":60,"caniuse-db/features-json/css-crisp-edges":61,"caniuse-db/features-json/css-deviceadaptation":62,"caniuse-db/features-json/css-filters":63,"caniuse-db/features-json/css-gradients":64,"caniuse-db/features-json/css-hyphens":65,"caniuse-db/features-json/css-logical-props":66,"caniuse-db/features-json/css-masks":67,"caniuse-db/features-json/css-media-resolution":68,"caniuse-db/features-json/css-placeholder":69,"caniuse-db/features-json/css-selection":70,"caniuse-db/features-json/css-shapes":71,"caniuse-db/features-json/css-sticky":72,"caniuse-db/features-json/css-text-align-last":73,"caniuse-db/features-json/css-transitions":74,"caniuse-db/features-json/css3-boxsizing":75,"caniuse-db/features-json/css3-cursors-newer":76,"caniuse-db/features-json/css3-tabsize":77,"caniuse-db/features-json/flexbox":78,"caniuse-db/features-json/font-feature":79,"caniuse-db/features-json/fullscreen":80,"caniuse-db/features-json/intrinsic-width":81,"caniuse-db/features-json/multicolumn":82,"caniuse-db/features-json/object-fit":83,"caniuse-db/features-json/pointer":84,"caniuse-db/features-json/text-decoration":85,"caniuse-db/features-json/text-emphasis":86,"caniuse-db/features-json/text-overflow":87,"caniuse-db/features-json/text-size-adjust":88,"caniuse-db/features-json/transforms2d":89,"caniuse-db/features-json/transforms3d":90,"caniuse-db/features-json/user-select-none":91}],6:[function(require,module,exports){
(function() {
  var AtRule, Prefixer,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Prefixer = require('./prefixer');

  AtRule = (function(superClass) {
    extend(AtRule, superClass);

    function AtRule() {
      return AtRule.__super__.constructor.apply(this, arguments);
    }

    AtRule.prototype.add = function(rule, prefix) {
      var already, cloned, prefixed;
      prefixed = prefix + rule.name;
      already = rule.parent.some(function(i) {
        return i.name === prefixed && i.params === rule.params;
      });
      if (already) {
        return;
      }
      cloned = this.clone(rule, {
        name: prefixed
      });
      return rule.parent.insertBefore(rule, cloned);
    };

    AtRule.prototype.process = function(node) {
      var j, len, parent, prefix, ref, results;
      parent = this.parentPrefix(node);
      ref = this.prefixes;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        prefix = ref[j];
        if (parent && parent !== prefix) {
          continue;
        }
        results.push(this.add(node, prefix));
      }
      return results;
    };

    return AtRule;

  })(Prefixer);

  module.exports = AtRule;

}).call(this);

},{"./prefixer":44}],7:[function(require,module,exports){
(function() {
  var Autoprefixer, Browsers, Prefixes, autoprefixer, browserslist, infoCache, isPlainObject, postcss,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  browserslist = require('browserslist');

  postcss = require('postcss');

  Browsers = require('./browsers');

  Prefixes = require('./prefixes');

  infoCache = null;

  isPlainObject = function(obj) {
    return Object.prototype.toString.apply(obj) === '[object Object]';
  };

  autoprefixer = function() {
    var options, reqs;
    reqs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (reqs.length === 1 && isPlainObject(reqs[0])) {
      options = reqs[0];
      reqs = void 0;
    } else if (reqs.length === 0 || (reqs.length === 1 && (reqs[0] == null))) {
      reqs = void 0;
    } else if (reqs.length <= 2 && (reqs[0] instanceof Array || (reqs[0] == null))) {
      options = reqs[1];
      reqs = reqs[0];
    } else if (typeof reqs[reqs.length - 1] === 'object') {
      options = reqs.pop();
    }
    if ((options != null ? options.browsers : void 0) != null) {
      reqs = options.browsers;
    }
    return new Autoprefixer(autoprefixer.data, reqs, options);
  };

  autoprefixer.data = {
    browsers: require('caniuse-db/data').agents,
    prefixes: require('../data/prefixes')
  };

  Autoprefixer = (function() {
    function Autoprefixer(data, reqs1, options1) {
      this.data = data;
      this.reqs = reqs1;
      this.options = options1 != null ? options1 : {};
      this.postcss = bind(this.postcss, this);
    }

    Autoprefixer.prototype.process = function(str, options) {
      if (options == null) {
        options = {};
      }
      return postcss(this.postcss).process(str, options);
    };

    Autoprefixer.prototype.postcss = function(css) {
      var prefixes;
      prefixes = this.prefixes({
        from: css.source.input.file
      });
      if (this.options.remove !== false) {
        prefixes.processor.remove(css);
      }
      return prefixes.processor.add(css);
    };

    Autoprefixer.prototype.prefixes = function(opts) {
      var browsers;
      browsers = new Browsers(autoprefixer.data.browsers, this.reqs, opts);
      return new Prefixes(autoprefixer.data.prefixes, browsers, this.options);
    };

    Autoprefixer.prototype.info = function(opts) {
      infoCache || (infoCache = require('./info'));
      return infoCache(this.prefixes(opts));
    };

    return Autoprefixer;

  })();

  autoprefixer.defaults = browserslist.defaults;

  autoprefixer.loadDefault = function() {
    return this.defaultCache || (this.defaultCache = autoprefixer());
  };

  autoprefixer.process = function(str, options) {
    if (options == null) {
      options = {};
    }
    return this.loadDefault().process(str, options);
  };

  autoprefixer.postcss = function(css) {
    return autoprefixer.loadDefault().postcss(css);
  };

  autoprefixer.info = function() {
    return this.loadDefault().info();
  };

  module.exports = autoprefixer;

}).call(this);

},{"../data/prefixes":5,"./browsers":8,"./info":41,"./prefixes":45,"browserslist":52,"caniuse-db/data":53,"postcss":104}],8:[function(require,module,exports){
(function() {
  var Browsers, browserslist, utils;

  browserslist = require('browserslist');

  utils = require('./utils');

  Browsers = (function() {
    Browsers.prefixes = function() {
      var data, i, name;
      if (this.prefixesCache) {
        return this.prefixesCache;
      }
      data = require('caniuse-db/data').agents;
      return this.prefixesCache = utils.uniq((function() {
        var results;
        results = [];
        for (name in data) {
          i = data[name];
          results.push("-" + i.prefix + "-");
        }
        return results;
      })()).sort(function(a, b) {
        return b.length - a.length;
      });
    };

    Browsers.withPrefix = function(value) {
      if (!this.prefixesRegexp) {
        this.prefixesRegexp = RegExp("" + (this.prefixes().join('|')));
      }
      return this.prefixesRegexp.test(value);
    };

    function Browsers(data1, requirements, options) {
      this.data = data1;
      this.options = options;
      this.selected = this.parse(requirements);
    }

    Browsers.prototype.parse = function(requirements) {
      var ref;
      return browserslist(requirements, {
        path: (ref = this.options) != null ? ref.from : void 0
      });
    };

    Browsers.prototype.browsers = function(criteria) {
      var browser, data, ref, selected, versions;
      selected = [];
      ref = this.data;
      for (browser in ref) {
        data = ref[browser];
        versions = criteria(data).map(function(version) {
          return browser + " " + version;
        });
        selected = selected.concat(versions);
      }
      return selected;
    };

    Browsers.prototype.prefix = function(browser) {
      var data, name, prefix, ref, version;
      ref = browser.split(' '), name = ref[0], version = ref[1];
      data = this.data[name];
      if (data.prefix_exceptions) {
        prefix = data.prefix_exceptions[version];
      }
      prefix || (prefix = data.prefix);
      return '-' + prefix + '-';
    };

    Browsers.prototype.isSelected = function(browser) {
      return this.selected.indexOf(browser) !== -1;
    };

    return Browsers;

  })();

  module.exports = Browsers;

}).call(this);

},{"./utils":50,"browserslist":52,"caniuse-db/data":53}],9:[function(require,module,exports){
(function() {
  var Browsers, Declaration, Prefixer, utils, vendor,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Prefixer = require('./prefixer');

  Browsers = require('./browsers');

  vendor = require('postcss/lib/vendor');

  utils = require('./utils');

  Declaration = (function(superClass) {
    extend(Declaration, superClass);

    function Declaration() {
      return Declaration.__super__.constructor.apply(this, arguments);
    }

    Declaration.prototype.check = function(decl) {
      return true;
    };

    Declaration.prototype.prefixed = function(prop, prefix) {
      return prefix + prop;
    };

    Declaration.prototype.normalize = function(prop) {
      return prop;
    };

    Declaration.prototype.otherPrefixes = function(value, prefix) {
      var j, len, other, ref;
      ref = Browsers.prefixes();
      for (j = 0, len = ref.length; j < len; j++) {
        other = ref[j];
        if (other === prefix) {
          continue;
        }
        if (value.indexOf(other) !== -1) {
          return true;
        }
      }
      return false;
    };

    Declaration.prototype.set = function(decl, prefix) {
      decl.prop = this.prefixed(decl.prop, prefix);
      return decl;
    };

    Declaration.prototype.needCascade = function(decl) {
      return decl._autoprefixerCascade || (decl._autoprefixerCascade = this.all.options.cascade !== false && decl.style('before').indexOf('\n') !== -1);
    };

    Declaration.prototype.maxPrefixed = function(prefixes, decl) {
      var j, len, max, prefix;
      if (decl._autoprefixerMax) {
        return decl._autoprefixerMax;
      }
      max = 0;
      for (j = 0, len = prefixes.length; j < len; j++) {
        prefix = prefixes[j];
        prefix = utils.removeNote(prefix);
        if (prefix.length > max) {
          max = prefix.length;
        }
      }
      return decl._autoprefixerMax = max;
    };

    Declaration.prototype.calcBefore = function(prefixes, decl, prefix) {
      var before, diff, i, j, max, ref;
      if (prefix == null) {
        prefix = '';
      }
      before = decl.style('before');
      max = this.maxPrefixed(prefixes, decl);
      diff = max - utils.removeNote(prefix).length;
      for (i = j = 0, ref = diff; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        before += ' ';
      }
      return before;
    };

    Declaration.prototype.restoreBefore = function(decl) {
      var lines, min;
      lines = decl.style('before').split("\n");
      min = lines[lines.length - 1];
      this.all.group(decl).up(function(prefixed) {
        var array, last;
        array = prefixed.style('before').split("\n");
        last = array[array.length - 1];
        if (last.length < min.length) {
          return min = last;
        }
      });
      lines[lines.length - 1] = min;
      return decl.before = lines.join("\n");
    };

    Declaration.prototype.insert = function(decl, prefix, prefixes) {
      var cloned;
      cloned = this.set(this.clone(decl), prefix);
      if (!cloned) {
        return;
      }
      if (this.needCascade(decl)) {
        cloned.before = this.calcBefore(prefixes, decl, prefix);
      }
      return decl.parent.insertBefore(decl, cloned);
    };

    Declaration.prototype.add = function(decl, prefix, prefixes) {
      var already, prefixed;
      prefixed = this.prefixed(decl.prop, prefix);
      already = this.all.group(decl).up(function(i) {
        return i.prop === prefixed;
      });
      already || (already = this.all.group(decl).down(function(i) {
        return i.prop === prefixed;
      }));
      if (already || this.otherPrefixes(decl.value, prefix)) {
        return;
      }
      return this.insert(decl, prefix, prefixes);
    };

    Declaration.prototype.process = function(decl) {
      var prefixes;
      if (this.needCascade(decl)) {
        prefixes = Declaration.__super__.process.apply(this, arguments);
        if (prefixes != null ? prefixes.length : void 0) {
          this.restoreBefore(decl);
          return decl.before = this.calcBefore(prefixes, decl);
        }
      } else {
        return Declaration.__super__.process.apply(this, arguments);
      }
    };

    Declaration.prototype.old = function(prop, prefix) {
      return [this.prefixed(prop, prefix)];
    };

    return Declaration;

  })(Prefixer);

  module.exports = Declaration;

}).call(this);

},{"./browsers":8,"./prefixer":44,"./utils":50,"postcss/lib/vendor":110}],10:[function(require,module,exports){
(function() {
  var AlignContent, Declaration, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  AlignContent = (function(superClass) {
    extend(AlignContent, superClass);

    function AlignContent() {
      return AlignContent.__super__.constructor.apply(this, arguments);
    }

    AlignContent.names = ['align-content', 'flex-line-pack'];

    AlignContent.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start',
      'space-between': 'justify',
      'space-around': 'distribute'
    };

    AlignContent.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012) {
        return prefix + 'flex-line-pack';
      } else {
        return AlignContent.__super__.prefixed.apply(this, arguments);
      }
    };

    AlignContent.prototype.normalize = function(prop) {
      return 'align-content';
    };

    AlignContent.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2012) {
        decl.value = AlignContent.oldValues[decl.value] || decl.value;
        return AlignContent.__super__.set.call(this, decl, prefix);
      } else if (spec === 'final') {
        return AlignContent.__super__.set.apply(this, arguments);
      }
    };

    return AlignContent;

  })(Declaration);

  module.exports = AlignContent;

}).call(this);

},{"../declaration":9,"./flex-spec":28}],11:[function(require,module,exports){
(function() {
  var AlignItems, Declaration, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  AlignItems = (function(superClass) {
    extend(AlignItems, superClass);

    function AlignItems() {
      return AlignItems.__super__.constructor.apply(this, arguments);
    }

    AlignItems.names = ['align-items', 'flex-align', 'box-align'];

    AlignItems.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start'
    };

    AlignItems.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        return prefix + 'box-align';
      } else if (spec === 2012) {
        return prefix + 'flex-align';
      } else {
        return AlignItems.__super__.prefixed.apply(this, arguments);
      }
    };

    AlignItems.prototype.normalize = function(prop) {
      return 'align-items';
    };

    AlignItems.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2009 || spec === 2012) {
        decl.value = AlignItems.oldValues[decl.value] || decl.value;
        return AlignItems.__super__.set.call(this, decl, prefix);
      } else {
        return AlignItems.__super__.set.apply(this, arguments);
      }
    };

    return AlignItems;

  })(Declaration);

  module.exports = AlignItems;

}).call(this);

},{"../declaration":9,"./flex-spec":28}],12:[function(require,module,exports){
(function() {
  var AlignSelf, Declaration, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  AlignSelf = (function(superClass) {
    extend(AlignSelf, superClass);

    function AlignSelf() {
      return AlignSelf.__super__.constructor.apply(this, arguments);
    }

    AlignSelf.names = ['align-self', 'flex-item-align'];

    AlignSelf.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start'
    };

    AlignSelf.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012) {
        return prefix + 'flex-item-align';
      } else {
        return AlignSelf.__super__.prefixed.apply(this, arguments);
      }
    };

    AlignSelf.prototype.normalize = function(prop) {
      return 'align-self';
    };

    AlignSelf.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2012) {
        decl.value = AlignSelf.oldValues[decl.value] || decl.value;
        return AlignSelf.__super__.set.call(this, decl, prefix);
      } else if (spec === 'final') {
        return AlignSelf.__super__.set.apply(this, arguments);
      }
    };

    return AlignSelf;

  })(Declaration);

  module.exports = AlignSelf;

}).call(this);

},{"../declaration":9,"./flex-spec":28}],13:[function(require,module,exports){
(function() {
  var BackgroundSize, Declaration,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  BackgroundSize = (function(superClass) {
    extend(BackgroundSize, superClass);

    function BackgroundSize() {
      return BackgroundSize.__super__.constructor.apply(this, arguments);
    }

    BackgroundSize.names = ['background-size'];

    BackgroundSize.prototype.set = function(decl, prefix) {
      var value;
      value = decl.value.toLowerCase();
      if (prefix === '-webkit-' && value.indexOf(' ') === -1 && value !== 'contain' && value !== 'cover') {
        decl.value = decl.value + ' ' + decl.value;
      }
      return BackgroundSize.__super__.set.call(this, decl, prefix);
    };

    return BackgroundSize;

  })(Declaration);

  module.exports = BackgroundSize;

}).call(this);

},{"../declaration":9}],14:[function(require,module,exports){
(function() {
  var BlockLogical, Declaration,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  BlockLogical = (function(superClass) {
    extend(BlockLogical, superClass);

    function BlockLogical() {
      return BlockLogical.__super__.constructor.apply(this, arguments);
    }

    BlockLogical.names = ['border-block-start', 'border-block-end', 'margin-block-start', 'margin-block-end', 'padding-block-start', 'padding-block-end', 'border-before', 'border-after', 'margin-before', 'margin-after', 'padding-before', 'padding-after'];

    BlockLogical.prototype.prefixed = function(prop, prefix) {
      return prefix + (prop.indexOf('-start') !== -1 ? prop.replace('-block-start', '-before') : prop.replace('-block-end', '-after'));
    };

    BlockLogical.prototype.normalize = function(prop) {
      if (prop.indexOf('-before') !== -1) {
        return prop.replace('-before', '-block-start');
      } else {
        return prop.replace('-after', '-block-end');
      }
    };

    return BlockLogical;

  })(Declaration);

  module.exports = BlockLogical;

}).call(this);

},{"../declaration":9}],15:[function(require,module,exports){
(function() {
  var BorderImage, Declaration,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  BorderImage = (function(superClass) {
    extend(BorderImage, superClass);

    function BorderImage() {
      return BorderImage.__super__.constructor.apply(this, arguments);
    }

    BorderImage.names = ['border-image'];

    BorderImage.prototype.set = function(decl, prefix) {
      decl.value = decl.value.replace(/\s+fill(\s)/, '$1');
      return BorderImage.__super__.set.call(this, decl, prefix);
    };

    return BorderImage;

  })(Declaration);

  module.exports = BorderImage;

}).call(this);

},{"../declaration":9}],16:[function(require,module,exports){
(function() {
  var BorderRadius, Declaration,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  BorderRadius = (function(superClass) {
    var hor, i, j, len, len1, mozilla, normal, ref, ref1, ver;

    extend(BorderRadius, superClass);

    function BorderRadius() {
      return BorderRadius.__super__.constructor.apply(this, arguments);
    }

    BorderRadius.names = ['border-radius'];

    BorderRadius.toMozilla = {};

    BorderRadius.toNormal = {};

    ref = ['top', 'bottom'];
    for (i = 0, len = ref.length; i < len; i++) {
      ver = ref[i];
      ref1 = ['left', 'right'];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        hor = ref1[j];
        normal = "border-" + ver + "-" + hor + "-radius";
        mozilla = "border-radius-" + ver + hor;
        BorderRadius.names.push(normal);
        BorderRadius.names.push(mozilla);
        BorderRadius.toMozilla[normal] = mozilla;
        BorderRadius.toNormal[mozilla] = normal;
      }
    }

    BorderRadius.prototype.prefixed = function(prop, prefix) {
      if (prefix === '-moz-') {
        return prefix + (BorderRadius.toMozilla[prop] || prop);
      } else {
        return BorderRadius.__super__.prefixed.apply(this, arguments);
      }
    };

    BorderRadius.prototype.normalize = function(prop) {
      return BorderRadius.toNormal[prop] || prop;
    };

    return BorderRadius;

  })(Declaration);

  module.exports = BorderRadius;

}).call(this);

},{"../declaration":9}],17:[function(require,module,exports){
(function() {
  var BreakInside, Declaration,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  BreakInside = (function(superClass) {
    extend(BreakInside, superClass);

    function BreakInside() {
      return BreakInside.__super__.constructor.apply(this, arguments);
    }

    BreakInside.names = ['break-inside', 'page-break-inside', 'column-break-inside'];

    BreakInside.prototype.prefixed = function(prop, prefix) {
      if (prefix === '-webkit-') {
        return prefix + 'column-break-inside';
      } else if (prefix === '-moz-') {
        return 'page-break-inside';
      } else {
        return BreakInside.__super__.prefixed.apply(this, arguments);
      }
    };

    BreakInside.prototype.normalize = function() {
      return 'break-inside';
    };

    BreakInside.prototype.set = function(decl, prefix) {
      if (decl.value === 'avoid-column' || decl.value === 'avoid-page') {
        decl.value = 'avoid';
      }
      return BreakInside.__super__.set.apply(this, arguments);
    };

    BreakInside.prototype.insert = function(decl, prefix, prefixes) {
      if (decl.value === 'avoid-region') {

      } else if (decl.value === 'avoid-page' && prefix === '-webkit-') {

      } else {
        return BreakInside.__super__.insert.apply(this, arguments);
      }
    };

    return BreakInside;

  })(Declaration);

  module.exports = BreakInside;

}).call(this);

},{"../declaration":9}],18:[function(require,module,exports){
(function() {
  var CrispEdges, Value,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Value = require('../value');

  CrispEdges = (function(superClass) {
    extend(CrispEdges, superClass);

    function CrispEdges() {
      return CrispEdges.__super__.constructor.apply(this, arguments);
    }

    CrispEdges.names = ['crisp-edges'];

    CrispEdges.prototype.replace = function(string, prefix) {
      if (prefix === '-webkit-') {
        return string.replace(this.regexp(), '$1-webkit-optimize-contrast');
      } else {
        return CrispEdges.__super__.replace.apply(this, arguments);
      }
    };

    return CrispEdges;

  })(Value);

  module.exports = CrispEdges;

}).call(this);

},{"../value":51}],19:[function(require,module,exports){
(function() {
  var DisplayFlex, OldDisplayFlex, OldValue, Value, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  OldValue = require('../old-value');

  Value = require('../value');

  OldDisplayFlex = (function(superClass) {
    extend(OldDisplayFlex, superClass);

    function OldDisplayFlex(unprefixed, prefixed1) {
      this.unprefixed = unprefixed;
      this.prefixed = prefixed1;
    }

    OldDisplayFlex.prototype.check = function(value) {
      return value === this.name;
    };

    return OldDisplayFlex;

  })(OldValue);

  DisplayFlex = (function(superClass) {
    extend(DisplayFlex, superClass);

    DisplayFlex.names = ['display-flex', 'inline-flex'];

    function DisplayFlex(name, prefixes) {
      DisplayFlex.__super__.constructor.apply(this, arguments);
      if (name === 'display-flex') {
        this.name = 'flex';
      }
    }

    DisplayFlex.prototype.check = function(decl) {
      return decl.value === this.name;
    };

    DisplayFlex.prototype.prefixed = function(prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      return prefix + (spec === 2009 ? this.name === 'flex' ? 'box' : 'inline-box' : spec === 2012 ? this.name === 'flex' ? 'flexbox' : 'inline-flexbox' : spec === 'final' ? this.name : void 0);
    };

    DisplayFlex.prototype.replace = function(string, prefix) {
      return this.prefixed(prefix);
    };

    DisplayFlex.prototype.old = function(prefix) {
      var prefixed;
      prefixed = this.prefixed(prefix);
      if (prefixed) {
        return new OldValue(this.name, prefixed);
      }
    };

    return DisplayFlex;

  })(Value);

  module.exports = DisplayFlex;

}).call(this);

},{"../old-value":43,"../value":51,"./flex-spec":28}],20:[function(require,module,exports){
(function() {
  var FillAvailable, OldValue, Value,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  OldValue = require('../old-value');

  Value = require('../value');

  FillAvailable = (function(superClass) {
    extend(FillAvailable, superClass);

    function FillAvailable() {
      return FillAvailable.__super__.constructor.apply(this, arguments);
    }

    FillAvailable.names = ['fill-available'];

    FillAvailable.prototype.replace = function(string, prefix) {
      if (prefix === '-moz-') {
        return string.replace(this.regexp(), '$1-moz-available$3');
      } else {
        return FillAvailable.__super__.replace.apply(this, arguments);
      }
    };

    FillAvailable.prototype.old = function(prefix) {
      if (prefix === '-moz-') {
        return new OldValue(this.name, '-moz-available');
      } else {
        return FillAvailable.__super__.old.apply(this, arguments);
      }
    };

    return FillAvailable;

  })(Value);

  module.exports = FillAvailable;

}).call(this);

},{"../old-value":43,"../value":51}],21:[function(require,module,exports){
(function() {
  var FilterValue, OldFilterValue, OldValue, Value, utils,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  OldValue = require('../old-value');

  Value = require('../value');

  utils = require('../utils');

  OldFilterValue = (function(superClass) {
    extend(OldFilterValue, superClass);

    function OldFilterValue() {
      return OldFilterValue.__super__.constructor.apply(this, arguments);
    }

    OldFilterValue.prototype.clean = function(decl) {
      return decl.value = utils.editList(decl.value, (function(_this) {
        return function(props) {
          if (props.every(function(i) {
            return i.indexOf(_this.unprefixed) !== 0;
          })) {
            return props;
          }
          return props.filter(function(i) {
            return i.indexOf(_this.prefixed) === -1;
          });
        };
      })(this));
    };

    return OldFilterValue;

  })(OldValue);

  FilterValue = (function(superClass) {
    extend(FilterValue, superClass);

    function FilterValue() {
      return FilterValue.__super__.constructor.apply(this, arguments);
    }

    FilterValue.names = ['filter'];

    FilterValue.prototype.replace = function(value, prefix) {
      if (prefix === '-webkit-') {
        if (value.indexOf('-webkit-filter') === -1) {
          return FilterValue.__super__.replace.apply(this, arguments) + ', ' + value;
        } else {
          return value;
        }
      } else {
        return FilterValue.__super__.replace.apply(this, arguments);
      }
    };

    FilterValue.prototype.old = function(prefix) {
      return new OldFilterValue(this.name, prefix + this.name);
    };

    return FilterValue;

  })(Value);

  module.exports = FilterValue;

}).call(this);

},{"../old-value":43,"../utils":50,"../value":51}],22:[function(require,module,exports){
(function() {
  var Declaration, Filter,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  Filter = (function(superClass) {
    extend(Filter, superClass);

    function Filter() {
      return Filter.__super__.constructor.apply(this, arguments);
    }

    Filter.names = ['filter'];

    Filter.prototype.check = function(decl) {
      var v;
      v = decl.value;
      return v.toLowerCase().indexOf('alpha(') === -1 && v.indexOf('DXImageTransform.Microsoft') === -1 && v.indexOf('data:image/svg+xml') === -1;
    };

    return Filter;

  })(Declaration);

  module.exports = Filter;

}).call(this);

},{"../declaration":9}],23:[function(require,module,exports){
(function() {
  var Declaration, FlexBasis, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexBasis = (function(superClass) {
    extend(FlexBasis, superClass);

    function FlexBasis() {
      return FlexBasis.__super__.constructor.apply(this, arguments);
    }

    FlexBasis.names = ['flex-basis', 'flex-preferred-size'];

    FlexBasis.prototype.normalize = function() {
      return 'flex-basis';
    };

    FlexBasis.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012) {
        return prefix + 'flex-preferred-size';
      } else {
        return FlexBasis.__super__.prefixed.apply(this, arguments);
      }
    };

    FlexBasis.prototype.set = function(decl, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012 || spec === 'final') {
        return FlexBasis.__super__.set.apply(this, arguments);
      }
    };

    return FlexBasis;

  })(Declaration);

  module.exports = FlexBasis;

}).call(this);

},{"../declaration":9,"./flex-spec":28}],24:[function(require,module,exports){
(function() {
  var Declaration, FlexDirection, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexDirection = (function(superClass) {
    extend(FlexDirection, superClass);

    function FlexDirection() {
      return FlexDirection.__super__.constructor.apply(this, arguments);
    }

    FlexDirection.names = ['flex-direction', 'box-direction', 'box-orient'];

    FlexDirection.prototype.normalize = function(prop) {
      return 'flex-direction';
    };

    FlexDirection.prototype.insert = function(decl, prefix, prefixes) {
      var already, cloned, dir, orient, ref, spec, value;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        already = decl.parent.some(function(i) {
          return i.prop === prefix + 'box-orient' || i.prop === prefix + 'box-direction';
        });
        if (already) {
          return;
        }
        value = decl.value;
        orient = value.indexOf('row') !== -1 ? 'horizontal' : 'vertical';
        dir = value.indexOf('reverse') !== -1 ? 'reverse' : 'normal';
        cloned = this.clone(decl);
        cloned.prop = prefix + 'box-orient';
        cloned.value = orient;
        if (this.needCascade(decl)) {
          cloned.before = this.calcBefore(prefixes, decl, prefix);
        }
        decl.parent.insertBefore(decl, cloned);
        cloned = this.clone(decl);
        cloned.prop = prefix + 'box-direction';
        cloned.value = dir;
        if (this.needCascade(decl)) {
          cloned.before = this.calcBefore(prefixes, decl, prefix);
        }
        return decl.parent.insertBefore(decl, cloned);
      } else {
        return FlexDirection.__super__.insert.apply(this, arguments);
      }
    };

    FlexDirection.prototype.old = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        return [prefix + 'box-orient', prefix + 'box-direction'];
      } else {
        return FlexDirection.__super__.old.apply(this, arguments);
      }
    };

    return FlexDirection;

  })(Declaration);

  module.exports = FlexDirection;

}).call(this);

},{"../declaration":9,"./flex-spec":28}],25:[function(require,module,exports){
(function() {
  var Declaration, FlexFlow, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexFlow = (function(superClass) {
    extend(FlexFlow, superClass);

    function FlexFlow() {
      return FlexFlow.__super__.constructor.apply(this, arguments);
    }

    FlexFlow.names = ['flex-flow'];

    FlexFlow.prototype.set = function(decl, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012) {
        return FlexFlow.__super__.set.apply(this, arguments);
      } else if (spec === 'final') {
        return FlexFlow.__super__.set.apply(this, arguments);
      }
    };

    return FlexFlow;

  })(Declaration);

  module.exports = FlexFlow;

}).call(this);

},{"../declaration":9,"./flex-spec":28}],26:[function(require,module,exports){
(function() {
  var Declaration, Flex, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  Flex = (function(superClass) {
    extend(Flex, superClass);

    function Flex() {
      return Flex.__super__.constructor.apply(this, arguments);
    }

    Flex.names = ['flex-grow', 'flex-positive'];

    Flex.prototype.normalize = function() {
      return 'flex';
    };

    Flex.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        return prefix + 'box-flex';
      } else if (spec === 2012) {
        return prefix + 'flex-positive';
      } else {
        return Flex.__super__.prefixed.apply(this, arguments);
      }
    };

    return Flex;

  })(Declaration);

  module.exports = Flex;

}).call(this);

},{"../declaration":9,"./flex-spec":28}],27:[function(require,module,exports){
(function() {
  var Declaration, FlexShrink, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexShrink = (function(superClass) {
    extend(FlexShrink, superClass);

    function FlexShrink() {
      return FlexShrink.__super__.constructor.apply(this, arguments);
    }

    FlexShrink.names = ['flex-shrink', 'flex-negative'];

    FlexShrink.prototype.normalize = function() {
      return 'flex-shrink';
    };

    FlexShrink.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012) {
        return prefix + 'flex-negative';
      } else {
        return FlexShrink.__super__.prefixed.apply(this, arguments);
      }
    };

    FlexShrink.prototype.set = function(decl, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2012 || spec === 'final') {
        return FlexShrink.__super__.set.apply(this, arguments);
      }
    };

    return FlexShrink;

  })(Declaration);

  module.exports = FlexShrink;

}).call(this);

},{"../declaration":9,"./flex-spec":28}],28:[function(require,module,exports){
(function() {
  module.exports = function(prefix) {
    var spec;
    spec = prefix === '-webkit- 2009' || prefix === '-moz-' ? 2009 : prefix === '-ms-' ? 2012 : prefix === '-webkit-' ? 'final' : void 0;
    if (prefix === '-webkit- 2009') {
      prefix = '-webkit-';
    }
    return [spec, prefix];
  };

}).call(this);

},{}],29:[function(require,module,exports){
(function() {
  var FlexValues, OldValue, Value,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  OldValue = require('../old-value');

  Value = require('../value');

  FlexValues = (function(superClass) {
    extend(FlexValues, superClass);

    function FlexValues() {
      return FlexValues.__super__.constructor.apply(this, arguments);
    }

    FlexValues.names = ['flex', 'flex-grow', 'flex-shrink', 'flex-basis'];

    FlexValues.prototype.prefixed = function(prefix) {
      return this.all.prefixed(this.name, prefix);
    };

    FlexValues.prototype.replace = function(string, prefix) {
      return string.replace(this.regexp(), '$1' + this.prefixed(prefix) + '$3');
    };

    FlexValues.prototype.old = function(prefix) {
      return new OldValue(this.name, this.prefixed(prefix));
    };

    return FlexValues;

  })(Value);

  module.exports = FlexValues;

}).call(this);

},{"../old-value":43,"../value":51}],30:[function(require,module,exports){
(function() {
  var Declaration, FlexWrap, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  FlexWrap = (function(superClass) {
    extend(FlexWrap, superClass);

    function FlexWrap() {
      return FlexWrap.__super__.constructor.apply(this, arguments);
    }

    FlexWrap.names = ['flex-wrap'];

    FlexWrap.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec !== 2009) {
        return FlexWrap.__super__.set.apply(this, arguments);
      }
    };

    return FlexWrap;

  })(Declaration);

  module.exports = FlexWrap;

}).call(this);

},{"../declaration":9,"./flex-spec":28}],31:[function(require,module,exports){
(function() {
  var Declaration, Flex, flexSpec, list,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  list = require('postcss/lib/list');

  Flex = (function(superClass) {
    extend(Flex, superClass);

    function Flex() {
      return Flex.__super__.constructor.apply(this, arguments);
    }

    Flex.names = ['flex', 'box-flex'];

    Flex.oldValues = {
      'auto': '1',
      'none': '0'
    };

    Flex.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        return prefix + 'box-flex';
      } else {
        return Flex.__super__.prefixed.apply(this, arguments);
      }
    };

    Flex.prototype.normalize = function() {
      return 'flex';
    };

    Flex.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2009) {
        decl.value = list.space(decl.value)[0];
        decl.value = Flex.oldValues[decl.value] || decl.value;
        return Flex.__super__.set.call(this, decl, prefix);
      } else {
        return Flex.__super__.set.apply(this, arguments);
      }
    };

    return Flex;

  })(Declaration);

  module.exports = Flex;

}).call(this);

},{"../declaration":9,"./flex-spec":28,"postcss/lib/list":99}],32:[function(require,module,exports){
(function() {
  var Fullscreen, Selector,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Selector = require('../selector');

  Fullscreen = (function(superClass) {
    extend(Fullscreen, superClass);

    function Fullscreen() {
      return Fullscreen.__super__.constructor.apply(this, arguments);
    }

    Fullscreen.names = [':fullscreen'];

    Fullscreen.prototype.prefixed = function(prefix) {
      if ('-webkit-' === prefix) {
        return ':-webkit-full-screen';
      } else if ('-moz-' === prefix) {
        return ':-moz-full-screen';
      } else {
        return ":" + prefix + "fullscreen";
      }
    };

    return Fullscreen;

  })(Selector);

  module.exports = Fullscreen;

}).call(this);

},{"../selector":48}],33:[function(require,module,exports){
(function() {
  var Gradient, OldValue, Value, isDirection, list, utils,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  OldValue = require('../old-value');

  Value = require('../value');

  utils = require('../utils');

  list = require('postcss/lib/list');

  isDirection = /top|left|right|bottom/gi;

  Gradient = (function(superClass) {
    extend(Gradient, superClass);

    function Gradient() {
      return Gradient.__super__.constructor.apply(this, arguments);
    }

    Gradient.names = ['linear-gradient', 'repeating-linear-gradient', 'radial-gradient', 'repeating-radial-gradient'];

    Gradient.prototype.replace = function(string, prefix) {
      return list.space(string).map((function(_this) {
        return function(value) {
          var after, args, close, params;
          if (value.slice(0, +_this.name.length + 1 || 9e9) !== _this.name + '(') {
            return value;
          }
          close = value.lastIndexOf(')');
          after = value.slice(close + 1);
          args = value.slice(_this.name.length + 1, +(close - 1) + 1 || 9e9);
          params = list.comma(args);
          params = _this.newDirection(params);
          if (prefix === '-webkit- old') {
            return _this.oldWebkit(value, args, params, after);
          } else {
            _this.convertDirection(params);
            return prefix + _this.name + '(' + params.join(', ') + ')' + after;
          }
        };
      })(this)).join(' ');
    };

    Gradient.prototype.directions = {
      top: 'bottom',
      left: 'right',
      bottom: 'top',
      right: 'left'
    };

    Gradient.prototype.oldDirections = {
      'top': 'left bottom, left top',
      'left': 'right top, left top',
      'bottom': 'left top, left bottom',
      'right': 'left top, right top',
      'top right': 'left bottom, right top',
      'top left': 'right bottom, left top',
      'right top': 'left bottom, right top',
      'right bottom': 'left top, right bottom',
      'bottom right': 'left top, right bottom',
      'bottom left': 'right top, left bottom',
      'left top': 'right bottom, left top',
      'left bottom': 'right top, left bottom'
    };

    Gradient.prototype.newDirection = function(params) {
      var first, value;
      first = params[0];
      if (first.indexOf('to ') === -1 && isDirection.test(first)) {
        first = first.split(' ');
        first = (function() {
          var j, len, results;
          results = [];
          for (j = 0, len = first.length; j < len; j++) {
            value = first[j];
            results.push(this.directions[value.toLowerCase()] || value);
          }
          return results;
        }).call(this);
        params[0] = 'to ' + first.join(' ');
      }
      return params;
    };

    Gradient.prototype.oldWebkit = function(value, args, params, after) {
      if (args.indexOf('px') !== -1) {
        return value;
      }
      if (this.name !== 'linear-gradient') {
        return value;
      }
      if (params[0] && params[0].indexOf('deg') !== -1) {
        return value;
      }
      if (args.indexOf('-corner') !== -1) {
        return value;
      }
      if (args.indexOf('-side') !== -1) {
        return value;
      }
      params = this.oldDirection(params);
      params = this.colorStops(params);
      return '-webkit-gradient(linear, ' + params.join(', ') + ')' + after;
    };

    Gradient.prototype.convertDirection = function(params) {
      if (params.length > 0) {
        if (params[0].slice(0, 3) === 'to ') {
          return params[0] = this.fixDirection(params[0]);
        } else if (params[0].indexOf('deg') !== -1) {
          return params[0] = this.fixAngle(params[0]);
        } else if (params[0].indexOf(' at ') !== -1) {
          return this.fixRadial(params);
        }
      }
    };

    Gradient.prototype.fixDirection = function(param) {
      var value;
      param = param.split(' ');
      param.splice(0, 1);
      param = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = param.length; j < len; j++) {
          value = param[j];
          results.push(this.directions[value.toLowerCase()] || value);
        }
        return results;
      }).call(this);
      return param.join(' ');
    };

    Gradient.prototype.roundFloat = function(float, digits) {
      return parseFloat(float.toFixed(digits));
    };

    Gradient.prototype.fixAngle = function(param) {
      param = parseFloat(param);
      param = Math.abs(450 - param) % 360;
      param = this.roundFloat(param, 3);
      return param + "deg";
    };

    Gradient.prototype.oldDirection = function(params) {
      var direction;
      if (params.length === 0) {
        params;
      }
      if (params[0].indexOf('to ') !== -1) {
        direction = params[0].replace(/^to\s+/, '');
        direction = this.oldDirections[direction];
        params[0] = direction;
        return params;
      } else {
        direction = this.oldDirections.bottom;
        return [direction].concat(params);
      }
    };

    Gradient.prototype.colorStops = function(params) {
      return params.map(function(param, i) {
        var color, match, position, ref;
        if (i === 0) {
          return param;
        }
        ref = list.space(param), color = ref[0], position = ref[1];
        if (position == null) {
          match = param.match(/^(.*\))(\d.*)$/);
          if (match) {
            color = match[1];
            position = match[2];
          }
        }
        if (position && position.indexOf(')') !== -1) {
          color += ' ' + position;
          position = void 0;
        }
        if (i === 1 && (position === void 0 || position === '0%')) {
          return "from(" + color + ")";
        } else if (i === params.length - 1 && (position === void 0 || position === '100%')) {
          return "to(" + color + ")";
        } else if (position) {
          return "color-stop(" + position + ", " + color + ")";
        } else {
          return "color-stop(" + color + ")";
        }
      });
    };

    Gradient.prototype.fixRadial = function(params) {
      var first;
      first = params[0].split(/\s+at\s+/);
      return params.splice(0, 1, first[1], first[0]);
    };

    Gradient.prototype.old = function(prefix) {
      var regexp, string, type;
      if (prefix === '-webkit-') {
        type = this.name === 'linear-gradient' ? 'linear' : 'radial';
        string = '-gradient';
        regexp = utils.regexp("-webkit-(" + type + "-gradient|gradient\\(\\s*" + type + ")", false);
        return new OldValue(this.name, prefix + this.name, string, regexp);
      } else {
        return Gradient.__super__.old.apply(this, arguments);
      }
    };

    Gradient.prototype.add = function(decl, prefix) {
      var p;
      p = decl.prop;
      if (p.indexOf('mask') !== -1) {
        if (prefix === '-webkit-' || prefix === '-webkit- old') {
          return Gradient.__super__.add.apply(this, arguments);
        }
      } else if (p === 'list-style' || p === 'list-style-image' || p === 'content') {
        if (prefix === '-webkit-' || prefix === '-webkit- old') {
          return Gradient.__super__.add.apply(this, arguments);
        }
      } else {
        return Gradient.__super__.add.apply(this, arguments);
      }
    };

    return Gradient;

  })(Value);

  module.exports = Gradient;

}).call(this);

},{"../old-value":43,"../utils":50,"../value":51,"postcss/lib/list":99}],34:[function(require,module,exports){
(function() {
  var Declaration, ImageRendering,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  ImageRendering = (function(superClass) {
    extend(ImageRendering, superClass);

    function ImageRendering() {
      return ImageRendering.__super__.constructor.apply(this, arguments);
    }

    ImageRendering.names = ['image-rendering', 'interpolation-mode'];

    ImageRendering.prototype.check = function(decl) {
      return decl.value === 'crisp-edges';
    };

    ImageRendering.prototype.prefixed = function(prop, prefix) {
      if (prefix === '-ms-') {
        return '-ms-interpolation-mode';
      } else {
        return ImageRendering.__super__.prefixed.apply(this, arguments);
      }
    };

    ImageRendering.prototype.set = function(decl, prefix) {
      if (prefix === '-ms-') {
        decl.prop = '-ms-interpolation-mode';
        decl.value = 'nearest-neighbor';
        return decl;
      } else {
        return ImageRendering.__super__.set.apply(this, arguments);
      }
    };

    ImageRendering.prototype.normalize = function(prop) {
      return 'image-rendering';
    };

    return ImageRendering;

  })(Declaration);

  module.exports = ImageRendering;

}).call(this);

},{"../declaration":9}],35:[function(require,module,exports){
(function() {
  var Declaration, InlineLogical,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  InlineLogical = (function(superClass) {
    extend(InlineLogical, superClass);

    function InlineLogical() {
      return InlineLogical.__super__.constructor.apply(this, arguments);
    }

    InlineLogical.names = ['border-inline-start', 'border-inline-end', 'margin-inline-start', 'margin-inline-end', 'padding-inline-start', 'padding-inline-end', 'border-start', 'border-end', 'margin-start', 'margin-end', 'padding-start', 'padding-end'];

    InlineLogical.prototype.prefixed = function(prop, prefix) {
      return prefix + prop.replace('-inline', '');
    };

    InlineLogical.prototype.normalize = function(prop) {
      return prop.replace(/(margin|padding|border)-(start|end)/, '$1-inline-$2');
    };

    return InlineLogical;

  })(Declaration);

  module.exports = InlineLogical;

}).call(this);

},{"../declaration":9}],36:[function(require,module,exports){
(function() {
  var Declaration, JustifyContent, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  JustifyContent = (function(superClass) {
    extend(JustifyContent, superClass);

    function JustifyContent() {
      return JustifyContent.__super__.constructor.apply(this, arguments);
    }

    JustifyContent.names = ['justify-content', 'flex-pack', 'box-pack'];

    JustifyContent.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start',
      'space-between': 'justify',
      'space-around': 'distribute'
    };

    JustifyContent.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        return prefix + 'box-pack';
      } else if (spec === 2012) {
        return prefix + 'flex-pack';
      } else {
        return JustifyContent.__super__.prefixed.apply(this, arguments);
      }
    };

    JustifyContent.prototype.normalize = function(prop) {
      return 'justify-content';
    };

    JustifyContent.prototype.set = function(decl, prefix) {
      var spec, value;
      spec = flexSpec(prefix)[0];
      if (spec === 2009 || spec === 2012) {
        value = JustifyContent.oldValues[decl.value] || decl.value;
        decl.value = value;
        if (spec !== 2009 || value !== 'distribute') {
          return JustifyContent.__super__.set.call(this, decl, prefix);
        }
      } else if (spec === 'final') {
        return JustifyContent.__super__.set.apply(this, arguments);
      }
    };

    return JustifyContent;

  })(Declaration);

  module.exports = JustifyContent;

}).call(this);

},{"../declaration":9,"./flex-spec":28}],37:[function(require,module,exports){
(function() {
  var Declaration, Order, flexSpec,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  flexSpec = require('./flex-spec');

  Declaration = require('../declaration');

  Order = (function(superClass) {
    extend(Order, superClass);

    function Order() {
      return Order.__super__.constructor.apply(this, arguments);
    }

    Order.names = ['order', 'flex-order', 'box-ordinal-group'];

    Order.prototype.prefixed = function(prop, prefix) {
      var ref, spec;
      ref = flexSpec(prefix), spec = ref[0], prefix = ref[1];
      if (spec === 2009) {
        return prefix + 'box-ordinal-group';
      } else if (spec === 2012) {
        return prefix + 'flex-order';
      } else {
        return Order.__super__.prefixed.apply(this, arguments);
      }
    };

    Order.prototype.normalize = function(prop) {
      return 'order';
    };

    Order.prototype.set = function(decl, prefix) {
      var spec;
      spec = flexSpec(prefix)[0];
      if (spec === 2009) {
        decl.value = (parseInt(decl.value) + 1).toString();
        return Order.__super__.set.call(this, decl, prefix);
      } else {
        return Order.__super__.set.apply(this, arguments);
      }
    };

    return Order;

  })(Declaration);

  module.exports = Order;

}).call(this);

},{"../declaration":9,"./flex-spec":28}],38:[function(require,module,exports){
(function() {
  var Placeholder, Selector,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Selector = require('../selector');

  Placeholder = (function(superClass) {
    extend(Placeholder, superClass);

    function Placeholder() {
      return Placeholder.__super__.constructor.apply(this, arguments);
    }

    Placeholder.names = [':placeholder-shown', '::placeholder'];

    Placeholder.prototype.possible = function() {
      return Placeholder.__super__.possible.apply(this, arguments).concat('-moz- old');
    };

    Placeholder.prototype.prefixed = function(prefix) {
      if ('-webkit-' === prefix) {
        return '::-webkit-input-placeholder';
      } else if ('-ms-' === prefix) {
        return ':-ms-input-placeholder';
      } else if ('-moz- old' === prefix) {
        return ':-moz-placeholder';
      } else {
        return "::" + prefix + "placeholder";
      }
    };

    return Placeholder;

  })(Selector);

  module.exports = Placeholder;

}).call(this);

},{"../selector":48}],39:[function(require,module,exports){
(function() {
  var Declaration, TransformDecl,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Declaration = require('../declaration');

  TransformDecl = (function(superClass) {
    extend(TransformDecl, superClass);

    function TransformDecl() {
      return TransformDecl.__super__.constructor.apply(this, arguments);
    }

    TransformDecl.names = ['transform', 'transform-origin'];

    TransformDecl.functions3d = ['matrix3d', 'translate3d', 'translateZ', 'scale3d', 'scaleZ', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'perspective'];

    TransformDecl.prototype.keykrameParents = function(decl) {
      var parent;
      parent = decl.parent;
      while (parent) {
        if (parent.type === 'atrule' && parent.name === 'keyframes') {
          return true;
        }
        parent = parent.parent;
      }
      return false;
    };

    TransformDecl.prototype.contain3d = function(decl) {
      var func, i, len, ref;
      if (decl.prop === 'transform-origin') {
        return false;
      }
      ref = TransformDecl.functions3d;
      for (i = 0, len = ref.length; i < len; i++) {
        func = ref[i];
        if (decl.value.indexOf(func + "(") !== -1) {
          return true;
        }
      }
      return false;
    };

    TransformDecl.prototype.insert = function(decl, prefix, prefixes) {
      if (prefix === '-ms-') {
        if (!this.contain3d(decl) && !this.keykrameParents(decl)) {
          return TransformDecl.__super__.insert.apply(this, arguments);
        }
      } else if (prefix === '-o-') {
        if (!this.contain3d(decl)) {
          return TransformDecl.__super__.insert.apply(this, arguments);
        }
      } else {
        return TransformDecl.__super__.insert.apply(this, arguments);
      }
    };

    return TransformDecl;

  })(Declaration);

  module.exports = TransformDecl;

}).call(this);

},{"../declaration":9}],40:[function(require,module,exports){
(function() {
  var TransformValue, Value,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Value = require('../value');

  TransformValue = (function(superClass) {
    extend(TransformValue, superClass);

    function TransformValue() {
      return TransformValue.__super__.constructor.apply(this, arguments);
    }

    TransformValue.names = ['transform'];

    TransformValue.prototype.replace = function(value, prefix) {
      if (prefix === '-ms-') {
        return value;
      } else {
        return TransformValue.__super__.replace.apply(this, arguments);
      }
    };

    return TransformValue;

  })(Value);

  module.exports = TransformValue;

}).call(this);

},{"../value":51}],41:[function(require,module,exports){
(function() {
  var capitalize, names, prefix;

  capitalize = function(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  };

  names = {
    ie: 'IE',
    ie_mob: 'IE Mobile',
    ios_saf: 'iOS',
    op_mini: 'Opera Mini',
    op_mob: 'Opera Mobile',
    and_chr: 'Chrome for Android',
    and_ff: 'Firefox for Android',
    and_uc: 'UC for Android'
  };

  prefix = function(name, transition, prefixes) {
    var out;
    out = '  ' + name + (transition ? '*' : '') + ': ';
    out += prefixes.map(function(i) {
      return i.replace(/^-(.*)-$/g, '$1');
    }).join(', ');
    out += "\n";
    return out;
  };

  module.exports = function(prefixes) {
    var atrules, browser, data, j, k, l, len, len1, len2, list, name, needTransition, out, props, ref, ref1, ref2, ref3, ref4, ref5, ref6, selector, selectors, string, transitionProp, useTransition, value, values, version, versions;
    if (prefixes.browsers.selected.length === 0) {
      return "No browsers selected";
    }
    versions = [];
    ref = prefixes.browsers.selected;
    for (j = 0, len = ref.length; j < len; j++) {
      browser = ref[j];
      ref1 = browser.split(' '), name = ref1[0], version = ref1[1];
      name = names[name] || capitalize(name);
      if (versions[name]) {
        versions[name].push(version);
      } else {
        versions[name] = [version];
      }
    }
    out = "Browsers:\n";
    for (browser in versions) {
      list = versions[browser];
      list = list.sort(function(a, b) {
        return parseFloat(b) - parseFloat(a);
      });
      out += '  ' + browser + ': ' + list.join(', ') + "\n";
    }
    atrules = '';
    ref2 = prefixes.add;
    for (name in ref2) {
      data = ref2[name];
      if (name[0] === '@' && data.prefixes) {
        atrules += prefix(name, false, data.prefixes);
      }
    }
    if (atrules !== '') {
      out += "\nAt-Rules:\n" + atrules;
    }
    selectors = '';
    ref3 = prefixes.add.selectors;
    for (k = 0, len1 = ref3.length; k < len1; k++) {
      selector = ref3[k];
      if (selector.prefixes) {
        selectors += prefix(selector.name, false, selector.prefixes);
      }
    }
    if (selectors !== '') {
      out += "\nSelectors:\n" + selectors;
    }
    values = '';
    props = '';
    useTransition = false;
    needTransition = (ref4 = prefixes.add.transition) != null ? ref4.prefixes : void 0;
    ref5 = prefixes.add;
    for (name in ref5) {
      data = ref5[name];
      if (name[0] !== '@' && data.prefixes) {
        transitionProp = needTransition && prefixes.data[name].transition;
        if (transitionProp) {
          useTransition = true;
        }
        props += prefix(name, transitionProp, data.prefixes);
      }
      if (!data.values) {
        continue;
      }
      if (prefixes.transitionProps.some(function(i) {
        return i === name;
      })) {
        continue;
      }
      ref6 = data.values;
      for (l = 0, len2 = ref6.length; l < len2; l++) {
        value = ref6[l];
        string = prefix(value.name, false, value.prefixes);
        if (values.indexOf(string) === -1) {
          values += string;
        }
      }
    }
    if (useTransition) {
      props += "  * - can be used in transition\n";
    }
    if (props !== '') {
      out += "\nProperties:\n" + props;
    }
    if (values !== '') {
      out += "\nValues:\n" + values;
    }
    if (atrules === '' && selectors === '' && props === '' && values === '') {
      out += '\nAwesome! Your browsers don\'t require any vendor prefixes.' + '\nNow you can remove Autoprefixer from build steps.';
    }
    return out;
  };

}).call(this);

},{}],42:[function(require,module,exports){
(function() {
  var OldSelector;

  OldSelector = (function() {
    function OldSelector(selector, prefix1) {
      var i, len, prefix, ref;
      this.prefix = prefix1;
      this.prefixed = selector.prefixed(this.prefix);
      this.regexp = selector.regexp(this.prefix);
      this.prefixeds = [];
      ref = selector.possible();
      for (i = 0, len = ref.length; i < len; i++) {
        prefix = ref[i];
        this.prefixeds.push([selector.prefixed(prefix), selector.regexp(prefix)]);
      }
      this.unprefixed = selector.name;
      this.nameRegexp = selector.regexp();
    }

    OldSelector.prototype.isHack = function(rule) {
      var before, i, index, len, ref, ref1, regexp, rules, some, string;
      index = rule.parent.index(rule) + 1;
      rules = rule.parent.nodes;
      while (index < rules.length) {
        before = rules[index].selector;
        if (!before) {
          return true;
        }
        if (before.indexOf(this.unprefixed) !== -1 && before.match(this.nameRegexp)) {
          return false;
        }
        some = false;
        ref = this.prefixeds;
        for (i = 0, len = ref.length; i < len; i++) {
          ref1 = ref[i], string = ref1[0], regexp = ref1[1];
          if (before.indexOf(string) !== -1 && before.match(regexp)) {
            some = true;
            break;
          }
        }
        if (!some) {
          return true;
        }
        index += 1;
      }
      return true;
    };

    OldSelector.prototype.check = function(rule) {
      if (rule.selector.indexOf(this.prefixed) === -1) {
        return false;
      }
      if (!rule.selector.match(this.regexp)) {
        return false;
      }
      if (this.isHack(rule)) {
        return false;
      }
      return true;
    };

    return OldSelector;

  })();

  module.exports = OldSelector;

}).call(this);

},{}],43:[function(require,module,exports){
(function() {
  var OldValue, utils;

  utils = require('./utils');

  OldValue = (function() {
    function OldValue(unprefixed, prefixed, string, regexp) {
      this.unprefixed = unprefixed;
      this.prefixed = prefixed;
      this.string = string;
      this.regexp = regexp;
      this.regexp || (this.regexp = utils.regexp(this.prefixed));
      this.string || (this.string = this.prefixed);
    }

    OldValue.prototype.check = function(value) {
      if (value.indexOf(this.string) !== -1) {
        return !!value.match(this.regexp);
      } else {
        return false;
      }
    };

    return OldValue;

  })();

  module.exports = OldValue;

}).call(this);

},{"./utils":50}],44:[function(require,module,exports){
(function() {
  var Browsers, Prefixer, clone, utils, vendor,
    hasProp = {}.hasOwnProperty;

  Browsers = require('./browsers');

  utils = require('./utils');

  vendor = require('postcss/lib/vendor');

  clone = function(obj, parent) {
    var cloned, i, value;
    if (typeof obj !== 'object') {
      return obj;
    }
    cloned = new obj.constructor();
    for (i in obj) {
      if (!hasProp.call(obj, i)) continue;
      value = obj[i];
      if (i === 'parent' && typeof value === 'object') {
        if (parent) {
          cloned[i] = parent;
        }
      } else if (i === 'source') {
        cloned[i] = value;
      } else if (value instanceof Array) {
        cloned[i] = value.map(function(i) {
          return clone(i, cloned);
        });
      } else if (i !== '_autoprefixerPrefix' && i !== '_autoprefixerValues') {
        cloned[i] = clone(value, cloned);
      }
    }
    return cloned;
  };

  Prefixer = (function() {
    Prefixer.hack = function(klass) {
      var j, len, name, ref, results;
      this.hacks || (this.hacks = {});
      ref = klass.names;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        name = ref[j];
        results.push(this.hacks[name] = klass);
      }
      return results;
    };

    Prefixer.load = function(name, prefixes, all) {
      var klass, ref;
      klass = (ref = this.hacks) != null ? ref[name] : void 0;
      if (klass) {
        return new klass(name, prefixes, all);
      } else {
        return new this(name, prefixes, all);
      }
    };

    Prefixer.clone = function(node, overrides) {
      var cloned, name;
      cloned = clone(node);
      for (name in overrides) {
        cloned[name] = overrides[name];
      }
      return cloned;
    };

    function Prefixer(name1, prefixes1, all1) {
      this.name = name1;
      this.prefixes = prefixes1;
      this.all = all1;
    }

    Prefixer.prototype.parentPrefix = function(node) {
      var prefix;
      prefix = node._autoprefixerPrefix != null ? node._autoprefixerPrefix : node.type === 'decl' && node.prop[0] === '-' ? vendor.prefix(node.prop) : node.type === 'root' ? false : node.type === 'rule' && node.selector.indexOf(':-') !== -1 ? node.selector.match(/:(-\w+-)/)[1] : node.type === 'atrule' && node.name[0] === '-' ? vendor.prefix(node.name) : this.parentPrefix(node.parent);
      if (Browsers.prefixes().indexOf(prefix) === -1) {
        prefix = false;
      }
      return node._autoprefixerPrefix = prefix;
    };

    Prefixer.prototype.process = function(node) {
      var added, j, k, len, len1, parent, prefix, prefixes, ref;
      if (!this.check(node)) {
        return;
      }
      parent = this.parentPrefix(node);
      prefixes = [];
      ref = this.prefixes;
      for (j = 0, len = ref.length; j < len; j++) {
        prefix = ref[j];
        if (parent && parent !== utils.removeNote(prefix)) {
          continue;
        }
        prefixes.push(prefix);
      }
      added = [];
      for (k = 0, len1 = prefixes.length; k < len1; k++) {
        prefix = prefixes[k];
        if (this.add(node, prefix, added.concat([prefix]))) {
          added.push(prefix);
        }
      }
      return added;
    };

    Prefixer.prototype.clone = function(node, overrides) {
      return Prefixer.clone(node, overrides);
    };

    return Prefixer;

  })();

  module.exports = Prefixer;

}).call(this);

},{"./browsers":8,"./utils":50,"postcss/lib/vendor":110}],45:[function(require,module,exports){
(function() {
  var AtRule, Browsers, Declaration, Prefixes, Processor, Resolution, Selector, Supports, Value, declsCache, utils, vendor;

  Declaration = require('./declaration');

  Resolution = require('./resolution');

  Processor = require('./processor');

  Supports = require('./supports');

  Browsers = require('./browsers');

  Selector = require('./selector');

  AtRule = require('./at-rule');

  Value = require('./value');

  utils = require('./utils');

  vendor = require('postcss/lib/vendor');

  Selector.hack(require('./hacks/fullscreen'));

  Selector.hack(require('./hacks/placeholder'));

  Declaration.hack(require('./hacks/flex'));

  Declaration.hack(require('./hacks/order'));

  Declaration.hack(require('./hacks/filter'));

  Declaration.hack(require('./hacks/flex-flow'));

  Declaration.hack(require('./hacks/flex-grow'));

  Declaration.hack(require('./hacks/flex-wrap'));

  Declaration.hack(require('./hacks/align-self'));

  Declaration.hack(require('./hacks/flex-basis'));

  Declaration.hack(require('./hacks/align-items'));

  Declaration.hack(require('./hacks/flex-shrink'));

  Declaration.hack(require('./hacks/break-inside'));

  Declaration.hack(require('./hacks/border-image'));

  Declaration.hack(require('./hacks/align-content'));

  Declaration.hack(require('./hacks/border-radius'));

  Declaration.hack(require('./hacks/block-logical'));

  Declaration.hack(require('./hacks/inline-logical'));

  Declaration.hack(require('./hacks/transform-decl'));

  Declaration.hack(require('./hacks/flex-direction'));

  Declaration.hack(require('./hacks/image-rendering'));

  Declaration.hack(require('./hacks/justify-content'));

  Declaration.hack(require('./hacks/background-size'));

  Value.hack(require('./hacks/gradient'));

  Value.hack(require('./hacks/crisp-edges'));

  Value.hack(require('./hacks/flex-values'));

  Value.hack(require('./hacks/display-flex'));

  Value.hack(require('./hacks/filter-value'));

  Value.hack(require('./hacks/fill-available'));

  Value.hack(require('./hacks/transform-value'));

  declsCache = {};

  Prefixes = (function() {
    function Prefixes(data1, browsers, options) {
      var ref;
      this.data = data1;
      this.browsers = browsers;
      this.options = options != null ? options : {};
      ref = this.preprocess(this.select(this.data)), this.add = ref[0], this.remove = ref[1];
      this.processor = new Processor(this);
    }

    Prefixes.prototype.transitionProps = ['transition', 'transition-property'];

    Prefixes.prototype.cleaner = function() {
      var empty;
      if (!this.cleanerCache) {
        if (this.browsers.selected.length) {
          empty = new Browsers(this.browsers.data, []);
          this.cleanerCache = new Prefixes(this.data, empty, this.options);
        } else {
          return this;
        }
      }
      return this.cleanerCache;
    };

    Prefixes.prototype.select = function(list) {
      var add, all, data, name, notes, selected;
      selected = {
        add: {},
        remove: {}
      };
      for (name in list) {
        data = list[name];
        add = data.browsers.map(function(i) {
          var params;
          params = i.split(' ');
          return {
            browser: params[0] + ' ' + params[1],
            note: params[2]
          };
        });
        notes = add.filter(function(i) {
          return i.note;
        }).map((function(_this) {
          return function(i) {
            return _this.browsers.prefix(i.browser) + ' ' + i.note;
          };
        })(this));
        notes = utils.uniq(notes);
        add = add.filter((function(_this) {
          return function(i) {
            return _this.browsers.isSelected(i.browser);
          };
        })(this)).map((function(_this) {
          return function(i) {
            var prefix;
            prefix = _this.browsers.prefix(i.browser);
            if (i.note) {
              return prefix + ' ' + i.note;
            } else {
              return prefix;
            }
          };
        })(this));
        add = this.sort(utils.uniq(add));
        all = data.browsers.map((function(_this) {
          return function(i) {
            return _this.browsers.prefix(i);
          };
        })(this));
        if (data.mistakes) {
          all = all.concat(data.mistakes);
        }
        all = all.concat(notes);
        all = utils.uniq(all);
        if (add.length) {
          selected.add[name] = add;
          if (add.length < all.length) {
            selected.remove[name] = all.filter(function(i) {
              return add.indexOf(i) === -1;
            });
          }
        } else {
          selected.remove[name] = all;
        }
      }
      return selected;
    };

    Prefixes.prototype.sort = function(prefixes) {
      return prefixes.sort(function(a, b) {
        var aLength, bLength;
        aLength = utils.removeNote(a).length;
        bLength = utils.removeNote(b).length;
        if (aLength === bLength) {
          return b.length - a.length;
        } else {
          return bLength - aLength;
        }
      });
    };

    Prefixes.prototype.preprocess = function(selected) {
      var add, j, k, l, len, len1, len2, len3, len4, len5, len6, m, n, name, o, old, olds, p, prefix, prefixed, prefixes, prop, props, ref, ref1, ref2, remove, selector, value, values;
      add = {
        selectors: [],
        '@supports': new Supports(this)
      };
      ref = selected.add;
      for (name in ref) {
        prefixes = ref[name];
        if (name === '@keyframes' || name === '@viewport') {
          add[name] = new AtRule(name, prefixes, this);
        } else if (name === '@resolution') {
          add[name] = new Resolution(name, prefixes, this);
        } else if (this.data[name].selector) {
          add.selectors.push(Selector.load(name, prefixes, this));
        } else {
          props = this.data[name].transition ? this.transitionProps : this.data[name].props;
          if (props) {
            value = Value.load(name, prefixes, this);
            for (j = 0, len = props.length; j < len; j++) {
              prop = props[j];
              if (!add[prop]) {
                add[prop] = {
                  values: []
                };
              }
              add[prop].values.push(value);
            }
          }
          if (!this.data[name].props) {
            values = ((ref1 = add[name]) != null ? ref1.values : void 0) || [];
            add[name] = Declaration.load(name, prefixes, this);
            add[name].values = values;
          }
        }
      }
      remove = {
        selectors: []
      };
      ref2 = selected.remove;
      for (name in ref2) {
        prefixes = ref2[name];
        if (this.data[name].selector) {
          selector = Selector.load(name, prefixes);
          for (k = 0, len1 = prefixes.length; k < len1; k++) {
            prefix = prefixes[k];
            remove.selectors.push(selector.old(prefix));
          }
        } else if (name === '@keyframes' || name === '@viewport') {
          for (l = 0, len2 = prefixes.length; l < len2; l++) {
            prefix = prefixes[l];
            prefixed = '@' + prefix + name.slice(1);
            remove[prefixed] = {
              remove: true
            };
          }
        } else if (name === '@resolution') {
          remove[name] = new Resolution(name, prefixes, this);
        } else {
          props = this.data[name].transition ? this.transitionProps : this.data[name].props;
          if (props) {
            value = Value.load(name, [], this);
            for (m = 0, len3 = prefixes.length; m < len3; m++) {
              prefix = prefixes[m];
              old = value.old(prefix);
              if (old) {
                for (n = 0, len4 = props.length; n < len4; n++) {
                  prop = props[n];
                  if (!remove[prop]) {
                    remove[prop] = {};
                  }
                  if (!remove[prop].values) {
                    remove[prop].values = [];
                  }
                  remove[prop].values.push(old);
                }
              }
            }
          }
          if (!this.data[name].props) {
            for (o = 0, len5 = prefixes.length; o < len5; o++) {
              prefix = prefixes[o];
              prop = vendor.unprefixed(name);
              olds = this.decl(name).old(name, prefix);
              for (p = 0, len6 = olds.length; p < len6; p++) {
                prefixed = olds[p];
                if (!remove[prefixed]) {
                  remove[prefixed] = {};
                }
                remove[prefixed].remove = true;
              }
            }
          }
        }
      }
      return [add, remove];
    };

    Prefixes.prototype.decl = function(prop) {
      var decl;
      decl = declsCache[prop];
      if (decl) {
        return decl;
      } else {
        return declsCache[prop] = Declaration.load(prop);
      }
    };

    Prefixes.prototype.unprefixed = function(prop) {
      prop = vendor.unprefixed(prop);
      return this.decl(prop).normalize(prop);
    };

    Prefixes.prototype.prefixed = function(prop, prefix) {
      prop = vendor.unprefixed(prop);
      return this.decl(prop).prefixed(prop, prefix);
    };

    Prefixes.prototype.values = function(type, prop) {
      var data, global, ref, ref1, values;
      data = this[type];
      global = (ref = data['*']) != null ? ref.values : void 0;
      values = (ref1 = data[prop]) != null ? ref1.values : void 0;
      if (global && values) {
        return utils.uniq(global.concat(values));
      } else {
        return global || values || [];
      }
    };

    Prefixes.prototype.group = function(decl) {
      var checker, index, length, rule, unprefixed;
      rule = decl.parent;
      index = rule.index(decl);
      length = rule.nodes.length;
      unprefixed = this.unprefixed(decl.prop);
      checker = (function(_this) {
        return function(step, callback) {
          var other;
          index += step;
          while (index >= 0 && index < length) {
            other = rule.nodes[index];
            if (other.type === 'decl') {
              if (step === -1 && other.prop === unprefixed) {
                if (!Browsers.withPrefix(other.value)) {
                  break;
                }
              }
              if (_this.unprefixed(other.prop) !== unprefixed) {
                break;
              } else if (callback(other) === true) {
                return true;
              }
              if (step === +1 && other.prop === unprefixed) {
                if (!Browsers.withPrefix(other.value)) {
                  break;
                }
              }
            }
            index += step;
          }
          return false;
        };
      })(this);
      return {
        up: function(callback) {
          return checker(-1, callback);
        },
        down: function(callback) {
          return checker(+1, callback);
        }
      };
    };

    return Prefixes;

  })();

  module.exports = Prefixes;

}).call(this);

},{"./at-rule":6,"./browsers":8,"./declaration":9,"./hacks/align-content":10,"./hacks/align-items":11,"./hacks/align-self":12,"./hacks/background-size":13,"./hacks/block-logical":14,"./hacks/border-image":15,"./hacks/border-radius":16,"./hacks/break-inside":17,"./hacks/crisp-edges":18,"./hacks/display-flex":19,"./hacks/fill-available":20,"./hacks/filter":22,"./hacks/filter-value":21,"./hacks/flex":31,"./hacks/flex-basis":23,"./hacks/flex-direction":24,"./hacks/flex-flow":25,"./hacks/flex-grow":26,"./hacks/flex-shrink":27,"./hacks/flex-values":29,"./hacks/flex-wrap":30,"./hacks/fullscreen":32,"./hacks/gradient":33,"./hacks/image-rendering":34,"./hacks/inline-logical":35,"./hacks/justify-content":36,"./hacks/order":37,"./hacks/placeholder":38,"./hacks/transform-decl":39,"./hacks/transform-value":40,"./processor":46,"./resolution":47,"./selector":48,"./supports":49,"./utils":50,"./value":51,"postcss/lib/vendor":110}],46:[function(require,module,exports){
(function() {
  var Processor, Value, utils, vendor;

  vendor = require('postcss/lib/vendor');

  Value = require('./value');

  utils = require('./utils');

  Processor = (function() {
    function Processor(prefixes) {
      this.prefixes = prefixes;
    }

    Processor.prototype.add = function(css) {
      var keyframes, resolution, supports, viewport;
      resolution = this.prefixes.add['@resolution'];
      keyframes = this.prefixes.add['@keyframes'];
      viewport = this.prefixes.add['@viewport'];
      supports = this.prefixes.add['@supports'];
      css.eachAtRule((function(_this) {
        return function(rule) {
          if (rule.name === 'keyframes') {
            if (!_this.disabled(rule)) {
              return keyframes != null ? keyframes.process(rule) : void 0;
            }
          } else if (rule.name === 'viewport') {
            if (!_this.disabled(rule)) {
              return viewport != null ? viewport.process(rule) : void 0;
            }
          } else if (rule.name === 'supports') {
            if (!_this.disabled(rule)) {
              return supports.process(rule);
            }
          } else if (rule.name === 'media' && rule.params.indexOf('-resolution') !== -1) {
            if (!_this.disabled(rule)) {
              return resolution != null ? resolution.process(rule) : void 0;
            }
          }
        };
      })(this));
      css.eachRule((function(_this) {
        return function(rule) {
          var j, len, ref, results, selector;
          if (_this.disabled(rule)) {
            return;
          }
          ref = _this.prefixes.add.selectors;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            selector = ref[j];
            results.push(selector.process(rule));
          }
          return results;
        };
      })(this));
      css.eachDecl((function(_this) {
        return function(decl) {
          var prefix;
          prefix = _this.prefixes.add[decl.prop];
          if (prefix && prefix.prefixes) {
            if (!_this.disabled(decl)) {
              return prefix.process(decl);
            }
          }
        };
      })(this));
      return css.eachDecl((function(_this) {
        return function(decl) {
          var j, len, ref, unprefixed, value;
          if (_this.disabled(decl)) {
            return;
          }
          unprefixed = _this.prefixes.unprefixed(decl.prop);
          ref = _this.prefixes.values('add', unprefixed);
          for (j = 0, len = ref.length; j < len; j++) {
            value = ref[j];
            value.process(decl);
          }
          return Value.save(_this.prefixes, decl);
        };
      })(this));
    };

    Processor.prototype.remove = function(css) {
      var checker, j, len, ref, resolution;
      resolution = this.prefixes.remove['@resolution'];
      css.eachAtRule((function(_this) {
        return function(rule, i) {
          if (_this.prefixes.remove['@' + rule.name]) {
            if (!_this.disabled(rule)) {
              return rule.parent.remove(i);
            }
          } else if (rule.name === 'media' && rule.params.indexOf('-resolution') !== -1) {
            return resolution != null ? resolution.clean(rule) : void 0;
          }
        };
      })(this));
      ref = this.prefixes.remove.selectors;
      for (j = 0, len = ref.length; j < len; j++) {
        checker = ref[j];
        css.eachRule((function(_this) {
          return function(rule, i) {
            if (checker.check(rule)) {
              if (!_this.disabled(rule)) {
                return rule.parent.remove(i);
              }
            }
          };
        })(this));
      }
      return css.eachDecl((function(_this) {
        return function(decl, i) {
          var k, len1, notHack, ref1, ref2, rule, unprefixed;
          if (_this.disabled(decl)) {
            return;
          }
          rule = decl.parent;
          unprefixed = _this.prefixes.unprefixed(decl.prop);
          if ((ref1 = _this.prefixes.remove[decl.prop]) != null ? ref1.remove : void 0) {
            notHack = _this.prefixes.group(decl).down(function(other) {
              return other.prop === unprefixed;
            });
            if (notHack && !_this.withHackValue(decl)) {
              if (decl.style('before').indexOf("\n") > -1) {
                _this.reduceSpaces(decl);
              }
              rule.remove(i);
              return;
            }
          }
          ref2 = _this.prefixes.values('remove', unprefixed);
          for (k = 0, len1 = ref2.length; k < len1; k++) {
            checker = ref2[k];
            if (checker.check(decl.value)) {
              unprefixed = checker.unprefixed;
              notHack = _this.prefixes.group(decl).down(function(other) {
                return other.value.indexOf(unprefixed) !== -1;
              });
              if (notHack) {
                rule.remove(i);
                return;
              } else if (checker.clean) {
                checker.clean(decl);
                return;
              }
            }
          }
        };
      })(this));
    };

    Processor.prototype.withHackValue = function(decl) {
      return decl.prop === '-webkit-background-clip' && decl.value === 'text';
    };

    Processor.prototype.disabled = function(node) {
      var status;
      if (node._autoprefixerDisabled != null) {
        return node._autoprefixerDisabled;
      } else if (node.nodes) {
        status = void 0;
        node.each(function(i) {
          if (i.type !== 'comment') {
            return;
          }
          if (i.text === 'autoprefixer: off') {
            status = false;
            return false;
          } else if (i.text === 'autoprefixer: on') {
            status = true;
            return false;
          }
        });
        return node._autoprefixerDisabled = status != null ? !status : node.parent ? this.disabled(node.parent) : false;
      } else {
        return node._autoprefixerDisabled = this.disabled(node.parent);
      }
    };

    Processor.prototype.reduceSpaces = function(decl) {
      var diff, parts, prevMin, stop;
      stop = false;
      this.prefixes.group(decl).up(function(other) {
        return stop = true;
      });
      if (stop) {
        return;
      }
      parts = decl.style('before').split("\n");
      prevMin = parts[parts.length - 1].length;
      diff = false;
      return this.prefixes.group(decl).down(function(other) {
        var last;
        parts = other.style('before').split("\n");
        last = parts.length - 1;
        if (parts[last].length > prevMin) {
          if (diff === false) {
            diff = parts[last].length - prevMin;
          }
          parts[last] = parts[last].slice(0, -diff);
          return other.before = parts.join("\n");
        }
      });
    };

    return Processor;

  })();

  module.exports = Processor;

}).call(this);

},{"./utils":50,"./value":51,"postcss/lib/vendor":110}],47:[function(require,module,exports){
(function() {
  var Prefixer, Resolution, n2f, regexp, split, utils,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Prefixer = require('./prefixer');

  utils = require('./utils');

  n2f = require('num2fraction');

  regexp = /(min|max)-resolution\s*:\s*\d*\.?\d+(dppx|dpi)/gi;

  split = /(min|max)-resolution(\s*:\s*)(\d*\.?\d+)(dppx|dpi)/i;

  Resolution = (function(superClass) {
    extend(Resolution, superClass);

    function Resolution() {
      return Resolution.__super__.constructor.apply(this, arguments);
    }

    Resolution.prototype.prefixName = function(prefix, name) {
      return name = prefix === '-moz-' ? name + '--moz-device-pixel-ratio' : prefix + name + '-device-pixel-ratio';
    };

    Resolution.prototype.prefixQuery = function(prefix, name, colon, value, units) {
      if (units === 'dpi') {
        value = Number(value / 96);
      }
      if (prefix === '-o-') {
        value = n2f(value);
      }
      return this.prefixName(prefix, name) + colon + value;
    };

    Resolution.prototype.clean = function(rule) {
      var j, len, prefix, ref;
      if (!this.bad) {
        this.bad = [];
        ref = this.prefixes;
        for (j = 0, len = ref.length; j < len; j++) {
          prefix = ref[j];
          this.bad.push(this.prefixName(prefix, 'min'));
          this.bad.push(this.prefixName(prefix, 'max'));
        }
      }
      return rule.params = utils.editList(rule.params, (function(_this) {
        return function(queries) {
          return queries.filter(function(query) {
            return _this.bad.every(function(i) {
              return query.indexOf(i) === -1;
            });
          });
        };
      })(this));
    };

    Resolution.prototype.process = function(rule) {
      var parent, prefixes;
      parent = this.parentPrefix(rule);
      prefixes = parent ? [parent] : this.prefixes;
      return rule.params = utils.editList(rule.params, (function(_this) {
        return function(origin, prefixed) {
          var j, k, len, len1, prefix, processed, query;
          for (j = 0, len = origin.length; j < len; j++) {
            query = origin[j];
            if (query.indexOf('min-resolution') === -1 && query.indexOf('max-resolution') === -1) {
              prefixed.push(query);
              continue;
            }
            for (k = 0, len1 = prefixes.length; k < len1; k++) {
              prefix = prefixes[k];
              if (prefix === '-moz-' && rule.params.indexOf('dpi') !== -1) {
                continue;
              } else {
                processed = query.replace(regexp, function(str) {
                  var parts;
                  parts = str.match(split);
                  return _this.prefixQuery(prefix, parts[1], parts[2], parts[3], parts[4]);
                });
                prefixed.push(processed);
              }
            }
            prefixed.push(query);
          }
          return utils.uniq(prefixed);
        };
      })(this));
    };

    return Resolution;

  })(Prefixer);

  module.exports = Resolution;

}).call(this);

},{"./prefixer":44,"./utils":50,"num2fraction":92}],48:[function(require,module,exports){
(function() {
  var Browsers, OldSelector, Prefixer, Selector, utils,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  OldSelector = require('./old-selector');

  Prefixer = require('./prefixer');

  Browsers = require('./browsers');

  utils = require('./utils');

  Selector = (function(superClass) {
    extend(Selector, superClass);

    function Selector(name1, prefixes, all) {
      this.name = name1;
      this.prefixes = prefixes;
      this.all = all;
      this.regexpCache = {};
    }

    Selector.prototype.check = function(rule) {
      if (rule.selector.indexOf(this.name) !== -1) {
        return !!rule.selector.match(this.regexp());
      } else {
        return false;
      }
    };

    Selector.prototype.prefixed = function(prefix) {
      return this.name.replace(/^([^\w]*)/, '$1' + prefix);
    };

    Selector.prototype.regexp = function(prefix) {
      var name;
      if (this.regexpCache[prefix]) {
        return this.regexpCache[prefix];
      }
      name = prefix ? this.prefixed(prefix) : this.name;
      return this.regexpCache[prefix] = RegExp("(^|[^:\"'=])" + (utils.escapeRegexp(name)), "gi");
    };

    Selector.prototype.possible = function() {
      return Browsers.prefixes();
    };

    Selector.prototype.prefixeds = function(rule) {
      var i, len, prefix, prefixeds, ref;
      if (rule._autoprefixerPrefixeds) {
        return rule._autoprefixerPrefixeds;
      }
      prefixeds = {};
      ref = this.possible();
      for (i = 0, len = ref.length; i < len; i++) {
        prefix = ref[i];
        prefixeds[prefix] = this.replace(rule.selector, prefix);
      }
      return rule._autoprefixerPrefixeds = prefixeds;
    };

    Selector.prototype.already = function(rule, prefixeds, prefix) {
      var before, index, key, prefixed, some;
      index = rule.parent.index(rule) - 1;
      while (index >= 0) {
        before = rule.parent.nodes[index];
        if (before.type !== 'rule') {
          return false;
        }
        some = false;
        for (key in prefixeds) {
          prefixed = prefixeds[key];
          if (before.selector === prefixed) {
            if (prefix === key) {
              return true;
            } else {
              some = true;
              break;
            }
          }
        }
        if (!some) {
          return false;
        }
        index -= 1;
      }
      return false;
    };

    Selector.prototype.replace = function(selector, prefix) {
      return selector.replace(this.regexp(), '$1' + this.prefixed(prefix));
    };

    Selector.prototype.add = function(rule, prefix) {
      var cloned, prefixeds;
      prefixeds = this.prefixeds(rule);
      if (this.already(rule, prefixeds, prefix)) {
        return;
      }
      cloned = this.clone(rule, {
        selector: prefixeds[prefix]
      });
      return rule.parent.insertBefore(rule, cloned);
    };

    Selector.prototype.old = function(prefix) {
      return new OldSelector(this, prefix);
    };

    return Selector;

  })(Prefixer);

  module.exports = Selector;

}).call(this);

},{"./browsers":8,"./old-selector":42,"./prefixer":44,"./utils":50}],49:[function(require,module,exports){
(function() {
  var Prefixes, Supports, Value, findCondition, findDecl, list, postcss, split, utils;

  Prefixes = require('./prefixes');

  Value = require('./value');

  utils = require('./utils');

  postcss = require('postcss');

  list = require('postcss/lib/list');

  split = /\(\s*([^\(\):]+)\s*:([^\)]+)/;

  findDecl = /\(\s*([^\(\):]+)\s*:\s*(.+)\s*\)/g;

  findCondition = /(not\s*)?\(\s*([^\(\):]+)\s*:\s*(.+?(?!\s*or\s*).+?)\s*\)*\s*\)\s*or\s*/gi;

  Supports = (function() {
    function Supports(all1) {
      this.all = all1;
    }

    Supports.prototype.virtual = function(prop, value) {
      var rule;
      rule = postcss.parse('a{}').first;
      rule.append({
        prop: prop,
        value: value,
        before: ''
      });
      return rule;
    };

    Supports.prototype.prefixed = function(prop, value) {
      var decl, j, k, len, len1, prefixer, ref, ref1, rule;
      rule = this.virtual(prop, value);
      prefixer = this.all.add[prop];
      if (prefixer != null) {
        if (typeof prefixer.process === "function") {
          prefixer.process(rule.first);
        }
      }
      ref = rule.nodes;
      for (j = 0, len = ref.length; j < len; j++) {
        decl = ref[j];
        ref1 = this.all.values('add', prop);
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          value = ref1[k];
          value.process(decl);
        }
        Value.save(this.all, decl);
      }
      return rule.nodes;
    };

    Supports.prototype.clean = function(params) {
      return params.replace(findCondition, (function(_this) {
        return function(all) {
          var _, check, checker, j, len, prop, ref, ref1, ref2, unprefixed, value;
          if (all.slice(0, 3).toLowerCase() === 'not') {
            return all;
          }
          ref = all.match(split), _ = ref[0], prop = ref[1], value = ref[2];
          unprefixed = _this.all.unprefixed(prop);
          if ((ref1 = _this.all.cleaner().remove[prop]) != null ? ref1.remove : void 0) {
            check = new RegExp('(\\(|\\s)' + utils.escapeRegexp(unprefixed) + ':');
            if (check.test(params)) {
              return '';
            }
          }
          ref2 = _this.all.cleaner().values('remove', unprefixed);
          for (j = 0, len = ref2.length; j < len; j++) {
            checker = ref2[j];
            if (checker.check(value)) {
              return '';
            }
          }
          return all;
        };
      })(this)).replace(/\(\s*\((.*)\)\s*\)/g, '($1)');
    };

    Supports.prototype.process = function(rule) {
      rule.params = this.clean(rule.params);
      return rule.params = rule.params.replace(findDecl, (function(_this) {
        return function(all, prop, value) {
          var i, stringed;
          stringed = (function() {
            var j, len, ref, results;
            ref = this.prefixed(prop, value);
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              i = ref[j];
              results.push("(" + i.prop + ": " + i.value + ")");
            }
            return results;
          }).call(_this);
          if (stringed.length === 1) {
            return stringed[0];
          } else {
            return '(' + stringed.join(' or ') + ')';
          }
        };
      })(this));
    };

    return Supports;

  })();

  module.exports = Supports;

}).call(this);

},{"./prefixes":45,"./utils":50,"./value":51,"postcss":104,"postcss/lib/list":99}],50:[function(require,module,exports){
(function() {
  var list;

  list = require('postcss/lib/list');

  module.exports = {
    error: function(text) {
      var err;
      err = new Error(text);
      err.autoprefixer = true;
      throw err;
    },
    uniq: function(array) {
      var filtered, i, j, len;
      filtered = [];
      for (j = 0, len = array.length; j < len; j++) {
        i = array[j];
        if (filtered.indexOf(i) === -1) {
          filtered.push(i);
        }
      }
      return filtered;
    },
    removeNote: function(string) {
      if (string.indexOf(' ') === -1) {
        return string;
      } else {
        return string.split(' ')[0];
      }
    },
    escapeRegexp: function(string) {
      return string.replace(/[.?*+\^\$\[\]\\(){}|\-]/g, '\\$&');
    },
    regexp: function(word, escape) {
      if (escape == null) {
        escape = true;
      }
      if (escape) {
        word = this.escapeRegexp(word);
      }
      return RegExp("(^|[\\s,(])(" + word + "($|[\\s(,]))", "gi");
    },
    editList: function(value, callback) {
      var changed, join, origin;
      origin = list.comma(value);
      changed = callback(origin, []);
      if (origin === changed) {
        return value;
      } else {
        join = value.match(/,\s*/);
        join = join ? join[0] : ', ';
        return changed.join(join);
      }
    }
  };

}).call(this);

},{"postcss/lib/list":99}],51:[function(require,module,exports){
(function() {
  var OldValue, Prefixer, Value, utils, vendor,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Prefixer = require('./prefixer');

  OldValue = require('./old-value');

  utils = require('./utils');

  vendor = require('postcss/lib/vendor');

  Value = (function(superClass) {
    extend(Value, superClass);

    function Value() {
      return Value.__super__.constructor.apply(this, arguments);
    }

    Value.save = function(prefixes, decl) {
      var already, cloned, prefix, prefixed, propPrefix, ref, results, rule, trimmed, value;
      ref = decl._autoprefixerValues;
      results = [];
      for (prefix in ref) {
        value = ref[prefix];
        if (value === decl.value) {
          continue;
        }
        propPrefix = vendor.prefix(decl.prop);
        if (propPrefix === prefix) {
          results.push(decl.value = value);
        } else if (propPrefix === '-pie-') {
          continue;
        } else {
          prefixed = prefixes.prefixed(decl.prop, prefix);
          rule = decl.parent;
          if (rule.every(function(i) {
            return i.prop !== prefixed;
          })) {
            trimmed = value.replace(/\s+/, ' ');
            already = rule.some(function(i) {
              return i.prop === decl.prop && i.value.replace(/\s+/, ' ') === trimmed;
            });
            if (!already) {
              if (value.indexOf('-webkit-filter') !== -1 && (decl.prop === 'transition' || decl.prop === 'trasition-property')) {
                results.push(decl.value = value);
              } else {
                cloned = this.clone(decl, {
                  value: value
                });
                results.push(decl.parent.insertBefore(decl, cloned));
              }
            } else {
              results.push(void 0);
            }
          } else {
            results.push(void 0);
          }
        }
      }
      return results;
    };

    Value.prototype.check = function(decl) {
      var value;
      value = decl.value;
      if (value.indexOf(this.name) !== -1) {
        return !!value.match(this.regexp());
      } else {
        return false;
      }
    };

    Value.prototype.regexp = function() {
      return this.regexpCache || (this.regexpCache = utils.regexp(this.name));
    };

    Value.prototype.replace = function(string, prefix) {
      return string.replace(this.regexp(), '$1' + prefix + '$2');
    };

    Value.prototype.add = function(decl, prefix) {
      var ref, value;
      decl._autoprefixerValues || (decl._autoprefixerValues = {});
      value = decl._autoprefixerValues[prefix] || ((ref = decl._value) != null ? ref.raw : void 0) || decl.value;
      value = this.replace(value, prefix);
      if (value) {
        return decl._autoprefixerValues[prefix] = value;
      }
    };

    Value.prototype.old = function(prefix) {
      return new OldValue(this.name, prefix + this.name);
    };

    return Value;

  })(Prefixer);

  module.exports = Value;

}).call(this);

},{"./old-value":43,"./prefixer":44,"./utils":50,"postcss/lib/vendor":110}],52:[function(require,module,exports){
var caniuse = require('caniuse-db/data').agents;
var path    = require('path');
var fs      = require('fs');

var uniq = function (array) {
    var filtered = [];
    for ( var i = 0; i < array.length; i++ ) {
        if ( filtered.indexOf(array[i]) == -1 ) filtered.push(array[i]);
    }
    return filtered;
};

normalizeVersion = function (data, version) {
    if ( data.versions.indexOf(version) != -1 ) {
        return version;
    } else {
        var alias = browserslist.versionAliases[data.name][version];
        if ( alias ) return alias;
    }
};

// Return array of browsers by selection queries:
//
//   browserslist('IE >= 10, IE 8') //=> ['ie 11', 'ie 10', 'ie 8']
var browserslist = function (selections, opts) {
    if ( typeof(opts) == 'undefined' ) opts = { };

    if ( typeof(selections) == 'undefined' || selections === null ) {
        var config = browserslist.readConfig(opts.path);
        if ( config === false ) {
            selections = browserslist.defaults;
        } else {
            selections = config;
        }
    }

    if ( typeof(selections) == 'string' ) {
        selections = selections.split(/,\s*/);
    }

    var result = [];

    var query, match, array, used;
    selections.forEach(function (selection) {
        if ( selection.trim() === '' ) return;
        used = false;

        for ( var i in browserslist.queries ) {
            query = browserslist.queries[i];
            match = selection.match(query.regexp);
            if ( match ) {
                array  = query.select.apply(browserslist, match.slice(1));
                result = result.concat(array);
                used   = true;
                break;
            }
        }

        if ( !used ) {
            throw 'Unknown browser query `' + selection + '`';
        }
    });

    return uniq(result).sort(function (name1, name2) {
        name1 = name1.split(' ');
        name2 = name2.split(' ');
        if ( name1[0] == name2[0] ) {
            return parseFloat(name2[1]) - parseFloat(name1[1]);
        } else {
            return name1[0].localeCompare(name2[0]);
        }
    });
};

// Will be filled by Can I Use data below
browserslist.data  = { };
browserslist.usage = {
    global: { }
};

// Default browsers query
browserslist.defaults = [
    '> 1%',
    'last 2 versions',
    'Firefox ESR',
    'Opera 12.1'
];

// What browsers will be used in `last n version` query
browserslist.major = ['safari', 'opera', 'ios_saf', 'ie_mob', 'ie',
                      'firefox', 'chrome'];

// Browser names aliases
browserslist.aliases = {
    fx:             'firefox',
    ff:             'firefox',
    ios:            'ios_saf',
    explorer:       'ie',
    blackberry:     'bb',
    explorermobile: 'ie_mob',
    operamini:      'op_mini',
    operamobile:    'op_mob',
    chromeandroid:  'and_chr',
    firefoxandroid: 'and_ff'
};

// Aliases ot work with joined versions like `ios_saf 7.0-7.1`
browserslist.versionAliases = { };

// Get browser data by alias or case insensitive name
browserslist.byName = function (name) {
    name = name.toLowerCase();
    name = browserslist.aliases[name] || name;

    var data = browserslist.data[name];
    if ( !data ) throw 'Unknown browser ' + name;
    return data;
};

// Find config, read file and parse it
browserslist.readConfig = function (from) {
    if ( from === false )   return false;
    if ( !fs.readFileSync ) return false;
    if ( typeof(from) == 'undefined' ) from = '.';

    var dirs = path.resolve(from).split(path.sep);
    var config, stat;
    while ( dirs.length ) {
        config = dirs.concat(['browserslist']).join(path.sep);

        if ( fs.existsSync(config) && fs.lstatSync(config).isFile() ) {
            return browserslist.parseConfig( fs.readFileSync(config) );
        }

        dirs.pop();
    }

    return false;
};

// Return array of queries from config content
browserslist.parseConfig = function (string) {
    return string.toString()
                 .replace(/#[^\n]*/g, '')
                 .split(/\n/)
                 .map(function (i) {
                    return i.trim();
                 })
                 .filter(function (i) {
                    return i !== '';
                 });
};

browserslist.queries = {

    lastVersions: {
        regexp: /^last (\d+) versions?$/i,
        select: function (versions) {
            var selected = [];
            browserslist.major.forEach(function (name) {
                var data  = browserslist.byName(name);
                var array = data.released.slice(-versions);

                array = array.map(function (v) {
                    return data.name + ' ' + v;
                });
                selected = selected.concat(array);
            });
            return selected;
        }
    },

    lastByBrowser: {
        regexp: /^last (\d+) (\w+) versions?$/i,
        select: function (versions, name) {
            var data = browserslist.byName(name);
            return data.released.slice(-versions).map(function (v) {
                return data.name + ' ' + v;
            });
        }
    },

    globalStatistics: {
        regexp: /^> (\d+\.?\d*)%$/,
        select: function (popularity) {
            popularity = parseFloat(popularity);
            var result = [];

            for ( var version in browserslist.usage.global ) {
                if ( browserslist.usage.global[version] > popularity ) {
                    result.push(version);
                }
            }

            return result;
        }
    },

    countryStatistics: {
        regexp: /^> (\d+\.?\d*)% in (\w\w)$/,
        select: function (popularity, country) {
            popularity = parseFloat(popularity);
            country    = country.toUpperCase();
            var result = [];

            var usage = browserslist.usage[country];
            if ( !usage ) {
                usage = { };
                var data = require('caniuse-db/region-usage-json/' + country);
                for ( var i in data.data ) {
                    fillUsage(usage, i, data.data[i]);
                }
                browserslist.usage[country] = usage;
            }

            for ( var version in usage ) {
                if ( usage[version] > popularity ) {
                    result.push(version);
                }
            }

            return result;
        }
    },

    versions: {
        regexp: /^(\w+) (>=?|<=?)\s*([\d\.]+)/,
        select: function (name, sign, version) {
            var data = browserslist.byName(name);
            version  = parseFloat(version);

            var filter;
            if ( sign == '>' ) {
                filter = function (v) {
                    return parseFloat(v) > version;
                };
            } else if ( sign == '>=' ) {
                filter = function (v) {
                    return parseFloat(v) >= version;
                };
            } else if ( sign == '<' ) {
                filter = function (v) {
                    return parseFloat(v) < version;
                };
            } else if ( sign == '<=' ) {
                filter = function (v) {
                    return parseFloat(v) <= version;
                };
            }

            return data.released.filter(filter).map(function (v) {
                return data.name + ' ' + v;
            });
        }
    },

    esr: {
        regexp: /^(firefox|ff|fx) esr$/i,
        select: function (versions) {
            return ['firefox 31'];
        }
    },

    direct: {
        regexp: /^(\w+) ([\d\.]+)$/,
        select: function (name, version) {
            var data  = browserslist.byName(name);
            var alias = normalizeVersion(data, version);
            if ( alias ) {
                version = alias;
            } else {
                if ( version.indexOf('.') == -1 ) {
                    alias = version + '.0';
                } else if ( /\.0$/.test(version) ) {
                    alias = version.replace(/\.0$/, '');
                }
                alias = normalizeVersion(data, alias);
                if ( alias ) {
                    version = alias;
                } else {
                    throw 'Unknown version ' + version + ' of ' + name;
                }
            }

            return [data.name + ' ' + version];
        }
    }

};

// Get and convert Can I Use data

var normalize = function (versions) {
    return versions.filter(function (version) {
        return typeof(version) == 'string';
    });
};

var fillUsage = function (result, name, data) {
    for ( var i in data ) {
        result[name + ' ' + i] = data[i];
    }
};

for ( var name in caniuse ) {
    browserslist.data[name] = {
        name:     name,
        versions: normalize(caniuse[name].versions),
        released: normalize(caniuse[name].versions.slice(0, -3))
    };
    fillUsage(browserslist.usage.global, name, caniuse[name].usage_global);

    browserslist.versionAliases[name] = { };
    for ( var i = 0; i < caniuse[name].versions.length; i++ ) {
        if ( !caniuse[name].versions[i] ) continue;
        var full = caniuse[name].versions[i];

        if ( full.indexOf('-') != -1 ) {
            var interval = full.split('-');
            for ( var j = 0; j < interval.length; j++ ) {
                browserslist.versionAliases[name][ interval[j] ] = full;
            }
        }
    }
}

module.exports = browserslist;

},{"caniuse-db/data":53,"fs":127,"path":132}],53:[function(require,module,exports){
},{}],54:[function(require,module,exports){
module.exports={
  "title":"CSS3 Background-image options",
  "description":"New properties to affect background images, including background-clip, background-origin and background-size",
  "spec":"http://www.w3.org/TR/css3-background/#backgrounds",
  "status":"cr",
  "links":[
    {
      "url":"http://www.standardista.com/css3/css3-background-properties",
      "title":"Detailed compatibility tables and demos"
    },
    {
      "url":"http://www.css3files.com/background/",
      "title":"Information page"
    },
    {
      "url":"https://github.com/louisremi/background-size-polyfill",
      "title":"Polyfill for IE7-8"
    }
  ],
  "bugs":[
    {
      "description":"iOS Safari has buggy behavior with `background-size: cover;` on a page's body."
    },
    {
      "description":"iOS Safari has buggy behavior with `background-size: cover;` + `background-attachment: fixed;`"
    },
    {
      "description":"Safari (OS X and iOS) and Chrome do not support background-size: 100% <height>px; in combination with SVG images, it leaves them at the original size while other browsers stretch the vector image correctly while leaving the height at the specified number of pixels."
    },
    {
      "description":"Android 4.3 browser and below are reported to not support percentages in `background-size`"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"y",
      "10":"y",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"a x",
      "4":"y",
      "5":"y",
      "6":"y",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"a #3",
      "5":"a #3",
      "6":"a #3",
      "7":"a #3",
      "8":"a #3",
      "9":"a #3",
      "10":"a #3",
      "11":"a #3",
      "12":"a #3",
      "13":"a #3",
      "14":"a #3",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"a #2 #3",
      "3.2":"a #2 #3",
      "4":"a #2 #3",
      "5":"a #2 #3",
      "5.1":"a #2 #3",
      "6":"a #2 #3",
      "6.1":"a #2 #3",
      "7":"y",
      "7.1":"y",
      "8":"y",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"a x",
      "10.5":"y",
      "10.6":"y",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "11.6":"y",
      "12":"y",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"a",
      "4.0-4.1":"a",
      "4.2-4.3":"a",
      "5.0-5.1":"a #3",
      "6.0-6.1":"a",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.4":"y",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"a #1"
    },
    "android":{
      "2.1":"a x",
      "2.2":"a x #3",
      "2.3":"a x #3",
      "3":"a #3",
      "4":"a #3",
      "4.1":"a #3",
      "4.2-4.3":"a #3",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "50":"y"
    },
    "bb":{
      "7":"y",
      "10":"y"
    },
    "op_mob":{
      "10":"y",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "12":"y",
      "12.1":"y",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y"
    }
  },
  "notes":"Safari also supports the unofficial `-webkit-background-clip: text` (only with prefix)",
  "notes_by_num":{
    "1":"Partial support in Opera Mini refers to not supporting background sizing or background attachments. However Opera Mini 7.5 supports background sizing (including cover and contain values).",
    "2":"Partial support in Safari 6 refers to not supporting background sizing offset from edges syntax.",
    "3":"Does not support `background-size` values in the `background` shorthand"
  },
  "usage_perc_y":87.82,
  "usage_perc_a":6.74,
  "ucprefix":false,
  "parent":"",
  "keywords":"",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],55:[function(require,module,exports){
module.exports={
  "title":"CSS3 Border images",
  "description":"Method of using images for borders",
  "spec":"http://www.w3.org/TR/css3-background/#the-border-image",
  "status":"cr",
  "links":[
    {
      "url":"http://www.css3files.com/border/",
      "title":"Information page"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/border-image",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"Firefox is not able to stretch svg images across an element - [bug report](https://bugzilla.mozilla.org/show_bug.cgi?id=619500)."
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"a x",
      "3.6":"a x",
      "4":"a x",
      "5":"a x",
      "6":"a x",
      "7":"a x",
      "8":"a x",
      "9":"a x",
      "10":"a x",
      "11":"a x",
      "12":"a x",
      "13":"a x",
      "14":"a x",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"a x",
      "5":"a x",
      "6":"a x",
      "7":"a x",
      "8":"a x",
      "9":"a x",
      "10":"a x",
      "11":"a x",
      "12":"a x",
      "13":"a x",
      "14":"a x",
      "15":"y x",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"a x",
      "3.2":"a x",
      "4":"a x",
      "5":"a x",
      "5.1":"a x",
      "6":"y",
      "6.1":"y",
      "7":"y",
      "7.1":"y",
      "8":"y",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"a",
      "10.6":"a",
      "11":"a x",
      "11.1":"a x",
      "11.5":"a x",
      "11.6":"a x",
      "12":"a x",
      "12.1":"a x",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"a x",
      "4.0-4.1":"a x",
      "4.2-4.3":"a x",
      "5.0-5.1":"a x",
      "6.0-6.1":"y",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.4":"y",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"a x"
    },
    "android":{
      "2.1":"a x",
      "2.2":"a x",
      "2.3":"a x",
      "3":"a x",
      "4":"a x",
      "4.1":"a x",
      "4.2-4.3":"a x",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "50":"y"
    },
    "bb":{
      "7":"a x",
      "10":"y"
    },
    "op_mob":{
      "10":"n",
      "11":"a x",
      "11.1":"a x",
      "11.5":"a x",
      "12":"a x",
      "12.1":"a x",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"n",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y"
    }
  },
  "notes":"Note that both the `border-style` and `border-width` must be specified (not set to `none` or 0) for border-images to work according to spec, though older implementations may not have this requirement. Partial support refers to supporting the shorthand syntax, but not the individual properties (border-image-source, border-image-slice, etc). ",
  "notes_by_num":{
    
  },
  "usage_perc_y":86.19,
  "usage_perc_a":7.02,
  "ucprefix":false,
  "parent":"",
  "keywords":"",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],56:[function(require,module,exports){
module.exports={
  "title":"CSS3 Border-radius (rounded corners)",
  "description":"Method of making the border corners round. Covers support for the shorthand `border-radius` as well as the long-hand properties (e.g. `border-top-left-radius`)",
  "spec":"http://www.w3.org/TR/css3-background/#the-border-radius",
  "status":"cr",
  "links":[
    {
      "url":"http://border-radius.com",
      "title":"Border-radius CSS Generator"
    },
    {
      "url":"http://muddledramblings.com/table-of-css3-border-radius-compliance",
      "title":"Detailed compliance table"
    },
    {
      "url":"http://www.css3files.com/border/#borderradius",
      "title":"Information page"
    },
    {
      "url":"http://css3pie.com/",
      "title":"Polyfill which includes border-radius"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/border-radius",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"Safari does not apply `border-radius` correctly to image borders: http://stackoverflow.com/q/17202128"
    },
    {
      "description":"Android Browser 2.3 does not support % value for `border-radius`."
    },
    {
      "description":"Border-radius does not work on fieldset elements in IE9."
    },
    {
      "description":"The stock browser on the Samsung Galaxy S4 with Android 4.2 does not support the `border-radius` shorthand property but does support the long-hand properties for each corner like `border-top-left-radius`."
    },
    {
      "description":"Older versions of Safari [had a bug](https://bugs.webkit.org/show_bug.cgi?id=50072) where background images would bleed out of the border-radius."
    },
    {
      "description":"Dotted and dashed rounded border corners are rendered as solid in Firefox. [see bug](https://bugzilla.mozilla.org/show_bug.cgi?id=382721)"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"y",
      "10":"y",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"a x",
      "3":"y x",
      "3.5":"y x",
      "3.6":"y x",
      "4":"y",
      "5":"y",
      "6":"y",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"y x",
      "5":"y",
      "6":"y",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"y x",
      "3.2":"y x",
      "4":"y x",
      "5":"y",
      "5.1":"y #1",
      "6":"y #1",
      "6.1":"y #1",
      "7":"y",
      "7.1":"y",
      "8":"y",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"y",
      "10.6":"y",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "11.6":"y",
      "12":"y",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"y x",
      "4.0-4.1":"y",
      "4.2-4.3":"y",
      "5.0-5.1":"y",
      "6.0-6.1":"y",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.4":"y",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"y x",
      "2.2":"y",
      "2.3":"y",
      "3":"y",
      "4":"y",
      "4.1":"y",
      "4.2-4.3":"y",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "50":"y"
    },
    "bb":{
      "7":"y",
      "10":"y"
    },
    "op_mob":{
      "10":"n",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "12":"y",
      "12.1":"y",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Safari 6.1 and earlier did not apply `border-radius` correctly to image borders: http://stackoverflow.com/q/17202128"
  },
  "usage_perc_y":89.56,
  "usage_perc_a":0.01,
  "ucprefix":false,
  "parent":"",
  "keywords":"roundedcorners, border radius,-moz-border-radius",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],57:[function(require,module,exports){
module.exports={
  "title":"calc() as CSS unit value",
  "description":"Method of allowing calculated values for length units, i.e. `width: calc(100% - 3em)`",
  "spec":"http://www.w3.org/TR/css3-values/#calc",
  "status":"cr",
  "links":[
    {
      "url":"http://hacks.mozilla.org/2010/06/css3-calc/",
      "title":"Mozilla Hacks article"
    },
    {
      "url":"https://developer.mozilla.org/en/docs/Web/CSS/calc",
      "title":"MDN article"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/functions/calc",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"IE10 crashes when a div with a property using `calc()` has a child with [same property with inherit](http://stackoverflow.com/questions/19423384/css-less-calc-method-is-crashing-my-ie10)."
    },
    {
      "description":"IE 9 - 11 don't render `box-shadow` when `calc()` is used for any of the values"
    },
    {
      "description":"IE10 and IE11 don't support using `calc()` inside a `transform`. [Bug report](https://connect.microsoft.com/IE/feedback/details/814380/)"
    },
    {
      "description":"Safari & iOS Safari (both 6 and 7) does not support viewport units (`vw`, `vh`, etc) in `calc()`."
    },
    {
      "description":"IE & Edge are reported to not support calc inside a 'flex'. (Not tested on older versions)\r\nThis example does not work: `flex: 1 1 calc(50% - 20px);`"
    },
    {
      "description":"Firefox does not support `calc()` inside the `line-height`, `stroke-width`, `stroke-dashoffset`, and `stroke-dasharray` properties. [Bug report](https://bugzilla.mozilla.org/show_bug.cgi?id=594933)"
    },
    {
      "description":"IE11 is reported to have trouble with `calc()` with nested expressions, e.g. `width: calc((100% - 10px) / 3);` (i.e. it rounds differently)"
    },
    {
      "description":"IE11 is reported to not support `calc()` correctly in [generated content](http://stackoverflow.com/questions/31323915/internet-explorer-incorrectly-calculates-percentage-height-for-generated-content)"
    },
    {
      "description":"IE11 does not support transitioning values set with `calc()`"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"a #2",
      "10":"y",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"y x",
      "6.1":"y",
      "7":"y",
      "7.1":"y",
      "8":"y",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"y x",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.4":"y",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"a #1",
      "4.4.3-4.4.4":"a #1",
      "50":"y"
    },
    "bb":{
      "7":"n",
      "10":"y"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"Support can be somewhat emulated in older versions of IE using the non-standard `expression()` syntax.\r\n\r\nDue to the way browsers handle [sub-pixel rounding](http://ejohn.org/blog/sub-pixel-problems-in-css/) differently, layouts using `calc()` expressions may have unexpected results.",
  "notes_by_num":{
    "1":"Partial support in Android Browser 4.4 refers to the browser lacking the ability to multiply and divide values.",
    "2":"Partial support in IE9 refers to the browser crashing when used as a `background-position` value."
  },
  "usage_perc_y":75.36,
  "usage_perc_a":3.14,
  "ucprefix":false,
  "parent":"",
  "keywords":"",
  "ie_id":"csscalc",
  "chrome_id":"5765241438732288",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],58:[function(require,module,exports){
module.exports={
  "title":"CSS Animation",
  "description":"Complex method of animating certain properties of an element",
  "spec":"http://www.w3.org/TR/css3-animations/",
  "status":"wd",
  "links":[
    {
      "url":"http://robertnyman.com/2010/05/06/css3-animations/",
      "title":"Blog post on usage"
    },
    {
      "url":"http://www.css3files.com/animation/",
      "title":"Information page"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/animations",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"'animation-fill-mode' property is not supported in Android browser below 2.3."
    },
    {
      "description":"iOS 6.1 and below do not support animation on pseudo-elements. iOS 7 and higher are reported to have buggy behavior with animating pseudo-elements."
    },
    {
      "description":"@keyframes not supported in an inline or scoped stylesheet in Firefox (bug 830056)"
    },
    {
      "description":"In Chrome `animation-fill-mode backwards` is wrong if `steps(x, start)` is used [see example](http://codepen.io/Fyrd/pen/jPPKpX)."
    },
    {
      "description":"IE10 and IE11 do not support CSS animations inside media queries."
    },
    {
      "description":"IE10 and IE11 on Windows 7 have a bug where translate transform values are always interpreted as pixels when used in animations [test case](http://codepen.io/flxsource/pen/jPYWoE)"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"y",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x",
      "41":"y x",
      "42":"y x",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"y x",
      "5":"y x",
      "5.1":"y x",
      "6":"y x",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"y x",
      "12.1":"y",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"y x",
      "4.0-4.1":"y x",
      "4.2-4.3":"y x",
      "5.0-5.1":"y x",
      "6.0-6.1":"y x",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.4":"y x",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"a x #1",
      "2.2":"a x #1",
      "2.3":"a x #1",
      "3":"a x #1",
      "4":"y x",
      "4.1":"y x",
      "4.2-4.3":"y x",
      "4.4":"y x",
      "4.4.3-4.4.4":"y x",
      "50":"y"
    },
    "bb":{
      "7":"y x",
      "10":"y x"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"y",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Partial support in Android browser refers to buggy behavior in different scenarios."
  },
  "usage_perc_y":88.88,
  "usage_perc_a":0.02,
  "ucprefix":false,
  "parent":"",
  "keywords":"animations,css-animations,animation-name,animation-duration,animation-delay,animation-timing-function,@keyframes,animationstart,animationend,animationiteration,css3 animation",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],59:[function(require,module,exports){
module.exports={
  "title":"CSS box-decoration-break",
  "description":"Controls whether the box's margins, borders, padding, and other decorations wrap the broken edges of the box fragments (when the box is split by a break (page/column/region/line).",
  "spec":"http://www.w3.org/TR/css3-break/#break-decoration",
  "status":"wd",
  "links":[
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break",
      "title":"MDN article"
    },
    {
      "url":"http://jsbin.com/xojoro/edit?css,output",
      "title":"Demo of effect on box border"
    },
    {
      "url":"https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6514472-box-decoration-break",
      "title":"Microsoft Edge feature request on UserVoice"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n"
    },
    "edge":{
      "12":"n",
      "13":"n",
      "14":"u"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"a x #1",
      "23":"a x #1",
      "24":"a x #1",
      "25":"a x #1",
      "26":"a x #1",
      "27":"a x #1",
      "28":"a x #1",
      "29":"a x #1",
      "30":"a x #1",
      "31":"a x #1",
      "32":"a x #1",
      "33":"a x #1",
      "34":"a x #1",
      "35":"a x #1",
      "36":"a x #1",
      "37":"a x #1",
      "38":"a x #1",
      "39":"a x #1",
      "40":"a x #1",
      "41":"a x #1",
      "42":"a x #1",
      "43":"a x #1",
      "44":"a x #1",
      "45":"a x #1",
      "46":"a x #1",
      "47":"a x #1",
      "48":"a x #1",
      "49":"a x #1",
      "50":"a x #1",
      "51":"a x #1",
      "52":"a x #1",
      "53":"a x #1"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"a x #1",
      "7":"a x #1",
      "7.1":"a x #1",
      "8":"a x #1",
      "9":"a x #1",
      "9.1":"a x #1",
      "TP":"a x #1"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"y #1",
      "11.1":"y #1",
      "11.5":"y #1",
      "11.6":"y #1",
      "12":"y #1",
      "12.1":"y #1",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"a x #1",
      "22":"a x #1",
      "23":"a x #1",
      "24":"a x #1",
      "25":"a x #1",
      "26":"a x #1",
      "27":"a x #1",
      "28":"a x #1",
      "29":"a x #1",
      "30":"a x #1",
      "31":"a x #1",
      "32":"a x #1",
      "33":"a x #1",
      "34":"a x #1",
      "35":"a x #1",
      "36":"a x #1",
      "37":"a x #1",
      "38":"a x #1",
      "39":"a x #1"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"a x #1",
      "8":"a x #1",
      "8.1-8.4":"a x #1",
      "9.0-9.2":"a x #1",
      "9.3":"a x #1"
    },
    "op_mini":{
      "5.0-8.0":"a #1"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"a x #1",
      "4.4.3-4.4.4":"a x #1",
      "50":"a x #1"
    },
    "bb":{
      "7":"n",
      "10":"a x #1"
    },
    "op_mob":{
      "10":"n",
      "11":"y #1",
      "11.1":"y #1",
      "11.5":"y #1",
      "12":"y #1",
      "12.1":"y #1",
      "36":"a x #1"
    },
    "and_chr":{
      "50":"a x #1"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Partial support refers to working for inline elements but not across column or page breaks."
  },
  "usage_perc_y":7.88,
  "usage_perc_a":66.75,
  "ucprefix":false,
  "parent":"",
  "keywords":"box-decoration,box decoration,break",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],60:[function(require,module,exports){
module.exports={
  "title":"CSS3 Box-shadow",
  "description":"Method of displaying an inner or outer shadow effect to elements",
  "spec":"http://www.w3.org/TR/css3-background/#box-shadow",
  "status":"cr",
  "links":[
    {
      "url":"https://developer.mozilla.org/En/CSS/-moz-box-shadow",
      "title":"MDN article"
    },
    {
      "url":"http://westciv.com/tools/boxshadows/index.html",
      "title":"Live editor"
    },
    {
      "url":"http://tests.themasta.com/blogstuff/boxshadowdemo.html",
      "title":"Demo of various effects"
    },
    {
      "url":"http://www.css3files.com/shadow/",
      "title":"Information page"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/box-shadow",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"Edge and IE up to 11 suppress box-shadow in tables with border-collapse:collapse. [test case](http://codepen.io/Fyrd/pen/oXVYyq)"
    },
    {
      "description":"Safari 6, iOS 6 and Android 2.3 default browser don't work with a 0px value for \"blur-radius\".\r\ne.g. `-webkit-box-shadow: 5px 1px 0px 1px #f04e29;`\r\ndoesn't work, but\r\n`-webkit-box-shadow: 5px 1px 1px 1px #f04e29`\r\ndoes."
    },
    {
      "description":"iOS 8 has a bug where the box shadow disappears when zooming in a certain amount. [test case](http://jsfiddle.net/b6aaq57z/4/)"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"y",
      "10":"y",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"y x",
      "3.6":"y x",
      "4":"y",
      "5":"y",
      "6":"y",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"a x #1",
      "3.2":"a x #1",
      "4":"a x #1",
      "5":"y x",
      "5.1":"y",
      "6":"y",
      "6.1":"y",
      "7":"y",
      "7.1":"y",
      "8":"y",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"y",
      "10.6":"y",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "11.6":"y",
      "12":"y",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"a x #1",
      "4.0-4.1":"y x",
      "4.2-4.3":"y x",
      "5.0-5.1":"y",
      "6.0-6.1":"y",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.4":"y",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"a x #1",
      "2.2":"a x #1",
      "2.3":"a x #1",
      "3":"a x #1",
      "4":"y",
      "4.1":"y",
      "4.2-4.3":"y",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "50":"y"
    },
    "bb":{
      "7":"y x",
      "10":"y"
    },
    "op_mob":{
      "10":"n",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "12":"y",
      "12.1":"y",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y"
    }
  },
  "notes":"Can be partially emulated in older IE versions using the non-standard \"shadow\" filter.",
  "notes_by_num":{
    "1":"Partial support in Safari, iOS Safari and Android Browser refers to missing \"inset\", blur radius value, and multiple shadow support."
  },
  "usage_perc_y":89.47,
  "usage_perc_a":0.05,
  "ucprefix":false,
  "parent":"",
  "keywords":"box-shadows,boxshadows,box shadow,shaow",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],61:[function(require,module,exports){
module.exports={
  "title":"Crisp edges/pixelated images",
  "description":"Scales images with an algorithm that preserves edges and contrast, without smoothing colors or introducing blur. This is intended for images such as pixel art. Official values that accomplish this for the `image-rendering` property are `crisp-edges` and `pixelated`.",
  "spec":"http://dev.w3.org/csswg/css-images-3/#valdef-image-rendering-crisp-edges",
  "status":"unoff",
  "links":[
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering",
      "title":"MDN article"
    },
    {
      "url":"http://updates.html5rocks.com/2015/01/pixelated",
      "title":"HTML5Rocks article"
    }
  ],
  "bugs":[
    {
      "description":"`image-rendering:-webkit-optimize-contrast;` and `-ms-interpolation-mode:nearest-neighbor` do not affect CSS images."
    }
  ],
  "categories":[
    "CSS",
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"a x #2",
      "8":"a x #2",
      "9":"a x #2",
      "10":"a x #2",
      "11":"a x #2"
    },
    "edge":{
      "12":"n",
      "13":"n",
      "14":"u"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"y x #3",
      "4":"y x #3",
      "5":"y x #3",
      "6":"y x #3",
      "7":"y x #3",
      "8":"y x #3",
      "9":"y x #3",
      "10":"y x #3",
      "11":"y x #3",
      "12":"y x #3",
      "13":"y x #3",
      "14":"y x #3",
      "15":"y x #3",
      "16":"y x #3",
      "17":"y x #3",
      "18":"y x #3",
      "19":"y x #3",
      "20":"y x #3",
      "21":"y x #3",
      "22":"y x #3",
      "23":"y x #3",
      "24":"y x #3",
      "25":"y x #3",
      "26":"y x #3",
      "27":"y x #3",
      "28":"y x #3",
      "29":"y x #3",
      "30":"y x #3",
      "31":"y x #3",
      "32":"y x #3",
      "33":"y x #3",
      "34":"y x #3",
      "35":"y x #3",
      "36":"y x #3",
      "37":"y x #3",
      "38":"y x #3",
      "39":"y x #3",
      "40":"y x #3",
      "41":"y x #3",
      "42":"y x #3",
      "43":"y x #3",
      "44":"y x #3",
      "45":"y x #3",
      "46":"y x #3",
      "47":"y x #3",
      "48":"y x #3",
      "49":"y x #3"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n",
      "41":"y #4",
      "42":"y #4",
      "43":"y #4",
      "44":"y #4",
      "45":"y #4",
      "46":"y #4",
      "47":"y #4",
      "48":"y #4",
      "49":"y #4",
      "50":"y #4",
      "51":"y #4",
      "52":"y #4",
      "53":"y #4"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"a x #1",
      "6.1":"y x #3",
      "7":"y x #3",
      "7.1":"y x #3",
      "8":"y x #3",
      "9":"y x #3",
      "9.1":"y x #3",
      "TP":"y x #3"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"y x #3",
      "12":"y x #3",
      "12.1":"y x #3",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"y #4",
      "29":"y #4",
      "30":"y #4",
      "31":"y #4",
      "32":"y #4",
      "33":"y #4",
      "34":"y #4",
      "35":"y #4",
      "36":"y #4",
      "37":"y #4",
      "38":"y #4",
      "39":"y #4"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"a x #1",
      "6.0-6.1":"a x #1",
      "7.0-7.1":"y x #3",
      "8":"y x #3",
      "8.1-8.4":"y x #3",
      "9.0-9.2":"y x #3",
      "9.3":"y x #3"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "50":"y #4"
    },
    "bb":{
      "7":"n",
      "10":"a x #1"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"y x #3",
      "12.1":"y x #3",
      "36":"y #4"
    },
    "and_chr":{
      "50":"y #4"
    },
    "and_ff":{
      "46":"y x #3"
    },
    "ie_mob":{
      "10":"a x #2",
      "11":"a x #2"
    },
    "and_uc":{
      "9.9":"a x #1"
    }
  },
  "notes":"Note that prefixes apply to the value (e.g. `-moz-crisp-edges`), not the `image-rendering` property.",
  "notes_by_num":{
    "1":"Supported using the non-standard value `-webkit-optimize-contrast`",
    "2":"Internet Explorer accomplishes support using the non-standard declaration `-ms-interpolation-mode: nearest-neighbor`",
    "3":"Supports the `crisp-edges` value, but not `pixelated`.",
    "4":"Supports the `pixelated` value, but not `crisp-edges`."
  },
  "usage_perc_y":65.72,
  "usage_perc_a":17.18,
  "ucprefix":false,
  "parent":"",
  "keywords":"image-rendering,crisp-edges",
  "ie_id":"",
  "chrome_id":"5118058116939776",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],62:[function(require,module,exports){
module.exports={
  "title":"CSS Device Adaptation",
  "description":"A standard way to override the size of viewport in web page using the `@viewport` rule, standardizing and replacing Apple's own popular `<meta>` viewport implementation.",
  "spec":"http://www.w3.org/TR/css-device-adapt/",
  "status":"wd",
  "links":[
    {
      "url":"https://dev.opera.com/articles/view/an-introduction-to-meta-viewport-and-viewport/",
      "title":"Introduction to meta viewport and @viewport in Opera Mobile"
    },
    {
      "url":"http://msdn.microsoft.com/en-us/library/ie/hh708740(v=vs.85).aspx",
      "title":"Device adaptation in Internet Explorer 10"
    },
    {
      "url":"https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6777420-unprefix-and-support-all-viewport-properties",
      "title":"Microsoft Edge feature request on UserVoice"
    },
    {
      "url":"https://code.google.com/p/chromium/issues/detail?id=155477",
      "title":"Chrome tracking bug"
    },
    {
      "url":"https://bugs.webkit.org/show_bug.cgi?id=95959",
      "title":"WebKit tracking bug"
    },
    {
      "url":"https://bugzilla.mozilla.org/show_bug.cgi?id=747754",
      "title":"Mozilla tracking bug"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"a x #1",
      "11":"a x #1"
    },
    "edge":{
      "12":"a x #1",
      "13":"a x #1",
      "14":"a x #1"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n",
      "41":"n",
      "42":"n",
      "43":"n",
      "44":"n",
      "45":"n",
      "46":"n",
      "47":"n",
      "48":"n",
      "49":"n"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n d",
      "30":"n d",
      "31":"n d",
      "32":"n d",
      "33":"n d",
      "34":"n d",
      "35":"n d",
      "36":"n d",
      "37":"n d",
      "38":"n d",
      "39":"n d",
      "40":"n d",
      "41":"n d",
      "42":"n d",
      "43":"n d",
      "44":"n d",
      "45":"n d",
      "46":"n d",
      "47":"n d",
      "48":"n d",
      "49":"n d",
      "50":"n d",
      "51":"n d",
      "52":"n d",
      "53":"n d"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"n",
      "7":"n",
      "7.1":"n",
      "8":"n",
      "9":"n",
      "9.1":"n",
      "TP":"n"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"n",
      "8":"n",
      "8.1-8.4":"n",
      "9.0-9.2":"n",
      "9.3":"n"
    },
    "op_mini":{
      "5.0-8.0":"a x #2"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "50":"n"
    },
    "bb":{
      "7":"n",
      "10":"n"
    },
    "op_mob":{
      "10":"n",
      "11":"a x #2",
      "11.1":"a x #2",
      "11.5":"a x #2",
      "12":"a x #2",
      "12.1":"a x #2",
      "36":"n"
    },
    "and_chr":{
      "50":"n"
    },
    "and_ff":{
      "46":"n"
    },
    "ie_mob":{
      "10":"a x #1",
      "11":"a x #1"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"IE only supports the 'width' and 'height' properties.",
    "2":"Opera Mobile and Opera Mini only support the 'orientation' property."
  },
  "usage_perc_y":0,
  "usage_perc_a":12.94,
  "ucprefix":false,
  "parent":"",
  "keywords":"viewport",
  "ie_id":"",
  "chrome_id":"4737164243894272",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],63:[function(require,module,exports){
module.exports={
  "title":"CSS Filter Effects",
  "description":"Method of applying filter effects (like blur, grayscale, brightness, contrast and hue) to elements, previously only possible by using SVG.",
  "spec":"http://www.w3.org/TR/filter-effects-1/",
  "status":"wd",
  "links":[
    {
      "url":"http://html5-demos.appspot.com/static/css/filters/index.html",
      "title":"Demo file for WebKit browsers"
    },
    {
      "url":"http://www.html5rocks.com/en/tutorials/filters/understanding-css/",
      "title":"HTML5Rocks article"
    },
    {
      "url":"http://dl.dropbox.com/u/3260327/angular/CSS3ImageManipulation.html",
      "title":"Filter editor"
    },
    {
      "url":"http://bennettfeely.com/filters/",
      "title":"Filter Playground"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS",
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n"
    },
    "edge":{
      "12":"n d #2 #4",
      "13":"a #4",
      "14":"a #4"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"a #3",
      "4":"a #3",
      "5":"a #3",
      "6":"a #3",
      "7":"a #3",
      "8":"a #3",
      "9":"a #3",
      "10":"a #3",
      "11":"a #3",
      "12":"a #3",
      "13":"a #3",
      "14":"a #3",
      "15":"a #3",
      "16":"a #3",
      "17":"a #3",
      "18":"a #3",
      "19":"a #3",
      "20":"a #3",
      "21":"a #3",
      "22":"a #3",
      "23":"a #3",
      "24":"a #3",
      "25":"a #3",
      "26":"a #3",
      "27":"a #3",
      "28":"a #3",
      "29":"a #3",
      "30":"a #3",
      "31":"a #3",
      "32":"a #3",
      "33":"a #3",
      "34":"a d #1",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x",
      "41":"y x",
      "42":"y x",
      "43":"y x",
      "44":"y x",
      "45":"y x",
      "46":"y x",
      "47":"y x",
      "48":"y x",
      "49":"y x",
      "50":"y x",
      "51":"y x",
      "52":"y x",
      "53":"y x"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"y x",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x",
      "9":"y x",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"y x",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.4":"y x",
      "9.0-9.2":"y x",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"y x",
      "4.4.3-4.4.4":"y x",
      "50":"y x"
    },
    "bb":{
      "7":"n",
      "10":"y x"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"y x"
    },
    "and_chr":{
      "50":"y x"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"Note that this property is significantly different from and incompatible with Microsoft's [older \"filter\" property](http://msdn.microsoft.com/en-us/library/ie/ms530752%28v=vs.85%29.aspx).",
  "notes_by_num":{
    "1":"Supported in Firefox under the `layout.css.filters.enabled` flag.",
    "2":"Supported in MS Edge under the \"Enable CSS filter property\" flag.",
    "3":"Partial support in Firefox before version 34 [only implemented the url() function of the filter property](https://developer.mozilla.org/en-US/docs/Web/CSS/filter#Browser_compatibility)",
    "4":"Partial support refers to supporting filter functions, but not the `url` function."
  },
  "usage_perc_y":78.57,
  "usage_perc_a":1.82,
  "ucprefix":false,
  "parent":"",
  "keywords":"sepia,hue-rotate,invert,saturate,filter:blur",
  "ie_id":"filters",
  "chrome_id":"5822463824887808",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],64:[function(require,module,exports){
module.exports={
  "title":"CSS Gradients",
  "description":"Method of defining a linear or radial color gradient as a CSS image.",
  "spec":"http://www.w3.org/TR/css3-images/",
  "status":"cr",
  "links":[
    {
      "url":"http://www.colorzilla.com/gradient-editor/",
      "title":"Cross-browser editor"
    },
    {
      "url":"http://www.css3files.com/gradient/",
      "title":"Information page"
    },
    {
      "url":"http://css3pie.com/",
      "title":"Tool to emulate support in IE"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/functions/linear-gradient",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"y",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"y x",
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"a x",
      "5":"a x",
      "6":"a x",
      "7":"a x",
      "8":"a x",
      "9":"a x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"a x",
      "5":"a x",
      "5.1":"y x",
      "6":"y x",
      "6.1":"y",
      "7":"y",
      "7.1":"y",
      "8":"y",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"a x #1",
      "11.5":"a x #1",
      "11.6":"y x",
      "12":"y x",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"a x",
      "4.0-4.1":"a x",
      "4.2-4.3":"a x",
      "5.0-5.1":"y x",
      "6.0-6.1":"y x",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.4":"y",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"a x",
      "2.2":"a x",
      "2.3":"a x",
      "3":"a x",
      "4":"y x",
      "4.1":"y x",
      "4.2-4.3":"y x",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "50":"y"
    },
    "bb":{
      "7":"a x",
      "10":"y"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"a x #1",
      "11.5":"a x #1",
      "12":"y x",
      "12.1":"y",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"Syntax used by browsers with prefixed support may be incompatible with that for proper support.\r\n\r\nSupport can be somewhat emulated in older IE versions using the non-standard \"gradient\" filter. \r\n\r\nFirefox 10+, Opera 11.6+, Chrome 26+ and IE10+ also support the new \"to (side)\" syntax.",
  "notes_by_num":{
    "1":"Partial support in Opera 11.10 and 11.50 also refers to only having support for linear gradients."
  },
  "usage_perc_y":88.73,
  "usage_perc_a":0.23,
  "ucprefix":false,
  "parent":"",
  "keywords":"linear,linear-gradient,gradiant",
  "ie_id":"gradients",
  "chrome_id":"5785905063264256",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],65:[function(require,module,exports){
module.exports={
  "title":"CSS Hyphenation",
  "description":"Method of controlling when words at the end of lines should be hyphenated using the \"hyphens\" property.",
  "spec":"http://www.w3.org/TR/css3-text/#hyphenation",
  "status":"wd",
  "links":[
    {
      "url":"https://developer.mozilla.org/en/CSS/hyphens",
      "title":"MDN article"
    },
    {
      "url":"http://blog.fontdeck.com/post/9037028497/hyphens",
      "title":"Blog post"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/hyphens",
      "title":"WebPlatform Docs"
    },
    {
      "url":"https://code.google.com/p/chromium/issues/detail?id=47083",
      "title":"Chrome bug for implementing hyphenation"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"y x",
      "11":"y x"
    },
    "edge":{
      "12":"y x",
      "13":"y x",
      "14":"y x"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x",
      "41":"y x",
      "42":"y x",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n",
      "41":"n",
      "42":"n",
      "43":"n",
      "44":"n",
      "45":"n",
      "46":"n",
      "47":"n",
      "48":"n",
      "49":"n",
      "50":"n",
      "51":"n",
      "52":"n",
      "53":"n"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"y x",
      "6":"y x",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x",
      "9":"y x",
      "9.1":"y x",
      "TP":"y x"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"y x",
      "5.0-5.1":"y x",
      "6.0-6.1":"y x",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.4":"y x",
      "9.0-9.2":"y x",
      "9.3":"y x"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "50":"n"
    },
    "bb":{
      "7":"n",
      "10":"n"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"n"
    },
    "and_chr":{
      "50":"n"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"a x"
    }
  },
  "notes":"Chrome and Android 4.0 Browser support \"-webkit-hyphens: none\", but not the \"auto\" property. It is [advisable to set the @lang attribute](http://blog.adrianroselli.com/2015/01/on-use-of-lang-attribute.html) on the HTML element to enable hyphenation support and improve accessibility.",
  "notes_by_num":{
    
  },
  "usage_perc_y":25.86,
  "usage_perc_a":9.17,
  "ucprefix":false,
  "parent":"",
  "keywords":"hyphen,shy",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],66:[function(require,module,exports){
module.exports={
  "title":"CSS Logical Properties",
  "description":"Use start/end properties that depend on LTR or RTL writing direction instead of left/right",
  "spec":"http://dev.w3.org/csswg/css-logical-props/",
  "status":"unoff",
  "links":[
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/-moz-margin-start",
      "title":"MDN -moz-margin-start"
    },
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/-moz-padding-start",
      "title":"MDN -moz-padding-start"
    },
    {
      "url":"https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/7438435-css-logical-properties",
      "title":"Microsoft Edge feature request on UserVoice"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS",
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n"
    },
    "edge":{
      "12":"n",
      "13":"n",
      "14":"u"
    },
    "firefox":{
      "2":"n",
      "3":"a x #1",
      "3.5":"a x #1",
      "3.6":"a x #1",
      "4":"a x #1",
      "5":"a x #1",
      "6":"a x #1",
      "7":"a x #1",
      "8":"a x #1",
      "9":"a x #1",
      "10":"a x #1",
      "11":"a x #1",
      "12":"a x #1",
      "13":"a x #1",
      "14":"a x #1",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"a x #1",
      "22":"a x #1",
      "23":"a x #1",
      "24":"a x #1",
      "25":"a x #1",
      "26":"a x #1",
      "27":"a x #1",
      "28":"a x #1",
      "29":"a x #1",
      "30":"a x #1",
      "31":"a x #1",
      "32":"a x #1",
      "33":"a x #1",
      "34":"a x #1",
      "35":"a x #1",
      "36":"a x #1",
      "37":"a x #1",
      "38":"a x #1",
      "39":"a x #1",
      "40":"a x #1",
      "41":"a x #1",
      "42":"a x #1",
      "43":"a x #1",
      "44":"a x #1",
      "45":"a x #1",
      "46":"a x #1",
      "47":"a x #1",
      "48":"a x #1",
      "49":"a x #1"
    },
    "chrome":{
      "4":"a x #2",
      "5":"a x #2",
      "6":"a x #2",
      "7":"a x #2",
      "8":"a x #2",
      "9":"a x #2",
      "10":"a x #2",
      "11":"a x #2",
      "12":"a x #2",
      "13":"a x #2",
      "14":"a x #2",
      "15":"a x #2",
      "16":"a x #2",
      "17":"a x #2",
      "18":"a x #2",
      "19":"a x #2",
      "20":"a x #2",
      "21":"a x #2",
      "22":"a x #2",
      "23":"a x #2",
      "24":"a x #2",
      "25":"a x #2",
      "26":"a x #2",
      "27":"a x #2",
      "28":"a x #2",
      "29":"a x #2",
      "30":"a x #2",
      "31":"a x #2",
      "32":"a x #2",
      "33":"a x #2",
      "34":"a x #2",
      "35":"a x #2",
      "36":"a x #2",
      "37":"a x #2",
      "38":"a x #2",
      "39":"a x #2",
      "40":"a x #2",
      "41":"a x #2",
      "42":"a x #2",
      "43":"a x #2",
      "44":"a x #2",
      "45":"a x #2",
      "46":"a x #2",
      "47":"a x #2",
      "48":"a x #2",
      "49":"a x #2",
      "50":"a x #2",
      "51":"a x #2",
      "52":"a x #2",
      "53":"a x #2"
    },
    "safari":{
      "3.1":"a x #2",
      "3.2":"a x #2",
      "4":"a x #2",
      "5":"a x #2",
      "5.1":"a x #2",
      "6":"a x #2",
      "6.1":"a x #2",
      "7":"a x #2",
      "7.1":"a x #2",
      "8":"a x #2",
      "9":"a x #2",
      "9.1":"a x #2",
      "TP":"a x #2"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"a x #2",
      "16":"a x #2",
      "17":"a x #2",
      "18":"a x #2",
      "19":"a x #2",
      "20":"a x #2",
      "21":"a x #2",
      "22":"a x #2",
      "23":"a x #2",
      "24":"a x #2",
      "25":"a x #2",
      "26":"a x #2",
      "27":"a x #2",
      "28":"a x #2",
      "29":"a x #2",
      "30":"a x #2",
      "31":"a x #2",
      "32":"a x #2",
      "33":"a x #2",
      "34":"a x #2",
      "35":"a x #2",
      "36":"a x #2",
      "37":"a x #2",
      "38":"a x #2",
      "39":"a x #2"
    },
    "ios_saf":{
      "3.2":"a x #2",
      "4.0-4.1":"a x #2",
      "4.2-4.3":"a x #2",
      "5.0-5.1":"a x #2",
      "6.0-6.1":"a x #2",
      "7.0-7.1":"a x #2",
      "8":"a x #2",
      "8.1-8.4":"a x #2",
      "9.0-9.2":"a x #2",
      "9.3":"a x #2"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"a x #2",
      "2.2":"a x #2",
      "2.3":"a x #2",
      "3":"a x #2",
      "4":"a x #2",
      "4.1":"a x #2",
      "4.2-4.3":"a x #2",
      "4.4":"a x #2",
      "4.4.3-4.4.4":"a x #2",
      "50":"a x #2"
    },
    "bb":{
      "7":"a x #2",
      "10":"a x #2"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"a x #2"
    },
    "and_chr":{
      "50":"a x #2"
    },
    "and_ff":{
      "46":"a x #1"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"a x #2"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Only supports the *-start, and *-end values for `margin`, `border` and `padding`, not the inline/block type values as defined in the spec.",
    "2":"Like #1 but also supports `*-before` and `*-end` for `*-block-start` and `*-block-end` properties as well as `start` and `end` values for `text-align`"
  },
  "usage_perc_y":0,
  "usage_perc_a":80.98,
  "ucprefix":false,
  "parent":"",
  "keywords":"margin-start,margin-end,padding-start,padding-end,border-start,border-end,inline-start,inline-end,block-start,block-end",
  "ie_id":"csslogicalpropertieslevel1",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],67:[function(require,module,exports){
module.exports={
  "title":"CSS Masks",
  "description":"Method of displaying part of an element, using a selected image as a mask",
  "spec":"http://www.w3.org/TR/css-masking-1/",
  "status":"cr",
  "links":[
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/mask",
      "title":"WebPlatform Docs"
    },
    {
      "url":"http://www.html5rocks.com/en/tutorials/masking/adobe/",
      "title":"HTML5 Rocks article"
    },
    {
      "url":"http://thenittygritty.co/css-masking",
      "title":"Detailed blog post"
    },
    {
      "url":"https://bugzilla.mozilla.org/show_bug.cgi?id=1224422",
      "title":"Firefox implementation bug"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n"
    },
    "edge":{
      "12":"n",
      "13":"n",
      "14":"u"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"a #2",
      "3.6":"a #2",
      "4":"a #2",
      "5":"a #2",
      "6":"a #2",
      "7":"a #2",
      "8":"a #2",
      "9":"a #2",
      "10":"a #2",
      "11":"a #2",
      "12":"a #2",
      "13":"a #2",
      "14":"a #2",
      "15":"a #2",
      "16":"a #2",
      "17":"a #2",
      "18":"a #2",
      "19":"a #2",
      "20":"a #2",
      "21":"a #2",
      "22":"a #2",
      "23":"a #2",
      "24":"a #2",
      "25":"a #2",
      "26":"a #2",
      "27":"a #2",
      "28":"a #2",
      "29":"a #2",
      "30":"a #2",
      "31":"a #2",
      "32":"a #2",
      "33":"a #2",
      "34":"a #2",
      "35":"a #2",
      "36":"a #2",
      "37":"a #2",
      "38":"a #2",
      "39":"a #2",
      "40":"a #2",
      "41":"a #2",
      "42":"a #2",
      "43":"a #2",
      "44":"a #2",
      "45":"a #2",
      "46":"a #2",
      "47":"a #2",
      "48":"a #2",
      "49":"a #2"
    },
    "chrome":{
      "4":"a x #1",
      "5":"a x #1",
      "6":"a x #1",
      "7":"a x #1",
      "8":"a x #1",
      "9":"a x #1",
      "10":"a x #1",
      "11":"a x #1",
      "12":"a x #1",
      "13":"a x #1",
      "14":"a x #1",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"a x #1",
      "22":"a x #1",
      "23":"a x #1",
      "24":"a x #1",
      "25":"a x #1",
      "26":"a x #1",
      "27":"a x #1",
      "28":"a x #1",
      "29":"a x #1",
      "30":"a x #1",
      "31":"a x #1",
      "32":"a x #1",
      "33":"a x #1",
      "34":"a x #1",
      "35":"a x #1",
      "36":"a x #1",
      "37":"a x #1",
      "38":"a x #1",
      "39":"a x #1",
      "40":"a x #1",
      "41":"a x #1",
      "42":"a x #1",
      "43":"a x #1",
      "44":"a x #1",
      "45":"a x #1",
      "46":"a x #1",
      "47":"a x #1",
      "48":"a x #1",
      "49":"a x #1",
      "50":"a x #1",
      "51":"a x #1",
      "52":"a x #1",
      "53":"a x #1"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"a x #1",
      "5":"a x #1",
      "5.1":"a x #1",
      "6":"a x #1",
      "6.1":"a x #1",
      "7":"a x #1",
      "7.1":"a x #1",
      "8":"a x #1",
      "9":"a x #1",
      "9.1":"a x #1",
      "TP":"a x #1"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"a x #1",
      "22":"a x #1",
      "23":"a x #1",
      "24":"a x #1",
      "25":"a x #1",
      "26":"a x #1",
      "27":"a x #1",
      "28":"a x #1",
      "29":"a x #1",
      "30":"a x #1",
      "31":"a x #1",
      "32":"a x #1",
      "33":"a x #1",
      "34":"a x #1",
      "35":"a x #1",
      "36":"a x #1",
      "37":"a x #1",
      "38":"a x #1",
      "39":"a x #1"
    },
    "ios_saf":{
      "3.2":"a x #1",
      "4.0-4.1":"a x #1",
      "4.2-4.3":"a x #1",
      "5.0-5.1":"a x #1",
      "6.0-6.1":"a x #1",
      "7.0-7.1":"a x #1",
      "8":"a x #1",
      "8.1-8.4":"a x #1",
      "9.0-9.2":"a x #1",
      "9.3":"a x #1"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"a x #1",
      "2.2":"a x #1",
      "2.3":"a x #1",
      "3":"a x #1",
      "4":"a x #1",
      "4.1":"a x #1",
      "4.2-4.3":"a x #1",
      "4.4":"a x #1",
      "4.4.3-4.4.4":"a x #1",
      "50":"a x #1"
    },
    "bb":{
      "7":"a x #1",
      "10":"a x #1"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"a x #1"
    },
    "and_chr":{
      "50":"a x #1"
    },
    "and_ff":{
      "46":"a #2"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"a x #1"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Partial support in WebKit/Blink browsers refers to supporting the mask-image and mask-box-image properties, but lacking support for other parts of the spec.",
    "2":"Partial support in Firefox refers to only support for inline SVG mask elements i.e. mask: url(#foo)."
  },
  "usage_perc_y":0,
  "usage_perc_a":80.93,
  "ucprefix":false,
  "parent":"",
  "keywords":"clip,clip-path,clip-rule,mask,mask-border,mask-clip,mask-image,mask-mode,mask-type",
  "ie_id":"masks",
  "chrome_id":"5381559662149632",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],68:[function(require,module,exports){
module.exports={
  "title":"Media Queries: resolution feature",
  "description":"Allows a media query to be set based on the device pixels used per CSS unit. While the standard uses `min`/`max-resolution` for this, some browsers support the older non-standard `device-pixel-ratio` media query.",
  "spec":"http://www.w3.org/TR/css3-mediaqueries/#resolution",
  "status":"rec",
  "links":[
    {
      "url":"http://www.w3.org/blog/CSS/2012/06/14/unprefix-webkit-device-pixel-ratio/",
      "title":"How to unprefix -webkit-device-pixel-ratio"
    },
    {
      "url":"https://bugs.webkit.org/show_bug.cgi?id=78087",
      "title":"WebKit Bug 78087: Implement the 'resolution' media query"
    },
    {
      "url":"https://compat.spec.whatwg.org/#css-media-queries-webkit-device-pixel-ratio",
      "title":"WHATWG Compatibility Standard: -webkit-device-pixel-ratio"
    }
  ],
  "bugs":[
    {
      "description":"Microsoft Edge has a bug where `min-resolution` less than `1dpcm` [is ignored](http://jsfiddle.net/behmjd5t/)."
    }
  ],
  "categories":[
    "CSS",
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"a #1",
      "10":"a #1",
      "11":"a #1"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"a #2",
      "3.6":"a #2",
      "4":"a #2",
      "5":"a #2",
      "6":"a #2",
      "7":"a #2",
      "8":"a #2",
      "9":"a #2",
      "10":"a #2",
      "11":"a #2",
      "12":"a #2",
      "13":"a #2",
      "14":"a #2",
      "15":"a #2",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"a x #3",
      "5":"a x #3",
      "6":"a x #3",
      "7":"a x #3",
      "8":"a x #3",
      "9":"a x #3",
      "10":"a x #3",
      "11":"a x #3",
      "12":"a x #3",
      "13":"a x #3",
      "14":"a x #3",
      "15":"a x #3",
      "16":"a x #3",
      "17":"a x #3",
      "18":"a x #3",
      "19":"a x #3",
      "20":"a x #3",
      "21":"a x #3",
      "22":"a x #3",
      "23":"a x #3",
      "24":"a x #3",
      "25":"a x #3",
      "26":"a x #3",
      "27":"a x #3",
      "28":"a x #3",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"a x #3",
      "5":"a x #3",
      "5.1":"a x #3",
      "6":"a x #3",
      "6.1":"a x #3",
      "7":"a x #3",
      "7.1":"a x #3",
      "8":"a x #3",
      "9":"a x #3",
      "9.1":"a x #3",
      "TP":"a x #3"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"a x #3",
      "10.0-10.1":"a x #3",
      "10.5":"a x #3",
      "10.6":"a x #3",
      "11":"a x #3",
      "11.1":"a x #3",
      "11.5":"a x #3",
      "11.6":"a x #3",
      "12":"a x #3",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"u",
      "4.0-4.1":"a x #3",
      "4.2-4.3":"a x #3",
      "5.0-5.1":"a x #3",
      "6.0-6.1":"a x #3",
      "7.0-7.1":"a x #3",
      "8":"a x #3",
      "8.1-8.4":"a x #3",
      "9.0-9.2":"a x #3",
      "9.3":"a x #3"
    },
    "op_mini":{
      "5.0-8.0":"a #1"
    },
    "android":{
      "2.1":"u",
      "2.2":"u",
      "2.3":"a x #3",
      "3":"a x #3",
      "4":"a x #3",
      "4.1":"a x #3",
      "4.2-4.3":"a x #3",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "50":"y"
    },
    "bb":{
      "7":"a x #3",
      "10":"a x #3"
    },
    "op_mob":{
      "10":"a x #3",
      "11":"a x #3",
      "11.1":"a x #3",
      "11.5":"a x #3",
      "12":"a x #3",
      "12.1":"y",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"a #1",
      "11":"a #1"
    },
    "and_uc":{
      "9.9":"a x #3"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Supports the `dpi` unit, but does not support `dppx` or `dpcm` units.",
    "2":"Firefox before 16 supports only `dpi` unit, but you can set `2dppx` per `min--moz-device-pixel-ratio: 2`",
    "3":"Supports the non-standard `min`/`max-device-pixel-ratio`"
  },
  "usage_perc_y":60.74,
  "usage_perc_a":33.82,
  "ucprefix":false,
  "parent":"css-mediaqueries",
  "keywords":"@media,device-pixel-ratio,resolution,dppx,dpcm,dpi",
  "ie_id":"mediaqueriesresolutionfeature,dppxunitfortheresolutionmediaquery",
  "chrome_id":"5944509615570944",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],69:[function(require,module,exports){
module.exports={
  "title":"::placeholder CSS pseudo-element",
  "description":"The ::placeholder pseudo-element represents placeholder text in an input field: text that represents the input and provides a hint to the user on how to fill out the form. For example, a date-input field might have the placeholder text `YYYY/MM/DD` to clarify that numeric dates are to be entered in year-month-day order.",
  "spec":"http://dev.w3.org/csswg/css-pseudo-4/#placeholder-pseudo",
  "status":"wd",
  "links":[
    {
      "url":"http://msdn.microsoft.com/en-us/library/ie/hh772745(v=vs.85).aspx",
      "title":"MSDN article"
    },
    {
      "url":"http://css-tricks.com/snippets/css/style-placeholder-text/",
      "title":"CSS-Tricks article with all prefixes"
    },
    {
      "url":"http://wiki.csswg.org/ideas/placeholder-styling",
      "title":"CSSWG discussion"
    },
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/::-moz-placeholder",
      "title":"MDN article"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"a x",
      "11":"a x"
    },
    "edge":{
      "12":"a x",
      "13":"a x",
      "14":"a x"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"a x #1",
      "5":"a x #1",
      "6":"a x #1",
      "7":"a x #1",
      "8":"a x #1",
      "9":"a x #1",
      "10":"a x #1",
      "11":"a x #1",
      "12":"a x #1",
      "13":"a x #1",
      "14":"a x #1",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x",
      "41":"y x",
      "42":"y x",
      "43":"y x",
      "44":"y x",
      "45":"y x",
      "46":"y x",
      "47":"y x",
      "48":"y x",
      "49":"y x"
    },
    "chrome":{
      "4":"a x",
      "5":"a x",
      "6":"a x",
      "7":"a x",
      "8":"a x",
      "9":"a x",
      "10":"a x",
      "11":"a x",
      "12":"a x",
      "13":"a x",
      "14":"a x",
      "15":"a x",
      "16":"a x",
      "17":"a x",
      "18":"a x",
      "19":"a x",
      "20":"a x",
      "21":"a x",
      "22":"a x",
      "23":"a x",
      "24":"a x",
      "25":"a x",
      "26":"a x",
      "27":"a x",
      "28":"a x",
      "29":"a x",
      "30":"a x",
      "31":"a x",
      "32":"a x",
      "33":"a x",
      "34":"a x",
      "35":"a x",
      "36":"a x",
      "37":"a x",
      "38":"a x",
      "39":"a x",
      "40":"a x",
      "41":"a x",
      "42":"a x",
      "43":"a x",
      "44":"a x",
      "45":"a x",
      "46":"a x",
      "47":"a x",
      "48":"a x",
      "49":"a x",
      "50":"a x",
      "51":"a x",
      "52":"a x",
      "53":"a x"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"a x",
      "5.1":"a x",
      "6":"a x",
      "6.1":"a x",
      "7":"a x",
      "7.1":"a x",
      "8":"a x",
      "9":"a x",
      "9.1":"a x",
      "TP":"a x"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"a x",
      "16":"a x",
      "17":"a x",
      "18":"a x",
      "19":"a x",
      "20":"a x",
      "21":"a x",
      "22":"a x",
      "23":"a x",
      "24":"a x",
      "25":"a x",
      "26":"a x",
      "27":"a x",
      "28":"a x",
      "29":"a x",
      "30":"a x",
      "31":"a x",
      "32":"a x",
      "33":"a x",
      "34":"a x",
      "35":"a x",
      "36":"a x",
      "37":"a x",
      "38":"a x",
      "39":"a x"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"a x",
      "5.0-5.1":"a x",
      "6.0-6.1":"a x",
      "7.0-7.1":"a x",
      "8":"a x",
      "8.1-8.4":"a x",
      "9.0-9.2":"a x",
      "9.3":"a x"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"a x",
      "2.2":"a x",
      "2.3":"a x",
      "3":"a x",
      "4":"a x",
      "4.1":"a x",
      "4.2-4.3":"a x",
      "4.4":"a x",
      "4.4.3-4.4.4":"a x",
      "50":"a x"
    },
    "bb":{
      "7":"a x",
      "10":"a x"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"a x"
    },
    "and_chr":{
      "50":"a x"
    },
    "and_ff":{
      "46":"y x"
    },
    "ie_mob":{
      "10":"a x",
      "11":"a x"
    },
    "and_uc":{
      "9.9":"a x"
    }
  },
  "notes":"Partial support refers to using alternate names:\r\n`::-webkit-input-placeholder` for (Chrome/Safari/Opera)\r\n`:-ms-input-placeholder` for IE. \r\n`::-ms-input-placeholder` for Edge (also supports webkit prefix)",
  "notes_by_num":{
    "1":"Firefox 18 and below supported the `:-moz-placeholder` pseudo-class rather than the `::-moz-placeholder` pseudo-element."
  },
  "usage_perc_y":8.07,
  "usage_perc_a":80.69,
  "ucprefix":false,
  "parent":"",
  "keywords":"::placeholder,placeholder",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],70:[function(require,module,exports){
module.exports={
  "title":"::selection CSS pseudo-element",
  "description":"The ::selection CSS pseudo-element applies rules to the portion of a document that has been highlighted (e.g., selected with the mouse or another pointing device) by the user.",
  "spec":"http://www.w3.org/TR/css-pseudo-4/#selectordef-selection",
  "status":"wd",
  "links":[
    {
      "url":"http://quirksmode.org/css/selectors/selection.html",
      "title":"::selection test"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/selectors/pseudo-elements/::selection",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"In Safari `::selection` styles do not work in combination with CSS multi-column."
    }
  ],
  "categories":[
    "CSS"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"y",
      "10":"y",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"y x",
      "3":"y x",
      "3.5":"y x",
      "3.6":"y x",
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x",
      "41":"y x",
      "42":"y x",
      "43":"y x",
      "44":"y x",
      "45":"y x",
      "46":"y x",
      "47":"y x",
      "48":"y x",
      "49":"y x"
    },
    "chrome":{
      "4":"y",
      "5":"y",
      "6":"y",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"y",
      "3.2":"y",
      "4":"y",
      "5":"y",
      "5.1":"y",
      "6":"y",
      "6.1":"y",
      "7":"y",
      "7.1":"y",
      "8":"y",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"y",
      "10.0-10.1":"y",
      "10.5":"y",
      "10.6":"y",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "11.6":"y",
      "12":"y",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"n",
      "8":"n",
      "8.1-8.4":"n",
      "9.0-9.2":"n",
      "9.3":"n"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "50":"y"
    },
    "bb":{
      "7":"n",
      "10":"y"
    },
    "op_mob":{
      "10":"u",
      "11":"u",
      "11.1":"u",
      "11.5":"y",
      "12":"y",
      "12.1":"y",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y x"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"",
  "notes_by_num":{
    
  },
  "usage_perc_y":70.99,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"::selection,selection",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],71:[function(require,module,exports){
module.exports={
  "title":"CSS Shapes Level 1",
  "description":"Allows geometric shapes to be set in CSS to define an area for text to flow around.",
  "spec":"http://www.w3.org/TR/css-shapes/",
  "status":"cr",
  "links":[
    {
      "url":"http://html.adobe.com/webplatform/layout/shapes/",
      "title":"Adobe demos and samples"
    },
    {
      "url":"http://html.adobe.com/webplatform/layout/shapes/browser-support/",
      "title":"CSS shapes support test by Adobe"
    },
    {
      "url":"http://alistapart.com/article/css-shapes-101",
      "title":"A List Apart article"
    },
    {
      "url":"https://bugzilla.mozilla.org/show_bug.cgi?id=1040714",
      "title":"Firefox tracking bug"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n"
    },
    "edge":{
      "12":"n",
      "13":"n",
      "14":"u"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n",
      "41":"n",
      "42":"n",
      "43":"n",
      "44":"n",
      "45":"n",
      "46":"n",
      "47":"n",
      "48":"n",
      "49":"n"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n d #1",
      "35":"n d #1",
      "36":"n d #1",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"n",
      "7":"n",
      "7.1":"y x",
      "8":"y x",
      "9":"y x",
      "9.1":"y x",
      "TP":"y x"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"n",
      "8":"y x",
      "8.1-8.4":"y x",
      "9.0-9.2":"y x",
      "9.3":"y x"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "50":"y"
    },
    "bb":{
      "7":"n",
      "10":"n"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"n"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Enabled in Chrome through the \"experimental Web Platform features\" flag in chrome://flags"
  },
  "usage_perc_y":57.23,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"circle,ellipse,polygon,inset,shape-outside,shape-inside",
  "ie_id":"shapes",
  "chrome_id":"5163890719588352",
  "firefox_id":"css-shapes",
  "webkit_id":"feature-css-shapes-level-1",
  "shown":true
}

},{}],72:[function(require,module,exports){
module.exports={
  "title":"CSS position:sticky",
  "description":"Keeps elements positioned as \"fixed\" or \"relative\" depending on how it appears in the viewport. As a result the element is \"stuck\" when necessary while scrolling.",
  "spec":"https://drafts.csswg.org/css-position/#sticky-pos",
  "status":"unoff",
  "links":[
    {
      "url":"http://updates.html5rocks.com/2012/08/Stick-your-landings-position-sticky-lands-in-WebKit",
      "title":"HTML5Rocks"
    },
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/position",
      "title":"MDN article"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/position",
      "title":"WebPlatform Docs"
    },
    {
      "url":"https://github.com/filamentgroup/fixed-sticky",
      "title":"Polyfill"
    },
    {
      "url":"https://github.com/wilddeer/stickyfill",
      "title":"Another polyfill"
    }
  ],
  "bugs":[
    {
      "description":"Firefox and Safari 7 & below do not appear to support [sticky table headers](http://jsfiddle.net/Mf4YT/2/). (see also [Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=975644))"
    },
    {
      "description":"A parent with overflow set to `auto` will prevent `position: sticky` from working in Safari"
    }
  ],
  "categories":[
    "CSS"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n"
    },
    "edge":{
      "12":"n",
      "13":"n",
      "14":"u"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n d #1",
      "27":"n d #1",
      "28":"n d #1",
      "29":"n d #1",
      "30":"n d #1",
      "31":"n d #1",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n d #2",
      "24":"n d #2",
      "25":"n d #2",
      "26":"n d #2",
      "27":"n d #2",
      "28":"n d #2",
      "29":"n d #2",
      "30":"n d #2",
      "31":"n d #2",
      "32":"n d #2",
      "33":"n d #2",
      "34":"n d #2",
      "35":"n d #2",
      "36":"n d #2",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n",
      "41":"n",
      "42":"n",
      "43":"n",
      "44":"n",
      "45":"n",
      "46":"n",
      "47":"n",
      "48":"n",
      "49":"n",
      "50":"n",
      "51":"n",
      "52":"n",
      "53":"n"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x",
      "9":"y x",
      "9.1":"y x",
      "TP":"y x"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"y x",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.4":"y x",
      "9.0-9.2":"y x",
      "9.3":"y x"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "50":"n"
    },
    "bb":{
      "7":"n",
      "10":"n"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"n"
    },
    "and_chr":{
      "50":"n"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Can be enabled in Firefox by setting the about:config preference layout.css.sticky.enabled to true",
    "2":"Enabled in Chrome 23-36 through the \"experimental Web Platform features\" flag in chrome://flags (removed in 37+)"
  },
  "usage_perc_y":18.02,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"",
  "ie_id":"positionsticky",
  "chrome_id":"6190250464378880",
  "firefox_id":"",
  "webkit_id":"feature-position:-sticky",
  "shown":true
}

},{}],73:[function(require,module,exports){
module.exports={
  "title":"CSS3 text-align-last",
  "description":"CSS property to describe how the last line of a block or a line right before a forced line break when `text-align` is `justify`.",
  "spec":"http://www.w3.org/TR/css3-text/#text-align-last-property",
  "status":"wd",
  "links":[
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/text-align-last",
      "title":"MDN text-align-last"
    },
    {
      "url":"http://blogs.adobe.com/webplatform/2014/02/25/improving-your-sites-visual-details-css3-text-align-last/",
      "title":"Adobe Web Platform Article"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"a #1",
      "6":"a #1",
      "7":"a #1",
      "8":"a #1",
      "9":"a #1",
      "10":"a #1",
      "11":"a #1"
    },
    "edge":{
      "12":"a",
      "13":"a",
      "14":"a"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x",
      "41":"y x",
      "42":"y x",
      "43":"y x",
      "44":"y x",
      "45":"y x",
      "46":"y x",
      "47":"y x",
      "48":"y x",
      "49":"y x"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n d #2",
      "36":"n d #2",
      "37":"n d #2",
      "38":"n d #2",
      "39":"n d #2",
      "40":"n d #2",
      "41":"n d #2",
      "42":"n d #2",
      "43":"n d #2",
      "44":"n d #2",
      "45":"n d #2",
      "46":"n d #2",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"n",
      "7":"n",
      "7.1":"n",
      "8":"n",
      "9":"n",
      "9.1":"n",
      "TP":"n"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n d #3",
      "23":"n d #3",
      "24":"n d #3",
      "25":"n d #3",
      "26":"n d #3",
      "27":"n d #3",
      "28":"n d #3",
      "29":"n d #3",
      "30":"n d #3",
      "31":"n d #3",
      "32":"n d #3",
      "33":"n d #3",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"n",
      "8":"n",
      "8.1-8.4":"n",
      "9.0-9.2":"n",
      "9.3":"n"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "50":"y"
    },
    "bb":{
      "7":"n",
      "10":"n"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"n"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y x"
    },
    "ie_mob":{
      "10":"a #1",
      "11":"a #1"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"In Internet Explorer, the start and end values are not supported.",
    "2":"Enabled through the \"Enable Experimental Web Platform Features\" flag in chrome://flags",
    "3":"Enabled through the \"Enable Experimental Web Platform Features\" flag in opera://flags"
  },
  "usage_perc_y":53.51,
  "usage_perc_a":9.27,
  "ucprefix":false,
  "parent":"",
  "keywords":"text align last",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],74:[function(require,module,exports){
module.exports={
  "title":"CSS3 Transitions",
  "description":"Simple method of animating certain properties of an element, with ability to define property, duration, delay and timing function. ",
  "spec":"http://www.w3.org/TR/css3-transitions/",
  "status":"wd",
  "links":[
    {
      "url":"http://www.webdesignerdepot.com/2010/01/css-transitions-101/",
      "title":"Article on usage"
    },
    {
      "url":"http://www.css3files.com/transition/",
      "title":"Information page"
    },
    {
      "url":"http://www.the-art-of-web.com/css/timing-function/",
      "title":"Examples on timing functions"
    },
    {
      "url":"http://www.opera.com/docs/specs/presto2.12/css/transitions/",
      "title":"Animation of property types support in Opera"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/transition",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"Not supported on any pseudo-elements besides ::before and ::after for Firefox, Chrome 26+, Opera 16+ and IE10+."
    },
    {
      "description":"Transitionable properties with calc() derived values are not supported below and including IE11 (http://connect.microsoft.com/IE/feedback/details/762719/css3-calc-bug-inside-transition-or-transform)"
    },
    {
      "description":"'background-size' is not supported below and including IE10"
    },
    {
      "description":"IE11 [does not support](https://connect.microsoft.com/IE/feedbackdetail/view/920928/ie-11-css-transition-property-not-working-for-svg-elements) CSS transitions on the SVG `fill` property."
    },
    {
      "description":"In Chrome (up to 43.0), for transition-delay property, either explicitly specified or written within transition property, the unit cannot be ommitted even if the value is 0."
    },
    {
      "description":"IE10 & IE11 are reported to not support transitioning the `column-count` property."
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"y",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"y x",
      "3.2":"y x",
      "4":"y x",
      "5":"y x",
      "5.1":"y x",
      "6":"y x",
      "6.1":"y",
      "7":"y",
      "7.1":"y",
      "8":"y",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"y x",
      "10.6":"y x",
      "11":"y x",
      "11.1":"y x",
      "11.5":"y x",
      "11.6":"y x",
      "12":"y x",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"y x",
      "4.0-4.1":"y x",
      "4.2-4.3":"y x",
      "5.0-5.1":"y x",
      "6.0-6.1":"y x",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.4":"y",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"y x",
      "2.2":"y x",
      "2.3":"y x",
      "3":"y x",
      "4":"y x",
      "4.1":"y x",
      "4.2-4.3":"y x",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "50":"y"
    },
    "bb":{
      "7":"y x",
      "10":"y"
    },
    "op_mob":{
      "10":"y x",
      "11":"y x",
      "11.1":"y x",
      "11.5":"y x",
      "12":"y x",
      "12.1":"y",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"Support listed is for `transition` properties as well as the `transitionend` event. The prefixed name in WebKit browsers is `webkitTransitionEnd`",
  "notes_by_num":{
    
  },
  "usage_perc_y":88.97,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"css transition,transitionend,transition-property,transition-duration,transition-timing-function,transition-delay",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],75:[function(require,module,exports){
module.exports={
  "title":"CSS3 Box-sizing",
  "description":"Method of specifying whether or not an element's borders and padding should be included in size units",
  "spec":"http://www.w3.org/TR/css3-ui/#box-sizing",
  "status":"cr",
  "links":[
    {
      "url":"https://developer.mozilla.org/En/CSS/Box-sizing",
      "title":"MDN article"
    },
    {
      "url":"http://www.456bereastreet.com/archive/201104/controlling_width_with_css3_box-sizing/",
      "title":"Blog post"
    },
    {
      "url":"https://github.com/Schepp/box-sizing-polyfill",
      "title":"Polyfill for IE"
    },
    {
      "url":"http://css-tricks.com/box-sizing/",
      "title":"CSS Tricks"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/box-sizing",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"Android browsers do not calculate correctly the dimensions (width and height) of the HTML select element."
    },
    {
      "description":"Safari 6.0.x does not use box-sizing on elements with display: table;"
    },
    {
      "description":"IE9 will subtract the width of the scrollbar to the width of the element when set to position: absolute / fixed , overflow: auto / overflow-y: scroll"
    },
    {
      "description":"IE 8 ignores `box-sizing: border-box` if min/max-width/height is used."
    },
    {
      "description":"Chrome has problems selecting options from the `select` element when using `box-sizing: border-box` and browser zoom level is less than 100%."
    },
    {
      "description":"In IE8, the min-width property applies to `content-box` even if `box-sizing` is set to `border-box`."
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"p",
      "6":"p",
      "7":"p",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"y x",
      "3":"y x",
      "3.5":"y x",
      "3.6":"y x",
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"y x",
      "3.2":"y x",
      "4":"y x",
      "5":"y x",
      "5.1":"y",
      "6":"y",
      "6.1":"y",
      "7":"y",
      "7.1":"y",
      "8":"y",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"y",
      "10.0-10.1":"y",
      "10.5":"y",
      "10.6":"y",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "11.6":"y",
      "12":"y",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"y x",
      "4.0-4.1":"y x",
      "4.2-4.3":"y x",
      "5.0-5.1":"y",
      "6.0-6.1":"y",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.4":"y",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"y"
    },
    "android":{
      "2.1":"y x",
      "2.2":"y x",
      "2.3":"y x",
      "3":"y x",
      "4":"y",
      "4.1":"y",
      "4.2-4.3":"y",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "50":"y"
    },
    "bb":{
      "7":"y x",
      "10":"y"
    },
    "op_mob":{
      "10":"y",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "12":"y",
      "12.1":"y",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y"
    }
  },
  "notes":"Firefox currently also supports the `padding-box` in addition to `content-box` and `border-box`, though this value has been removed from the specification.",
  "notes_by_num":{
    
  },
  "usage_perc_y":95.39,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"border-box,content-box",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],76:[function(require,module,exports){
module.exports={
  "title":"CSS3 Cursors: zoom-in & zoom-out",
  "description":"Support for `zoom-in`, `zoom-out` values for the CSS3 `cursor` property.",
  "spec":"http://www.w3.org/TR/css3-ui/#cursor",
  "status":"cr",
  "links":[
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/cursor",
      "title":"MDN Documentation"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"y x",
      "3":"y x",
      "3.5":"y x",
      "3.6":"y x",
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"y x",
      "3.2":"y x",
      "4":"y x",
      "5":"y x",
      "5.1":"y x",
      "6":"y x",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"y",
      "12":"y",
      "12.1":"y",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"n",
      "8":"n",
      "8.1-8.4":"n",
      "9.0-9.2":"n",
      "9.3":"n"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "50":"n"
    },
    "bb":{
      "7":"y x",
      "10":"y x"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"n"
    },
    "and_chr":{
      "50":"n"
    },
    "and_ff":{
      "46":"n"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"",
  "notes_by_num":{
    
  },
  "usage_perc_y":44.16,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"cursors, pointers",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],77:[function(require,module,exports){
module.exports={
  "title":"CSS3 tab-size",
  "description":"Method of customizing the width of the tab character. Only effective using 'white-space: pre' or 'white-space: pre-wrap'.",
  "spec":"http://www.w3.org/TR/css3-text/#tab-size",
  "status":"wd",
  "links":[
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size",
      "title":"MDN article"
    },
    {
      "url":"https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6524689-tab-size-property",
      "title":"Microsoft Edge feature request on UserVoice"
    }
  ],
  "bugs":[
    {
      "description":"Firefox [does not yet](https://bugzilla.mozilla.org/show_bug.cgi?id=943918) support `<length>` values"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n"
    },
    "edge":{
      "12":"n",
      "13":"n",
      "14":"u"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"a x #1",
      "5":"a x #1",
      "6":"a x #1",
      "7":"a x #1",
      "8":"a x #1",
      "9":"a x #1",
      "10":"a x #1",
      "11":"a x #1",
      "12":"a x #1",
      "13":"a x #1",
      "14":"a x #1",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"a x #1",
      "22":"a x #1",
      "23":"a x #1",
      "24":"a x #1",
      "25":"a x #1",
      "26":"a x #1",
      "27":"a x #1",
      "28":"a x #1",
      "29":"a x #1",
      "30":"a x #1",
      "31":"a x #1",
      "32":"a x #1",
      "33":"a x #1",
      "34":"a x #1",
      "35":"a x #1",
      "36":"a x #1",
      "37":"a x #1",
      "38":"a x #1",
      "39":"a x #1",
      "40":"a x #1",
      "41":"a x #1",
      "42":"a x #1",
      "43":"a x #1",
      "44":"a x #1",
      "45":"a x #1",
      "46":"a x #1",
      "47":"a x #1",
      "48":"a x #1",
      "49":"a x #1"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"a #1",
      "22":"a #1",
      "23":"a #1",
      "24":"a #1",
      "25":"a #1",
      "26":"a #1",
      "27":"a #1",
      "28":"a #1",
      "29":"a #1",
      "30":"a #1",
      "31":"a #1",
      "32":"a #1",
      "33":"a #1",
      "34":"a #1",
      "35":"a #1",
      "36":"a #1",
      "37":"a #1",
      "38":"a #1",
      "39":"a #1",
      "40":"a #1",
      "41":"a #1",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"a #1",
      "7":"a #1",
      "7.1":"a #1",
      "8":"a #1",
      "9":"a #1",
      "9.1":"a #1",
      "TP":"a #1"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"a x #1",
      "11":"a x #1",
      "11.1":"a x #1",
      "11.5":"a x #1",
      "11.6":"a x #1",
      "12":"a x #1",
      "12.1":"a x #1",
      "15":"a #1",
      "16":"a #1",
      "17":"a #1",
      "18":"a #1",
      "19":"a #1",
      "20":"a #1",
      "21":"a #1",
      "22":"a #1",
      "23":"a #1",
      "24":"a #1",
      "25":"a #1",
      "26":"a #1",
      "27":"a #1",
      "28":"a #1",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"a #1",
      "8":"a #1",
      "8.1-8.4":"a #1",
      "9.0-9.2":"a #1",
      "9.3":"a #1"
    },
    "op_mini":{
      "5.0-8.0":"a x #1"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"a #1",
      "4.4.3-4.4.4":"a #1",
      "50":"a #1"
    },
    "bb":{
      "7":"a #1",
      "10":"a #1"
    },
    "op_mob":{
      "10":"n",
      "11":"a x #1",
      "11.1":"a x #1",
      "11.5":"a x #1",
      "12":"a x #1",
      "12.1":"a x #1",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"a x #1"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Partial refers to supporting `<integer>` but not `<length>` values."
  },
  "usage_perc_y":46.85,
  "usage_perc_a":28.45,
  "ucprefix":false,
  "parent":"",
  "keywords":"tab-size,tab-width",
  "ie_id":"csstabsizeproperty",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],78:[function(require,module,exports){
module.exports={
  "title":"Flexible Box Layout Module",
  "description":"Method of positioning elements in horizontal or vertical stacks. Support includes the support for the all properties prefixed with `flex` as well as `display: flex`, `display: inline-flex`, `align-content`, `align-items`, `align-self`, `justify-content` and `order`.",
  "spec":"http://www.w3.org/TR/css3-flexbox/",
  "status":"cr",
  "links":[
    {
      "url":"http://bennettfeely.com/flexplorer/",
      "title":"Flexbox CSS generator"
    },
    {
      "url":"http://www.adobe.com/devnet/html5/articles/working-with-flexbox-the-new-spec.html",
      "title":"Article on using the latest spec"
    },
    {
      "url":"https://dev.opera.com/articles/view/advanced-cross-browser-flexbox/",
      "title":"Tutorial on cross-browser support"
    },
    {
      "url":"http://philipwalton.github.io/solved-by-flexbox/",
      "title":"Examples on how to solve common layout problems with flexbox"
    },
    {
      "url":"http://css-tricks.com/snippets/css/a-guide-to-flexbox/",
      "title":"A Complete Guide to Flexbox"
    },
    {
      "url":"http://the-echoplex.net/flexyboxes/",
      "title":"Flexbox playground and code generator"
    },
    {
      "url":"https://github.com/philipwalton/flexbugs",
      "title":"Flexbugs: Repo for flexbox bugs"
    },
    {
      "url":"https://github.com/10up/flexibility/",
      "title":"10up Open Sources IE 8 and 9 Support for Flexbox"
    },
    {
      "url":"https://github.com/vadimyer/ecligrid",
      "title":"Ecligrid - Mobile first flexbox grid system"
    }
  ],
  "bugs":[
    {
      "description":"In IE10 the default value for `flex` is `0 0 auto` rather than `0 1 auto` as defined in the latest spec."
    },
    {
      "description":"In IE10 and IE11, containers with `display: flex` and `flex-direction: column` will not properly calculate their flexed childrens' sizes if the container has `min-height` but no explicit `height` property. [See bug](https://connect.microsoft.com/IE/feedback/details/802625/min-height-and-flexbox-flex-direction-column-dont-work-together-in-ie-10-11-preview)."
    },
    {
      "description":"In Chrome and Safari, the height of (non flex) children are not recognized in percentages. However Firefox and IE recognize and scale the children based on percentage heights. [Chrome bug](http://crbug.com/341310)"
    },
    {
      "description":"Firefox does not support [Flexbox in button elements](https://bugzilla.mozilla.org/show_bug.cgi?id=984869#c2)"
    },
    {
      "description":"[Flexbugs](https://github.com/philipwalton/flexbugs): community-curated list of flexbox issues and cross-browser workarounds for them"
    },
    {
      "description":"IE11 does not [wrap long paragraphs of text](http://jsfiddle.net/y1do9cx8/1/)"
    },
    {
      "description":"IE11 will not apply flexbox on pseudo-elements. [See bug](https://connect.microsoft.com/IE/feedbackdetail/view/1058330/ie11-will-not-apply-flexbox-on-pseudo-elements)."
    },
    {
      "description":"In IE 10, setting `-ms-flex-flow: row wrap` will not wrap unless `display: inline-block` is set on child elements."
    },
    {
      "description":"IE 11 incorrectly focuses a child element if the parent uses `display:flex` and has a tabindex set [see testcase](http://jsbin.com/numibokune/1/edit?html,css,js,console,output)."
    },
    {
      "description":"IE 11 does not vertically align items correctly when `min-height` is used [see bug](https://connect.microsoft.com/IE/feedback/details/816293/ie11-flexbox-with-min-height-not-vertically-aligning-with-align-items-center)"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"a x #2 #4",
      "11":"a #4"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"a x #1",
      "3":"a x #1",
      "3.5":"a x #1",
      "3.6":"a x #1",
      "4":"a x #1",
      "5":"a x #1",
      "6":"a x #1",
      "7":"a x #1",
      "8":"a x #1",
      "9":"a x #1",
      "10":"a x #1",
      "11":"a x #1",
      "12":"a x #1",
      "13":"a x #1",
      "14":"a x #1",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"a x #1",
      "22":"a #3",
      "23":"a #3",
      "24":"a #3",
      "25":"a #3",
      "26":"a #3",
      "27":"a #3",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"a x #1",
      "5":"a x #1",
      "6":"a x #1",
      "7":"a x #1",
      "8":"a x #1",
      "9":"a x #1",
      "10":"a x #1",
      "11":"a x #1",
      "12":"a x #1",
      "13":"a x #1",
      "14":"a x #1",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"a x #1",
      "3.2":"a x #1",
      "4":"a x #1",
      "5":"a x #1",
      "5.1":"a x #1",
      "6":"a x #1",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"y",
      "15":"y x",
      "16":"y x",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"a x #1",
      "4.0-4.1":"a x #1",
      "4.2-4.3":"a x #1",
      "5.0-5.1":"a x #1",
      "6.0-6.1":"a x #1",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.4":"y x",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"y"
    },
    "android":{
      "2.1":"a x #1",
      "2.2":"a x #1",
      "2.3":"a x #1",
      "3":"a x #1",
      "4":"a x #1",
      "4.1":"a x #1",
      "4.2-4.3":"a x #1",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "50":"y"
    },
    "bb":{
      "7":"a x #1",
      "10":"y"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"y",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"a x #2",
      "11":"y"
    },
    "and_uc":{
      "9.9":"a x #1"
    }
  },
  "notes":"Most partial support refers to supporting an [older version](http://www.w3.org/TR/2009/WD-css3-flexbox-20090723/) of the specification or an [older syntax](http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/).",
  "notes_by_num":{
    "1":"Only supports the [old flexbox](http://www.w3.org/TR/2009/WD-css3-flexbox-20090723) specification and does not support wrapping.",
    "2":"Only supports the [2012 syntax](http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/)",
    "3":"Does not support flex-wrap or flex-flow properties",
    "4":"Partial support is due to large amount of bugs present (see known issues)"
  },
  "usage_perc_y":76.38,
  "usage_perc_a":17.65,
  "ucprefix":false,
  "parent":"",
  "keywords":"flex-box,flex-direction,flex-wrap,flex-flow,flex-grow,flex-basis,display:flex,flex box",
  "ie_id":"flexbox",
  "chrome_id":"4837301406400512",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],79:[function(require,module,exports){
module.exports={
  "title":"CSS font-feature-settings",
  "description":"Method of applying advanced typographic and language-specific font features to supported OpenType fonts.",
  "spec":"http://w3.org/TR/css3-fonts/#font-rend-props",
  "status":"cr",
  "links":[
    {
      "url":"http://ie.microsoft.com/testdrive/Graphics/opentype/",
      "title":"Demo pages (IE/Firefox only)"
    },
    {
      "url":"http://hacks.mozilla.org/2010/11/firefox-4-font-feature-support/",
      "title":"Mozilla hacks article"
    },
    {
      "url":"http://html5accessibility.com/",
      "title":"Detailed tables on accessability support"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/font-feature-settings",
      "title":"WebPlatform Docs"
    },
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings",
      "title":"Mozilla Developer Network"
    },
    {
      "url":"https://www.microsoft.com/typography/otspec/featuretags.htm",
      "title":"OpenType layout feature tag registry"
    },
    {
      "url":"http://help.typekit.com/customer/portal/articles/1789736-syntax-for-opentype-features-in-css#salt",
      "title":"Syntax for OpenType features in CSS (Adobe Typekit Help)"
    }
  ],
  "bugs":[
    {
      "description":"IE10 and 11 do not always appear to support the `ss01` value correctly."
    },
    {
      "description":"IE10 and 11 on Windows 7 [can hide the text](http://stackoverflow.com/questions/22151835/msie-10-web-font-and-font-feature-settings-causes-invisible-text) under certain circumstances."
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"y",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"a x #1",
      "5":"a x #1",
      "6":"a x #1",
      "7":"a x #1",
      "8":"a x #1",
      "9":"a x #1",
      "10":"a x #1",
      "11":"a x #1",
      "12":"a x #1",
      "13":"a x #1",
      "14":"a x #1",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"a x #2",
      "17":"a x #2",
      "18":"a x #2",
      "19":"a x #2",
      "20":"a x #2",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x",
      "41":"y x",
      "42":"y x",
      "43":"y x",
      "44":"y x",
      "45":"y x",
      "46":"y x",
      "47":"y x",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"a",
      "5":"a",
      "5.1":"a",
      "6":"a",
      "6.1":"n",
      "7":"n",
      "7.1":"n",
      "8":"n",
      "9":"n",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"a",
      "4.0-4.1":"a",
      "4.2-4.3":"a",
      "5.0-5.1":"a",
      "6.0-6.1":"a",
      "7.0-7.1":"n",
      "8":"n",
      "8.1-8.4":"n",
      "9.0-9.2":"n",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"y x",
      "4.4.3-4.4.4":"y x",
      "50":"y"
    },
    "bb":{
      "7":"n",
      "10":"y x"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"y"
    },
    "and_chr":{
      "50":"y x"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"Whenever possible, font-variant shorthand property or an associated longhand property, font-variant-ligatures, font-variant-caps, font-variant-east-asian, font-variant-alternates, font-variant-numeric or font-variant-position should be used. This property is a low-level feature designed to handle special cases where no other way to enable or access an OpenType font feature exists. In particular, this CSS property shouldn't be used to enable small caps.",
  "notes_by_num":{
    "1":"From Gecko 2.0 (Firefox 4.0) to Gecko 14.0 (Firefox 14.0) included, Gecko supported an older syntax, slightly different from the modern one: http://hacks.mozilla.org/2010/11/firefox-4-font-feature-support/",
    "2":"Partial support in older Chrome versions refers to lacking support in Mac OS X."
  },
  "usage_perc_y":82.09,
  "usage_perc_a":0.44,
  "ucprefix":false,
  "parent":"",
  "keywords":"font-feature,font-feature-settings,kern,kerning,font-variant-alternates,ligatures,font-variant-ligatures",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],80:[function(require,module,exports){
module.exports={
  "title":"Full Screen API",
  "description":"API for allowing content (like a video or canvas element) to take up the entire screen.",
  "spec":"https://fullscreen.spec.whatwg.org/",
  "status":"ls",
  "links":[
    {
      "url":"https://developer.mozilla.org/en/DOM/Using_full-screen_mode",
      "title":"MDN article"
    },
    {
      "url":"http://jlongster.com/2011/11/21/canvas.html",
      "title":"Blog post"
    },
    {
      "url":"http://hacks.mozilla.org/2012/01/using-the-fullscreen-api-in-web-browsers/",
      "title":"Mozilla hacks article"
    },
    {
      "url":"http://docs.webplatform.org/wiki/dom/Element/requestFullscreen",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"IE 11 doesn't allow going to fullscreen mode when the event that triggers `msRequestFullscreen()` is a `keydown` or `pointerdown` event (`keypress` and `click` do work)"
    },
    {
      "description":"Safari blocks access to keyboard events in fullscreen mode (as a security measure)."
    },
    {
      "description":"Safari doesn't support stacking, meaning only one element can be set to full screen. `webkitRequestFullScreen()` is ignored for other elements and no error event is dispatched."
    },
    {
      "description":"IE 11 does not allow scrolling when document.documentElement is set to full screen."
    },
    {
      "description":"IE 11 does not properly support fullscreen when opening from an iframe."
    },
    {
      "description":"Opera 12.1 uses the older specificaton's `:fullscreen-ancestor` pseudo-class instead of the  the `::backdrop` pseudo-element."
    }
  ],
  "categories":[
    "JS API"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"a x #3"
    },
    "edge":{
      "12":"a #3",
      "13":"a #3",
      "14":"a #3"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"a x #1 #3",
      "11":"a x #1 #3",
      "12":"a x #1 #3",
      "13":"a x #1 #3",
      "14":"a x #1 #3",
      "15":"a x #1 #3",
      "16":"a x #1 #3",
      "17":"a x #1 #3",
      "18":"a x #1 #3",
      "19":"a x #1 #3",
      "20":"a x #1 #3",
      "21":"a x #1 #3",
      "22":"a x #1 #3",
      "23":"a x #1 #3",
      "24":"a x #1 #3",
      "25":"a x #1 #3",
      "26":"a x #1 #3",
      "27":"a x #1 #3",
      "28":"a x #1 #3",
      "29":"a x #1 #3",
      "30":"a x #1 #3",
      "31":"a x #1 #3",
      "32":"a x #1 #3",
      "33":"a x #1 #3",
      "34":"a x #1 #3",
      "35":"a x #1 #3",
      "36":"a x #1 #3",
      "37":"a x #1 #3",
      "38":"a x #1 #3",
      "39":"a x #1 #3",
      "40":"a x #1 #3",
      "41":"a x #1 #3",
      "42":"a x #1 #3",
      "43":"a x #1 #3",
      "44":"a x #1 #3",
      "45":"a x #1 #3",
      "46":"a x #1 #3",
      "47":"a #3",
      "48":"a #3",
      "49":"a #3"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"a x #1 #3",
      "16":"a x #1 #3",
      "17":"a x #1 #3",
      "18":"a x #1 #3",
      "19":"a x #1 #3",
      "20":"a x #2 #3",
      "21":"a x #2 #3",
      "22":"a x #2 #3",
      "23":"a x #2 #3",
      "24":"a x #2 #3",
      "25":"a x #2 #3",
      "26":"a x #2 #3",
      "27":"a x #2 #3",
      "28":"a x #2 #3",
      "29":"a x #2 #3",
      "30":"a x #2 #3",
      "31":"a x #2 #3",
      "32":"a x #2 #3",
      "33":"a x #2 #3",
      "34":"a x #2 #3",
      "35":"a x #2 #3",
      "36":"a x #2 #3",
      "37":"a x #2 #3",
      "38":"a x #2 #3",
      "39":"a x #2 #3",
      "40":"a x #2 #3",
      "41":"a x #2 #3",
      "42":"a x #2 #3",
      "43":"a x #2 #3",
      "44":"a x #2 #3",
      "45":"a x #2 #3",
      "46":"a x #2 #3",
      "47":"a x #2 #3",
      "48":"a x #2 #3",
      "49":"a x #2 #3",
      "50":"a x #2 #3",
      "51":"a x #2 #3",
      "52":"a x #2 #3",
      "53":"a x #2 #3"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"a x #1 #3",
      "6":"a x #2 #3",
      "6.1":"a x #2 #3",
      "7":"a x #2 #3",
      "7.1":"a x #2 #3",
      "8":"a x #2 #3",
      "9":"a x #2 #3",
      "9.1":"a x #2 #3",
      "TP":"a x #2 #3"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"y",
      "15":"a x #2 #3",
      "16":"a x #2 #3",
      "17":"a x #2 #3",
      "18":"a x #2 #3",
      "19":"a x #2 #3",
      "20":"a x #2 #3",
      "21":"a x #2 #3",
      "22":"a x #2 #3",
      "23":"a x #2 #3",
      "24":"a x #2 #3",
      "25":"a x #2 #3",
      "26":"a x #2 #3",
      "27":"a x #2 #3",
      "28":"a x #2 #3",
      "29":"a x #2 #3",
      "30":"a x #2 #3",
      "31":"a x #2 #3",
      "32":"a x #2 #3",
      "33":"a x #2 #3",
      "34":"a x #2 #3",
      "35":"a x #2 #3",
      "36":"a x #2 #3",
      "37":"a x #2 #3",
      "38":"a x #2 #3",
      "39":"a x #2 #3"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"n",
      "8":"n",
      "8.1-8.4":"n",
      "9.0-9.2":"n",
      "9.3":"n"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "50":"n"
    },
    "bb":{
      "7":"n",
      "10":"a x #2"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"a x #2 #3"
    },
    "and_chr":{
      "50":"a x #2 #3"
    },
    "and_ff":{
      "46":"a x #1 #3"
    },
    "ie_mob":{
      "10":"n",
      "11":"a x #3"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Partial support refers to supporting an earlier draft of the spec.",
    "2":"Partial support refers to not supporting `::backdrop`, and supporting the old `:full-screen` syntax rather than the standard `:fullscreen`.",
    "3":"Partial support refers to not returning a Promise, as specified in the latest version of the spec."
  },
  "usage_perc_y":0.11,
  "usage_perc_a":66.48,
  "ucprefix":false,
  "parent":"",
  "keywords":"full-screen",
  "ie_id":"fullscreenapi",
  "chrome_id":"5259513871466496",
  "firefox_id":"fullscreen",
  "webkit_id":"",
  "shown":true
}

},{}],81:[function(require,module,exports){
module.exports={
  "title":"Intrinsic & Extrinsic Sizing",
  "description":"Allows for the heights and widths to be specified in intrinsic values using the `fill`, `max-content`, `min-content`, and `fit-content` properties.",
  "spec":"http://www.w3.org/TR/css3-sizing/",
  "status":"wd",
  "links":[
    {
      "url":"http://demosthenes.info/blog/662/Design-From-the-Inside-Out-With-CSS-MinContent",
      "title":"Min-Content tutorial"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n"
    },
    "edge":{
      "12":"n",
      "13":"n",
      "14":"u"
    },
    "firefox":{
      "2":"n",
      "3":"a x #1 #2 #3",
      "3.5":"a x #1 #2 #3",
      "3.6":"a x #1 #2 #3",
      "4":"a x #1 #2 #3",
      "5":"a x #1 #2 #3",
      "6":"a x #1 #2 #3",
      "7":"a x #1 #2 #3",
      "8":"a x #1 #2 #3",
      "9":"a x #1 #2 #3",
      "10":"a x #1 #2 #3",
      "11":"a x #1 #2 #3",
      "12":"a x #1 #2 #3",
      "13":"a x #1 #2 #3",
      "14":"a x #1 #2 #3",
      "15":"a x #1 #2 #3",
      "16":"a x #1 #2 #3",
      "17":"a x #1 #2 #3",
      "18":"a x #1 #2 #3",
      "19":"a x #1 #2 #3",
      "20":"a x #1 #2 #3",
      "21":"a x #1 #2 #3",
      "22":"a x #1 #2 #3",
      "23":"a x #1 #2 #3",
      "24":"a x #1 #2 #3",
      "25":"a x #1 #2 #3",
      "26":"a x #1 #2 #3",
      "27":"a x #1 #2 #3",
      "28":"a x #1 #2 #3",
      "29":"a x #1 #2 #3",
      "30":"a x #1 #2 #3",
      "31":"a x #1 #2 #3",
      "32":"a x #1 #2 #3",
      "33":"a x #1 #2 #3",
      "34":"a x #1 #2 #3",
      "35":"a x #1 #2 #3",
      "36":"a x #1 #2 #3",
      "37":"a x #1 #2 #3",
      "38":"a x #1 #2 #3",
      "39":"a x #1 #2 #3",
      "40":"a x #1 #2 #3",
      "41":"a x #1 #2 #3",
      "42":"a x #1 #2 #3",
      "43":"a x #1 #2 #3",
      "44":"a x #1 #2 #3",
      "45":"a x #1 #2 #3",
      "46":"a x #1 #2 #3",
      "47":"a x #1 #2 #3",
      "48":"a x #1 #2 #3",
      "49":"a x #1 #2 #3"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"y x #3",
      "23":"y x #3",
      "24":"y x #3",
      "25":"y x #3",
      "26":"y x #3",
      "27":"y x #3",
      "28":"y x #3",
      "29":"y x #3",
      "30":"y x #3",
      "31":"y x #3",
      "32":"y x #3",
      "33":"y x #3",
      "34":"y x #3",
      "35":"y x #3",
      "36":"y x #3",
      "37":"y x #3",
      "38":"y x #3",
      "39":"y x #3",
      "40":"y x #3",
      "41":"y x #3",
      "42":"y x #3",
      "43":"y x #3",
      "44":"y x #3",
      "45":"y x #3",
      "46":"y #3 #4",
      "47":"y #3 #4",
      "48":"y #3 #4",
      "49":"y #3 #4",
      "50":"y #3 #4",
      "51":"y #3 #4",
      "52":"y #3 #4",
      "53":"y #3 #4"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"a x #1 #3",
      "7":"a x #1 #3",
      "7.1":"a x #1 #3",
      "8":"a x #1 #3",
      "9":"a x #3",
      "9.1":"a x #3",
      "TP":"a x #3"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"y x #3",
      "16":"y x #3",
      "17":"y x #3",
      "18":"y x #3",
      "19":"y x #3",
      "20":"y x #3",
      "21":"y x #3",
      "22":"y x #3",
      "23":"y x #3",
      "24":"y x #3",
      "25":"y x #3",
      "26":"y x #3",
      "27":"y x #3",
      "28":"y x #3",
      "29":"y x #3",
      "30":"y x #3",
      "31":"y x #3",
      "32":"y x #3",
      "33":"y #3 #4",
      "34":"y #3",
      "35":"y #3 #4",
      "36":"y #3 #4",
      "37":"y #3 #4",
      "38":"y #3 #4",
      "39":"y #3 #4"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"a x #1 #3",
      "8":"a x #1 #3",
      "8.1-8.4":"a x #1 #3",
      "9.0-9.2":"a x #3",
      "9.3":"a x #3"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"y x #3",
      "4.4.3-4.4.4":"y x #3",
      "50":"y #3 #4"
    },
    "bb":{
      "7":"n",
      "10":"y x #3"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"y #3 #4"
    },
    "and_chr":{
      "50":"y #3 #4"
    },
    "and_ff":{
      "46":"a x #1 #2 #3"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"Prefixes are on the values, not the property names (e.g. -webkit-min-content)\r\n\r\nOlder webkit browsers also support the unofficial `intrinsic` value which acts the same as `max-content`.",
  "notes_by_num":{
    "1":"Does not support for height/min-height/max-height property, only width. [see test case](http://codepen.io/shshaw/pen/Kiwaz) [Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=567039)",
    "2":"Firefox currently supports the \"-moz-available\" property rather than \"-moz-fill\".",
    "3":"Does not support for \"flex-basis\" property. [see specs](http://www.w3.org/TR/2015/WD-css-flexbox-1-20150514/#flex-basis-property).\r\n[Blink bug](https://codereview.chromium.org/1304853002/),[Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1055887)",
    "4":"This does not yet unprefix fill-available (aka fill)[See bug](https://chromium.googlesource.com/chromium/blink.git/+/bf119cdfece210e69c9a99af06f1b9981e2a1bc2), because the [CSSWG](https://lists.w3.org/Archives/Public/www-style/2015Aug/0127.html) is not ready for that yet."
  },
  "usage_perc_y":51.44,
  "usage_perc_a":18.65,
  "ucprefix":false,
  "parent":"",
  "keywords":"fill,fill-available,max-content,min-content,fit-content,contain-floats,intrinsic,extrinsic,sizing",
  "ie_id":"cssintrinsicsizing",
  "chrome_id":"5901353784180736",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],82:[function(require,module,exports){
module.exports={
  "title":"CSS3 Multiple column layout",
  "description":"Method of flowing information in multiple columns",
  "spec":"http://www.w3.org/TR/css3-multicol/",
  "status":"cr",
  "links":[
    {
      "url":"https://dev.opera.com/articles/view/css3-multi-column-layout/",
      "title":"Dev.Opera article"
    },
    {
      "url":"http://webdesign.tutsplus.com/tutorials/htmlcss-tutorials/an-introduction-to-the-css3-multiple-column-layout-module/",
      "title":"Introduction page"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/column-width",
      "title":"WebPlatform Docs"
    },
    {
      "url":"https://github.com/BetleyWhitehorne/CSS3MultiColumn",
      "title":"Polyfill"
    }
  ],
  "bugs":[
    {
      "description":"In Firefox, the property `column-span` (or `-moz-column-span`) does not yet work. See [the bug](https://bugzilla.mozilla.org/show_bug.cgi?id=616436)."
    },
    {
      "description":"Chrome is reported to incorrectly calculate the container height, and often breaks on margins, padding, and can display 1px of the next column at the bottom of the previous column. Part of these issues can be solved by adding `-webkit-perspective:1;` to the column container. This creates a new stacking context for the container, and apparently causes chrome to (re)calculate column layout.\r\n"
    },
    {
      "description":"Browsers behave differently when flowing `ol` list numbers in columns: IE and Safari only show numbers for the first column. Chrome does not show any numbers. Only Firefox behaves as expected with numbers showing for all items."
    },
    {
      "description":"IE has been reported to incorrectly break on elements across columns when having more than 3 columns.\r\n"
    },
    {
      "description":"IE 10 has a bug where text-shadow doesn't work when used inside columns [see testcase](https://jsfiddle.net/0bwwrtda/)\r\n"
    },
    {
      "description":"Firefox does not split tables into columns"
    },
    {
      "description":"Firefox and Chrome do not support columns on the <fieldset> element [see bug](https://bugzilla.mozilla.org/show_bug.cgi?id=727164)"
    },
    {
      "description":"Safari 5-8 is known to render columns [less evenly](http://stackoverflow.com/questions/14148078/safari-column-count-differs-from-firefox-and-chrome) than other browsers"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"y",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"a x",
      "3":"a x",
      "3.5":"a x",
      "3.6":"a x",
      "4":"a x",
      "5":"a x",
      "6":"a x",
      "7":"a x",
      "8":"a x",
      "9":"a x",
      "10":"a x",
      "11":"a x",
      "12":"a x",
      "13":"a x",
      "14":"a x",
      "15":"a x",
      "16":"a x",
      "17":"a x",
      "18":"a x",
      "19":"a x",
      "20":"a x",
      "21":"a x",
      "22":"a x",
      "23":"a x",
      "24":"a x",
      "25":"a x",
      "26":"a x",
      "27":"a x",
      "28":"a x",
      "29":"a x",
      "30":"a x",
      "31":"a x",
      "32":"a x",
      "33":"a x",
      "34":"a x",
      "35":"a x",
      "36":"a x",
      "37":"a x",
      "38":"a x",
      "39":"a x",
      "40":"a x",
      "41":"a x",
      "42":"a x",
      "43":"a x",
      "44":"a x",
      "45":"a x",
      "46":"a x",
      "47":"a x",
      "48":"a x",
      "49":"a x"
    },
    "chrome":{
      "4":"a x",
      "5":"a x",
      "6":"a x",
      "7":"a x",
      "8":"a x",
      "9":"a x",
      "10":"a x",
      "11":"a x",
      "12":"a x",
      "13":"a x",
      "14":"a x",
      "15":"a x",
      "16":"a x",
      "17":"a x",
      "18":"a x",
      "19":"a x",
      "20":"a x",
      "21":"a x",
      "22":"a x",
      "23":"a x",
      "24":"a x",
      "25":"a x",
      "26":"a x",
      "27":"a x",
      "28":"a x",
      "29":"a x",
      "30":"a x",
      "31":"a x",
      "32":"a x",
      "33":"a x",
      "34":"a x",
      "35":"a x",
      "36":"a x",
      "37":"a x",
      "38":"a x",
      "39":"a x",
      "40":"a x",
      "41":"a x",
      "42":"a x",
      "43":"a x",
      "44":"a x",
      "45":"a x",
      "46":"a x",
      "47":"a x",
      "48":"a x",
      "49":"a x",
      "50":"a",
      "51":"a",
      "52":"a",
      "53":"a"
    },
    "safari":{
      "3.1":"a x",
      "3.2":"a x",
      "4":"a x",
      "5":"a x",
      "5.1":"a x",
      "6":"a x",
      "6.1":"a x",
      "7":"a x",
      "7.1":"a x",
      "8":"a x",
      "9":"a",
      "9.1":"a",
      "TP":"a"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"y",
      "11.5":"y",
      "11.6":"y",
      "12":"y",
      "12.1":"y",
      "15":"a x",
      "16":"a x",
      "17":"a x",
      "18":"a x",
      "19":"a x",
      "20":"a x",
      "21":"a x",
      "22":"a x",
      "23":"a x",
      "24":"a x",
      "25":"a x",
      "26":"a x",
      "27":"a x",
      "28":"a x",
      "29":"a x",
      "30":"a x",
      "31":"a x",
      "32":"a x",
      "33":"a x",
      "34":"a x",
      "35":"a x",
      "36":"a x",
      "37":"a",
      "38":"a",
      "39":"a"
    },
    "ios_saf":{
      "3.2":"a x",
      "4.0-4.1":"a x",
      "4.2-4.3":"a x",
      "5.0-5.1":"a x",
      "6.0-6.1":"a x",
      "7.0-7.1":"a x",
      "8":"a x",
      "8.1-8.4":"a x",
      "9.0-9.2":"a",
      "9.3":"a"
    },
    "op_mini":{
      "5.0-8.0":"y"
    },
    "android":{
      "2.1":"a x",
      "2.2":"a x",
      "2.3":"a x",
      "3":"a x",
      "4":"a x",
      "4.1":"a x",
      "4.2-4.3":"a x",
      "4.4":"a x",
      "4.4.3-4.4.4":"a x",
      "50":"a x"
    },
    "bb":{
      "7":"a x",
      "10":"a x"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"y",
      "11.5":"y",
      "12":"y",
      "12.1":"y",
      "36":"a x"
    },
    "and_chr":{
      "50":"a"
    },
    "and_ff":{
      "46":"a x"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"a x"
    }
  },
  "notes":"Partial support refers to not supporting the `break-before`, `break-after`, `break-inside` properties. WebKit- and Blink-based browsers do have equivalent support for the non-standard `-webkit-column-break-*` properties to accomplish the same result (but only the `auto` and `always` values). Firefox does not support `break-*`.",
  "notes_by_num":{
    
  },
  "usage_perc_y":13.07,
  "usage_perc_a":80.99,
  "ucprefix":false,
  "parent":"",
  "keywords":"column-count,column-width,column-gap,column-rule,column-span,column-fill",
  "ie_id":"multicolumnfullsupport",
  "chrome_id":"6526151266664448,5630943616303104",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],83:[function(require,module,exports){
module.exports={
  "title":"CSS3 object-fit/object-position",
  "description":"Method of specifying how an object (image or video) should fit inside its box. object-fit options include \"contain\" (fit according to aspect ratio), \"fill\" (stretches object to fill) and \"cover\" (overflows box but maintains ratio), where object-position allows the object to be repositioned like background-image does.",
  "spec":"http://www.w3.org/TR/css3-images/",
  "status":"cr",
  "links":[
    {
      "url":"https://dev.opera.com/articles/view/css3-object-fit-object-position/",
      "title":"Dev.Opera article"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/object-fit",
      "title":"WebPlatform Docs"
    },
    {
      "url":"https://github.com/bfred-it/object-fit-images/",
      "title":"object-fit-images Polyfill for IE & Edge"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n"
    },
    "edge":{
      "12":"n",
      "13":"n",
      "14":"u"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"n",
      "7":"n",
      "7.1":"a #1",
      "8":"a #1",
      "9":"a #1",
      "9.1":"a #1",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"y x",
      "11":"y x",
      "11.1":"y x",
      "11.5":"y x",
      "11.6":"y x",
      "12":"y x",
      "12.1":"y x",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"n",
      "8":"a #1",
      "8.1-8.4":"a #1",
      "9.0-9.2":"a #1",
      "9.3":"a #1"
    },
    "op_mini":{
      "5.0-8.0":"y x"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"y",
      "50":"y"
    },
    "bb":{
      "7":"n",
      "10":"n"
    },
    "op_mob":{
      "10":"n",
      "11":"y x",
      "11.1":"y x",
      "11.5":"y x",
      "12":"y x",
      "12.1":"y x",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Partial support in Safari refers to support for `object-fit` but not `object-position`."
  },
  "usage_perc_y":61.59,
  "usage_perc_a":9.88,
  "ucprefix":false,
  "parent":"",
  "keywords":"objectfit,objectposition",
  "ie_id":"objectfitandobjectposition",
  "chrome_id":"5302669702856704",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],84:[function(require,module,exports){
module.exports={
  "title":"Pointer events",
  "description":"This specification integrates various inputs from mice, touchscreens, and pens, making separate implementations no longer necessary and authoring for cross-device pointers easier. Not to be mistaken with the unrelated \"pointer-events\" CSS property.",
  "spec":"http://www.w3.org/TR/pointerevents/",
  "status":"rec",
  "links":[
    {
      "url":"http://blogs.msdn.com/b/ie/archive/2011/09/20/touch-input-for-ie10-and-metro-style-apps.aspx",
      "title":"Implementation of Pointer Events in IE10"
    },
    {
      "url":"http://blogs.msdn.com/b/eternalcoding/archive/2013/01/16/hand-js-a-polyfill-for-supporting-pointer-events-on-every-browser.aspx",
      "title":"Hand.js, the polyfill for browsers only supporting Touch Events"
    },
    {
      "url":"http://blogs.msdn.com/b/davrous/archive/2013/02/20/handling-touch-in-your-html5-apps-thanks-to-the-pointer-events-of-ie10-and-windows-8.aspx",
      "title":"Article & tutorial"
    },
    {
      "url":"http://deeptissuejs.com",
      "title":"Abstraction library for pointer events"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "DOM",
    "JS API"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"a x #1",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"p",
      "7":"p",
      "8":"p",
      "9":"p",
      "10":"p",
      "11":"p",
      "12":"p",
      "13":"p",
      "14":"p",
      "15":"p",
      "16":"p",
      "17":"p",
      "18":"p",
      "19":"p",
      "20":"p",
      "21":"p",
      "22":"p",
      "23":"p",
      "24":"p",
      "25":"p",
      "26":"p",
      "27":"p",
      "28":"p",
      "29":"p",
      "30":"p",
      "31":"p",
      "32":"p",
      "33":"p",
      "34":"p",
      "35":"p",
      "36":"p",
      "37":"p",
      "38":"p",
      "39":"p",
      "40":"p",
      "41":"p d #2",
      "42":"p d #2",
      "43":"p d #2",
      "44":"p d #2",
      "45":"p d #2",
      "46":"p d #2",
      "47":"a #2",
      "48":"a #2",
      "49":"a #2"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"p",
      "23":"p",
      "24":"p",
      "25":"p",
      "26":"p",
      "27":"p",
      "28":"p",
      "29":"p",
      "30":"p",
      "31":"p",
      "32":"p",
      "33":"p",
      "34":"p",
      "35":"p",
      "36":"p",
      "37":"p",
      "38":"p",
      "39":"p",
      "40":"p",
      "41":"p",
      "42":"p",
      "43":"p",
      "44":"p",
      "45":"p",
      "46":"p",
      "47":"p",
      "48":"p",
      "49":"p",
      "50":"p",
      "51":"p",
      "52":"p",
      "53":"p"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"p",
      "7":"p",
      "7.1":"p",
      "8":"p",
      "9":"p",
      "9.1":"p",
      "TP":"p"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"p",
      "16":"p",
      "17":"p",
      "18":"p",
      "19":"p",
      "20":"p",
      "21":"p",
      "22":"p",
      "23":"p",
      "24":"p",
      "25":"p",
      "26":"p",
      "27":"p",
      "28":"p",
      "29":"p",
      "30":"p",
      "31":"p",
      "32":"p",
      "33":"p",
      "34":"p",
      "35":"p",
      "36":"p",
      "37":"p",
      "38":"p",
      "39":"p"
    },
    "ios_saf":{
      "3.2":"p",
      "4.0-4.1":"p",
      "4.2-4.3":"p",
      "5.0-5.1":"p",
      "6.0-6.1":"p",
      "7.0-7.1":"p",
      "8":"p",
      "8.1-8.4":"p",
      "9.0-9.2":"p",
      "9.3":"p"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"p",
      "2.2":"p",
      "2.3":"p",
      "3":"p",
      "4":"p",
      "4.1":"p",
      "4.2-4.3":"p",
      "4.4":"p",
      "4.4.3-4.4.4":"p",
      "50":"p"
    },
    "bb":{
      "7":"p",
      "10":"p"
    },
    "op_mob":{
      "10":"n",
      "11":"p",
      "11.1":"p",
      "11.5":"p",
      "12":"p",
      "12.1":"p",
      "36":"p"
    },
    "and_chr":{
      "50":"p"
    },
    "and_ff":{
      "46":"p"
    },
    "ie_mob":{
      "10":"a x",
      "11":"y"
    },
    "and_uc":{
      "9.9":"p"
    }
  },
  "notes":"Firefox, starting with version 28, provides the 'dom.w3c_pointer_events.enabled' flag to support this specification.",
  "notes_by_num":{
    "1":"Partial support in IE10 refers the lack of pointerenter and pointerleave events.",
    "2":"Firefox support is disabled by default and [only supports mouse input](https://hacks.mozilla.org/2015/08/pointer-events-now-in-firefox-nightly/). On Windows only, touch can be enabled with the `layers.async-pan-zoom.enabled` and `dom.w3c_touch_events.enabled` flags"
  },
  "usage_perc_y":7.06,
  "usage_perc_a":0.85,
  "ucprefix":false,
  "parent":"",
  "keywords":"pointerdown,pointermove,pointerup,pointercancel,pointerover,pointerout,pointerenter,pointerleave",
  "ie_id":"pointerevents",
  "chrome_id":"4504699138998272",
  "firefox_id":"pointer-events",
  "webkit_id":"",
  "shown":true
}

},{}],85:[function(require,module,exports){
module.exports={
  "title":"text-decoration styling",
  "description":"Method of defining the type, style and color of lines in the text-decoration property. These can be defined as shorthand (e.g. `text-decoration: line-through dashed blue`) or as single properties (e.g. `text-decoration-color: blue`)",
  "spec":"http://www.w3.org/TR/css-text-decor-3/#line-decoration",
  "status":"cr",
  "links":[
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style",
      "title":"MDN Documentation for text-decoration-style"
    },
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color",
      "title":"MDN Documentation for text-decoration-color"
    },
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line",
      "title":"MDN Documentation for text-decoration-line"
    },
    {
      "url":"https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6514536-text-decoration-styling",
      "title":"Microsoft Edge feature request on UserVoice"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n"
    },
    "edge":{
      "12":"n",
      "13":"n",
      "14":"u"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n x d #1",
      "27":"n x d #1",
      "28":"n x d #1",
      "29":"n x d #1",
      "30":"n x d #1",
      "31":"n x d #1",
      "32":"n x d #1",
      "33":"n x d #1",
      "34":"n x d #1",
      "35":"n x d #1",
      "36":"n x d #1",
      "37":"n x d #1",
      "38":"n x d #1",
      "39":"n x d #1",
      "40":"n x d #1",
      "41":"n x d #1",
      "42":"n x d #1",
      "43":"n x d #1",
      "44":"n x d #1",
      "45":"n x d #1",
      "46":"n x d #1",
      "47":"n x d #1",
      "48":"n x d #1",
      "49":"n x d #1",
      "50":"n x d #1",
      "51":"n x d #1",
      "52":"n x d #1",
      "53":"n x d #1"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"n",
      "7":"n",
      "7.1":"a x #2",
      "8":"a x #2",
      "9":"a x #2",
      "9.1":"a x #2",
      "TP":"a x #2"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n x d #1",
      "36":"n x d #1",
      "37":"n x d #1",
      "38":"n x d #1",
      "39":"n x d #1"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"n",
      "8":"a x #2",
      "8.1-8.4":"a x #2",
      "9.0-9.2":"a x #2",
      "9.3":"a x #2"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "50":"n"
    },
    "bb":{
      "7":"n",
      "10":"n"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"n"
    },
    "and_chr":{
      "50":"n x d #1"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"n"
    }
  },
  "notes":"All browsers support the CSS2 version of `text-decoration`, which matches only the `text-decoration-line` values (`underline`, etc.)",
  "notes_by_num":{
    "1":"Enabled in Chrome through the \"experimental Web Platform features\" flag in chrome://flags",
    "2":"Partial support in Safari refers to not supporting the text-decoration-style property."
  },
  "usage_perc_y":8.28,
  "usage_perc_a":9.88,
  "ucprefix":false,
  "parent":"",
  "keywords":"text-decoration-line,text-decoration-style,text-decoration-color",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],86:[function(require,module,exports){
module.exports={
  "title":"text-emphasis styling",
  "description":"Method of using small symbols next to each glyph to emphasize a run of text, commonly used in East Asian languages. The `text-emphasis` shorthand, and its `text-emphasis-style` and `text-emphasis-color` longhands, can be used to apply marks to the text. The `text-emphasis-position` property, which inherits separately, allows setting the emphasis marks' position with respect to the text.",
  "spec":"https://drafts.csswg.org/css-text-decor-3/#text-emphasis-property",
  "status":"cr",
  "links":[
    {
      "url":"https://github.com/zmmbreeze/jquery.emphasis/",
      "title":"A javascript fallback for CSS3 emphasis mark."
    },
    {
      "url":"https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6514536-text-decoration-styling",
      "title":"Microsoft Edge feature request on UserVoice"
    },
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis",
      "title":"Mozilla Developer Network"
    }
  ],
  "bugs":[
    {
      "description":"Chrome on Android occasionally has issues rendering emphasis glyphs correctly."
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n"
    },
    "edge":{
      "12":"n",
      "13":"n",
      "14":"u"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n",
      "41":"n",
      "42":"n",
      "43":"n",
      "44":"n",
      "45":"n d #2",
      "46":"n d #2",
      "47":"n d #2",
      "48":"n d #2",
      "49":"n d #2"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"a x #1",
      "26":"a x #1",
      "27":"a x #1",
      "28":"a x #1",
      "29":"a x #1",
      "30":"a x #1",
      "31":"a x #1",
      "32":"a x #1",
      "33":"a x #1",
      "34":"a x #1",
      "35":"a x #1",
      "36":"a x #1",
      "37":"a x #1",
      "38":"a x #1",
      "39":"a x #1",
      "40":"a x #1",
      "41":"a x #1",
      "42":"a x #1",
      "43":"a x #1",
      "44":"a x #1",
      "45":"a x #1",
      "46":"a x #1",
      "47":"a x #1",
      "48":"a x #1",
      "49":"a x #1",
      "50":"a x #1",
      "51":"a x #1",
      "52":"a x #1",
      "53":"a x #1"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n",
      "6":"n",
      "6.1":"a x #1",
      "7":"a x #1",
      "7.1":"y",
      "8":"y",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"a x #1",
      "16":"a x #1",
      "17":"a x #1",
      "18":"a x #1",
      "19":"a x #1",
      "20":"a x #1",
      "21":"a x #1",
      "22":"a x #1",
      "23":"a x #1",
      "24":"a x #1",
      "25":"a x #1",
      "26":"a x #1",
      "27":"a x #1",
      "28":"a x #1",
      "29":"a x #1",
      "30":"a x #1",
      "31":"a x #1",
      "32":"a x #1",
      "33":"a x #1",
      "34":"a x #1",
      "35":"a x #1",
      "36":"a x #1",
      "37":"a x #1",
      "38":"a x #1",
      "39":"a x #1"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"n",
      "6.0-6.1":"n",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.4":"y",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"a x #1",
      "4.4.3-4.4.4":"a x #1",
      "50":"a x #1"
    },
    "bb":{
      "7":"n",
      "10":"a x #1"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"a x #1"
    },
    "and_chr":{
      "50":"a x #1"
    },
    "and_ff":{
      "46":"n"
    },
    "ie_mob":{
      "10":"n",
      "11":"n"
    },
    "and_uc":{
      "9.9":"a x #1"
    }
  },
  "notes":"Some old WebKit browsers (like Chrome 24) support `-webkit-text-emphasis`, but does not support CJK languages and is therefore considered unsupported.",
  "notes_by_num":{
    "1":"Partial support refers to incorrect support for `-webkit-text-emphasis-position`. These browsers support `over` and `under` as values, but not the added `left` and `right` values required by the spec.",
    "2":"Can be enabled in Firefox using the `layout.css.text-emphasis.enabled` flag"
  },
  "usage_perc_y":10.13,
  "usage_perc_a":60.66,
  "ucprefix":false,
  "parent":"",
  "keywords":"text-emphasis,text-emphasis-position,text-emphasis-style,text-emphasis-color",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],87:[function(require,module,exports){
module.exports={
  "title":"CSS3 Text-overflow",
  "description":"Append ellipsis when text overflows its containing element",
  "spec":"http://www.w3.org/TR/css3-ui/#text-overflow",
  "status":"cr",
  "links":[
    {
      "url":"https://github.com/rmorse/AutoEllipsis",
      "title":"jQuery polyfill for Firefox"
    },
    {
      "url":"https://developer.mozilla.org/En/CSS/Text-overflow",
      "title":"MDN article"
    },
    {
      "url":"http://www.css3files.com/text/",
      "title":"Information page"
    },
    {
      "url":"https://raw.github.com/phiggins42/has.js/master/detect/css.js#css-text-overflow",
      "title":"has.js test"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/properties/text-overflow",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"Does not work on `select` elements work in Chrome and IE, only Firefox."
    },
    {
      "description":"Some Samsung-based browsers, have a bug with overflowing text when ellipsis is set and if `text-rendering` is not `auto`."
    },
    {
      "description":"Does not work in IE8 and IE9 on `<input type=\"text\">`"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"y",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"p",
      "3":"p",
      "3.5":"p",
      "3.6":"p",
      "4":"p",
      "5":"p",
      "6":"p",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"y",
      "5":"y",
      "6":"y",
      "7":"y",
      "8":"y",
      "9":"y",
      "10":"y",
      "11":"y",
      "12":"y",
      "13":"y",
      "14":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"y",
      "3.2":"y",
      "4":"y",
      "5":"y",
      "5.1":"y",
      "6":"y",
      "6.1":"y",
      "7":"y",
      "7.1":"y",
      "8":"y",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"y x",
      "9.5-9.6":"y x",
      "10.0-10.1":"y x",
      "10.5":"y x",
      "10.6":"y x",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "11.6":"y",
      "12":"y",
      "12.1":"y",
      "15":"y",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"y",
      "4.0-4.1":"y",
      "4.2-4.3":"y",
      "5.0-5.1":"y",
      "6.0-6.1":"y",
      "7.0-7.1":"y",
      "8":"y",
      "8.1-8.4":"y",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"y"
    },
    "android":{
      "2.1":"y",
      "2.2":"y",
      "2.3":"y",
      "3":"y",
      "4":"y",
      "4.1":"y",
      "4.2-4.3":"y",
      "4.4":"y",
      "4.4.3-4.4.4":"y",
      "50":"y"
    },
    "bb":{
      "7":"y",
      "10":"y"
    },
    "op_mob":{
      "10":"y x",
      "11":"y x",
      "11.1":"y x",
      "11.5":"y x",
      "12":"y x",
      "12.1":"y",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y"
    }
  },
  "notes":"",
  "notes_by_num":{
    
  },
  "usage_perc_y":95.34,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"textoverflow,ellipsis",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],88:[function(require,module,exports){
module.exports={
  "title":"CSS text-size-adjust",
  "description":"On mobile devices, the text-size-adjust CSS property allows Web authors to control if and how the text-inflating algorithm is applied to the textual content of the element it is applied to.",
  "spec":"http://dev.w3.org/csswg/css-size-adjust/",
  "status":"unoff",
  "links":[
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust",
      "title":"MDN Docs"
    }
  ],
  "bugs":[
    
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n"
    },
    "edge":{
      "12":"n",
      "13":"n",
      "14":"u"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n",
      "41":"n",
      "42":"n",
      "43":"n",
      "44":"n",
      "45":"n",
      "46":"n",
      "47":"n",
      "48":"n",
      "49":"n"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"n",
      "13":"n",
      "14":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n #2",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n",
      "40":"n",
      "41":"n",
      "42":"n",
      "43":"n",
      "44":"n",
      "45":"n",
      "46":"n",
      "47":"n",
      "48":"n",
      "49":"n",
      "50":"n",
      "51":"n",
      "52":"n",
      "53":"n"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"n",
      "5":"n",
      "5.1":"n #2",
      "6":"n",
      "6.1":"n",
      "7":"n",
      "7.1":"n",
      "8":"n",
      "9":"n",
      "9.1":"n",
      "TP":"n"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"n",
      "16":"n",
      "17":"n",
      "18":"n",
      "19":"n",
      "20":"n",
      "21":"n",
      "22":"n",
      "23":"n",
      "24":"n",
      "25":"n",
      "26":"n",
      "27":"n",
      "28":"n",
      "29":"n",
      "30":"n",
      "31":"n",
      "32":"n",
      "33":"n",
      "34":"n",
      "35":"n",
      "36":"n",
      "37":"n",
      "38":"n",
      "39":"n"
    },
    "ios_saf":{
      "3.2":"n",
      "4.0-4.1":"n",
      "4.2-4.3":"n",
      "5.0-5.1":"y x",
      "6.0-6.1":"y x",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.4":"y x",
      "9.0-9.2":"y x",
      "9.3":"y x"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"n",
      "4":"n",
      "4.1":"n",
      "4.2-4.3":"n",
      "4.4":"n",
      "4.4.3-4.4.4":"n",
      "50":"n"
    },
    "bb":{
      "7":"n",
      "10":"n"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"n"
    },
    "and_chr":{
      "50":"n"
    },
    "and_ff":{
      "46":"y x"
    },
    "ie_mob":{
      "10":"y x #1",
      "11":"y x #1"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"If the viewport size is set using a `<meta>` element, the `-ms-text-size-adjust` property is ignored. See [MSDN](https://msdn.microsoft.com/en-us/library/ie/dn793579%28v=vs.85%29.aspx)",
    "2":"Old versions of WebKit-based desktop browsers (Chrome<27, Safari<6) [suffer from a bug](https://bugs.webkit.org/show_bug.cgi?id=56543) where if `-webkit-text-size-adjust` is explicitly set to `none`, instead of ignoring the property, the browsers will prevent the user from zooming in or out on the webpage."
  },
  "usage_perc_y":18.06,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],89:[function(require,module,exports){
module.exports={
  "title":"CSS3 2D Transforms",
  "description":"Method of transforming an element including rotating, scaling, etc. Includes support for `transform` as well as `transform-origin` properties.",
  "spec":"http://www.w3.org/TR/css3-2d-transforms/",
  "status":"wd",
  "links":[
    {
      "url":"http://www.westciv.com/tools/transforms/",
      "title":"Live editor"
    },
    {
      "url":"https://developer.mozilla.org/en-US/docs/Web/CSS/transform",
      "title":"MDN article"
    },
    {
      "url":"http://www.webresourcesdepot.com/cross-browser-css-transforms-csssandpaper/",
      "title":"Workaround script for IE"
    },
    {
      "url":"http://www.css3files.com/transform/",
      "title":"Information page"
    },
    {
      "url":"http://www.useragentman.com/IETransformsTranslator/",
      "title":"Converter for IE"
    },
    {
      "url":"https://raw.github.com/phiggins42/has.js/master/detect/css.js#css-transform",
      "title":"has.js test"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/transforms/transform",
      "title":"WebPlatform Docs"
    }
  ],
  "bugs":[
    {
      "description":"Scaling transforms in Android 2.3 fails to scale element background images."
    },
    {
      "description":"IE 10 and below does not support CSS transforms on SVG elements (though SVG transform attributes do work)."
    },
    {
      "description":"In IE9 the caret of a `textarea` disappears when you use translate."
    },
    {
      "description":"Firefox 42 and below do not support [`transform-origin` on SVG elements](https://bugzilla.mozilla.org/show_bug.cgi?id=923193). "
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"p",
      "7":"p",
      "8":"p",
      "9":"y x",
      "10":"y",
      "11":"y"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"y x",
      "3.6":"y x",
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"y x",
      "3.2":"y x",
      "4":"y x",
      "5":"y x",
      "5.1":"y x",
      "6":"y x",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x",
      "9":"y",
      "9.1":"y",
      "TP":"y"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"y x",
      "10.6":"y x",
      "11":"y x",
      "11.1":"y x",
      "11.5":"y x",
      "11.6":"y x",
      "12":"y x",
      "12.1":"y",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"y x",
      "4.0-4.1":"y x",
      "4.2-4.3":"y x",
      "5.0-5.1":"y x",
      "6.0-6.1":"y x",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.4":"y x",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"y x",
      "2.2":"y x",
      "2.3":"y x",
      "3":"y x",
      "4":"y x",
      "4.1":"y x",
      "4.2-4.3":"y x",
      "4.4":"y x",
      "4.4.3-4.4.4":"y x",
      "50":"y"
    },
    "bb":{
      "7":"y x",
      "10":"y x"
    },
    "op_mob":{
      "10":"n",
      "11":"y",
      "11.1":"y",
      "11.5":"y",
      "12":"y",
      "12.1":"y",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"y",
      "11":"y"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"The scale transform can be emulated in IE < 9 using Microsoft's \"zoom\" extension, others are (not easily) possible using the MS Matrix filter",
  "notes_by_num":{
    
  },
  "usage_perc_y":89.52,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"transformation,translate,translatex,translatey,translatez,transform3d,rotation,rotate,scale,css-transforms,transform-origin,transform:rotate,transform:scale",
  "ie_id":"transforms",
  "chrome_id":"6437640580628480",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],90:[function(require,module,exports){
module.exports={
  "title":"CSS3 3D Transforms",
  "description":"Method of transforming an element in the third dimension using the `transform` property. Includes support for the `perspective` property to set the perspective in z-space and the `backface-visibility` property to toggle display of the reverse side of a 3D-transformed element.",
  "spec":"http://www.w3.org/TR/css3-3d-transforms/",
  "status":"wd",
  "links":[
    {
      "url":"http://css3.bradshawenterprises.com/flip/",
      "title":"Multi-browser demo"
    },
    {
      "url":"http://hacks.mozilla.org/2011/10/css-3d-transformations-in-firefox-nightly/",
      "title":"Mozilla hacks article"
    },
    {
      "url":"http://thewebrocks.com/demos/3D-css-tester/",
      "title":"3D CSS Tester"
    },
    {
      "url":"https://raw.github.com/phiggins42/has.js/master/detect/css.js#css-transform",
      "title":"has.js test"
    },
    {
      "url":"http://docs.webplatform.org/wiki/css/transforms/transform",
      "title":"WebPlatform Docs"
    },
    {
      "url":"http://desandro.github.io/3dtransforms/",
      "title":"Intro to CSS 3D transforms"
    }
  ],
  "bugs":[
    {
      "description":"Some configurations of Linux and older Windows machines (those without WebGL support) have trouble with 3D transforms and will treat them as if `perspective` was set as `none`."
    },
    {
      "description":"Firefox on Windows [incorrectly renders plugin content within no-op 3D transforms](https://bugzilla.mozilla.org/show_bug.cgi?id=1048279)."
    },
    {
      "description":"The `perspective` property doesn't work on the `body` element in Firefox, it must be used on an inner element."
    },
    {
      "description":"Chrome has a (recently fixed) bug where combining `clip-path` and `backface-visibility` produces [visible noise](https://code.google.com/p/chromium/issues/detail?id=350724)."
    },
    {
      "description":"Transforms may break position:fixed styles of contained elements"
    }
  ],
  "categories":[
    "CSS3"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"a #1",
      "11":"a #1"
    },
    "edge":{
      "12":"y",
      "13":"y",
      "14":"y"
    },
    "firefox":{
      "2":"n",
      "3":"n",
      "3.5":"n",
      "3.6":"n",
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y",
      "17":"y",
      "18":"y",
      "19":"y",
      "20":"y",
      "21":"y",
      "22":"y",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y"
    },
    "chrome":{
      "4":"n",
      "5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"n",
      "11":"n",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y",
      "40":"y",
      "41":"y",
      "42":"y",
      "43":"y",
      "44":"y",
      "45":"y",
      "46":"y",
      "47":"y",
      "48":"y",
      "49":"y",
      "50":"y",
      "51":"y",
      "52":"y",
      "53":"y"
    },
    "safari":{
      "3.1":"n",
      "3.2":"n",
      "4":"y x",
      "5":"y x",
      "5.1":"y x",
      "6":"y x",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x",
      "9":"y #2",
      "9.1":"y #2",
      "TP":"y #2"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y",
      "24":"y",
      "25":"y",
      "26":"y",
      "27":"y",
      "28":"y",
      "29":"y",
      "30":"y",
      "31":"y",
      "32":"y",
      "33":"y",
      "34":"y",
      "35":"y",
      "36":"y",
      "37":"y",
      "38":"y",
      "39":"y"
    },
    "ios_saf":{
      "3.2":"y x",
      "4.0-4.1":"y x",
      "4.2-4.3":"y x",
      "5.0-5.1":"y x",
      "6.0-6.1":"y x",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.4":"y x",
      "9.0-9.2":"y",
      "9.3":"y"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"n",
      "2.2":"n",
      "2.3":"n",
      "3":"y x",
      "4":"y x",
      "4.1":"y x",
      "4.2-4.3":"y x",
      "4.4":"y x",
      "4.4.3-4.4.4":"y x",
      "50":"y"
    },
    "bb":{
      "7":"y x",
      "10":"y x"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"y"
    },
    "and_chr":{
      "50":"y"
    },
    "and_ff":{
      "46":"y"
    },
    "ie_mob":{
      "10":"a #1",
      "11":"a #1"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"",
  "notes_by_num":{
    "1":"Partial support in IE refers to not supporting [the transform-style: preserve-3d property](http://msdn.microsoft.com/en-us/library/ie/hh673529%28v=vs.85%29.aspx#the_ms_transform_style_property). This prevents nesting 3D transformed elements.",
    "2":"Safari 9 is reported to still require a prefix for the related `backface-visibility` property."
  },
  "usage_perc_y":81.95,
  "usage_perc_a":6.66,
  "ucprefix":false,
  "parent":"",
  "keywords":"css 3d,3dtransforms,translate3d,backface visibility,perspective,transform-origin,transform-style",
  "ie_id":"transforms,csstransformspreserve3d",
  "chrome_id":"6437640580628480",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],91:[function(require,module,exports){
module.exports={
  "title":"CSS user-select: none",
  "description":"Method of preventing text/element selection using CSS. ",
  "spec":"https://drafts.csswg.org/css-ui-4/#valdef-user-select-none",
  "status":"wd",
  "links":[
    {
      "url":"https://developer.mozilla.org/en-US/docs/CSS/user-select",
      "title":"MDN article"
    },
    {
      "url":"http://css-tricks.com/almanac/properties/u/user-select/",
      "title":"CSS Tricks article"
    },
    {
      "url":"http://msdn.microsoft.com/en-us/library/ie/hh781492(v=vs.85).aspx",
      "title":"MSDN Documentation"
    }
  ],
  "bugs":[
    {
      "description":"iOS does not allow input elements to be focused (and thus prevents text input) when the element has `-webkit-user-select: none` set"
    },
    {
      "description":"Reported to not work in some manufacturer's versions of Android 4.0 and below, though confirmed to work in others."
    }
  ],
  "categories":[
    "CSS"
  ],
  "stats":{
    "ie":{
      "5.5":"n",
      "6":"n",
      "7":"n",
      "8":"n",
      "9":"n",
      "10":"y x",
      "11":"y x"
    },
    "edge":{
      "12":"y x",
      "13":"y x",
      "14":"y x"
    },
    "firefox":{
      "2":"y x",
      "3":"y x",
      "3.5":"y x",
      "3.6":"y x",
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x",
      "41":"y x",
      "42":"y x",
      "43":"y x",
      "44":"y x",
      "45":"y x",
      "46":"y x",
      "47":"y x",
      "48":"y x",
      "49":"y x"
    },
    "chrome":{
      "4":"y x",
      "5":"y x",
      "6":"y x",
      "7":"y x",
      "8":"y x",
      "9":"y x",
      "10":"y x",
      "11":"y x",
      "12":"y x",
      "13":"y x",
      "14":"y x",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x",
      "40":"y x",
      "41":"y x",
      "42":"y x",
      "43":"y x",
      "44":"y x",
      "45":"y x",
      "46":"y x",
      "47":"y x",
      "48":"y x",
      "49":"y x",
      "50":"y x",
      "51":"y x",
      "52":"y x",
      "53":"y x"
    },
    "safari":{
      "3.1":"y x",
      "3.2":"y x",
      "4":"y x",
      "5":"y x",
      "5.1":"y x",
      "6":"y x",
      "6.1":"y x",
      "7":"y x",
      "7.1":"y x",
      "8":"y x",
      "9":"y x",
      "9.1":"y x",
      "TP":"y x"
    },
    "opera":{
      "9":"n",
      "9.5-9.6":"n",
      "10.0-10.1":"n",
      "10.5":"n",
      "10.6":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "11.6":"n",
      "12":"n",
      "12.1":"n",
      "15":"y x",
      "16":"y x",
      "17":"y x",
      "18":"y x",
      "19":"y x",
      "20":"y x",
      "21":"y x",
      "22":"y x",
      "23":"y x",
      "24":"y x",
      "25":"y x",
      "26":"y x",
      "27":"y x",
      "28":"y x",
      "29":"y x",
      "30":"y x",
      "31":"y x",
      "32":"y x",
      "33":"y x",
      "34":"y x",
      "35":"y x",
      "36":"y x",
      "37":"y x",
      "38":"y x",
      "39":"y x"
    },
    "ios_saf":{
      "3.2":"y x",
      "4.0-4.1":"y x",
      "4.2-4.3":"y x",
      "5.0-5.1":"y x",
      "6.0-6.1":"y x",
      "7.0-7.1":"y x",
      "8":"y x",
      "8.1-8.4":"y x",
      "9.0-9.2":"y x",
      "9.3":"y x"
    },
    "op_mini":{
      "5.0-8.0":"n"
    },
    "android":{
      "2.1":"y x",
      "2.2":"y x",
      "2.3":"y x",
      "3":"y x",
      "4":"y x",
      "4.1":"y x",
      "4.2-4.3":"y x",
      "4.4":"y x",
      "4.4.3-4.4.4":"y x",
      "50":"y x"
    },
    "bb":{
      "7":"y x",
      "10":"y x"
    },
    "op_mob":{
      "10":"n",
      "11":"n",
      "11.1":"n",
      "11.5":"n",
      "12":"n",
      "12.1":"n",
      "36":"y x"
    },
    "and_chr":{
      "50":"y x"
    },
    "and_ff":{
      "46":"y x"
    },
    "ie_mob":{
      "10":"y x",
      "11":"y x"
    },
    "and_uc":{
      "9.9":"y x"
    }
  },
  "notes":"",
  "notes_by_num":{
    
  },
  "usage_perc_y":88.89,
  "usage_perc_a":0,
  "ucprefix":false,
  "parent":"",
  "keywords":"",
  "ie_id":"",
  "chrome_id":"",
  "firefox_id":"",
  "webkit_id":"",
  "shown":true
}

},{}],92:[function(require,module,exports){
//最大公约数 Greatest Common Divisor
function GCD(a, b) {
  if (b === 0) return a
  return GCD(b, a % b)
}

function findPrecision(n) {
  var e = 1

  while (Math.round(n * e) / e !== n) {
    e *= 10
  }

  return e
}

function num2fraction(num) {
  if (num === 0) return 0

  if (typeof num === 'string') {
    num = parseFloat(num)
  }


  var precision = findPrecision(num) //精确度
  var number = num * precision
  var gcd = GCD(number, precision)

  //分子
  var numerator = number / gcd
  //分母
  var denominator = precision / gcd

  //分数
  return numerator + '/' + denominator
}

module.exports = num2fraction


},{}],93:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Container = _interopRequire(require("./container"));

// CSS at-rule like “this.keyframes name { }”.
//
// Can contain declarations (like this.font-face or this.page) ot another rules.

var AtRule = (function (Container) {
    function AtRule(defaults) {
        _classCallCheck(this, AtRule);

        this.type = "atrule";
        Container.call(this, defaults);
    }

    _inherits(AtRule, Container);

    // Stringify at-rule

    AtRule.prototype.stringify = function stringify(builder, semicolon) {
        var name = "@" + this.name;
        var params = this.params ? this.stringifyRaw("params") : "";

        if (typeof this.afterName != "undefined") {
            name += this.afterName;
        } else if (params) {
            name += " ";
        }

        if (this.nodes) {
            this.stringifyBlock(builder, name + params);
        } else {
            var before = this.style("before");
            if (before) builder(before);
            var end = (this.between || "") + (semicolon ? ";" : "");
            builder(name + params + end, this);
        }
    };

    // Hack to mark, that at-rule contains children

    AtRule.prototype.append = function append(child) {
        if (!this.nodes) this.nodes = [];
        return Container.prototype.append.call(this, child);
    };

    // Hack to mark, that at-rule contains children

    AtRule.prototype.prepend = function prepend(child) {
        if (!this.nodes) this.nodes = [];
        return Container.prototype.prepend.call(this, child);
    };

    // Hack to mark, that at-rule contains children

    AtRule.prototype.insertBefore = function insertBefore(exist, add) {
        if (!this.nodes) this.nodes = [];
        return Container.prototype.insertBefore.call(this, exist, add);
    };

    // Hack to mark, that at-rule contains children

    AtRule.prototype.insertAfter = function insertAfter(exist, add) {
        if (!this.nodes) this.nodes = [];
        return Container.prototype.insertAfter.call(this, exist, add);
    };

    return AtRule;
})(Container);

module.exports = AtRule;
},{"./container":95}],94:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Node = _interopRequire(require("./node"));

// CSS comment between declarations or rules

var Comment = (function (Node) {
    function Comment(defaults) {
        _classCallCheck(this, Comment);

        this.type = "comment";
        Node.call(this, defaults);
    }

    _inherits(Comment, Node);

    // Stringify declaration

    Comment.prototype.stringify = function stringify(builder) {
        var before = this.style("before");
        if (before) builder(before);
        var left = this.style("left", "commentLeft");
        var right = this.style("right", "commentRight");
        builder("/*" + left + this.text + right + "*/", this);
    };

    return Comment;
})(Node);

module.exports = Comment;
},{"./node":101}],95:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Declaration = _interopRequire(require("./declaration"));

var Comment = _interopRequire(require("./comment"));

var Node = _interopRequire(require("./node"));

// CSS node, that contain another nodes (like at-rules or rules with selectors)

var Container = (function (Node) {
    function Container() {
        _classCallCheck(this, Container);

        if (Node != null) {
            Node.apply(this, arguments);
        }
    }

    _inherits(Container, Node);

    // Stringify container children

    Container.prototype.stringifyContent = function stringifyContent(builder) {
        if (!this.nodes) {
            return;
        }var i,
            last = this.nodes.length - 1;
        while (last > 0) {
            if (this.nodes[last].type != "comment") break;
            last -= 1;
        }

        var semicolon = this.style("semicolon");
        for (i = 0; i < this.nodes.length; i++) {
            this.nodes[i].stringify(builder, last != i || semicolon);
        }
    };

    // Stringify node with start (for example, selector) and brackets block
    // with child inside

    Container.prototype.stringifyBlock = function stringifyBlock(builder, start) {
        var before = this.style("before");
        if (before) builder(before);

        var between = this.style("between", "beforeOpen");
        builder(start + between + "{", this, "start");

        var after;
        if (this.nodes && this.nodes.length) {
            this.stringifyContent(builder);
            after = this.style("after");
        } else {
            after = this.style("after", "emptyBody");
        }

        if (after) builder(after);
        builder("}", this, "end");
    };

    // Add child to end of list without any checks.
    // Please, use `append()` method, `push()` is mostly for parser.

    Container.prototype.push = function push(child) {
        child.parent = this;
        this.nodes.push(child);
        return this;
    };

    // Execute `callback` on every child element. First arguments will be child
    // node, second will be index.
    //
    //   css.each( (rule, i) => {
    //       console.log(rule.type + ' at ' + i);
    //   });
    //
    // It is safe for add and remove elements to list while iterating:
    //
    //  css.each( (rule) => {
    //      css.insertBefore( rule, addPrefix(rule) );
    //      # On next iteration will be next rule, regardless of that
    //      # list size was increased
    //  });

    Container.prototype.each = function each(callback) {
        if (!this.lastEach) this.lastEach = 0;
        if (!this.indexes) this.indexes = {};

        this.lastEach += 1;
        var id = this.lastEach;
        this.indexes[id] = 0;

        if (!this.nodes) {
            return;
        }var index, result;
        while (this.indexes[id] < this.nodes.length) {
            index = this.indexes[id];
            result = callback(this.nodes[index], index);
            if (result === false) break;

            this.indexes[id] += 1;
        }

        delete this.indexes[id];

        if (result === false) {
            return false;
        }
    };

    // Execute callback on every child in all rules inside.
    //
    // First argument will be child node, second will be index inside parent.
    //
    //   css.eachInside( (node, i) => {
    //       console.log(node.type + ' at ' + i);
    //   });
    //
    // Also as `each` it is safe of insert/remove nodes inside iterating.

    Container.prototype.eachInside = function eachInside(callback) {
        return this.each(function (child, i) {
            var result = callback(child, i);

            if (result !== false && child.eachInside) {
                result = child.eachInside(callback);
            }

            if (result === false) return result;
        });
    };

    // Execute callback on every declaration in all rules inside.
    // It will goes inside at-rules recursivelly.
    //
    // First argument will be declaration node, second will be index inside
    // parent rule.
    //
    //   css.eachDecl( (decl, i) => {
    //       console.log(decl.prop + ' in ' + decl.parent.selector + ':' + i);
    //   });
    //
    // Also as `each` it is safe of insert/remove nodes inside iterating.
    //
    // You can filter declrataion by property name:
    //
    //   css.eachDecl('background', (decl) => { });

    Container.prototype.eachDecl = function eachDecl(prop, callback) {
        if (!callback) {
            callback = prop;
            return this.eachInside(function (child, i) {
                if (child.type == "decl") {
                    var result = callback(child, i);
                    if (result === false) return result;
                }
            });
        } else if (prop instanceof RegExp) {
            return this.eachInside(function (child, i) {
                if (child.type == "decl" && prop.test(child.prop)) {
                    var result = callback(child, i);
                    if (result === false) return result;
                }
            });
        } else {
            return this.eachInside(function (child, i) {
                if (child.type == "decl" && child.prop == prop) {
                    var result = callback(child, i);
                    if (result === false) return result;
                }
            });
        }
    };

    // Execute `callback` on every rule in conatiner and inside child at-rules.
    //
    // First argument will be rule node, second will be index inside parent.
    //
    //   css.eachRule( (rule, i) => {
    //       if ( parent.type == 'atrule' ) {
    //           console.log(rule.selector + ' in ' + rule.parent.name);
    //       } else {
    //           console.log(rule.selector + ' at ' + i);
    //       }
    //   });

    Container.prototype.eachRule = function eachRule(callback) {
        return this.eachInside(function (child, i) {
            if (child.type == "rule") {
                var result = callback(child, i);
                if (result === false) return result;
            }
        });
    };

    // Execute `callback` on every at-rule in conatiner and inside at-rules.
    //
    // First argument will be at-rule node, second will be index inside parent.
    //
    //   css.eachAtRule( (atrule, parent, i) => {
    //       if ( parent.type == 'atrule' ) {
    //           console.log(atrule.name + ' in ' + atrule.parent.name);
    //       } else {
    //           console.log(atrule.name + ' at ' + i);
    //       }
    //   });
    //
    // You can filter at-rules by name:
    //
    //   css.eachAtRule('keyframes', (atrule) => { });

    Container.prototype.eachAtRule = function eachAtRule(name, callback) {
        if (!callback) {
            callback = name;
            return this.eachInside(function (child, i) {
                if (child.type == "atrule") {
                    var result = callback(child, i);
                    if (result === false) return result;
                }
            });
        } else if (name instanceof RegExp) {
            return this.eachInside(function (child, i) {
                if (child.type == "atrule" && name.test(child.name)) {
                    var result = callback(child, i);
                    if (result === false) return result;
                }
            });
        } else {
            return this.eachInside(function (child, i) {
                if (child.type == "atrule" && child.name == name) {
                    var result = callback(child, i);
                    if (result === false) return result;
                }
            });
        }
    };

    // Execute callback on every block comment (only between rules
    // and declarations, not inside selectors and values) in all rules inside.
    //
    // First argument will be comment node, second will be index inside
    // parent rule.
    //
    //   css.eachComment( (comment, i) => {
    //       console.log(comment.content + ' at ' + i);
    //   });
    //
    // Also as `each` it is safe of insert/remove nodes inside iterating.

    Container.prototype.eachComment = function eachComment(callback) {
        return this.eachInside(function (child, i) {
            if (child.type == "comment") {
                var result = callback(child, i);
                if (result === false) return result;
            }
        });
    };

    // Add child to container.
    //
    //   css.append(rule);
    //
    // You can add declaration by hash:
    //
    //   rule.append({ prop: 'color', value: 'black' });

    Container.prototype.append = function append(child) {
        var nodes = this.normalize(child, this.last);
        for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var node = _ref;
            this.nodes.push(node);
        }return this;
    };

    // Add child to beginning of container
    //
    //   css.prepend(rule);
    //
    // You can add declaration by hash:
    //
    //   rule.prepend({ prop: 'color', value: 'black' });

    Container.prototype.prepend = function prepend(child) {
        var nodes = this.normalize(child, this.first, "prepend").reverse();
        for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var node = _ref;
            this.nodes.unshift(node);
        }for (var id in this.indexes) {
            this.indexes[id] = this.indexes[id] + nodes.length;
        }

        return this;
    };

    // Insert new `added` child before `exist`.
    // You can set node object or node index (it will be faster) in `exist`.
    //
    //   css.insertAfter(1, rule);
    //
    // You can add declaration by hash:
    //
    //   rule.insertBefore(1, { prop: 'color', value: 'black' });

    Container.prototype.insertBefore = function insertBefore(exist, add) {
        exist = this.index(exist);

        var type = exist === 0 ? "prepend" : false;
        var nodes = this.normalize(add, this.nodes[exist], type).reverse();
        for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var node = _ref;
            this.nodes.splice(exist, 0, node);
        }var index;
        for (var id in this.indexes) {
            index = this.indexes[id];
            if (exist <= index) {
                this.indexes[id] = index + nodes.length;
            }
        }

        return this;
    };

    // Insert new `added` child after `exist`.
    // You can set node object or node index (it will be faster) in `exist`.
    //
    //   css.insertAfter(1, rule);
    //
    // You can add declaration by hash:
    //
    //   rule.insertAfter(1, { prop: 'color', value: 'black' });

    Container.prototype.insertAfter = function insertAfter(exist, add) {
        exist = this.index(exist);

        var nodes = this.normalize(add, this.nodes[exist]).reverse();
        for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var node = _ref;
            this.nodes.splice(exist + 1, 0, node);
        }var index;
        for (var id in this.indexes) {
            index = this.indexes[id];
            if (exist < index) {
                this.indexes[id] = index + nodes.length;
            }
        }

        return this;
    };

    // Remove `child` by index or node.
    //
    //   css.remove(2);

    Container.prototype.remove = function remove(child) {
        child = this.index(child);
        this.nodes[child].parent = undefined;
        this.nodes.splice(child, 1);

        var index;
        for (var id in this.indexes) {
            index = this.indexes[id];
            if (index >= child) {
                this.indexes[id] = index - 1;
            }
        }

        return this;
    };

    // Remove all children in node.
    //
    //   css.removeAll();

    Container.prototype.removeAll = function removeAll() {
        for (var _iterator = this.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var node = _ref;
            node.parent = undefined;
        }this.nodes = [];
        return this;
    };

    // Recursivelly check all declarations inside node and replace
    // `regexp` by `callback`.
    //
    //   css.replaceValues('black', '#000');
    //
    // Argumets `regexp` and `callback` is same as in `String#replace()`.
    //
    // You can speed up checks by `props` and `fast` options:
    //
    //   css.replaceValues(/\d+rem/, { fast: 'rem', props: ['width'] },
    //       function (str) {
    //           return (14 * parseInt(str)) + 'px';
    //       })

    Container.prototype.replaceValues = function replaceValues(regexp, opts, callback) {
        if (!callback) {
            callback = opts;
            opts = {};
        }

        this.eachDecl(function (decl) {
            if (opts.props && opts.props.indexOf(decl.prop) == -1) return;
            if (opts.fast && decl.value.indexOf(opts.fast) == -1) return;

            decl.value = decl.value.replace(regexp, callback);
        });

        return this;
    };

    // Return true if all nodes return true in `condition`.
    // Just shorcut for `nodes.every`.

    Container.prototype.every = function every(condition) {
        return this.nodes.every(condition);
    };

    // Return true if one or more nodes return true in `condition`.
    // Just shorcut for `nodes.some`.

    Container.prototype.some = function some(condition) {
        return this.nodes.some(condition);
    };

    // Return index of child

    Container.prototype.index = function index(child) {
        if (typeof child == "number") {
            return child;
        } else {
            return this.nodes.indexOf(child);
        }
    };

    // Normalize child before insert. Copy before from `sample`.

    Container.prototype.normalize = function normalize(nodes, sample) {
        var _this = this;

        if (!Array.isArray(nodes)) {
            if (nodes.type == "root") {
                nodes = nodes.nodes;
            } else if (nodes.type) {
                nodes = [nodes];
            } else if (nodes.prop) {
                nodes = [new Declaration(nodes)];
            } else if (nodes.selector) {
                var Rule = _interopRequire(require("./rule"));

                nodes = [new Rule(nodes)];
            } else if (nodes.name) {
                var AtRule = _interopRequire(require("./at-rule"));

                nodes = [new AtRule(nodes)];
            } else if (nodes.text) {
                nodes = [new Comment(nodes)];
            }
        }

        var processed = nodes.map(function (child) {
            if (child.parent) child = child.clone();
            if (typeof child.before == "undefined") {
                if (sample && typeof sample.before != "undefined") {
                    child.before = sample.before.replace(/[^\s]/g, "");
                }
            }
            child.parent = _this;
            return child;
        });

        return processed;
    };

    _prototypeProperties(Container, null, {
        first: {

            // Shortcut to get first child

            get: function () {
                if (!this.nodes) return undefined;
                return this.nodes[0];
            },
            configurable: true
        },
        last: {

            // Shortcut to get first child

            get: function () {
                if (!this.nodes) return undefined;
                return this.nodes[this.nodes.length - 1];
            },
            configurable: true
        }
    });

    return Container;
})(Node);

module.exports = Container;
},{"./at-rule":93,"./comment":94,"./declaration":97,"./node":101,"./rule":108}],96:[function(require,module,exports){
(function (process){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var PreviousMap = _interopRequire(require("./previous-map"));

var path = _interopRequire(require("path"));

// Error while CSS parsing

var CssSyntaxError = (function (SyntaxError) {
    function CssSyntaxError(message, line, column, source, file) {
        _classCallCheck(this, CssSyntaxError);

        this.reason = message;

        this.message = file ? file : "<css input>";
        if (typeof line != "undefined" && typeof column != "undefined") {
            this.line = line;
            this.column = column;
            this.message += ":" + line + ":" + column + ": " + message;
        } else {
            this.message += ": " + message;
        }

        if (file) this.file = file;
        if (source) this.source = source;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CssSyntaxError);
        }
    }

    _inherits(CssSyntaxError, SyntaxError);

    // Return source of broken lines

    CssSyntaxError.prototype.highlight = function highlight(color) {
        var num = this.line - 1;
        var lines = this.source.split("\n");

        var prev = num > 0 ? lines[num - 1] + "\n" : "";
        var broken = lines[num];
        var next = num < lines.length - 1 ? "\n" + lines[num + 1] : "";

        var mark = "\n";
        for (var i = 0; i < this.column - 1; i++) {
            mark += " ";
        }

        if (typeof color == "undefined" && typeof process != "undefined") {
            if (process.stdout && process.env) {
                color = process.stdout.isTTY && !process.env.NODE_DISABLE_COLORS;
            }
        }

        if (color) {
            mark += "\u001b[1;31m^\u001b[0m";
        } else {
            mark += "^";
        }

        return prev + broken + mark + next;
    };

    CssSyntaxError.prototype.setMozillaProps = function setMozillaProps() {
        var sample = Error.call(this, message);
        if (sample.columnNumber) this.columnNumber = this.column;
        if (sample.description) this.description = this.message;
        if (sample.lineNumber) this.lineNumber = this.line;
        if (sample.fileName) this.fileName = this.file;
    };

    CssSyntaxError.prototype.toString = function toString() {
        var text = this.message;
        if (this.source) text += "\n" + this.highlight();
        return this.name + ": " + text;
    };

    return CssSyntaxError;
})(SyntaxError);

module.exports = CssSyntaxError;

CssSyntaxError.prototype.name = "CssSyntaxError";
}).call(this,require('_process'))

},{"./previous-map":105,"_process":133,"path":132}],97:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var vendor = _interopRequire(require("./vendor"));

var Node = _interopRequire(require("./node"));

// CSS declaration like “color: black” in rules

var Declaration = (function (Node) {
    function Declaration(defaults) {
        _classCallCheck(this, Declaration);

        this.type = "decl";
        Node.call(this, defaults);
    }

    _inherits(Declaration, Node);

    // Stringify declaration

    Declaration.prototype.stringify = function stringify(builder, semicolon) {
        var before = this.style("before");
        if (before) builder(before);

        var between = this.style("between", "colon");
        var string = this.prop + between + this.stringifyRaw("value");

        if (this.important) {
            string += this._important || " !important";
        }

        if (semicolon) string += ";";
        builder(string, this);
    };

    return Declaration;
})(Node);

module.exports = Declaration;
},{"./node":101,"./vendor":110}],98:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var CssSyntaxError = _interopRequire(require("./css-syntax-error"));

var PreviousMap = _interopRequire(require("./previous-map"));

var Parser = _interopRequire(require("./parser"));

var path = _interopRequire(require("path"));

var sequence = 0;

var Input = (function () {
    function Input(css) {
        var opts = arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Input);

        this.css = css.toString();

        if (this.css[0] == "﻿" || this.css[0] == "￾") {
            this.css = this.css.slice(1);
        }

        this.safe = !!opts.safe;

        if (opts.from) this.file = path.resolve(opts.from);

        var map = new PreviousMap(this.css, opts, this.id);
        if (map.text) {
            this.map = map;
            var file = map.consumer().file;
            if (!this.file && file) this.file = this.mapResolve(file);
        }

        if (this.file) {
            this.from = this.file;
        } else {
            sequence += 1;
            this.id = "<input css " + sequence + ">";
            this.from = this.id;
        }
        if (this.map) this.map.file = this.from;
    }

    // Throw syntax error from this input

    Input.prototype.error = (function (_error) {
        var _errorWrapper = function error() {
            return _error.apply(this, arguments);
        };

        _errorWrapper.toString = function () {
            return _error.toString();
        };

        return _errorWrapper;
    })(function (message, line, column) {
        var error = new CssSyntaxError(message);

        var origin = this.origin(line, column);
        if (origin) {
            error = new CssSyntaxError(message, origin.line, origin.column, origin.source, origin.file);

            error.generated = {
                line: line,
                column: column,
                source: this.css
            };
            if (this.file) error.generated.file = this.file;
        } else {
            error = new CssSyntaxError(message, line, column, this.css, this.file);
        }

        return error;
    });

    // Get origin position of code if source map was given

    Input.prototype.origin = function origin(line, column) {
        if (!this.map) {
            return false;
        }var consumer = this.map.consumer();

        var from = consumer.originalPositionFor({ line: line, column: column });
        if (!from.source) {
            return false;
        }var result = {
            file: this.mapResolve(from.source),
            line: from.line,
            column: from.column
        };

        var source = consumer.sourceContentFor(result.file);
        if (source) result.source = source;

        return result;
    };

    // Return path relative from source map root

    Input.prototype.mapResolve = function mapResolve(file) {
        return path.resolve(this.map.consumer().sourceRoot || ".", file);
    };

    return Input;
})();

module.exports = Input;
},{"./css-syntax-error":96,"./parser":103,"./previous-map":105,"path":132}],99:[function(require,module,exports){
"use strict";

// Methods to parse list and split it to array
module.exports = {

    // Split string to array by separator symbols with function and inside strings
    // cheching
    split: function split(string, separators, last) {
        var array = [];
        var current = "";
        var split = false;

        var func = 0;
        var quote = false;
        var escape = false;

        for (var i = 0; i < string.length; i++) {
            var letter = string[i];

            if (quote) {
                if (escape) {
                    escape = false;
                } else if (letter == "\\") {
                    escape = true;
                } else if (letter == quote) {
                    quote = false;
                }
            } else if (letter == "\"" || letter == "'") {
                quote = letter;
            } else if (letter == "(") {
                func += 1;
            } else if (letter == ")") {
                if (func > 0) func -= 1;
            } else if (func === 0) {
                for (var j = 0; j < separators.length; j++) {
                    if (letter == separators[j]) split = true;
                }
            }

            if (split) {
                if (current !== "") array.push(current.trim());
                current = "";
                split = false;
            } else {
                current += letter;
            }
        }

        if (last || current !== "") array.push(current.trim());
        return array;
    },

    // Split list devided by space:
    //
    //   list.space('a b') #=> ['a', 'b']
    //
    // It check for fuction and strings:
    //
    //   list.space('calc(1px + 1em) "b c"') #=> ['calc(1px + 1em)', '"b c"']
    space: function space(string) {
        return this.split(string, [" ", "\n", "\t"]);
    },

    // Split list devided by comma
    //
    //   list.comma('a, b') #=> ['a', 'b']
    //
    // It check for fuction and strings:
    //
    //   list.comma('rgba(0, 0, 0, 0) white') #=> ['rgba(0, 0, 0, 0)', '"white"']
    comma: function comma(string) {
        return this.split(string, [","], true);
    }

};
},{}],100:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Result = _interopRequire(require("./result"));

var Base64 = require("js-base64").Base64;

var mozilla = _interopRequire(require("source-map"));

var path = _interopRequire(require("path"));

// All tools to generate source maps

var MapGenerator = (function () {
    function MapGenerator(root, opts) {
        _classCallCheck(this, MapGenerator);

        this.root = root;
        this.opts = opts;
        this.mapOpts = opts.map || {};
    }

    // Should map be generated

    MapGenerator.prototype.isMap = function isMap() {
        if (typeof this.opts.map != "undefined") {
            return !!this.opts.map;
        } else {
            return this.previous().length > 0;
        }
    };

    // Return source map arrays from previous compilation step (like Sass)

    MapGenerator.prototype.previous = function previous() {
        var _this = this;

        if (!this.previousMaps) {
            this.previousMaps = [];
            this.root.eachInside(function (node) {
                if (node.source && node.source.input.map) {
                    var map = node.source.input.map;
                    if (_this.previousMaps.indexOf(map) == -1) {
                        _this.previousMaps.push(map);
                    }
                }
            });
        }

        return this.previousMaps;
    };

    // Should we inline source map to annotation comment

    MapGenerator.prototype.isInline = function isInline() {
        if (typeof this.mapOpts.inline != "undefined") {
            return this.mapOpts.inline;
        }

        var annotation = this.mapOpts.annotation;
        if (typeof annotation != "undefined" && annotation !== true) {
            return false;
        }

        if (this.previous().length) {
            return this.previous().some(function (i) {
                return i.inline;
            });
        } else {
            return true;
        }
    };

    // Should we set sourcesContent

    MapGenerator.prototype.isSourcesContent = function isSourcesContent() {
        if (typeof this.mapOpts.sourcesContent != "undefined") {
            return this.mapOpts.sourcesContent;
        }
        if (this.previous().length) {
            return this.previous().some(function (i) {
                return i.withContent();
            });
        } else {
            return true;
        }
    };

    // Clear source map annotation comment

    MapGenerator.prototype.clearAnnotation = function clearAnnotation() {
        if (this.mapOpts.annotation === false) {
            return;
        }var node;
        for (var i = this.root.nodes.length - 1; i >= 0; i--) {
            node = this.root.nodes[i];
            if (node.type != "comment") continue;
            if (node.text.match(/^# sourceMappingURL=/)) {
                this.root.remove(i);
                return;
            }
        }
    };

    // Set origin CSS content

    MapGenerator.prototype.setSourcesContent = function setSourcesContent() {
        var _this = this;

        var already = {};
        this.root.eachInside(function (node) {
            if (node.source) {
                var from = node.source.input.from;
                if (from && !already[from]) {
                    already[from] = true;
                    var relative = _this.relative(from);
                    _this.map.setSourceContent(relative, node.source.input.css);
                }
            }
        });
    };

    // Apply source map from previous compilation step (like Sass)

    MapGenerator.prototype.applyPrevMaps = function applyPrevMaps() {
        for (var _iterator = this.previous(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var prev = _ref;

            var from = this.relative(prev.file);
            var root = prev.root || path.dirname(prev.file);
            var map;

            if (this.mapOpts.sourcesContent === false) {
                map = new mozilla.SourceMapConsumer(prev.text);
                map.sourcesContent = map.sourcesContent.map(function (i) {
                    return null;
                });
            } else {
                map = prev.consumer();
            }

            this.map.applySourceMap(map, from, this.relative(root));
        }
    };

    // Should we add annotation comment

    MapGenerator.prototype.isAnnotation = function isAnnotation() {
        if (this.isInline()) {
            return true;
        } else if (typeof this.mapOpts.annotation != "undefined") {
            return this.mapOpts.annotation;
        } else if (this.previous().length) {
            return this.previous().some(function (i) {
                return i.annotation;
            });
        } else {
            return true;
        }
    };

    // Add source map annotation comment if it is needed

    MapGenerator.prototype.addAnnotation = function addAnnotation() {
        var content;

        if (this.isInline()) {
            content = "data:application/json;base64," + Base64.encode(this.map.toString());
        } else if (typeof this.mapOpts.annotation == "string") {
            content = this.mapOpts.annotation;
        } else {
            content = this.outputFile() + ".map";
        }

        this.css += "\n/*# sourceMappingURL=" + content + " */";
    };

    // Return output CSS file path

    MapGenerator.prototype.outputFile = function outputFile() {
        if (this.opts.to) {
            return this.relative(this.opts.to);
        } else if (this.opts.from) {
            return this.relative(this.opts.from);
        } else {
            return "to.css";
        }
    };

    // Return Result object with map

    MapGenerator.prototype.generateMap = function generateMap() {
        this.stringify();
        if (this.isSourcesContent()) this.setSourcesContent();
        if (this.previous().length > 0) this.applyPrevMaps();
        if (this.isAnnotation()) this.addAnnotation();

        if (this.isInline()) {
            return [this.css];
        } else {
            return [this.css, this.map];
        }
    };

    // Return path relative from output CSS file

    MapGenerator.prototype.relative = function relative(file) {
        var from = this.opts.to ? path.dirname(this.opts.to) : ".";

        if (typeof this.mapOpts.annotation == "string") {
            from = path.dirname(path.resolve(from, this.mapOpts.annotation));
        }

        file = path.relative(from, file);
        if (path.sep == "\\") {
            return file.replace(/\\/g, "/");
        } else {
            return file;
        }
    };

    // Return path of node source for map

    MapGenerator.prototype.sourcePath = function sourcePath(node) {
        return this.relative(node.source.input.from);
    };

    // Return CSS string and source map

    MapGenerator.prototype.stringify = function stringify() {
        var _this = this;

        this.css = "";
        this.map = new mozilla.SourceMapGenerator({ file: this.outputFile() });

        var line = 1;
        var column = 1;

        var lines, last;
        var builder = function (str, node, type) {
            _this.css += str;

            if (node && node.source && node.source.start && type != "end") {
                _this.map.addMapping({
                    source: _this.sourcePath(node),
                    original: {
                        line: node.source.start.line,
                        column: node.source.start.column - 1
                    },
                    generated: {
                        line: line,
                        column: column - 1
                    }
                });
            }

            lines = str.match(/\n/g);
            if (lines) {
                line += lines.length;
                last = str.lastIndexOf("\n");
                column = str.length - last;
            } else {
                column = column + str.length;
            }

            if (node && node.source && node.source.end && type != "start") {
                _this.map.addMapping({
                    source: _this.sourcePath(node),
                    original: {
                        line: node.source.end.line,
                        column: node.source.end.column
                    },
                    generated: {
                        line: line,
                        column: column
                    }
                });
            }
        };

        this.root.stringify(builder);
    };

    // Return Result object with or without map

    MapGenerator.prototype.generate = function generate() {
        this.clearAnnotation();

        if (this.isMap()) {
            return this.generateMap();
        } else {
            return [this.root.toString()];
        }
    };

    return MapGenerator;
})();

module.exports = MapGenerator;
},{"./result":106,"js-base64":111,"path":132,"source-map":112}],101:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var CssSyntaxError = _interopRequire(require("./css-syntax-error"));

// Default code style
var defaultStyle = {
    colon: ": ",
    indent: "    ",
    beforeDecl: "\n",
    beforeRule: "\n",
    beforeOpen: " ",
    beforeClose: "\n",
    beforeComment: "\n",
    after: "\n",
    emptyBody: "",
    commentLeft: " ",
    commentRight: " "
};

// Recursivly clone objects
var cloneNode = (function (_cloneNode) {
    var _cloneNodeWrapper = function cloneNode() {
        return _cloneNode.apply(this, arguments);
    };

    _cloneNodeWrapper.toString = function () {
        return _cloneNode.toString();
    };

    return _cloneNodeWrapper;
})(function (obj, parent) {
    if (typeof obj != "object") return obj;
    var cloned = new obj.constructor();

    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        var value = obj[i];

        if (i == "parent" && typeof value == "object") {
            if (parent) cloned[i] = parent;
        } else if (i == "source") {
            cloned[i] = value;
        } else if (value instanceof Array) {
            cloned[i] = value.map(function (i) {
                return cloneNode(i, cloned);
            });
        } else if (i != "before" && i != "after" && i != "between" && i != "semicolon") {
            cloned[i] = cloneNode(value, cloned);
        }
    }

    return cloned;
});

// Some common methods for all CSS nodes

var Node = (function () {
    function Node() {
        var defaults = arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Node);

        for (var name in defaults) {
            this[name] = defaults[name];
        }
    }

    // Return error to mark error in your plugin syntax:
    //
    //   if ( wrongVariable ) {
    //       throw decl.error('Wrong variable');
    //   }
    //
    // You can also get origin line and column from previous source map:
    //
    //   if ( deprecatedSyntax ) {
    //       var error = decl.error('Deprecated syntax');
    //       console.warn(error.toString());
    //   }

    Node.prototype.error = function error(message) {
        if (this.source) {
            var pos = this.source.start;
            return this.source.input.error(message, pos.line, pos.column);
        } else {
            return new CssSyntaxError(message);
        }
    };

    // Remove this node from parent
    //
    //   decl.removeSelf();
    //
    // Note, that removing by index is faster:
    //
    //   rule.each( (decl, i) => rule.remove(i) );

    Node.prototype.removeSelf = function removeSelf() {
        if (this.parent) {
            this.parent.remove(this);
        }
        this.parent = undefined;
        return this;
    };

    // Shortcut to insert nodes before and remove self.
    //
    //   importNode.replace( loadedRoot );

    Node.prototype.replace = function replace(nodes) {
        this.parent.insertBefore(this, nodes);
        this.parent.remove(this);
        return this;
    };

    // Return CSS string of current node
    //
    //   decl.toString(); //=> "  color: black"

    Node.prototype.toString = function toString() {
        var result = "";
        var builder = function (str) {
            return result += str;
        };
        this.stringify(builder);
        return result;
    };

    // Clone current node
    //
    //   rule.append( decl.clone() );
    //
    // You can override properties while cloning:
    //
    //   rule.append( decl.clone({ value: '0' }) );

    Node.prototype.clone = function clone() {
        var overrides = arguments[0] === undefined ? {} : arguments[0];

        var cloned = cloneNode(this);
        for (var name in overrides) {
            cloned[name] = overrides[name];
        }
        return cloned;
    };

    // Clone node and insert clone before current one.
    // It accept properties to change in clone and return new node.
    //
    //   decl.cloneBefore({ prop: '-webkit-' + del.prop });

    Node.prototype.cloneBefore = function cloneBefore() {
        var overrides = arguments[0] === undefined ? {} : arguments[0];

        var cloned = this.clone(overrides);
        this.parent.insertBefore(this, cloned);
        return cloned;
    };

    // Clone node and insert clone after current one.
    // It accept properties to change in clone and return new node.
    //
    //   decl.cloneAfter({ value: convertToRem(decl.value) });

    Node.prototype.cloneAfter = function cloneAfter() {
        var overrides = arguments[0] === undefined ? {} : arguments[0];

        var cloned = this.clone(overrides);
        this.parent.insertAfter(this, cloned);
        return cloned;
    };

    // Replace with node by another one.
    //
    //   decl.replaceWith(fixedDecl);

    Node.prototype.replaceWith = function replaceWith(node) {
        this.parent.insertBefore(this, node);
        this.removeSelf();
        return this;
    };

    // Remove node from current place and put to end of new one.
    // It will also clean node code styles, but will keep `between` if old
    // parent and new parent has same root.
    //
    //   rule.moveTo(atRule);

    Node.prototype.moveTo = function moveTo(container) {
        this.cleanStyles(this.root() == container.root());
        this.removeSelf();
        container.append(this);
        return this;
    };

    // Remove node from current place and put to before other node.
    // It will also clean node code styles, but will keep `between` if old
    // parent and new parent has same root.
    //
    //   rule.moveBefore(rule.parent);

    Node.prototype.moveBefore = function moveBefore(node) {
        this.cleanStyles(this.root() == node.root());
        this.removeSelf();
        node.parent.insertBefore(node, this);
        return this;
    };

    // Remove node from current place and put to after other node.
    // It will also clean node code styles, but will keep `between` if old
    // parent and new parent has same root.
    //
    //   rule.moveAfter(rule.parent);

    Node.prototype.moveAfter = function moveAfter(node) {
        this.cleanStyles(this.root() == node.root());
        this.removeSelf();
        node.parent.insertAfter(node, this);
        return this;
    };

    // Return next node in parent. If current node is last one,
    // method will return `undefined`.
    //
    //   var next = decl.next();
    //   if ( next && next.prop == removePrefix(decl.prop) ) {
    //       decl.removeSelf();
    //   }

    Node.prototype.next = function next() {
        var index = this.parent.index(this);
        return this.parent.nodes[index + 1];
    };

    // Return previous node in parent. If current node is first one,
    // method will return `undefined`.
    //
    //   var prev = decl.prev();
    //   if ( prev && removePrefix(prev.prop) == decl.prop) ) {
    //       prev.removeSelf();
    //   }

    Node.prototype.prev = function prev() {
        var index = this.parent.index(this);
        return this.parent.nodes[index - 1];
    };

    // Remove `parent` node on cloning to fix circular structures

    Node.prototype.toJSON = function toJSON() {
        var fixed = {};

        for (var name in this) {
            if (!this.hasOwnProperty(name)) continue;
            if (name == "parent") continue;
            var value = this[name];

            if (value instanceof Array) {
                fixed[name] = value.map(function (i) {
                    return typeof i == "object" && i.toJSON ? i.toJSON() : i;
                });
            } else if (typeof value == "object" && value.toJSON) {
                fixed[name] = value.toJSON();
            } else {
                fixed[name] = value;
            }
        }

        return fixed;
    };

    // Copy code style from first node with same type

    Node.prototype.style = function style(own, detect) {
        var value;
        if (!detect) detect = own;

        // Already had
        if (own) {
            value = this[own];
            if (typeof value != "undefined") {
                return value;
            }
        }

        var parent = this.parent;

        // Hack for first rule in CSS
        if (detect == "before") {
            if (!parent || parent.type == "root" && parent.first == this) {
                return "";
            }
        }

        // Floating child without parent
        if (!parent) {
            return defaultStyle[detect];
        } // Detect style by other nodes
        var root = this.root();
        if (!root.styleCache) root.styleCache = {};
        if (typeof root.styleCache[detect] != "undefined") {
            return root.styleCache[detect];
        }

        if (detect == "semicolon") {
            root.eachInside(function (i) {
                if (i.nodes && i.nodes.length && i.last.type == "decl") {
                    value = i.semicolon;
                    if (typeof value != "undefined") return false;
                }
            });
        } else if (detect == "emptyBody") {
            root.eachInside(function (i) {
                if (i.nodes && i.nodes.length === 0) {
                    value = i.after;
                    if (typeof value != "undefined") return false;
                }
            });
        } else if (detect == "indent") {
            root.eachInside(function (i) {
                var p = i.parent;
                if (p && p != root && p.parent && p.parent == root) {
                    if (typeof i.before != "undefined") {
                        var parts = i.before.split("\n");
                        value = parts[parts.length - 1];
                        value = value.replace(/[^\s]/g, "");
                        return false;
                    }
                }
            });
        } else if (detect == "beforeComment") {
            root.eachComment(function (i) {
                if (typeof i.before != "undefined") {
                    value = i.before;
                    if (value.indexOf("\n") != -1) {
                        value = value.replace(/[^\n]+$/, "");
                    }
                    return false;
                }
            });
            if (typeof value == "undefined") {
                value = this.style(null, "beforeDecl");
            }
        } else if (detect == "beforeDecl") {
            root.eachDecl(function (i) {
                if (typeof i.before != "undefined") {
                    value = i.before;
                    if (value.indexOf("\n") != -1) {
                        value = value.replace(/[^\n]+$/, "");
                    }
                    return false;
                }
            });
            if (typeof value == "undefined") {
                value = this.style(null, "beforeRule");
            }
        } else if (detect == "beforeRule") {
            root.eachInside(function (i) {
                if (i.nodes && (i.parent != root || root.first != i)) {
                    if (typeof i.before != "undefined") {
                        value = i.before;
                        if (value.indexOf("\n") != -1) {
                            value = value.replace(/[^\n]+$/, "");
                        }
                        return false;
                    }
                }
            });
        } else if (detect == "beforeClose") {
            root.eachInside(function (i) {
                if (i.nodes && i.nodes.length > 0) {
                    if (typeof i.after != "undefined") {
                        value = i.after;
                        if (value.indexOf("\n") != -1) {
                            value = value.replace(/[^\n]+$/, "");
                        }
                        return false;
                    }
                }
            });
        } else if (detect == "before" || detect == "after") {
            if (this.type == "decl") {
                value = this.style(null, "beforeDecl");
            } else if (this.type == "comment") {
                value = this.style(null, "beforeComment");
            } else if (detect == "before") {
                value = this.style(null, "beforeRule");
            } else {
                value = this.style(null, "beforeClose");
            }

            var node = this.parent;
            var depth = 0;
            while (node && node.type != "root") {
                depth += 1;
                node = node.parent;
            }

            if (value.indexOf("\n") != -1) {
                var indent = this.style(null, "indent");
                if (indent.length) {
                    for (var step = 0; step < depth; step++) value += indent;
                }
            }

            return value;
        } else if (detect == "colon") {
            root.eachDecl(function (i) {
                if (typeof i.between != "undefined") {
                    value = i.between.replace(/[^\s:]/g, "");
                    return false;
                }
            });
        } else if (detect == "beforeOpen") {
            root.eachInside(function (i) {
                if (i.type != "decl") {
                    value = i.between;
                    if (typeof value != "undefined") return false;
                }
            });
        } else {
            root.eachInside(function (i) {
                value = i[own];
                if (typeof value != "undefined") return false;
            });
        }

        if (typeof value == "undefined") value = defaultStyle[detect];

        root.styleCache[detect] = value;
        return value;
    };

    // Return top parent , parent of parents.

    Node.prototype.root = function root() {
        var result = this;
        while (result.parent) result = result.parent;
        return result;
    };

    // Recursivelly remove all code style properties (`before` and `between`).

    Node.prototype.cleanStyles = function cleanStyles(keepBetween) {
        delete this.before;
        delete this.after;
        if (!keepBetween) delete this.between;

        if (this.nodes) {
            for (var _iterator = this.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var node = _ref;
                node.cleanStyles(keepBetween);
            }
        }
    };

    // Use raw value if origin was not changed

    Node.prototype.stringifyRaw = function stringifyRaw(prop) {
        var value = this[prop];
        var raw = this["_" + prop];
        if (raw && raw.value === value) {
            return raw.raw;
        } else {
            return value;
        }
    };

    return Node;
})();

module.exports = Node;
},{"./css-syntax-error":96}],102:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Parser = _interopRequire(require("./parser"));

var Input = _interopRequire(require("./input"));

module.exports = function (css, opts) {
    var input = new Input(css, opts);

    var parser = new Parser(input);
    parser.tokenize();
    parser.loop();

    return parser.root;
};
},{"./input":98,"./parser":103}],103:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Declaration = _interopRequire(require("./declaration"));

var tokenizer = _interopRequire(require("./tokenize"));

var Comment = _interopRequire(require("./comment"));

var AtRule = _interopRequire(require("./at-rule"));

var Root = _interopRequire(require("./root"));

var Rule = _interopRequire(require("./rule"));

// CSS parser

var Parser = (function () {
    function Parser(input) {
        _classCallCheck(this, Parser);

        this.input = input;

        this.pos = 0;
        this.root = new Root();
        this.current = this.root;
        this.spaces = "";
        this.semicolon = false;

        this.root.source = { input: input };
        if (input.map) this.root.prevMap = input.map;
    }

    Parser.prototype.tokenize = function tokenize() {
        this.tokens = tokenizer(this.input);
    };

    Parser.prototype.loop = function loop() {
        var token;
        while (this.pos < this.tokens.length) {
            token = this.tokens[this.pos];

            switch (token[0]) {
                case "word":
                case ":":
                    this.word(token);
                    break;

                case "}":
                    this.end(token);
                    break;

                case "comment":
                    this.comment(token);
                    break;

                case "at-word":
                    this.atrule(token);
                    break;

                case "{":
                    this.emptyRule(token);
                    break;

                default:
                    this.spaces += token[1];
                    break;
            }

            this.pos += 1;
        }
        this.endFile();
    };

    Parser.prototype.comment = function comment(token) {
        var node = new Comment();
        this.init(node, token[2], token[3]);
        node.source.end = { line: token[4], column: token[5] };

        var text = token[1].slice(2, -2);
        if (text.match(/^\s*$/)) {
            node.left = text;
            node.text = "";
            node.right = "";
        } else {
            var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
            node.left = match[1];
            node.text = match[2];
            node.right = match[3];
        }
    };

    Parser.prototype.emptyRule = function emptyRule(token) {
        var node = new Rule();
        this.init(node, token[2], token[3]);
        node.between = "";
        node.selector = "";
        this.current = node;
    };

    Parser.prototype.word = function word() {
        var token;
        var end = false;
        var type = null;
        var colon = false;
        var bracket = null;
        var brackets = 0;

        var start = this.pos;
        this.pos += 1;
        while (true) {
            token = this.tokens[this.pos];
            if (!token) {
                this.pos -= 1;
                end = true;
                break;
            }

            type = token[0];
            if (type == "(") {
                if (!bracket) bracket = token;
                brackets += 1;
            } else if (type == ")") {
                brackets -= 1;
                if (brackets === 0) bracket = null;
            } else if (brackets === 0) {
                if (type == ";") {
                    if (colon) {
                        this.decl(this.tokens.slice(start, this.pos + 1));
                        return;
                    } else {
                        break;
                    }
                } else if (type == "{") {
                    this.rule(this.tokens.slice(start, this.pos + 1));
                    return;
                } else if (type == "}") {
                    this.pos -= 1;
                    end = true;
                    break;
                } else if (type == "at-word") {
                    this.pos -= 1;
                    break;
                } else {
                    if (type == ":") colon = true;
                }
            }

            this.pos += 1;
        }

        if (brackets > 0 && !this.input.safe) {
            throw this.input.error("Unclosed bracket", bracket[2], bracket[3]);
        }

        if (end && colon) {
            while (this.pos > start) {
                token = this.tokens[this.pos][0];
                if (token != "space" && token != "comment") break;
                this.pos -= 1;
            }
            this.decl(this.tokens.slice(start, this.pos + 1));
            return;
        }

        if (this.input.safe) {
            var buffer = this.tokens.slice(start, this.pos + 1);
            this.spaces += buffer.map(function (i) {
                return i[1];
            }).join("");
        } else {
            token = this.tokens[start];
            throw this.input.error("Unknown word", token[2], token[3]);
        }
    };

    Parser.prototype.rule = function rule(tokens) {
        tokens.pop();

        var node = new Rule();
        this.init(node, tokens[0][2], tokens[0][3]);

        node.between = this.spacesFromEnd(tokens);
        this.raw(node, "selector", tokens);
        this.current = node;
    };

    Parser.prototype.decl = function decl(tokens) {
        var node = new Declaration();
        this.init(node);

        var last = tokens[tokens.length - 1];
        if (last[0] == ";") {
            this.semicolon = true;
            tokens.pop();
        }
        if (last[4]) {
            node.source.end = { line: last[4], column: last[5] };
        } else {
            node.source.end = { line: last[2], column: last[3] };
        }

        while (tokens[0][0] != "word") {
            node.before += tokens.shift()[1];
        }
        node.source.start = { line: tokens[0][2], column: tokens[0][3] };

        node.prop = tokens.shift()[1];
        node.between = "";

        var token;
        while (tokens.length) {
            token = tokens.shift();

            if (token[0] == ":") {
                node.between += token[1];
                break;
            } else if (token[0] != "space" && token[0] != "comment") {
                this.unknownWord(node, token, tokens);
            } else {
                node.between += token[1];
            }
        }

        if (node.prop[0] == "_" || node.prop[0] == "*") {
            node.before += node.prop[0];
            node.prop = node.prop.slice(1);
        }
        node.between += this.spacesFromStart(tokens);

        if (this.input.safe) this.checkMissedSemicolon(tokens);

        for (var i = tokens.length - 1; i > 0; i--) {
            token = tokens[i];
            if (token[1] == "!important") {
                node.important = true;
                var string = this.stringFrom(tokens, i);
                string = this.spacesFromEnd(tokens) + string;
                if (string != " !important") node._important = string;
                break;
            } else if (token[0] != "space" && token[0] != "comment") {
                break;
            }
        }

        this.raw(node, "value", tokens);

        if (node.value.indexOf(":") != -1 && !this.input.safe) {
            this.checkMissedSemicolon(tokens);
        }
    };

    Parser.prototype.atrule = function atrule(token) {
        var node = new AtRule();
        node.name = token[1].slice(1);
        if (node.name === "") {
            if (this.input.safe) {
                node.name = "";
            } else {
                throw this.input.error("At-rule without name", token[2], token[3]);
            }
        }
        this.init(node, token[2], token[3]);

        var next;
        var last = false;
        var open = false;
        var params = [];
        while (true) {
            this.pos += 1;
            token = this.tokens[this.pos];

            if (!token) {
                last = true;
                break;
            } else if (token[0] == ";") {
                node.source.end = { line: token[2], column: token[3] };
                this.semicolon = true;
                break;
            } else if (token[0] == "{") {
                open = true;
                break;
            } else {
                params.push(token);
            }
        }

        node.between = this.spacesFromEnd(params);
        if (params.length) {
            node.afterName = this.spacesFromStart(params);
            this.raw(node, "params", params);
            if (last) {
                token = params[params.length - 1];
                node.source.end = { line: token[4], column: token[5] };
                this.spaces = node.between;
                node.between = "";
            }
        } else {
            node.afterName = "";
            node.params = "";
        }

        if (open) {
            node.nodes = [];
            this.current = node;
        }
    };

    Parser.prototype.end = function end(token) {
        if (this.current.nodes && this.current.nodes.length) {
            this.current.semicolon = this.semicolon;
        }
        this.semicolon = false;

        this.current.after = (this.current.after || "") + this.spaces;
        this.spaces = "";

        if (this.current.parent) {
            this.current.source.end = { line: token[2], column: token[3] };
            this.current = this.current.parent;
        } else if (!this.input.safe) {
            throw this.input.error("Unexpected }", token[2], token[3]);
        } else {
            this.current.after += "}";
        }
    };

    Parser.prototype.endFile = function endFile() {
        if (this.current.parent && !this.input.safe) {
            var pos = this.current.source.start;
            throw this.input.error("Unclosed block", pos.line, pos.column);
        }

        if (this.current.nodes && this.current.nodes.length) {
            this.current.semicolon = this.semicolon;
        }
        this.current.after = (this.current.after || "") + this.spaces;

        while (this.current.parent) {
            this.current = this.current.parent;
            this.current.after = "";
        }
    };

    Parser.prototype.unknownWord = function unknownWord(node, token) {
        if (this.input.safe) {
            node.source.start = { line: token[2], column: token[3] };
            node.before += node.prop + node.between;
            node.prop = token[1];
            node.between = "";
        } else {
            throw this.input.error("Unknown word", token[2], token[3]);
        }
    };

    Parser.prototype.checkMissedSemicolon = function checkMissedSemicolon(tokens) {
        var prev = null;
        var colon = false;
        var brackets = 0;
        var type, token;
        for (var i = 0; i < tokens.length; i++) {
            token = tokens[i];
            type = token[0];

            if (type == "(") {
                brackets += 1;
            } else if (type == ")") {
                brackets -= 0;
            } else if (brackets === 0 && type == ":") {
                if (!prev && this.input.safe) {
                    continue;
                } else if (!prev) {
                    throw this.input.error("Double colon", token[2], token[3]);
                } else if (prev[0] == "word" && prev[1] == "progid") {
                    continue;
                } else {
                    colon = i;
                    break;
                }
            }

            prev = token;
        }

        if (colon === false) {
            return;
        }if (this.input.safe) {
            var split;
            for (split = colon - 1; split >= 0; split--) {
                if (tokens[split][0] == "word") break;
            }
            for (split -= 1; split >= 0; split--) {
                if (tokens[split][0] != "space") {
                    split += 1;
                    break;
                }
            }
            var other = tokens.splice(split, tokens.length - split);
            this.decl(other);
        } else {
            var founded = 0;
            for (var j = colon - 1; j >= 0; j--) {
                token = tokens[j];
                if (token[0] != "space") {
                    founded += 1;
                    if (founded == 2) break;
                }
            }
            throw this.input.error("Missed semicolon", token[4], token[5]);
        }
    };

    // Helpers

    Parser.prototype.init = function init(node, line, column) {
        this.current.push(node);

        node.source = { start: { line: line, column: column }, input: this.input };
        node.before = this.spaces;
        this.spaces = "";
        if (node.type != "comment") this.semicolon = false;
    };

    Parser.prototype.raw = function raw(node, prop, tokens) {
        var token;
        var value = "";
        var clean = true;
        for (var _iterator = tokens, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            if (_isArray) {
                if (_i >= _iterator.length) break;
                token = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                token = _i.value;
            }

            if (token[0] == "comment") {
                clean = false;
            } else {
                value += token[1];
            }
        }
        if (!clean) {
            var origin = "";
            for (var _iterator2 = tokens, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    token = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    token = _i2.value;
                }

                origin += token[1];
            }node["_" + prop] = { value: value, raw: origin };
        }
        node[prop] = value;
    };

    Parser.prototype.spacesFromEnd = function spacesFromEnd(tokens) {
        var next;
        var spaces = "";
        while (tokens.length) {
            next = tokens[tokens.length - 1][0];
            if (next != "space" && next != "comment") break;
            spaces += tokens.pop()[1];
        }
        return spaces;
    };

    Parser.prototype.spacesFromStart = function spacesFromStart(tokens) {
        var next;
        var spaces = "";
        while (tokens.length) {
            next = tokens[0][0];
            if (next != "space" && next != "comment") break;
            spaces += tokens.shift()[1];
        }
        return spaces;
    };

    Parser.prototype.stringFrom = function stringFrom(tokens, from) {
        var result = "";
        for (var i = from; i < tokens.length; i++) {
            result += tokens[i][1];
        }
        tokens.splice(from, tokens.length - from);
        return result;
    };

    return Parser;
})();

module.exports = Parser;
},{"./at-rule":93,"./comment":94,"./declaration":97,"./root":107,"./rule":108,"./tokenize":109}],104:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Declaration = _interopRequire(require("./declaration"));

var Comment = _interopRequire(require("./comment"));

var AtRule = _interopRequire(require("./at-rule"));

var Result = _interopRequire(require("./result"));

var parse = _interopRequire(require("./parse"));

var Rule = _interopRequire(require("./rule"));

var Root = _interopRequire(require("./root"));

// List of functions to process CSS

var PostCSS = (function () {
    function PostCSS() {
        var _this = this;

        var plugins = arguments[0] === undefined ? [] : arguments[0];

        _classCallCheck(this, PostCSS);

        this.plugins = plugins.map(function (i) {
            return _this.normalize(i);
        });
    }

    // Add function as PostCSS plugins

    PostCSS.prototype.use = function use(plugin) {
        plugin = this.normalize(plugin);
        if (typeof plugin == "object" && Array.isArray(plugin.plugins)) {
            this.plugins = this.plugins.concat(plugin.plugins);
        } else {
            this.plugins.push(plugin);
        }
        return this;
    };

    // Process CSS throw installed plugins

    PostCSS.prototype.process = function process(css) {
        var opts = arguments[1] === undefined ? {} : arguments[1];

        var parsed;
        if (css instanceof Root) {
            parsed = css;
        } else if (css instanceof Result) {
            parsed = css.root;
            if (css.map && typeof opts.map == "undefined") {
                opts.map = { prev: css.map };
            }
        } else {
            parsed = postcss.parse(css, opts);
        }

        for (var _iterator = this.plugins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var plugin = _ref;

            var returned = plugin(parsed, opts);
            if (returned instanceof Root) parsed = returned;
        }

        return parsed.toResult(opts);
    };

    // Return plugin function

    PostCSS.prototype.normalize = function normalize(plugin) {
        var type = typeof plugin;
        if ((type == "object" || type == "function") && plugin.postcss) {
            return plugin.postcss;
        } else {
            return plugin;
        }
    };

    return PostCSS;
})();

// Framework for CSS postprocessors
//
//   var processor = postcss(function (css) {
//       // Change nodes in css
//   });
//   processor.process(css)
var postcss = function postcss() {
    for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
        plugins[_key] = arguments[_key];
    }

    if (plugins.length == 1 && Array.isArray(plugins[0])) {
        plugins = plugins[0];
    }
    return new PostCSS(plugins);
};

// Compile CSS to nodes
postcss.parse = parse;

// Nodes shortcuts
postcss.comment = function (defaults) {
    return new Comment(defaults);
};
postcss.atRule = function (defaults) {
    return new AtRule(defaults);
};
postcss.decl = function (defaults) {
    return new Declaration(defaults);
};
postcss.rule = function (defaults) {
    return new Rule(defaults);
};
postcss.root = function (defaults) {
    return new Root(defaults);
};

module.exports = postcss;
},{"./at-rule":93,"./comment":94,"./declaration":97,"./parse":102,"./result":106,"./root":107,"./rule":108}],105:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Base64 = require("js-base64").Base64;

var mozilla = _interopRequire(require("source-map"));

var path = _interopRequire(require("path"));

var fs = _interopRequire(require("fs"));

// Detect previous map

var PreviousMap = (function () {
    function PreviousMap(css, opts) {
        _classCallCheck(this, PreviousMap);

        this.loadAnnotation(css);
        this.inline = this.startWith(this.annotation, "data:");

        var prev = opts.map ? opts.map.prev : undefined;
        var text = this.loadMap(opts.from, prev);
        if (text) this.text = text;
    }

    // Return SourceMapConsumer object to read map

    PreviousMap.prototype.consumer = function consumer() {
        if (!this.consumerCache) {
            this.consumerCache = new mozilla.SourceMapConsumer(this.text);
        }
        return this.consumerCache;
    };

    // Is map has sources content

    PreviousMap.prototype.withContent = function withContent() {
        return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    };

    // Is `string` is starting with `start`

    PreviousMap.prototype.startWith = function startWith(string, start) {
        if (!string) {
            return false;
        }return string.substr(0, start.length) == start;
    };

    // Load for annotation comment from previous compilation step

    PreviousMap.prototype.loadAnnotation = function loadAnnotation(css) {
        var match = css.match(/\/\*\s*# sourceMappingURL=(.*)\s*\*\//);
        if (match) this.annotation = match[1].trim();
    };

    // Encode different type of inline

    PreviousMap.prototype.decodeInline = function decodeInline(text) {
        var uri = "data:application/json,";
        var base64 = "data:application/json;base64,";

        if (this.startWith(text, uri)) {
            return decodeURIComponent(text.substr(uri.length));
        } else if (this.startWith(text, base64)) {
            return Base64.decode(text.substr(base64.length));
        } else {
            var encoding = text.match(/data:application\/json;([^,]+),/)[1];
            throw new Error("Unsupported source map encoding " + encoding);
        }
    };

    // Load previous map

    PreviousMap.prototype.loadMap = function loadMap(file, prev) {
        if (prev === false) {
            return;
        }if (prev) {
            if (typeof prev == "string") {
                return prev;
            } else if (prev instanceof mozilla.SourceMapConsumer) {
                return mozilla.SourceMapGenerator.fromSourceMap(prev).toString();
            } else if (prev instanceof mozilla.SourceMapGenerator) {
                return prev.toString();
            } else if (typeof prev == "object" && prev.mappings) {
                return JSON.stringify(prev);
            } else {
                throw new Error("Unsupported previous source map format: " + prev.toString());
            }
        } else if (this.inline) {
            return this.decodeInline(this.annotation);
        } else if (this.annotation) {
            var map = this.annotation;
            if (file) map = path.join(path.dirname(file), map);

            this.root = path.dirname(map);
            if (fs.existsSync && fs.existsSync(map)) {
                return fs.readFileSync(map, "utf-8").toString().trim();
            }
        }
    };

    return PreviousMap;
})();

module.exports = PreviousMap;
},{"fs":127,"js-base64":111,"path":132,"source-map":112}],106:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var MapGenerator = _interopRequire(require("./map-generator"));

// Object with processed CSS

var Result = (function () {
    function Result(root) {
        var opts = arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Result);

        this.root = root;
        this.opts = opts;
    }

    // Return CSS string on any try to print

    Result.prototype.toString = function toString() {
        return this.css;
    };

    // Generate CSS and map

    Result.prototype.stringify = function stringify() {
        var map = new MapGenerator(this.root, this.opts);
        var generated = map.generate();
        this.cssCached = generated[0];
        this.mapCached = generated[1];
    };

    _prototypeProperties(Result, null, {
        map: {

            // Lazy method to return source map

            get: function () {
                if (!this.cssCached) this.stringify();
                return this.mapCached;
            },
            configurable: true
        },
        css: {

            // Lazy method to return CSS string

            get: function () {
                if (!this.cssCached) this.stringify();
                return this.cssCached;
            },
            configurable: true
        }
    });

    return Result;
})();

module.exports = Result;
},{"./map-generator":100}],107:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Declaration = _interopRequire(require("./declaration"));

var Container = _interopRequire(require("./container"));

var Comment = _interopRequire(require("./comment"));

var AtRule = _interopRequire(require("./at-rule"));

var Result = _interopRequire(require("./result"));

var Rule = _interopRequire(require("./rule"));

// Root of CSS

var Root = (function (Container) {
    function Root(defaults) {
        _classCallCheck(this, Root);

        this.type = "root";
        this.nodes = [];
        Container.call(this, defaults);
    }

    _inherits(Root, Container);

    // Fix space when we remove first child

    Root.prototype.remove = function remove(child) {
        child = this.index(child);

        if (child === 0 && this.nodes.length > 1) {
            this.nodes[1].before = this.nodes[child].before;
        }

        return Container.prototype.remove.call(this, child);
    };

    // Fix spaces on insert before first rule

    Root.prototype.normalize = function normalize(child, sample, type) {
        var nodes = Container.prototype.normalize.call(this, child);

        if (sample) {
            if (type == "prepend") {
                if (this.nodes.length > 1) {
                    sample.before = this.nodes[1].before;
                } else {
                    delete sample.before;
                }
            } else {
                for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }

                    var node = _ref;

                    if (this.first != sample) node.before = sample.before;
                }
            }
        }

        return nodes;
    };

    // Stringify styles

    Root.prototype.stringify = function stringify(builder) {
        this.stringifyContent(builder);
        if (this.after) builder(this.after);
    };

    // Generate processing result with optional source map

    Root.prototype.toResult = function toResult() {
        var opts = arguments[0] === undefined ? {} : arguments[0];

        return new Result(this, opts);
    };

    return Root;
})(Container);

module.exports = Root;
},{"./at-rule":93,"./comment":94,"./container":95,"./declaration":97,"./result":106,"./rule":108}],108:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Declaration = _interopRequire(require("./declaration"));

var Container = _interopRequire(require("./container"));

var list = _interopRequire(require("./list"));

// CSS rule like “a { }”

var Rule = (function (Container) {
    function Rule(defaults) {
        _classCallCheck(this, Rule);

        this.type = "rule";
        this.nodes = [];
        Container.call(this, defaults);
    }

    _inherits(Rule, Container);

    // Stringify rule

    Rule.prototype.stringify = function stringify(builder) {
        this.stringifyBlock(builder, this.stringifyRaw("selector"));
    };

    _prototypeProperties(Rule, null, {
        selectors: {

            // Shortcut to get selectors as array

            get: function () {
                return list.comma(this.selector);
            },
            set: function (values) {
                this.selector = values.join(", ");
            },
            configurable: true
        }
    });

    return Rule;
})(Container);

module.exports = Rule;
},{"./container":95,"./declaration":97,"./list":99}],109:[function(require,module,exports){
"use strict";

var singleQuote = "'".charCodeAt(0),
    doubleQuote = "\"".charCodeAt(0),
    backslash = "\\".charCodeAt(0),
    slash = "/".charCodeAt(0),
    newline = "\n".charCodeAt(0),
    space = " ".charCodeAt(0),
    feed = "\f".charCodeAt(0),
    tab = "\t".charCodeAt(0),
    cr = "\r".charCodeAt(0),
    openBracket = "(".charCodeAt(0),
    closeBracket = ")".charCodeAt(0),
    openCurly = "{".charCodeAt(0),
    closeCurly = "}".charCodeAt(0),
    semicolon = ";".charCodeAt(0),
    asterisk = "*".charCodeAt(0),
    colon = ":".charCodeAt(0),
    at = "@".charCodeAt(0),
    atEnd = /[ \n\t\r\{\(\)'"\\/]/g,
    wordEnd = /[ \n\t\r\(\)\{\}:;@!'"\\]|\/(?=\*)/g,
    badBracket = /.[\\\/\("'\n]/;

module.exports = function (input) {
    var tokens = [];
    var css = input.css.valueOf();

    var code, next, quote, lines, last, content, escape, nextLine, nextOffset, escaped, escapePos, bad;

    var length = css.length;
    var offset = -1;
    var line = 1;
    var pos = 0;

    var unclosed = function unclosed(what, end) {
        if (input.safe) {
            css += end;
            next = css.length - 1;
        } else {
            throw input.error("Unclosed " + what, line, pos - offset);
        }
    };

    while (pos < length) {
        code = css.charCodeAt(pos);

        if (code == newline) {
            offset = pos;
            line += 1;
        }

        switch (code) {
            case newline:
            case space:
            case tab:
            case cr:
            case feed:
                next = pos;
                do {
                    next += 1;
                    code = css.charCodeAt(next);
                    if (code == newline) {
                        offset = next;
                        line += 1;
                    }
                } while (code == space || code == newline || code == tab || code == cr || code == feed);

                tokens.push(["space", css.slice(pos, next)]);
                pos = next - 1;
                break;

            case openCurly:
                tokens.push(["{", "{", line, pos - offset]);
                break;

            case closeCurly:
                tokens.push(["}", "}", line, pos - offset]);
                break;

            case colon:
                tokens.push([":", ":", line, pos - offset]);
                break;

            case semicolon:
                tokens.push([";", ";", line, pos - offset]);
                break;

            case openBracket:
                next = css.indexOf(")", pos + 1);
                content = css.slice(pos, next + 1);

                if (next == -1 || badBracket.test(content)) {
                    tokens.push(["(", "(", line, pos - offset]);
                } else {
                    tokens.push(["brackets", content, line, pos - offset, line, next - offset]);
                    pos = next;
                }

                break;

            case closeBracket:
                tokens.push([")", ")", line, pos - offset]);
                break;

            case singleQuote:
            case doubleQuote:
                quote = code == singleQuote ? "'" : "\"";
                next = pos;
                do {
                    escaped = false;
                    next = css.indexOf(quote, next + 1);
                    if (next == -1) unclosed("quote", quote);
                    escapePos = next;
                    while (css.charCodeAt(escapePos - 1) == backslash) {
                        escapePos -= 1;
                        escaped = !escaped;
                    }
                } while (escaped);

                tokens.push(["string", css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
                pos = next;
                break;

            case at:
                atEnd.lastIndex = pos + 1;
                atEnd.test(css);
                if (atEnd.lastIndex === 0) {
                    next = css.length - 1;
                } else {
                    next = atEnd.lastIndex - 2;
                }
                tokens.push(["at-word", css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
                pos = next;
                break;

            case backslash:
                next = pos;
                escape = true;
                while (css.charCodeAt(next + 1) == backslash) {
                    next += 1;
                    escape = !escape;
                }
                code = css.charCodeAt(next + 1);
                if (escape && (code != slash && code != space && code != newline && code != tab && code != cr && code != feed)) {
                    next += 1;
                }
                tokens.push(["word", css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
                pos = next;
                break;

            default:
                if (code == slash && css.charCodeAt(pos + 1) == asterisk) {
                    next = css.indexOf("*/", pos + 2) + 1;
                    if (next === 0) unclosed("comment", "*/");

                    content = css.slice(pos, next + 1);
                    lines = content.split("\n");
                    last = lines.length - 1;

                    if (last > 0) {
                        nextLine = line + last;
                        nextOffset = next - lines[last].length;
                    } else {
                        nextLine = line;
                        nextOffset = offset;
                    }

                    tokens.push(["comment", content, line, pos - offset, nextLine, next - nextOffset]);

                    offset = nextOffset;
                    line = nextLine;
                    pos = next;
                } else {
                    wordEnd.lastIndex = pos + 1;
                    wordEnd.test(css);
                    if (wordEnd.lastIndex === 0) {
                        next = css.length - 1;
                    } else {
                        next = wordEnd.lastIndex - 2;
                    }

                    tokens.push(["word", css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
                    pos = next;
                }

                break;
        }

        pos++;
    }

    return tokens;
};
},{}],110:[function(require,module,exports){
"use strict";

// Methods to work with vendor prefixes
module.exports = {

    // Return vendor prefix from property name, if it exists
    //
    //   vendor.prefix('-moz-box-sizing') #=> '-moz-'
    //   vendor.prefix('box-sizing')      #=> ''
    prefix: function prefix(prop) {
        if (prop[0] == "-") {
            var sep = prop.indexOf("-", 1);
            return prop.substr(0, sep + 1);
        } else {
            return "";
        }
    },

    // Remove prefix from property name
    //
    //   vendor.prefix('-moz-box-sizing') #=> 'box-sizing'
    //   vendor.prefix('box-sizing')      #=> 'box-sizing'
    unprefixed: function unprefixed(prop) {
        if (prop[0] == "-") {
            var sep = prop.indexOf("-", 1);
            return prop.substr(sep + 1);
        } else {
            return prop;
        }
    }

};
},{}],111:[function(require,module,exports){
/*
 * $Id: base64.js,v 2.15 2014/04/05 12:58:57 dankogai Exp dankogai $
 *
 *  Licensed under the MIT license.
 *    http://opensource.org/licenses/mit-license
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */

(function(global) {
    'use strict';
    // existing version for noConflict()
    var _Base64 = global.Base64;
    var version = "2.1.9";
    // if node.js, we use Buffer
    var buffer;
    if (typeof module !== 'undefined' && module.exports) {
        try {
            buffer = require('buffer').Buffer;
        } catch (err) {}
    }
    // constants
    var b64chars
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = function(bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
        return t;
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    // encoder stuff
    var cb_utob = function(c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 0x80 ? c
                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
                                + fromCharCode(0x80 | (cc & 0x3f)))
                : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                   + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                   + fromCharCode(0x80 | ( cc         & 0x3f)));
        } else {
            var cc = 0x10000
                + (c.charCodeAt(0) - 0xD800) * 0x400
                + (c.charCodeAt(1) - 0xDC00);
            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                    + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                    + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                    + fromCharCode(0x80 | ( cc         & 0x3f)));
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function(u) {
        return u.replace(re_utob, cb_utob);
    };
    var cb_encode = function(ccc) {
        var padlen = [0, 2, 1][ccc.length % 3],
        ord = ccc.charCodeAt(0) << 16
            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
        chars = [
            b64chars.charAt( ord >>> 18),
            b64chars.charAt((ord >>> 12) & 63),
            padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
            padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
        ];
        return chars.join('');
    };
    var btoa = global.btoa ? function(b) {
        return global.btoa(b);
    } : function(b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };
    var _encode = buffer ? function (u) {
        return (u.constructor === buffer.constructor ? u : new buffer(u))
        .toString('base64')
    }
    : function (u) { return btoa(utob(u)) }
    ;
    var encode = function(u, urisafe) {
        return !urisafe
            ? _encode(String(u))
            : _encode(String(u)).replace(/[+\/]/g, function(m0) {
                return m0 == '+' ? '-' : '_';
            }).replace(/=/g, '');
    };
    var encodeURI = function(u) { return encode(u, true) };
    // decoder stuff
    var re_btou = new RegExp([
        '[\xC0-\xDF][\x80-\xBF]',
        '[\xE0-\xEF][\x80-\xBF]{2}',
        '[\xF0-\xF7][\x80-\xBF]{3}'
    ].join('|'), 'g');
    var cb_btou = function(cccc) {
        switch(cccc.length) {
        case 4:
            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                |    ((0x3f & cccc.charCodeAt(1)) << 12)
                |    ((0x3f & cccc.charCodeAt(2)) <<  6)
                |     (0x3f & cccc.charCodeAt(3)),
            offset = cp - 0x10000;
            return (fromCharCode((offset  >>> 10) + 0xD800)
                    + fromCharCode((offset & 0x3FF) + 0xDC00));
        case 3:
            return fromCharCode(
                ((0x0f & cccc.charCodeAt(0)) << 12)
                    | ((0x3f & cccc.charCodeAt(1)) << 6)
                    |  (0x3f & cccc.charCodeAt(2))
            );
        default:
            return  fromCharCode(
                ((0x1f & cccc.charCodeAt(0)) << 6)
                    |  (0x3f & cccc.charCodeAt(1))
            );
        }
    };
    var btou = function(b) {
        return b.replace(re_btou, cb_btou);
    };
    var cb_decode = function(cccc) {
        var len = cccc.length,
        padlen = len % 4,
        n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
            | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
            | (len > 2 ? b64tab[cccc.charAt(2)] <<  6 : 0)
            | (len > 3 ? b64tab[cccc.charAt(3)]       : 0),
        chars = [
            fromCharCode( n >>> 16),
            fromCharCode((n >>>  8) & 0xff),
            fromCharCode( n         & 0xff)
        ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    };
    var atob = global.atob ? function(a) {
        return global.atob(a);
    } : function(a){
        return a.replace(/[\s\S]{1,4}/g, cb_decode);
    };
    var _decode = buffer ? function(a) {
        return (a.constructor === buffer.constructor
                ? a : new buffer(a, 'base64')).toString();
    }
    : function(a) { return btou(atob(a)) };
    var decode = function(a){
        return _decode(
            String(a).replace(/[-_]/g, function(m0) { return m0 == '-' ? '+' : '/' })
                .replace(/[^A-Za-z0-9\+\/]/g, '')
        );
    };
    var noConflict = function() {
        var Base64 = global.Base64;
        global.Base64 = _Base64;
        return Base64;
    };
    // export Base64
    global.Base64 = {
        VERSION: version,
        atob: atob,
        btoa: btoa,
        fromBase64: decode,
        toBase64: encode,
        utob: utob,
        encode: encode,
        encodeURI: encodeURI,
        btou: btou,
        decode: decode,
        noConflict: noConflict
    };
    // if ES5 is available, make Base64.extendString() available
    if (typeof Object.defineProperty === 'function') {
        var noEnum = function(v){
            return {value:v,enumerable:false,writable:true,configurable:true};
        };
        global.Base64.extendString = function () {
            Object.defineProperty(
                String.prototype, 'fromBase64', noEnum(function () {
                    return decode(this)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64', noEnum(function (urisafe) {
                    return encode(this, urisafe)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64URI', noEnum(function () {
                    return encode(this, true)
                }));
        };
    }
    // that's it!
    if (global['Meteor']) {
       Base64 = global.Base64; // for normal export in Meteor.js
    }
})(this);

},{"buffer":128}],112:[function(require,module,exports){
/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = require('./source-map/source-map-generator').SourceMapGenerator;
exports.SourceMapConsumer = require('./source-map/source-map-consumer').SourceMapConsumer;
exports.SourceNode = require('./source-map/source-node').SourceNode;

},{"./source-map/source-map-consumer":120,"./source-map/source-map-generator":121,"./source-map/source-node":122}],113:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');

  /**
   * A data structure which is a combination of an array and a set. Adding a new
   * member is O(1), testing for membership is O(1), and finding the index of an
   * element is O(1). Removing elements from the set is not supported. Only
   * strings are supported for membership.
   */
  function ArraySet() {
    this._array = [];
    this._set = {};
  }

  /**
   * Static method for creating ArraySet instances from an existing array.
   */
  ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
    var set = new ArraySet();
    for (var i = 0, len = aArray.length; i < len; i++) {
      set.add(aArray[i], aAllowDuplicates);
    }
    return set;
  };

  /**
   * Add the given string to this set.
   *
   * @param String aStr
   */
  ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
    var isDuplicate = this.has(aStr);
    var idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) {
      this._array.push(aStr);
    }
    if (!isDuplicate) {
      this._set[util.toSetString(aStr)] = idx;
    }
  };

  /**
   * Is the given string a member of this set?
   *
   * @param String aStr
   */
  ArraySet.prototype.has = function ArraySet_has(aStr) {
    return Object.prototype.hasOwnProperty.call(this._set,
                                                util.toSetString(aStr));
  };

  /**
   * What is the index of the given string in the array?
   *
   * @param String aStr
   */
  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
    if (this.has(aStr)) {
      return this._set[util.toSetString(aStr)];
    }
    throw new Error('"' + aStr + '" is not in the set.');
  };

  /**
   * What is the element at the given index?
   *
   * @param Number aIdx
   */
  ArraySet.prototype.at = function ArraySet_at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) {
      return this._array[aIdx];
    }
    throw new Error('No element indexed by ' + aIdx);
  };

  /**
   * Returns the array representation of this set (which has the proper indices
   * indicated by indexOf). Note that this is a copy of the internal array used
   * for storing the members so that no one can mess with internal state.
   */
  ArraySet.prototype.toArray = function ArraySet_toArray() {
    return this._array.slice();
  };

  exports.ArraySet = ArraySet;

});

},{"./util":123,"amdefine":124}],114:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var base64 = require('./base64');

  // A single base 64 digit can contain 6 bits of data. For the base 64 variable
  // length quantities we use in the source map spec, the first bit is the sign,
  // the next four bits are the actual value, and the 6th bit is the
  // continuation bit. The continuation bit tells us whether there are more
  // digits in this value following this digit.
  //
  //   Continuation
  //   |    Sign
  //   |    |
  //   V    V
  //   101011

  var VLQ_BASE_SHIFT = 5;

  // binary: 100000
  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

  // binary: 011111
  var VLQ_BASE_MASK = VLQ_BASE - 1;

  // binary: 100000
  var VLQ_CONTINUATION_BIT = VLQ_BASE;

  /**
   * Converts from a two-complement value to a value where the sign bit is
   * placed in the least significant bit.  For example, as decimals:
   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
   */
  function toVLQSigned(aValue) {
    return aValue < 0
      ? ((-aValue) << 1) + 1
      : (aValue << 1) + 0;
  }

  /**
   * Converts to a two-complement value from a value where the sign bit is
   * placed in the least significant bit.  For example, as decimals:
   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
   */
  function fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative
      ? -shifted
      : shifted;
  }

  /**
   * Returns the base 64 VLQ encoded value.
   */
  exports.encode = function base64VLQ_encode(aValue) {
    var encoded = "";
    var digit;

    var vlq = toVLQSigned(aValue);

    do {
      digit = vlq & VLQ_BASE_MASK;
      vlq >>>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        // There are still more digits in this value, so we must make sure the
        // continuation bit is marked.
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base64.encode(digit);
    } while (vlq > 0);

    return encoded;
  };

  /**
   * Decodes the next base 64 VLQ value from the given string and returns the
   * value and the rest of the string via the out parameter.
   */
  exports.decode = function base64VLQ_decode(aStr, aOutParam) {
    var i = 0;
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;

    do {
      if (i >= strLen) {
        throw new Error("Expected more digits in base 64 VLQ value.");
      }
      digit = base64.decode(aStr.charAt(i++));
      continuation = !!(digit & VLQ_CONTINUATION_BIT);
      digit &= VLQ_BASE_MASK;
      result = result + (digit << shift);
      shift += VLQ_BASE_SHIFT;
    } while (continuation);

    aOutParam.value = fromVLQSigned(result);
    aOutParam.rest = aStr.slice(i);
  };

});

},{"./base64":115,"amdefine":124}],115:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var charToIntMap = {};
  var intToCharMap = {};

  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    .split('')
    .forEach(function (ch, index) {
      charToIntMap[ch] = index;
      intToCharMap[index] = ch;
    });

  /**
   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
   */
  exports.encode = function base64_encode(aNumber) {
    if (aNumber in intToCharMap) {
      return intToCharMap[aNumber];
    }
    throw new TypeError("Must be between 0 and 63: " + aNumber);
  };

  /**
   * Decode a single base 64 digit to an integer.
   */
  exports.decode = function base64_decode(aChar) {
    if (aChar in charToIntMap) {
      return charToIntMap[aChar];
    }
    throw new TypeError("Not a valid base 64 digit: " + aChar);
  };

});

},{"amdefine":124}],116:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');
  var binarySearch = require('./binary-search');
  var ArraySet = require('./array-set').ArraySet;
  var base64VLQ = require('./base64-vlq');
  var SourceMapConsumer = require('./source-map-consumer').SourceMapConsumer;

  /**
   * A BasicSourceMapConsumer instance represents a parsed source map which we can
   * query for information about the original file positions by giving it a file
   * position in the generated source.
   *
   * The only parameter is the raw source map (either as a JSON string, or
   * already parsed to an object). According to the spec, source maps have the
   * following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - sources: An array of URLs to the original source files.
   *   - names: An array of identifiers which can be referrenced by individual mappings.
   *   - sourceRoot: Optional. The URL root from which all sources are relative.
   *   - sourcesContent: Optional. An array of contents of the original source files.
   *   - mappings: A string of base64 VLQs which contain the actual mappings.
   *   - file: Optional. The generated file this source map is associated with.
   *
   * Here is an example source map, taken from the source map spec[0]:
   *
   *     {
   *       version : 3,
   *       file: "out.js",
   *       sourceRoot : "",
   *       sources: ["foo.js", "bar.js"],
   *       names: ["src", "maps", "are", "fun"],
   *       mappings: "AA,AB;;ABCDE;"
   *     }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
   */
  function BasicSourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    var version = util.getArg(sourceMap, 'version');
    var sources = util.getArg(sourceMap, 'sources');
    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
    // requires the array) to play nice here.
    var names = util.getArg(sourceMap, 'names', []);
    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
    var mappings = util.getArg(sourceMap, 'mappings');
    var file = util.getArg(sourceMap, 'file', null);

    // Once again, Sass deviates from the spec and supplies the version as a
    // string rather than a number, so we use loose equality checking here.
    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    sources = sources.map(util.normalize);

    // Pass `true` below to allow duplicate names and sources. While source maps
    // are intended to be compressed and deduplicated, the TypeScript compiler
    // sometimes generates source maps with duplicates in them. See Github issue
    // #72 and bugzil.la/889492.
    this._names = ArraySet.fromArray(names, true);
    this._sources = ArraySet.fromArray(sources, true);

    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this.file = file;
  }

  BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

  /**
   * Create a BasicSourceMapConsumer from a SourceMapGenerator.
   *
   * @param SourceMapGenerator aSourceMap
   *        The source map that will be consumed.
   * @returns BasicSourceMapConsumer
   */
  BasicSourceMapConsumer.fromSourceMap =
    function SourceMapConsumer_fromSourceMap(aSourceMap) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);

      smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                              smc.sourceRoot);
      smc.file = aSourceMap._file;

      smc.__generatedMappings = aSourceMap._mappings.toArray().slice();
      smc.__originalMappings = aSourceMap._mappings.toArray().slice()
        .sort(util.compareByOriginalPositions);

      return smc;
    };

  /**
   * The version of the source mapping spec that we are consuming.
   */
  BasicSourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
    get: function () {
      return this._sources.toArray().map(function (s) {
        return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
      }, this);
    }
  });

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  BasicSourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var str = aStr;
      var temp = {};
      var mapping;

      while (str.length > 0) {
        if (str.charAt(0) === ';') {
          generatedLine++;
          str = str.slice(1);
          previousGeneratedColumn = 0;
        }
        else if (str.charAt(0) === ',') {
          str = str.slice(1);
        }
        else {
          mapping = {};
          mapping.generatedLine = generatedLine;

          // Generated column.
          base64VLQ.decode(str, temp);
          mapping.generatedColumn = previousGeneratedColumn + temp.value;
          previousGeneratedColumn = mapping.generatedColumn;
          str = temp.rest;

          if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
            // Original source.
            base64VLQ.decode(str, temp);
            mapping.source = this._sources.at(previousSource + temp.value);
            previousSource += temp.value;
            str = temp.rest;
            if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
              throw new Error('Found a source, but no line and column');
            }

            // Original line.
            base64VLQ.decode(str, temp);
            mapping.originalLine = previousOriginalLine + temp.value;
            previousOriginalLine = mapping.originalLine;
            // Lines are stored 0-based
            mapping.originalLine += 1;
            str = temp.rest;
            if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
              throw new Error('Found a source and line, but no column');
            }

            // Original column.
            base64VLQ.decode(str, temp);
            mapping.originalColumn = previousOriginalColumn + temp.value;
            previousOriginalColumn = mapping.originalColumn;
            str = temp.rest;

            if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
              // Original name.
              base64VLQ.decode(str, temp);
              mapping.name = this._names.at(previousName + temp.value);
              previousName += temp.value;
              str = temp.rest;
            }
          }

          this.__generatedMappings.push(mapping);
          if (typeof mapping.originalLine === 'number') {
            this.__originalMappings.push(mapping);
          }
        }
      }

      this.__generatedMappings.sort(util.compareByGeneratedPositions);
      this.__originalMappings.sort(util.compareByOriginalPositions);
    };

  /**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
  BasicSourceMapConsumer.prototype._findMapping =
    function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                           aColumnName, aComparator) {
      // To return the position we are searching for, we must first find the
      // mapping for the given position and then return the opposite position it
      // points to. Because the mappings are sorted, we can use binary search to
      // find the best mapping.

      if (aNeedle[aLineName] <= 0) {
        throw new TypeError('Line must be greater than or equal to 1, got '
                            + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError('Column must be greater than or equal to 0, got '
                            + aNeedle[aColumnName]);
      }

      return binarySearch.search(aNeedle, aMappings, aComparator);
    };

  /**
   * Compute the last column for each generated mapping. The last column is
   * inclusive.
   */
  BasicSourceMapConsumer.prototype.computeColumnSpans =
    function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];

        // Mappings do not contain a field for the last generated columnt. We
        // can come up with an optimistic estimate, however, by assuming that
        // mappings are contiguous (i.e. given two consecutive mappings, the
        // first mapping ends where the second one starts).
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];

          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }

        // The last mapping for each line spans the entire line.
        mapping.lastGeneratedColumn = Infinity;
      }
    };

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
  BasicSourceMapConsumer.prototype.originalPositionFor =
    function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      };

      var index = this._findMapping(needle,
                                    this._generatedMappings,
                                    "generatedLine",
                                    "generatedColumn",
                                    util.compareByGeneratedPositions);

      if (index >= 0) {
        var mapping = this._generatedMappings[index];

        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, 'source', null);
          if (source != null && this.sourceRoot != null) {
            source = util.join(this.sourceRoot, source);
          }
          return {
            source: source,
            line: util.getArg(mapping, 'originalLine', null),
            column: util.getArg(mapping, 'originalColumn', null),
            name: util.getArg(mapping, 'name', null)
          };
        }
      }

      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * availible.
   */
  BasicSourceMapConsumer.prototype.sourceContentFor =
    function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }

      if (this.sourceRoot != null) {
        aSource = util.relative(this.sourceRoot, aSource);
      }

      if (this._sources.has(aSource)) {
        return this.sourcesContent[this._sources.indexOf(aSource)];
      }

      var url;
      if (this.sourceRoot != null
          && (url = util.urlParse(this.sourceRoot))) {
        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
        // many users. We can help them out when they expect file:// URIs to
        // behave like it would if they were running a local HTTP server. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
        var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
        if (url.scheme == "file"
            && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
        }

        if ((!url.path || url.path == "/")
            && this._sources.has("/" + aSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + aSource)];
        }
      }

      // This function is used recursively from
      // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
      // don't want to throw if we can't find the source - we just want to
      // return null, so we provide a flag to exit gracefully.
      if (nullOnMissing) {
        return null;
      }
      else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  BasicSourceMapConsumer.prototype.generatedPositionFor =
    function SourceMapConsumer_generatedPositionFor(aArgs) {
      var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: util.getArg(aArgs, 'column')
      };

      if (this.sourceRoot != null) {
        needle.source = util.relative(this.sourceRoot, needle.source);
      }

      var index = this._findMapping(needle,
                                    this._originalMappings,
                                    "originalLine",
                                    "originalColumn",
                                    util.compareByOriginalPositions);

      if (index >= 0) {
        var mapping = this._originalMappings[index];

        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }

      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };

  exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

});

},{"./array-set":113,"./base64-vlq":114,"./binary-search":117,"./source-map-consumer":120,"./util":123,"amdefine":124}],117:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  /**
   * Recursive implementation of binary search.
   *
   * @param aLow Indices here and lower do not contain the needle.
   * @param aHigh Indices here and higher do not contain the needle.
   * @param aNeedle The element being searched for.
   * @param aHaystack The non-empty array being searched.
   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
   */
  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare) {
    // This function terminates when one of the following is true:
    //
    //   1. We find the exact element we are looking for.
    //
    //   2. We did not find the exact element, but we can return the index of
    //      the next closest element that is less than that element.
    //
    //   3. We did not find the exact element, and there is no next-closest
    //      element which is less than the one we are searching for, so we
    //      return -1.
    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
    var cmp = aCompare(aNeedle, aHaystack[mid], true);
    if (cmp === 0) {
      // Found the element we are looking for.
      return mid;
    }
    else if (cmp > 0) {
      // aHaystack[mid] is greater than our needle.
      if (aHigh - mid > 1) {
        // The element is in the upper half.
        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare);
      }
      // We did not find an exact match, return the next closest one
      // (termination case 2).
      return mid;
    }
    else {
      // aHaystack[mid] is less than our needle.
      if (mid - aLow > 1) {
        // The element is in the lower half.
        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare);
      }
      // The exact needle element was not found in this haystack. Determine if
      // we are in termination case (2) or (3) and return the appropriate thing.
      return aLow < 0 ? -1 : aLow;
    }
  }

  /**
   * This is an implementation of binary search which will always try and return
   * the index of next lowest value checked if there is no exact hit. This is
   * because mappings between original and generated line/col pairs are single
   * points, and there is an implicit region between each of them, so a miss
   * just means that you aren't on the very start of a region.
   *
   * @param aNeedle The element you are looking for.
   * @param aHaystack The array that is being searched.
   * @param aCompare A function which takes the needle and an element in the
   *     array and returns -1, 0, or 1 depending on whether the needle is less
   *     than, equal to, or greater than the element, respectively.
   */
  exports.search = function search(aNeedle, aHaystack, aCompare) {
    if (aHaystack.length === 0) {
      return -1;
    }
    return recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare)
  };

});

},{"amdefine":124}],118:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');
  var binarySearch = require('./binary-search');
  var SourceMapConsumer = require('./source-map-consumer').SourceMapConsumer;
  var BasicSourceMapConsumer = require('./basic-source-map-consumer').BasicSourceMapConsumer;

  /**
   * An IndexedSourceMapConsumer instance represents a parsed source map which
   * we can query for information. It differs from BasicSourceMapConsumer in
   * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
   * input.
   *
   * The only parameter is a raw source map (either as a JSON string, or already
   * parsed to an object). According to the spec for indexed source maps, they
   * have the following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - file: Optional. The generated file this source map is associated with.
   *   - sections: A list of section definitions.
   *
   * Each value under the "sections" field has two fields:
   *   - offset: The offset into the original specified at which this section
   *       begins to apply, defined as an object with a "line" and "column"
   *       field.
   *   - map: A source map definition. This source map could also be indexed,
   *       but doesn't have to be.
   *
   * Instead of the "map" field, it's also possible to have a "url" field
   * specifying a URL to retrieve a source map from, but that's currently
   * unsupported.
   *
   * Here's an example source map, taken from the source map spec[0], but
   * modified to omit a section which uses the "url" field.
   *
   *  {
   *    version : 3,
   *    file: "app.js",
   *    sections: [{
   *      offset: {line:100, column:10},
   *      map: {
   *        version : 3,
   *        file: "section.js",
   *        sources: ["foo.js", "bar.js"],
   *        names: ["src", "maps", "are", "fun"],
   *        mappings: "AAAA,E;;ABCDE;"
   *      }
   *    }],
   *  }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
   */
  function IndexedSourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    var version = util.getArg(sourceMap, 'version');
    var sections = util.getArg(sourceMap, 'sections');

    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    var lastOffset = {
      line: -1,
      column: 0
    };
    this._sections = sections.map(function (s) {
      if (s.url) {
        // The url field will require support for asynchronicity.
        // See https://github.com/mozilla/source-map/issues/16
        throw new Error('Support for url field in sections not implemented.');
      }
      var offset = util.getArg(s, 'offset');
      var offsetLine = util.getArg(offset, 'line');
      var offsetColumn = util.getArg(offset, 'column');

      if (offsetLine < lastOffset.line ||
          (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
        throw new Error('Section offsets must be ordered and non-overlapping.');
      }
      lastOffset = offset;

      return {
        generatedOffset: {
          // The offset fields are 0-based, but we use 1-based indices when
          // encoding/decoding from VLQ.
          generatedLine: offsetLine + 1,
          generatedColumn: offsetColumn + 1
        },
        consumer: new SourceMapConsumer(util.getArg(s, 'map'))
      }
    });
  }

  IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

  /**
   * The version of the source mapping spec that we are consuming.
   */
  IndexedSourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
    get: function () {
      var sources = [];
      for (var i = 0; i < this._sections.length; i++) {
        for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
          sources.push(this._sections[i].consumer.sources[j]);
        }
      };
      return sources;
    }
  });

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
  IndexedSourceMapConsumer.prototype.originalPositionFor =
    function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      };

      // Find the section containing the generated position we're trying to map
      // to an original position.
      var sectionIndex = binarySearch.search(needle, this._sections,
        function(needle, section) {
          var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }

          return (needle.generatedColumn -
                  section.generatedOffset.generatedColumn);
        });
      var section = this._sections[sectionIndex];

      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }

      return section.consumer.originalPositionFor({
        line: needle.generatedLine -
          (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn -
          (section.generatedOffset.generatedLine === needle.generatedLine
           ? section.generatedOffset.generatedColumn - 1
           : 0)
      });
    };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * available.
   */
  IndexedSourceMapConsumer.prototype.sourceContentFor =
    function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];

        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      }
      else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  IndexedSourceMapConsumer.prototype.generatedPositionFor =
    function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];

        // Only consider this section if the requested source is in the list of
        // sources of the consumer.
        if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line +
              (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column +
              (section.generatedOffset.generatedLine === generatedPosition.line
               ? section.generatedOffset.generatedColumn - 1
               : 0)
          };
          return ret;
        }
      }

      return {
        line: null,
        column: null
      };
    };

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  IndexedSourceMapConsumer.prototype._parseMappings =
    function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[i];

          var source = mapping.source;
          var sourceRoot = section.consumer.sourceRoot;

          if (source != null && sourceRoot != null) {
            source = util.join(sourceRoot, source);
          }

          // The mappings coming from the consumer for the section have
          // generated positions relative to the start of the section, so we
          // need to offset them to be relative to the start of the concatenated
          // generated file.
          var adjustedMapping = {
            source: source,
            generatedLine: mapping.generatedLine +
              (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.column +
              (section.generatedOffset.generatedLine === mapping.generatedLine)
              ? section.generatedOffset.generatedColumn - 1
              : 0,
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name: mapping.name
          };

          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === 'number') {
            this.__originalMappings.push(adjustedMapping);
          }
        };
      };

    this.__generatedMappings.sort(util.compareByGeneratedPositions);
    this.__originalMappings.sort(util.compareByOriginalPositions);
  };

  exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
});

},{"./basic-source-map-consumer":116,"./binary-search":117,"./source-map-consumer":120,"./util":123,"amdefine":124}],119:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');

  /**
   * Determine whether mappingB is after mappingA with respect to generated
   * position.
   */
  function generatedPositionAfter(mappingA, mappingB) {
    // Optimized for most common case
    var lineA = mappingA.generatedLine;
    var lineB = mappingB.generatedLine;
    var columnA = mappingA.generatedColumn;
    var columnB = mappingB.generatedColumn;
    return lineB > lineA || lineB == lineA && columnB >= columnA ||
           util.compareByGeneratedPositions(mappingA, mappingB) <= 0;
  }

  /**
   * A data structure to provide a sorted view of accumulated mappings in a
   * performance conscious manner. It trades a neglibable overhead in general
   * case for a large speedup in case of mappings being added in order.
   */
  function MappingList() {
    this._array = [];
    this._sorted = true;
    // Serves as infimum
    this._last = {generatedLine: -1, generatedColumn: 0};
  }

  /**
   * Iterate through internal items. This method takes the same arguments that
   * `Array.prototype.forEach` takes.
   *
   * NOTE: The order of the mappings is NOT guaranteed.
   */
  MappingList.prototype.unsortedForEach =
    function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };

  /**
   * Add the given source mapping.
   *
   * @param Object aMapping
   */
  MappingList.prototype.add = function MappingList_add(aMapping) {
    var mapping;
    if (generatedPositionAfter(this._last, aMapping)) {
      this._last = aMapping;
      this._array.push(aMapping);
    } else {
      this._sorted = false;
      this._array.push(aMapping);
    }
  };

  /**
   * Returns the flat, sorted array of mappings. The mappings are sorted by
   * generated position.
   *
   * WARNING: This method returns internal data without copying, for
   * performance. The return value must NOT be mutated, and should be treated as
   * an immutable borrow. If you want to take ownership, you must make your own
   * copy.
   */
  MappingList.prototype.toArray = function MappingList_toArray() {
    if (!this._sorted) {
      this._array.sort(util.compareByGeneratedPositions);
      this._sorted = true;
    }
    return this._array;
  };

  exports.MappingList = MappingList;

});

},{"./util":123,"amdefine":124}],120:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');

  function SourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    // We do late requires because the subclasses require() this file.
    if (sourceMap.sections != null) {
      var indexedSourceMapConsumer = require('./indexed-source-map-consumer');
      return new indexedSourceMapConsumer.IndexedSourceMapConsumer(sourceMap);
    } else {
      var basicSourceMapConsumer = require('./basic-source-map-consumer');
      return new basicSourceMapConsumer.BasicSourceMapConsumer(sourceMap);
    }
  }

  SourceMapConsumer.fromSourceMap = function(aSourceMap) {
    var basicSourceMapConsumer = require('./basic-source-map-consumer');
    return basicSourceMapConsumer.BasicSourceMapConsumer
            .fromSourceMap(aSourceMap);
  }

  /**
   * The version of the source mapping spec that we are consuming.
   */
  SourceMapConsumer.prototype._version = 3;


  // `__generatedMappings` and `__originalMappings` are arrays that hold the
  // parsed mapping coordinates from the source map's "mappings" attribute. They
  // are lazily instantiated, accessed via the `_generatedMappings` and
  // `_originalMappings` getters respectively, and we only parse the mappings
  // and create these arrays once queried for a source location. We jump through
  // these hoops because there can be many thousands of mappings, and parsing
  // them is expensive, so we only want to do it if we must.
  //
  // Each object in the arrays is of the form:
  //
  //     {
  //       generatedLine: The line number in the generated code,
  //       generatedColumn: The column number in the generated code,
  //       source: The path to the original source file that generated this
  //               chunk of code,
  //       originalLine: The line number in the original source that
  //                     corresponds to this chunk of generated code,
  //       originalColumn: The column number in the original source that
  //                       corresponds to this chunk of generated code,
  //       name: The name of the original symbol which generated this chunk of
  //             code.
  //     }
  //
  // All properties except for `generatedLine` and `generatedColumn` can be
  // `null`.
  //
  // `_generatedMappings` is ordered by the generated positions.
  //
  // `_originalMappings` is ordered by the original positions.

  SourceMapConsumer.prototype.__generatedMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
    get: function () {
      if (!this.__generatedMappings) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__generatedMappings;
    }
  });

  SourceMapConsumer.prototype.__originalMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
    get: function () {
      if (!this.__originalMappings) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__originalMappings;
    }
  });

  SourceMapConsumer.prototype._nextCharIsMappingSeparator =
    function SourceMapConsumer_nextCharIsMappingSeparator(aStr) {
      var c = aStr.charAt(0);
      return c === ";" || c === ",";
    };

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  SourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    };

  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;

  /**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
  SourceMapConsumer.prototype.eachMapping =
    function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

      var mappings;
      switch (order) {
      case SourceMapConsumer.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
      }

      var sourceRoot = this.sourceRoot;
      mappings.map(function (mapping) {
        var source = mapping.source;
        if (source != null && sourceRoot != null) {
          source = util.join(sourceRoot, source);
        }
        return {
          source: source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name
        };
      }).forEach(aCallback, context);
    };

  /**
   * Returns all generated line and column information for the original source
   * and line provided. The only argument is an object with the following
   * properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *
   * and an array of objects is returned, each with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  SourceMapConsumer.prototype.allGeneratedPositionsFor =
    function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
      // returns the index of the closest mapping less than the needle. By
      // setting needle.originalColumn to Infinity, we thus find the last
      // mapping for the given line, provided such a mapping exists.
      var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: Infinity
      };

      if (this.sourceRoot != null) {
        needle.source = util.relative(this.sourceRoot, needle.source);
      }

      var mappings = [];

      var index = this._findMapping(needle,
                                    this._originalMappings,
                                    "originalLine",
                                    "originalColumn",
                                    util.compareByOriginalPositions);
      if (index >= 0) {
        var mapping = this._originalMappings[index];

        while (mapping && mapping.originalLine === needle.originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[--index];
        }
      }

      return mappings.reverse();
    };

  exports.SourceMapConsumer = SourceMapConsumer;

});

},{"./basic-source-map-consumer":116,"./indexed-source-map-consumer":118,"./util":123,"amdefine":124}],121:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var base64VLQ = require('./base64-vlq');
  var util = require('./util');
  var ArraySet = require('./array-set').ArraySet;
  var MappingList = require('./mapping-list').MappingList;

  /**
   * An instance of the SourceMapGenerator represents a source map which is
   * being built incrementally. You may pass an object with the following
   * properties:
   *
   *   - file: The filename of the generated source.
   *   - sourceRoot: A root for all relative URLs in this source map.
   */
  function SourceMapGenerator(aArgs) {
    if (!aArgs) {
      aArgs = {};
    }
    this._file = util.getArg(aArgs, 'file', null);
    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
    this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
    this._sources = new ArraySet();
    this._names = new ArraySet();
    this._mappings = new MappingList();
    this._sourcesContents = null;
  }

  SourceMapGenerator.prototype._version = 3;

  /**
   * Creates a new SourceMapGenerator based on a SourceMapConsumer
   *
   * @param aSourceMapConsumer The SourceMap.
   */
  SourceMapGenerator.fromSourceMap =
    function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot: sourceRoot
      });
      aSourceMapConsumer.eachMapping(function (mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };

        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }

          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };

          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }

        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };

  /**
   * Add a single mapping from original source line and column to the generated
   * source's line and column for this source map being created. The mapping
   * object should have the following properties:
   *
   *   - generated: An object with the generated line and column positions.
   *   - original: An object with the original line and column positions.
   *   - source: The original source file (relative to the sourceRoot).
   *   - name: An optional original token name for this mapping.
   */
  SourceMapGenerator.prototype.addMapping =
    function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, 'generated');
      var original = util.getArg(aArgs, 'original', null);
      var source = util.getArg(aArgs, 'source', null);
      var name = util.getArg(aArgs, 'name', null);

      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name);
      }

      if (source != null && !this._sources.has(source)) {
        this._sources.add(source);
      }

      if (name != null && !this._names.has(name)) {
        this._names.add(name);
      }

      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source: source,
        name: name
      });
    };

  /**
   * Set the source content for a source file.
   */
  SourceMapGenerator.prototype.setSourceContent =
    function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }

      if (aSourceContent != null) {
        // Add the source content to the _sourcesContents map.
        // Create a new _sourcesContents map if the property is null.
        if (!this._sourcesContents) {
          this._sourcesContents = {};
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        // Remove the source file from the _sourcesContents map.
        // If the _sourcesContents map is empty, set the property to null.
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };

  /**
   * Applies the mappings of a sub-source-map for a specific source file to the
   * source map being generated. Each mapping to the supplied source file is
   * rewritten using the supplied source map. Note: The resolution for the
   * resulting mappings is the minimium of this map and the supplied map.
   *
   * @param aSourceMapConsumer The source map to be applied.
   * @param aSourceFile Optional. The filename of the source file.
   *        If omitted, SourceMapConsumer's file property will be used.
   * @param aSourceMapPath Optional. The dirname of the path to the source map
   *        to be applied. If relative, it is relative to the SourceMapConsumer.
   *        This parameter is needed when the two source maps aren't in the same
   *        directory, and the source map to be applied contains relative source
   *        paths. If so, those relative source paths need to be rewritten
   *        relative to the SourceMapGenerator.
   */
  SourceMapGenerator.prototype.applySourceMap =
    function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      // If aSourceFile is omitted, we will use the file property of the SourceMap
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
            'or the source map\'s "file" property. Both were omitted.'
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      // Make "sourceFile" relative if an absolute Url is passed.
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      // Applying the SourceMap can add and remove items from the sources and
      // the names array.
      var newSources = new ArraySet();
      var newNames = new ArraySet();

      // Find mappings for the "sourceFile"
      this._mappings.unsortedForEach(function (mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          // Check if it can be mapped by the source map, then update the mapping.
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            // Copy mapping
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source)
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }

        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }

        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }

      }, this);
      this._sources = newSources;
      this._names = newNames;

      // Copy sourcesContents of applied map.
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile = util.join(aSourceMapPath, sourceFile);
          }
          if (sourceRoot != null) {
            sourceFile = util.relative(sourceRoot, sourceFile);
          }
          this.setSourceContent(sourceFile, content);
        }
      }, this);
    };

  /**
   * A mapping can have one of the three levels of data:
   *
   *   1. Just the generated position.
   *   2. The Generated position, original position, and original source.
   *   3. Generated and original position, original source, as well as a name
   *      token.
   *
   * To maintain consistency, we validate that any new mapping being added falls
   * in to one of these categories.
   */
  SourceMapGenerator.prototype._validateMapping =
    function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                                aName) {
      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
          && aGenerated.line > 0 && aGenerated.column >= 0
          && !aOriginal && !aSource && !aName) {
        // Case 1.
        return;
      }
      else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
               && aOriginal && 'line' in aOriginal && 'column' in aOriginal
               && aGenerated.line > 0 && aGenerated.column >= 0
               && aOriginal.line > 0 && aOriginal.column >= 0
               && aSource) {
        // Cases 2 and 3.
        return;
      }
      else {
        throw new Error('Invalid mapping: ' + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    };

  /**
   * Serialize the accumulated mappings in to the stream of base 64 VLQs
   * specified by the source map format.
   */
  SourceMapGenerator.prototype._serializeMappings =
    function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = '';
      var mapping;

      var mappings = this._mappings.toArray();

      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];

        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            result += ';';
            previousGeneratedLine++;
          }
        }
        else {
          if (i > 0) {
            if (!util.compareByGeneratedPositions(mapping, mappings[i - 1])) {
              continue;
            }
            result += ',';
          }
        }

        result += base64VLQ.encode(mapping.generatedColumn
                                   - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;

        if (mapping.source != null) {
          result += base64VLQ.encode(this._sources.indexOf(mapping.source)
                                     - previousSource);
          previousSource = this._sources.indexOf(mapping.source);

          // lines are stored 0-based in SourceMap spec version 3
          result += base64VLQ.encode(mapping.originalLine - 1
                                     - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;

          result += base64VLQ.encode(mapping.originalColumn
                                     - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;

          if (mapping.name != null) {
            result += base64VLQ.encode(this._names.indexOf(mapping.name)
                                       - previousName);
            previousName = this._names.indexOf(mapping.name);
          }
        }
      }

      return result;
    };

  SourceMapGenerator.prototype._generateSourcesContent =
    function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function (source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents,
                                                    key)
          ? this._sourcesContents[key]
          : null;
      }, this);
    };

  /**
   * Externalize the source map.
   */
  SourceMapGenerator.prototype.toJSON =
    function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }

      return map;
    };

  /**
   * Render the source map being generated to a string.
   */
  SourceMapGenerator.prototype.toString =
    function SourceMapGenerator_toString() {
      return JSON.stringify(this);
    };

  exports.SourceMapGenerator = SourceMapGenerator;

});

},{"./array-set":113,"./base64-vlq":114,"./mapping-list":119,"./util":123,"amdefine":124}],122:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var SourceMapGenerator = require('./source-map-generator').SourceMapGenerator;
  var util = require('./util');

  // Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
  // operating systems these days (capturing the result).
  var REGEX_NEWLINE = /(\r?\n)/;

  // Newline character code for charCodeAt() comparisons
  var NEWLINE_CODE = 10;

  // Private symbol for identifying `SourceNode`s when multiple versions of
  // the source-map library are loaded. This MUST NOT CHANGE across
  // versions!
  var isSourceNode = "$$$isSourceNode$$$";

  /**
   * SourceNodes provide a way to abstract over interpolating/concatenating
   * snippets of generated JavaScript source code while maintaining the line and
   * column information associated with the original source code.
   *
   * @param aLine The original line number.
   * @param aColumn The original column number.
   * @param aSource The original source's filename.
   * @param aChunks Optional. An array of strings which are snippets of
   *        generated JS, or other SourceNodes.
   * @param aName The original identifier.
   */
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [];
    this.sourceContents = {};
    this.line = aLine == null ? null : aLine;
    this.column = aColumn == null ? null : aColumn;
    this.source = aSource == null ? null : aSource;
    this.name = aName == null ? null : aName;
    this[isSourceNode] = true;
    if (aChunks != null) this.add(aChunks);
  }

  /**
   * Creates a SourceNode from generated code and a SourceMapConsumer.
   *
   * @param aGeneratedCode The generated code
   * @param aSourceMapConsumer The SourceMap for the generated code
   * @param aRelativePath Optional. The path that relative sources in the
   *        SourceMapConsumer should be relative to.
   */
  SourceNode.fromStringWithSourceMap =
    function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      // The SourceNode we want to fill with the generated code
      // and the SourceMap
      var node = new SourceNode();

      // All even indices of this array are one line of the generated code,
      // while all odd indices are the newlines between two adjacent lines
      // (since `REGEX_NEWLINE` captures its match).
      // Processed fragments are removed from this array, by calling `shiftNextLine`.
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var shiftNextLine = function() {
        var lineContents = remainingLines.shift();
        // The last line of a file might not have a newline.
        var newLine = remainingLines.shift() || "";
        return lineContents + newLine;
      };

      // We need to remember the position of "remainingLines"
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;

      // The generate SourceNodes we need a code range.
      // To extract it current and last mapping is used.
      // Here we store the last mapping.
      var lastMapping = null;

      aSourceMapConsumer.eachMapping(function (mapping) {
        if (lastMapping !== null) {
          // We add the code from "lastMapping" to "mapping":
          // First check if there is a new line in between.
          if (lastGeneratedLine < mapping.generatedLine) {
            var code = "";
            // Associate first line with "lastMapping"
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
            // The remaining code is added without mapping
          } else {
            // There is no new line in between.
            // Associate the code between "lastGeneratedColumn" and
            // "mapping.generatedColumn" with "lastMapping"
            var nextLine = remainingLines[0];
            var code = nextLine.substr(0, mapping.generatedColumn -
                                          lastGeneratedColumn);
            remainingLines[0] = nextLine.substr(mapping.generatedColumn -
                                                lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            // No more remaining code, continue
            lastMapping = mapping;
            return;
          }
        }
        // We add the generated code until the first mapping
        // to the SourceNode without any mapping.
        // Each line is added as separate string.
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[0];
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[0] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      // We have processed all mappings.
      if (remainingLines.length > 0) {
        if (lastMapping) {
          // Associate the remaining code in the current line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        // and add the remaining lines without any mapping
        node.add(remainingLines.join(""));
      }

      // Copy sourcesContent into SourceNode
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });

      return node;

      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === undefined) {
          node.add(code);
        } else {
          var source = aRelativePath
            ? util.join(aRelativePath, mapping.source)
            : mapping.source;
          node.add(new SourceNode(mapping.originalLine,
                                  mapping.originalColumn,
                                  source,
                                  code,
                                  mapping.name));
        }
      }
    };

  /**
   * Add a chunk of generated JS to this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) {
      aChunk.forEach(function (chunk) {
        this.add(chunk);
      }, this);
    }
    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      if (aChunk) {
        this.children.push(aChunk);
      }
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Add a chunk of generated JS to the beginning of this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) {
      for (var i = aChunk.length-1; i >= 0; i--) {
        this.prepend(aChunk[i]);
      }
    }
    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      this.children.unshift(aChunk);
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Walk over the tree of JS snippets in this node and its children. The
   * walking function is called once for each snippet of JS and is passed that
   * snippet and the its original associated source's line/column location.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    var chunk;
    for (var i = 0, len = this.children.length; i < len; i++) {
      chunk = this.children[i];
      if (chunk[isSourceNode]) {
        chunk.walk(aFn);
      }
      else {
        if (chunk !== '') {
          aFn(chunk, { source: this.source,
                       line: this.line,
                       column: this.column,
                       name: this.name });
        }
      }
    }
  };

  /**
   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
   * each of `this.children`.
   *
   * @param aSep The separator.
   */
  SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length;
    if (len > 0) {
      newChildren = [];
      for (i = 0; i < len-1; i++) {
        newChildren.push(this.children[i]);
        newChildren.push(aSep);
      }
      newChildren.push(this.children[i]);
      this.children = newChildren;
    }
    return this;
  };

  /**
   * Call String.prototype.replace on the very right-most source snippet. Useful
   * for trimming whitespace from the end of a source node, etc.
   *
   * @param aPattern The pattern to replace.
   * @param aReplacement The thing to replace the pattern with.
   */
  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild[isSourceNode]) {
      lastChild.replaceRight(aPattern, aReplacement);
    }
    else if (typeof lastChild === 'string') {
      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    }
    else {
      this.children.push(''.replace(aPattern, aReplacement));
    }
    return this;
  };

  /**
   * Set the source content for a source file. This will be added to the SourceMapGenerator
   * in the sourcesContent field.
   *
   * @param aSourceFile The filename of the source file
   * @param aSourceContent The content of the source file
   */
  SourceNode.prototype.setSourceContent =
    function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };

  /**
   * Walk over the tree of SourceNodes. The walking function is called for each
   * source file content and is passed the filename and source content.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walkSourceContents =
    function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }

      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };

  /**
   * Return the string representation of this source node. Walks over the tree
   * and concatenates all the various snippets together to one string.
   */
  SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function (chunk) {
      str += chunk;
    });
    return str;
  };

  /**
   * Returns the string representation of this source node along with a source
   * map.
   */
  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    };
    var map = new SourceMapGenerator(aArgs);
    var sourceMappingActive = false;
    var lastOriginalSource = null;
    var lastOriginalLine = null;
    var lastOriginalColumn = null;
    var lastOriginalName = null;
    this.walk(function (chunk, original) {
      generated.code += chunk;
      if (original.source !== null
          && original.line !== null
          && original.column !== null) {
        if(lastOriginalSource !== original.source
           || lastOriginalLine !== original.line
           || lastOriginalColumn !== original.column
           || lastOriginalName !== original.name) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
        lastOriginalSource = original.source;
        lastOriginalLine = original.line;
        lastOriginalColumn = original.column;
        lastOriginalName = original.name;
        sourceMappingActive = true;
      } else if (sourceMappingActive) {
        map.addMapping({
          generated: {
            line: generated.line,
            column: generated.column
          }
        });
        lastOriginalSource = null;
        sourceMappingActive = false;
      }
      for (var idx = 0, length = chunk.length; idx < length; idx++) {
        if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
          generated.line++;
          generated.column = 0;
          // Mappings end at eol
          if (idx + 1 === length) {
            lastOriginalSource = null;
            sourceMappingActive = false;
          } else if (sourceMappingActive) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
        } else {
          generated.column++;
        }
      }
    });
    this.walkSourceContents(function (sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    });

    return { code: generated.code, map: map };
  };

  exports.SourceNode = SourceNode;

});

},{"./source-map-generator":121,"./util":123,"amdefine":124}],123:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  /**
   * This is a helper function for getting values from parameter/options
   * objects.
   *
   * @param args The object we are extracting values from
   * @param name The name of the property we are getting.
   * @param defaultValue An optional value to return if the property is missing
   * from the object. If this is not specified and the property is missing, an
   * error will be thrown.
   */
  function getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) {
      return aArgs[aName];
    } else if (arguments.length === 3) {
      return aDefaultValue;
    } else {
      throw new Error('"' + aName + '" is a required argument.');
    }
  }
  exports.getArg = getArg;

  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
  var dataUrlRegexp = /^data:.+\,.+$/;

  function urlParse(aUrl) {
    var match = aUrl.match(urlRegexp);
    if (!match) {
      return null;
    }
    return {
      scheme: match[1],
      auth: match[2],
      host: match[3],
      port: match[4],
      path: match[5]
    };
  }
  exports.urlParse = urlParse;

  function urlGenerate(aParsedUrl) {
    var url = '';
    if (aParsedUrl.scheme) {
      url += aParsedUrl.scheme + ':';
    }
    url += '//';
    if (aParsedUrl.auth) {
      url += aParsedUrl.auth + '@';
    }
    if (aParsedUrl.host) {
      url += aParsedUrl.host;
    }
    if (aParsedUrl.port) {
      url += ":" + aParsedUrl.port
    }
    if (aParsedUrl.path) {
      url += aParsedUrl.path;
    }
    return url;
  }
  exports.urlGenerate = urlGenerate;

  /**
   * Normalizes a path, or the path portion of a URL:
   *
   * - Replaces consequtive slashes with one slash.
   * - Removes unnecessary '.' parts.
   * - Removes unnecessary '<dir>/..' parts.
   *
   * Based on code in the Node.js 'path' core module.
   *
   * @param aPath The path or url to normalize.
   */
  function normalize(aPath) {
    var path = aPath;
    var url = urlParse(aPath);
    if (url) {
      if (!url.path) {
        return aPath;
      }
      path = url.path;
    }
    var isAbsolute = (path.charAt(0) === '/');

    var parts = path.split(/\/+/);
    for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
      part = parts[i];
      if (part === '.') {
        parts.splice(i, 1);
      } else if (part === '..') {
        up++;
      } else if (up > 0) {
        if (part === '') {
          // The first part is blank if the path is absolute. Trying to go
          // above the root is a no-op. Therefore we can remove all '..' parts
          // directly after the root.
          parts.splice(i + 1, up);
          up = 0;
        } else {
          parts.splice(i, 2);
          up--;
        }
      }
    }
    path = parts.join('/');

    if (path === '') {
      path = isAbsolute ? '/' : '.';
    }

    if (url) {
      url.path = path;
      return urlGenerate(url);
    }
    return path;
  }
  exports.normalize = normalize;

  /**
   * Joins two paths/URLs.
   *
   * @param aRoot The root path or URL.
   * @param aPath The path or URL to be joined with the root.
   *
   * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
   *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
   *   first.
   * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
   *   is updated with the result and aRoot is returned. Otherwise the result
   *   is returned.
   *   - If aPath is absolute, the result is aPath.
   *   - Otherwise the two paths are joined with a slash.
   * - Joining for example 'http://' and 'www.example.com' is also supported.
   */
  function join(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }
    if (aPath === "") {
      aPath = ".";
    }
    var aPathUrl = urlParse(aPath);
    var aRootUrl = urlParse(aRoot);
    if (aRootUrl) {
      aRoot = aRootUrl.path || '/';
    }

    // `join(foo, '//www.example.org')`
    if (aPathUrl && !aPathUrl.scheme) {
      if (aRootUrl) {
        aPathUrl.scheme = aRootUrl.scheme;
      }
      return urlGenerate(aPathUrl);
    }

    if (aPathUrl || aPath.match(dataUrlRegexp)) {
      return aPath;
    }

    // `join('http://', 'www.example.com')`
    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
      aRootUrl.host = aPath;
      return urlGenerate(aRootUrl);
    }

    var joined = aPath.charAt(0) === '/'
      ? aPath
      : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

    if (aRootUrl) {
      aRootUrl.path = joined;
      return urlGenerate(aRootUrl);
    }
    return joined;
  }
  exports.join = join;

  /**
   * Make a path relative to a URL or another path.
   *
   * @param aRoot The root path or URL.
   * @param aPath The path or URL to be made relative to aRoot.
   */
  function relative(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }

    aRoot = aRoot.replace(/\/$/, '');

    // XXX: It is possible to remove this block, and the tests still pass!
    var url = urlParse(aRoot);
    if (aPath.charAt(0) == "/" && url && url.path == "/") {
      return aPath.slice(1);
    }

    return aPath.indexOf(aRoot + '/') === 0
      ? aPath.substr(aRoot.length + 1)
      : aPath;
  }
  exports.relative = relative;

  /**
   * Because behavior goes wacky when you set `__proto__` on objects, we
   * have to prefix all the strings in our set with an arbitrary character.
   *
   * See https://github.com/mozilla/source-map/pull/31 and
   * https://github.com/mozilla/source-map/issues/30
   *
   * @param String aStr
   */
  function toSetString(aStr) {
    return '$' + aStr;
  }
  exports.toSetString = toSetString;

  function fromSetString(aStr) {
    return aStr.substr(1);
  }
  exports.fromSetString = fromSetString;

  function strcmp(aStr1, aStr2) {
    var s1 = aStr1 || "";
    var s2 = aStr2 || "";
    return (s1 > s2) - (s1 < s2);
  }

  /**
   * Comparator between two mappings where the original positions are compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same original source/line/column, but different generated
   * line and column the same. Useful when searching for a mapping with a
   * stubbed out mapping.
   */
  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
    var cmp;

    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp || onlyCompareOriginal) {
      return cmp;
    }

    cmp = strcmp(mappingA.name, mappingB.name);
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp) {
      return cmp;
    }

    return mappingA.generatedColumn - mappingB.generatedColumn;
  };
  exports.compareByOriginalPositions = compareByOriginalPositions;

  /**
   * Comparator between two mappings where the generated positions are
   * compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same generated line and column, but different
   * source/name/original line and column the same. Useful when searching for a
   * mapping with a stubbed out mapping.
   */
  function compareByGeneratedPositions(mappingA, mappingB, onlyCompareGenerated) {
    var cmp;

    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp || onlyCompareGenerated) {
      return cmp;
    }

    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp) {
      return cmp;
    }

    return strcmp(mappingA.name, mappingB.name);
  };
  exports.compareByGeneratedPositions = compareByGeneratedPositions;

});

},{"amdefine":124}],124:[function(require,module,exports){
(function (process,__filename){
/** vim: et:ts=4:sw=4:sts=4
 * @license amdefine 1.0.0 Copyright (c) 2011-2015, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/amdefine for details
 */

/*jslint node: true */
/*global module, process */
'use strict';

/**
 * Creates a define for node.
 * @param {Object} module the "module" object that is defined by Node for the
 * current module.
 * @param {Function} [requireFn]. Node's require function for the current module.
 * It only needs to be passed in Node versions before 0.5, when module.require
 * did not exist.
 * @returns {Function} a define function that is usable for the current node
 * module.
 */
function amdefine(module, requireFn) {
    'use strict';
    var defineCache = {},
        loaderCache = {},
        alreadyCalled = false,
        path = require('path'),
        makeRequire, stringRequire;

    /**
     * Trims the . and .. from an array of path segments.
     * It will keep a leading path segment if a .. will become
     * the first path segment, to help with module name lookups,
     * which act like paths, but can be remapped. But the end result,
     * all paths that use this function should look normalized.
     * NOTE: this method MODIFIES the input array.
     * @param {Array} ary the array of path segments.
     */
    function trimDots(ary) {
        var i, part;
        for (i = 0; ary[i]; i+= 1) {
            part = ary[i];
            if (part === '.') {
                ary.splice(i, 1);
                i -= 1;
            } else if (part === '..') {
                if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                    //End of the line. Keep at least one non-dot
                    //path segment at the front so it can be mapped
                    //correctly to disk. Otherwise, there is likely
                    //no path mapping for a path starting with '..'.
                    //This can still fail, but catches the most reasonable
                    //uses of ..
                    break;
                } else if (i > 0) {
                    ary.splice(i - 1, 2);
                    i -= 2;
                }
            }
        }
    }

    function normalize(name, baseName) {
        var baseParts;

        //Adjust any relative paths.
        if (name && name.charAt(0) === '.') {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                baseParts = baseName.split('/');
                baseParts = baseParts.slice(0, baseParts.length - 1);
                baseParts = baseParts.concat(name.split('/'));
                trimDots(baseParts);
                name = baseParts.join('/');
            }
        }

        return name;
    }

    /**
     * Create the normalize() function passed to a loader plugin's
     * normalize method.
     */
    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(id) {
        function load(value) {
            loaderCache[id] = value;
        }

        load.fromText = function (id, text) {
            //This one is difficult because the text can/probably uses
            //define, and any relative paths and requires should be relative
            //to that id was it would be found on disk. But this would require
            //bootstrapping a module/require fairly deeply from node core.
            //Not sure how best to go about that yet.
            throw new Error('amdefine does not implement load.fromText');
        };

        return load;
    }

    makeRequire = function (systemRequire, exports, module, relId) {
        function amdRequire(deps, callback) {
            if (typeof deps === 'string') {
                //Synchronous, single module require('')
                return stringRequire(systemRequire, exports, module, deps, relId);
            } else {
                //Array of dependencies with a callback.

                //Convert the dependencies to modules.
                deps = deps.map(function (depName) {
                    return stringRequire(systemRequire, exports, module, depName, relId);
                });

                //Wait for next tick to call back the require call.
                if (callback) {
                    process.nextTick(function () {
                        callback.apply(null, deps);
                    });
                }
            }
        }

        amdRequire.toUrl = function (filePath) {
            if (filePath.indexOf('.') === 0) {
                return normalize(filePath, path.dirname(module.filename));
            } else {
                return filePath;
            }
        };

        return amdRequire;
    };

    //Favor explicit value, passed in if the module wants to support Node 0.4.
    requireFn = requireFn || function req() {
        return module.require.apply(module, arguments);
    };

    function runFactory(id, deps, factory) {
        var r, e, m, result;

        if (id) {
            e = loaderCache[id] = {};
            m = {
                id: id,
                uri: __filename,
                exports: e
            };
            r = makeRequire(requireFn, e, m, id);
        } else {
            //Only support one define call per file
            if (alreadyCalled) {
                throw new Error('amdefine with no module ID cannot be called more than once per file.');
            }
            alreadyCalled = true;

            //Use the real variables from node
            //Use module.exports for exports, since
            //the exports in here is amdefine exports.
            e = module.exports;
            m = module;
            r = makeRequire(requireFn, e, m, module.id);
        }

        //If there are dependencies, they are strings, so need
        //to convert them to dependency values.
        if (deps) {
            deps = deps.map(function (depName) {
                return r(depName);
            });
        }

        //Call the factory with the right dependencies.
        if (typeof factory === 'function') {
            result = factory.apply(m.exports, deps);
        } else {
            result = factory;
        }

        if (result !== undefined) {
            m.exports = result;
            if (id) {
                loaderCache[id] = m.exports;
            }
        }
    }

    stringRequire = function (systemRequire, exports, module, id, relId) {
        //Split the ID by a ! so that
        var index = id.indexOf('!'),
            originalId = id,
            prefix, plugin;

        if (index === -1) {
            id = normalize(id, relId);

            //Straight module lookup. If it is one of the special dependencies,
            //deal with it, otherwise, delegate to node.
            if (id === 'require') {
                return makeRequire(systemRequire, exports, module, relId);
            } else if (id === 'exports') {
                return exports;
            } else if (id === 'module') {
                return module;
            } else if (loaderCache.hasOwnProperty(id)) {
                return loaderCache[id];
            } else if (defineCache[id]) {
                runFactory.apply(null, defineCache[id]);
                return loaderCache[id];
            } else {
                if(systemRequire) {
                    return systemRequire(originalId);
                } else {
                    throw new Error('No module with ID: ' + id);
                }
            }
        } else {
            //There is a plugin in play.
            prefix = id.substring(0, index);
            id = id.substring(index + 1, id.length);

            plugin = stringRequire(systemRequire, exports, module, prefix, relId);

            if (plugin.normalize) {
                id = plugin.normalize(id, makeNormalize(relId));
            } else {
                //Normalize the ID normally.
                id = normalize(id, relId);
            }

            if (loaderCache[id]) {
                return loaderCache[id];
            } else {
                plugin.load(id, makeRequire(systemRequire, exports, module, relId), makeLoad(id), {});

                return loaderCache[id];
            }
        }
    };

    //Create a define function specific to the module asking for amdefine.
    function define(id, deps, factory) {
        if (Array.isArray(id)) {
            factory = deps;
            deps = id;
            id = undefined;
        } else if (typeof id !== 'string') {
            factory = id;
            id = deps = undefined;
        }

        if (deps && !Array.isArray(deps)) {
            factory = deps;
            deps = undefined;
        }

        if (!deps) {
            deps = ['require', 'exports', 'module'];
        }

        //Set up properties for this module. If an ID, then use
        //internal cache. If no ID, then use the external variables
        //for this node module.
        if (id) {
            //Put the module in deep freeze until there is a
            //require call for it.
            defineCache[id] = [id, deps, factory];
        } else {
            runFactory(id, deps, factory);
        }
    }

    //define.require, which has access to all the values in the
    //cache. Useful for AMD modules that all have IDs in the file,
    //but need to finally export a value to node based on one of those
    //IDs.
    define.require = function (id) {
        if (loaderCache[id]) {
            return loaderCache[id];
        }

        if (defineCache[id]) {
            runFactory.apply(null, defineCache[id]);
            return loaderCache[id];
        }
    };

    define.amd = {};

    return define;
}

module.exports = amdefine;

}).call(this,require('_process'),"/node_modules\\autoprefix\\node_modules\\autoprefixer-core\\node_modules\\postcss\\node_modules\\source-map\\node_modules\\amdefine\\amdefine.js")

},{"_process":133,"path":132}],125:[function(require,module,exports){
'use strict';
module.exports = function () {
	var str = [].map.call(arguments, function (str) {
		return str.trim();
	}).filter(function (str) {
		return str.length;
	}).join('-');

	if (!str.length) {
		return '';
	}

	if (str.length === 1 || !(/[_.\- ]+/).test(str) ) {
		if (str[0] === str[0].toLowerCase() && str.slice(1) !== str.slice(1).toLowerCase()) {
			return str;
		}

		return str.toLowerCase();
	}

	return str
	.replace(/^[_.\- ]+/, '')
	.toLowerCase()
	.replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
		return p1.toUpperCase();
	});
};

},{}],126:[function(require,module,exports){
'use strict';
module.exports = function (str, sep) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	sep = typeof sep === 'undefined' ? '_' : sep;

	return str
		.replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
		.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2')
		.toLowerCase();
};

},{}],127:[function(require,module,exports){

},{}],128:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.foo = function () { return 42 }
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; i++) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  that.write(string, encoding)
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

function arrayIndexOf (arr, val, byteOffset, encoding) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var foundIndex = -1
  for (var i = 0; byteOffset + i < arrLength; i++) {
    if (read(arr, byteOffset + i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
      if (foundIndex === -1) foundIndex = i
      if (i - foundIndex + 1 === valLength) return (byteOffset + foundIndex) * indexSize
    } else {
      if (foundIndex !== -1) i -= i - foundIndex
      foundIndex = -1
    }
  }
  return -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  if (Buffer.isBuffer(val)) {
    // special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(this, val, byteOffset, encoding)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset, encoding)
  }

  throw new TypeError('val must be string, number or Buffer')
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; i++) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; i++) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"base64-js":129,"ieee754":130,"isarray":131}],129:[function(require,module,exports){
'use strict'

exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

function init () {
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i]
    revLookup[code.charCodeAt(i)] = i
  }

  revLookup['-'.charCodeAt(0)] = 62
  revLookup['_'.charCodeAt(0)] = 63
}

init()

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],130:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],131:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],132:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":133}],133:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],134:[function(require,module,exports){
/*globals define, module, Symbol */

(function (globals) {
  'use strict';

  var strings, messages, predicates, functions,
      assert, not, maybe, collections, slice;

  strings = {
    v: 'value',
    n: 'number',
    s: 'string',
    b: 'boolean',
    o: 'object',
    t: 'type',
    a: 'array',
    al: 'array-like',
    i: 'iterable',
    d: 'date',
    f: 'function',
    l: 'length'
  };

  messages = {};
  predicates = {};

  [
    { n: 'equal', f: equal, s: 'v' },
    { n: 'undefined', f: isUndefined, s: 'v' },
    { n: 'null', f: isNull, s: 'v' },
    { n: 'assigned', f: assigned, s: 'v' },
    { n: 'includes', f: includes, s: 'v' },
    { n: 'zero', f: zero, s: 'n' },
    { n: 'infinity', f: infinity, s: 'n' },
    { n: 'number', f: number, s: 'n' },
    { n: 'integer', f: integer, s: 'n' },
    { n: 'even', f: even, s: 'n' },
    { n: 'odd', f: odd, s: 'n' },
    { n: 'greater', f: greater, s: 'n' },
    { n: 'less', f: less, s: 'n' },
    { n: 'between', f: between, s: 'n' },
    { n: 'greaterOrEqual', f: greaterOrEqual, s: 'n' },
    { n: 'lessOrEqual', f: lessOrEqual, s: 'n' },
    { n: 'inRange', f: inRange, s: 'n' },
    { n: 'positive', f: positive, s: 'n' },
    { n: 'negative', f: negative, s: 'n' },
    { n: 'string', f: string, s: 's' },
    { n: 'emptyString', f: emptyString, s: 's' },
    { n: 'nonEmptyString', f: nonEmptyString, s: 's' },
    { n: 'contains', f: contains, s: 's' },
    { n: 'match', f: match, s: 's' },
    { n: 'boolean', f: boolean, s: 'b' },
    { n: 'object', f: object, s: 'o' },
    { n: 'emptyObject', f: emptyObject, s: 'o' },
    { n: 'instance', f: instance, s: 't' },
    { n: 'builtIn', f: builtIn, s: 't' },
    { n: 'userDefined', f: userDefined, s: 't' },
    { n: 'like', f: like, s: 't' },
    { n: 'array', f: array, s: 'a' },
    { n: 'emptyArray', f: emptyArray, s: 'a' },
    { n: 'arrayLike', f: arrayLike, s: 'al' },
    { n: 'iterable', f: iterable, s: 'i' },
    { n: 'date', f: date, s: 'd' },
    { n: 'function', f: isFunction, s: 'f' },
    { n: 'hasLength', f: hasLength, s: 'l' },
  ].map(function (data) {
    messages[data.n] = 'Invalid ' + strings[data.s];
    predicates[data.n] = data.f;
  });

  functions = {
    apply: apply,
    map: map,
    all: all,
    any: any
  };

  collections = [ 'array', 'arrayLike', 'iterable', 'object' ];
  slice = Array.prototype.slice;

  functions = mixin(functions, predicates);
  assert = createModifiedPredicates(assertModifier, assertImpl);
  not = createModifiedPredicates(notModifier, notImpl);
  maybe = createModifiedPredicates(maybeModifier, maybeImpl);
  assert.not = createModifiedModifier(assertModifier, not);
  assert.maybe = createModifiedModifier(assertModifier, maybe);

  collections.forEach(createOfPredicates);
  createOfModifiers(assert, assertModifier);
  createOfModifiers(not, notModifier);
  collections.forEach(createMaybeOfModifiers);

  exportFunctions(mixin(functions, {
    assert: assert,
    not: not,
    maybe: maybe
  }));

  /**
   * Public function `equal`.
   *
   * Returns true if `lhs` and `rhs` are strictly equal, without coercion.
   * Returns false otherwise.
   */
  function equal (lhs, rhs) {
    return lhs === rhs;
  }

  /**
   * Public function `undefined`.
   *
   * Returns true if `data` is undefined, false otherwise.
   */
  function isUndefined (data) {
    return data === undefined;
  }

  /**
   * Public function `null`.
   *
   * Returns true if `data` is null, false otherwise.
   */
  function isNull (data) {
    return data === null;
  }

  /**
   * Public function `assigned`.
   *
   * Returns true if `data` is not null or undefined, false otherwise.
   */
  function assigned (data) {
    return ! isUndefined(data) && ! isNull(data);
  }

  /**
   * Public function `zero`.
   *
   * Returns true if `data` is zero, false otherwise.
   */
  function zero (data) {
    return data === 0;
  }

  /**
   * Public function `infinity`.
   *
   * Returns true if `data` is positive or negative infinity, false otherwise.
   */
  function infinity (data) {
    return data === Number.POSITIVE_INFINITY || data === Number.NEGATIVE_INFINITY;
  }

  /**
   * Public function `number`.
   *
   * Returns true if `data` is a number, false otherwise.
   */
  function number (data) {
    return typeof data === 'number' &&
      isNaN(data) === false &&
      data !== Number.POSITIVE_INFINITY &&
      data !== Number.NEGATIVE_INFINITY;
  }

  /**
   * Public function `integer`.
   *
   * Returns true if `data` is an integer, false otherwise.
   */
  function integer (data) {
    return number(data) && data % 1 === 0;
  }

  /**
   * Public function `even`.
   *
   * Returns true if `data` is an even number, false otherwise.
   */
  function even (data) {
    return number(data) && data % 2 === 0;
  }

  /**
   * Public function `odd`.
   *
   * Returns true if `data` is an odd number, false otherwise.
   */
  function odd (data) {
    return integer(data) && !even(data);
  }

  /**
   * Public function `greater`.
   *
   * Returns true if `lhs` is a number greater than `rhs`, false otherwise.
   */
  function greater (lhs, rhs) {
    return number(lhs) && lhs > rhs;
  }

  /**
   * Public function `less`.
   *
   * Returns true if `lhs` is a number less than `rhs`, false otherwise.
   */
  function less (lhs, rhs) {
    return number(lhs) && lhs < rhs;
  }

  /**
   * Public function `between`.
   *
   * Returns true if `data` is a number between `x` and `y`, false otherwise.
   */
  function between (data, x, y) {
    if (x < y) {
      return greater(data, x) && less(data, y);
    }

    return less(data, x) && greater(data, y);
  }

  /**
   * Public function `greaterOrEqual`.
   *
   * Returns true if `lhs` is a number greater than or equal to `rhs`, false
   * otherwise.
   */
  function greaterOrEqual (lhs, rhs) {
    return number(lhs) && lhs >= rhs;
  }

  /**
   * Public function `lessOrEqual`.
   *
   * Returns true if `lhs` is a number less than or equal to `rhs`, false
   * otherwise.
   */
  function lessOrEqual (lhs, rhs) {
    return number(lhs) && lhs <= rhs;
  }

  /**
   * Public function `inRange`.
   *
   * Returns true if `data` is a number in the range `x..y`, false otherwise.
   */
  function inRange (data, x, y) {
    if (x < y) {
      return greaterOrEqual(data, x) && lessOrEqual(data, y);
    }

    return lessOrEqual(data, x) && greaterOrEqual(data, y);
  }

  /**
   * Public function `positive`.
   *
   * Returns true if `data` is a positive number, false otherwise.
   */
  function positive (data) {
    return greater(data, 0);
  }

  /**
   * Public function `negative`.
   *
   * Returns true if `data` is a negative number, false otherwise.
   */
  function negative (data) {
    return less(data, 0);
  }

  /**
   * Public function `string`.
   *
   * Returns true if `data` is a string, false otherwise.
   */
  function string (data) {
    return typeof data === 'string';
  }

  /**
   * Public function `emptyString`.
   *
   * Returns true if `data` is the empty string, false otherwise.
   */
  function emptyString (data) {
    return data === '';
  }

  /**
   * Public function `nonEmptyString`.
   *
   * Returns true if `data` is a non-empty string, false otherwise.
   */
  function nonEmptyString (data) {
    return string(data) && data !== '';
  }

  /**
   * Public function `contains`.
   *
   * Returns true if `data` is a string that contains `substring`, false
   * otherwise.
   */
  function contains (data, substring) {
    return string(data) && data.indexOf(substring) !== -1;
  }

  /**
   * Public function `match`.
   *
   * Returns true if `data` is a string that matches `regex`, false otherwise.
   */
  function match (data, regex) {
    return string(data) && !! data.match(regex);
  }

  /**
   * Public function `boolean`.
   *
   * Returns true if `data` is a boolean value, false otherwise.
   */
  function boolean (data) {
    return data === false || data === true;
  }

  /**
   * Public function `object`.
   *
   * Returns true if `data` is a plain-old JS object, false otherwise.
   */
  function object (data) {
    return Object.prototype.toString.call(data) === '[object Object]';
  }

  /**
   * Public function `emptyObject`.
   *
   * Returns true if `data` is an empty object, false otherwise.
   */
  function emptyObject (data) {
    return object(data) && Object.keys(data).length === 0;
  }

  /**
   * Public function `instance`.
   *
   * Returns true if `data` is an instance of `prototype`, false otherwise.
   */
  function instance (data, prototype) {
    try {
      return data instanceof prototype;
    } catch (error) {
      return false;
    }
  }

  /**
   * Public function `builtIn`.
   *
   * Returns true if `data` is an instance of `prototype`, false otherwise.
   * Assumes `prototype` is a standard built-in object and additionally checks
   * the result of Object.prototype.toString.
   */
  function builtIn (data, prototype) {
    try {
      return instance(data, prototype) ||
        Object.prototype.toString.call(data) === '[object ' + prototype.name + ']';
    } catch (error) {
      return false;
    }
  }

  /**
   * Public function `userDefined`.
   *
   * Returns true if `data` is an instance of `prototype`, false otherwise.
   * Assumes `prototype` is a user-defined object and additionally checks the
   * value of constructor.name.
   */
  function userDefined (data, prototype) {
    try {
      return instance(data, prototype) ||
        data.constructor.name === prototype.name;
    } catch (error) {
      return false;
    }
  }

  /**
   * Public function `like`.
   *
   * Tests whether `data` 'quacks like a duck'. Returns true if `data` has all
   * of the properties of `archetype` (the 'duck'), false otherwise.
   */
  function like (data, archetype) {
    var name;

    for (name in archetype) {
      if (archetype.hasOwnProperty(name)) {
        if (data.hasOwnProperty(name) === false || typeof data[name] !== typeof archetype[name]) {
          return false;
        }

        if (object(data[name]) && like(data[name], archetype[name]) === false) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Public function `array`.
   *
   * Returns true if `data` is an array, false otherwise.
   */
  function array (data) {
    return Array.isArray(data);
  }

  /**
   * Public function `emptyArray`.
   *
   * Returns true if `data` is an empty array, false otherwise.
   */
  function emptyArray (data) {
    return array(data) && data.length === 0;
  }

  /**
   * Public function `arrayLike`.
   *
   * Returns true if `data` is an array-like object, false otherwise.
   */
  function arrayLike (data) {
    return assigned(data) && number(data.length);
  }

  /**
   * Public function `iterable`.
   *
   * Returns true if `data` is an iterable, false otherwise.
   */
  function iterable (data) {
    if (typeof Symbol === 'undefined') {
      // Fall back to `arrayLike` predicate in pre-ES6 environments.
      return arrayLike(data);
    }

    return assigned(data) && isFunction(data[Symbol.iterator]);
  }

  /**
   * Public function `includes`.
   *
   * Returns true if `data` contains `value`, false otherwise.
   */
  function includes (data, value) {
    var iterator, iteration;

    if (not.assigned(data)) {
      return false;
    }

    try {
      if (typeof Symbol !== 'undefined' && data[Symbol.iterator] && isFunction(data.values)) {
        iterator = data.values();

        do {
          iteration = iterator.next();

          if (iteration.value === value) {
            return true;
          }
        } while (! iteration.done);

        return false;
      }

      Object.keys(data).forEach(function (key) {
        if (data[key] === value) {
          throw 0;
        }
      });
    } catch (ignore) {
      return true;
    }

    return false;
  }

  /**
   * Public function `hasLength`.
   *
   * Returns true if `data` has a length property that equals `length`, false
   * otherwise.
   */
  function hasLength (data, length) {
    return assigned(data) && data.length === length;
  }

  /**
   * Public function `date`.
   *
   * Returns true if `data` is a valid date, false otherwise.
   */
  function date (data) {
    return builtIn(data, Date) && ! isNaN(data.getTime());
  }

  /**
   * Public function `function`.
   *
   * Returns true if `data` is a function, false otherwise.
   */
  function isFunction (data) {
    return typeof data === 'function';
  }

  /**
   * Public function `apply`.
   *
   * Maps each value from the `data` to the corresponding predicate and returns
   * the result array. If the same function is to be applied across all of the
   * data, a single predicate function may be passed in.
   *
   */
  function apply (data, predicates) {
    assert.array(data);

    if (isFunction(predicates)) {
      return data.map(function (value) {
        return predicates(value);
      });
    }

    assert.array(predicates);
    assert.hasLength(data, predicates.length);

    return data.map(function (value, index) {
      return predicates[index](value);
    });
  }

  /**
   * Public function `map`.
   *
   * Maps each value from the `data` to the corresponding predicate and returns
   * the result object. Supports nested objects. If the `data` is not nested and
   * the same function is to be applied across all of it, a single predicate
   * function may be passed in.
   *
   */
  function map (data, predicates) {
    assert.object(data);

    if (isFunction(predicates)) {
      return mapSimple(data, predicates);
    }

    assert.object(predicates);

    return mapComplex(data, predicates);
  }

  function mapSimple (data, predicate) {
    var result = {};

    Object.keys(data).forEach(function (key) {
      result[key] = predicate(data[key]);
    });

    return result;
  }

  function mapComplex (data, predicates) {
    var result = {};

    Object.keys(predicates).forEach(function (key) {
      var predicate = predicates[key];

      if (isFunction(predicate)) {
        if (not.assigned(data)) {
          result[key] = !!predicate._isMaybefied;
        } else {
          result[key] = predicate(data[key]);
        }
      } else if (object(predicate)) {
        result[key] = mapComplex(data[key], predicate);
      }
    });

    return result;
  }

  /**
   * Public function `all`
   *
   * Check that all boolean values are true
   * in an array (returned from `apply`)
   * or object (returned from `map`).
   *
   */
  function all (data) {
    if (array(data)) {
      return testArray(data, false);
    }

    assert.object(data);

    return testObject(data, false);
  }

  function testArray (data, result) {
    var i;

    for (i = 0; i < data.length; i += 1) {
      if (data[i] === result) {
        return result;
      }
    }

    return !result;
  }

  function testObject (data, result) {
    var key, value;

    for (key in data) {
      if (data.hasOwnProperty(key)) {
        value = data[key];

        if (object(value) && testObject(value, result) === result) {
          return result;
        }

        if (value === result) {
          return result;
        }
      }
    }

    return !result;
  }

  /**
   * Public function `any`
   *
   * Check that at least one boolean value is true
   * in an array (returned from `apply`)
   * or object (returned from `map`).
   *
   */
  function any (data) {
    if (array(data)) {
      return testArray(data, true);
    }

    assert.object(data);

    return testObject(data, true);
  }

  function mixin (target, source) {
    Object.keys(source).forEach(function (key) {
      target[key] = source[key];
    });

    return target;
  }

  /**
   * Public modifier `assert`.
   *
   * Throws if `predicate` returns false.
   */
  function assertModifier (predicate, defaultMessage) {
    return function () {
      assertPredicate(predicate, arguments, defaultMessage);
    };
  }

  function assertPredicate (predicate, args, defaultMessage) {
    var message = args[args.length - 1];
    assertImpl(predicate.apply(null, args), nonEmptyString(message) ? message : defaultMessage);
  }

  function assertImpl (value, message) {
    if (value === false) {
      throw new Error(message || 'Assertion failed');
    }
  }

  /**
   * Public modifier `not`.
   *
   * Negates `predicate`.
   */
  function notModifier (predicate) {
    return function () {
      return notImpl(predicate.apply(null, arguments));
    };
  }

  function notImpl (value) {
    return !value;
  }

  /**
   * Public modifier `maybe`.
   *
   * Returns true if predicate argument is  null or undefined,
   * otherwise propagates the return value from `predicate`.
   */
  function maybeModifier (predicate) {
    var modifiedPredicate = function () {
      if (not.assigned(arguments[0])) {
        return true;
      }

      return predicate.apply(null, arguments);
    };

    // Hackishly indicate that this is a maybe.xxx predicate.
    // Without this flag, the alternative would be to iterate
    // through the maybe predicates or use indexOf to check,
    // which would be time-consuming.
    modifiedPredicate._isMaybefied = true;

    return modifiedPredicate;
  }

  function maybeImpl (value) {
    if (assigned(value) === false) {
      return true;
    }

    return value;
  }

  /**
   * Public modifier `of`.
   *
   * Applies the chained predicate to members of the collection.
   */
  function ofModifier (target, type, predicate) {
    return function () {
      var collection, args;

      collection = arguments[0];

      if (target === 'maybe' && not.assigned(collection)) {
        return true;
      }

      if (!type(collection)) {
        return false;
      }

      collection = coerceCollection(type, collection);
      args = slice.call(arguments, 1);

      try {
        collection.forEach(function (item) {
          if (
            (target !== 'maybe' || assigned(item)) &&
            !predicate.apply(null, [ item ].concat(args))
          ) {
            // TODO: Replace with for...of when ES6 is required.
            throw 0;
          }
        });
      } catch (ignore) {
        return false;
      }

      return true;
    };
  }

  function coerceCollection (type, collection) {
    switch (type) {
      case arrayLike:
        return slice.call(collection);
      case object:
        return Object.keys(collection).map(function (key) {
          return collection[key];
        });
      default:
        return collection;
    }
  }

  function createModifiedPredicates (modifier, object) {
    return createModifiedFunctions([ modifier, predicates, object ]);
  }

  function createModifiedFunctions (args) {
    var modifier, object, functions, result;

    modifier = args.shift();
    object = args.pop();
    functions = args.pop();

    result = object || {};

    Object.keys(functions).forEach(function (key) {
      Object.defineProperty(result, key, {
        configurable: false,
        enumerable: true,
        writable: false,
        value: modifier.apply(null, args.concat(functions[key], messages[key]))
      });
    });

    return result;
  }

  function createModifiedModifier (modifier, modified) {
    return createModifiedFunctions([ modifier, modified, null ]);
  }

  function createOfPredicates (key) {
    predicates[key].of = createModifiedFunctions(
      [ ofModifier.bind(null, null), predicates[key], predicates, null ]
    );
  }

  function createOfModifiers (base, modifier) {
    collections.forEach(function (key) {
      base[key].of = createModifiedModifier(modifier, predicates[key].of);
    });
  }

  function createMaybeOfModifiers (key) {
    maybe[key].of = createModifiedFunctions(
      [ ofModifier.bind(null, 'maybe'), predicates[key], predicates, null ]
    );
    assert.maybe[key].of = createModifiedModifier(assertModifier, maybe[key].of);
    assert.not[key].of = createModifiedModifier(assertModifier, not[key].of);
  }

  function exportFunctions (functions) {
    if (typeof define === 'function' && define.amd) {
      define(function () {
        return functions;
      });
    } else if (typeof module !== 'undefined' && module !== null && module.exports) {
      module.exports = functions;
    } else {
      globals.check = functions;
    }
  }
}(this));

},{}],135:[function(require,module,exports){

/**
 * @license
 *
 * chroma.js - JavaScript library for color conversions
 * 
 * Copyright (c) 2011-2015, Gregor Aisch
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 * 
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 *    derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

(function() {
  var Color, DEG2RAD, LAB_CONSTANTS, PI, PITHIRD, RAD2DEG, TWOPI, _guess_formats, _guess_formats_sorted, _input, _interpolators, abs, atan2, bezier, blend, blend_f, brewer, burn, chroma, clip_rgb, cmyk2rgb, colors, cos, css2rgb, darken, dodge, each, floor, hex2rgb, hsi2rgb, hsl2css, hsl2rgb, hsv2rgb, interpolate, interpolate_hsx, interpolate_lab, interpolate_num, interpolate_rgb, lab2lch, lab2rgb, lab_xyz, lch2lab, lch2rgb, lighten, limit, log, luminance_x, m, max, multiply, normal, num2rgb, overlay, pow, rgb2cmyk, rgb2css, rgb2hex, rgb2hsi, rgb2hsl, rgb2hsv, rgb2lab, rgb2lch, rgb2luminance, rgb2num, rgb2temperature, rgb2xyz, rgb_xyz, rnd, root, round, screen, sin, sqrt, temperature2rgb, type, unpack, w3cx11, xyz_lab, xyz_rgb,
    slice = [].slice;

  type = (function() {

    /*
    for browser-safe type checking+
    ported from jQuery's $.type
     */
    var classToType, len, name, o, ref;
    classToType = {};
    ref = "Boolean Number String Function Array Date RegExp Undefined Null".split(" ");
    for (o = 0, len = ref.length; o < len; o++) {
      name = ref[o];
      classToType["[object " + name + "]"] = name.toLowerCase();
    }
    return function(obj) {
      var strType;
      strType = Object.prototype.toString.call(obj);
      return classToType[strType] || "object";
    };
  })();

  limit = function(x, min, max) {
    if (min == null) {
      min = 0;
    }
    if (max == null) {
      max = 1;
    }
    if (x < min) {
      x = min;
    }
    if (x > max) {
      x = max;
    }
    return x;
  };

  unpack = function(args) {
    if (args.length >= 3) {
      return [].slice.call(args);
    } else {
      return args[0];
    }
  };

  clip_rgb = function(rgb) {
    var i;
    for (i in rgb) {
      if (i < 3) {
        if (rgb[i] < 0) {
          rgb[i] = 0;
        }
        if (rgb[i] > 255) {
          rgb[i] = 255;
        }
      } else if (i === 3) {
        if (rgb[i] < 0) {
          rgb[i] = 0;
        }
        if (rgb[i] > 1) {
          rgb[i] = 1;
        }
      }
    }
    return rgb;
  };

  PI = Math.PI, round = Math.round, cos = Math.cos, floor = Math.floor, pow = Math.pow, log = Math.log, sin = Math.sin, sqrt = Math.sqrt, atan2 = Math.atan2, max = Math.max, abs = Math.abs;

  TWOPI = PI * 2;

  PITHIRD = PI / 3;

  DEG2RAD = PI / 180;

  RAD2DEG = 180 / PI;

  chroma = function() {
    if (arguments[0] instanceof Color) {
      return arguments[0];
    }
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, arguments, function(){});
  };

  _interpolators = [];

  if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
    module.exports = chroma;
  }

  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return chroma;
    });
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.chroma = chroma;
  }

  chroma.version = '1.1.1';


  /**
      chroma.js
  
      Copyright (c) 2011-2013, Gregor Aisch
      All rights reserved.
  
      Redistribution and use in source and binary forms, with or without
      modification, are permitted provided that the following conditions are met:
  
      * Redistributions of source code must retain the above copyright notice, this
        list of conditions and the following disclaimer.
  
      * Redistributions in binary form must reproduce the above copyright notice,
        this list of conditions and the following disclaimer in the documentation
        and/or other materials provided with the distribution.
  
      * The name Gregor Aisch may not be used to endorse or promote products
        derived from this software without specific prior written permission.
  
      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
      AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
      IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
      DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
      INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
      BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
      DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
      OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
      NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
      EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  
      @source: https://github.com/gka/chroma.js
   */

  _input = {};

  _guess_formats = [];

  _guess_formats_sorted = false;

  Color = (function() {
    function Color() {
      var arg, args, chk, len, len1, me, mode, o, w;
      me = this;
      args = [];
      for (o = 0, len = arguments.length; o < len; o++) {
        arg = arguments[o];
        if (arg != null) {
          args.push(arg);
        }
      }
      mode = args[args.length - 1];
      if (_input[mode] != null) {
        me._rgb = clip_rgb(_input[mode](unpack(args.slice(0, -1))));
      } else {
        if (!_guess_formats_sorted) {
          _guess_formats = _guess_formats.sort(function(a, b) {
            return b.p - a.p;
          });
          _guess_formats_sorted = true;
        }
        for (w = 0, len1 = _guess_formats.length; w < len1; w++) {
          chk = _guess_formats[w];
          mode = chk.test.apply(chk, args);
          if (mode) {
            break;
          }
        }
        if (mode) {
          me._rgb = clip_rgb(_input[mode].apply(_input, args));
        }
      }
      if (me._rgb == null) {
        console.warn('unknown format: ' + args);
      }
      if (me._rgb == null) {
        me._rgb = [0, 0, 0];
      }
      if (me._rgb.length === 3) {
        me._rgb.push(1);
      }
    }

    Color.prototype.alpha = function(alpha) {
      if (arguments.length) {
        this._rgb[3] = alpha;
        return this;
      }
      return this._rgb[3];
    };

    Color.prototype.toString = function() {
      return this.name();
    };

    return Color;

  })();

  chroma._input = _input;


  /**
  	ColorBrewer colors for chroma.js
  
  	Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The 
  	Pennsylvania State University.
  
  	Licensed under the Apache License, Version 2.0 (the "License"); 
  	you may not use this file except in compliance with the License.
  	You may obtain a copy of the License at	
  	http://www.apache.org/licenses/LICENSE-2.0
  
  	Unless required by applicable law or agreed to in writing, software distributed
  	under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
  	CONDITIONS OF ANY KIND, either express or implied. See the License for the
  	specific language governing permissions and limitations under the License.
  
      @preserve
   */

  chroma.brewer = brewer = {
    OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
    PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
    BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
    Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
    BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
    YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
    YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
    Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
    RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
    Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
    YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
    Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
    GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
    Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
    YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
    PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
    Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
    PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
    Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
    RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
    RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
    PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
    PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
    RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
    BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
    RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
    PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],
    Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
    Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
    Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
    Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
    Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
    Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
    Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
    Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']
  };


  /**
  	X11 color names
  
  	http://www.w3.org/TR/css3-color/#svg-color
   */

  w3cx11 = {
    indigo: "#4b0082",
    gold: "#ffd700",
    hotpink: "#ff69b4",
    firebrick: "#b22222",
    indianred: "#cd5c5c",
    yellow: "#ffff00",
    mistyrose: "#ffe4e1",
    darkolivegreen: "#556b2f",
    olive: "#808000",
    darkseagreen: "#8fbc8f",
    pink: "#ffc0cb",
    tomato: "#ff6347",
    lightcoral: "#f08080",
    orangered: "#ff4500",
    navajowhite: "#ffdead",
    lime: "#00ff00",
    palegreen: "#98fb98",
    darkslategrey: "#2f4f4f",
    greenyellow: "#adff2f",
    burlywood: "#deb887",
    seashell: "#fff5ee",
    mediumspringgreen: "#00fa9a",
    fuchsia: "#ff00ff",
    papayawhip: "#ffefd5",
    blanchedalmond: "#ffebcd",
    chartreuse: "#7fff00",
    dimgray: "#696969",
    black: "#000000",
    peachpuff: "#ffdab9",
    springgreen: "#00ff7f",
    aquamarine: "#7fffd4",
    white: "#ffffff",
    orange: "#ffa500",
    lightsalmon: "#ffa07a",
    darkslategray: "#2f4f4f",
    brown: "#a52a2a",
    ivory: "#fffff0",
    dodgerblue: "#1e90ff",
    peru: "#cd853f",
    lawngreen: "#7cfc00",
    chocolate: "#d2691e",
    crimson: "#dc143c",
    forestgreen: "#228b22",
    darkgrey: "#a9a9a9",
    lightseagreen: "#20b2aa",
    cyan: "#00ffff",
    mintcream: "#f5fffa",
    silver: "#c0c0c0",
    antiquewhite: "#faebd7",
    mediumorchid: "#ba55d3",
    skyblue: "#87ceeb",
    gray: "#808080",
    darkturquoise: "#00ced1",
    goldenrod: "#daa520",
    darkgreen: "#006400",
    floralwhite: "#fffaf0",
    darkviolet: "#9400d3",
    darkgray: "#a9a9a9",
    moccasin: "#ffe4b5",
    saddlebrown: "#8b4513",
    grey: "#808080",
    darkslateblue: "#483d8b",
    lightskyblue: "#87cefa",
    lightpink: "#ffb6c1",
    mediumvioletred: "#c71585",
    slategrey: "#708090",
    red: "#ff0000",
    deeppink: "#ff1493",
    limegreen: "#32cd32",
    darkmagenta: "#8b008b",
    palegoldenrod: "#eee8aa",
    plum: "#dda0dd",
    turquoise: "#40e0d0",
    lightgrey: "#d3d3d3",
    lightgoldenrodyellow: "#fafad2",
    darkgoldenrod: "#b8860b",
    lavender: "#e6e6fa",
    maroon: "#800000",
    yellowgreen: "#9acd32",
    sandybrown: "#f4a460",
    thistle: "#d8bfd8",
    violet: "#ee82ee",
    navy: "#000080",
    magenta: "#ff00ff",
    dimgrey: "#696969",
    tan: "#d2b48c",
    rosybrown: "#bc8f8f",
    olivedrab: "#6b8e23",
    blue: "#0000ff",
    lightblue: "#add8e6",
    ghostwhite: "#f8f8ff",
    honeydew: "#f0fff0",
    cornflowerblue: "#6495ed",
    slateblue: "#6a5acd",
    linen: "#faf0e6",
    darkblue: "#00008b",
    powderblue: "#b0e0e6",
    seagreen: "#2e8b57",
    darkkhaki: "#bdb76b",
    snow: "#fffafa",
    sienna: "#a0522d",
    mediumblue: "#0000cd",
    royalblue: "#4169e1",
    lightcyan: "#e0ffff",
    green: "#008000",
    mediumpurple: "#9370db",
    midnightblue: "#191970",
    cornsilk: "#fff8dc",
    paleturquoise: "#afeeee",
    bisque: "#ffe4c4",
    slategray: "#708090",
    darkcyan: "#008b8b",
    khaki: "#f0e68c",
    wheat: "#f5deb3",
    teal: "#008080",
    darkorchid: "#9932cc",
    deepskyblue: "#00bfff",
    salmon: "#fa8072",
    darkred: "#8b0000",
    steelblue: "#4682b4",
    palevioletred: "#db7093",
    lightslategray: "#778899",
    aliceblue: "#f0f8ff",
    lightslategrey: "#778899",
    lightgreen: "#90ee90",
    orchid: "#da70d6",
    gainsboro: "#dcdcdc",
    mediumseagreen: "#3cb371",
    lightgray: "#d3d3d3",
    mediumturquoise: "#48d1cc",
    lemonchiffon: "#fffacd",
    cadetblue: "#5f9ea0",
    lightyellow: "#ffffe0",
    lavenderblush: "#fff0f5",
    coral: "#ff7f50",
    purple: "#800080",
    aqua: "#00ffff",
    whitesmoke: "#f5f5f5",
    mediumslateblue: "#7b68ee",
    darkorange: "#ff8c00",
    mediumaquamarine: "#66cdaa",
    darksalmon: "#e9967a",
    beige: "#f5f5dc",
    blueviolet: "#8a2be2",
    azure: "#f0ffff",
    lightsteelblue: "#b0c4de",
    oldlace: "#fdf5e6",
    rebeccapurple: "#663399"
  };

  chroma.colors = colors = w3cx11;

  lab2rgb = function() {
    var a, args, b, g, l, r, x, y, z;
    args = unpack(arguments);
    l = args[0], a = args[1], b = args[2];
    y = (l + 16) / 116;
    x = isNaN(a) ? y : y + a / 500;
    z = isNaN(b) ? y : y - b / 200;
    y = LAB_CONSTANTS.Yn * lab_xyz(y);
    x = LAB_CONSTANTS.Xn * lab_xyz(x);
    z = LAB_CONSTANTS.Zn * lab_xyz(z);
    r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
    g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
    b = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
    r = limit(r, 0, 255);
    g = limit(g, 0, 255);
    b = limit(b, 0, 255);
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };

  xyz_rgb = function(r) {
    return round(255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow(r, 1 / 2.4) - 0.055));
  };

  lab_xyz = function(t) {
    if (t > LAB_CONSTANTS.t1) {
      return t * t * t;
    } else {
      return LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0);
    }
  };

  LAB_CONSTANTS = {
    Kn: 18,
    Xn: 0.950470,
    Yn: 1,
    Zn: 1.088830,
    t0: 0.137931034,
    t1: 0.206896552,
    t2: 0.12841855,
    t3: 0.008856452
  };

  rgb2lab = function() {
    var b, g, r, ref, ref1, x, y, z;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    ref1 = rgb2xyz(r, g, b), x = ref1[0], y = ref1[1], z = ref1[2];
    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
  };

  rgb_xyz = function(r) {
    if ((r /= 255) <= 0.04045) {
      return r / 12.92;
    } else {
      return pow((r + 0.055) / 1.055, 2.4);
    }
  };

  xyz_lab = function(t) {
    if (t > LAB_CONSTANTS.t3) {
      return pow(t, 1 / 3);
    } else {
      return t / LAB_CONSTANTS.t2 + LAB_CONSTANTS.t0;
    }
  };

  rgb2xyz = function() {
    var b, g, r, ref, x, y, z;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    r = rgb_xyz(r);
    g = rgb_xyz(g);
    b = rgb_xyz(b);
    x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS.Xn);
    y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / LAB_CONSTANTS.Yn);
    z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / LAB_CONSTANTS.Zn);
    return [x, y, z];
  };

  chroma.lab = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['lab']), function(){});
  };

  _input.lab = lab2rgb;

  Color.prototype.lab = function() {
    return rgb2lab(this._rgb);
  };

  bezier = function(colors) {
    var I, I0, I1, c, lab0, lab1, lab2, lab3, ref, ref1, ref2;
    colors = (function() {
      var len, o, results;
      results = [];
      for (o = 0, len = colors.length; o < len; o++) {
        c = colors[o];
        results.push(chroma(c));
      }
      return results;
    })();
    if (colors.length === 2) {
      ref = (function() {
        var len, o, results;
        results = [];
        for (o = 0, len = colors.length; o < len; o++) {
          c = colors[o];
          results.push(c.lab());
        }
        return results;
      })(), lab0 = ref[0], lab1 = ref[1];
      I = function(t) {
        var i, lab;
        lab = (function() {
          var o, results;
          results = [];
          for (i = o = 0; o <= 2; i = ++o) {
            results.push(lab0[i] + t * (lab1[i] - lab0[i]));
          }
          return results;
        })();
        return chroma.lab.apply(chroma, lab);
      };
    } else if (colors.length === 3) {
      ref1 = (function() {
        var len, o, results;
        results = [];
        for (o = 0, len = colors.length; o < len; o++) {
          c = colors[o];
          results.push(c.lab());
        }
        return results;
      })(), lab0 = ref1[0], lab1 = ref1[1], lab2 = ref1[2];
      I = function(t) {
        var i, lab;
        lab = (function() {
          var o, results;
          results = [];
          for (i = o = 0; o <= 2; i = ++o) {
            results.push((1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i]);
          }
          return results;
        })();
        return chroma.lab.apply(chroma, lab);
      };
    } else if (colors.length === 4) {
      ref2 = (function() {
        var len, o, results;
        results = [];
        for (o = 0, len = colors.length; o < len; o++) {
          c = colors[o];
          results.push(c.lab());
        }
        return results;
      })(), lab0 = ref2[0], lab1 = ref2[1], lab2 = ref2[2], lab3 = ref2[3];
      I = function(t) {
        var i, lab;
        lab = (function() {
          var o, results;
          results = [];
          for (i = o = 0; o <= 2; i = ++o) {
            results.push((1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab2[i] + t * t * t * lab3[i]);
          }
          return results;
        })();
        return chroma.lab.apply(chroma, lab);
      };
    } else if (colors.length === 5) {
      I0 = bezier(colors.slice(0, 3));
      I1 = bezier(colors.slice(2, 5));
      I = function(t) {
        if (t < 0.5) {
          return I0(t * 2);
        } else {
          return I1((t - 0.5) * 2);
        }
      };
    }
    return I;
  };

  chroma.bezier = function(colors) {
    var f;
    f = bezier(colors);
    f.scale = function() {
      return chroma.scale(f);
    };
    return f;
  };


  /*
      chroma.js
  
      Copyright (c) 2011-2013, Gregor Aisch
      All rights reserved.
  
      Redistribution and use in source and binary forms, with or without
      modification, are permitted provided that the following conditions are met:
  
      * Redistributions of source code must retain the above copyright notice, this
        list of conditions and the following disclaimer.
  
      * Redistributions in binary form must reproduce the above copyright notice,
        this list of conditions and the following disclaimer in the documentation
        and/or other materials provided with the distribution.
  
      * The name Gregor Aisch may not be used to endorse or promote products
        derived from this software without specific prior written permission.
  
      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
      AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
      IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
      DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
      INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
      BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
      DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
      OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
      NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
      EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  
      @source: https://github.com/gka/chroma.js
   */

  chroma.cubehelix = function(start, rotations, hue, gamma, lightness) {
    var dh, dl, f;
    if (start == null) {
      start = 300;
    }
    if (rotations == null) {
      rotations = -1.5;
    }
    if (hue == null) {
      hue = 1;
    }
    if (gamma == null) {
      gamma = 1;
    }
    if (lightness == null) {
      lightness = [0, 1];
    }
    dl = lightness[1] - lightness[0];
    dh = 0;
    f = function(fract) {
      var a, amp, b, cos_a, g, h, l, r, sin_a;
      a = TWOPI * ((start + 120) / 360 + rotations * fract);
      l = pow(lightness[0] + dl * fract, gamma);
      h = dh !== 0 ? hue[0] + fract * dh : hue;
      amp = h * l * (1 - l) / 2;
      cos_a = cos(a);
      sin_a = sin(a);
      r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
      g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
      b = l + amp * (+1.97294 * cos_a);
      return chroma(clip_rgb([r * 255, g * 255, b * 255]));
    };
    f.start = function(s) {
      if (s == null) {
        return start;
      }
      start = s;
      return f;
    };
    f.rotations = function(r) {
      if (r == null) {
        return rotations;
      }
      rotations = r;
      return f;
    };
    f.gamma = function(g) {
      if (g == null) {
        return gamma;
      }
      gamma = g;
      return f;
    };
    f.hue = function(h) {
      if (h == null) {
        return hue;
      }
      hue = h;
      if (type(hue) === 'array') {
        dh = hue[1] - hue[0];
        if (dh === 0) {
          hue = hue[1];
        }
      } else {
        dh = 0;
      }
      return f;
    };
    f.lightness = function(h) {
      if (h == null) {
        return lightness;
      }
      lightness = h;
      if (type(lightness) === 'array') {
        dl = lightness[1] - lightness[0];
        if (dl === 0) {
          lightness = lightness[1];
        }
      } else {
        dl = 0;
      }
      return f;
    };
    f.scale = function() {
      return chroma.scale(f);
    };
    f.hue(hue);
    return f;
  };

  chroma.random = function() {
    var code, digits, i, o;
    digits = '0123456789abcdef';
    code = '#';
    for (i = o = 0; o < 6; i = ++o) {
      code += digits.charAt(floor(Math.random() * 16));
    }
    return new Color(code);
  };

  _input.rgb = function() {
    var k, ref, results, v;
    ref = unpack(arguments);
    results = [];
    for (k in ref) {
      v = ref[k];
      results.push(v);
    }
    return results;
  };

  chroma.rgb = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['rgb']), function(){});
  };

  Color.prototype.rgb = function() {
    return this._rgb.slice(0, 3);
  };

  Color.prototype.rgba = function() {
    return this._rgb;
  };

  _guess_formats.push({
    p: 15,
    test: function(n) {
      var a;
      a = unpack(arguments);
      if (type(a) === 'array' && a.length === 3) {
        return 'rgb';
      }
      if (a.length === 4 && type(a[3]) === "number" && a[3] >= 0 && a[3] <= 1) {
        return 'rgb';
      }
    }
  });

  hex2rgb = function(hex) {
    var a, b, g, r, rgb, u;
    if (hex.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      if (hex.length === 4 || hex.length === 7) {
        hex = hex.substr(1);
      }
      if (hex.length === 3) {
        hex = hex.split("");
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      u = parseInt(hex, 16);
      r = u >> 16;
      g = u >> 8 & 0xFF;
      b = u & 0xFF;
      return [r, g, b, 1];
    }
    if (hex.match(/^#?([A-Fa-f0-9]{8})$/)) {
      if (hex.length === 9) {
        hex = hex.substr(1);
      }
      u = parseInt(hex, 16);
      r = u >> 24 & 0xFF;
      g = u >> 16 & 0xFF;
      b = u >> 8 & 0xFF;
      a = round((u & 0xFF) / 0xFF * 100) / 100;
      return [r, g, b, a];
    }
    if ((_input.css != null) && (rgb = _input.css(hex))) {
      return rgb;
    }
    throw "unknown color: " + hex;
  };

  rgb2hex = function(channels, mode) {
    var a, b, g, hxa, r, str, u;
    if (mode == null) {
      mode = 'rgb';
    }
    r = channels[0], g = channels[1], b = channels[2], a = channels[3];
    u = r << 16 | g << 8 | b;
    str = "000000" + u.toString(16);
    str = str.substr(str.length - 6);
    hxa = '0' + round(a * 255).toString(16);
    hxa = hxa.substr(hxa.length - 2);
    return "#" + (function() {
      switch (mode.toLowerCase()) {
        case 'rgba':
          return str + hxa;
        case 'argb':
          return hxa + str;
        default:
          return str;
      }
    })();
  };

  _input.hex = function(h) {
    return hex2rgb(h);
  };

  chroma.hex = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['hex']), function(){});
  };

  Color.prototype.hex = function(mode) {
    if (mode == null) {
      mode = 'rgb';
    }
    return rgb2hex(this._rgb, mode);
  };

  _guess_formats.push({
    p: 10,
    test: function(n) {
      if (arguments.length === 1 && type(n) === "string") {
        return 'hex';
      }
    }
  });

  hsl2rgb = function() {
    var args, b, c, g, h, i, l, o, r, ref, s, t1, t2, t3;
    args = unpack(arguments);
    h = args[0], s = args[1], l = args[2];
    if (s === 0) {
      r = g = b = l * 255;
    } else {
      t3 = [0, 0, 0];
      c = [0, 0, 0];
      t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
      t1 = 2 * l - t2;
      h /= 360;
      t3[0] = h + 1 / 3;
      t3[1] = h;
      t3[2] = h - 1 / 3;
      for (i = o = 0; o <= 2; i = ++o) {
        if (t3[i] < 0) {
          t3[i] += 1;
        }
        if (t3[i] > 1) {
          t3[i] -= 1;
        }
        if (6 * t3[i] < 1) {
          c[i] = t1 + (t2 - t1) * 6 * t3[i];
        } else if (2 * t3[i] < 1) {
          c[i] = t2;
        } else if (3 * t3[i] < 2) {
          c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6;
        } else {
          c[i] = t1;
        }
      }
      ref = [round(c[0] * 255), round(c[1] * 255), round(c[2] * 255)], r = ref[0], g = ref[1], b = ref[2];
    }
    if (args.length > 3) {
      return [r, g, b, args[3]];
    } else {
      return [r, g, b];
    }
  };

  rgb2hsl = function(r, g, b) {
    var h, l, min, ref, s;
    if (r !== void 0 && r.length >= 3) {
      ref = r, r = ref[0], g = ref[1], b = ref[2];
    }
    r /= 255;
    g /= 255;
    b /= 255;
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    l = (max + min) / 2;
    if (max === min) {
      s = 0;
      h = Number.NaN;
    } else {
      s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
    }
    if (r === max) {
      h = (g - b) / (max - min);
    } else if (g === max) {
      h = 2 + (b - r) / (max - min);
    } else if (b === max) {
      h = 4 + (r - g) / (max - min);
    }
    h *= 60;
    if (h < 0) {
      h += 360;
    }
    return [h, s, l];
  };

  chroma.hsl = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['hsl']), function(){});
  };

  _input.hsl = hsl2rgb;

  Color.prototype.hsl = function() {
    return rgb2hsl(this._rgb);
  };

  hsv2rgb = function() {
    var args, b, f, g, h, i, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, s, t, v;
    args = unpack(arguments);
    h = args[0], s = args[1], v = args[2];
    v *= 255;
    if (s === 0) {
      r = g = b = v;
    } else {
      if (h === 360) {
        h = 0;
      }
      if (h > 360) {
        h -= 360;
      }
      if (h < 0) {
        h += 360;
      }
      h /= 60;
      i = floor(h);
      f = h - i;
      p = v * (1 - s);
      q = v * (1 - s * f);
      t = v * (1 - s * (1 - f));
      switch (i) {
        case 0:
          ref = [v, t, p], r = ref[0], g = ref[1], b = ref[2];
          break;
        case 1:
          ref1 = [q, v, p], r = ref1[0], g = ref1[1], b = ref1[2];
          break;
        case 2:
          ref2 = [p, v, t], r = ref2[0], g = ref2[1], b = ref2[2];
          break;
        case 3:
          ref3 = [p, q, v], r = ref3[0], g = ref3[1], b = ref3[2];
          break;
        case 4:
          ref4 = [t, p, v], r = ref4[0], g = ref4[1], b = ref4[2];
          break;
        case 5:
          ref5 = [v, p, q], r = ref5[0], g = ref5[1], b = ref5[2];
      }
    }
    r = round(r);
    g = round(g);
    b = round(b);
    return [r, g, b, args.length > 3 ? args[3] : 1];
  };

  rgb2hsv = function() {
    var b, delta, g, h, min, r, ref, s, v;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    delta = max - min;
    v = max / 255.0;
    if (max === 0) {
      h = Number.NaN;
      s = 0;
    } else {
      s = delta / max;
      if (r === max) {
        h = (g - b) / delta;
      }
      if (g === max) {
        h = 2 + (b - r) / delta;
      }
      if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h *= 60;
      if (h < 0) {
        h += 360;
      }
    }
    return [h, s, v];
  };

  chroma.hsv = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['hsv']), function(){});
  };

  _input.hsv = hsv2rgb;

  Color.prototype.hsv = function() {
    return rgb2hsv(this._rgb);
  };

  num2rgb = function(num) {
    var b, g, r;
    if (type(num) === "number" && num >= 0 && num <= 0xFFFFFF) {
      r = num >> 16;
      g = (num >> 8) & 0xFF;
      b = num & 0xFF;
      return [r, g, b, 1];
    }
    console.warn("unknown num color: " + num);
    return [0, 0, 0, 1];
  };

  rgb2num = function() {
    var b, g, r, ref;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    return (r << 16) + (g << 8) + b;
  };

  chroma.num = function(num) {
    return new Color(num, 'num');
  };

  Color.prototype.num = function(mode) {
    if (mode == null) {
      mode = 'rgb';
    }
    return rgb2num(this._rgb, mode);
  };

  _input.num = num2rgb;

  _guess_formats.push({
    p: 10,
    test: function(n) {
      if (arguments.length === 1 && type(n) === "number" && n >= 0 && n <= 0xFFFFFF) {
        return 'num';
      }
    }
  });

  css2rgb = function(css) {
    var aa, ab, hsl, i, m, o, rgb, w;
    css = css.toLowerCase();
    if ((chroma.colors != null) && chroma.colors[css]) {
      return hex2rgb(chroma.colors[css]);
    }
    if (m = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
      rgb = m.slice(1, 4);
      for (i = o = 0; o <= 2; i = ++o) {
        rgb[i] = +rgb[i];
      }
      rgb[3] = 1;
    } else if (m = css.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) {
      rgb = m.slice(1, 5);
      for (i = w = 0; w <= 3; i = ++w) {
        rgb[i] = +rgb[i];
      }
    } else if (m = css.match(/rgb\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
      rgb = m.slice(1, 4);
      for (i = aa = 0; aa <= 2; i = ++aa) {
        rgb[i] = round(rgb[i] * 2.55);
      }
      rgb[3] = 1;
    } else if (m = css.match(/rgba\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
      rgb = m.slice(1, 5);
      for (i = ab = 0; ab <= 2; i = ++ab) {
        rgb[i] = round(rgb[i] * 2.55);
      }
      rgb[3] = +rgb[3];
    } else if (m = css.match(/hsl\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
      hsl = m.slice(1, 4);
      hsl[1] *= 0.01;
      hsl[2] *= 0.01;
      rgb = hsl2rgb(hsl);
      rgb[3] = 1;
    } else if (m = css.match(/hsla\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
      hsl = m.slice(1, 4);
      hsl[1] *= 0.01;
      hsl[2] *= 0.01;
      rgb = hsl2rgb(hsl);
      rgb[3] = +m[4];
    }
    return rgb;
  };

  rgb2css = function(rgba) {
    var mode;
    mode = rgba[3] < 1 ? 'rgba' : 'rgb';
    if (mode === 'rgb') {
      return mode + '(' + rgba.slice(0, 3).map(round).join(',') + ')';
    } else if (mode === 'rgba') {
      return mode + '(' + rgba.slice(0, 3).map(round).join(',') + ',' + rgba[3] + ')';
    } else {

    }
  };

  rnd = function(a) {
    return round(a * 100) / 100;
  };

  hsl2css = function(hsl, alpha) {
    var mode;
    mode = alpha < 1 ? 'hsla' : 'hsl';
    hsl[0] = rnd(hsl[0] || 0);
    hsl[1] = rnd(hsl[1] * 100) + '%';
    hsl[2] = rnd(hsl[2] * 100) + '%';
    if (mode === 'hsla') {
      hsl[3] = alpha;
    }
    return mode + '(' + hsl.join(',') + ')';
  };

  _input.css = function(h) {
    return css2rgb(h);
  };

  chroma.css = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['css']), function(){});
  };

  Color.prototype.css = function(mode) {
    if (mode == null) {
      mode = 'rgb';
    }
    if (mode.slice(0, 3) === 'rgb') {
      return rgb2css(this._rgb);
    } else if (mode.slice(0, 3) === 'hsl') {
      return hsl2css(this.hsl(), this.alpha());
    }
  };

  _input.named = function(name) {
    return hex2rgb(w3cx11[name]);
  };

  _guess_formats.push({
    p: 20,
    test: function(n) {
      if (arguments.length === 1 && (w3cx11[n] != null)) {
        return 'named';
      }
    }
  });

  Color.prototype.name = function(n) {
    var h, k;
    if (arguments.length) {
      if (w3cx11[n]) {
        this._rgb = hex2rgb(w3cx11[n]);
      }
      this._rgb[3] = 1;
      this;
    }
    h = this.hex();
    for (k in w3cx11) {
      if (h === w3cx11[k]) {
        return k;
      }
    }
    return h;
  };

  lch2lab = function() {

    /*
    Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
    These formulas were invented by David Dalrymple to obtain maximum contrast without going
    out of gamut if the parameters are in the range 0-1.
    
    A saturation multiplier was added by Gregor Aisch
     */
    var c, h, l, ref;
    ref = unpack(arguments), l = ref[0], c = ref[1], h = ref[2];
    h = h * DEG2RAD;
    return [l, cos(h) * c, sin(h) * c];
  };

  lch2rgb = function() {
    var L, a, args, b, c, g, h, l, r, ref, ref1;
    args = unpack(arguments);
    l = args[0], c = args[1], h = args[2];
    ref = lch2lab(l, c, h), L = ref[0], a = ref[1], b = ref[2];
    ref1 = lab2rgb(L, a, b), r = ref1[0], g = ref1[1], b = ref1[2];
    return [limit(r, 0, 255), limit(g, 0, 255), limit(b, 0, 255), args.length > 3 ? args[3] : 1];
  };

  lab2lch = function() {
    var a, b, c, h, l, ref;
    ref = unpack(arguments), l = ref[0], a = ref[1], b = ref[2];
    c = sqrt(a * a + b * b);
    h = (atan2(b, a) * RAD2DEG + 360) % 360;
    if (round(c * 10000) === 0) {
      h = Number.NaN;
    }
    return [l, c, h];
  };

  rgb2lch = function() {
    var a, b, g, l, r, ref, ref1;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    ref1 = rgb2lab(r, g, b), l = ref1[0], a = ref1[1], b = ref1[2];
    return lab2lch(l, a, b);
  };

  chroma.lch = function() {
    var args;
    args = unpack(arguments);
    return new Color(args, 'lch');
  };

  chroma.hcl = function() {
    var args;
    args = unpack(arguments);
    return new Color(args, 'hcl');
  };

  _input.lch = lch2rgb;

  _input.hcl = function() {
    var c, h, l, ref;
    ref = unpack(arguments), h = ref[0], c = ref[1], l = ref[2];
    return lch2rgb([l, c, h]);
  };

  Color.prototype.lch = function() {
    return rgb2lch(this._rgb);
  };

  Color.prototype.hcl = function() {
    return rgb2lch(this._rgb).reverse();
  };

  rgb2cmyk = function(mode) {
    var b, c, f, g, k, m, r, ref, y;
    if (mode == null) {
      mode = 'rgb';
    }
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    r = r / 255;
    g = g / 255;
    b = b / 255;
    k = 1 - Math.max(r, Math.max(g, b));
    f = k < 1 ? 1 / (1 - k) : 0;
    c = (1 - r - k) * f;
    m = (1 - g - k) * f;
    y = (1 - b - k) * f;
    return [c, m, y, k];
  };

  cmyk2rgb = function() {
    var alpha, args, b, c, g, k, m, r, y;
    args = unpack(arguments);
    c = args[0], m = args[1], y = args[2], k = args[3];
    alpha = args.length > 4 ? args[4] : 1;
    if (k === 1) {
      return [0, 0, 0, alpha];
    }
    r = c >= 1 ? 0 : round(255 * (1 - c) * (1 - k));
    g = m >= 1 ? 0 : round(255 * (1 - m) * (1 - k));
    b = y >= 1 ? 0 : round(255 * (1 - y) * (1 - k));
    return [r, g, b, alpha];
  };

  _input.cmyk = function() {
    return cmyk2rgb(unpack(arguments));
  };

  chroma.cmyk = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['cmyk']), function(){});
  };

  Color.prototype.cmyk = function() {
    return rgb2cmyk(this._rgb);
  };

  _input.gl = function() {
    var i, k, o, rgb, v;
    rgb = (function() {
      var ref, results;
      ref = unpack(arguments);
      results = [];
      for (k in ref) {
        v = ref[k];
        results.push(v);
      }
      return results;
    }).apply(this, arguments);
    for (i = o = 0; o <= 2; i = ++o) {
      rgb[i] *= 255;
    }
    return rgb;
  };

  chroma.gl = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['gl']), function(){});
  };

  Color.prototype.gl = function() {
    var rgb;
    rgb = this._rgb;
    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
  };

  rgb2luminance = function(r, g, b) {
    var ref;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    r = luminance_x(r);
    g = luminance_x(g);
    b = luminance_x(b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  luminance_x = function(x) {
    x /= 255;
    if (x <= 0.03928) {
      return x / 12.92;
    } else {
      return pow((x + 0.055) / 1.055, 2.4);
    }
  };

  _interpolators = [];

  interpolate = function(col1, col2, f, m) {
    var interpol, len, o, res;
    if (f == null) {
      f = 0.5;
    }
    if (m == null) {
      m = 'rgb';
    }

    /*
    interpolates between colors
    f = 0 --> me
    f = 1 --> col
     */
    if (type(col1) !== 'object') {
      col1 = chroma(col1);
    }
    if (type(col2) !== 'object') {
      col2 = chroma(col2);
    }
    for (o = 0, len = _interpolators.length; o < len; o++) {
      interpol = _interpolators[o];
      if (m === interpol[0]) {
        res = interpol[1](col1, col2, f, m);
        break;
      }
    }
    if (res == null) {
      throw "color mode " + m + " is not supported";
    }
    res.alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
    return res;
  };

  chroma.interpolate = interpolate;

  Color.prototype.interpolate = function(col2, f, m) {
    return interpolate(this, col2, f, m);
  };

  chroma.mix = interpolate;

  Color.prototype.mix = Color.prototype.interpolate;

  interpolate_rgb = function(col1, col2, f, m) {
    var xyz0, xyz1;
    xyz0 = col1._rgb;
    xyz1 = col2._rgb;
    return new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
  };

  _interpolators.push(['rgb', interpolate_rgb]);

  Color.prototype.luminance = function(lum, mode) {
    var cur_lum, eps, max_iter, test;
    if (mode == null) {
      mode = 'rgb';
    }
    if (!arguments.length) {
      return rgb2luminance(this._rgb);
    }
    if (lum === 0) {
      this._rgb = [0, 0, 0, this._rgb[3]];
    } else if (lum === 1) {
      this._rgb = [255, 255, 255, this._rgb[3]];
    } else {
      eps = 1e-7;
      max_iter = 20;
      test = function(l, h) {
        var lm, m;
        m = l.interpolate(h, 0.5, mode);
        lm = m.luminance();
        if (Math.abs(lum - lm) < eps || !max_iter--) {
          return m;
        }
        if (lm > lum) {
          return test(l, m);
        }
        return test(m, h);
      };
      cur_lum = rgb2luminance(this._rgb);
      this._rgb = (cur_lum > lum ? test(chroma('black'), this) : test(this, chroma('white'))).rgba();
    }
    return this;
  };

  temperature2rgb = function(kelvin) {
    var b, g, r, temp;
    temp = kelvin / 100;
    if (temp < 66) {
      r = 255;
      g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
      b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
    } else {
      r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
      g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
      b = 255;
    }
    return clip_rgb([r, g, b]);
  };

  rgb2temperature = function() {
    var b, eps, g, maxTemp, minTemp, r, ref, rgb, temp;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    minTemp = 1000;
    maxTemp = 40000;
    eps = 0.4;
    while (maxTemp - minTemp > eps) {
      temp = (maxTemp + minTemp) * 0.5;
      rgb = temperature2rgb(temp);
      if ((rgb[2] / rgb[0]) >= (b / r)) {
        maxTemp = temp;
      } else {
        minTemp = temp;
      }
    }
    return round(temp);
  };

  chroma.temperature = chroma.kelvin = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['temperature']), function(){});
  };

  _input.temperature = _input.kelvin = _input.K = temperature2rgb;

  Color.prototype.temperature = function() {
    return rgb2temperature(this._rgb);
  };

  Color.prototype.kelvin = Color.prototype.temperature;

  chroma.contrast = function(a, b) {
    var l1, l2, ref, ref1;
    if ((ref = type(a)) === 'string' || ref === 'number') {
      a = new Color(a);
    }
    if ((ref1 = type(b)) === 'string' || ref1 === 'number') {
      b = new Color(b);
    }
    l1 = a.luminance();
    l2 = b.luminance();
    if (l1 > l2) {
      return (l1 + 0.05) / (l2 + 0.05);
    } else {
      return (l2 + 0.05) / (l1 + 0.05);
    }
  };

  Color.prototype.get = function(modechan) {
    var channel, i, me, mode, ref, src;
    me = this;
    ref = modechan.split('.'), mode = ref[0], channel = ref[1];
    src = me[mode]();
    if (channel) {
      i = mode.indexOf(channel);
      if (i > -1) {
        return src[i];
      } else {
        return console.warn('unknown channel ' + channel + ' in mode ' + mode);
      }
    } else {
      return src;
    }
  };

  Color.prototype.set = function(modechan, value) {
    var channel, i, me, mode, ref, src;
    me = this;
    ref = modechan.split('.'), mode = ref[0], channel = ref[1];
    if (channel) {
      src = me[mode]();
      i = mode.indexOf(channel);
      if (i > -1) {
        if (type(value) === 'string') {
          switch (value.charAt(0)) {
            case '+':
              src[i] += +value;
              break;
            case '-':
              src[i] += +value;
              break;
            case '*':
              src[i] *= +(value.substr(1));
              break;
            case '/':
              src[i] /= +(value.substr(1));
              break;
            default:
              src[i] = +value;
          }
        } else {
          src[i] = value;
        }
      } else {
        console.warn('unknown channel ' + channel + ' in mode ' + mode);
      }
    } else {
      src = value;
    }
    me._rgb = chroma(src, mode).alpha(me.alpha())._rgb;
    return me;
  };

  Color.prototype.darken = function(amount) {
    var lab, me;
    if (amount == null) {
      amount = 1;
    }
    me = this;
    lab = me.lab();
    lab[0] -= LAB_CONSTANTS.Kn * amount;
    return chroma.lab(lab).alpha(me.alpha());
  };

  Color.prototype.brighten = function(amount) {
    if (amount == null) {
      amount = 1;
    }
    return this.darken(-amount);
  };

  Color.prototype.darker = Color.prototype.darken;

  Color.prototype.brighter = Color.prototype.brighten;

  Color.prototype.saturate = function(amount) {
    var lch, me;
    if (amount == null) {
      amount = 1;
    }
    me = this;
    lch = me.lch();
    lch[1] += amount * LAB_CONSTANTS.Kn;
    if (lch[1] < 0) {
      lch[1] = 0;
    }
    return chroma.lch(lch).alpha(me.alpha());
  };

  Color.prototype.desaturate = function(amount) {
    if (amount == null) {
      amount = 1;
    }
    return this.saturate(-amount);
  };

  Color.prototype.premultiply = function() {
    var a, rgb;
    rgb = this.rgb();
    a = this.alpha();
    return chroma(rgb[0] * a, rgb[1] * a, rgb[2] * a, a);
  };

  blend = function(bottom, top, mode) {
    if (!blend[mode]) {
      throw 'unknown blend mode ' + mode;
    }
    return blend[mode](bottom, top);
  };

  blend_f = function(f) {
    return function(bottom, top) {
      var c0, c1;
      c0 = chroma(top).rgb();
      c1 = chroma(bottom).rgb();
      return chroma(f(c0, c1), 'rgb');
    };
  };

  each = function(f) {
    return function(c0, c1) {
      var i, o, out;
      out = [];
      for (i = o = 0; o <= 3; i = ++o) {
        out[i] = f(c0[i], c1[i]);
      }
      return out;
    };
  };

  normal = function(a, b) {
    return a;
  };

  multiply = function(a, b) {
    return a * b / 255;
  };

  darken = function(a, b) {
    if (a > b) {
      return b;
    } else {
      return a;
    }
  };

  lighten = function(a, b) {
    if (a > b) {
      return a;
    } else {
      return b;
    }
  };

  screen = function(a, b) {
    return 255 * (1 - (1 - a / 255) * (1 - b / 255));
  };

  overlay = function(a, b) {
    if (b < 128) {
      return 2 * a * b / 255;
    } else {
      return 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
    }
  };

  burn = function(a, b) {
    return 255 * (1 - (1 - b / 255) / (a / 255));
  };

  dodge = function(a, b) {
    if (a === 255) {
      return 255;
    }
    a = 255 * (b / 255) / (1 - a / 255);
    if (a > 255) {
      return 255;
    } else {
      return a;
    }
  };

  blend.normal = blend_f(each(normal));

  blend.multiply = blend_f(each(multiply));

  blend.screen = blend_f(each(screen));

  blend.overlay = blend_f(each(overlay));

  blend.darken = blend_f(each(darken));

  blend.lighten = blend_f(each(lighten));

  blend.dodge = blend_f(each(dodge));

  blend.burn = blend_f(each(burn));

  chroma.blend = blend;

  chroma.analyze = function(data) {
    var len, o, r, val;
    r = {
      min: Number.MAX_VALUE,
      max: Number.MAX_VALUE * -1,
      sum: 0,
      values: [],
      count: 0
    };
    for (o = 0, len = data.length; o < len; o++) {
      val = data[o];
      if ((val != null) && !isNaN(val)) {
        r.values.push(val);
        r.sum += val;
        if (val < r.min) {
          r.min = val;
        }
        if (val > r.max) {
          r.max = val;
        }
        r.count += 1;
      }
    }
    r.domain = [r.min, r.max];
    r.limits = function(mode, num) {
      return chroma.limits(r, mode, num);
    };
    return r;
  };

  chroma.scale = function(colors, positions) {
    var _classes, _colorCache, _colors, _correctLightness, _domain, _fixed, _max, _min, _mode, _nacol, _out, _padding, _pos, _spread, classifyValue, f, getClass, getColor, resetCache, setColors, tmap;
    _mode = 'rgb';
    _nacol = chroma('#ccc');
    _spread = 0;
    _fixed = false;
    _domain = [0, 1];
    _pos = [];
    _padding = [0, 0];
    _classes = false;
    _colors = [];
    _out = false;
    _min = 0;
    _max = 1;
    _correctLightness = false;
    _colorCache = {};
    setColors = function(colors) {
      var c, col, o, ref, ref1, ref2, w;
      if (colors == null) {
        colors = ['#fff', '#000'];
      }
      if ((colors != null) && type(colors) === 'string' && (((ref = chroma.brewer) != null ? ref[colors] : void 0) != null)) {
        colors = chroma.brewer[colors];
      }
      if (type(colors) === 'array') {
        colors = colors.slice(0);
        for (c = o = 0, ref1 = colors.length - 1; 0 <= ref1 ? o <= ref1 : o >= ref1; c = 0 <= ref1 ? ++o : --o) {
          col = colors[c];
          if (type(col) === "string") {
            colors[c] = chroma(col);
          }
        }
        _pos.length = 0;
        for (c = w = 0, ref2 = colors.length - 1; 0 <= ref2 ? w <= ref2 : w >= ref2; c = 0 <= ref2 ? ++w : --w) {
          _pos.push(c / (colors.length - 1));
        }
      }
      resetCache();
      return _colors = colors;
    };
    getClass = function(value) {
      var i, n;
      if (_classes != null) {
        n = _classes.length - 1;
        i = 0;
        while (i < n && value >= _classes[i]) {
          i++;
        }
        return i - 1;
      }
      return 0;
    };
    tmap = function(t) {
      return t;
    };
    classifyValue = function(value) {
      var i, maxc, minc, n, val;
      val = value;
      if (_classes.length > 2) {
        n = _classes.length - 1;
        i = getClass(value);
        minc = _classes[0] + (_classes[1] - _classes[0]) * (0 + _spread * 0.5);
        maxc = _classes[n - 1] + (_classes[n] - _classes[n - 1]) * (1 - _spread * 0.5);
        val = _min + ((_classes[i] + (_classes[i + 1] - _classes[i]) * 0.5 - minc) / (maxc - minc)) * (_max - _min);
      }
      return val;
    };
    getColor = function(val, bypassMap) {
      var c, col, i, k, o, p, ref, t;
      if (bypassMap == null) {
        bypassMap = false;
      }
      if (isNaN(val)) {
        return _nacol;
      }
      if (!bypassMap) {
        if (_classes && _classes.length > 2) {
          c = getClass(val);
          t = c / (_classes.length - 2);
          t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));
        } else if (_max !== _min) {
          t = (val - _min) / (_max - _min);
          t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));
          t = Math.min(1, Math.max(0, t));
        } else {
          t = 1;
        }
      } else {
        t = val;
      }
      if (!bypassMap) {
        t = tmap(t);
      }
      k = Math.floor(t * 10000);
      if (_colorCache[k]) {
        col = _colorCache[k];
      } else {
        if (type(_colors) === 'array') {
          for (i = o = 0, ref = _pos.length - 1; 0 <= ref ? o <= ref : o >= ref; i = 0 <= ref ? ++o : --o) {
            p = _pos[i];
            if (t <= p) {
              col = _colors[i];
              break;
            }
            if (t >= p && i === _pos.length - 1) {
              col = _colors[i];
              break;
            }
            if (t > p && t < _pos[i + 1]) {
              t = (t - p) / (_pos[i + 1] - p);
              col = chroma.interpolate(_colors[i], _colors[i + 1], t, _mode);
              break;
            }
          }
        } else if (type(_colors) === 'function') {
          col = _colors(t);
        }
        _colorCache[k] = col;
      }
      return col;
    };
    resetCache = function() {
      return _colorCache = {};
    };
    setColors(colors);
    f = function(v) {
      var c;
      c = chroma(getColor(v));
      if (_out && c[_out]) {
        return c[_out]();
      } else {
        return c;
      }
    };
    f.classes = function(classes) {
      var d;
      if (classes != null) {
        if (type(classes) === 'array') {
          _classes = classes;
          _domain = [classes[0], classes[classes.length - 1]];
        } else {
          d = chroma.analyze(_domain);
          if (classes === 0) {
            _classes = [d.min, d.max];
          } else {
            _classes = chroma.limits(d, 'e', classes);
          }
        }
        return f;
      }
      return _classes;
    };
    f.domain = function(domain) {
      var c, d, k, len, o, ref, w;
      if (!arguments.length) {
        return _domain;
      }
      _min = domain[0];
      _max = domain[domain.length - 1];
      _pos = [];
      k = _colors.length;
      if (domain.length === k && _min !== _max) {
        for (o = 0, len = domain.length; o < len; o++) {
          d = domain[o];
          _pos.push((d - _min) / (_max - _min));
        }
      } else {
        for (c = w = 0, ref = k - 1; 0 <= ref ? w <= ref : w >= ref; c = 0 <= ref ? ++w : --w) {
          _pos.push(c / (k - 1));
        }
      }
      _domain = [_min, _max];
      return f;
    };
    f.mode = function(_m) {
      if (!arguments.length) {
        return _mode;
      }
      _mode = _m;
      resetCache();
      return f;
    };
    f.range = function(colors, _pos) {
      setColors(colors, _pos);
      return f;
    };
    f.out = function(_o) {
      _out = _o;
      return f;
    };
    f.spread = function(val) {
      if (!arguments.length) {
        return _spread;
      }
      _spread = val;
      return f;
    };
    f.correctLightness = function(v) {
      if (v == null) {
        v = true;
      }
      _correctLightness = v;
      resetCache();
      if (_correctLightness) {
        tmap = function(t) {
          var L0, L1, L_actual, L_diff, L_ideal, max_iter, pol, t0, t1;
          L0 = getColor(0, true).lab()[0];
          L1 = getColor(1, true).lab()[0];
          pol = L0 > L1;
          L_actual = getColor(t, true).lab()[0];
          L_ideal = L0 + (L1 - L0) * t;
          L_diff = L_actual - L_ideal;
          t0 = 0;
          t1 = 1;
          max_iter = 20;
          while (Math.abs(L_diff) > 1e-2 && max_iter-- > 0) {
            (function() {
              if (pol) {
                L_diff *= -1;
              }
              if (L_diff < 0) {
                t0 = t;
                t += (t1 - t) * 0.5;
              } else {
                t1 = t;
                t += (t0 - t) * 0.5;
              }
              L_actual = getColor(t, true).lab()[0];
              return L_diff = L_actual - L_ideal;
            })();
          }
          return t;
        };
      } else {
        tmap = function(t) {
          return t;
        };
      }
      return f;
    };
    f.padding = function(p) {
      if (p != null) {
        if (type(p) === 'number') {
          p = [p, p];
        }
        _padding = p;
        return f;
      } else {
        return _padding;
      }
    };
    f.colors = function() {
      var dd, dm, i, numColors, o, out, ref, results, samples, w;
      numColors = 0;
      out = 'hex';
      if (arguments.length === 1) {
        if (type(arguments[0]) === 'string') {
          out = arguments[0];
        } else {
          numColors = arguments[0];
        }
      }
      if (arguments.length === 2) {
        numColors = arguments[0], out = arguments[1];
      }
      if (numColors) {
        dm = _domain[0];
        dd = _domain[1] - dm;
        return (function() {
          results = [];
          for (var o = 0; 0 <= numColors ? o < numColors : o > numColors; 0 <= numColors ? o++ : o--){ results.push(o); }
          return results;
        }).apply(this).map(function(i) {
          return f(dm + i / (numColors - 1) * dd)[out]();
        });
      }
      colors = [];
      samples = [];
      if (_classes && _classes.length > 2) {
        for (i = w = 1, ref = _classes.length; 1 <= ref ? w < ref : w > ref; i = 1 <= ref ? ++w : --w) {
          samples.push((_classes[i - 1] + _classes[i]) * 0.5);
        }
      } else {
        samples = _domain;
      }
      return samples.map(function(v) {
        return f(v)[out]();
      });
    };
    return f;
  };

  if (chroma.scales == null) {
    chroma.scales = {};
  }

  chroma.scales.cool = function() {
    return chroma.scale([chroma.hsl(180, 1, .9), chroma.hsl(250, .7, .4)]);
  };

  chroma.scales.hot = function() {
    return chroma.scale(['#000', '#f00', '#ff0', '#fff'], [0, .25, .75, 1]).mode('rgb');
  };

  chroma.analyze = function(data, key, filter) {
    var add, k, len, o, r, val, visit;
    r = {
      min: Number.MAX_VALUE,
      max: Number.MAX_VALUE * -1,
      sum: 0,
      values: [],
      count: 0
    };
    if (filter == null) {
      filter = function() {
        return true;
      };
    }
    add = function(val) {
      if ((val != null) && !isNaN(val)) {
        r.values.push(val);
        r.sum += val;
        if (val < r.min) {
          r.min = val;
        }
        if (val > r.max) {
          r.max = val;
        }
        r.count += 1;
      }
    };
    visit = function(val, k) {
      if (filter(val, k)) {
        if ((key != null) && type(key) === 'function') {
          return add(key(val));
        } else if ((key != null) && type(key) === 'string' || type(key) === 'number') {
          return add(val[key]);
        } else {
          return add(val);
        }
      }
    };
    if (type(data) === 'array') {
      for (o = 0, len = data.length; o < len; o++) {
        val = data[o];
        visit(val);
      }
    } else {
      for (k in data) {
        val = data[k];
        visit(val, k);
      }
    }
    r.domain = [r.min, r.max];
    r.limits = function(mode, num) {
      return chroma.limits(r, mode, num);
    };
    return r;
  };

  chroma.limits = function(data, mode, num) {
    var aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, assignments, best, centroids, cluster, clusterSizes, dist, i, j, kClusters, limits, max_log, min, min_log, mindist, n, nb_iters, newCentroids, o, p, pb, pr, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, repeat, sum, tmpKMeansBreaks, value, values, w;
    if (mode == null) {
      mode = 'equal';
    }
    if (num == null) {
      num = 7;
    }
    if (type(data) === 'array') {
      data = chroma.analyze(data);
    }
    min = data.min;
    max = data.max;
    sum = data.sum;
    values = data.values.sort(function(a, b) {
      return a - b;
    });
    limits = [];
    if (mode.substr(0, 1) === 'c') {
      limits.push(min);
      limits.push(max);
    }
    if (mode.substr(0, 1) === 'e') {
      limits.push(min);
      for (i = o = 1, ref = num - 1; 1 <= ref ? o <= ref : o >= ref; i = 1 <= ref ? ++o : --o) {
        limits.push(min + (i / num) * (max - min));
      }
      limits.push(max);
    } else if (mode.substr(0, 1) === 'l') {
      if (min <= 0) {
        throw 'Logarithmic scales are only possible for values > 0';
      }
      min_log = Math.LOG10E * log(min);
      max_log = Math.LOG10E * log(max);
      limits.push(min);
      for (i = w = 1, ref1 = num - 1; 1 <= ref1 ? w <= ref1 : w >= ref1; i = 1 <= ref1 ? ++w : --w) {
        limits.push(pow(10, min_log + (i / num) * (max_log - min_log)));
      }
      limits.push(max);
    } else if (mode.substr(0, 1) === 'q') {
      limits.push(min);
      for (i = aa = 1, ref2 = num - 1; 1 <= ref2 ? aa <= ref2 : aa >= ref2; i = 1 <= ref2 ? ++aa : --aa) {
        p = values.length * i / num;
        pb = floor(p);
        if (pb === p) {
          limits.push(values[pb]);
        } else {
          pr = p - pb;
          limits.push(values[pb] * pr + values[pb + 1] * (1 - pr));
        }
      }
      limits.push(max);
    } else if (mode.substr(0, 1) === 'k') {

      /*
      implementation based on
      http://code.google.com/p/figue/source/browse/trunk/figue.js#336
      simplified for 1-d input values
       */
      n = values.length;
      assignments = new Array(n);
      clusterSizes = new Array(num);
      repeat = true;
      nb_iters = 0;
      centroids = null;
      centroids = [];
      centroids.push(min);
      for (i = ab = 1, ref3 = num - 1; 1 <= ref3 ? ab <= ref3 : ab >= ref3; i = 1 <= ref3 ? ++ab : --ab) {
        centroids.push(min + (i / num) * (max - min));
      }
      centroids.push(max);
      while (repeat) {
        for (j = ac = 0, ref4 = num - 1; 0 <= ref4 ? ac <= ref4 : ac >= ref4; j = 0 <= ref4 ? ++ac : --ac) {
          clusterSizes[j] = 0;
        }
        for (i = ad = 0, ref5 = n - 1; 0 <= ref5 ? ad <= ref5 : ad >= ref5; i = 0 <= ref5 ? ++ad : --ad) {
          value = values[i];
          mindist = Number.MAX_VALUE;
          for (j = ae = 0, ref6 = num - 1; 0 <= ref6 ? ae <= ref6 : ae >= ref6; j = 0 <= ref6 ? ++ae : --ae) {
            dist = abs(centroids[j] - value);
            if (dist < mindist) {
              mindist = dist;
              best = j;
            }
          }
          clusterSizes[best]++;
          assignments[i] = best;
        }
        newCentroids = new Array(num);
        for (j = af = 0, ref7 = num - 1; 0 <= ref7 ? af <= ref7 : af >= ref7; j = 0 <= ref7 ? ++af : --af) {
          newCentroids[j] = null;
        }
        for (i = ag = 0, ref8 = n - 1; 0 <= ref8 ? ag <= ref8 : ag >= ref8; i = 0 <= ref8 ? ++ag : --ag) {
          cluster = assignments[i];
          if (newCentroids[cluster] === null) {
            newCentroids[cluster] = values[i];
          } else {
            newCentroids[cluster] += values[i];
          }
        }
        for (j = ah = 0, ref9 = num - 1; 0 <= ref9 ? ah <= ref9 : ah >= ref9; j = 0 <= ref9 ? ++ah : --ah) {
          newCentroids[j] *= 1 / clusterSizes[j];
        }
        repeat = false;
        for (j = ai = 0, ref10 = num - 1; 0 <= ref10 ? ai <= ref10 : ai >= ref10; j = 0 <= ref10 ? ++ai : --ai) {
          if (newCentroids[j] !== centroids[i]) {
            repeat = true;
            break;
          }
        }
        centroids = newCentroids;
        nb_iters++;
        if (nb_iters > 200) {
          repeat = false;
        }
      }
      kClusters = {};
      for (j = aj = 0, ref11 = num - 1; 0 <= ref11 ? aj <= ref11 : aj >= ref11; j = 0 <= ref11 ? ++aj : --aj) {
        kClusters[j] = [];
      }
      for (i = ak = 0, ref12 = n - 1; 0 <= ref12 ? ak <= ref12 : ak >= ref12; i = 0 <= ref12 ? ++ak : --ak) {
        cluster = assignments[i];
        kClusters[cluster].push(values[i]);
      }
      tmpKMeansBreaks = [];
      for (j = al = 0, ref13 = num - 1; 0 <= ref13 ? al <= ref13 : al >= ref13; j = 0 <= ref13 ? ++al : --al) {
        tmpKMeansBreaks.push(kClusters[j][0]);
        tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
      }
      tmpKMeansBreaks = tmpKMeansBreaks.sort(function(a, b) {
        return a - b;
      });
      limits.push(tmpKMeansBreaks[0]);
      for (i = am = 1, ref14 = tmpKMeansBreaks.length - 1; am <= ref14; i = am += 2) {
        if (!isNaN(tmpKMeansBreaks[i])) {
          limits.push(tmpKMeansBreaks[i]);
        }
      }
    }
    return limits;
  };

  hsi2rgb = function(h, s, i) {

    /*
    borrowed from here:
    http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
     */
    var args, b, g, r;
    args = unpack(arguments);
    h = args[0], s = args[1], i = args[2];
    h /= 360;
    if (h < 1 / 3) {
      b = (1 - s) / 3;
      r = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
      g = 1 - (b + r);
    } else if (h < 2 / 3) {
      h -= 1 / 3;
      r = (1 - s) / 3;
      g = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
      b = 1 - (r + g);
    } else {
      h -= 2 / 3;
      g = (1 - s) / 3;
      b = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
      r = 1 - (g + b);
    }
    r = limit(i * r * 3);
    g = limit(i * g * 3);
    b = limit(i * b * 3);
    return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
  };

  rgb2hsi = function() {

    /*
    borrowed from here:
    http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
     */
    var b, g, h, i, min, r, ref, s;
    ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
    TWOPI = Math.PI * 2;
    r /= 255;
    g /= 255;
    b /= 255;
    min = Math.min(r, g, b);
    i = (r + g + b) / 3;
    s = 1 - min / i;
    if (s === 0) {
      h = 0;
    } else {
      h = ((r - g) + (r - b)) / 2;
      h /= Math.sqrt((r - g) * (r - g) + (r - b) * (g - b));
      h = Math.acos(h);
      if (b > g) {
        h = TWOPI - h;
      }
      h /= TWOPI;
    }
    return [h * 360, s, i];
  };

  chroma.hsi = function() {
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Color, slice.call(arguments).concat(['hsi']), function(){});
  };

  _input.hsi = hsi2rgb;

  Color.prototype.hsi = function() {
    return rgb2hsi(this._rgb);
  };

  interpolate_hsx = function(col1, col2, f, m) {
    var dh, hue, hue0, hue1, lbv, lbv0, lbv1, res, sat, sat0, sat1, xyz0, xyz1;
    if (m === 'hsl') {
      xyz0 = col1.hsl();
      xyz1 = col2.hsl();
    } else if (m === 'hsv') {
      xyz0 = col1.hsv();
      xyz1 = col2.hsv();
    } else if (m === 'hsi') {
      xyz0 = col1.hsi();
      xyz1 = col2.hsi();
    } else if (m === 'lch' || m === 'hcl') {
      m = 'hcl';
      xyz0 = col1.hcl();
      xyz1 = col2.hcl();
    }
    if (m.substr(0, 1) === 'h') {
      hue0 = xyz0[0], sat0 = xyz0[1], lbv0 = xyz0[2];
      hue1 = xyz1[0], sat1 = xyz1[1], lbv1 = xyz1[2];
    }
    if (!isNaN(hue0) && !isNaN(hue1)) {
      if (hue1 > hue0 && hue1 - hue0 > 180) {
        dh = hue1 - (hue0 + 360);
      } else if (hue1 < hue0 && hue0 - hue1 > 180) {
        dh = hue1 + 360 - hue0;
      } else {
        dh = hue1 - hue0;
      }
      hue = hue0 + f * dh;
    } else if (!isNaN(hue0)) {
      hue = hue0;
      if ((lbv1 === 1 || lbv1 === 0) && m !== 'hsv') {
        sat = sat0;
      }
    } else if (!isNaN(hue1)) {
      hue = hue1;
      if ((lbv0 === 1 || lbv0 === 0) && m !== 'hsv') {
        sat = sat1;
      }
    } else {
      hue = Number.NaN;
    }
    if (sat == null) {
      sat = sat0 + f * (sat1 - sat0);
    }
    lbv = lbv0 + f * (lbv1 - lbv0);
    return res = chroma[m](hue, sat, lbv);
  };

  _interpolators = _interpolators.concat((function() {
    var len, o, ref, results;
    ref = ['hsv', 'hsl', 'hsi', 'hcl', 'lch'];
    results = [];
    for (o = 0, len = ref.length; o < len; o++) {
      m = ref[o];
      results.push([m, interpolate_hsx]);
    }
    return results;
  })());

  interpolate_num = function(col1, col2, f, m) {
    var n1, n2;
    n1 = col1.num();
    n2 = col2.num();
    return chroma.num(n1 + (n2 - n1) * f, 'num');
  };

  _interpolators.push(['num', interpolate_num]);

  interpolate_lab = function(col1, col2, f, m) {
    var res, xyz0, xyz1;
    xyz0 = col1.lab();
    xyz1 = col2.lab();
    return res = new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
  };

  _interpolators.push(['lab', interpolate_lab]);

}).call(this);

},{}],136:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],137:[function(require,module,exports){
(function (global){
/*!
 * deep-diff.
 * Licensed under the MIT License.
 */
;(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function() {
      return factory();
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.DeepDiff = factory();
  }
}(this, function(undefined) {
  'use strict';

  var $scope, conflict, conflictResolution = [];
  if (typeof global === 'object' && global) {
    $scope = global;
  } else if (typeof window !== 'undefined') {
    $scope = window;
  } else {
    $scope = {};
  }
  conflict = $scope.DeepDiff;
  if (conflict) {
    conflictResolution.push(
      function() {
        if ('undefined' !== typeof conflict && $scope.DeepDiff === accumulateDiff) {
          $scope.DeepDiff = conflict;
          conflict = undefined;
        }
      });
  }

  // nodejs compatible on server side and in the browser.
  function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }

  function Diff(kind, path) {
    Object.defineProperty(this, 'kind', {
      value: kind,
      enumerable: true
    });
    if (path && path.length) {
      Object.defineProperty(this, 'path', {
        value: path,
        enumerable: true
      });
    }
  }

  function DiffEdit(path, origin, value) {
    DiffEdit.super_.call(this, 'E', path);
    Object.defineProperty(this, 'lhs', {
      value: origin,
      enumerable: true
    });
    Object.defineProperty(this, 'rhs', {
      value: value,
      enumerable: true
    });
  }
  inherits(DiffEdit, Diff);

  function DiffNew(path, value) {
    DiffNew.super_.call(this, 'N', path);
    Object.defineProperty(this, 'rhs', {
      value: value,
      enumerable: true
    });
  }
  inherits(DiffNew, Diff);

  function DiffDeleted(path, value) {
    DiffDeleted.super_.call(this, 'D', path);
    Object.defineProperty(this, 'lhs', {
      value: value,
      enumerable: true
    });
  }
  inherits(DiffDeleted, Diff);

  function DiffArray(path, index, item) {
    DiffArray.super_.call(this, 'A', path);
    Object.defineProperty(this, 'index', {
      value: index,
      enumerable: true
    });
    Object.defineProperty(this, 'item', {
      value: item,
      enumerable: true
    });
  }
  inherits(DiffArray, Diff);

  function arrayRemove(arr, from, to) {
    var rest = arr.slice((to || from) + 1 || arr.length);
    arr.length = from < 0 ? arr.length + from : from;
    arr.push.apply(arr, rest);
    return arr;
  }

  function realTypeOf(subject) {
    var type = typeof subject;
    if (type !== 'object') {
      return type;
    }

    if (subject === Math) {
      return 'math';
    } else if (subject === null) {
      return 'null';
    } else if (Array.isArray(subject)) {
      return 'array';
    } else if (Object.prototype.toString.call(subject) === '[object Date]') {
      return 'date';
    } else if (typeof subject.toString !== 'undefined' && /^\/.*\//.test(subject.toString())) {
      return 'regexp';
    }
    return 'object';
  }

  function deepDiff(lhs, rhs, changes, prefilter, path, key, stack) {
    path = path || [];
    var currentPath = path.slice(0);
    if (typeof key !== 'undefined') {
      if (prefilter) {
        if (typeof(prefilter) === 'function' && prefilter(currentPath, key)) { return; }
        else if (typeof(prefilter) === 'object') {
          if (prefilter.prefilter && prefilter.prefilter(currentPath, key)) { return; }
          if (prefilter.normalize) {
            var alt = prefilter.normalize(currentPath, key, lhs, rhs);
            if (alt) {
              lhs = alt[0];
              rhs = alt[1];
            }
          }
        }
      }
      currentPath.push(key);
    }

    // Use string comparison for regexes
    if (realTypeOf(lhs) === 'regexp' && realTypeOf(rhs) === 'regexp') {
      lhs = lhs.toString();
      rhs = rhs.toString();
    }

    var ltype = typeof lhs;
    var rtype = typeof rhs;
    if (ltype === 'undefined') {
      if (rtype !== 'undefined') {
        changes(new DiffNew(currentPath, rhs));
      }
    } else if (rtype === 'undefined') {
      changes(new DiffDeleted(currentPath, lhs));
    } else if (realTypeOf(lhs) !== realTypeOf(rhs)) {
      changes(new DiffEdit(currentPath, lhs, rhs));
    } else if (Object.prototype.toString.call(lhs) === '[object Date]' && Object.prototype.toString.call(rhs) === '[object Date]' && ((lhs - rhs) !== 0)) {
      changes(new DiffEdit(currentPath, lhs, rhs));
    } else if (ltype === 'object' && lhs !== null && rhs !== null) {
      stack = stack || [];
      if (stack.indexOf(lhs) < 0) {
        stack.push(lhs);
        if (Array.isArray(lhs)) {
          var i, len = lhs.length;
          for (i = 0; i < lhs.length; i++) {
            if (i >= rhs.length) {
              changes(new DiffArray(currentPath, i, new DiffDeleted(undefined, lhs[i])));
            } else {
              deepDiff(lhs[i], rhs[i], changes, prefilter, currentPath, i, stack);
            }
          }
          while (i < rhs.length) {
            changes(new DiffArray(currentPath, i, new DiffNew(undefined, rhs[i++])));
          }
        } else {
          var akeys = Object.keys(lhs);
          var pkeys = Object.keys(rhs);
          akeys.forEach(function(k, i) {
            var other = pkeys.indexOf(k);
            if (other >= 0) {
              deepDiff(lhs[k], rhs[k], changes, prefilter, currentPath, k, stack);
              pkeys = arrayRemove(pkeys, other);
            } else {
              deepDiff(lhs[k], undefined, changes, prefilter, currentPath, k, stack);
            }
          });
          pkeys.forEach(function(k) {
            deepDiff(undefined, rhs[k], changes, prefilter, currentPath, k, stack);
          });
        }
        stack.length = stack.length - 1;
      }
    } else if (lhs !== rhs) {
      if (!(ltype === 'number' && isNaN(lhs) && isNaN(rhs))) {
        changes(new DiffEdit(currentPath, lhs, rhs));
      }
    }
  }

  function accumulateDiff(lhs, rhs, prefilter, accum) {
    accum = accum || [];
    deepDiff(lhs, rhs,
      function(diff) {
        if (diff) {
          accum.push(diff);
        }
      },
      prefilter);
    return (accum.length) ? accum : undefined;
  }

  function applyArrayChange(arr, index, change) {
    if (change.path && change.path.length) {
      var it = arr[index],
          i, u = change.path.length - 1;
      for (i = 0; i < u; i++) {
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          applyArrayChange(it[change.path[i]], change.index, change.item);
          break;
        case 'D':
          delete it[change.path[i]];
          break;
        case 'E':
        case 'N':
          it[change.path[i]] = change.rhs;
          break;
      }
    } else {
      switch (change.kind) {
        case 'A':
          applyArrayChange(arr[index], change.index, change.item);
          break;
        case 'D':
          arr = arrayRemove(arr, index);
          break;
        case 'E':
        case 'N':
          arr[index] = change.rhs;
          break;
      }
    }
    return arr;
  }

  function applyChange(target, source, change) {
    if (target && source && change && change.kind) {
      var it = target,
          i = -1,
          last = change.path ? change.path.length - 1 : 0;
      while (++i < last) {
        if (typeof it[change.path[i]] === 'undefined') {
          it[change.path[i]] = (typeof change.path[i] === 'number') ? [] : {};
        }
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          applyArrayChange(change.path ? it[change.path[i]] : it, change.index, change.item);
          break;
        case 'D':
          delete it[change.path[i]];
          break;
        case 'E':
        case 'N':
          it[change.path[i]] = change.rhs;
          break;
      }
    }
  }

  function revertArrayChange(arr, index, change) {
    if (change.path && change.path.length) {
      // the structure of the object at the index has changed...
      var it = arr[index],
          i, u = change.path.length - 1;
      for (i = 0; i < u; i++) {
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          revertArrayChange(it[change.path[i]], change.index, change.item);
          break;
        case 'D':
          it[change.path[i]] = change.lhs;
          break;
        case 'E':
          it[change.path[i]] = change.lhs;
          break;
        case 'N':
          delete it[change.path[i]];
          break;
      }
    } else {
      // the array item is different...
      switch (change.kind) {
        case 'A':
          revertArrayChange(arr[index], change.index, change.item);
          break;
        case 'D':
          arr[index] = change.lhs;
          break;
        case 'E':
          arr[index] = change.lhs;
          break;
        case 'N':
          arr = arrayRemove(arr, index);
          break;
      }
    }
    return arr;
  }

  function revertChange(target, source, change) {
    if (target && source && change && change.kind) {
      var it = target,
          i, u;
      u = change.path.length - 1;
      for (i = 0; i < u; i++) {
        if (typeof it[change.path[i]] === 'undefined') {
          it[change.path[i]] = {};
        }
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          // Array was modified...
          // it will be an array...
          revertArrayChange(it[change.path[i]], change.index, change.item);
          break;
        case 'D':
          // Item was deleted...
          it[change.path[i]] = change.lhs;
          break;
        case 'E':
          // Item was edited...
          it[change.path[i]] = change.lhs;
          break;
        case 'N':
          // Item is new...
          delete it[change.path[i]];
          break;
      }
    }
  }

  function applyDiff(target, source, filter) {
    if (target && source) {
      var onChange = function(change) {
        if (!filter || filter(target, source, change)) {
          applyChange(target, source, change);
        }
      };
      deepDiff(target, source, onChange);
    }
  }

  Object.defineProperties(accumulateDiff, {

    diff: {
      value: accumulateDiff,
      enumerable: true
    },
    observableDiff: {
      value: deepDiff,
      enumerable: true
    },
    applyDiff: {
      value: applyDiff,
      enumerable: true
    },
    applyChange: {
      value: applyChange,
      enumerable: true
    },
    revertChange: {
      value: revertChange,
      enumerable: true
    },
    isConflict: {
      value: function() {
        return 'undefined' !== typeof conflict;
      },
      enumerable: true
    },
    noConflict: {
      value: function() {
        if (conflictResolution) {
          conflictResolution.forEach(function(it) {
            it();
          });
          conflictResolution = null;
        }
        return accumulateDiff;
      },
      enumerable: true
    }
  });

  return accumulateDiff;
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],138:[function(require,module,exports){
(function (Buffer){
/*!
 * @description Recursive object extending
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2015 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

function isSpecificValue(val) {
	return (
		val instanceof Buffer
		|| val instanceof Date
		|| val instanceof RegExp
	) ? true : false;
}

function cloneSpecificValue(val) {
	if (val instanceof Buffer) {
		var x = new Buffer(val.length);
		val.copy(x);
		return x;
	} else if (val instanceof Date) {
		return new Date(val.getTime());
	} else if (val instanceof RegExp) {
		return new RegExp(val);
	} else {
		throw new Error('Unexpected situation');
	}
}

/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
	var clone = [];
	arr.forEach(function (item, index) {
		if (typeof item === 'object' && item !== null) {
			if (Array.isArray(item)) {
				clone[index] = deepCloneArray(item);
			} else if (isSpecificValue(item)) {
				clone[index] = cloneSpecificValue(item);
			} else {
				clone[index] = deepExtend({}, item);
			}
		} else {
			clone[index] = item;
		}
	});
	return clone;
}

/**
 * Extening object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
var deepExtend = module.exports = function (/*obj_1, [obj_2], [obj_N]*/) {
	if (arguments.length < 1 || typeof arguments[0] !== 'object') {
		return false;
	}

	if (arguments.length < 2) {
		return arguments[0];
	}

	var target = arguments[0];

	// convert arguments to array and cut off target object
	var args = Array.prototype.slice.call(arguments, 1);

	var val, src, clone;

	args.forEach(function (obj) {
		// skip argument if it is array or isn't object
		if (typeof obj !== 'object' || Array.isArray(obj)) {
			return;
		}

		Object.keys(obj).forEach(function (key) {
			src = target[key]; // source value
			val = obj[key]; // new value

			// recursion prevention
			if (val === target) {
				return;

			/**
			 * if new value isn't object then just overwrite by new value
			 * instead of extending.
			 */
			} else if (typeof val !== 'object' || val === null) {
				target[key] = val;
				return;

			// just clone arrays (and recursive clone objects inside)
			} else if (Array.isArray(val)) {
				target[key] = deepCloneArray(val);
				return;

			// custom cloning and overwrite for specific objects
			} else if (isSpecificValue(val)) {
				target[key] = cloneSpecificValue(val);
				return;

			// overwrite by new value if source isn't object or array
			} else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
				target[key] = deepExtend({}, val);
				return;

			// source value and new value is objects both, extending...
			} else {
				target[key] = deepExtend(src, val);
				return;
			}
		});
	});

	return target;
}

}).call(this,require("buffer").Buffer)

},{"buffer":128}],139:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _EventEmitter2 = require('./EventEmitter');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function remove(arr, what) {
  var found = arr.indexOf(what);

  while (found !== -1) {
    arr.splice(found, 1);
    found = arr.indexOf(what);
  }
}

var Connector = function (_EventEmitter) {
  _inherits(Connector, _EventEmitter);

  function Connector(backend, store, services) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, Connector);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.backend = backend;
    _this.store = store;
    _this.services = services;
    _this.options = options;
    _this.logger = _logger2.default.create('backendConnector');

    _this.state = {};
    _this.queue = [];

    _this.backend && _this.backend.init && _this.backend.init(services, options.backend, options);
    return _this;
  }

  Connector.prototype.queueLoad = function queueLoad(languages, namespaces, callback) {
    var _this2 = this;

    // find what needs to be loaded
    var toLoad = [],
        pending = [],
        toLoadLanguages = [],
        toLoadNamespaces = [];

    languages.forEach(function (lng) {
      var hasAllNamespaces = true;

      namespaces.forEach(function (ns) {
        var name = lng + '|' + ns;

        if (_this2.store.hasResourceBundle(lng, ns)) {
          _this2.state[name] = 2; // loaded
        } else if (_this2.state[name] < 0) {
            // nothing to do for err
          } else if (_this2.state[name] === 1) {
              if (pending.indexOf(name) < 0) pending.push(name);
            } else {
              _this2.state[name] = 1; // pending

              hasAllNamespaces = false;

              if (pending.indexOf(name) < 0) pending.push(name);
              if (toLoad.indexOf(name) < 0) toLoad.push(name);
              if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
            }
      });

      if (!hasAllNamespaces) toLoadLanguages.push(lng);
    });

    if (toLoad.length || pending.length) {
      this.queue.push({
        pending: pending,
        loaded: {},
        errors: [],
        callback: callback
      });
    }

    return {
      toLoad: toLoad,
      pending: pending,
      toLoadLanguages: toLoadLanguages,
      toLoadNamespaces: toLoadNamespaces
    };
  };

  Connector.prototype.loaded = function loaded(name, err, data) {
    var _this3 = this;

    var _name$split = name.split('|');

    var _name$split2 = _slicedToArray(_name$split, 2);

    var lng = _name$split2[0];
    var ns = _name$split2[1];


    if (err) this.emit('failedLoading', lng, ns, err);

    if (data) {
      this.store.addResourceBundle(lng, ns, data);
    }

    // set loaded
    this.state[name] = err ? -1 : 2;
    // callback if ready
    this.queue.forEach(function (q) {
      utils.pushPath(q.loaded, [lng], ns);
      remove(q.pending, name);

      if (err) q.errors.push(err);

      if (q.pending.length === 0 && !q.done) {
        q.errors.length ? q.callback(q.errors) : q.callback();
        _this3.emit('loaded', q.loaded);
        q.done = true;
      }
    });

    // remove done load requests
    this.queue = this.queue.filter(function (q) {
      return !q.done;
    });
  };

  Connector.prototype.read = function read(lng, ns, fcName, tried, wait, callback) {
    var _this4 = this;

    if (!tried) tried = 0;
    if (!wait) wait = 250;

    if (!lng.length) return callback(null, {}); // noting to load

    this.backend[fcName](lng, ns, function (err, data) {
      if (err && data /* = retryFlag */ && tried < 5) {
        setTimeout(function () {
          _this4.read.call(_this4, lng, ns, fcName, ++tried, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    });
  };

  Connector.prototype.load = function load(languages, namespaces, callback) {
    var _this5 = this;

    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
      return callback && callback();
    }
    var options = _extends({}, this.backend.options, this.options.backend);

    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
    if (typeof namespaces === 'string') namespaces = [namespaces];

    var toLoad = this.queueLoad(languages, namespaces, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length) callback(); // nothing to load and no pendings...callback now
      return; // pendings will trigger callback
    }

    // load with multi-load
    if (options.allowMultiLoading && this.backend.readMulti) {
      this.read(toLoad.toLoadLanguages, toLoad.toLoadNamespaces, 'readMulti', null, null, function (err, data) {
        if (err) _this5.logger.warn('loading namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading failed', err);
        if (!err && data) _this5.logger.log('loaded namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading', data);

        toLoad.toLoad.forEach(function (name) {
          var _name$split3 = name.split('|');

          var _name$split4 = _slicedToArray(_name$split3, 2);

          var l = _name$split4[0];
          var n = _name$split4[1];


          var bundle = utils.getPath(data, [l, n]);
          if (bundle) {
            _this5.loaded(name, err, bundle);
          } else {
            var _err = 'loading namespace ' + n + ' for language ' + l + ' via multiloading failed';
            _this5.loaded(name, _err);
            _this5.logger.error(_err);
          }
        });
      });
    }

    // load one by one
    else {
        (function () {
          var read = function read(name) {
            var _this6 = this;

            var _name$split5 = name.split('|');

            var _name$split6 = _slicedToArray(_name$split5, 2);

            var lng = _name$split6[0];
            var ns = _name$split6[1];


            this.read(lng, ns, 'read', null, null, function (err, data) {
              if (err) _this6.logger.warn('loading namespace ' + ns + ' for language ' + lng + ' failed', err);
              if (!err && data) _this6.logger.log('loaded namespace ' + ns + ' for language ' + lng, data);

              _this6.loaded(name, err, data);
            });
          };

          ;

          toLoad.toLoad.forEach(function (name) {
            read.call(_this5, name);
          });
        })();
      }
  };

  Connector.prototype.saveMissing = function saveMissing(languages, namespace, key, fallbackValue) {
    if (this.backend && this.backend.create) this.backend.create(languages, namespace, key, fallbackValue);

    // write to store to avoid resending
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  };

  return Connector;
}(_EventEmitter3.default);

exports.default = Connector;
},{"./EventEmitter":141,"./logger":151,"./utils":153}],140:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _EventEmitter2 = require('./EventEmitter');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Connector = function (_EventEmitter) {
  _inherits(Connector, _EventEmitter);

  function Connector(cache, store, services) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, Connector);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.cache = cache;
    _this.store = store;
    _this.services = services;
    _this.options = options;
    _this.logger = _logger2.default.create('cacheConnector');

    _this.cache && _this.cache.init && _this.cache.init(services, options.cache, options);
    return _this;
  }

  Connector.prototype.load = function load(languages, namespaces, callback) {
    var _this2 = this;

    if (!this.cache) return callback && callback();
    var options = _extends({}, this.cache.options, this.options.cache);

    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
    if (typeof namespaces === 'string') namespaces = [namespaces];

    if (options.enabled) {
      this.cache.load(languages, function (err, data) {
        if (err) _this2.logger.error('loading languages ' + languages.join(', ') + ' from cache failed', err);
        if (data) {
          for (var l in data) {
            for (var n in data[l]) {
              if (n === 'i18nStamp') continue;
              var bundle = data[l][n];
              if (bundle) _this2.store.addResourceBundle(l, n, bundle);
            }
          }
        }
        if (callback) callback();
      });
    } else {
      if (callback) callback();
    }
  };

  Connector.prototype.save = function save() {
    if (this.cache && this.options.cache && this.options.cache.enabled) this.cache.save(this.store.data);
  };

  return Connector;
}(_EventEmitter3.default);

exports.default = Connector;
},{"./EventEmitter":141,"./logger":151,"./utils":153}],141:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
	function EventEmitter() {
		_classCallCheck(this, EventEmitter);

		this.observers = {};
	}

	EventEmitter.prototype.on = function on(events, listener) {
		var _this = this;

		events.split(' ').forEach(function (event) {
			_this.observers[event] = _this.observers[event] || [];
			_this.observers[event].push(listener);
		});
	};

	EventEmitter.prototype.off = function off(event, listener) {
		var _this2 = this;

		if (!this.observers[event]) {
			return;
		}

		this.observers[event].forEach(function () {
			if (!listener) {
				delete _this2.observers[event];
			} else {
				var index = _this2.observers[event].indexOf(listener);
				if (index > -1) {
					_this2.observers[event].splice(index, 1);
				}
			}
		});
	};

	EventEmitter.prototype.emit = function emit(event) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		if (this.observers[event]) {
			this.observers[event].forEach(function (observer) {
				observer.apply(undefined, args);
			});
		}

		if (this.observers['*']) {
			this.observers['*'].forEach(function (observer) {
				var _ref;

				observer.apply(observer, (_ref = [event]).concat.apply(_ref, args));
			});
		}
	};

	return EventEmitter;
}();

exports.default = EventEmitter;
},{}],142:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interpolator = function () {
  function Interpolator() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Interpolator);

    this.logger = _logger2.default.create('interpolator');

    this.init(options, true);
  }

  Interpolator.prototype.init = function init() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var reset = arguments[1];

    if (reset) this.options = options;
    if (!options.interpolation) options.interpolation = { escapeValue: true };

    var iOpts = options.interpolation;

    this.escapeValue = iOpts.escapeValue;

    this.prefix = iOpts.prefix ? utils.regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
    this.suffix = iOpts.suffix ? utils.regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';

    this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
    this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';

    this.nestingPrefix = iOpts.nestingPrefix ? utils.regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || utils.regexEscape('$t(');
    this.nestingSuffix = iOpts.nestingSuffix ? utils.regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || utils.regexEscape(')');

    // the regexp
    var regexpStr = this.prefix + '(.+?)' + this.suffix;
    this.regexp = new RegExp(regexpStr, 'g');

    var regexpUnescapeStr = this.prefix + this.unescapePrefix + '(.+?)' + this.unescapeSuffix + this.suffix;
    this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');

    var nestingRegexpStr = this.nestingPrefix + '(.+?)' + this.nestingSuffix;
    this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
  };

  Interpolator.prototype.reset = function reset() {
    if (this.options) this.init(this.options);
  };

  Interpolator.prototype.interpolate = function interpolate(str, data) {
    var match = void 0,
        value = void 0;

    function regexSafe(val) {
      return val.replace(/\$/g, '$$$$');
    }

    // unescape if has unescapePrefix/Suffix
    while (match = this.regexpUnescape.exec(str)) {
      var _value = utils.getPath(data, match[1].trim());
      str = str.replace(match[0], _value);
    }

    // regular escape on demand
    while (match = this.regexp.exec(str)) {
      value = utils.getPath(data, match[1].trim());
      if (typeof value !== 'string') value = utils.makeString(value);
      if (!value) {
        this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
        value = '';
      }
      value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  };

  Interpolator.prototype.nest = function nest(str, fc) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var match = void 0,
        value = void 0;

    var clonedOptions = JSON.parse(JSON.stringify(options));
    clonedOptions.applyPostProcessor = false; // avoid post processing on nested lookup

    function regexSafe(val) {
      return val.replace(/\$/g, '$$$$');
    }

    // if value is something like "myKey": "lorem $(anotherKey, { "count": {{aValueInOptions}} })"
    function handleHasOptions(key) {
      if (key.indexOf(',') < 0) return key;

      var p = key.split(',');
      key = p.shift();
      var optionsString = p.join(',');
      optionsString = this.interpolate(optionsString, clonedOptions);

      try {
        clonedOptions = JSON.parse(optionsString);
      } catch (e) {
        this.logger.error('failed parsing options string in nesting for key ' + key, e);
      }

      return key;
    }

    // regular escape on demand
    while (match = this.nestingRegexp.exec(str)) {
      value = fc(handleHasOptions.call(this, match[1].trim()), clonedOptions);
      if (typeof value !== 'string') value = utils.makeString(value);
      if (!value) {
        this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
        value = '';
      }
      value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  };

  return Interpolator;
}();

exports.default = Interpolator;
},{"./logger":151,"./utils":153}],143:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var LanguageUtil = function () {
  function LanguageUtil(options) {
    _classCallCheck(this, LanguageUtil);

    this.options = options;

    this.whitelist = this.options.whitelist || false;
    this.logger = _logger2.default.create('languageUtils');
  }

  LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
    if (code.indexOf('-') < 0) return code;

    var specialCases = ['NB-NO', 'NN-NO', 'nb-NO', 'nn-NO', 'nb-no', 'nn-no'];
    var p = code.split('-');
    return this.formatLanguageCode(specialCases.indexOf(code) > -1 ? p[1].toLowerCase() : p[0]);
  };

  LanguageUtil.prototype.formatLanguageCode = function formatLanguageCode(code) {
    // http://www.iana.org/assignments/language-tags/language-tags.xhtml
    if (typeof code === 'string' && code.indexOf('-') > -1) {
      var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
      var p = code.split('-');

      if (this.options.lowerCaseLng) {
        p = p.map(function (part) {
          return part.toLowerCase();
        });
      } else if (p.length === 2) {
        p[0] = p[0].toLowerCase();
        p[1] = p[1].toUpperCase();

        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
      } else if (p.length === 3) {
        p[0] = p[0].toLowerCase();

        // if lenght 2 guess it's a country
        if (p[1].length === 2) p[1] = p[1].toUpperCase();
        if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();

        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
      }

      return p.join('-');
    } else {
      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
    }
  };

  LanguageUtil.prototype.isWhitelisted = function isWhitelisted(code) {
    if (this.options.load === 'languageOnly') code = this.getLanguagePartFromCode(code);
    return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1 ? true : false;
  };

  LanguageUtil.prototype.toResolveHierarchy = function toResolveHierarchy(code, fallbackCode) {
    var _this = this;

    fallbackCode = fallbackCode || this.options.fallbackLng || [];
    if (typeof fallbackCode === 'string') fallbackCode = [fallbackCode];

    var codes = [];
    var addCode = function addCode(code) {
      if (_this.isWhitelisted(code)) {
        codes.push(code);
      } else {
        _this.logger.warn('rejecting non-whitelisted language code: ' + code);
      }
    };

    if (typeof code === 'string' && code.indexOf('-') > -1) {
      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
    } else if (typeof code === 'string') {
      addCode(this.formatLanguageCode(code));
    }

    fallbackCode.forEach(function (fc) {
      if (codes.indexOf(fc) < 0) addCode(_this.formatLanguageCode(fc));
    });

    return codes;
  };

  return LanguageUtil;
}();

;

exports.default = LanguageUtil;
},{"./logger":151}],144:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// definition http://translate.sourceforge.net/wiki/l10n/pluralforms
/* eslint-disable */
var sets = [{ lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'tg', 'ti', 'tr', 'uz', 'wa'], nr: [1, 2], fc: 1 }, { lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'es_ar', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'he', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt', 'pt_br', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'], nr: [1, 2], fc: 2 }, { lngs: ['ay', 'bo', 'cgg', 'fa', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'], nr: [1], fc: 3 }, { lngs: ['be', 'bs', 'dz', 'hr', 'ru', 'sr', 'uk'], nr: [1, 2, 5], fc: 4 }, { lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5 }, { lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6 }, { lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7 }, { lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8 }, { lngs: ['fr'], nr: [1, 2], fc: 9 }, { lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10 }, { lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11 }, { lngs: ['is'], nr: [1, 2], fc: 12 }, { lngs: ['jv'], nr: [0, 1], fc: 13 }, { lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14 }, { lngs: ['lt'], nr: [1, 2, 10], fc: 15 }, { lngs: ['lv'], nr: [1, 2, 0], fc: 16 }, { lngs: ['mk'], nr: [1, 2], fc: 17 }, { lngs: ['mnk'], nr: [0, 1, 2], fc: 18 }, { lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19 }, { lngs: ['or'], nr: [2, 1], fc: 2 }, { lngs: ['ro'], nr: [1, 2, 20], fc: 20 }, { lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21 }];

var _rulesPluralsTypes = {
  1: function _(n) {
    return Number(n > 1);
  },
  2: function _(n) {
    return Number(n != 1);
  },
  3: function _(n) {
    return 0;
  },
  4: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function _(n) {
    return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function _(n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function _(n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function _(n) {
    return Number(n >= 2);
  },
  10: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function _(n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function _(n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function _(n) {
    return Number(n !== 0);
  },
  14: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function _(n) {
    return Number(n == 1 || n % 10 == 1 ? 0 : 1);
  },
  18: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function _(n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  }
};
/* eslint-enable */

function createRules() {
  var l,
      rules = {};
  sets.forEach(function (set) {
    set.lngs.forEach(function (l) {
      return rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}

var PluralResolver = function () {
  function PluralResolver(languageUtils) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, PluralResolver);

    this.languageUtils = languageUtils;
    this.options = options;

    this.logger = _logger2.default.create('pluralResolver');

    this.rules = createRules();
  }

  PluralResolver.prototype.addRule = function addRule(lng, obj) {
    this.rules[lng] = obj;
  };

  PluralResolver.prototype.getRule = function getRule(code) {
    return this.rules[this.languageUtils.getLanguagePartFromCode(code)];
  };

  PluralResolver.prototype.needsPlural = function needsPlural(code) {
    var rule = this.getRule(code);

    return rule && rule.numbers.length <= 1 ? false : true;
  };

  PluralResolver.prototype.getSuffix = function getSuffix(code, count) {
    var rule = this.getRule(code);

    if (rule) {
      if (rule.numbers.length === 1) return ''; // only singular

      var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
      var suffix = rule.numbers[idx];

      // special treatment for lngs only having singular and plural
      if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
        if (suffix === 2) {
          suffix = 'plural';
        } else if (suffix === 1) {
          suffix = '';
        }
      }

      // COMPATIBILITY JSON
      if (this.options.compatibilityJSON === 'v1') {
        if (suffix === 1) return '';
        if (typeof suffix === 'number') return '_plural_' + suffix.toString();
      }

      return this.options.prepend && suffix.toString() ? this.options.prepend + suffix.toString() : suffix.toString();
    } else {
      this.logger.warn('no plural rule found for: ' + code);
      return '';
    }
  };

  return PluralResolver;
}();

;

exports.default = PluralResolver;
},{"./logger":151}],145:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _EventEmitter2 = require('./EventEmitter');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ResourceStore = function (_EventEmitter) {
  _inherits(ResourceStore, _EventEmitter);

  function ResourceStore() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? { ns: ['translation'], defaultNS: 'translation' } : arguments[1];

    _classCallCheck(this, ResourceStore);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.data = data;
    _this.options = options;
    return _this;
  }

  ResourceStore.prototype.addNamespaces = function addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  };

  ResourceStore.prototype.removeNamespaces = function removeNamespaces(ns) {
    var index = this.options.ns.indexOf(ns);
    if (index > -1) {
      this.options.ns.splice(index, 1);
    }
  };

  ResourceStore.prototype.getResource = function getResource(lng, ns, key) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    var keySeparator = options.keySeparator || this.options.keySeparator;
    if (keySeparator === undefined) keySeparator = '.';

    var path = [lng, ns];
    if (key && typeof key !== 'string') path = path.concat(key);
    if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);

    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
    }

    return utils.getPath(this.data, path);
  };

  ResourceStore.prototype.addResource = function addResource(lng, ns, key, value) {
    var options = arguments.length <= 4 || arguments[4] === undefined ? { silent: false } : arguments[4];

    var keySeparator = this.options.keySeparator;
    if (keySeparator === undefined) keySeparator = '.';

    var path = [lng, ns];
    if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);

    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      value = ns;
      ns = path[1];
    }

    this.addNamespaces(ns);

    utils.setPath(this.data, path, value);

    if (!options.silent) this.emit('added', lng, ns, key, value);
  };

  ResourceStore.prototype.addResources = function addResources(lng, ns, resources) {
    for (var m in resources) {
      if (typeof resources[m] === 'string') this.addResource(lng, ns, m, resources[m], { silent: true });
    }
    this.emit('added', lng, ns, resources);
  };

  ResourceStore.prototype.addResourceBundle = function addResourceBundle(lng, ns, resources, deep, overwrite) {
    var path = [lng, ns];
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      deep = resources;
      resources = ns;
      ns = path[1];
    }

    this.addNamespaces(ns);

    var pack = utils.getPath(this.data, path) || {};

    if (deep) {
      utils.deepExtend(pack, resources, overwrite);
    } else {
      pack = _extends({}, pack, resources);
    }

    utils.setPath(this.data, path, pack);

    this.emit('added', lng, ns, resources);
  };

  ResourceStore.prototype.removeResourceBundle = function removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);

    this.emit('removed', lng, ns);
  };

  ResourceStore.prototype.hasResourceBundle = function hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== undefined;
  };

  ResourceStore.prototype.getResourceBundle = function getResourceBundle(lng, ns) {
    if (!ns) ns = this.options.defaultNS;

    // TODO: COMPATIBILITY remove extend in v2.1.0
    if (this.options.compatibilityAPI === 'v1') return _extends({}, this.getResource(lng, ns));

    return this.getResource(lng, ns);
  };

  ResourceStore.prototype.toJSON = function toJSON() {
    return this.data;
  };

  return ResourceStore;
}(_EventEmitter3.default);

exports.default = ResourceStore;
},{"./EventEmitter":141,"./utils":153}],146:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _EventEmitter2 = require('./EventEmitter');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _postProcessor = require('./postProcessor');

var _postProcessor2 = _interopRequireDefault(_postProcessor);

var _v = require('./compatibility/v1');

var compat = _interopRequireWildcard(_v);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Translator = function (_EventEmitter) {
  _inherits(Translator, _EventEmitter);

  function Translator(services) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Translator);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    utils.copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector'], services, _this);

    _this.options = options;
    _this.logger = _logger2.default.create('translator');
    return _this;
  }

  Translator.prototype.changeLanguage = function changeLanguage(lng) {
    if (lng) this.language = lng;
  };

  Translator.prototype.exists = function exists(key) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? { interpolation: {} } : arguments[1];

    if (this.options.compatibilityAPI === 'v1') {
      options = compat.convertTOptions(options);
    }

    return this.resolve(key, options) !== undefined;
  };

  Translator.prototype.extractFromKey = function extractFromKey(key, options) {
    var nsSeparator = options.nsSeparator || this.options.nsSeparator;
    if (nsSeparator === undefined) nsSeparator = ':';

    var namespaces = options.ns || this.options.defaultNS;
    if (nsSeparator && key.indexOf(nsSeparator) > -1) {
      var parts = key.split(nsSeparator);
      namespaces = parts[0];
      key = parts[1];
    }
    if (typeof namespaces === 'string') namespaces = [namespaces];

    return {
      key: key,
      namespaces: namespaces
    };
  };

  Translator.prototype.translate = function translate(keys) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
      options = this.options.overloadTranslationOptionHandler(arguments);
    } else if (this.options.compatibilityAPI === 'v1') {
      options = compat.convertTOptions(options);
    }

    // non valid keys handling
    if (keys === undefined || keys === null || keys === '') return '';
    if (typeof keys === 'number') keys = String(keys);
    if (typeof keys === 'string') keys = [keys];

    // return key on CIMode
    var lng = options.lng || this.language;
    if (lng && lng.toLowerCase() === 'cimode') return keys[keys.length - 1];

    // separators
    var keySeparator = options.keySeparator || this.options.keySeparator || '.';

    // get namespace(s)

    var _extractFromKey = this.extractFromKey(keys[keys.length - 1], options);

    var key = _extractFromKey.key;
    var namespaces = _extractFromKey.namespaces;

    var namespace = namespaces[namespaces.length - 1];

    // resolve from store
    var res = this.resolve(keys, options);

    var resType = Object.prototype.toString.apply(res);
    var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
    var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;

    // object
    if (res && typeof res !== 'string' && noObject.indexOf(resType) < 0 && !(joinArrays && resType === '[object Array]')) {
      if (!options.returnObjects && !this.options.returnObjects) {
        this.logger.warn('accessing an object - but returnObjects options is not enabled!');
        return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(key, res, options) : 'key \'' + key + ' (' + this.language + ')\' returned an object instead of string.';
      }

      var copy = resType === '[object Array]' ? [] : {}; // apply child translation on a copy

      for (var m in res) {
        copy[m] = this.translate('' + key + keySeparator + m, _extends({ joinArrays: false, ns: namespaces }, options));
      }
      res = copy;
    }
    // array special treatment
    else if (joinArrays && resType === '[object Array]') {
        res = res.join(joinArrays);
        if (res) res = this.extendTranslation(res, key, options);
      }
      // string, empty or null
      else {
          var usedDefault = false,
              usedKey = false;

          // fallback value
          if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
            usedDefault = true;
            res = options.defaultValue;
          }
          if (!this.isValidLookup(res)) {
            usedKey = true;
            res = key;
          }

          // save missing
          if (usedKey || usedDefault) {
            this.logger.log('missingKey', lng, namespace, key, res);

            if (this.options.saveMissing) {
              var lngs = [];
              if (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng && this.options.fallbackLng[0]) {
                for (var i = 0; i < this.options.fallbackLng.length; i++) {
                  lngs.push(this.options.fallbackLng[i]);
                }
              } else if (this.options.saveMissingTo === 'all') {
                lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
              } else {
                //(this.options.saveMissingTo === 'current' || (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng[0] === false) ) {
                lngs.push(options.lng || this.language);
              }

              if (this.options.missingKeyHandler) {
                this.options.missingKeyHandler(lngs, namespace, key, res);
              } else if (this.backendConnector && this.backendConnector.saveMissing) {
                this.backendConnector.saveMissing(lngs, namespace, key, res);
              }

              this.emit('missingKey', lngs, namespace, key, res);
            }
          }

          // extend
          res = this.extendTranslation(res, key, options);

          // append namespace if still key
          if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = namespace + ':' + key;

          // parseMissingKeyHandler
          if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
        }

    // return
    return res;
  };

  Translator.prototype.extendTranslation = function extendTranslation(res, key, options) {
    var _this2 = this;

    if (options.interpolation) this.interpolator.init(options);

    // interpolate
    var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
    if (this.options.interpolation.defaultVariables) data = _extends({}, this.options.interpolation.defaultVariables, data);
    res = this.interpolator.interpolate(res, data);

    // nesting
    res = this.interpolator.nest(res, function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _this2.translate.apply(_this2, args);
    }, options);

    if (options.interpolation) this.interpolator.reset();

    // post process
    var postProcess = options.postProcess || this.options.postProcess;
    var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

    if (res !== undefined && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
      res = _postProcessor2.default.handle(postProcessorNames, res, key, options, this);
    }

    return res;
  };

  Translator.prototype.resolve = function resolve(keys) {
    var _this3 = this;

    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var found = void 0;

    if (typeof keys === 'string') keys = [keys];

    // forEach possible key
    keys.forEach(function (k) {
      if (_this3.isValidLookup(found)) return;

      var _extractFromKey2 = _this3.extractFromKey(k, options);

      var key = _extractFromKey2.key;
      var namespaces = _extractFromKey2.namespaces;

      if (_this3.options.fallbackNS) namespaces = namespaces.concat(_this3.options.fallbackNS);

      var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
      var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';

      var codes = options.lngs ? options.lngs : _this3.languageUtils.toResolveHierarchy(options.lng || _this3.language);

      namespaces.forEach(function (ns) {
        if (_this3.isValidLookup(found)) return;

        codes.forEach(function (code) {
          if (_this3.isValidLookup(found)) return;

          var finalKey = key;
          var finalKeys = [finalKey];

          var pluralSuffix = void 0;
          if (needsPluralHandling) pluralSuffix = _this3.pluralResolver.getSuffix(code, options.count);

          // fallback for plural if context not found
          if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);

          // get key for context if needed
          if (needsContextHandling) finalKeys.push(finalKey += '' + _this3.options.contextSeparator + options.context);

          // get key for plural if needed
          if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);

          // iterate over finalKeys starting with most specific pluralkey (-> contextkey only) -> singularkey only
          var possibleKey = void 0;
          while (possibleKey = finalKeys.pop()) {
            if (_this3.isValidLookup(found)) continue;
            found = _this3.getResource(code, ns, possibleKey, options);
          }
        });
      });
    });

    return found;
  };

  Translator.prototype.isValidLookup = function isValidLookup(res) {
    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
  };

  Translator.prototype.getResource = function getResource(code, ns, key) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    return this.resourceStore.getResource(code, ns, key, options);
  };

  return Translator;
}(_EventEmitter3.default);

exports.default = Translator;
},{"./EventEmitter":141,"./compatibility/v1":147,"./logger":151,"./postProcessor":152,"./utils":153}],147:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertAPIOptions = convertAPIOptions;
exports.convertJSONOptions = convertJSONOptions;
exports.convertTOptions = convertTOptions;
exports.appendBackwardsAPI = appendBackwardsAPI;

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertInterpolation(options) {

  options.interpolation = {
    unescapeSuffix: 'HTML'
  };

  options.interpolation.prefix = options.interpolationPrefix || '__';
  options.interpolation.suffix = options.interpolationSuffix || '__';
  options.interpolation.escapeValue = options.escapeInterpolation || false;

  options.interpolation.nestingPrefix = options.reusePrefix || '$t(';
  options.interpolation.nestingSuffix = options.reuseSuffix || ')';

  return options;
}

function convertAPIOptions(options) {
  if (options.resStore) options.resources = options.resStore;

  if (options.ns && options.ns.defaultNs) {
    options.defaultNS = options.ns.defaultNs;
    options.ns = options.ns.namespaces;
  } else {
    options.defaultNS = options.ns || 'translation';
  }

  if (options.fallbackToDefaultNS && options.defaultNS) options.fallbackNS = options.defaultNS;

  options.saveMissing = options.sendMissing;
  options.saveMissingTo = options.sendMissingTo || 'current';
  options.returnNull = options.fallbackOnNull ? false : true;
  options.returnEmptyString = options.fallbackOnEmpty ? false : true;
  options.returnObjects = options.returnObjectTrees;
  options.joinArrays = '\n';

  options.returnedObjectHandler = options.objectTreeKeyHandler;
  options.parseMissingKeyHandler = options.parseMissingKey;
  options.appendNamespaceToMissingKey = true;

  options.nsSeparator = options.nsseparator;
  options.keySeparator = options.keyseparator;

  if (options.shortcutFunction === 'sprintf') {
    options.overloadTranslationOptionHandler = function (args) {
      var values = [];

      for (var i = 1; i < args.length; i++) {
        values.push(args[i]);
      }

      return {
        postProcess: 'sprintf',
        sprintf: values
      };
    };
  }

  options.whitelist = options.lngWhitelist;
  options.preload = options.preload;
  if (options.load === 'current') options.load = 'currentOnly';
  if (options.load === 'unspecific') options.load = 'languageOnly';

  // backend
  options.backend = options.backend || {};
  options.backend.loadPath = options.resGetPath || 'locales/__lng__/__ns__.json';
  options.backend.addPath = options.resPostPath || 'locales/add/__lng__/__ns__';
  options.backend.allowMultiLoading = options.dynamicLoad;

  // cache
  options.cache = options.cache || {};
  options.cache.prefix = 'res_';
  options.cache.expirationTime = 7 * 24 * 60 * 60 * 1000;
  options.cache.enabled = options.useLocalStorage ? true : false;

  options = convertInterpolation(options);
  if (options.defaultVariables) options.interpolation.defaultVariables = options.defaultVariables;

  // TODO: deprecation
  // if (options.getAsync === false) throw deprecation error

  return options;
}

function convertJSONOptions(options) {
  options = convertInterpolation(options);
  options.joinArrays = '\n';

  return options;
}

function convertTOptions(options) {
  if (options.interpolationPrefix || options.interpolationSuffix || options.escapeInterpolation) {
    options = convertInterpolation(options);
  }

  options.nsSeparator = options.nsseparator;
  options.keySeparator = options.keyseparator;

  options.returnObjects = options.returnObjectTrees;

  return options;
}

function appendBackwardsAPI(i18n) {
  i18n.lng = function () {
    _logger2.default.deprecate('i18next.lng() can be replaced by i18next.language for detected language or i18next.languages for languages ordered by translation lookup.');
    return i18n.services.languageUtils.toResolveHierarchy(i18n.language)[0];
  };

  i18n.preload = function (lngs, cb) {
    _logger2.default.deprecate('i18next.preload() can be replaced with i18next.loadLanguages()');
    i18n.loadLanguages(lngs, cb);
  };

  i18n.setLng = function (lng, options, callback) {
    _logger2.default.deprecate('i18next.setLng() can be replaced with i18next.changeLanguage() or i18next.getFixedT() to get a translation function with fixed language or namespace.');
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!options) options = {};

    if (options.fixLng === true) {
      if (callback) return callback(null, i18n.getFixedT(lng));
    }

    i18n.changeLanguage(lng, callback);
  };

  i18n.addPostProcessor = function (name, fc) {
    _logger2.default.deprecate('i18next.addPostProcessor() can be replaced by i18next.use({ type: \'postProcessor\', name: \'name\', process: fc })');
    i18n.use({
      type: 'postProcessor',
      name: name,
      process: fc
    });
  };
}
},{"../logger":151}],148:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.transformOptions = transformOptions;
function get() {
  return {
    debug: false,
    initImmediate: true,

    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false, // string or array of namespaces

    whitelist: false, // array with whitelisted languages
    load: 'all', // | currentOnly | languageOnly
    preload: false, // array with preload languages

    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',

    saveMissing: false, // enable to send missing values
    saveMissingTo: 'fallback', // 'current' || 'all'
    missingKeyHandler: false, // function(lng, ns, key, fallbackValue) -> override if prefer on handling

    postProcess: false, // string or array of postProcessor names
    returnNull: true, // allows null value as valid translation
    returnEmptyString: true, // allows empty string value as valid translation
    returnObjects: false,
    joinArrays: false, // or string to join array
    returnedObjectHandler: function returnedObjectHandler() {}, // function(key, value, options) triggered if key returns object but returnObjects is set to false
    parseMissingKeyHandler: false, // function(key) parsed a key that was not found in t() before returning
    appendNamespaceToMissingKey: false,
    overloadTranslationOptionHandler: function overloadTranslationOptionHandler(args) {
      return { defaultValue: args[1] };
    },

    interpolation: {
      escapeValue: true,
      prefix: '{{',
      suffix: '}}',
      // prefixEscaped: '{{',
      // suffixEscaped: '}}',
      // unescapeSuffix: '',
      unescapePrefix: '-',

      nestingPrefix: '$t(',
      nestingSuffix: ')',
      // nestingPrefixEscaped: '$t(',
      // nestingSuffixEscaped: ')',
      defaultVariables: undefined // object that can have values to interpolate on - extends passed in interpolation data
    }
  };
}

function transformOptions(options) {
  // create namespace object if namespace is passed in as string
  if (typeof options.ns === 'string') options.ns = [options.ns];
  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];

  // extend whitelist with cimode
  if (options.whitelist && options.whitelist.indexOf('cimode') < 0) options.whitelist.push('cimode');

  return options;
}
},{}],149:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _EventEmitter2 = require('./EventEmitter');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _ResourceStore = require('./ResourceStore');

var _ResourceStore2 = _interopRequireDefault(_ResourceStore);

var _Translator = require('./Translator');

var _Translator2 = _interopRequireDefault(_Translator);

var _LanguageUtils = require('./LanguageUtils');

var _LanguageUtils2 = _interopRequireDefault(_LanguageUtils);

var _PluralResolver = require('./PluralResolver');

var _PluralResolver2 = _interopRequireDefault(_PluralResolver);

var _Interpolator = require('./Interpolator');

var _Interpolator2 = _interopRequireDefault(_Interpolator);

var _BackendConnector = require('./BackendConnector');

var _BackendConnector2 = _interopRequireDefault(_BackendConnector);

var _CacheConnector = require('./CacheConnector');

var _CacheConnector2 = _interopRequireDefault(_CacheConnector);

var _defaults2 = require('./defaults');

var _postProcessor = require('./postProcessor');

var _postProcessor2 = _interopRequireDefault(_postProcessor);

var _v = require('./compatibility/v1');

var compat = _interopRequireWildcard(_v);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var I18n = function (_EventEmitter) {
  _inherits(I18n, _EventEmitter);

  function I18n() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var callback = arguments[1];

    _classCallCheck(this, I18n);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.options = (0, _defaults2.transformOptions)(options);
    _this.services = {};
    _this.logger = _logger2.default;
    _this.modules = {};

    if (callback && !_this.isInitialized) _this.init(options, callback);
    return _this;
  }

  I18n.prototype.init = function init(options, callback) {
    var _this2 = this;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!options) options = {};

    if (options.compatibilityAPI === 'v1') {
      this.options = _extends({}, (0, _defaults2.get)(), (0, _defaults2.transformOptions)(compat.convertAPIOptions(options)), {});
    } else if (options.compatibilityJSON === 'v1') {
      this.options = _extends({}, (0, _defaults2.get)(), (0, _defaults2.transformOptions)(compat.convertJSONOptions(options)), {});
    } else {
      this.options = _extends({}, (0, _defaults2.get)(), this.options, (0, _defaults2.transformOptions)(options));
    }
    if (!callback) callback = function callback() {};

    function createClassOnDemand(ClassOrObject) {
      if (!ClassOrObject) return;
      if (typeof ClassOrObject === 'function') return new ClassOrObject();
      return ClassOrObject;
    }

    // init services
    if (!this.options.isClone) {
      if (this.modules.logger) {
        _logger2.default.init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        _logger2.default.init(null, this.options);
      }

      var lu = new _LanguageUtils2.default(this.options);
      this.store = new _ResourceStore2.default(this.options.resources, this.options);

      var s = this.services;
      s.logger = _logger2.default;
      s.resourceStore = this.store;
      s.resourceStore.on('added removed', function (lng, ns) {
        s.cacheConnector.save();
      });
      s.languageUtils = lu;
      s.pluralResolver = new _PluralResolver2.default(lu, { prepend: this.options.pluralSeparator, compatibilityJSON: this.options.compatibilityJSON });
      s.interpolator = new _Interpolator2.default(this.options);

      s.backendConnector = new _BackendConnector2.default(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      // pipe events from backendConnector
      s.backendConnector.on('*', function (event) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      s.backendConnector.on('loaded', function (loaded) {
        s.cacheConnector.save();
      });

      s.cacheConnector = new _CacheConnector2.default(createClassOnDemand(this.modules.cache), s.resourceStore, s, this.options);
      // pipe events from backendConnector
      s.cacheConnector.on('*', function (event) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        s.languageDetector.init(s, this.options.detection, this.options);
      }

      this.translator = new _Translator2.default(this.services, this.options);
      // pipe events from translator
      this.translator.on('*', function (event) {
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });
    }

    // append api
    var storeApi = ['getResource', 'addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle', 'hasResourceBundle', 'getResourceBundle'];
    storeApi.forEach(function (fcName) {
      _this2[fcName] = function () {
        return this.store[fcName].apply(this.store, arguments);
      };
    });

    // TODO: COMPATIBILITY remove this
    if (this.options.compatibilityAPI === 'v1') compat.appendBackwardsAPI(this);

    var load = function load() {
      _this2.changeLanguage(_this2.options.lng, function (err, t) {
        _this2.emit('initialized', _this2.options);
        _this2.logger.log('initialized', _this2.options);

        callback(err, t);
      });
    };

    if (this.options.resources || !this.options.initImmediate) {
      load();
    } else {
      setTimeout(load, 0);
    }

    return this;
  };

  I18n.prototype.loadResources = function loadResources(callback) {
    var _this3 = this;

    if (!callback) callback = function callback() {};

    if (!this.options.resources) {
      var _ret = function () {
        if (_this3.language && _this3.language.toLowerCase() === 'cimode') return {
            v: callback()
          }; // avoid loading resources for cimode

        var toLoad = [];

        var append = function append(lng) {
          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
          lngs.forEach(function (l) {
            if (toLoad.indexOf(l) < 0) toLoad.push(l);
          });
        };

        append(_this3.language);

        if (_this3.options.preload) {
          _this3.options.preload.forEach(function (l) {
            append(l);
          });
        }

        _this3.services.cacheConnector.load(toLoad, _this3.options.ns, function () {
          _this3.services.backendConnector.load(toLoad, _this3.options.ns, callback);
        });
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      callback(null);
    }
  };

  I18n.prototype.use = function use(module) {
    if (module.type === 'backend') {
      this.modules.backend = module;
    }

    if (module.type === 'cache') {
      this.modules.cache = module;
    }

    if (module.type === 'logger' || module.log && module.warn && module.warn) {
      this.modules.logger = module;
    }

    if (module.type === 'languageDetector') {
      this.modules.languageDetector = module;
    }

    if (module.type === 'postProcessor') {
      _postProcessor2.default.addPostProcessor(module);
    }

    return this;
  };

  I18n.prototype.changeLanguage = function changeLanguage(lng, callback) {
    var _this4 = this;

    var done = function done(err) {
      if (lng) {
        _this4.emit('languageChanged', lng);
        _this4.logger.log('languageChanged', lng);
      }

      if (callback) callback(err, function () {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return _this4.t.apply(_this4, args);
      });
    };

    if (!lng && this.services.languageDetector) lng = this.services.languageDetector.detect();

    if (lng) {
      this.language = lng;
      this.languages = this.services.languageUtils.toResolveHierarchy(lng);

      this.translator.changeLanguage(lng);

      if (this.services.languageDetector) this.services.languageDetector.cacheUserLanguage(lng);
    }

    this.loadResources(function (err) {
      done(err);
    });
  };

  I18n.prototype.getFixedT = function getFixedT(lng, ns) {
    var _this5 = this;

    var fixedT = function fixedT(key, options) {
      options = options || {};
      options.lng = options.lng || fixedT.lng;
      options.ns = options.ns || fixedT.ns;
      return _this5.t(key, options);
    };
    fixedT.lng = lng;
    fixedT.ns = ns;
    return fixedT;
  };

  I18n.prototype.t = function t() {
    return this.translator && this.translator.translate.apply(this.translator, arguments);
  };

  I18n.prototype.exists = function exists() {
    return this.translator && this.translator.exists.apply(this.translator, arguments);
  };

  I18n.prototype.setDefaultNamespace = function setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  };

  I18n.prototype.loadNamespaces = function loadNamespaces(ns, callback) {
    var _this6 = this;

    if (!this.options.ns) return callback && callback();
    if (typeof ns === 'string') ns = [ns];

    ns.forEach(function (n) {
      if (_this6.options.ns.indexOf(n) < 0) _this6.options.ns.push(n);
    });

    this.loadResources(callback);
  };

  I18n.prototype.loadLanguages = function loadLanguages(lngs, callback) {
    if (typeof lngs === 'string') lngs = [lngs];
    var preloaded = this.options.preload || [];

    var newLngs = lngs.filter(function (lng) {
      return preloaded.indexOf(lng) < 0;
    });
    // Exit early if all given languages are already preloaded
    if (!newLngs.length) return callback();

    this.options.preload = preloaded.concat(newLngs);
    this.loadResources(callback);
  };

  I18n.prototype.dir = function dir(lng) {
    if (!lng) lng = this.language;

    var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];

    return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
  };

  I18n.prototype.createInstance = function createInstance() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var callback = arguments[1];

    return new I18n(options, callback);
  };

  I18n.prototype.cloneInstance = function cloneInstance() {
    var _this7 = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var callback = arguments[1];

    var clone = new I18n(_extends({}, options, this.options, { isClone: true }), callback);
    var membersToCopy = ['store', 'translator', 'services', 'language'];
    membersToCopy.forEach(function (m) {
      clone[m] = _this7[m];
    });

    return clone;
  };

  return I18n;
}(_EventEmitter3.default);

exports.default = new I18n();
},{"./BackendConnector":139,"./CacheConnector":140,"./EventEmitter":141,"./Interpolator":142,"./LanguageUtils":143,"./PluralResolver":144,"./ResourceStore":145,"./Translator":146,"./compatibility/v1":147,"./defaults":148,"./logger":151,"./postProcessor":152}],150:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _i18next = require('./i18next');

var _i18next2 = _interopRequireDefault(_i18next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _i18next2.default;
},{"./i18next":149}],151:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var consoleLogger = {
  type: 'logger',

  log: function log(args) {
    this._output('log', args);
  },
  warn: function warn(args) {
    this._output('warn', args);
  },
  error: function error(args) {
    this._output('error', args);
  },
  _output: function _output(type, args) {
    if (console && console[type]) console[type].apply(console, Array.prototype.slice.call(args));
  }
};

var Logger = function () {
  function Logger(concreteLogger) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Logger);

    this.subs = [];
    this.init(concreteLogger, options);
  }

  Logger.prototype.init = function init(concreteLogger) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    this.prefix = options.prefix || 'i18next:';
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = options.debug === false ? false : true;
  };

  Logger.prototype.setDebug = function setDebug(bool) {
    this.debug = bool;
    this.subs.forEach(function (sub) {
      sub.setDebug(bool);
    });
  };

  Logger.prototype.log = function log() {
    this.forward(arguments, 'log', '', true);
  };

  Logger.prototype.warn = function warn() {
    this.forward(arguments, 'warn', '', true);
  };

  Logger.prototype.error = function error() {
    this.forward(arguments, 'error', '');
  };

  Logger.prototype.deprecate = function deprecate() {
    this.forward(arguments, 'warn', 'WARNING DEPRECATED: ', true);
  };

  Logger.prototype.forward = function forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug) return;
    if (typeof args[0] === 'string') args[0] = prefix + this.prefix + ' ' + args[0];
    this.logger[lvl](args);
  };

  Logger.prototype.create = function create(moduleName) {
    var sub = new Logger(this.logger, _extends({ prefix: this.prefix + ':' + moduleName + ':' }, this.options));
    this.subs.push(sub);

    return sub;
  };

  // createInstance(options = {}) {
  //   return new Logger(options, callback);
  // }

  return Logger;
}();

;

exports.default = new Logger();
},{}],152:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  processors: {},

  addPostProcessor: function addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle: function handle(processors, value, key, options, translator) {
    var _this = this;

    processors.forEach(function (processor) {
      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
    });

    return value;
  }
};
},{}],153:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeString = makeString;
exports.copy = copy;
exports.setPath = setPath;
exports.pushPath = pushPath;
exports.getPath = getPath;
exports.deepExtend = deepExtend;
exports.regexEscape = regexEscape;
exports.escape = escape;
function makeString(object) {
  if (object == null) return '';
  return '' + object;
}

function copy(a, s, t) {
  a.forEach(function (m) {
    if (s[m]) t[m] = s[m];
  });
}

function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
  }

  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
  while (stack.length > 1) {
    if (!object) return {};

    var key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();
    object = object[key];
  }

  if (!object) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}

function setPath(object, path, newValue) {
  var _getLastOfPath = getLastOfPath(object, path, Object);

  var obj = _getLastOfPath.obj;
  var k = _getLastOfPath.k;


  obj[k] = newValue;
}

function pushPath(object, path, newValue, concat) {
  var _getLastOfPath2 = getLastOfPath(object, path, Object);

  var obj = _getLastOfPath2.obj;
  var k = _getLastOfPath2.k;


  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}

function getPath(object, path) {
  var _getLastOfPath3 = getLastOfPath(object, path);

  var obj = _getLastOfPath3.obj;
  var k = _getLastOfPath3.k;


  if (!obj) return undefined;
  return obj[k];
}

function deepExtend(target, source, overwrite) {
  for (var prop in source) {
    if (prop in target) {
      // If we reached a leaf string in target or source then replace with source or skip depending on the 'overwrite' switch
      if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
        if (overwrite) target[prop] = source[prop];
      } else {
        deepExtend(target[prop], source[prop], overwrite);
      }
    } else {
      target[prop] = source[prop];
    }
  }return target;
}

function regexEscape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/* eslint-disable */
var _entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};
/* eslint-enable */

function escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, function (s) {
      return _entityMap[s];
    });
  } else {
    return data;
  }
}
},{}],154:[function(require,module,exports){
module.exports = require('./dist/commonjs/index.js').default;

},{"./dist/commonjs/index.js":150}],155:[function(require,module,exports){
/* $lab:coverage:off$ */
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991
/* $lab:coverage:on$ */

module.exports = isPositiveInteger
module.exports.isSafePositiveInteger = isSafePositiveInteger

function isPositiveInteger (x) {
  // Is it a number?
  return Object.prototype.toString.call(x) === '[object Number]' &&
    // Is it an integer?
    x % 1 === 0 &&
    // Is it positive?
    x > 0
}

// strict positive integer check:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
function isSafePositiveInteger (x) {
  return isPositiveInteger(x) &&
    x <= MAX_SAFE_INTEGER
}

},{}],156:[function(require,module,exports){
//! moment.js
//! version : 2.13.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (utils_hooks__hooks.deprecationHandler != null) {
                utils_hooks__hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (utils_hooks__hooks.deprecationHandler != null) {
            utils_hooks__hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;
    utils_hooks__hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function isObject(input) {
        return Object.prototype.toString.call(input) === '[object Object]';
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    // internal storage for locale config files
    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale');
                config = mergeConfigs(locales[name]._config, config);
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    config = mergeConfigs(locales[config.parentLocale]._config, config);
                } else {
                    // treat as if there is no base config
                    deprecateSimple('parentLocaleUndefined',
                            'specified parentLocale is not defined yet');
                }
            }
            locales[name] = new Locale(config);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale;
            if (locales[name] != null) {
                config = mergeConfigs(locales[name]._config, config);
            }
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function locale_locales__listLocales() {
        return keys(locales);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function get_set__set (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        return isArray(this._months) ? this._months[m.month()] :
            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function units_month__handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = create_utc__createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return units_month__handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (typeof value !== 'number') {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(utils_hooks__hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        if (!valid__isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             if (this.isValid() && other.isValid()) {
                 return other < this ? this : other;
             } else {
                 return valid__createInvalid();
             }
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = ((string || '').match(matcher) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(matchOffset, this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return this._offset ? new Date(this.valueOf()) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function day_of_week__handleStrictParse(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = create_utc__createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = create_utc__createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add               = add_subtract__add;
    momentPrototype__proto.calendar          = moment_calendar__calendar;
    momentPrototype__proto.clone             = clone;
    momentPrototype__proto.diff              = diff;
    momentPrototype__proto.endOf             = endOf;
    momentPrototype__proto.format            = format;
    momentPrototype__proto.from              = from;
    momentPrototype__proto.fromNow           = fromNow;
    momentPrototype__proto.to                = to;
    momentPrototype__proto.toNow             = toNow;
    momentPrototype__proto.get               = getSet;
    momentPrototype__proto.invalidAt         = invalidAt;
    momentPrototype__proto.isAfter           = isAfter;
    momentPrototype__proto.isBefore          = isBefore;
    momentPrototype__proto.isBetween         = isBetween;
    momentPrototype__proto.isSame            = isSame;
    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
    momentPrototype__proto.isValid           = moment_valid__isValid;
    momentPrototype__proto.lang              = lang;
    momentPrototype__proto.locale            = locale;
    momentPrototype__proto.localeData        = localeData;
    momentPrototype__proto.max               = prototypeMax;
    momentPrototype__proto.min               = prototypeMin;
    momentPrototype__proto.parsingFlags      = parsingFlags;
    momentPrototype__proto.set               = getSet;
    momentPrototype__proto.startOf           = startOf;
    momentPrototype__proto.subtract          = add_subtract__subtract;
    momentPrototype__proto.toArray           = toArray;
    momentPrototype__proto.toObject          = toObject;
    momentPrototype__proto.toDate            = toDate;
    momentPrototype__proto.toISOString       = moment_format__toISOString;
    momentPrototype__proto.toJSON            = toJSON;
    momentPrototype__proto.toString          = toString;
    momentPrototype__proto.unix              = unix;
    momentPrototype__proto.valueOf           = to_type__valueOf;
    momentPrototype__proto.creationData      = creationData;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months            =        localeMonths;
    prototype__proto._months           = defaultLocaleMonths;
    prototype__proto.monthsShort       =        localeMonthsShort;
    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
    prototype__proto.monthsParse       =        localeMonthsParse;
    prototype__proto._monthsRegex      = defaultMonthsRegex;
    prototype__proto.monthsRegex       = monthsRegex;
    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
    prototype__proto.monthsShortRegex  = monthsShortRegex;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    prototype__proto._weekdaysRegex      = defaultWeekdaysRegex;
    prototype__proto.weekdaysRegex       =        weekdaysRegex;
    prototype__proto._weekdaysShortRegex = defaultWeekdaysShortRegex;
    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
    prototype__proto._weekdaysMinRegex   = defaultWeekdaysMinRegex;
    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = lists__get(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = locale_locales__getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return lists__get(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function lists__listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function lists__listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function lists__listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function lists__listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes <= 1           && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   <= 1           && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    <= 1           && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  <= 1           && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.13.0';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.now                   = now;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.updateLocale          = updateLocale;
    utils_hooks__hooks.locales               = locale_locales__listLocales;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.prototype             = momentPrototype;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
},{}],157:[function(require,module,exports){
/*!
 * numeral.js
 * version : 1.5.3
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

(function () {

    /************************************
        Constants
    ************************************/

    var numeral,
        VERSION = '1.5.3',
        // internal storage for language config files
        languages = {},
        currentLanguage = 'en',
        zeroFormat = null,
        defaultFormat = '0,0',
        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports);


    /************************************
        Constructors
    ************************************/


    // Numeral prototype object
    function Numeral (number) {
        this._value = number;
    }

    /**
     * Implementation of toFixed() that treats floats more like decimals
     *
     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
     * problems for accounting- and finance-related software.
     */
    function toFixed (value, precision, roundingFunction, optionals) {
        var power = Math.pow(10, precision),
            optionalsRegExp,
            output;
            
        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
        // Multiply up by precision, round accurately, then divide and use native toFixed():
        output = (roundingFunction(value * power) / power).toFixed(precision);

        if (optionals) {
            optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
            output = output.replace(optionalsRegExp, '');
        }

        return output;
    }

    /************************************
        Formatting
    ************************************/

    // determine what type of formatting we need to do
    function formatNumeral (n, format, roundingFunction) {
        var output;

        // figure out what kind of format we are dealing with
        if (format.indexOf('$') > -1) { // currency!!!!!
            output = formatCurrency(n, format, roundingFunction);
        } else if (format.indexOf('%') > -1) { // percentage
            output = formatPercentage(n, format, roundingFunction);
        } else if (format.indexOf(':') > -1) { // time
            output = formatTime(n, format);
        } else { // plain ol' numbers or bytes
            output = formatNumber(n._value, format, roundingFunction);
        }

        // return string
        return output;
    }

    // revert to number
    function unformatNumeral (n, string) {
        var stringOriginal = string,
            thousandRegExp,
            millionRegExp,
            billionRegExp,
            trillionRegExp,
            suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            bytesMultiplier = false,
            power;

        if (string.indexOf(':') > -1) {
            n._value = unformatTime(string);
        } else {
            if (string === zeroFormat) {
                n._value = 0;
            } else {
                if (languages[currentLanguage].delimiters.decimal !== '.') {
                    string = string.replace(/\./g,'').replace(languages[currentLanguage].delimiters.decimal, '.');
                }

                // see if abbreviations are there so that we can multiply to the correct number
                thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');

                // see if bytes are there so that we can multiply to the correct number
                for (power = 0; power <= suffixes.length; power++) {
                    bytesMultiplier = (string.indexOf(suffixes[power]) > -1) ? Math.pow(1024, power + 1) : false;

                    if (bytesMultiplier) {
                        break;
                    }
                }

                // do some math to create our number
                n._value = ((bytesMultiplier) ? bytesMultiplier : 1) * ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) * ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) * ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) * ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * (((string.split('-').length + Math.min(string.split('(').length-1, string.split(')').length-1)) % 2)? 1: -1) * Number(string.replace(/[^0-9\.]+/g, ''));

                // round if we are talking about bytes
                n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
            }
        }
        return n._value;
    }

    function formatCurrency (n, format, roundingFunction) {
        var symbolIndex = format.indexOf('$'),
            openParenIndex = format.indexOf('('),
            minusSignIndex = format.indexOf('-'),
            space = '',
            spliceIndex,
            output;

        // check for space before or after currency
        if (format.indexOf(' $') > -1) {
            space = ' ';
            format = format.replace(' $', '');
        } else if (format.indexOf('$ ') > -1) {
            space = ' ';
            format = format.replace('$ ', '');
        } else {
            format = format.replace('$', '');
        }

        // format the number
        output = formatNumber(n._value, format, roundingFunction);

        // position the symbol
        if (symbolIndex <= 1) {
            if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
                output = output.split('');
                spliceIndex = 1;
                if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex){
                    // the symbol appears before the "(" or "-"
                    spliceIndex = 0;
                }
                output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
                output = output.join('');
            } else {
                output = languages[currentLanguage].currency.symbol + space + output;
            }
        } else {
            if (output.indexOf(')') > -1) {
                output = output.split('');
                output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
                output = output.join('');
            } else {
                output = output + space + languages[currentLanguage].currency.symbol;
            }
        }

        return output;
    }

    function formatPercentage (n, format, roundingFunction) {
        var space = '',
            output,
            value = n._value * 100;

        // check for space before %
        if (format.indexOf(' %') > -1) {
            space = ' ';
            format = format.replace(' %', '');
        } else {
            format = format.replace('%', '');
        }

        output = formatNumber(value, format, roundingFunction);
        
        if (output.indexOf(')') > -1 ) {
            output = output.split('');
            output.splice(-1, 0, space + '%');
            output = output.join('');
        } else {
            output = output + space + '%';
        }

        return output;
    }

    function formatTime (n) {
        var hours = Math.floor(n._value/60/60),
            minutes = Math.floor((n._value - (hours * 60 * 60))/60),
            seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
        return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
    }

    function unformatTime (string) {
        var timeArray = string.split(':'),
            seconds = 0;
        // turn hours and minutes into seconds and add them all up
        if (timeArray.length === 3) {
            // hours
            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
            // minutes
            seconds = seconds + (Number(timeArray[1]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[2]);
        } else if (timeArray.length === 2) {
            // minutes
            seconds = seconds + (Number(timeArray[0]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[1]);
        }
        return Number(seconds);
    }

    function formatNumber (value, format, roundingFunction) {
        var negP = false,
            signed = false,
            optDec = false,
            abbr = '',
            abbrK = false, // force abbreviation to thousands
            abbrM = false, // force abbreviation to millions
            abbrB = false, // force abbreviation to billions
            abbrT = false, // force abbreviation to trillions
            abbrForce = false, // force abbreviation
            bytes = '',
            ord = '',
            abs = Math.abs(value),
            suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            min,
            max,
            power,
            w,
            precision,
            thousands,
            d = '',
            neg = false;

        // check if number is zero and a custom zero format has been set
        if (value === 0 && zeroFormat !== null) {
            return zeroFormat;
        } else {
            // see if we should use parentheses for negative number or if we should prefix with a sign
            // if both are present we default to parentheses
            if (format.indexOf('(') > -1) {
                negP = true;
                format = format.slice(1, -1);
            } else if (format.indexOf('+') > -1) {
                signed = true;
                format = format.replace(/\+/g, '');
            }

            // see if abbreviation is wanted
            if (format.indexOf('a') > -1) {
                // check if abbreviation is specified
                abbrK = format.indexOf('aK') >= 0;
                abbrM = format.indexOf('aM') >= 0;
                abbrB = format.indexOf('aB') >= 0;
                abbrT = format.indexOf('aT') >= 0;
                abbrForce = abbrK || abbrM || abbrB || abbrT;

                // check for space before abbreviation
                if (format.indexOf(' a') > -1) {
                    abbr = ' ';
                    format = format.replace(' a', '');
                } else {
                    format = format.replace('a', '');
                }

                if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
                    // trillion
                    abbr = abbr + languages[currentLanguage].abbreviations.trillion;
                    value = value / Math.pow(10, 12);
                } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
                    // billion
                    abbr = abbr + languages[currentLanguage].abbreviations.billion;
                    value = value / Math.pow(10, 9);
                } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
                    // million
                    abbr = abbr + languages[currentLanguage].abbreviations.million;
                    value = value / Math.pow(10, 6);
                } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
                    // thousand
                    abbr = abbr + languages[currentLanguage].abbreviations.thousand;
                    value = value / Math.pow(10, 3);
                }
            }

            // see if we are formatting bytes
            if (format.indexOf('b') > -1) {
                // check for space before
                if (format.indexOf(' b') > -1) {
                    bytes = ' ';
                    format = format.replace(' b', '');
                } else {
                    format = format.replace('b', '');
                }

                for (power = 0; power <= suffixes.length; power++) {
                    min = Math.pow(1024, power);
                    max = Math.pow(1024, power+1);

                    if (value >= min && value < max) {
                        bytes = bytes + suffixes[power];
                        if (min > 0) {
                            value = value / min;
                        }
                        break;
                    }
                }
            }

            // see if ordinal is wanted
            if (format.indexOf('o') > -1) {
                // check for space before
                if (format.indexOf(' o') > -1) {
                    ord = ' ';
                    format = format.replace(' o', '');
                } else {
                    format = format.replace('o', '');
                }

                ord = ord + languages[currentLanguage].ordinal(value);
            }

            if (format.indexOf('[.]') > -1) {
                optDec = true;
                format = format.replace('[.]', '.');
            }

            w = value.toString().split('.')[0];
            precision = format.split('.')[1];
            thousands = format.indexOf(',');

            if (precision) {
                if (precision.indexOf('[') > -1) {
                    precision = precision.replace(']', '');
                    precision = precision.split('[');
                    d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
                } else {
                    d = toFixed(value, precision.length, roundingFunction);
                }

                w = d.split('.')[0];

                if (d.split('.')[1].length) {
                    d = languages[currentLanguage].delimiters.decimal + d.split('.')[1];
                } else {
                    d = '';
                }

                if (optDec && Number(d.slice(1)) === 0) {
                    d = '';
                }
            } else {
                w = toFixed(value, null, roundingFunction);
            }

            // format number
            if (w.indexOf('-') > -1) {
                w = w.slice(1);
                neg = true;
            }

            if (thousands > -1) {
                w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
            }

            if (format.indexOf('.') === 0) {
                w = '';
            }

            return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((bytes) ? bytes : '') + ((negP && neg) ? ')' : '');
        }
    }

    /************************************
        Top Level Functions
    ************************************/

    numeral = function (input) {
        if (numeral.isNumeral(input)) {
            input = input.value();
        } else if (input === 0 || typeof input === 'undefined') {
            input = 0;
        } else if (!Number(input)) {
            input = numeral.fn.unformat(input);
        }

        return new Numeral(Number(input));
    };

    // version number
    numeral.version = VERSION;

    // compare numeral object
    numeral.isNumeral = function (obj) {
        return obj instanceof Numeral;
    };

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    numeral.language = function (key, values) {
        if (!key) {
            return currentLanguage;
        }

        if (key && !values) {
            if(!languages[key]) {
                throw new Error('Unknown language : ' + key);
            }
            currentLanguage = key;
        }

        if (values || !languages[key]) {
            loadLanguage(key, values);
        }

        return numeral;
    };
    
    // This function provides access to the loaded language data.  If
    // no arguments are passed in, it will simply return the current
    // global language object.
    numeral.languageData = function (key) {
        if (!key) {
            return languages[currentLanguage];
        }
        
        if (!languages[key]) {
            throw new Error('Unknown language : ' + key);
        }
        
        return languages[key];
    };

    numeral.language('en', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '$'
        }
    });

    numeral.zeroFormat = function (format) {
        zeroFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.defaultFormat = function (format) {
        defaultFormat = typeof(format) === 'string' ? format : '0.0';
    };

    /************************************
        Helpers
    ************************************/

    function loadLanguage(key, values) {
        languages[key] = values;
    }

    /************************************
        Floating-point helpers
    ************************************/

    // The floating-point helper functions and implementation
    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/

    /**
     * Array.prototype.reduce for browsers that don't support it
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility
     */
    if ('function' !== typeof Array.prototype.reduce) {
        Array.prototype.reduce = function (callback, opt_initialValue) {
            'use strict';
            
            if (null === this || 'undefined' === typeof this) {
                // At the moment all modern browsers, that support strict mode, have
                // native implementation of Array.prototype.reduce. For instance, IE8
                // does not support strict mode, so this check is actually useless.
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }
            
            if ('function' !== typeof callback) {
                throw new TypeError(callback + ' is not a function');
            }

            var index,
                value,
                length = this.length >>> 0,
                isValueSet = false;

            if (1 < arguments.length) {
                value = opt_initialValue;
                isValueSet = true;
            }

            for (index = 0; length > index; ++index) {
                if (this.hasOwnProperty(index)) {
                    if (isValueSet) {
                        value = callback(value, this[index], index, this);
                    } else {
                        value = this[index];
                        isValueSet = true;
                    }
                }
            }

            if (!isValueSet) {
                throw new TypeError('Reduce of empty array with no initial value');
            }

            return value;
        };
    }

    
    /**
     * Computes the multiplier necessary to make x >= 1,
     * effectively eliminating miscalculations caused by
     * finite precision.
     */
    function multiplier(x) {
        var parts = x.toString().split('.');
        if (parts.length < 2) {
            return 1;
        }
        return Math.pow(10, parts[1].length);
    }

    /**
     * Given a variable number of arguments, returns the maximum
     * multiplier that must be used to normalize an operation involving
     * all of them.
     */
    function correctionFactor() {
        var args = Array.prototype.slice.call(arguments);
        return args.reduce(function (prev, next) {
            var mp = multiplier(prev),
                mn = multiplier(next);
        return mp > mn ? mp : mn;
        }, -Infinity);
    }        


    /************************************
        Numeral Prototype
    ************************************/


    numeral.fn = Numeral.prototype = {

        clone : function () {
            return numeral(this);
        },

        format : function (inputString, roundingFunction) {
            return formatNumeral(this, 
                  inputString ? inputString : defaultFormat, 
                  (roundingFunction !== undefined) ? roundingFunction : Math.round
              );
        },

        unformat : function (inputString) {
            if (Object.prototype.toString.call(inputString) === '[object Number]') { 
                return inputString; 
            }
            return unformatNumeral(this, inputString ? inputString : defaultFormat);
        },

        value : function () {
            return this._value;
        },

        valueOf : function () {
            return this._value;
        },

        set : function (value) {
            this._value = Number(value);
            return this;
        },

        add : function (value) {
            var corrFactor = correctionFactor.call(null, this._value, value);
            function cback(accum, curr, currI, O) {
                return accum + corrFactor * curr;
            }
            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
            return this;
        },

        subtract : function (value) {
            var corrFactor = correctionFactor.call(null, this._value, value);
            function cback(accum, curr, currI, O) {
                return accum - corrFactor * curr;
            }
            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;            
            return this;
        },

        multiply : function (value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = correctionFactor(accum, curr);
                return (accum * corrFactor) * (curr * corrFactor) /
                    (corrFactor * corrFactor);
            }
            this._value = [this._value, value].reduce(cback, 1);
            return this;
        },

        divide : function (value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = correctionFactor(accum, curr);
                return (accum * corrFactor) / (curr * corrFactor);
            }
            this._value = [this._value, value].reduce(cback);            
            return this;
        },

        difference : function (value) {
            return Math.abs(numeral(this._value).subtract(value).value());
        }

    };

    /************************************
        Exposing Numeral
    ************************************/

    // CommonJS module is defined
    if (hasModule) {
        module.exports = numeral;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `numeral` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this['numeral'] = numeral;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return numeral;
        });
    }
}).call(this);

},{}],158:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.toPairs = toPairs;
exports.shallowCopyObj = shallowCopyObj;
/**
 * Convert obj to array of key value pairs
 *
 * @param {Object} obj A plain JS object
 *
 * @return {Array<Pair<string, Object>>} Pairs
 */
function toPairs(obj) {
  return Object.keys(obj).map(function (key) {
    return [key, obj[key]];
  });
}

/**
 * Create a shallow copy of provided object, will only use Object.keys
 * returned key.
 *
 * @param {Object|null} obj Object to copy
 *
 * @return {Object|null} A shallow copy of provided object, is input null,
 *                       return null.
 */
function shallowCopyObj(obj) {
  if (obj === null) {
    return null;
  }

  var copy = {};
  for (var _iterator = Object.keys(obj), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var key = _ref;

    copy[key] = obj[key];
  }
  return copy;
}
},{}],159:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = applyContainerQuery;

var _react = require('react');

var _reactDom = require('react-dom');

var _createContainerQueryMixin = require('./createContainerQueryMixin');

var _createContainerQueryMixin2 = _interopRequireDefault(_createContainerQueryMixin);

var _DataStructure = require('./DataStructure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Apply container query using higher order component style
 *
 * Refer to:
 * https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775
 *
 * @param {Component} Container - A react component
 * @param {Object} query - Container query definitions
 * @param {Object} [opts] - Additional options passed to `createContainerQueryMixin`
 * @param {string} [opts.propName='containerQuery'] - the property name to pass to applied container component
 *
 * @return {Component} A container query element
 */
function applyContainerQuery(Container, query) {
  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var _ref$propName = _ref.propName;
  var propName = _ref$propName === undefined ? 'containerQuery' : _ref$propName;
  var setAttribute = _ref.setAttribute;


  return (0, _react.createClass)({
    propTypes: Container.propTypes,
    displayName: 'ContainerQuery',
    mixins: [(0, _createContainerQueryMixin2.default)(query, { setAttribute: setAttribute })],

    getInitialState: function getInitialState() {
      return { stateMap: null };
    },
    defineContainerComponent: function defineContainerComponent(ref) {
      this.defineContainer((0, _reactDom.findDOMNode)(ref));
    },
    containerQueryDidUpdate: function containerQueryDidUpdate(stateMap) {
      this.setState({ stateMap: stateMap });
    },
    render: function render() {
      var props = (0, _DataStructure.shallowCopyObj)(this.props);

      props.ref = this.defineContainerComponent;
      props[propName] = this.state.stateMap;

      return (0, _react.createElement)(Container, props);
    }
  });
}
},{"./DataStructure":158,"./createContainerQueryMixin":161,"react":328,"react-dom":164}],160:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.isSelectorMapEqual = isSelectorMapEqual;
exports.parseQuery = parseQuery;

var _DataStructure = require('./DataStructure');

/**
 * Test if two classMap object are the same
 *
 * @param {Object|null} a A plain JS object, with string as key, boolean as value
 * @param {Object|null} b Same as a
 *
 * @return {boolean} True if a and b have the same key and mapped value,
 *                   or both are null.
 */
function isSelectorMapEqual(a, b) {
  if (a === b) {
    return true;
  } else if (a === null || b === null) {
    return false;
  }

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (var _iterator = aKeys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var key = _ref;

    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}

/**
 * A curried function. Take query defination and size object,
 * return a selectorMap by testing size against rules in query defination
 *
 * @param {Object} query Object contains container query break points
 * @param {Object} size  With width and height property
 *
 * @return {Object} A map of selector to boolean
 */
function parseQuery(query) {
  var rules = [];

  for (var _iterator2 = (0, _DataStructure.toPairs)(query), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var _ref6 = _ref2;
    var selectorName = _ref6[0];
    var _ref6$ = _ref6[1];
    var minWidth = _ref6$.minWidth;
    var maxWidth = _ref6$.maxWidth;
    var minHeight = _ref6$.minHeight;
    var maxHeight = _ref6$.maxHeight;

    rules.push([selectorName, {
      minWidth: minWidth || 0,
      maxWidth: maxWidth || Infinity,
      minHeight: minHeight || 0,
      maxHeight: maxHeight || Infinity
    }]);
  }

  return function (_ref3) {
    var width = _ref3.width;
    var height = _ref3.height;

    var selectorMap = {};

    for (var _iterator3 = rules, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref4 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref4 = _i3.value;
      }

      var _ref5 = _ref4;
      var selectorName = _ref5[0];
      var _ref5$ = _ref5[1];
      var minWidth = _ref5$.minWidth;
      var maxWidth = _ref5$.maxWidth;
      var minHeight = _ref5$.minHeight;
      var maxHeight = _ref5$.maxHeight;

      selectorMap[selectorName] = minWidth <= width && width <= maxWidth && minHeight <= height && height <= maxHeight;
    }

    return selectorMap;
  };
}
},{"./DataStructure":158}],161:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.default = createContainerQueryMixin;

var _raf = require('./raf');

var _containerQuery = require('./containerQuery');

var _DataStructure = require('./DataStructure');

/**
 * Create a mixin that can be
 *
 * @param {Object} query - Container query definitions
 * @param {Object} [opts] - Options
 * @param {boolean} [opts.setAttribute] - When true, mixin will set or unset
 *                                        attributes on container element
 *                                        according to current active container
 *                                        query
 *
 * @return {Object} A mixin object that can be applied to a component
 */
function createContainerQueryMixin(query) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref$setAttribute = _ref.setAttribute;
  var setAttribute = _ref$setAttribute === undefined ? false : _ref$setAttribute;


  var getClasses = (0, _containerQuery.parseQuery)(query);

  return {
    defineContainer: function defineContainer(component) {
      this._containerElement = component;
    },
    componentDidMount: function componentDidMount() {
      var _this = this;

      this._containerQuerySelectorMap = null;
      this._size = { width: null, height: null };
      this._rafId = null;

      var checkDimension = function checkDimension() {
        var _containerElement = _this._containerElement;
        var width = _containerElement.clientWidth;
        var height = _containerElement.clientHeight;


        var changed = false;

        if (_this._size.width !== width) {
          changed = true;
        }

        if (_this._size.height !== height) {
          changed = true;
        }

        _this._size.width = width;
        _this._size.height = height;

        if (changed) {
          _this._updateAttributes();
        }

        _this._rafId = (0, _raf.requestAnimationFrame)(checkDimension);
      };

      checkDimension();
    },
    componentWillUnmount: function componentWillUnmount() {
      (0, _raf.cancelAnimationFrame)(this._rafId);
      this._rafId = null;
      this._containerElement = null;

      if (this.containerQueryWillUpdate) {
        this.containerQueryWillUpdate((0, _DataStructure.shallowCopyObj)(this._containerQuerySelectorMap));
      }

      this._containerQuerySelectorMap = null;

      if (this.containerQueryDidUpdate) {
        this.containerQueryDidUpdate((0, _DataStructure.shallowCopyObj)(this._containerQuerySelectorMap));
      }
    },
    _updateAttributes: function _updateAttributes() {
      var selectorMap = getClasses(this._size);

      if ((0, _containerQuery.isSelectorMapEqual)(this._containerQuerySelectorMap, selectorMap)) {
        return;
      }

      if (this.containerQueryWillUpdate) {
        this.containerQueryWillUpdate((0, _DataStructure.shallowCopyObj)(this._containerQuerySelectorMap));
      }

      this._containerQuerySelectorMap = selectorMap;

      if (setAttribute) {
        for (var _iterator = (0, _DataStructure.toPairs)(this._containerQuerySelectorMap), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref2 = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref2 = _i.value;
          }

          var _ref3 = _ref2;
          var selectorName = _ref3[0];
          var isOn = _ref3[1];

          if (isOn) {
            this._containerElement.setAttribute(selectorName, '');
          } else {
            this._containerElement.removeAttribute(selectorName);
          }
        }
      }

      if (this.containerQueryDidUpdate) {
        this.containerQueryDidUpdate((0, _DataStructure.shallowCopyObj)(this._containerQuerySelectorMap));
      }
    }
  };
}
},{"./DataStructure":158,"./containerQuery":160,"./raf":163}],162:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createContainerQueryMixin = require('./createContainerQueryMixin');

Object.defineProperty(exports, 'createContainerQueryMixin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_createContainerQueryMixin).default;
  }
});

var _applyContainerQuery = require('./applyContainerQuery');

Object.defineProperty(exports, 'applyContainerQuery', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_applyContainerQuery).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./applyContainerQuery":159,"./createContainerQueryMixin":161}],163:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var requestAnimationFrame = void 0;
var cancelAnimationFrame = void 0;

if (typeof document === 'undefined') {
  // For Node.js
  exports.requestAnimationFrame = requestAnimationFrame = function requestAnimationFrame() {};
  exports.cancelAnimationFrame = cancelAnimationFrame = function cancelAnimationFrame() {};
} else {
  (function () {
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    var lastTime = 0;

    exports.requestAnimationFrame = requestAnimationFrame = window.requestAnimationFrame;
    exports.cancelAnimationFrame = cancelAnimationFrame = window.cancelAnimationFrame;

    for (var x = 0; x < vendors.length && !requestAnimationFrame; x++) {
      exports.requestAnimationFrame = requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      exports.cancelAnimationFrame = cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!requestAnimationFrame) {
      exports.requestAnimationFrame = requestAnimationFrame = function requestAnimationFrame(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!cancelAnimationFrame) {
      exports.cancelAnimationFrame = cancelAnimationFrame = function cancelAnimationFrame(id) {
        return clearTimeout(id);
      };
    }
  })();
}

exports.requestAnimationFrame = requestAnimationFrame;
exports.cancelAnimationFrame = cancelAnimationFrame;
},{}],164:[function(require,module,exports){
'use strict';

module.exports = require('react/lib/ReactDOM');

},{"react/lib/ReactDOM":199}],165:[function(require,module,exports){

module.exports = function safeRender (React, config) {
  config = config || {};
  config.errorHandler = config.errorHandler || function () {};

  if (React.hasOwnProperty('unsafeCreateClass')) { return React; }

  React.unsafeCreateClass = React.createClass;

  React.createClass = function (spec) {
    var original = {componentClass: {}};
    var wrapBound = wrap.bind(null, spec, original, config);

    [ 'render',
      'componentWillMount',
      'componentDidMount',
      'componentWillReceiveProps',
      'componentWillUpdate',
      'componentDidUpdate',
      'componentWillUnmount'
    ].forEach(function (name) {
      wrapBound(name);
    });

    wrapBound('shouldComponentUpdate', safeShouldComponentUpdate);
    wrapBound('getInitialState', safeGetInitial);

    original.componentClass = React.unsafeCreateClass.apply(React, arguments);
    return original.componentClass;
  };

  return React;
};

function wrap(spec, original, config, method, returnFn) {
  if (!spec.hasOwnProperty(method)) { return; }

  var unsafe = spec[method];

  spec[method] = function () {
    try {
      return unsafe.apply(this, arguments);
    } catch (e) {
      if (original.componentClass.bubbleErrors) {
        throw e;
      }

      var report = {
        displayName: original.componentClass.displayName,
        method: method,
        props: this.props,
        error: e
      };

      if (arguments.length > 0) {
        report.arguments = arguments;
      }

      try {
        config.errorHandler(report);
        return returnFn ? returnFn() : null;
      } catch (err) {
        console.error('[Error Handler]', err.stack);
        return returnFn ? returnFn() : null;
      }
    }
  };
}

function safeShouldComponentUpdate() {
  return true;
}

function safeGetInitial() {
  return {};
}

},{}],166:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AutoFocusUtils
 */

'use strict';

var ReactDOMComponentTree = require('./ReactDOMComponentTree');

var focusNode = require('fbjs/lib/focusNode');

var AutoFocusUtils = {
  focusDOMComponent: function () {
    focusNode(ReactDOMComponentTree.getNodeFromInstance(this));
  }
};

module.exports = AutoFocusUtils;
},{"./ReactDOMComponentTree":203,"fbjs/lib/focusNode":310}],167:[function(require,module,exports){
/**
 * Copyright 2013-present Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule BeforeInputEventPlugin
 */

'use strict';

var EventConstants = require('./EventConstants');
var EventPropagators = require('./EventPropagators');
var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
var FallbackCompositionState = require('./FallbackCompositionState');
var SyntheticCompositionEvent = require('./SyntheticCompositionEvent');
var SyntheticInputEvent = require('./SyntheticInputEvent');

var keyOf = require('fbjs/lib/keyOf');

var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
var START_KEYCODE = 229;

var canUseCompositionEvent = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;

var documentMode = null;
if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
  documentMode = document.documentMode;
}

// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var canUseTextInputEvent = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto();

// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
var useFallbackCompositionData = ExecutionEnvironment.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);

/**
 * Opera <= 12 includes TextEvent in window, but does not fire
 * text input events. Rely on keypress instead.
 */
function isPresto() {
  var opera = window.opera;
  return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
}

var SPACEBAR_CODE = 32;
var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

var topLevelTypes = EventConstants.topLevelTypes;

// Events and their corresponding property names.
var eventTypes = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onBeforeInput: null }),
      captured: keyOf({ onBeforeInputCapture: null })
    },
    dependencies: [topLevelTypes.topCompositionEnd, topLevelTypes.topKeyPress, topLevelTypes.topTextInput, topLevelTypes.topPaste]
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionEnd: null }),
      captured: keyOf({ onCompositionEndCapture: null })
    },
    dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionEnd, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionStart: null }),
      captured: keyOf({ onCompositionStartCapture: null })
    },
    dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionStart, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: keyOf({ onCompositionUpdate: null }),
      captured: keyOf({ onCompositionUpdateCapture: null })
    },
    dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionUpdate, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
  }
};

// Track whether we've ever handled a keypress on the space key.
var hasSpaceKeypress = false;

/**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */
function isKeypressCommand(nativeEvent) {
  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
  // ctrlKey && altKey is equivalent to AltGr, and is not a command.
  !(nativeEvent.ctrlKey && nativeEvent.altKey);
}

/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */
function getCompositionEventType(topLevelType) {
  switch (topLevelType) {
    case topLevelTypes.topCompositionStart:
      return eventTypes.compositionStart;
    case topLevelTypes.topCompositionEnd:
      return eventTypes.compositionEnd;
    case topLevelTypes.topCompositionUpdate:
      return eventTypes.compositionUpdate;
  }
}

/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionStart(topLevelType, nativeEvent) {
  return topLevelType === topLevelTypes.topKeyDown && nativeEvent.keyCode === START_KEYCODE;
}

/**
 * Does our fallback mode think that this event is the end of composition?
 *
 */
  }
}