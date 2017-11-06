import check, { assert } from 'check-types';
import moment from 'moment';
import _ from 'underscore';
import isPositiveInteger from 'is-positive-integer';

import React from 'react';
import ReactSafe from 'react-safe-render';
import { applyContainerQuery } from 'react-container-query';

import c from 'classnames';

import { i18n } from './i18n.js'

import { removeOverlap, calculatePayout } from './utils.jsx';

import { diff } from 'deep-diff';

import chroma from 'chroma-js';
import slug from 'slug';

//import $ from 'jquery';
/* We use the global because drupal includes it anyway so we might as well save 100kb on the bundle */
//$ = window.jQuery;

ReactSafe(React, {
  errorHandler: function (errReport) {
    console.log(
      errReport.error, // the original error object 
      errReport.displayName, // name of component that failed 
      errReport.props, // the props that the component recieved 
      errReport.method, // name of method that failed (ie: componentWillMount) 
      errReport.arguments // arguments for the method that failed (if there were any) 
    )
  }
});

export const WidgetSchedule = React.createClass({
  getInitialState() {
    return {date: moment(), market: "ThreeWayOdds", events: [], ready: false};
  },
  componentWillMount() {
    let config = this.props.config;

    if(!config)
      config = {};

    config.classes = 'classes' in config && config.classes || '';

    config.refreshRate = 'refreshRate' in config && config.refreshRate || 30000;

    config.language = 'language' in config && config.language || 'en';

    config.maxMatches = 'maxMatches' in config && config.maxMatches || false;

    config.maxHeight = 'maxHeight' in config && (isPositiveInteger(new Number(config.maxHeight).valueOf()) && new Number(config.maxHeight).valueOf()) || false;

    config.competition = 'competition' in config && config.competition || false;

    config.datepicker = 'datepicker' in config && (!!config.datepicker && !config.competition) || false;

    config.showPayout = 'showPayout' in config && !!config.showPayout || false;

    config.linkPrefix = 'linkPrefix' in config && config.linkPrefix || '';
    config.linkSuffix = 'linkSuffix' in config && config.linkSuffix || '';

    this.config = config;
    
    this.serverRequests = [];
  },
  childContextTypes: {
    config: React.PropTypes.object,
    widgetQuery: React.PropTypes.object
  },
  getChildContext() {
    return {
      config: this.config,
      widgetQuery: this.props.containerQuery
    };
  },
  componentDidMount(nextProps) {
    console.log(this.config);

    if(this.config.competition){
//      let url = 'http://app.livegoals.dk/api/v1.2/tournament/'+this.config.competition+'/odds';
      let url = 'http://163.172.20.91/api/v2.0/competition/'+this.config.competition+'/paginated_schedule';
      this.setState({
        interval: setInterval(()=>{ 
          this.loadMatchesFromAPI(url);
        },this.config.refreshRate)
      });
      this.loadMatchesFromAPI(url);
    }else{
      this.setState({
        interval: setInterval(()=>{ 
          this.loadMatchesByDate(this.state.date);
        },this.config.refreshRate)
      });
      this.loadMatchesByDate(this.state.date);
    }
  },
  shouldComponentUpdate(nextProps, nextState) {
    return !!diff(this.state,nextState) || !!diff(this.props,nextProps);
  },
  componentWillUpdate(nextProps,nextState){
    if('date' in this.state && 'date' in nextState && this.state.date != nextState.date){
      this.setState({
        interval: setInterval(()=>{ 
          this.loadMatchesByDate(nextState.date);
        },this.config.refreshRate)
      });
      this.loadMatchesByDate(nextState.date);
    }
  },
  componentWillUnmount(){
    this.serverRequests.each((serverRequest)=>{
      serverRequest.abort();
    })
  },
  loadMatchesByDate(date){
    this.loadMatchesFromAPI('http://eurytus.livegoals.dk/api/v1.1/schedule/'+moment(date).format('YYYY-MM-DD')+'?options=streams|odds&odds_types=OverUnderOdds|ThreeWayOdds&locale=en');
///    this.loadMatchesFromAPI('http://eurytus.livegoals.dk/api/v1.1/schedule/'+moment(date).format('YYYY-MM-DD')+'?options=streams|odds&odds_types=OverUnderOdds|ThreeWayOdds&locale='+this.config.language);
  },
  loadMatchesFromAPI(url) {
    console.log('loading matches from api', url);
    let serverRequest = $.ajax({
      url: url,
      dataType: 'json',
      success: response=>{
        if('events' in response){
          let newEvents = _.uniq(response.events.concat(this.state.events),event=>event.id);
          this.setState({
            events: newEvents,
            ready: !('total' in response) || (newEvents.length == response.total)
          });
        }

        if(response.next_request)
          this.loadMatchesFromAPI(response.next_request);

      },
      error: (xhr, status, err)=>{
        console.error(url, status, err);
      }
    });
    this.serverRequests.push(serverRequest);
  },
  changeDate(newDate) {
    if(newDate == this.state.date)
      return;

    if(this.state.interval)
      clearInterval(this.state.interval);

    this.serverRequests.forEach((serverRequest)=>{
      serverRequest.abort();
    })

    this.setState({
      date: newDate,
      ready: false,
      events: []
    });
  },
  changeMarket(newMarket) {
    //Don't setState if we're not actually changing markets. 
    if(newMarket != this.state.market){
      //Force the <main> element to be scrolled all the way up on market change.
      this.refs.main.scrollTop = 0;
      this.setState({
        market: newMarket
      });
    }
  },
  render() {
    //Only pass down a market when we have odds.
    let market = _.some(this.state.events,event=>event.odds && event.odds.length) ? this.state.market : null;
    let mainStyle = {};
    if(this.config.maxHeight){
      mainStyle.maxHeight = this.config.maxHeight+'px';
      mainStyle.overflowX = 'hidden';
      mainStyle.overflowY = 'auto';
    }
    return (
      <section className={c("w-livegoals","w-livegoals-schedule",this.config.classes,this.props.containerQuery)}>
        <header>

          { this.state.ready
            ? this.config.competition
            ? <WidgetTitledisplay title={this.state.events.length ? this.state.events[0].competition.name+' schedule' : ''}/>
            : this.config.datepicker
              ? <ScheduleDatepicker date={this.state.date} onChangeDate={this.changeDate}/>
              : <WidgetTitledisplay title={moment(this.state.date).format(i18n.t("longDate"))}/>
          : (<WidgetTitledisplay title={'Loading...'}/>)
          }
          { true && market
            ? <WidgetTabs currentSlug={market} onClick={this.changeMarket}
                options={[{name:'1 X 2',slug:'ThreeWayOdds'},{name:'OU',slug:'OverUnderOdds'}]}
                />
            : null
          }

        </header>
        <main style={mainStyle} ref="main">
          { this.state.ready
            ? (<ScheduleTable events={JSON.parse(JSON.stringify(this.state.events))} market={market}/>)
            : (<table className="matchList"><tbody><tr><td>{i18n.t('loading')}</td></tr></tbody></table>)
          }
        </main>
        <WidgetFooter/>
      </section>
    );
  }
});

