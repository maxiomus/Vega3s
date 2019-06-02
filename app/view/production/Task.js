
Ext.define('Vega.view.production.Task',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.production.TaskController',
        'Vega.view.production.TaskModel'
    ],

    alias: 'widget.prod-task',

    controller: 'prod-task',
    viewModel: {
        type: 'prod-task'
    },

    minWidth: 480,
    //minHeight: 320,

    selModel: {
        mode: 'MULTI'
    },

    viewConfig: {
        loadMask:true,
        stripeRows:true,
        trackOver:true,
        //preserveScrollOnRefresh:true,
        //deferInitialRefresh: true,
        deferEmptyText: true,
        emptyText:'<h1 style="margin:20px">No matching results</h1>',
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
                });
            }
        }
    },

    plugins: [{
        ptype: 'rowediting',
        ui: 'default',
        clicksToEdit: 2
    }],

    listeners: {
        containercontextmenu: {
            fn: 'onContainerContextMenu',
            scope: this.controller
        }
    },

    initComponent: function(){
        var me = this;

        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            //reference: 'topbar',
            defaults: {

            },
            items: [{
                xtype: "button",
                text: 'Add Plan',
                iconCls: "x-fa fa-list",
                //scope: this.controller,
                bind: {
                    disabled: '{!grid.selection}'
                },
                reference: 'planSelector',
                menu: {
                    items: [],
                    listeners: {
                        click: {
                            fn: 'onAddPlanClick'
                        }
                    }
                }
            },{
                xtype: 'button',
                text: '',
                iconCls: 'x-fa fa-rotate-left',
                tooltip: 'Reset',
                handler: 'onRejectClick'
            },{
                xtype: 'button',
                text: 'Add',
                width: 70,
                iconCls: 'x-fa fa-plus',
                handler: 'onAddClick'
            },{
                xtype: 'button',
                text: 'Remove',
                iconCls: 'x-fa fa-minus',
                bind: {
                    disabled: '{!taskgrid.selection}'
                },
                handler: 'onRemoveClick'
            },{
                xtype: 'button',
                text: 'Remove All',
                iconCls: 'x-fa fa-remove',
                handler: 'onRemoveAllClick'
            },{
                xtype: 'button',
                text: 'Save',
                iconCls: 'x-fa fa-save',
                bind: {
                    disabled: '{clipboard}'
                },
                handler: 'onSaveClick'
            }]
        }],

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
                text: 'No',
                dataIndex: 'lineseq',
                width: 50,
                align: 'center',
                menuDisabled: true,
                hidden: false
            },{
                text: 'Priority',
                dataIndex: 'priority',
                width: 70,
                align: 'center',
                menuDisabled: true,
                sortable: false,
                hidden: true,
                editor: {
                    xtype: 'numberfield',
                    step: 5,
                    minValue: 0,
                    listeners: {
                        change: function(field, value){
                            value = parseInt(value, 10);
                            field.setValue(value + value % 5);
                        }
                    }
                }
            },{
                text: 'Activity',
                dataIndex: 'activity',
                menuDisabled: true,
                sortable: false,
                width: 160,
                editor: {
                    xtype: 'combo',
                    name: 'activity',
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
                        store: '{activities}'
                    },
                    listeners: {
                        select: 'onActivitySelect'
                    }
                },
                renderer: 'onActivityRenderer'
            },{
                text: 'Description',
                dataIndex: 'descript',
                menuDisabled: true,
                sortable: false,
                width: 160,
                flex: 1,
                hidden: true
            },{
                xtype: 'datecolumn',
                text: 'Due Date',
                dataIndex: 'due',
                menuDisabled: true,
                sortable: false,
                hidden: false,
                width: 110,
                format: 'm-d-Y',
                editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d'
                }
            },{
                xtype: 'datecolumn',
                text: 'Reminder Date',
                dataIndex: 'remind',
                menuDisabled: true,
                sortable: false,
                hidden: true,
                format: 'm-d-Y',
                editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d'
                }
            },{
                xtype: 'datecolumn',
                text: 'ETA Date',
                dataIndex: 'eta',
                menuDisabled: true,
                sortable: false,
                hidden: true,
                format: 'm-d-Y',
                editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d'
                }
            },{
                xtype: 'datecolumn',
                text: 'Sent Date',
                dataIndex: 'sent',
                menuDisabled: true,
                sortable: false,
                hidden: false,
                format: 'm-d-Y',
                width: 110,
                editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d'
                }
            },{
                xtype: 'datecolumn',
                text: 'Approved',
                dataIndex: 'complete',
                menuDisabled: true,
                sortable: false,
                hidden: false,
                format: 'm-d-Y',
                width: 110,
                editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d'
                }
            },{
                text: 'Coordinator',
                dataIndex: 'responder',
                menuDisabled: true,
                sortable: false,
                hidden: false,
                width: 160,
                renderer: function(value, meta, record) {
                    //meta.tdAttr = 'data-qtip="' + value + '"';
                    if(!value){
                        return;
                    }

                    var names = value.split(' '),
                        email = Ext.String.format('{0}.{1}@bluprintcorp.com', names[0].toLowerCase(), names[1].substring(0,1).toLowerCase());

                    return Ext.String.format('<a href="mailto:{0}">{1}</a>', email, value);
                },
                editor: {
                    xtype: 'combo',
                    name: 'responder',
                    hideLabel: true,
                    displayField: 'text',
                    valueField: 'text',
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
                    minValue: 0
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

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: "Paste T&A",
                    iconCls: "x-fa fa-paste",
                    //action: "printlabel",
                    handler: 'onPasteTNAClick',
                    scope: this.controller
                }
            ]
        });

        //me.relayEvents(me.getStore(), ['load']);
    },

    onGridViewDrop: function(node, data, dropRec, dropPosition){
        var factor = 10,
            store = data.view.grid.store;

        store.each(function(rec){
            rec.set('priority', (store.indexOf(rec) + 1) * factor);
        });
    }
});
