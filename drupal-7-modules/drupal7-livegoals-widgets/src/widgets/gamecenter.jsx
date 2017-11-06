import check, { assert } from 'check-types';
import moment from 'moment';
import _ from 'underscore';

import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactSafe from 'react-safe-render';
import { applyContainerQuery } from 'react-container-query';

import c from 'classnames';
import { diff } from 'deep-diff';
import deepExtend from 'deep-extend';

import request from 'superagent';

import slug from 'slug';

import css from 'autoprefix';

import { i18n } from '../i18n.js';

import {Odds} from '../widgets.jsx';

slug.defaults.mode ='rfc3986';

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

export const WidgetGamecenter = React.createClass({
  propTypes: {
    // An optional string prop named "description".
    eventId: React.PropTypes.string,
    eventToken: React.PropTypes.string,
    refreshRate: React.PropTypes.number
  },
  getDefaultProps: ()=>{
    return {
      eventId: '',
      eventToken: '',
      refreshRate: 20000,
      classes: 't-wsn',
    };
  },
  childContextTypes: {
    widgetQuery: React.PropTypes.object
  },
  getChildContext() {
    return {
      widgetQuery: this.props.containerQuery
    };
  },
  getInitialState() {
    return {
      event: {}, 
      ready: false
    };
  },
  componentDidMount(nextProps) {
    this.setState({
      interval: setInterval(()=>{ 
        this.loadData();
      },this.props.refreshRate)
    });
    this.loadData()
  },
  /*
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    console.log(nextState);
    console.log(diff(this.state,nextState));
    console.log(diff(this.props,nextProps));
    return !!diff(this.state,nextState) || !!diff(this.props,nextProps);
  },*/
  componentWillUpdate(nextProps,nextState){
  },
  componentWillUnmount(){
  },
  loadData(){
    let id;
    if('id' in this.state.event)
      id = this.state.event.id
    else if(this.props.eventId){
      id = this.props.eventId;
    } else if(this.props.eventToken)
      return this.loadEventByToken(this.props.eventToken,this.loadData);

    if(id){
      this.extendEventByUrl("http://eurytus.livegoals.dk/api/v1.1/event/"+id+"?locale=en");
      this.extendEventByUrl("http://app.livegoals.dk/api/v2.0/event/"+id+"/updates?locale=en");
      this.extendEventByUrl("http://app.livegoals.dk/api/v2.0/event/"+id+"/head2head?locale=en");
      this.addEventPropertyByUrl("http://app.livegoals.dk/api/v2.0/event/"+id+"/commentary?locale=en","commentary");
      this.extendEventByUrl("http://eurytus.livegoals.dk/api/v1.1/event/"+id+"/odds?locale=en");

      this.setState({
        ready: true
      });
    }
  },
  loadEventByToken(eventToken,callback=()=>{}) {
    const url = "http://eurytus.livegoals.dk/api/v1.1/event/tokenized/"+eventToken+"?locale=en";
    request.get(url).end((error,{body})=>{
      if(error)
        throw error;

      this.setState({
        event: deepExtend(this.state.event,body.event)
      });
      callback();
    })
  },
  cleanEvent(event){
    delete event.generated;
    delete event.error;
    delete event.event;
    if('status' in event && typeof event.status === 'string'){
      event.status = {
        display: event.status,
        code: event.status_code,
        type: event.status_type
      }
      delete event.status_code;
      delete event.status_type;
    }
    if('home_score' in event){
      event.home = deepExtend(event.home,{score:{
        current: event.home_score
      }})
      delete event.home_score;
    }
    if('home_half_time_score' in event){
      event.home = deepExtend(event.home,{score:{
        halftime: event.home_half_time_score
      }})
      delete event.home_half_time_score;
    }
    if('away_score' in event){
      event.away = deepExtend(event.away,{score:{
        current: event.away_score
      }})
      delete event.away_score;
    }
    if('away_half_time_score' in event){
      event.away = deepExtend(event.away,{score:{
        halftime: event.away_half_time_score
      }})
      delete event.away_half_time_score;
    }
    if('head2head' in event){
      event.head2head.map(this.cleanEvent)
    }
    if('home' in event && 'latest_matches' in event.home && event.home.latest_matches.length){
      event.home.latest_matches.map(this.cleanEvent)
    }
    if('away' in event && 'latest_matches' in event.away && event.away.latest_matches.length){
      event.away.latest_matches.map(this.cleanEvent)
    }
    return event;
  },
  extendEventByUrl(url) {
    request.get(url).end((error,{body})=>{
      if(error)
        throw error;

      // Some rewriting to clear up inconsistencies
      body = this.cleanEvent(body);

      this.setState({
        event: deepExtend(this.state.event,body)
      });
    })
  },
  addEventPropertyByUrl(url,property) {
    request.get(url).end((error,{body})=>{
      if(error)
        throw error;

      let event = this.state.event;
      event[property] = body;

      this.setState({
        event: event
      });
    })
  },
  render(){
//    console.log(this);
    if(!this.state.ready)
      return (<section>Loading...</section>)
    const event = this.state.event;
    return (
      <main className={c("w-livegoals","w-livegoals-gamecenter",this.props.classes,this.props.containerQuery)}>
        <GamecenterDetails {...event} className="w-livegoals-gamecenter-details"/>
        <GamecenterMatchboard {...event} className="w-livegoals-gamecenter-matchboard"/>
        {'commentary' in event && event.commentary.length
          ? <GamecenterCommentary {...event} className="w-livegoals-gamecenter-commentary"/>
          :null}
        {'odds' in event && event.odds.length
          ? <GamecenterOdds {...event} className="w-livegoals-gamecenter-odds"/>
          :null}
        {('statistics' in event.home && event.home.statistics.length)  || ('statistics' in event.away && event.away.statistics.length)
          ? <GamecenterStatistics {...event} className="w-livegoals-gamecenter-statistics"/>
          :null}
        {('lineups' in event.home && event.home.lineups.length)  || ('lineups' in event.away && event.away.lineups.length)
          ? <GamecenterLineups {...event} className="w-livegoals-gamecenter-lineups"/>
          :null}
        {'head2head' in event || 'latest_matches' in event.home || 'latest_matches' in event.away
          ?<GamecenterMatches {...event} className="w-livegoals-gamecenter-matches"/>
          :null}
      </main>
    );
  }
});
const GamecenterDetails = ({competition,start_date,referee,venue,className})=>
  <section className={className}>
    {competition && 'name' in competition ?<div className="competition">
      {competition.name} 
    </div>: null}
    {start_date ?<div className="date" 
    dangerouslySetInnerHTML={{__html:moment(new Date(start_date)).format('Do  MMMM YYYY  H:mm')}}></div>: null}
    {venue ? <div className="venue">
      {venue} 
    </div>: null}
    {referee ?<div className="referee">
       {referee}
    </div>: null}
  </section>


