Ext.define('Vega.view.sales.edit.TaggingWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Vega.view.sales.edit.Tagging'
    ],

    alias: 'widget.edit-tagging',

    controller: 'edit-tagging',
    viewModel: {
        type: 'edit-tagging'
    },

    bind: {
        title: '{title}'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    //modal: true,
    monitorResize: true,
    maximizable: true,
    //alwaysOnTop: true,
    constrain: true,
    //maximized: true,
    closable: true,
    scrollable: true,
    padding: 10,

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {

        });

        me.callParent();
    }
})