/*global $, xhi, mit */
// == BEGIN MODULE mit ===============================================
// Create root namespace map 'mit'
xhi._00_root_._makeInstanceFn_( 'mit' );
mit._extendSymbolMapFn_(
  'vMap',
  { _appendChild     : 'appendChild',
    _change_         : 'change',
    _charAt_         : 'charAt',
    _fadeOut_        : 'fadeOut',
    _fromCharCode_   : 'fromCharCode',
    _gevent_         : 'gevent',
    _get_            : 'get',
    _hide_           : 'hide',
    _keypress_       : 'keypress',
    _keydown_        : 'keydown',
    _localStorage_   : localStorage,
    _preventDefault_ : 'preventDefault',
    _publish_        : 'publish',
    _remove_         : 'remove'
  }
);
// == . END MODULE mit ===============================================
