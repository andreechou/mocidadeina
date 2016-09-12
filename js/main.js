$(document).ready(function() {
  var cbpAnimatedHeader = (function() {

    var docElem = document.documentElement,
      header = $( '.nav_main-mobile' ),
      didScroll = false,
      changeHeaderOn = 72;

    function init() {
      window.addEventListener( 'scroll', function( event ) {
        if( !didScroll ) {
          didScroll = true;
          setTimeout( scrollPage, 250 );
        }
      }, false );
    }

    function scrollPage() {
      var sy = scrollY();
      if ( sy >= changeHeaderOn ) {
        $( '.nav_main-mobile' ).addClass('is-shrink');
        $( '.header_main' ).addClass('is-shrink');
      }
      else {
        $( '.nav_main-mobile' ).removeClass('is-shrink');
        $( '.header_main' ).removeClass('is-shrink');
      }
      didScroll = false;
    }

    function scrollY() {
      return window.pageYOffset || docElem.scrollTop;
    }

    init();

  })();
})