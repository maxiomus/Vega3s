
Ext.define('Vega.view.settings.product.UOM',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Vega.view.settings.product.UOMController',
        'Vega.view.settings.product.UOMModel',
        'Vega.model.UOM'
    ],

    alias: 'widget.product-uom',

    controller: 'product-uom',
    viewModel: {
        stores: {
            uoms: {
                model: 'UOM',
                autoLoad: true,
                session: true,
                //autoSync: true,
                remoteFilter: true,
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
                title: 'U.O.M',
                //reference: 'grid',
                bind: {
                    store: '{uoms}'
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
        },
        {
            xtype: 'checkcolumn',
            text: "Default",
            dataIndex: "def",
            editor: {
                xtype: 'checkbox',
                inputValue: 'Y',
                uncheckedValue: 'N'
            }
        }];
    }
});
