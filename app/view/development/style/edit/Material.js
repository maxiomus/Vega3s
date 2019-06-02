
Ext.define('Vega.view.development.style.edit.Material',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.development.style.edit.MaterialController',
        'Vega.view.development.style.edit.MaterialModel'
    ],

    alias: 'widget.style-edit-material',

    /*
    controller: 'sample-edit-material',
    viewModel: {
        type: 'sample-edit-material'
    },
    */

    style: {
        //borderTop: '1px solid #cfcfcf'
    },

    cls: 'cs-bom-grid',

    //minWidth: 1028,
    minHeight: 200,

    scrollable: 'y',
    //stateful: true,
    //stateId: "cs-bom-grid",
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
        me.columns = this.buildColumns();

        // If columns are set in Ext.applyIf,
        // grid selection binding not working properly.
        // ex. '{grid.selection}'

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

                }
            },

            features: [{
                ftype: 'rowbody',
                getAdditionalData: function (data, idx, record, orig) {
                    // Usually you would style the my-body-class in a CSS file
                    var xf = Ext.util.Format;
                    return {
                        // When Mat Type column visible width: 144px
                        rowBody: '<table><tr><td style="width: 44px;"></td><td style="width: 119px;">' + (xf.ellipsis(record.get("rawMatType"),13) || '') + '</td><td style="width: 318px;">' + (xf.ellipsis(record.get("descript"),45) || '') + '</td><td style="width: 79px;">' + (record.get("uom") || '') + '</td></tr></table>',
                        rowBodyCls: "material-body-class"
                    };
                }
            },{
                ftype: 'grouping',
                groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
            },{
                ftype: 'summary',
                dock: 'bottom'
            }],

            plugins: [{
                ptype: 'rowediting',
                pluginId: 'bomRowEdit',
                ui: 'default',
                clicksToEdit: 2,
                listeners: {
                    canceledit: function(editor, ctx){
                        console.log('canceledit', editor, ctx);
                        if(ctx.record.phantom){
                            //ctx.record.drop();
                        }

                    }
                }
            },{
                ptype: "gridfilters"
            }]
        });

        me.callParent(arguments);

        var detailController = me.up('style-edit-detail').getController();

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Copy',
                iconCls: 'x-fa fa-copy',
                tooltip: 'Duplicate Style',
                handler: 'onCopyMaterialClick',
                scope: detailController
            },{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Style',
                handler: 'onEditMaterialClick',
                scope: detailController
            },{
                text: 'Delete',
                iconCls: 'x-fa fa-remove',
                tooltip: 'Delete Style',
                handler: 'onDeleteMaterialClick',
                scope: detailController
            }]
        });

        //me.relayEvents(me.getStore(), ['load']);

    },

    buildColumns: function(){
        /*
        var memComponents = Ext.create('Ext.data.Store', {
            //storeId: 'memComponents',
            pageSize: 50,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        });

        var remoteComponents = Ext.create('Ext.data.Store', {
            //storeId: 'remoteComponents',
            pageSize: 0,
            remoteFilter: true,
            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/components',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },

            listeners: {
                load: function(s){
                    memComponents.getProxy().setData(s.getRange());
                    memComponents.load();
                }
            }
        });

        var memRawColors = Ext.create('Ext.data.Store', {
            //storeId: 'memRawColors',
            pageSize: 50,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        });

        var remoteRawColors = Ext.create('Ext.data.Store', {
            //storeId: 'remoteRawColors',
            autoLoad: true,
            remoteFilter: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/rawcolors',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                load: function(s){
                    memRawColors.getProxy().setData(s.getRange());
                    memRawColors.load();
                }
            }
        });
        */
        return[{
            text: "ID",
            dataIndex: "id",
            menuDisabled: true,
            sortable: false,
            hidden: true
        },
        {
            text: "SEQ",
            dataIndex: "line_seq",
            width: 50,
            menuDisabled: true,
            sortable: false,
            editor: {
                xtype: 'textfield',
                name: 'line_seq'
            }
        },
        {
            text: "C. Type",
            dataIndex: "memo",
            width: 120,
            menuDisabled: true,
            sortable: false,
            hidden: false,
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "C. Type",
            dataIndex: "rawMatType",
            menuDisabled: true,
            sortable: false,
            hidden: true,
            editor: {
                xtype: 'combo',
                name: 'rawMatType',
                //store: 'typeStore',
                bind: {
                    store: '{rawmattypes}'
                },
                displayField: 'id',
                valueField: 'id',
                typeAhead: false,
                hideLabel: true,
                hideTrigger: false,
                forceSelection: true,
                //minChars: 1,
                matchFieldWidth: false,
                queryMode: 'local',
                //pageSize: 15,
                //queryDelay: 500,
                allowBlank: false
            }
        },
        {
            text: "Comp. Style",
            dataIndex: "rawStyle",
            width: 160,
            menuDisabled: true,
            sortable: false,
            editor: {
                xtype: 'combo',
                name: 'rawStyle',
                displayField: 'label',
                valueField: 'label',
                autoLoadOnValue: true,
                hideTrigger: false,
                allowBlank: false,
                //forceSelection: true,
                //selectOnFocus: true,
                matchFieldWidth: false,
                pageSize: 9999,
                //minChars: 0,
                store: 'memComponents',
                remoteStore: 'Components',
                queryMode: 'local',
                //triggerAction: 'all',
                //lastQuery: '',
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    bufferedRenderer: false,
                    width: 340
                },
                tpl: '<tpl for=".">' +
                    '<tpl if="[xindex] == 1">' +
                        '<table class="cbo-list">' +
                            '<tr>' +
                                '<th width="35%">Mat Type</th>' +
                                '<th width="65%">Code #</th>' +
                            '</tr>' +
                    '</tpl>' +
                        '<tr class="x-boundlist-item">' +
                            '<td>{text}</td>' +
                            '<td>{label}</td>' +
                        '</tr>' +
                    '<tpl if="[xcount-xindex]==0">' +
                        '</table>' +
                    '</tpl>' +
                '</tpl>',
                plugins: [{
                    ptype: "cleartrigger"
                }],
                listeners: {
                    triggerClear: function(combo){

                        var cboColor = combo.ownerCt.query('combo[name="rawColor"]')[0];
                        cboColor.getStore().clearFilter();
                        cboColor.setValue('');
                    },
                    select: function(combo, rec) {
                        var cboRawType = combo.ownerCt.query('combo[name="rawMatType"]')[0],
                            txtUOM = combo.ownerCt.query('textfield[name="uom"]')[0];

                        cboRawType.setValue(rec.data.text);
                        txtUOM.setValue(rec.data.descript);
                        //console.log(combo, rec);
                    }

                }
            },
            renderer: function (value, metaData, record, rowIndex, colIndex) {
                return value;
            }
        },
        {
            text: "Comp. Color",
            dataIndex: "rawColor",
            width: 160,
            menuDisabled: true,
            sortable: false,
            editor: {
                xtype: 'combo',
                name: 'rawColor',
                displayField: 'label',
                valueField: 'label',
                autoLoadOnValue: true,
                hideTrigger: false,
                allowBlank: false,
                //forceSelection: true,
                //selectOnFocus: true,
                matchFieldWidth: false,
                pageSize: 9999,
                //minChars: 0,
                store: 'memRawColors',
                remoteStore: 'rawColors',
                queryMode: 'local',
                //triggerAction: 'query',
                //lastQuery: '',
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 340
                },
                tpl: new Ext.XTemplate('<tpl for=".">' +
                    '<tpl if="[xindex] == 1">' +
                        '<table class="cbo-list">' +
                            '<tr>' +
                                '<th width="45%">Color</th>' +
                                '<th width="45%">Code #</th>' +
                                '<th width="10%">Cost</th>' +
                            '</tr>' +
                    '</tpl>' +
                        '<tr class="x-boundlist-item">' +
                            '<td>{label}</td>' +
                            '<td>{text}</td>' +
                            '<td>{descript:this.getCost}</td>' +
                        '</tr>' +
                    '<tpl if="[xcount-xindex]==0">' +
                        '</table>' +
                    '</tpl>' +
                '</tpl>',
                {
                    getCost: function(a){
                        return a.split("(#)").pop();
                    }
                }),
                plugins: [{
                    ptype: "cleartrigger"
                }],
                listeners: {
                    beforequery: {
                        fn: function(qe){
                            var cboStyle = qe.combo.ownerCt.query('combo[name="rawStyle"]')[0],
                                store = qe.combo.getStore();

                            store.clearFilter();

                            if(!Ext.isEmpty(cboStyle.getValue())){

                                store.filter([{
                                    property: 'text',
                                    value: cboStyle.getValue().toUpperCase(),
                                    operator: '='
                                }]);
                            }
                        }
                    },
                    select: function (combo, rec) {
                        var txtDesc = combo.ownerCt.query('textfield[name="descript"]')[0],
                            numCost = combo.ownerCt.query('numberfield[name="cost"]')[0];

                        txtDesc.setValue(rec.data.descript.split('(#)')[0]);
                        numCost.setValue(rec.data.descript.split('(#)').pop());
                    }

                }
            },
            summaryRenderer: function(value, summaryData, dataIndex){
                return 'Sub Total: ';
            }
        },
        {
            text: "Descript",
            dataIndex: "descript",
            //width: 300,
            menuDisabled: true,
            sortable: false,
            hidden: true,
            editor: {
                xtype: 'textfield',
                name: 'descript'
            }
        },
        {
            xtype: 'numbercolumn',
            text: "Qty",
            dataIndex: "qty",
            menuDisabled: true,
            sortable: false,
            hidden: false,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0
            },
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex){
                return Ext.util.Format.number(value, '0,000.00');
            }
        },
        {
            text: "UOM",
            dataIndex: "uom",
            menuDisabled: true,
            sortable: false,
            hidden: true,
            editor: {
                xtype: 'textfield',
                name: 'uom'
            }
        },
        {
            xtype: 'numbercolumn',
            text: "Cost",
            dataIndex: "cost",
            menuDisabled: true,
            sortable: false,
            format: '0.00',
            hidden: false,
            editor: {
                xtype: 'numberfield',
                name: 'cost',
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
            text: "Ext. Cost",
            dataIndex: "extcost",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            format: '0.00',
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex){
                return Ext.util.Format.usMoney(value);
            }
        },
        {
            xtype: 'numbercolumn',
            text: "Total Cost",
            dataIndex: "extcost",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            format: '0.00',
            hidden: false,
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex){
                return Ext.util.Format.usMoney(value);
            }
        },{
            text: "",
            menuDisabled: true,
            sortable: false,
            flex: 1
        }];
    }
});
