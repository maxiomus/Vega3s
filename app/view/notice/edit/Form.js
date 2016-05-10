
Ext.define("Vega.view.notice.edit.Form",{
    extend: "Ext.form.Panel",

    alias: 'widget.notice-edit-form',

    requires: [
        "Vega.view.notice.edit.FormController",
        "Vega.view.notice.edit.FormModel",
        'Vega.view.notice.edit.Upload'
    ],

    controller: "notice-edit-form",
    viewModel: {
        type: "notice-edit-form"
    },

    trackResetOnLoad: true,

    layout: {
        type: 'anchor'
    },

    bodyPadding: 5,

    buttons: [{
        action: 'save',
        //itemId:'btnSave',
        text: 'Save',
        formBind: true,
        //glyph: 86,
        iconCls: 'fa fa-save',
        handler: function(btn){

        }
    },{
        action: 'close',
        //itemId:'btnClose',
        text: 'Close',
        //glyph: 88,
        iconCls: 'fa fa-close',
        handler: function(btn){
            var win = btn.up('window');
            if(win){
                win.close();
                //console.log(this.getWindow());
            }
        }
    }],

    initComponent: function(){
        var me = this,
            padding = 0,
            fieldHeight = 17,
            remainingHeight = padding + fieldHeight * 3;

        Ext.applyIf(me, {
            items:[{
                xtype: 'container',
                layout: 'anchor',
                anchor: '100% 50%',
                defaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    msgTarget: 'qtip'
                },
                items: [{
                    xtype: 'textfield',
                    dataIndex: 'Title',
                    fieldLabel: 'Title',
                    anchor: '100%'
                },{
                    xtype: 'htmleditor',
                    dataIndex: 'Description',
                    fieldLabel: 'Description',
                    anchor: '100% -' + remainingHeight
                }]
            },{
                xtype: 'notice-edit-upload',
                anchor: '100% 50%'
            }]
        });

        me.callParent(arguments);
    }
});