const GamecenterMatchboard = ({status,home,away,className})=>{
  return (
    <section className={c(className)}>
      <div className={c(className+'-status')}>
        {status.display}
      </div>
      <GamecenterMatchboardTeam {...home} className={c(className+'-team')}/>
      <GamecenterMatchboardTeam {...away} className={c(className+'-team')}/>
    </section>
  );
}
const teamShape = React.PropTypes.shape({
  id: React.PropTypes.string.isRequired,
  logo: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.shape({
    current: React.PropTypes.number,
    halftime: React.PropTypes.number
  }),
})
GamecenterMatchboard.propTypes = {
  home: teamShape.isRequired,
  away: teamShape.isRequired,
  status: React.PropTypes.shape({
        code: React.PropTypes.string,
        display: React.PropTypes.string,
        type: React.PropTypes.string
    }).isRequired,
  className: React.PropTypes.string,
};
const GamecenterMatchboardTeam = ({id,name,logo,score,incidents=[],className='GamecenterMatchboardTeam'})=>{
  return <div className={c(className)}>
    <header>
      <div className={c(className+'-score')}>{score?score.current:'-'}</div>
      <div className={c(className+'-name')}>{name}</div>
    </header>
    {incidents?
    <ul className={c(className+'-scorers')}>
      {_.filter(incidents,incident=>incident.type=='goal'||incident.type=='own-goal').map(incident=>{
        return <li className={c(className+'-scorers-scorer')} key={JSON.stringify(incident)}>
          <span className={c(className+'-scorers-scorer-name')}>{incident.player.name}</span>
          <span className={c(className+'-scorers-scorer-time')}>'{incident.time}</span>
        </li>
      })}
    </ul>
    :null}
  </div>
}
GamecenterMatchboardTeam.propTypes = {
  id: React.PropTypes.string.isRequired,
  logo: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.shape({
    current: React.PropTypes.number,
    halftime: React.PropTypes.number
  }),
};


