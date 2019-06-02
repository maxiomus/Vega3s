
Ext.define('Vega.view.settings.task.Plan',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Vega.view.settings.task.PlanController',
        'Vega.view.settings.task.PlanModel',
        'Vega.model.settings.Activity'
    ],

    alias: 'widget.task-plan',

    controller: 'task-plan',
    viewModel: {
        type: 'task-plan'
    },

    referenceHolder: true,
    session: true,
    //title: 'Plan',
    border: false,
    layout: 'border',

    initComponent: function(c){
        var me = this;

        me.actions = {
            actNew: Ext.create('Ext.Action', {
                text: "New",
                tooltip: "Create a New Plan",
                //ui: "default",
                //reference: 'new',
                iconCls: "x-fa fa-plus",
                //glyph: 'xf044@FontAwesome',
                handler: 'onActNew'
            }),

            actEdit: Ext.create('Ext.Action', {
                text: 'Edit',
                tooltip: 'Edit Selected Plan',
                //ui: 'default',
                iconCls: 'x-fa fa-edit',
                handler: 'onActEdit'
            }),

            actDelete: Ext.create('Ext.Action', {
                text: "Delete",
                tooltip: "Delete Selected Plan",
                //ui: "default",
                iconCls: "x-fa fa-remove",
                //glyph: 'xf12d@FontAwesome',
                //disabled: true,
                handler: 'onActDelete'
            }),

            actSave: Ext.create('Ext.Action', {
                text: "Save",
                tooltip: "Save Current Plan",
                //ui: "default",
                iconCls: "x-fa fa-save",
                //glyph: 'xf12d@FontAwesome',
                //disabled: true,
                handler: 'onActSave'
            }),

            actCopy: Ext.create('Ext.Action', {
                text: "Copy",
                tooltip: "Duplicate selected Plan",
                //ui: "default",
                iconCls: "x-fa fa-copy",
                //glyph: 'xf01e@FontAwesome',
                handler: 'onActCopy'
            }),

            actRefresh: Ext.create('Ext.Action', {
                text: "Refresh",
                tooltip: "Refresh",
                //ui: "default",
                iconCls: "x-fa fa-refresh",
                //glyph: 'xf01e@FontAwesome',
                handler: 'onActRefresh'
            }),

            actAdd: Ext.create('Ext.Action', {
                text: "Add",
                tooltip: "Add a New Activity",
                ui: "default",
                iconCls: "x-fa fa-plus-circle",
                //glyph: 'xf044@FontAwesome',
                handler: 'onActAdd'
            }),

            actRemove: Ext.create('Ext.Action', {
                text: 'Remove',
                tooltip: 'Remove an Activity',
                ui: 'default',
                iconCls: 'x-fa fa-minus-circle',
                handler: 'onActRemove'
            })
        },

        Ext.applyIf(me, {

            items: [{
                xtype: 'grid',
                title: 'Plan',
                reference: 'roleGrid',
                region: 'west',
                flex: 1,
                split: true,
                bind: {
                    store: '{roles}'
                },
                tbar: [
                    me.actions.actNew,
                    //me.actions.actEdit,
                    me.actions.actCopy,
                    me.actions.actDelete,
                    me.actions.actRefresh,
                    me.actions.actSave
                ],
                columns: [{
                    text: "Name",
                    dataIndex: "name",
                    menuDisabled: true,
                    sortable: false,
                    width: 200,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },{
                    text: "Description",
                    dataIndex:"descript",
                    flex: 1,
                    menuDisabled: true,
                    sortable: false,
                    editor: {
                        xtype: 'textfield'
                    }
                },{
                    text: "Account",
                    dataIndex: "account",
                    menuDisabled: true,
                    sortable: false,
                    width: 160,
                    editor: {
                        xtype: 'textfield'
                    }
                },{
                    xtype: 'checkcolumn',
                    text: 'Active',
                    dataIndex: 'active'
                }],

                viewConfig: {
                    loadMask: true,
                    stripeRows: true,
                    trackOver: true,
                    emptyText: '<h1 style="margin: 20px">No matching results</h1>'
                },

                plugins: [{
                    ptype: 'rowediting',
                    clicksToEdit: 2
                }],

                listeners: {
                    select: {
                        fn: 'onRoleSelect',
                        scope: this.controller
                    }
                }
            },{
                xtype: 'grid',
                title: 'Sequence',
                reference: 'seqGrid',
                region: 'center',
                flex: 1,
                bind: {
                    store: '{roleGrid.selection.tnas}'
                },
                tbar: [
                    me.actions.actAdd,
                    me.actions.actRemove
                ],
                columns: [{
                    text: 'tnaId',
                    dataIndex: 'tnaId',
                    menuDisabled: true,
                    sortable: false,
                    hidden: true
                },{
                    text: 'Seq',
                    dataIndex: 'priority',
                    width: 50,
                    align: 'center',
                    menuDisabled: true,
                    hidden: false
                },{
                    text: 'Activity',
                    dataIndex: 'activity',
                    menuDisabled: true,
                    sortable: false,
                    width: 160,
                    flex: 1,
                    editor: {
                        xtype: 'combo',
                        name: 'activity',
                        hideLabel: true,
                        displayField: 'text',
                        valueField: 'id',
                        selectOnFocus: true,
                        forceSelection: true,
                        //editable: true,
                        //allowBlank: false,
                        minChars: 1,
                        queryMode: 'local',
                        bind: {
                            store: '{activities}'
                        },
                        listeners: {
                            select: {
                                fn: 'onActivitySelect'
                            }
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
                    text: 'Coordinator',
                    dataIndex: 'coordinator',
                    menuDisabled: true,
                    sortable: false,
                    hidden: false,
                    width: 200,
                    editor: {
                        xtype: 'combo',
                        name: 'coordinator',
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
                            store: '{coordinators}'
                        }
                    }
                },{
                    text: 'Customer',
                    dataIndex: 'customer',
                    menuDisabled: true,
                    sortable: false,
                    hidden: true,
                    width: 200,
                    editor: {
                        xtype: 'combo',
                        name: 'customer',
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
                            store: '{customers}'
                        }
                    }
                },{
                    text: 'Duration',
                    dataIndex: 'duration',
                    menuDisabled: true,
                    sortable: false,
                    hidden: false,
                    editor: {
                        xtype: 'numberfield',
                        minValue: 0
                    }
                },{
                    xtype: 'checkcolumn',
                    text: 'Active',
                    dataIndex: 'active'
                },{
                    xtype: 'actioncolumn',
                    menuDisabled: true,
                    sortable: false,
                    align: 'center',
                    width: 50,
                    items: [{
                        //text: '<i class="x-fa fa-remove red-txt"></i>',
                        iconCls: 'x-fa fa-minus-circle red-txt',
                        handler: function(grid, rIdx, cIdx){
                            var rec = grid.getStore().getAt(rIdx);
                            rec.drop(false);
                        }
                    }]
                }],

                viewConfig: {
                    loadMask: true,
                    stripeRows: true,
                    trackOver: true,
                    deferEmptyText: false,
                    emptyText: '<h1 style="margin: 20px">No matching results</h1>',
                    plugins: [{
                        ddGroup: 'ddgActivities',
                        ptype: 'gridviewdragdrop',
                        enableDrop: true,
                        dragText: 'Drag and drop to reorganize'
                    }],
                    listeners: {
                        drop: function(node, data, overModel, dropPosition, e){

                            this.getStore().each(function(rec,idx){
                                rec.set('priority', (idx+1)*10);
                            });
                        }
                    }
                },
                plugins: [{
                    ptype: 'rowediting',
                    clicksToEdit: 2
                }],

                listeners: {

                }
            }]
        });

        me.callParent(arguments);
    }
});
