/**
 * @file
 */

//remember these
//http://app.livegoals.dk/api/v2.0/tables/league_table/3e645c40-14d4-11e5-80d5-5254005a5aa0/total
//http://app.livegoals.dk/api/v1.2/tournament/3e645c40-14d4-11e5-80d5-5254005a5aa0/odds

//import { createStore } from 'redux';

//console.log(createStore);

import moment from 'moment';
//import 'moment/locale/sv';
import React from 'react';
import { render } from 'react-dom';
import { applyContainerQuery } from 'react-container-query';

import { i18n } from './i18n.js'

import { WidgetSchedule, WidgetCompetitiontable, WidgetCompetitiontables } from './widgets.jsx';

import { WidgetGamecenter } from './widgets/gamecenter.jsx';

import { mdBreakpoints } from './utils.jsx';

//import $ from 'jquery';
/* We use the global because drupal includes it anyway so we might as well save 100kb on the bundle */
$ = window.jQuery;


$(()=>{
  if(document.getElementById('js-livegoals-schedule')){
    let config = null;
    if('config' in document.getElementById('js-livegoals-schedule').dataset)
      config = JSON.parse(document.getElementById('js-livegoals-schedule').dataset.config)

    let userLanguage = config && 'language' in config && config.language 
                              || window.navigator.userLanguage 
                              || window.navigator.language
    i18n.changeLanguage(userLanguage)

    moment.updateLocale('en', {
      ordinal : function (number, token) {
        var b = number % 10;
        var output = (~~ (number % 100 / 10) === 1) ? 'th' :
          (b === 1) ? 'st' :
          (b === 2) ? 'nd' :
          (b === 3) ? 'rd' : 'th';
        return number + '<sup>' + output + '</sup>';
      }
    });
    moment.locale(userLanguage);


    const CQWidgetSchedule = applyContainerQuery(WidgetSchedule,mdBreakpoints);
    render(
      <CQWidgetSchedule 
        config={config}
      />, 
      document.getElementById('js-livegoals-schedule')
    ); 
  }

  if(document.getElementById('js-livegoals-gamecenter')){
    const CQWidgetGamecenter = applyContainerQuery(WidgetGamecenter,mdBreakpoints);
    render(
      <CQWidgetGamecenter {...JSON.parse(document.getElementById('js-livegoals-gamecenter').dataset.config)}/>, 
      document.getElementById('js-livegoals-gamecenter')
    ); 
  }

  if(document.getElementById('js-livegoals-competitiontable')){
    const CQWidgetCompetitiontable = applyContainerQuery(WidgetCompetitiontable,mdBreakpoints);
    render(
      <CQWidgetCompetitiontable {...JSON.parse(document.getElementById('js-livegoals-competitiontable').dataset.config)}/>, 
      document.getElementById('js-livegoals-competitiontable')
    ); 
  }
  if(document.getElementById('js-livegoals-competitiontables')){
    const CQWidgetCompetitiontables = applyContainerQuery(WidgetCompetitiontables,mdBreakpoints);
    render(
      <CQWidgetCompetitiontables {...JSON.parse(document.getElementById('js-livegoals-competitiontables').dataset.config)}/>, 
      document.getElementById('js-livegoals-competitiontables')
    ); 
  }
})
