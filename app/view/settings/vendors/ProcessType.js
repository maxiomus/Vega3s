
Ext.define('Vega.view.settings.vendors.ProcessType',{
    extend: 'Ext.container.Container',

    requires: [
        'Vega.view.settings.vendors.ProcessTypeController',
        'Vega.view.settings.vendors.ProcessTypeModel'
    ],

    alias: 'widget.vendors-processtype',

    controller: 'vendors-processtype',
    viewModel: {
        type: 'vendors-processtype'
    },

    //referenceHolder: true,
    session: true,

    border: false,
    layout: 'border',

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {

            items: [{
                xtype: 'settings-grid',
                title: 'Process Type',
                //reference: 'grid',
                region: 'center',
                flex: 1,
                split: true,

                bind: {
                    //selection: '{theType}',
                    store: '{types}'
                },

                listeners: {
                    //select: 'onTypeRowSelect'
                },

                columns: me.buildTypeColumns()
            },{
                xtype: 'settings-grid',
                title: 'Process Sequence',
                reference: 'orderGrid',
                region: 'south',

                flex: 1,

                bind: {
                    store: '{grid.selection.orders}'
                },

                columns: me.buildOrderColumns()
            }]
        });

        me.callParent(arguments);

        var orderGrid = me.lookupReference('orderGrid'),
            topbar = orderGrid.lookupReference('topbar');

        topbar.items.items[0].setHidden(true);
        topbar.actions.save.setHidden(true);
    },

    buildTypeColumns: function(){
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
            width: 300,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "Cut/PO",
            dataIndex: "cut_po",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'combo',
                editable: false,
                queryMode: 'local',
                store: ['Cut', 'PO']
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
        },
        {
            xtype: 'checkcolumn',
            text: "House Only",
            dataIndex: "house_only",
            editor: {
                xtype: 'checkbox',
                inputValue: 'Y',
                uncheckedValue: 'N'
            }
        },
        {
            text: "Line Name 1",
            dataIndex: "line_name_1",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "Line Name 2",
            dataIndex: "line_name_2",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "Line Name 3",
            dataIndex: "line_name_3",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "Line Name 4",
            dataIndex: "line_name_4",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "Line Name 5",
            dataIndex: "line_name_5",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "Memo",
            dataIndex: "memo",
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
            text: "Wms Use",
            dataIndex: "wms_use",
            editor: {
                xtype: 'checkbox',
                inputValue: 1,
                uncheckedValue: 0
            }
        }];
    },

    buildOrderColumns: function(){
        var me = this;

        return [{
            text: 'ID',
            dataIndex: 'id',
            hidden: true
        },{
            text: "Seq",
            dataIndex: "orderNo",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "Line Location",
            dataIndex: "location",
            width: 200,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'combo',
                name: 'location',
                bind: {
                    store: '{processlocs}'
                },
                displayField: 'label',
                valueField: 'label',
                //typeAhead: false,
                hideLabel: true,
                //hideTrigger: false,
                forceSelection: true,
                matchFieldWidth: false,
                allowBlank: false,
                queryMode: 'local',
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 200
                },
                plugins: [{
                    ptype: "cleartrigger"
                }]
            }
        },
        {
            text: "GL Account/ GP Account",
            dataIndex: "account",
            width: 200,
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
