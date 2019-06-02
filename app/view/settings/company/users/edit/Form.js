
Ext.define("Vega.view.settings.company.users.edit.Form", {
    extend: 'Ext.form.Panel',

    requires: [
        'Vega.view.settings.company.users.edit.tab.Detail',
        'Vega.view.settings.company.users.edit.tab.Role'
    ],

    alias: 'widget.user-edit-form',

    trackResetOnLoad: true,

    //bodyPadding: 10,

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 100,
        msgTarget: 'qtip'
    },

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
    }],

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
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
                }
            ]
        });

        me.callParent(arguments);
    }
});