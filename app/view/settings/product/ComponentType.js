
Ext.define('Vega.view.settings.product.ComponentType',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Vega.view.settings.product.ComponentTypeController',
        'Vega.view.settings.product.ComponentTypeModel',
        'Vega.model.ComponentType'
    ],

    alias: 'widget.product-componenttype',

    controller: 'product-componenttype',
    viewModel: {
        stores: {
            comptypes: {
                model: 'ComponentType',
                autoLoad: true,
                session: true,
                //autoSync: false,
                remoteFilter: true,
                remoteSort: true,
                pageSize: 0
            }
        }
    },

    session: true,

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'settings-grid',
                title: 'Component Type',
                //reference: 'grid',
                bind: {
                    store: '{comptypes}'
                },

                columns: me.buildColumns()
            }]
        });

        me.callParent(arguments);
    },

    buildColumns: function(){
        return[{
            text: "Order",
            dataIndex: "typeOrder",
            filter: {
                type: "number"
            },
            editor: {
                xtype: 'numberfield'
            }
        },
        {
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
            dataIndex: "descript",
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
            xtype: 'checkcolumn',
            text: "Non Inventory Item",
            dataIndex: "nonInventory",
            width: 140,
            editor: {
                xtype: 'checkbox',
                inputValue: 'Y',
                uncheckedValue: 'N'
            }
        },
        {
            xtype: 'checkcolumn',
            text: "Non Actualized Item",
            dataIndex: "nonActualized",
            width: 140,
            editor: {
                xtype: 'checkbox',
                inputValue: 'Y',
                uncheckedValue: 'N'
            }
        },
        {
            text: "Bill Account",
            dataIndex: "account",
            width: 140,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "Cs2 Cat",
            dataIndex: "cs2Cat",
            width:140,
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
