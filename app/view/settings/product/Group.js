
Ext.define('Vega.view.settings.product.Group',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Vega.view.settings.product.GroupController',
        'Vega.view.settings.product.GroupModel',
        'Vega.model.Group'
    ],

    alias: 'widget.product-group',

    controller: 'product-group',
    viewModel: {
        stores: {
            groups: {
                model: 'Group',
                autoLoad: true,
                session: true,
                //autoSync: true,
                remoteFilter: true,
                remoteSort: true,
                pageSize: 0
            }
        }
    },

    session: true,

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'settings-grid',
                title: 'Group',
                //reference: 'grid',
                bind: {
                    store: '{groups}'
                },

                columns: me.buildColumns()
            }]
        });

        me.callParent(arguments);
    },

    buildColumns: function(){
        return [{
            text: "Code",
            dataIndex: "code",
            width: 140,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield',
                selectOnFocus: true,
                allowBlank: false
            }
        },
        {
            text: "Description",
            dataIndex: "description",
            flex: 1,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "Fabric Class",
            dataIndex: "fabric_class",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "User1",
            dataIndex: "user1",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },{
            text: "User2",
            dataIndex: "user2",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        }];
    }
});
