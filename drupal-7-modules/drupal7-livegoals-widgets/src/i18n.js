import i18next from "i18next";
import numeral from "numeral";

//let userLanguage = JSON.parse(document.getElementById("js-livegoals-schedule").dataset.config).language || window.navigator.userLanguage || window.navigator.language

export const i18n = i18next.init({
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
            "possession":"Possession",
            "cross":"Crosses",
            "corner":"Corner shots",
            "throwin":"Throw-ins",
            "blocked_shots":"Blocked Shots",
            "foulcommit":"Fouls",
            "pass":"Passes",
            "offside":"Offsides",
            "counter":"Counterattacks",
            "goalkick":"Goal kicks",
            "shoton":"Shots on",
            "goal":"Goals",
            "treatment":"Treatments",
            "shotoff":"Shots off",
            "red_cards":"Red Cards",
            "yellow_cards":"Yellow Cards",
            "subst":"Substitutions"
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
            },
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
