
Ext.define('Vega.view.settings.product.FabricContent',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Vega.view.settings.product.FabricContentController',
        'Vega.view.settings.product.FabricContentModel',
        'Vega.model.FabricContent'
    ],

    alias: 'widget.product-fabriccontent',

    controller: 'product-fabriccontent',
    viewModel: {
        stores: {
            contents: {
                model: 'FabricContent',
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

        //me.columns = me.buildColumns();

        Ext.applyIf(me, {
            items: [{
                xtype: 'settings-grid',
                title: 'Fabric Content',
                //reference: 'grid',
                bind: {
                    store: '{contents}'
                },

                listeners: {
                    select: function(vm, rec, idx){
                        //console.log(vm, rec);
                    }
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
