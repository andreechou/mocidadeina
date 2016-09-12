calURL = "https://spreadsheets.google.com/feeds/cells/1JTPZR7JxwxoMQVfaZ7QXrPfYAEWa5oy4w9AkQ3NmPnc/1/public/basic?alt=json"
infoURL = "https://spreadsheets.google.com/feeds/cells/1JTPZR7JxwxoMQVfaZ7QXrPfYAEWa5oy4w9AkQ3NmPnc/2/public/basic?alt=json"

$.when(
  $.getJSON( calURL, function( data ) {
    eventsTemp = data.feed.entry
  }),
  $.getJSON( infoURL, function( data ) {
    informationsTemp = data.feed.entry
  })
).then(function() {

  // Data Organizer
  
  eventsNum = 7;
  events = []
  for (var i = 7; i <= eventsTemp.length - 1; i = i + 7) {
    events[(i-eventsNum)/eventsNum] = {}
    for(var j = 0; j <= eventsNum - 1; j++) {
      if(eventsTemp[i+j].content.$t == '[empty]') {
        events[(i-eventsNum)/eventsNum][eventsTemp[j].content.$t] = ''
      } else {
        events[(i-eventsNum)/eventsNum][eventsTemp[j].content.$t] = eventsTemp[i+j].content.$t
      }
    }
  }
  console.log(events)
  infoNum = 6
  informations = []
  for (var i = infoNum; i <= informationsTemp.length - 1; i = i + infoNum) {
    informations[(i-infoNum)/infoNum] = {}
    for(var j = 0; j <= infoNum - 1; j++) {
      if(informationsTemp[i+j].content.$t == '[empty]') {
        informations[(i-infoNum)/infoNum][informationsTemp[j].content.$t] = ''
      } else {
        informations[(i-infoNum)/infoNum][informationsTemp[j].content.$t] = informationsTemp[i+j].content.$t
      }
    }
  }
  console.log(informations)

  // Vue

  var App = Vue.extend({})

  // Pages

  var pgEventos = Vue.extend({
    template: '#pgEventos',
    data: function() {
      return {
        events: events
      }
    }
  })

  var pgEvento = Vue.extend({
    template: '#pgEvento',
    data: function() {
      return {
        events: events
      }
    }
  })

  var pgInformacoes = Vue.extend({
    template: '#pgInformacoes',
    data: function() {
      return {
        informations: informations
      }
    }
  })

  var pgInformacao = Vue.extend({
    template: '#pgInformacao',
    data: function() {
      return {
        informations: informations
      }
    }
  })

  var pgPrint = Vue.extend({
    template: '#pgPrint'
  })

  var pgPrintMonth = Vue.extend({
    template: '#pgPrintMonth',
    data: function() {
      return {
        events: events
      }
    }
  })

  var pgPrintDay = Vue.extend({
    template: '#pgPrintDay',
    data: function() {
      return {
        events: events
      }
    }
  })

  // Filters

  Vue.filter('content', function (value) {
    return marked(value)
  })

  Vue.filter('map', function (value) {
    return value.replace('width="600" height="450"', 'width="100%" height="240"')
  })

  // Router

  var router = new VueRouter()

  router.map({
    '/events': {
      component: pgEventos
    },
    '/events/:id': {
      component: pgEvento,
      name: 'event'
    },
    '/infos': {
      component: pgInformacoes
    },
    '/infos/:id': {
      component: pgInformacao,
      name: 'information'
    },
    '/print': {
      component: pgPrint
    },
    '/print/month': {
      component: pgPrintMonth
    },
    '/print/day': {
      component: pgPrintDay
    }
  })

  router.redirect({
    '*': '/events'
  })

  router.start(App, '#app')

});