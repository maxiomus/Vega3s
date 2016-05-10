
Ext.define("Vega.view.sales.Window",{
    extend: "Vega.view.BaseWindow",

    requires: [
        "Vega.view.sales.WindowController",
        "Vega.view.sales.WindowModel"
    ],

    controller: "sales-window",
    viewModel: {
        type: "sales-window"
    },

    layout: {
        type: 'fit'
    },

    title: 'New P.O.W',

    minHeight: 240,
    minWidth: 360,

    closable: true,
    maximizable: false,

    //closeAction: 'destroy',

    tools: [
        {
            type: 'pin'
        }
    ],

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            items:[{
                xtype: 'sales-edit-form'
            }]
        });

        me.callParent(arguments);
    },

    listeners: {
        //render: 'onRender',
        //destroy: 'onDestroy'
        resize: 'onResize'
    }
});
