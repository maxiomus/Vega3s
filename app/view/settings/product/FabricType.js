
Ext.define('Vega.view.settings.product.FabricType',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Vega.view.settings.product.FabricTypeController',
        'Vega.view.settings.product.FabricTypeModel',
        'Vega.model.FabricType'
    ],

    alias: 'widget.product-fabrictype',

    controller: 'product-fabrictype',
    viewModel: {
        stores: {
            types: {
                model: 'FabricType',
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

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'settings-grid',
                title: 'Fabric Type',
                //reference: 'grid',
                bind: {
                    store: '{types}'
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
            dataIndex: "descript",
            flex: 1,
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
