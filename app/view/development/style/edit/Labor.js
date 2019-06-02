
Ext.define('Vega.view.development.style.edit.Labor',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.development.style.edit.LaborController',
        'Vega.view.development.style.edit.LaborModel'
    ],

    alias: 'widget.style-edit-labor',

    /*
    controller: 'development-sample-edit-labor',
    viewModel: {
        type: 'development-sample-edit-labor'
    },
    */

    style: {
        //borderTop: '1px solid #cfcfcf'
    },

    cls: 'cs-bol-grid',

    //minWidth: 1028,
    minHeight: 200,

    scrollable: 'y',
    //stateful: true,
    //stateId: "cs-bol-grid",
    //stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],

    listeners: {
        itemcontextmenu: function(h, j, k, g, l){

            l.stopEvent();

            var i = h.getSelectionModel();
            if(!i.isSelected(g)){
                i.select(g);
            }
            h.ownerCt.contextmenu.showAt(l.getXY());

        },

        viewready: {
            fn: function(grid){
                //var expander = grid.getPlugin('rowexdetail');
                //expander.expandAll();
            }
        }
    },

    initComponent: function(){
        var me = this;
        // If columns are set in Ext.applyIf,
        // grid selection binding not working properly.
        // ex. '{grid.selection}'

        me.columns = this.buildColumns();

        Ext.applyIf(me, {
            selModel: {
                //type: 'cellmodel',
                pruneRemoved: false
            },

            viewConfig: {
                loadMask: true,
                stripeRows: true,
                //trackOver: true,
                //preserveScrollOnRefresh: true,
                //deferInitialRefresh: true,
                emptyText: '<h1 style="margin:20px">No matching results</h1>',
                getRowClass: function(a, g, f, h){

                },
                plugins: [{
                    ddGroup: 'labor-group',
                    ptype: 'gridviewdragdrop',
                    enableDrop: true,
                    dragText: 'Drag and drop to reorganize'
                }],
                listeners: {
                    drop: function(node, data, overModel, dropPosition, e){
                        this.getStore().each(function(rec,rowIndex){
                            //rec.set('orderNo', idx+10);
                        });
                    },
                    refresh: function(view, e){

                    }
                }
            },

            features: [{
                ftype: 'summary',
                dock: "bottom"
            }],

            plugins: [{
                ptype: 'rowediting',
                pluginId: 'bolRowEdit',
                ui: 'default',
                clicksToEdit: 2
            },{
                ptype: "gridfilters"
            }]
        });

        me.callParent(arguments);

        var formController = me.up('style-edit-form').getController();

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Copy',
                iconCls: 'x-fa fa-copy',
                tooltip: 'Duplicate Style',
                handler: 'onCopyLaborClick',
                scope: formController
            },{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Style',
                handler: 'onEditLaborClick',
                scope: formController
            },{
                text: 'Delete',
                iconCls: 'x-fa fa-remove',
                tooltip: 'Delete Style',
                handler: 'onDeleteLaborClick',
                scope: formController
            }]
        });

        //me.relayEvents(me.getStore(), ['load']);
    },

    buildColumns: function(){
        return [{
            text: "ID",
            dataIndex: "id",
            menuDisabled: true,
            sortable: false,
            hidden: true
        },
        {
            text: "Line",
            dataIndex: "line",
            width: 50,
            menuDisabled: true,
            sortable: false
        },
        {
            xtype: 'numbercolumn',
            text: "SEQ",
            dataIndex: "orderNo",
            width: 80,
            format: '0',
            menuDisabled: true,
            sortable: false,
            editor: {
                xtype: 'numberfield',
                minValue: 1,
                step: 10,
                name: 'orderNo'
            }
        },
        {
            text: "Location",
            dataIndex: "location",
            width: 120,
            menuDisabled: true,
            sortable: false,
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
                //pageSize: 15,
                //queryDelay: 500,
                allowBlank: false,
                //editable: false,
                //msgTarget: 'side',
                //minChars: 1,
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
            text: "Vendor",
            dataIndex: "vendor",
            width: 200,
            menuDisabled: true,
            sortable: false,
            editor: {
                xtype: 'combo',
                name: 'vendor',
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
                //queryParam: "filter",
                //triggerAction: 'all',
                //lastQuery: '',
                minChars: 0,
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 340
                },
                plugins: [{
                    ptype: "cleartrigger"
                }]
            },
            renderer: function (value, metaData, record, rowIndex, colIndex) {
                return value;
            },
            summaryRenderer: function(value, summaryData, dataIndex){
                return 'Sub Total: ';
            }
        },
        {
            xtype: 'numbercolumn',
            text: "Cost",
            dataIndex: "price",
            menuDisabled: true,
            sortable: false,
            format: '$0.00',
            hidden: false,
            editor: {
                xtype: 'numberfield',
                allowBlank: true,
                minValue: 0
            },
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex){
                return Ext.util.Format.usMoney(value);
            }
        },
        {
            xtype: 'numbercolumn',
            text: "Lead Time",
            dataIndex: "leadtime",
            menuDisabled: true,
            sortable: false,
            hidden: false,
            editor: {
                xtype: 'numberfield',
                allowBlank: true,
                minValue: 0
            }
        },
        {
            xtype: 'numbercolumn',
            text: "Qty",
            dataIndex: "inch_qty",
            menuDisabled: true,
            sortable: false,
            format: '0.00',
            hidden: false,
            editor: {
                xtype: 'numberfield',
                allowBlank: true,
                minValue: 0
            },
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex){
                return Ext.util.Format.number(value, '0,000.00');
            }
        },
        {
            text: "Memo",
            dataIndex: "memo",
            flex: 1,
            menuDisabled: true,
            sortable: false,
            hidden: false,
            editor: {
                xtype: 'textfield'
            }
        }];
    }

    /*
    buildBolH: function(){
        return [{
            xtype: "container",
            //title: "P.I",
            //reference: "header",
            //iconCls: "x-fa fa-calculator",
            layout: {
                type: 'responsivecolumn',
                states: {
                    //small: 800,
                    //medium: 1200,
                    //large: 0
                }
            },
            //margin: "0 0 5 0",
            //bodyPadding: 8,
            defaultType: 'container',
            defaults: {
                //margin: "5 0 0 0"
            },
            fieldDefaults: {
                labelAlign: "left",
                margin: 0
            },
            items: [{
                responsiveCls: 'small-100',
                //width: '30%',
                layout: {
                    type: 'hbox'
                },
                defaultType: 'textfield',
                defaults: {
                    constrain: true,
                    margin: '0 10 3 0',
                    labelWidth: 80
                    //minHeight: 720,
                    //padding: '10 10 0 10'
                },
                items: [{
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'end'
                    },
                    items: [{
                        xtype: 'combo',
                        name: 'processtype',
                        fieldLabel: 'Process Type',
                        displayField: 'id',
                        valueField: 'id',
                        editable: false,
                        //selectOnFocus: true,
                        //allowBlank: false,
                        forceSelection: true,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        bind: {
                            store: '{processtypes}',
                            value: '{theSample.processtype}'
                        }
                    }]
                },{
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'end'
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'style',
                        fieldLabel: 'Style',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theSample.style}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'color',
                        fieldLabel: 'Color',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theSample.color}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'bomno',
                        fieldLabel: 'Cost Sheet #',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theSample.bomno}'
                        }
                    }]
                }]
            }, {
                responsiveCls: 'small-100',
                //width: '30%',
                layout: {
                    type: 'hbox'
                },
                defaultType: 'textfield',
                defaults: {
                    constrain: true,
                    margin: '0 10 3 0',
                    labelWidth: 80
                    //minHeight: 720,
                    //padding: '10 10 0 10'
                },
                items: [{
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'end'
                    },
                    items: [{
                        xtype: 'numberfield',
                        name: 'totalcost',
                        fieldLabel: 'Total Cost',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theSample.totalcost}'
                        }
                    },{
                        xtype: 'datefield',
                        name: 'createtime',
                        fieldLabel: 'Created On',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theSample.createtime}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'createuser',
                        fieldLabel: 'Created By',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theSample.createuser}'
                        }
                    }]
                },{
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'end'
                    },
                    items: [{
                        xtype: 'datefield',
                        name: 'updatetime',
                        fieldLabel: 'Updated On',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theSample.updatetime}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'updateuser',
                        fieldLabel: 'Updated By',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theSample.updateuser}'
                        }
                    }]
                }]
            }]
        }]
    }
    */
});
