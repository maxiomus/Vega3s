
Ext.define('Vega.view.production.Addition',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Vega.view.production.AdditionController',
        'Vega.view.production.AdditionModel'
    ],

    alias: 'widget.prod-add',

    controller: 'prod-add',
    viewModel: {
        type: 'prod-add'
    },

    defaults: {
        //bodyPadding: 10,
        scrollable: true,
        border: false
    },

    tabBar: {
        defaults: {
            //flex: 1, // if you want them to stretch all the way
            height: 28, // set the height,
            //padding: 6, // set the padding
            //margin: '0 4 0 0',
            //textAlign: 'left',
            border: true,
            style: {
                //border: '1px solid #ccc'
            }
        }
    },

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'prod-task',
                    title: 'Tasks'
                }
            ]
        });

        me.callParent(arguments);
    }
});