const WidgetFooter = ()=>{
  return <footer>
    <a href="http://www.livegoals.com/" className="w-livegoals-poweredby" target='_blank' rel="nofollow noopener noreferrer">
      {i18n.t('poweredBy')}
    </a>
  </footer>
}

export const WidgetTitledisplay = props=>{
  return <nav>
    <header dangerouslySetInnerHTML={{__html:props.title}}>
      {props.children}
    </header>
  </nav>
}

const ScheduleDatepicker = React.createClass({
  renderDays(){
    let days = [];
    for(let i=-2;i<=4;i++){
      days.push(moment().startOf('day').add(i,'d'))
    }
    return days.map((day)=>(
      <button onClick={()=>this.props.onChangeDate(day)} 
              key={day.valueOf()} 
              className={moment(day).isSame(moment(this.props.date).startOf('day'))?'is-selected':''}>
        <div>{day.format('D')}</div>
        <div>{day.format('ddd')}</div>
      </button>
    ))
  },
  render(){
    return (
      <nav>
        {this.renderDays()}
      </nav>
    )
  }
});

const WidgetTabs = ({options,currentSlug,onClick})=>{
  const tabs = options.map(option=><button 
        key={option.slug}
        className={option.slug==currentSlug?'is-active':''} 
        onClick={()=>onClick(option.slug)}>
        {option.name}
      </button>)
  return (
    <div className="w-livegoals-tabs">
      {tabs}
    </div>
  );
}

