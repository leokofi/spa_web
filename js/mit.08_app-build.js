/*
 * ex01-build.js
 * Example 01 application using xhi instances instead of modules.
 * This BUILD version excludes sources.
 *
 * Michael S. Mikowski - mike.mikowski@gmail.com
 * updated: Leonard K. Fiadzinu
*/
/*global $, mit */
$(function () {
  'use strict';
  mit._07_shell_._initModuleFn_();
  mit._06_lb_._showLbFn_({
    _title_html_ : 'Welcome to M!T - Minorities In Technology!',
    _content_html_ :
      '<p>Connection Minorities in the Technology</p>'

      + '<p>Click anywhere outside this lightbox to close it. '
      + 'Then click on the pulldown at the top-right to select a level.'
      + 'The game will begin. Type to remove bombs from the screen.</p>'

      + '<p>The levels have been researched and designed to progressively '
      + 'emphasize important fingering.</p>'
  });
});
