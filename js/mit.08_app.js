/*
 * mit.08.app.js
 * @author Michael S. Mikowski - mike.mikowski@gmail.com
 * @updated Leonard K. Fiadzinu
 *
 * M!T - Minorities In Technology wip convert to xhi instances instead of modules.
 * Version 02 replaces the _css_ module with PowerCSS
 *
*/
/*global mit, $*/
// == BEGIN MODULE mit ================================================
(function () {
  // == BEGIN MODULE SCOPE VARIABLES ===================================
  'use strict';
  var
    libList = [
      'js/vendor/pcss-1.4.2.js',
      'js/vendor/pcss.cfg-1.4.2.js',
      'js/vendor/jquery-3.2.1.js',
      'js/plugin/jquery.deferred.whenAll-1.0.0.js',
      'js/vendor/jquery.event.gevent-1.1.6.js',
      'js/vendor/jquery.event.ue-1.3.2.js',
      'js/vendor/jquery.urianchor-1.3.5.js',

      // Arch libs
      'js/xhi/00_root.js',
      'js/xhi/01_util.js',
      // 'js/xhi/02_data.js',      // custom
      // 'js/xhi/02_fake.js',      // not used currently
      // 'js/xhi/03_model.js',     // custom
      'js/xhi/04_utilb.js',
      'js/xhi/05_css_base.js',
      'js/xhi/05_css_lb.js',
      // 'js/xhi/05_css_shell.js', // custom
      // 'js/xhi/06_css.js',       // custom
      'js/xhi/06_lb.js',
      // 'js/xhi/07_shell.js',     // custom

      // App libs
      'js/mit.00_root.js',
      'js/mit.01_util.js',
      'js/mit.02_data.js',
      'js/mit.03_model.js',
      'js/mit.04_utilb.js',
      'js/mit.05_css_base.js',
      'js/mit.05_css_lb.js',
      'js/mit.06_css.js',
      'js/mit.06_lb.js',
      'js/mit.07_shell.js'
    ],
    libCount    = libList.length,
    loadCount   = 0,
    loadDelayMs = 100,

    $, scriptObj, libIdx, libSrcStr;
  // == . END MODULE SCOPE VARIABLES ===================================
  function startAppFn () {
    mit._07_shell_._initModuleFn_();
  }

  function testLoadFn() {
    if ( window.$ ) {
      $ = window.$;
      $( startAppFn );
    }
    else {
      console.warn( 'reload...' );
      setTimeout( testLoadFn, loadDelayMs );
      loadDelayMs *= 1.5;
    }
  }

  function onLoadFn() {
    loadCount++;
    if ( loadCount === libCount ) { testLoadFn(); }
  }

  for ( libIdx = 0; libIdx < libCount; libIdx++ ) {
    libSrcStr = libList[ libIdx ];
    scriptObj        = document.createElement( 'script' );
    scriptObj.type   = 'text/javascript';
    scriptObj.async  = false;
    scriptObj.src    = libSrcStr;
    scriptObj.onload = onLoadFn;
    document.head.appendChild( scriptObj );
  }
}());
