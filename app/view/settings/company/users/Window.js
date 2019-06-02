
Ext.define("Vega.view.settings.company.users.Window", {
    extend: 'Ext.window.Window',

    requires: [
        'Vega.view.settings.company.users.edit.tab.Detail',
        'Vega.view.settings.company.users.edit.tab.Role'
        //'Vega.view.settings.users.edit.Form'
    ],

    alias: 'widget.user-window',

    /*header: {
     title: 'Create User',
     iconCls: 'icon-upload',
     titlePosition: 0,
     titleAlign: 'left'
     },*/

    layout: {
        type: 'fit'
    },

    minHeight: 240,
    minWidth: 360,

    modal: true,
    closable: true,
    //closeAction: 'destroy',
    session: true,

    tools: [{
        type: 'pin'
    }],

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                reference: 'form',
                trackResetOnLoad: true,
                items: [{
                    xtype: 'tabpanel',
                    bodyPadding: 5,
                    deferredRender: false,
                    items: [{
                        xtype: 'user-edit-detail',
                        title: 'Details'
                    },
                    {
                        xtype: 'user-edit-role',
                        title: 'Roles'
                    }]
                }],
                buttons: [{
                    xtype: 'button',
                    itemId:'btnSave',
                    text: 'Save',
                    formBind: true,
                    //iconCls: 'icon-disk'
                    glyph: 'xf00c@FontAwesome',
                    handler: 'onWinSaveClick'
                },
                {
                    xtype: 'button',
                    itemId:'btnClose',
                    text: 'Close',
                    //iconCls: 'icon-close'
                    glyph: 'xf00d@FontAwesome',
                    handler: 'onWinCloseClick'
                }]
            }]
        });

        me.callParent(arguments);
    }
});