const ScheduleTable = React.createClass({
  getInitialState() {
    return {};
  },
  contextTypes: {
    config: React.PropTypes.object
  },
  componentWillMount() {
    this.config = this.context.config;
  },
  renderCompetitions() {
    let eventz = this.props.events;

    eventz = _.sortBy(eventz,function(event){
      if('recurring_competition' in event && 'rank' in event.recurring_competition)
        return ("0000" + event.recurring_competition.rank).substr(-4,4)+'.'+(new Date(event.start_date).valueOf())+'.'+event.home.name
      else
        return (new Date(event.start_date).valueOf())+'.'+event.home.name
    });

    if(this.config.maxMatches)
      eventz = eventz.slice(0,this.config.maxMatches);

    let competitions = _.values(_.groupBy(eventz,(event)=>{
      if('recurring_competition' in event && 'id' in event.recurring_competition)
        return event.recurring_competition.id
      else if('competition' in event && 'id' in event.competition)
        return event.competition.id
      else if('round' in event && 'id' in event.round)
        return event.round.id
    }));

    if(!this.config.competition)
      competitions = _.sortBy(competitions,(events)=>events[0].recurring_competition.rank);

    return competitions.map((events)=>{
      events = _.sortBy(events,(event)=>Date(event.start_date).valueOf());

      let event = events[0];
      let { recurring_competition, competition, round } = event;

      let key = recurring_competition 
                ? recurring_competition.id 
                : competition 
                  ? competition.id 
                  : round.id;

      if('region' in recurring_competition){
        recurring_competition.name = removeOverlap(recurring_competition.region.name, recurring_competition.name);
      }

      if(recurring_competition && competition){
        competition.name = removeOverlap(recurring_competition.name, competition.name);
        if('region' in recurring_competition){
          competition.name = removeOverlap(recurring_competition.region.name, competition.name);
        }
      }
      let title = 
      (recurring_competition && 'region' in recurring_competition && recurring_competition.region.continent != 'international' ? recurring_competition.region.name+' - ' : '') +
      (recurring_competition ? recurring_competition.name : '') +
      (recurring_competition && competition && competition.name ? " - " : '') +
      (competition && competition.name ? competition.name : '')

      return (
        <MatchList events={events} key={key} nøgle={key} market={this.props.market} title={title}/>
      );
    });
  },
  renderDates() {
    let eventz = this.props.events;

    eventz = _.sortBy(eventz,function(event){
      return (new Date(event.start_date).valueOf())
    });

    if(this.config.maxMatches)
      eventz = eventz.slice(0,this.config.maxMatches);

    let dates = _.groupBy(eventz,(event)=>moment(new Date(event.start_date)).startOf('day'));

    return _.values(dates).map((events)=>{
      let event = events[0];
      let dato = moment(new Date(event.start_date)).startOf('day');
      return <MatchList title={dato.format(i18n.t("longDate"))} events={events} nøgle={dato.valueOf()} key={dato.valueOf()} market={this.props.market}/>
    });
  },
  render() {
    return (
      <table className="matchList">
        {this.config.competition 
          ? this.renderDates()
          : this.renderCompetitions()}
      </table>
    )
  }
});



const renderMarketHeaderCells = function (market = "ThreeWayOdds",showPayout = false) {
  if(market == "ThreeWayOdds")
    return [
      <th key="1">
        1
      </th>,
      <th key="x">
        X
      </th>,
      <th key="2">
        2
      </th>,
      showPayout ?
      <th key="po">
        {i18n.t('payout')}
      </th> : null
    ];
  if(market == "OverUnderOdds")
    return [
      <th key="o">
        {i18n.t('overGoals',{goals:2.5})}
      </th>,
      <th key="u">
        {i18n.t('underGoals',{goals:2.5})}
      </th>,
      showPayout ?
      <th key="po">
        {i18n.t('payout')}
      </th> : null
    ];

  return null;
};

