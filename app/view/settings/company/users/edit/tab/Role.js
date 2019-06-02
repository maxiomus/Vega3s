/**
 * Created by tech on 5/4/2015.
 */
Ext.define('Vega.view.settings.company.users.edit.tab.Role', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.layout.container.Form',
        'Ext.ux.form.ItemSelector'
    ],

    alias: 'widget.user-edit-role',

    title: 'Roles',

    layout: 'anchor',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {

            items: [
                {
                    xtype: 'itemselector',
                    name: 'Roles',
                    anchor: '100%',

                    store: Ext.create('Ext.data.Store', {
                        fields: ['id', 'text'],
                        autoLoad: true,
                        //remoteFilter: true,
                        proxy: {
                            type: 'ajax',
                            url: '/api/Combos/roles',
                            reader: {
                                type: 'json',
                                rootProperty: 'data'
                            }
                        }
                    }),
                    displayField: 'text',
                    valueField: 'id',
                    bind: {
                        value: '{theUser.Roles}'
                    },
                    allowBlank: false,
                    msgTarget: 'side',
                    fromTitle: 'Available Roles',
                    toTitle: 'Selected Roles',
                    buttons: [ 'add', 'remove' ],
                    delimiter: null
                }
            ]
        });

        me.callParent(arguments);
    }
});