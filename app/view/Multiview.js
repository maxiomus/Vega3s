/**
 * Created by tech on 3/8/2016.
 */
Ext.define('Vega.view.Multiview', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Vega.view.MultiviewController',
        'Vega.view.MultiviewModel'
    ],

    alias: 'widget.multiview',

    controller: "multiview",
    viewModel: {
        type: "multiview"
    },

    layout:{
        type: "border"
    },

    defaultType: "container",
    defaults: {
        layout: "fit"
    },

    mainItems: null,
    displayItems: null,

    initComponent: function(){
        var me = this;

        Ext.applyIf(me,{
            items: [{
                layout: {
                    type: "card"
                },
                region: "center",
                reference: "center",
                defaultType: "container",
                flex: 2,
                minHeight: 300,
                minWidth: 300,
                items: me.mainItems
            },{
                layout: "fit",
                reference: "preview",
                plugins: "responsive",
                responsiveConfig: {
                    "wide || width >= 960":{
                        region: "east"
                    },
                    "tall || width < 960":{
                        region: "south"
                    }
                },

                border: false,
                split: true,
                flex: 1,
                hidden: true,
                minWidth: 150,
                items: me.displayItems
            }]
        });

        me.callParent(arguments);
    },

    applyMainItems: function(c){
        var me = this;
        me.lookupReference("center").add(c)
    },

    applyDisplayItems: function(c){
        var me = this;
        me.lookupReference("preview").add(c)
    }
});
