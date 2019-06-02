
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

    maxTabWidth: 180,
    minTabWidth: 50,
    minWidth: 300,
    border: false,

    cls: 'viewer',

    tabBar: {
        defaults: {
            flex: 1, // if you want them to stretch all the way
            height: 36, // set the height,
            //padding: 6, // set the padding
            textAlign: 'left',
            width: '100%', // set the width for text ellipsis works when tab size smaller than text...
            border: true,
            style: {
                //border: '1px solid #ccc'
            }
        }
    },

    plugins: [{
        pluginId: 'tabclosemenu',
        ptype: 'tabclosemenu'
    },{
        pluginId: 'tabreorderer',
        ptype: 'tabreorderer'
    }
    /*{
        pluginId: 'tabscrollermenu',
        ptype: 'tabscrollermenu'
    }
    */
    ],

    listeners: {
        beforetabchange: 'onBeforeTabChange',
        tabchange: 'onTabChange'
    },

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});
