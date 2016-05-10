
Ext.define("Vega.view.notice.Window", {
    extend: "Ext.window.Window",

    alias: 'widget.notice-window',

    requires: [
        "Vega.view.notice.WindowController",
        "Vega.view.notice.WindowModel",
        'Vega.view.notice.edit.Form'
    ],

    controller: "notice-window",
    viewModel: {
        type: "notice-window"
    },

    layout: {
        type: 'fit'
    },

    minHeight: 240,
    minWidth: 360,

    modal: true,
    closable: true,
    maximizable: true,

    //closeAction: 'destroy',

    tools: [
        {
            type: 'pin'
        }
    ],

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'notice-edit-form',
                listeners: {

                }
            }]
        });

        me.callParent(arguments);
    },

    listeners: {
        render: 'onRender',
        destroy: 'onDestroy'
    }
});