const getBestOffer = function (odds,selector){
  if(!odds)
    return null;
  if(typeof selector != "object")
    return null

  let relevantOffers = [];
  odds.forEach((bookmaker)=>{
    relevantOffers = relevantOffers.concat(
      _.chain(bookmaker.offers)
       .values()
       .flatten()
       .where(selector)
       .map((offer)=>{
          offer.bookmaker=bookmaker.name; 
          return offer;
        })
       .value()
    )
  });

  relevantOffers = _.sortBy(relevantOffers,(offer)=>-offer.value);

  return relevantOffers[0] || null;
};

const renderPayoutCell = function(odds,market,tags,selectorAddendum) {
  if(typeof selectorAddendum != "object")
    selectorAddendum = {};

  if(_.every(tags,tag=>!!getBestOffer(odds,_.extend({type:market,tag:tag},selectorAddendum)))){
    let oddsValueArray = _.map(tags,(tag)=>getBestOffer(odds,_.extend({type:market,tag:tag},selectorAddendum)).value);

    let decimalPayout = calculatePayout(oddsValueArray);

    return <td key="po">{new Number((decimalPayout*100).toFixed(2))+'%'}</td>
  }
  else
    return <td key="po"></td>
};

const renderMarketBodyCells = function(event,market,showPayout = false) {
  if(market == "ThreeWayOdds"){
    let tags = ["1","X","2"];
    let oddscells = tags.map((tag)=>{
      if(!event.odds)
        return <td className="w-livegoals-schedule-oddscell" key={tag}>{null}</td>;
      let bestOffer = getBestOffer(event.odds,{type:market,tag:tag});
      return <td className="w-livegoals-schedule-oddscell" key={tag}>
        {event.odds && bestOffer?(<Odds offer={bestOffer}/>):null}
      </td>;
    });
    if(showPayout){
      oddscells = oddscells.concat([renderPayoutCell(event.odds,market,tags)]);
    }
    return oddscells;
  }
  if(market == "OverUnderOdds"){
    let tags = ["Over","Under"];
    let baseline = 2.5;
    let oddscells = tags.map((tag)=>{
      if(!event.odds)
        return <td className="w-livegoals-schedule-oddscell" key={tag}>{null}</td>;
      let bestOffer = getBestOffer(event.odds,{type:market,tag:tag,baseline:baseline});
      return <td className="w-livegoals-schedule-oddscell" key={tag}>
        {event.odds && bestOffer?(<Odds offer={bestOffer}/>):null}
      </td>;
    });
    if(showPayout){
      oddscells = oddscells.concat([renderPayoutCell(event.odds,market,tags,{baseline:baseline})]);
    }
    return oddscells;
  }

  return null;
};

const MatchList = React.createClass({
  contextTypes: {
    config: React.PropTypes.object,
    widgetQuery: React.PropTypes.object
  },
  componentWillMount() {
    this.config = this.context.config;
  },
  render() {
    var matchNodes = this.props.events.map((event)=>{
      let array = [
        <Match event={event} key={event.id} market={this.props.market}/>
      ]
      if(false && 'streams' in event && event.streams.length && (
            ('status' in event && 'code' in event.status && event.status.code != 'finished' && event.status.code != 'cancelled') 
            || 
            ('status_code' in event && event.status_code != 'finished' && event.status_code != 'cancelled')
          )
        )
        array[1] = 
          <tr className="disregardallofthis">
            <td colSpan="100%" className="donteverdothisathomekids">
              <div className="noreallyimeanit">
                <MatchStreamsList streams={event.streams}/>
              </div>
            </td>
          </tr>

      if(this.context.widgetQuery['from0to720'] && this.props.market)
        array[2] = <tr><td colSpan="100%" style={{padding:0}}><table><tbody><tr>{renderMarketBodyCells(event,this.props.market)}</tr></tbody></table></td></tr>

      return array;
    });

    return (
      <tbody key={this.props.nøgle}>
        <tr key={this.props.nøgle}>
          <th colSpan={this.context.widgetQuery['from0to720']?"100%":"2"}  dangerouslySetInnerHTML={{__html:this.props.title?this.props.title:null}}>
          </th>
          {this.props.market && !this.context.widgetQuery['from0to720'] ? renderMarketHeaderCells(this.props.market,this.config.showPayout) : null}
        </tr>
        {matchNodes}
      </tbody>
    );
  }
});

