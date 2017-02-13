
Ext.define("Vega.view.sales.edit.TnaOrder",{
    extend: "Ext.grid.Panel",

    requires: [
        "Vega.view.sales.edit.TnaOrderController",
        "Vega.view.sales.edit.TnaOrderModel"
    ],

    alias: 'widget.tna-grid',

    /*
    controller: "sales-edit-tnaorder",
    viewModel: {
        type: "sales-edit-tnaorder"
    },

    stateful: true,
    stateId: "tna-grid",
    stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],
    */

    minWidth: 480,
    minHeight: 320,

    selModel: {
        mode: 'MULTI'
    },

    viewConfig: {
        //emptyText: '<h1 style="margin:20px">No matching results</h1>',
        plugins: [{
            ptype: 'gridviewdragdrop',
            dragText: 'Drag and drop to reorganize'
        }],

        listeners: {
            drop: function(node, data, dropRec, dropPosition){
                var factor = 10,
                    store = data.view.grid.store;

                store.each(function(rec){
                    rec.set('priority', (store.indexOf(rec) + 1) * factor);
                })
            }
        }
    },

    plugins: [{
        ptype: 'rowediting',
        ui: 'default',
        clicksToEdit: 2
    }],

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            columns: [{
                text: 'ID',
                dataIndex: 'dtId',
                menuDisabled: true,
                sortable: false,
                hidden: true
            },{
                text: 'tnaId',
                dataIndex: 'tnaId',
                menuDisabled: true,
                sortable: false,
                hidden: true
            },{
                text: 'powdId',
                dataIndex: 'powdId',
                menuDisabled: true,
                sortable: false,
                hidden: true
            },{
                text: 'No.',
                dataIndex: 'lineseq',
                width: 50,
                menuDisabled: true,
                hidden: false
            },{
                text: 'Activity',
                dataIndex: 'descript',
                menuDisabled: true,
                sortable: false,
                width: 160,
                editor: {
                    xtype: 'combo',
                    name: 'descript',
                    hideLabel: true,
                    displayField: 'id',
                    valueField: 'id',
                    selectOnFocus: true,
                    editable: true,
                    //allowBlank: false,
                    forceSelection: true,
                    minChars: 1,
                    queryMode: 'local',
                    bind: {
                        store: '{activities}'
                    }
                }
            },{
                xtype: 'datecolumn',
                text: 'Due Date',
                dataIndex: 'due',
                menuDisabled: true,
                sortable: false,
                hidden: false,
                width: 160,
                format: 'm-d-Y',
                editor: {
                    xtype: 'datefield'
                }
            },{
                xtype: 'datecolumn',
                text: 'Reminder Date',
                dataIndex: 'remind',
                menuDisabled: true,
                sortable: false,
                hidden: true,
                width: 160,
                format: 'm-d-Y',
                editor: {
                    xtype: 'datefield'
                }
            },{
                xtype: 'datecolumn',
                text: 'ETA Date',
                dataIndex: 'eta',
                menuDisabled: true,
                sortable: false,
                hidden: true,
                width: 160,
                format: 'm-d-Y',
                editor: {
                    xtype: 'datefield'
                }
            },{
                xtype: 'datecolumn',
                text: 'Complete Date',
                dataIndex: 'complete',
                menuDisabled: true,
                sortable: false,
                hidden: true,
                width: 160,
                format: 'm-d-Y',
                editor: {
                    xtype: 'datefield'
                }
            },{
                text: 'Coordinator',
                dataIndex: 'responder',
                menuDisabled: true,
                sortable: false,
                hidden: false,
                width: 200,
                editor: {
                    xtype: 'combo',
                    name: 'responder',
                    hideLabel: true,
                    displayField: 'text',
                    valueField: 'id',
                    selectOnFocus: true,
                    editable: true,
                    //allowBlank: false,
                    forceSelection: true,
                    minChars: 1,
                    queryMode: 'local',
                    bind: {
                        store: '{users}'
                    }
                }
            },{
                text: 'Duration',
                dataIndex: 'duration',
                menuDisabled: true,
                sortable: false,
                hidden: true,
                editor: {
                    xtype: 'numberfield',
                    maxValue: 99,
                    minValue: 0
                }
            },{
                text: 'Priority',
                dataIndex: 'priority',
                menuDisabled: true,
                sortable: false,
                hidden: true,
                editor: {
                    xtype: 'numberfield',
                    step: 5,
                    maxValue: 99,
                    minValue: 0,
                    listeners: {
                        change: function(field, value){
                            value = parseInt(value, 10);
                            field.setValue(value + value % 5);
                        }
                    }
                }
            },{
                text: 'Remarks',
                dataIndex: 'remarks',
                flex: 1,
                menuDisabled: true,
                sortable: false,
                hidden: false,
                editor: {
                    xtype: 'textfield'
                }
                //renderer: 'renderDesc',
                //scope: this
            }]
        });

        me.callParent(arguments);

        //me.relayEvents(me.getStore(), ['load']);
    },

    onGridViewDrop: function(node, data, dropRec, dropPosition){
        var factor = 10,
            store = data.view.grid.store;

        store.each(function(rec){
            rec.set('priority', (store.indexOf(rec) + 1) * factor);
        })
    }
});
