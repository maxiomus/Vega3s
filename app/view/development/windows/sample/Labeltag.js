/**
 * Created by tech on 10/8/2014.
 */
Ext.define('Vega.view.development.windows.sample.Labeltag', {
    extend: 'Ext.window.Window',

    requires: [
        'Vega.view.development.windows.sample.LabeltagController',
        //'Vega.view.development.sample.windows.LabeltagModel'
        'Ext.ux.IFrame'
    ],

    alias: 'widget.windows-sample-labeltag',

    controller: "windows-sample-labeltag",
    /*
    viewModel: {
        type: "sample"
    },
    */

    title: 'Print Tag Label',

    minWidth: 400,
    //minHeight: window.innerHeight - 80,
    maxHeight: 600,

    closable: true,
    closeAction: 'destroy',

    bodyStyle: {
        background:'#fff',
        padding: '5px 0 0 2px'
    },

    resizable: false,
    modal: true,

    layout: {
        type: 'fit'
    },

    //loader: {
    //    url: 'PrintTag.aspx',
    //    autoLoad: false
    //},

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

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {

        });

        me.callParent(arguments);
    }
});