const Match = React.createClass({
  contextTypes: {
    config: React.PropTypes.object,
    widgetQuery: React.PropTypes.object
  },
  componentWillMount() {
    this.config = this.context.config;
  },
  getInitialState() {
    return {showStreams: false};
  },
  toggleStreams() {
    this.setState({showStreams:!this.state.showStreams});
  },
  render() {
    let event = this.props.event;
    const thelinkslug = slug(event.home.name)+'-vs-'+slug(event.away.name)+'-'+moment(new Date(event.start_date)).format('YYYY-MM-DD');
    let itsalink = {};
    if(this.config.linkPrefix || this.config.linkSuffix)
      itsalink = {
        style: {
          'cursor': 'pointer'
        },
        onClick: ()=>{window.location=this.config.linkPrefix+thelinkslug+this.config.linkSuffix}
      }
    return (
      <tr className={"w-livegoals-schedule-match"+(this.state.showStreams?' thisisareallybadwayofdoingthings':'')}>
        <td className="w-livegoals-schedule-match-status" {...itsalink}>
          <div>
            {event.status && typeof event.status === 'object' ? event.status.display : event.status}
          </div>
        </td>
        <td className="w-livegoals-schedule-match-teams" {...itsalink}>
          <div className="w-livegoals-schedule-team">
            <span className="w-livegoals-schedule-team-score">
              {event.home.score 
              ? event.home.score.current
              : '-'
              }
            </span>
            <span className="w-livegoals-schedule-team-name">
              {event.home.name}
            </span>
          </div>
          <div className="w-livegoals-schedule-team">
            <span className="w-livegoals-schedule-team-score">
              {event.away.score 
              ? event.away.score.current 
              : '-'
              }
            </span>
            <span className="w-livegoals-schedule-team-name">
              {event.away.name}
            </span>
          </div>
          {false && 'streams' in event && event.streams.length &&
            (('status' in event && 'code' in event.status && event.status.code != 'finished' && event.status.code != 'cancelled') 
             || 
             ('status_code' in event && event.status_code != 'finished' && event.status_code != 'cancelled')
            )
            ?(<div className="w-livegoals-schedule-match-streamstoggle">
                <button onClick={this.toggleStreams}><i className="fa fa-play-circle" aria-hidden="true"></i></button>
              </div>)
            :null}
        </td>
        {this.props.market && !this.context.widgetQuery['from0to720'] ? 
          renderMarketBodyCells(this.props.event,this.props.market,this.config.showPayout) 
          : null}
      </tr>
    );
  }
});
const MatchStreamsList = ({streams}) => {
  let streamsRendered = _.sortBy(streams,stream=>stream.name.toLowerCase()).map(stream=><a key={stream.id} className={"w-livegoals-schedule-match-streams-provider"}>{stream.name}</a>)
  return (
    <div className="w-livegoals-schedule-match-streams">
      <div>{i18n.t('streamProviders')}</div>
      <div className="w-livegoals-schedule-match-streams-providers">
        {streamsRendered}
      </div>
    </div>
  )
};
export const Odds = 
  React.createClass({
  render() {
    let offer = this.props.offer;
    const {showBookmaker = true} = this.props;
    if(offer)
      return (
        <a className={c("w-livegoals-schedule-odds",this.props.containerQuery)} href={offer.affiliate_link} target='_blank' rel="nofollow noopener noreferrer">
          <div className={"w-livegoals-schedule-odds-value"+(offer.old_value?offer.value>=offer.old_value?" is-up":" is-down":'')}>
            {offer.old_value
              ?offer.value>=offer.old_value
                ?(<i className="fa fa-arrow-up"></i>)
                :(<i className="fa fa-arrow-down"></i>)
              :null
            }
            {new Number(offer.value).toFixed(2)}
          </div>
          {showBookmaker
            ?<img className="w-livegoals-schedule-odds-bookmaker"
               src={'http://www.livegoals.com/images/providers/'+slug(offer.bookmaker)+'.png'}/>
            :null}
        </a>
      );
  }
});
export const WidgetCompetitiontables = React.createClass({
  componentWillMount() {
    let props = this.props;
    let config = _.extend(props.config,props);


    if(!config)
      config = {};
    
    if('showFooter' in config)
      config.showFooter = !!config.showFooter
    else
      config.showFooter = true

    config.classes = 'classes' in config && config.classes || 't-wsn';

    this.config = config;

  },
  render(){
  return  <section className={c("w-livegoals","w-livegoals-competitiontables",this.config.classes,this.props.containerQuery)}>
        {this.props.competitionIds.map(competitionId=><WidgetCompetitiontable key={competitionId} competitionId={competitionId}/>)}
        {this.config.showFooter?<WidgetFooter/>:null}
      </section>
  }
});

