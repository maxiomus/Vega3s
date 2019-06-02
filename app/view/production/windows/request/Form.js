
Ext.define('Vega.view.production.windows.request.Form',{
    extend: 'Ext.window.Window',

    alias: 'widget.windows-request-form',

    requires: [
        'Vega.view.production.windows.request.FormController',
        'Vega.view.production.windows.request.FormModel',
        'Ext.ux.IFrame'
    ],

    controller: 'windows-request-form',
    viewModel: {
        type: 'windows-request-form'
    },

    layout: {
        type: 'fit'
    },

    padding: '0 10 10 10',

    minWidth: 720,
    minHeight: 400,
    //modal: true,
    monitorResize: true,
    maximizable: true,
    constrain: true,
    closable: true,

    header: {
        title: 'Production Request Form',
        iconCls: 'x-fa fa-tags',
        titlePosition: 0,
        titleAlign: 'left'
    },

    bind: {
        title: '{title}'
    },

    buttons: [{
        xtype: 'button',
        action: 'print',
        itemId:'btnPrint',
        text: 'Print',
        iconCls: 'x-fa fa-print',
        //glyph: 'xf00c@FontAwesome'
        handler: 'onPrintClick',
        scope: this.controller
    },
    {
        xtype: 'button',
        action: 'close',
        itemId: 'btnClose',
        text: 'Close',
        iconCls: 'x-fa fa-close',
        //glyph: 'xf00d@FontAwesome'
        handler: function(btn, e){
            btn.up('window').close();
        }
    }],

    initComponent: function(w){
        var me = this;

        Ext.applyIf(me, {

        });

        me.callParent(arguments);
    }
});
