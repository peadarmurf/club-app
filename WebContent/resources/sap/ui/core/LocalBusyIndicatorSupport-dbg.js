/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides helper sap.ui.core.LocalBusyIndicatorSupport
jQuery.sap.declare("sap.ui.core.LocalBusyIndicatorSupport");

/**
 * This class is only here for compatibility reasons. LBI works automatically with all controls
 * 
 * @returns {sap.ui.core.LocalBusyIndicatorSupport}
 * @constructor
 * @private
 * @deprecated
 */
sap.ui.core.LocalBusyIndicatorSupport = function() {
	// "this" is the prototype now when called with apply()

	// Ensure only Element prototype is enhanced
	if (this === sap.ui.core.Control.prototype) {

		/**
		 * This function set the delay until the BusyIndicator is being shown
		 * 
		 * @private
		 * @param iDelay
		 */
		this.setDelay = function(iDelay) {
			this.setBusyIndicatorDelay(iDelay);
		};
		
	} else {
		jQuery.sap.log.error("Only controls can use the LocalBusyIndicator", this);
	}
};

//moved here to fix the cyclic dependency LocalBusyIndicatorSupport, Element, control
jQuery.sap.require("sap.ui.core.Element");
