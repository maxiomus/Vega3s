
Ext.define('Vega.view.settings.view.dal.Default',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Vega.view.settings.view.dal.DefaultController',
        'Vega.view.settings.view.dal.DefaultModel'
    ],

    alias: 'widget.view-dal-default',

    /*
    controller: 'view-dal-default',
    viewModel: {
        type: 'view-dal-default'
    },
    */
    viewModel: {

    },

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'panel',
                title: 'Properties'
            },{
                xtype: 'panel',
                title: 'Mass Update',
                tbar: {
                    items: [{
                        text: ''
                    }]
                }
            }]
        });

        me.callParent(arguments);
    }
});
