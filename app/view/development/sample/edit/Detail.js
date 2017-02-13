
Ext.define('Vega.view.development.sample.edit.Detail',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.development.sample.edit.DetailController',
        'Vega.view.development.sample.edit.DetailModel'
    ],

    alias: 'widget.sample-edit-detail',

    /*
    controller: 'sample-edit-detail',
    viewModel: {
        type: 'sample-edit-detail'
    },
    */

    minWidth: 1028,
    minHeight: 480,
    stateful: true,
    stateId: "bom-grid",
    stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],

    listeners: {
        afterrender: function(grid){

        },

        reconfigure: function(grid, store){

        },

        itemcontextmenu: function(h, j, k, g, l){

            l.stopEvent();

            var i = h.getSelectionModel();
            if(!i.isSelected(g)){
                i.select(g)
            }
            h.ownerCt.contextmenu.showAt(l.getXY())

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

                },
                listeners: {
                    refresh: function(view, e){

                    }
                }
            },
            features: [{
                id: 'group',
                ftype: 'grouping',
                collapsible: false,
                startCollapsed: false
                //groupHeaderTpl: '<b>C. Type:</b> {rawMatType}'
            },{
                ftype: 'rowbody',
                getAdditionalData: function (data, idx, record, orig) {
                    // Usually you would style the my-body-class in a CSS file
                    return {
                        // When Mat Type column visible width: 144px
                        rowBody: '<table><tr><td style="width: 44px;"></td><td style="width: 399px;">' + record.get("descript") + '</td><td style="width: 79px;">' + record.get("uom") + '</td></tr></table>',
                        rowBodyCls: "my-body-class"
                    };
                }
            }],

            plugins: [{
                ptype: 'rowediting',
                pluginId: 'rowEditing',
                ui: 'default',
                clicksToEdit: 2
            },{
                ptype: "gridfilters"
            }]
        });

        me.callParent(arguments);

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Copy',
                iconCls: 'fa fa-copy',
                tooltip: 'Duplicate Style',
                handler: 'onCopyMaterialClick',
                scope: me.up('sample-edit-form').getController()
            },{
                text: 'Edit',
                iconCls: 'fa fa-edit',
                tooltip: 'Edit Style',
                handler: 'onEditMaterialClick',
                scope: me.up('sample-edit-form').getController()
            },{
                text: 'Delete',
                iconCls: 'fa fa-remove',
                tooltip: 'Delete Style',
                handler: 'onDeleteMaterialClick',
                scope: me.up('sample-edit-form').getController()
            }]
        });

        //me.relayEvents(me.getStore(), ['load']);
    },

    buildColumns: function(){

        var memCompos = Ext.create('Ext.data.Store', {
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

        var remoteStyles = Ext.create('Vega.store.Components', {
            autoLoad: true,

            listeners: {
                load: function(s){
                    memCompos.getProxy().setData(s.getRange());
                    memCompos.load();
                }
            }
        });

        var memColors = Ext.create('Ext.data.Store', {
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

        var remoteColors = Ext.create('Ext.data.Store', {
            autoLoad: true,
            remoteFilter: true,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/rawcolors',

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                load: function(s){
                    memColors.getProxy().setData(s.getRange());
                    memColors.load();
                }
            }
        });

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
                minChars: 1,
                matchFieldWidth: false,
                //pageSize: 15,
                //queryDelay: 500,
                allowBlank: false,
                listeners: {
                    select: function(a, b) {
                        console.log(a,b)
                    }

                }
            }
        },
        {
            text: "Comp. Style",
            dataIndex: "rawStyle",
            width: 200,
            menuDisabled: true,
            sortable: false,
            editor: {
                xtype: 'memorycombo',
                name: 'rawStyle',
                displayField: 'label',
                valueField: 'label',
                autoLoadOnValue: true,
                hideTrigger: false,
                allowBlank: false,
                //forceSelection: true,
                //selectOnFocus: true,
                matchFieldWidth: false,
                pageSize: 50,
                //minChars: 0,
                store: memCompos,
                queryMode: 'local',
                triggerAction: 'query',
                //lastQuery: '',
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 340,
                    getInnerTpl: function(){

                    }
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
                //queryDelay: 500,
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
                        //console.log(combo, rec, cboRawType);
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
            width: 200,
            menuDisabled: true,
            sortable: false,
            editor: {
                xtype: 'memorycombo',
                name: 'rawColor',
                store: memColors,
                displayField: 'label',
                valueField: 'label',
                autoLoadOnValue: true,
                hideTrigger: false,
                allowBlank: false,
                //forceSelection: true,
                //selectOnFocus: true,
                matchFieldWidth: false,
                pageSize: 50,
                //minChars: 0,
                queryMode: 'local',
                //triggerAction: 'query',
                //lastQuery: '',
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 340
                },
                tpl: '<tpl for=".">' +
                '<tpl if="[xindex] == 1">' +
                '<table class="cbo-list">' +
                '<tr>' +
                '<th width="50%">Color</th>' +
                '<th width="50%">Code #</th>' +
                '</tr>' +
                '</tpl>' +
                '<tr class="x-boundlist-item">' +
                '<td>{label}</td>' +
                '<td>{descript}</td>' +
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

                    },
                    beforequery: {
                        fn: function(qe){
                            var cboStyle = qe.combo.ownerCt.query('combo[name="rawStyle"]')[0],
                                store = qe.combo.getStore();

                            //console.log(cboStyle, cboStyle.getValue())
                            store.clearFilter();

                            if(!Ext.isEmpty(cboStyle.getValue())){

                                store.filter([{
                                    property: 'descript',
                                    value: cboStyle.getValue().toUpperCase(),
                                    operator: '='
                                }]);
                            }
                            //delete qe.combo.lastQuery;
                        }
                    },
                    select: function (combo, rec) {
                        var txtDesc = combo.ownerCt.query('textfield[name="descript"]')[0];
                        txtDesc.setValue(rec.data.text);
                    }

                }
            }
        },
        {
            text: "Descript",
            dataIndex: "descript",
            width: 300,
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
                minValue: 1
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
                allowBlank: true,
                minValue: 0
            }
        },
        {
            xtype: 'numbercolumn',
            text: "Ext. Cost",
            dataIndex: "extcost",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            format: '0.00'
        },
        {
            xtype: 'numbercolumn',
            text: "Total Cost",
            dataIndex: "extcost",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            format: '0.00',
            hidden: false
        },{
            text: "Memo",
            dataIndex: "memo",
            flex: 1,
            menuDisabled: true,
            sortable: false,
            hidden: false,
            editor: {
                xtype: 'textfield'
            }
        }]
    }
});
