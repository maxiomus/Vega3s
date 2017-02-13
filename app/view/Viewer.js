
Ext.define("Vega.view.Viewer",{
    extend: "Ext.tab.Panel",

    requires: [
        'Vega.view.ViewerController',
        'Vega.view.ViewerModel',
        'Vega.view.Multiview',
        'Ext.ux.TabCloseMenu',
        'Ext.ux.TabScrollerMenu',
        'Ext.ux.TabReorderer'
    ],

    alias: 'widget.viewer',

    controller: "viewer",
    viewModel: {
        type: "viewer"
    },

    maxTabWidth: 230,
    minTabWidth: 160,
    minWidth: 300,
    border: false,

    cls: 'viewer',

    tabBar: {
        defaults: {
            //flex: 1, // if you want them to stretch all the way
            height: 36, // set the height,
            //padding: 6, // set the padding
            textAlign: 'left',
            border: true,
            style: {
                border: '2px solid #ccc'
            }
        }
    },

    plugins: [{
        pluginId: 'tabclosemenu',
        ptype: 'tabclosemenu'
    },{
        pluginId: 'tabscrollermenu',
        ptype: 'tabscrollermenu'
    },{
        pluginId: 'tabreorderer',
        ptype: 'tabreorderer'
    }],

    listeners: {
        tabchange: 'onTabChange'
    },

    initComponent: function() {
        var me = this;
        //console.log('Viewer - initComponent');

        Ext.applyIf(me, {

        });

        me.callParent(arguments);
    }
});