export const WidgetCompetitiontable = React.createClass({
  propTypes: {
    competitionId: React.PropTypes.string.isRequired,
    showFooter: React.PropTypes.bool,
    classes: React.PropTypes.string
  },
  getInitialState() {
    return {data: {}, mode: 'total', ready: false};
  },
  componentWillMount() {
    let config = JSON.parse(JSON.stringify(this.props));


    if(!config)
      config = {};

    config.showFooter = 'showFooter' in config && !!config.showFooter || false;
    config.classes = 'classes' in config && config.classes || 't-wsn';

    this.config = config;
    

    this.serverRequests = [];
  },
  childContextTypes: {
    config: React.PropTypes.object,
    widgetQuery: React.PropTypes.object
  },
  getChildContext() {
    return {
      config: this.config,
      widgetQuery: this.props.containerQuery
    };
  },
  componentDidMount(nextProps) {
//    const url = 'http://163.172.20.91/api/v2.0/competition/'+this.props.competitionId+'/table/'+this.state.mode;
    const url = 'http://163.172.20.91/api/v2.0/competition/'+this.props.competitionId+'/table/'+this.state.mode;
//    const url = 'http://app.livegoals.dk/api/v2.0/tables/league_table/'+this.props.competitionId+'/'+this.state.mode;
    this.loadFromAPI(url);
  },
  componentWillUnmount(){
    this.serverRequests.each(serverRequest=>serverRequest.abort())
  },
  shouldComponentUpdate(nextProps, nextState) {
    return !!diff(this.state,nextState) || !!diff(this.props,nextProps);
  },
  componentWillUpdate(nextProps,nextState){
//    const url = 'http://163.172.20.91/api/v2.0/competition/'+this.props.competitionId+'/table/'+nextState.mode;
    const url = 'http://163.172.20.91/api/v2.0/competition/'+this.props.competitionId+'/table/'+nextState.mode;
///    const url = 'http://app.livegoals.dk/api/v2.0/tables/league_table/'+this.props.competitionId+'/'+this.state.mode;

    this.loadFromAPI(url);
  },
  loadFromAPI(url, isRetry=false) {
    console.log('loading table from api', url);
    let serverRequest = $.ajax({
      url: url,
      dataType: 'json',
      success: (response)=>{
        if('participants' in response){
          this.setState({
            data: response,
            ready: true
          });
        }
      },
      error: (xhr, status, err)=>{
        console.error(url, status, err);

        // Retry once.
        if(!isRetry)
          this.loadFromAPI(url,true);
      }
    });
    this.serverRequests.push(serverRequest);
  },
  changeMode(newMode) {
    //Don't setState if we're not actually changing markets. 
    if(newMode != this.state.mode){
      //Force the <main> element to be scrolled all the way up on market change.
      this.refs.main.scrollTop = 0;
      this.setState({
        mode: newMode
      });
    }
  },
  render(){
    const data = this.state.data;

    return (
      <section className={c("w-livegoals","w-livegoals-competitiontable",this.config.classes,this.props.containerQuery)}>
        <header>
          { this.state.ready
            ? (<WidgetTitledisplay title={data.competition.name+' standings'}/>)
            : (<WidgetTitledisplay title={'Loading...'}/>)
          }
          <WidgetTabs currentSlug={this.state.mode} onClick={this.changeMode}
            options={[{name:"Total",slug:"total"},{name:"Home",slug:"home"},{name:"Away",slug:"away"}]}/>
        </header>
        <main ref="main">
          { this.state.ready
            ? <CompetitionTable participants={this.state.data.participants}/>
            : (<table className="matchList"><tbody><tr><td>{i18n.t('loading')}</td></tr></tbody></table>)
          }
        </main>
        {this.config.showFooter?<WidgetFooter/>:null}
      </section>
    )
  }
})

