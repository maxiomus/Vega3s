/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
// disable WAI-ARIA compatibility checks for buttons.
Ext.enableAriaButtons = false;

Ext.application({
    name: 'Vega',

    extend: 'Vega.Application',

    requires: [
        'Vega.view.main.Main'
    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    mainView: 'Vega.view.main.Main'
	
    //-------------------------------------------------------------------------
    // Most customizations should be made to Vega3s.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
