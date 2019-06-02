
Ext.define("Vega.view.company.notice.edit.Form",{
    extend: "Ext.form.Panel",

    alias: 'widget.notice-edit-form',

    requires: [
        "Vega.view.company.notice.edit.FormController",
        "Vega.view.company.notice.edit.FormModel",
        'Vega.view.company.notice.edit.Upload'
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
    hasUpload: true,
    //enctype: 'multipart/form-data',

    /*
    buttons: [{
        action: 'save',
        //itemId:'btnSave',
        text: 'Save',
        formBind: true,
        //glyph: 86,
        iconCls: 'x-fa fa-save',
        handler: function(btn){

        }
    },{
        action: 'close',
        //itemId:'btnClose',
        text: 'Close',
        //glyph: 88,
        iconCls: 'x-fa fa-close',
        handler: function(btn){
            var win = btn.up('window');
            if(win){
                win.close();
                //console.log(this.getWindow());
            }
        }
    }],
    */
    initComponent: function(){
        var me = this,
            padding = 0,
            fieldHeight = 20,
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
                    name: 'Title',
                    bind: {
                        value: '{thePost.Title}'
                    },
                    fieldLabel: 'Title',
                    allowBlank: false,
                    anchor: '100%'
                },{
                    xtype: 'textfield',
                    name: 'Link',
                    fieldLabel: 'Link',
                    anchor: '100%',
                    hidden: true,
                    bind: {
                        value: '{thePost.Link}'
                    }
                },{
                    xtype: 'textfield',
                    name: 'Author',
                    fieldLabel: 'Author',
                    anchor: '100%',
                    hidden: true,
                    bind: {
                        value: '{thePost.Author}'
                    }
                },{
                    xtype: 'datefield',
                    name: 'CreatedOn',
                    fieldLabel: 'Created',
                    anchor: '100%',
                    readOnly: true,
                    hidden: true,
                    bind: {
                        value: '{thePost.CreatedOn}'
                    }
                },{
                    xtype: 'datefield',
                    name: 'UpdatedOn',
                    fieldLabel: 'Updated',
                    anchor: '100%',
                    readOnly: true,
                    hidden: true,
                    bind: {
                        value: '{thePost.UpdatedOn}'
                    }
                },{
                    xtype: 'htmleditor',
                    name: 'Description',
                    bind: {
                        value: '{thePost.Description}'
                    },
                    fieldLabel: 'Description',
                    anchor: '100% -' + remainingHeight
                }]
            },{
                xtype: 'notice-edit-upload',
                bind: {
                    store: '{thePost.filesInArticles}'
                },
                anchor: '100% 50%'
            }]
        });

        me.callParent(arguments);
    }
});