const GamecenterMatches = ({home,away,head2head=[],className=""})=>
  <section className={c("w-livegoals",className)}>
    <table>
    {head2head.length
      ?[<thead key="Head to Head title"><tr><th colSpan={"100%"}>{i18n.t('gamecenter.matches.head2head',{home:home.name,away:away.name})}</th></tr></thead>,
        <GamecenterMatchlist key="Head to Head" events={head2head} className={className}/>]
      :null}
    {/* Home Past 5 */}
    {home && 'latest_matches' in home && home.latest_matches.length
      ?[<thead key={home.name+" title"}><tr><th colSpan={"100%"}>{i18n.t('gamecenter.matches.recent',{team:home.name})}</th></tr></thead>,
        <GamecenterMatchlist key={home.name} events={home.latest_matches} className={className}/>]
      :null}
    {/* Away Past 5 */}
    {away && 'latest_matches' in away && away.latest_matches.length
      ?[<thead key={away.name+" title"}><tr><th colSpan={"100%"}>{i18n.t('gamecenter.matches.recent',{team:away.name})}</th></tr></thead>,
        <GamecenterMatchlist key={away.name} events={away.latest_matches} className={className}/>]
      :null}
    </table>
  </section>

const GamecenterMatchlist = ({events=[],title="",className=""})=>{
  return (
          <tbody>
            {events.map(({id, start_date, competition, home, away})=>
              <tr key={id}>
                <td className="date"
                  dangerouslySetInnerHTML={{__html:moment(new Date(start_date)).format('Do MMMM YYYY')}}></td>
                <td className="homename">{home.name}</td>
                <td className="homescore">{'score' in home && 'current' in home.score?home.score.current:"-"}</td>
                <td>:</td>
                <td className="awayscore">{'score' in away && 'current' in away.score?away.score.current:"-"}</td>
                <td className="awayname">{away.name}</td>
                <td>{competition.name}</td>
              </tr>
            )}
          </tbody>
  );
}


