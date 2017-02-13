
Ext.define("Vega.view.notice.edit.Window", {
    extend: "Ext.window.Window",

    requires: [
        'Vega.view.notice.edit.Upload'
    ],

    alias: 'widget.notice-window',

    layout: {
        type: 'fit'
    },

    minHeight: 240,
    minWidth: 360,

    monitorResize: true,
    maximizable: true,
    //alwaysOnTop: true,
    constrain: true,
    //maximized: true,
    closable: true,
    scrollable: 'y',

    tools: [{
        type: 'pin'
    }],

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'notice-edit-form'
            }]
        });

        me.callParent(arguments);
    }
});
