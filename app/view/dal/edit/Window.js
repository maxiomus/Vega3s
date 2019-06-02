
Ext.define("Vega.view.dal.edit.Window", {
    extend: "Ext.window.Window",

    alias: 'widget.dal-edit-window',

    minHeight: 240,
    minWidth: 360,

    monitorResize: true,
    maximizable: true,
    constrain: true,
    closable: true,
    //scrollable: 'y',

    layout: {
        type: 'fit'
    },

    padding: 4,

    tools: [{
        type: 'pin'
    }],

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {

        });

        me.buttons = [{
            action: 'save',
            text: 'Save',
            formBind: true,
            //glyph: 86,
            iconCls: 'x-fa fa-save',
            handler: function(btn){
                me.fireEvent('saveclick', btn, me);
            }
        },{
            action: 'close',
            text: 'Close',
            //glyph: 88,
            iconCls: 'x-fa fa-close',
            handler: function(btn){
                btn.up('window').close();
            }
        }];

        me.callParent(arguments);
    }
});
