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

  // Console
  // console.log('---events');
  // console.log(events)

  // console.log('---information')
  // console.log(informations)

  // console.log('---getting')
  // console.log(events.feed.entry)
  // console.log(events.feed.entry[2].content)


  // Data Organizer
  
  events = []
  for (var i = 7; i <= eventsTemp.length - 1; i = i + 7) {
    events[(i-7)/7] = {}
    events[(i-7)/7][eventsTemp[0].content.$t] = eventsTemp[i].content.$t
    events[(i-7)/7][eventsTemp[1].content.$t] = eventsTemp[i+1].content.$t
    events[(i-7)/7][eventsTemp[2].content.$t] = eventsTemp[i+2].content.$t
    events[(i-7)/7][eventsTemp[3].content.$t] = eventsTemp[i+3].content.$t
    events[(i-7)/7][eventsTemp[4].content.$t] = eventsTemp[i+4].content.$t
    events[(i-7)/7][eventsTemp[5].content.$t] = eventsTemp[i+5].content.$t
    events[(i-7)/7][eventsTemp[6].content.$t] = eventsTemp[i+6].content.$t
  }
  console.log(events)

  informations = []
  for (var i = 4; i <= informationsTemp.length - 1; i = i + 4) {
    informations[(i-4)/4] = {}
    informations[(i-4)/4][informationsTemp[0].content.$t] = informationsTemp[i].content.$t
    informations[(i-4)/4][informationsTemp[1].content.$t] = informationsTemp[i+1].content.$t
    informations[(i-4)/4][informationsTemp[2].content.$t] = informationsTemp[i+2].content.$t
    informations[(i-4)/4][informationsTemp[3].content.$t] = informationsTemp[i+3].content.$t
  }
  console.log(informations)


  // Filters
  Vue.filter('content', function (value) {
    return marked(value.slice(5))
  })


  // Vue
  new Vue({
    el: '#app',
    data: {
      events: events,
      informations: informations
    }
  })
});