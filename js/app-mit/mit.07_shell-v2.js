/*global $, mit, Audio*/
// == BEGIN MODULE mit._07_shell_ ====================================
mit._07_shell_ = (function () {
 // == BEGIN MODULE SCOPE VARIABLES ==================================
  'use strict';
  var
    aMap     = mit,
	aKey     = aMap._aKey_,
	
	nMap     = aMap._nMap_,
	vMap     = aMap._vMap_,
	
	__0      = nMap._0_,
	
	__Str     = vMap._String_,
	__setTo   = vMap._setTimeoutFn_,
	__$sub    = $[ vMap._gevent_ ][ vMap._subscribe_ ],
	
	__util    = aMap._01_util_,
    //__logObj  = __util._getLogObj_(),
    //__logMsg  = __logObj._logMsg_,
    __p       = __util._makeReplaceFn_( '_p_', aKey ),
	
	configMap = {
		anchor_schema_map : {
			// example using chat
			// chat : { opened : true, closed : true }
			page : { aboutus : true, companies : true, events : true, community : true }
			//_page: {},
		},
		_main_tmplt_  : __p(
		  '<!-- start main shell header section -->'
		+ '<div class="{_p_}-main-shell-header">'
		  + '<div class="{_p_}-main-shell-logo"></div>'
		  + '<div class="{_p_}-main-shell-nav"></div>'
		+ '</div>'
		+ '<!-- end main shell header section -->'
		+ '<!-- start main shell content section -->'
		+ '<div class="{_p_}-main-shell-content"></div>'
		+ '<!-- end main shell content section -->'
		+ '<!-- start main shell footer -->'
		+ '<div class="{_p_}-main-shell-footer"></div>'
		)
	},
	stateMap = {
		$container  :  undefined,
		anchor_map  : {}
	},
	jqueryMap = {},
        $Map,
	
	copyAnchorMap, setJqueryMap, changeAnchorPart,
	onResize, onHashchange,
	setSiteAnchor, initModule;
//----------------- END MODULE SCOPE VARIABLES ---------------
	
//------------------- BEGIN UTILITY METHODS ------------------
// Returns copy of stored anchor map; minimizes overhead
copyAnchorMap = function () {
	return $.extend( true, {}, stateMap.anchor_map;
};
//-------------------- END UTILITY METHODS -------------------

//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
	var $container = stateMap.$container;
	
	jqueryMap = {
		$container  : $container,
		$nav        : $container.find( '{_p_}-main-shell-nav' )	
	};
};
// End DOM method /setJqueryMap/  

  // Begin DOM method /changeAnchorPart/
  // Purpose    : Changes part of the URI anchor component
  // Arguments  :
  //   * arg_map - The map describing what part of the URI anchor
  //     we want changed.
  // Returns    :
  //   * true  - the Anchor portion of the URI was updated
  //   * false - the Anchor portion of the URI could not be updated
  // Actions    :
  //   The current anchor rep stored in stateMap.anchor_map.
  //   See uriAnchor for a discussion of encoding.
  //   This method
  //     * Creates a copy of this map using copyAnchorMap().
  //     * Modifies the key-values using arg_map.
  //     * Manages the distinction between independent
  //       and dependent values in the encoding.
  //     * Attempts to change the URI using uriAnchor.
  //     * Returns true on success, and false on failure.
  //
  
  changeAnchorPart = function ( arg_map ) {
	  var
	    anchor_map_revise = copyAnchorMap(),
		bool_return       = true,
		key_name, key_name_dep;
		
		// Begin merge changes into anchor map
		KEYVAL:
		for ( key_name in arg_map ) {
			if ( arg_map.hasOwnProperty( key_name ) ) {
				
				//skip dependent keys during iteration
				if ( key_name.indexOf( '_' ) === 0 ) { continue KEYVAL; }
				
				// update independent key value
				anchor_map_revise[key_name] = arg_map[key_name];
				
				// update matching dependent key
				key_name_dep = '_' + key_name;
				if ( arg_map[ key_name_dep ] ) {
					anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
				}
				else {
					delete anchor_map_revise[key_name_dep];
					delete anchor_map_revise['_s' + key_name_dep];
				}
			}
		}
		// End merge changes into anchor map

        // Begin attempt to update URI; revert if not successful
		try {
			$.uriAnchor.setAnchor( anchor_map_revise );
		}
		catch ( error ) {
			// replace URI with exiting state
			$.uriAnchor.setAnchor( stateMap.anchor_map, null, true );
			bool_return = false;
		}
		// End attempt to update URI...
		
		return bool_return;
  };
  
  // End DOM method /changeAnchorPart/
  //--------------------- END DOM METHODS ----------------------
  
  //------------------- BEGIN EVENT HANDLERS -------------------
  
  // Begin Event handler /onHashchange/
  // Purpose    : Handles the hashchange event
  // Arguments  :
  //   * event - jQuery event object.
  // Settings   : none
  // Returns    : false
  // Actions    :
  //   * Parses the URI anchor component
  //   * Compares proposed application state with current
  //   * Adjust the application only where proposed state
  //     differs from existing and is allowed by anchor schema
  //
  
  onHashchange = function ( event ) {
	  var
	    _s_nav_previous, _s_nav_proposed, s_nav_proposed,
		anchor_map_proposed,
		is_ok = true,
		anchor_map_previous = copyAnchorMap();
		
		//attempt to parse anchor
		try { anchor_map_proposed = $.uriAnchor.makeAnchorMap(); }
		catch ( error ) {
			$.uriAnchor.setAnchor( anchor_map_previous, null, true );
			return false;
		}
		stateMap.anchor_map = anchor_map_proposed;
		
		// convenience vars
		_s_nav_previous = anchor_map_previous._s_nav;
		_s_nav_proposed = anchor_map_proposed._s_nav;
		
		// begin adjust nav component if changed
		if ( ! anchor_map_previous 
		  || _s_nav_previous !== _s_nav_proposed
		) {
			s_nav_proposed = anchor_map_proposed.nav;
			switch ( s_nav_proposed ) {
				case 'aboutus' :
				  is_ok = mit.nav.setNavPosition( 'aboutus' );
				break;
				case 'companies' :
				  is_ok = mit.nav.setNavPosition( 'companies' );
				break;
				default :
				  mit.nav.setNavPosition( 'home' );
				  delete anchor_map_proposed.nav;
				  $.uriAnchor.setAnchor( anchor_map_proposed, null, true );
			}
		}
		// End adjust nav component if changed
	  // Begin revert anchor if slider chanbe denied
	  if ( ! is_ok ) {
		  if ( anchor_map_previous ) {
			  $.uriAnchor.setAnchor( anchor_map_previous, null, true );
			  stateMap.anchor_map = anchor_map_previous;
		  }
		  else {
			  delete anchor_map_proposed.nav;
			  $.urinchor.setAnchor( anchor_map_proposed, null, true );
		  }
	  }
	  // End revert anchor if nave change denied
	  return false;
  };
// End Event handler /onHashchange/

//---------------------- BEGIN CALLBACKS ---------------------
// Begin callback method /setNavAnchor/

setSiteAnchor = function ( position_type ) {
  return changeAnchorPart({ nav : position_type });
};
	
// End callback method /setNavAnchor/
//----------------------- END CALLBACKS ----------------------
	
//------------------- BEGIN PUBLIC METHODS -------------------
	
//------------------- END PUBLIC METHODS ---------------------
	
}());
// == . END MODULE mit._07_shell_ ====================================
