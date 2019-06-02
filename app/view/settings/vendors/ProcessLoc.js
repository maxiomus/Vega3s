
Ext.define('Vega.view.settings.vendors.ProcessLoc',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Vega.view.settings.vendors.ProcessLocController',
        'Vega.view.settings.vendors.ProcessLocModel',
        'Vega.model.ProcessLoc'
    ],

    alias: 'widget.vendors-processloc',

    controller: 'vendors-processloc',
    viewModel: {
        stores: {
            locations: {
                model: 'ProcessLoc',
                autoLoad: true,
                session: true,
                //autoSync: false,
                remoteFilter: true,
                remoteSort: true,
                pageSize: 0
            },

            vendors: {
                fields: ["id", "text"],
                //storeId: 'customer',
                autoLoad: true,
                pageSize: 0,
                proxy: {
                    type: "ajax",
                    url: "/api/Combos/vendors",
                    reader: {
                        type: "json",
                        rootProperty: "data"
                    }
                }
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
                title: 'Process Location',

                bind: {
                    store: '{locations}'
                },

                columns: me.buildColumns()
            }]
        });

        me.callParent(arguments);
    },

    buildColumns: function(){
        var me = this;

        return [{
            text: "Code",
            dataIndex: "code",
            width: 140,
            editor: {
                xtype: 'textfield',
                selectOnFocus: true,
                allowBlank: false
                //disabled: rec ? !rec.phantom : false
            },
            filter: {
                type: "string",
                operator: 'st'
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
            text: "Vendor",
            dataIndex: "vendor",
            width: 200,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'combo',
                bind: {
                    store: '{vendors}'
                },
                //hideTrigger: true,
                pageSize: 0,
                valueField: "id",
                displayField: "id",
                matchFieldWidth: false,
                //forceSelection: false,
                //selectOnFocus: true,
                queryMode: 'local',
                minChars: 0,
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 340
                },
                plugins: [{
                    ptype: "cleartrigger"
                }]
            }
        },
        {
            text: "Lead Time",
            dataIndex: "leadtime",
            filter: {
                type: "number"
            },
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            text: "Cost",
            dataIndex: "price",
            filter: {
                type: "number"
            },
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            xtype: 'checkcolumn',
            text: "Auto PO Create",
            dataIndex: "po_autocreate",
            editor: {
                xtype: 'checkbox',
                inputValue: 1,
                uncheckedValue: 0
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
            xtype: 'checkcolumn',
            text: "Show Allowance",
            dataIndex: "show_allowance",
            editor: {
                xtype: 'checkbox',
                inputValue: 1,
                uncheckedValue: 0
            }
        },
        {
            xtype: 'checkcolumn',
            text: "Show In WIP",
            dataIndex: "show_in_wip",
            editor: {
                xtype: 'checkbox',
                inputValue: 1,
                uncheckedValue: 0
            }
        },
        {
            xtype: 'checkcolumn',
            text: "Receiving Location",
            dataIndex: "receiving_loc",
            editor: {
                xtype: 'checkbox',
                inputValue: 1,
                uncheckedValue: 0
            }
        }];
    }
});
