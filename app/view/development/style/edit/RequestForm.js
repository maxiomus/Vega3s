
Ext.define('Vega.view.development.style.edit.RequestForm',{
    extend: 'Ext.form.Panel',

    requires: [
        'Vega.view.development.style.edit.RequestFormController',
        'Vega.view.development.style.edit.RequestFormModel'
    ],

    controller: 'style-edit-requestForm',
    viewModel: {
        type: 'style-edit-requestForm'
    },

    alias: 'widget.style-edit-requestForm',

    layout: 'fit',

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'tabpanel',

                defaults: {
                    bodyPadding: 10,
                    scrollable: true
                },

                tabBar: {
                    defaults: {
                        //flex: 1, // if you want them to stretch all the way
                        width: 120,
                        height: 28, // set the height,
                        //padding: 6, // set the padding
                        //margin: '0 4 0 0',
                        //textAlign: 'left',
                        border: true,
                        style: {
                            border: '1px solid #ccc'
                        }
                    }
                },

                items: [{
                    title: 'Detail Info',
                    //scrollable: 'y',
                    //margin: 8,
                    layout: {
                        type: "vbox",
                        align: "stretch",
                        pack: 'middle'
                    },

                    items: [{
                        xtype: 'fieldcontainer',
                        layout: {
                            type: 'hbox'
                        },
                        fieldDefaults: {
                            labelAlign: 'top'
                        },
                        margin: '0 0 10 0',
                        defaults: {
                            margin: '0 5 0 0'
                        },

                        items: [{
                            xtype: 'datefield',
                            fieldLabel: 'RFQ Date',
                            readOnly: true,
                            selectOnFocus: false,
                            value: new Date()
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'Body Ref #',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: '{theRequest.bodyref}'
                        },{
                            xtype: 'combo',
                            fieldLabel: 'Customer',
                            //hideLabel: true,
                            hideTrigger: true,
                            bind: '{theRequest.customer}',
                            margin: '0 100 0 0',
                            store: 'Customers',
                            valueField: "id",
                            displayField: "id",
                            forceSelection: false,
                            selectOnFocus: true,
                            queryMode: 'local',
                            autoLoadOnValue: true,
                            //queryParam: "filter",
                            //triggerAction: 'all',
                            //lastQuery: '',
                            //minChars: 1,
                            matchFieldWidth: false,
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 340
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                render: function(c){
                                    c.on('focus', function () {
                                        c.expand();
                                    });
                                }
                            }
                        },{
                            xtype: 'fieldcontainer',
                            fieldLabel: 'PO QTY',
                            labelAlign: 'left',
                            labelWidth: 50,
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                //labelAlign: "top",
                                margin: '0 5 0 0'
                            },
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Missy',
                                bind: '{theRequest.poqty1}'
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Plus',
                                bind: '{theRequest.poqty2}'
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Petite',
                                bind: '{theRequest.poqty3}'
                            }]
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: {
                            type: 'hbox'
                        },
                        margin: '0 0 10 0',
                        items:[{
                            xtype: 'radiogroup',
                            fieldLabel: 'Fabric Testing',
                            width: 175,
                            columns: 1,
                            defaults: {
                                name: 'testing'
                            },
                            bind: {
                                value: '{testValue}'
                            },
                            items: [{
                                boxLabel: 'YES',
                                inputValue: true
                            },{
                                boxLabel: 'NO',
                                inputValue: false
                            }]
                        },{
                            xtype: 'radiogroup',
                            fieldLabel: 'Garment Inspection',
                            labelWidth: 130,
                            width: 260,
                            margin: '0 185 0 0',
                            columns: 1,
                            defaults: {
                                name: 'inspection'
                            },
                            bind: {
                                value: '{inspectValue}'
                            },
                            items: [{
                                boxLabel: 'YES',
                                inputValue: true
                            },{
                                boxLabel: 'NO',
                                inputValue: false
                            }]
                        },{
                            xtype: 'textarea',
                            fieldLabel: 'Memo',
                            labelWidth: 50,
                            labelAlign: 'left',
                            flex: 1,
                            bind: {
                                value: '{theRequest.memo}'
                            }
                        }]
                    },{
                        xtype: 'grid',
                        title: 'Fabric Info',
                        reference: 'request-fabric',
                        //session: true,
                        iconCls: 'x-fa fa-cubes',
                        margin: '0 0 0 0',
                        scrollable: 'y',
                        flex: 1,
                        minHeight: 205,
                        bind: {
                            store: '{fabrics}'
                        },

                        header: {
                            itemPosition: 1,
                            items: [{
                                xtype: 'button',
                                //width: 70,
                                tooltip: 'Add',
                                iconCls: 'x-fa fa-plus',
                                handler: function(btn){
                                    var grid = btn.up('grid[reference="request-fabric"]'),
                                        store = grid.getStore();

                                    store.add({
                                        lineseq: (store.getCount()+1) - 1,
                                        rawmattype: 'FABRICS'
                                    });
                                }
                            },{
                                xtype: 'tbspacer',
                                width: 4
                            },{
                                xtype: 'button',
                                tooltip: 'Remove',
                                iconCls: 'x-fa fa-minus',
                                bind: {
                                    disabled: '{!request-fabric.selection}'
                                },
                                handler: function(btn){
                                    var grid = btn.up('grid[reference="request-fabric"]'),
                                        recs = grid.getSelection();

                                    grid.getStore().remove(recs);

                                }
                            }]
                        },

                        selModel: {
                            //type: 'cellmodel',
                            pruneRemoved: false
                        },

                        viewConfig: {
                            stripeRows: true
                        },

                        features: [{
                            ftype: 'grouping',
                            //startCollapsed: true,
                            hideGroupedHeader: true,
                            groupHeaderTpl: '<span style="font-weight: bolder;">{name}: ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})</span>'
                        }],

                        plugins: [{
                            ptype: 'rowediting',
                            //pluginId: 'fabricRowEdit',
                            ui: 'default',
                            clicksToEdit: 2
                        },{
                            ptype: "gridfilters"
                        }],

                        columns: [{
                            text: "ID",
                            dataIndex: "reqdId",
                            menuDisabled: true,
                            sortable: false,
                            hidden: true
                        },
                        {
                            text: "#",
                            dataIndex: "lineseq",
                            width: 30,
                            menuDisabled: true,
                            sortable: false,
                            hidden: false
                        },
                        {
                            text: "Mat. Type",
                            dataIndex: "rawmattype",
                            menuDisabled: true,
                            sortable: false,
                            hidden: true,
                            editor: {
                                xtype: 'combo',
                                name: 'rawmattype',
                                //store: 'typeStore',
                                bind: {
                                    store: '{rawmattypes}'
                                },
                                displayField: 'id',
                                valueField: 'id',
                                typeAhead: false,
                                //hideLabel: true,
                                //hideTrigger: false,
                                forceSelection: true,
                                //minChars: 1,
                                matchFieldWidth: false,
                                queryMode: 'local'
                                //pageSize: 15,
                                //queryDelay: 500,
                            }
                        },
                        {
                            text: "Label",
                            dataIndex: "label",
                            width: 160,
                            menuDisabled: true,
                            sortable: false,
                            editor: {
                                xtype: "combo",
                                //fieldLabel: "",
                                hideEmptyLabel: true,
                                //labelWidth: 50,
                                //width: 160,
                                //hideTrigger: true,
                                allowBlank: false,
                                editable: true,
                                bind: {
                                    store: '{labeltypes}'
                                },
                                publishes: 'value',
                                valueField: 'text',
                                displayField: 'text',
                                //forceSelection: true,
                                //selectOnFocus: true,
                                matchFieldWidth: false,
                                autoLoadOnValue: true,
                                queryMode: 'local',
                                //queryParam: "filter",
                                //triggerAction: 'last',
                                //minChars: 1,
                                listConfig: {
                                    loadindText: 'Searching...',
                                    emptyText: 'No matching items found.',
                                    width: 320
                                },
                                plugins: [{
                                    ptype: "cleartrigger"
                                }]

                            },
                            renderer: function (value, metaData, record, rowIndex, colIndex) {
                                return value;
                            }
                        },
                        {
                            text: "Style",
                            dataIndex: "style",
                            width: 160,
                            menuDisabled: true,
                            sortable: false,
                            editor: {
                                xtype: 'combo',
                                name: 'style',
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

                                        var cboColor = combo.ownerCt.query('combo[name="color"]')[0];
                                        cboColor.getStore().clearFilter();
                                        cboColor.setValue('');
                                    },
                                    select: function(combo, rec) {
                                        var cboRawType = combo.ownerCt.query('combo[name="rawmattype"]')[0];
                                            //txtUOM = combo.ownerCt.query('textfield[name="uom"]')[0];

                                        cboRawType.setValue(rec.data.text);
                                        //txtUOM.setValue(rec.data.descript);
                                    }

                                }
                            },
                            renderer: function (value, metaData, record, rowIndex, colIndex) {
                                return value;
                            }
                        },
                        {
                            text: "Color",
                            dataIndex: "color",
                            width: 160,
                            menuDisabled: true,
                            sortable: false,
                            editor: {
                                xtype: 'combo',
                                name: 'color',
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
                                            var cboStyle = qe.combo.ownerCt.query('combo[name="style"]')[0],
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
                                        var txtDesc = combo.ownerCt.query('textfield[name="description"]')[0];
                                            //numCost = combo.ownerCt.query('numberfield[name="cost"]')[0];

                                        txtDesc.setValue(rec.data.descript.split('(#)')[0]);
                                        //numCost.setValue(rec.data.descript.split('(#)').pop())
                                    }

                                }
                            }
                        },
                        {
                            text: "Description",
                            dataIndex: "description",
                            flex: 1,
                            menuDisabled: true,
                            sortable: false,
                            editor: {
                                xtype: 'textfield',
                                name: 'description'
                            }
                        },
                        {
                            text: "Yield",
                            columns: [{
                                xtype: 'numbercolumn',
                                text: "Missy",
                                dataIndex: "qty1",
                                menuDisabled: true,
                                sortable: false,
                                format: '0.00',
                                editor: {
                                    xtype: 'numberfield',
                                    name: 'qty1',
                                    allowBlank: false,
                                    minValue: 0
                                }
                            },
                            {
                                xtype: 'numbercolumn',
                                text: "Plus",
                                dataIndex: "qty2",
                                menuDisabled: true,
                                sortable: false,
                                format: '0.00',
                                editor: {
                                    xtype: 'numberfield',
                                    name: 'qty2',
                                    allowBlank: true,
                                    minValue: 0
                                }
                            },
                            {
                                xtype: 'numbercolumn',
                                text: "Petite",
                                dataIndex: "qty3",
                                menuDisabled: true,
                                sortable: false,
                                format: '0.00',
                                editor: {
                                    xtype: 'numberfield',
                                    name: 'qty3',
                                    allowBlank: true,
                                    minValue: 0
                                }
                            }]
                        },
                        {
                            xtype: 'numbercolumn',
                            text: "Width",
                            dataIndex: "width",
                            //width: 90,
                            align: 'center',
                            menuDisabled: true,
                            sortable: false,
                            format: '0.00',
                            editor: {
                                xtype: 'numberfield',
                                name: 'width',
                                allowBlank: true,
                                minValue: 0
                            }
                        },
                        {
                            xtype: 'numbercolumn',
                            text: "Weight",
                            dataIndex: "weight",
                            //width: 90,
                            align: 'center',
                            menuDisabled: true,
                            sortable: false,
                            format: '0.00',
                            editor: {
                                xtype: 'numberfield',
                                name: 'weight',
                                allowBlank: true,
                                minValue: 0
                            }
                        }]
                    },{
                        xtype: 'splitter'
                    },{
                        xtype: 'grid',
                        title: 'Material Info',
                        reference: 'request-material',
                        //session: true,
                        iconCls: 'x-fa fa-tasks',
                        margin: '0 0 0 0',
                        scrollable: 'y',
                        flex: 2,
                        minHeight: 205,
                        bind: {
                            store: '{others}'
                        },

                        header: {
                            itemPosition: 1,
                            items: [{
                                xtype: 'button',
                                //width: 70,
                                tooltip: 'Add',
                                iconCls: 'x-fa fa-plus',
                                menu: {
                                    items: [{
                                        text: 'Print',
                                        type: 'PRINTS',
                                        iconCls: 'x-fa fa-plus'
                                    },{
                                        text: 'Sub. Paper',
                                        type: 'SUBLIMATION PAPER',
                                        iconCls: 'x-fa fa-plus'
                                    },{
                                        text: 'Stone',
                                        type: 'STONE',
                                        iconCls: 'x-fa fa-plus'
                                    },{
                                        text: 'Trim',
                                        type: 'TRIMS',
                                        iconCls: 'x-fa fa-plus'
                                    }],
                                    listeners: {
                                        click: {
                                            fn: function(menu, item){
                                                var grid = menu.ownerCmp.up('grid[reference="request-material"]'),
                                                    store = grid.getStore();

                                                store.add({
                                                    rawmattype: item.type
                                                });
                                            }
                                        }
                                    }
                                }
                            },{
                                xtype: 'tbspacer',
                                width: 4
                            },{
                                xtype: 'button',
                                tooltip: 'Remove',
                                iconCls: 'x-fa fa-minus',
                                bind: {
                                    disabled: '{!request-material.selection}'
                                },
                                handler: function(btn){
                                    var grid = btn.up('grid[reference="request-material"]'),
                                        recs = grid.getSelection();

                                    grid.getStore().remove(recs);
                                }
                            }]
                        },

                        selModel: {
                            //type: 'cellmodel',
                            pruneRemoved: false
                        },

                        viewConfig: {
                            stripeRows: true
                        },

                        features: [{
                            ftype: 'grouping',
                            hideGroupedHeader: true,
                            groupHeaderTpl: '{name}: ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
                        }],

                        plugins: [{
                            ptype: 'rowediting',
                            //pluginId: 'materialRowEdit',
                            ui: 'default',
                            clicksToEdit: 2
                        },{
                            ptype: "gridfilters"
                        }],

                        columns: [{
                            text: "ID",
                            dataIndex: "reqdId",
                            menuDisabled: true,
                            sortable: false,
                            hidden: true
                        },
                        {
                            text: "#",
                            dataIndex: "lineseq",
                            width: 30,
                            menuDisabled: true,
                            sortable: false,
                            hidden: false
                        },
                        {
                            text: "Mat. Type",
                            dataIndex: "rawmattype",
                            menuDisabled: true,
                            sortable: false,
                            hidden: true,
                            editor: {
                                xtype: 'combo',
                                name: 'rawmattype',
                                //store: 'typeStore',
                                bind: {
                                    store: '{rawmattypes}'
                                },
                                displayField: 'id',
                                valueField: 'id',
                                //typeAhead: false,
                                //hideLabel: true,
                                //hideTrigger: false,
                                forceSelection: true,
                                //minChars: 1,
                                matchFieldWidth: false,
                                queryMode: 'local',
                                //pageSize: 15,
                                //queryDelay: 500,
                                allowBlank: false,
                                listeners: {

                                }
                            }
                        },
                        {
                            text: "Label",
                            dataIndex: "label",
                            width: 160,
                            menuDisabled: true,
                            sortable: false,
                            editor: {
                                xtype: "combo",
                                //fieldLabel: "",
                                hideEmptyLabel: true,
                                //labelWidth: 50,
                                //width: 160,
                                //hideTrigger: true,
                                matchFieldWidth: false,
                                allowBlank: false,
                                //editable: true,
                                bind: {
                                    store: '{labeltypes}'
                                    //value: '{materials.selection.matcategory}',
                                    //disabled: '{!materials.selection}'
                                },
                                publishes: 'value',
                                valueField: 'text',
                                displayField: 'text',
                                //forceSelection: true,
                                //selectOnFocus: true,
                                autoLoadOnValue: true,
                                queryMode: 'local',
                                //queryParam: "filter",
                                //triggerAction: 'last',
                                //minChars: 1,
                                listConfig: {
                                    loadindText: 'Searching...',
                                    emptyText: 'No matching items found.',
                                    width: 320
                                },
                                plugins: [{
                                    ptype: "cleartrigger"
                                }],
                                listeners: {
                                    select: function(combo, rec, e){
                                        var txtType = combo.ownerCt.query('combo[name="rawmattype"]')[0];
                                        txtType.setValue(rec.data.type);
                                    }
                                }
                            },
                            renderer: function (value, metaData, record, rowIndex, colIndex) {
                                return value;
                            }
                        },
                        {
                            text: "Style",
                            dataIndex: "style",
                            width: 160,
                            menuDisabled: true,
                            sortable: false,
                            editor: {
                                xtype: 'combo',
                                name: 'style',
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

                                        var cboColor = combo.ownerCt.query('combo[name="color"]')[0];
                                        cboColor.getStore().clearFilter();
                                        cboColor.setValue('');
                                    },
                                    select: function(combo, rec) {
                                        var cboRawType = combo.ownerCt.query('combo[name="rawmattype"]')[0];
                                        //txtUOM = combo.ownerCt.query('textfield[name="uom"]')[0];

                                        cboRawType.setValue(rec.data.text);
                                        //txtUOM.setValue(rec.data.descript);
                                    }

                                }
                            },
                            renderer: function (value, metaData, record, rowIndex, colIndex) {
                                return value;
                            }
                        },
                        {
                            text: "Color",
                            dataIndex: "color",
                            width: 160,
                            menuDisabled: true,
                            sortable: false,
                            editor: {
                                xtype: 'combo',
                                name: 'color',
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
                                            var cboStyle = qe.combo.ownerCt.query('combo[name="style"]')[0],
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
                                        var txtDesc = combo.ownerCt.query('textfield[name="description"]')[0];
                                        //numCost = combo.ownerCt.query('numberfield[name="cost"]')[0];

                                        txtDesc.setValue(rec.data.descript.split('(#)')[0]);
                                        //numCost.setValue(rec.data.descript.split('(#)').pop())
                                    }

                                }
                            }
                        },
                        {
                            text: "Description",
                            dataIndex: "description",
                            flex: 1,
                            menuDisabled: true,
                            sortable: false,
                            editor: {
                                xtype: 'textfield',
                                name: 'description'
                            }
                        },
                        {
                            text: "Size",
                            columns: [{
                                text: "Length",
                                dataIndex: "length",
                                menuDisabled: true,
                                sortable: false,
                                editor: {
                                    xtype: 'textfield',
                                    name: 'length',
                                    allowBlank: true,
                                    minValue: 0
                                }
                            },
                            {
                                text: "Width",
                                dataIndex: "width",
                                menuDisabled: true,
                                sortable: false,
                                editor: {
                                    xtype: 'textfield',
                                    name: 'width',
                                    allowBlank: true,
                                    minValue: 0
                                }
                            }]
                        },
                        {
                            xtype: 'numbercolumn',
                            text: "Qty",
                            dataIndex: "qty1",
                            //width: 90,
                            align: 'center',
                            menuDisabled: true,
                            sortable: false,
                            format: '0.00',
                            editor: {
                                xtype: 'numberfield',
                                name: 'qty1',
                                allowBlank: false,
                                minValue: 0
                            }
                        }]
                    }]
                },{
                    title: 'Email To',
                    reference: "request-mail",
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    scrollable: 'y',

                    items: [{
                        xtype: 'tagfield',
                        name: 'recipients',
                        fieldLabel: 'Recipients',
                        //hideLabel: true,
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            store: '{vendors}',
                            value: '{theReqe.recipients}'
                        },
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: true,
                        //pageSize: 50,
                        queryMode: 'local',
                        createNewOnEnter: true,
                        createNewOnBlur: true,
                        //queryParam: "filter",
                        //triggerAction: 'all',
                        //lastQuery: '',
                        filterPickList: true,
                        //minChars: 0,
                        //matchFieldWidth: false,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    },{
                        xtype: 'textfield',
                        name: 'subject',
                        fieldLabel: 'Subject',
                        bind: {
                            value: '{theReqe.subject}'
                        }
                    },{
                        xtype: 'textarea',
                        id: 'dropAreaView',
                        name: 'body',
                        flex: 5,
                        fieldLabel: 'Message',
                        bind: {
                            value: '{theReqe.body}'
                        }
                    },{
                        //title: 'Attachments:',
                        reference: 'attachment',

                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },

                        minHeight: 80,
                        margin: '5 0 0 0',
                        style: {
                            //border: '1px solid #cfcfcf'
                        },

                        items: [{
                            xtype: 'style-edit-upload-toolbar',
                            region: 'north',
                            border: '1 0 1 0',
                            listeners: {
                                actremoveall: function(tb, btn){
                                    var view = tb.nextSibling('viewupload');

                                    view.fileUpload.filesQueue.length = 0;
                                    view.getStore().removeAll();
                                },
                                render: function(tb){
                                    tb.togglep.setHidden(true);
                                }
                            }
                        },{
                            xtype: 'viewupload',
                            region: 'center',

                            dropZone: 'dropAreaView',

                            selectionModel: {
                                mode: 'multi'
                            },

                            cls: 'sample-attach-view',
                            overItemCls: "x-item-over",
                            itemSelector: "div.thumb-wrap",

                            preserveScrollOnRefresh: true,
                            deferInitialRefresh: true,
                            enableTextSelection: false,

                            scrollable: true,
                            padding: 5,

                            bind: {
                                store: '{theSample.filesInProducts}'
                            },

                            tpl: new Ext.XTemplate(
                                '<tpl for=".">',
                                '<div class="thumb-wrap x-unselectable">',
                                //'<a class="link" href="{linkUrl}">',
                                '<div class="thumb">',
                                //'<img class="{F_BFLAG}" src="resources/images/default.png?w=50" title="{name}" />',
                                '<i class="fa fa-file-{type:this.getFileType}-o fa-5x" style="padding-top:20px;"></i>',
                                //'<div class="{F_BFLAG}">Rejected</div>',
                                '<div class="title">{name:ellipsis(38)}</div>',
                                '</div>',
                                //'</a>',
                                '</div>',
                                '</tpl>',
                                '<div class="x-clear"></div>',
                                {
                                    getFileType: function(v){
                                        var a = ['image', 'pdf', 'excel', 'word', 'powerpoint'];

                                        for(var i = 0; i < a.length; i++){
                                            if(v.indexOf(a[i]) != -1) {
                                                return a[i];
                                            }
                                        }

                                        return 'code';
                                    }
                                }
                            ),
                            listeners: {
                                render: function(c){
                                    var toolbar = c.previousSibling('toolbar');
                                    toolbar.add(c.fileUpload);

                                    c.getStore().on('load', function(s){
                                        c.ownerCt.getHidden(s.getCount() != 0);
                                    });
                                },
                                itemdblclick: {
                                    //fn: 'onAttachItemDblClick',
                                    //scope: this.controller
                                },
                                selectionchange: {
                                    //fn: 'onItemSelectionChange',
                                    //scope: this.controller
                                },
                                dropped: function(view, rec){
                                    view.ownerCt.setHidden(view.getStore().getCount() <= 0);
                                },
                                itemremove: function(records, index, item, view){
                                    view.ownerCt.setHidden(view.getStore().getCount() <= 0);
                                }
                            }
                        }]
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }
});