const GamecenterStatistics = ({home,away,className})=>{
  const statistics = 
  _.mapObject(
    _.groupBy(
      _.union(
        home.statistics.map(statistic=>{
          statistic.teamname = home.name;
          statistic.side = 'home';
          return statistic;
        }),
        away.statistics.map(statistic=>{
          statistic.teamname = away.name; 
          statistic.side = 'away';
          return statistic;
      })
      ),
      statistic=>statistic.code
    )
    ,(statisticArray,code)=>_.mapObject(
                              _.groupBy(statisticArray,statistic=>statistic.side),
                              val=>val[0]
                            )
  )
  return (
    <section className={className}>
      <table>
        <thead>
          <tr>
            <th colSpan='2'>
              {home.name}
            </th>
            <th></th>
            <th colSpan='2'>
              {away.name}
            </th>
          </tr>
        </thead>
        <tbody>
          {_.map(statistics,(statistic,code)=>{
            let total;
            if('home' in statistic && 'away' in statistic)
              total = statistic.home.value+statistic.away.value
            else if('home' in statistic)
              total = statistic.home.value
            else if('away' in statistic)
              total = statistic.away.value
            return (
              <tr key={code}>
                <td>
                  {'home' in statistic?statistic.home.value:0}
                </td>
                <td className="home barcell">
                  {total && 'home' in statistic
                  ?<div className="bar" style={{width:((statistic.home.value/total)*100)+'%'}}></div>
                  :null}
                </td>
                <td className="stattype">
                  {i18n.t('gamecenter.statistics.'+code)}
                </td>
                <td className="away barcell">
                  {total && 'away' in statistic
                  ?<div className="bar" style={{width:((statistic.away.value/total)*100)+'%'}}></div>
                  :null}
                </td>
                <td>
                  {'away' in statistic?statistic.away.value:0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  )
};

const GamecenterLineups = ({home,away,className})=>
  <section className={className}>
    {[home,away].map(team=>{
      if(!team.lineups)
        return null;
      const groupedLineup = _.mapObject(_.groupBy(team.lineups,({is_substitute,type})=>type == 'coach'?'coach':is_substitute?'substitute':'player'),(lineup)=>_.sortBy(lineup,'shirt_number'));
      if(!'incidents' in team)
        team.incidents = [];
      return  <table key={"lineup."+slug(team.name)}>
                <thead key="lineup.players.header"><tr><th></th><th>{team.name}</th></tr></thead>
                <GamecenterLineupsLineup key="lineup.players" className="players" lineup={groupedLineup.player} incidents={team.incidents}/>
                <thead key="lineup.substitutes.header"><tr><th></th><th>{i18n.t('gamecenter.lineup.substitutes')}</th></tr></thead>
                <GamecenterLineupsLineup key="lineup.substitutes" className="substitutes" lineup={groupedLineup.substitute} incidents={team.incidents}/>
                <thead key="lineup.coach.header"><tr><th></th><th>{i18n.t('gamecenter.lineup.coach')}</th></tr></thead>
                <GamecenterLineupsLineup key="lineup.coach" className="coach" lineup={groupedLineup.coach} incidents={team.incidents}/>
              </table>
    })
    }
  </section>

const GamecenterLineupsLineup = ({lineup=[],incidents=[],className=''})=>
  <tbody className={className}>
  {lineup.map(({id,name,shirt_number=null})=>{
    const hep = incidents.filter(incident=>{
      return 'player' in incident && 'name' in incident.player && incident.player.name==name
    })
    return <tr key={id}>
      <td key="number">{shirt_number}</td>
      <td key="name">{name}{hep.map(GamecenterLineupsLineupIncident)}</td>
    </tr>
  }
  )}
  </tbody>
const GamecenterLineupsLineupIncident = ({type,time})=>
  <span key={type+time}><i className={"w-livegoals-icon w-livegoals-icon-"+type}></i> {time}'</span>

const GamecenterCommentary = ({commentary, home, away, className})=>
  <section className={className}>
    <ul>
    {commentary.slice(0,4).map(({text='',time,additional_time=0,type,references=[]})=>
      <li key={_.findWhere(references,{type:'statustime'}).value} 
          className={c({
            home:!!_.findWhere(references,{type:'team',id:home.id}),
            away:!!_.findWhere(references,{type:'team',id:away.id})||!!!_.findWhere(references,{type:'team',id:home.id})
          })}>
        <span className='time'>
          {typeof time != "undefined"?"'"+(time+additional_time):null}
        </span>
        <span className='icon'>
          {CommentaryTypeToIcon(type,true)}
        </span>
        <span className='text'>
          {text}
        </span>
      </li>
    )}
    </ul>
    <table>
      <thead>
        <tr>
          <th colSpan="100%">
            {i18n.t('gamecenter.commentary.full')}
          </th>
        </tr>
      </thead>
      <tbody>
      {commentary.slice(4).map(({text='',time,additional_time=0,type,references=[]})=>
        <tr key={_.findWhere(references,{type:'statustime'}).value}>
          <td>
            {typeof time != "undefined"?"'"+(time+additional_time):null}
          </td>
          <td>
            {CommentaryTypeToIcon(type)}
          </td>
          <td>
            {text}
          </td>
        </tr>
      )}
      </tbody>
    </table>
  </section>

const CommentaryTypeToIcon = (type,invert=false)=>{
  let faIcon = "bullhorn";
  if(type=="goal")
    faIcon = "futbol-o";
  if(type=="substition")
    faIcon = "refresh";
  return  <span className="fa-stack">
    <i className={"fa fa-circle fa-stack-2x"+(!invert?" fa-inverse":"")}></i>
    <i className={"fa fa-"+faIcon+" fa-stack-1x"+(invert?" fa-inverse":"")}></i>
  </span>
}

const GamecenterOdds = React.createClass({
  componentDidMount(){
//    $(findDOMNode(this)).masonry({percentPosition: true});
  },
  render(){
    const {odds, status, className=''} = this.props;
    let allOffers = [];
    odds.forEach(bookmaker=>{
      allOffers = _.uniq(allOffers.concat(
        _.chain(bookmaker.offers)
         .values()
         .flatten()
         .map(offer=>{
            offer.bookmaker=bookmaker.name; 
            return offer;
          })
         .value()
      ),offer=>offer.id
      )
    });
    const activeOffers = _.filter(allOffers,(offer)=>{
      if(status.code == 'finished' && status.code == 'cancelled')
        return false;

      if(status.code !== 'finished' && status.code !== 'not-started' && status.code !== 'postponed' && status.code !== 'cancelled')
        return offer.in_play;

      if(/* status.code == 'finished' || */status.code == 'not-started')
        return !offer.in_play;
    })

    let desiredOddsTypes = [
        "ThreeWayOdds",
        "OverUnderOdds",
        "OddEvenOdds",
        "AsianHandicapOdds",
        "HalfTimeFullTimeOdds",
//        "CorrectScoreOdds",
//        "FirstGoalScorerOdds",
//        "LastGoalScorerOdds",
      ];

    let sections = _(activeOffers).chain().pluck('type').unique().filter(type=>_.contains(desiredOddsTypes,type)).sortBy(type=>(desiredOddsTypes.indexOf(type)+1)||99).value().map(type=>
        <div className={type}><GamecenterOddsTable offers={activeOffers} type={type} key={type} orientation={['CorrectScoreOdds','FirstGoalScorerOdds','LastGoalScorerOdds'].indexOf(type)>-1} key={type}/></div>
      );

    return <section className={className}>{sections}</section>
  }
});

const GamecenterOddsTable = React.createClass({
  getInitialState(){
    const {offers,type} = this.props;
    let filter = {};

    if(this.props.type == 'OverUnderOdds'){
      let defaultValue = 2.5;
      filter = { baseline: _(offers).chain().where({type}).pluck('baseline').unique().value().reduce((prev, curr)=>Math.abs(curr - defaultValue) < Math.abs(prev - defaultValue) ? curr : prev) };
    }
    if(this.props.type == 'AsianHandicapOdds'){
      let defaultValue = 1;
      filter = { handicap: _(offers).chain().where({type}).pluck('handicap').unique().value().reduce((prev, curr)=>Math.abs(curr - defaultValue) < Math.abs(prev - defaultValue) ? curr : prev) };
    }

    return {
      filter: filter
    }
  },
  setFilter: function(event){
    switch(this.props.type) {
      case 'OverUnderOdds':
        this.setState({filter: {baseline:parseFloat(event.target.value)}});
      break;
      case 'AsianHandicapOdds':
        this.setState({filter: {handicap:parseFloat(event.target.value)}});
      break;
    }
  },
  render(){
    const {offers,type,orientation=0} = this.props;
    const {filter} = this.state;

    const filteredOffers = _.where(offers,_.extend({type},filter))

    const bookmakers = _(filteredOffers).chain().pluck('bookmaker').unique().value();
    let tags = _(filteredOffers).chain().pluck('tag').unique().value();

    if(!tags || tags[0] == undefined)
      tags = _(filteredOffers).chain().pluck('name').unique().value();

    if(type=='CorrectScoreOdds')
      tags = _.sortBy(tags)

    let select = null;
    if(_(offers).chain().where({type}).pluck('baseline').unique().value().length>1){
      select =  <select onChange={this.setFilter} defaultValue={filter.baseline}>
                {_(offers).chain().where({type}).pluck('baseline').unique().sortBy().value().map(baseline=>
                  <option value={baseline} key={baseline}>
                    {baseline}{i18n.t('gamecenter.odds.'+type+'.optionSuffix',{defaultValue:''})}
                  </option>
                )}
                </select>
    }

    if(_(offers).chain().where({type}).pluck('handicap').unique().value().length>1){
      select =  <select onChange={this.setFilter} defaultValue={filter.handicap}>
                {_(offers).chain().where({type}).pluck('handicap').unique().sortBy().value().map(handicap=>
                    <option value={handicap} key={handicap}>
                      {i18n.t('gamecenter.odds.'+type+'.optionPrefix',{defaultValue:''})}
                      {handicap>0?'+':''}{handicap}
                      {i18n.t('gamecenter.odds.'+type+'.optionSuffix',{defaultValue:''})}
                    </option>
                )}
                </select>
    }

    if(orientation)
      return <table class>
        <thead>
          <tr>
            <th key={type}>
              {i18n.t('gamecenter.odds.'+type+'.title')} {select}
            </th>
            {bookmakers.map(bookmaker=><th key={slug(bookmaker)}>
              <img className="" style={{  maxHeight: '1.25em',verticalAlign: 'middle',  marginRight: '0.5em'}}
                   src={'http://www.livegoals.com/images/providers/'+slug(bookmaker)+'.png'}/>
               {bookmaker}
            </th>)}
          </tr>
        </thead>
        <tbody>
        {tags.map(tag=>{
          return <tr key={tag}>
            <th key={tag} style={{whiteSpace:'nowrap'}}>{i18n.t('gamecenter.odds.'+type+'.'+tag, {defaultValue: tag})}</th>
            {bookmakers.map(bookmaker=>{
              let offer = _.findWhere(filteredOffers,{bookmaker, tag}) || _.findWhere(filteredOffers,{bookmaker, name:tag});
              if(!offer)
                return <td key={slug(bookmaker)}></td>;
              return <td key={slug(bookmaker)}><Odds offer={offer} showBookmaker={false}/></td>
            })}
          </tr>
        })}
        </tbody>
      </table>

    return <table>
      <thead>
        <tr>
          <th key={type}>
            {i18n.t('gamecenter.odds.'+type+'.title')}
            {select}
          </th>
          {tags.map(tag=><th key={tag} style={{whiteSpace:'nowrap'}}>{i18n.t('gamecenter.odds.'+type+'.'+tag, {defaultValue: tag})}</th>)}
        </tr>
      </thead>
      <tbody>
      {bookmakers.map(bookmaker=>{
        return <tr key={slug(bookmaker)}>
          <th key="bookmaker">
            <img className="" style={{  maxHeight: '1.25em',verticalAlign: 'middle',  marginRight: '0.2em'}}
                 src={'http://www.livegoals.com/images/providers/'+slug(bookmaker)+'.png'}/>
             {bookmaker}
          </th>
          {tags.map(tag=>{
            let offer = _.findWhere(filteredOffers,{bookmaker, tag}) || _.findWhere(filteredOffers,{bookmaker, name:tag});
            if(!offer)
              return <td key={tag}></td>;
            return <td key={tag}><Odds offer={offer} showBookmaker={false}/></td>
          })}
        </tr>
      })}
      </tbody>
    </table>
  }
})