export const CompetitionTable = ({participants=[]})=>{
  participants = _.sortBy(participants,participant=>participant.rank).map(participant=>{
    return participant
  });
  if('spots' in participants[0]){
    var orderedSpots = _.uniq(_.filter(participants,participant=>participant.spots.length).map(participant=>participant.spots[0]),spot=>spot.code);
  }

  const participantsRows = participants.map((participant)=>{
    if('object' in participant)
      participant = _.extend(participant,participant.object);
    if(participant.statistics.length>0 && typeof participant.statistics[0] =='object')
      participant.statistics = _(participant.statistics).chain().indexBy('code').mapObject(({value})=>value).value()


    return (
      <tr key={participant.id}>
        <td className="w-livegoals-competitiontable-rankcolumn">
          {'spots' in participant && orderedSpots?<CompetitionTableSpotBlock 
            spot={participant.spots.length?participant.spots[0]:false} 
            spots={orderedSpots} 
            rank={participant.statistics.rank || participant.rank}
          />:<CompetitionTableSpotBlock 
            rank={participant.statistics.rank || participant.rank}
          />}
        </td>
        <td className="w-livegoals-competitiontable-teamcolumn">{participant.name}</td>
        <td>{participant.statistics.played}</td>
        <td>{participant.statistics.wins}</td>
        <td>{participant.statistics.draws}</td>
        <td>{participant.statistics.defeits}</td>
        <td className="w-livegoals-competitiontable-pointscolumn">{participant.statistics.points || participant.points}</td>
        {false?<td>Last 5 matches</td>:null}
        <td>{participant.statistics.goalsfor&&participant.statistics.goalsagainst?participant.statistics.goalsfor+"/"+participant.statistics.goalsagainst:null}</td>
        <td>{participant.statistics.goalsfor&&participant.statistics.goalsagainst?participant.statistics.goalsfor-participant.statistics.goalsagainst:null}</td>
      </tr>
    )
  });
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}></th>
          <th>MP</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th className="w-livegoals-competitiontable-pointscolumn">Pts</th>
          {false?<th>Last 5</th>:null}
          <th>GF/GA</th>
          <th>+/-</th>
        </tr>
      </thead>
      <tbody>{participantsRows}</tbody>
      <tfoot>
        <tr>
          <td colSpan="100%">
            {orderedSpots?<CompetitionTableLegend spots={orderedSpots}/>:null}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
export const CompetitionTableLegend = ({spots=[]})=>{
//  const spotColors = spotColorScale.colors(spots.length);

  const legendItems = spots.map((spot,index)=>{
    return <li className="w-livegoals-competitiontable-legend-item" key={spot.code}>
      <CompetitionTableSpotBlock spot={spot} spots={spots}/>{spot.name}
    </li>
  }) 
  return <ul className="w-livegoals-competitiontable-legend">{legendItems}</ul>
};
export const CompetitionTableSpotBlock = ({spot=false,spots=[],rank=null})=>{
  const theSpot = spot;
  let spotColor = false;
  let textColor = false;
  if(theSpot){
    const spotColors = chroma.scale([
        'rgb(69,184,94)',
        'rgb(41,129,62)',
        'rgb(33,68,154)',
        'rgb(86,109,180)'
    ]).colors(spots.length);

    spotColor = spotColors[_.findIndex(spots,aSpot=>aSpot.code==theSpot.code)]
  }
  if(spotColor){
    textColor = 'white';
  }
  const styles = {
    backgroundColor: spotColor,
    color: textColor
  }
  return <div className="w-livegoals-competitiontable-spotblock" style={styles}>{rank}</div>
}
