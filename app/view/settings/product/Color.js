
Ext.define('Vega.view.settings.product.Color',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Vega.view.settings.product.ColorController',
        'Vega.view.settings.product.ColorModel',
        'Vega.model.Color'
    ],

    alias: 'widget.product-color',

    //controller: 'product-color',
    viewModel: {
        stores: {
            colors: {
                model: 'Color',
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
                //reference: 'grid',
                title: 'Color',

                bind: {
                    store: '{colors}'
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
            text: "NRF",
            dataIndex: "nonInventory",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "EDI Description",
            dataIndex: "edi_descript",
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
            text: "PFD",
            dataIndex: "pfd",
            editor: {
                xtype: 'checkbox',
                inputValue: 'Y',
                uncheckedValue: 'N'
            }
        },
        {
            text: "Color Group",
            dataIndex: "colorGroup",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "Vendor",
            dataIndex: "vendor",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "Vendor Color Code",
            dataIndex: "vendor_code",
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
            text: "Active",
            dataIndex: "inactive_yn",
            editor: {
                xtype: 'checkbox',
                inputValue: 'Y',
                uncheckedValue: 'N'
            }
        },
        {
            text: "Created By",
            dataIndex: "cuser"
        },
        {
            text: "Created On",
            dataIndex: "updateDate"
        }];
    }
});
