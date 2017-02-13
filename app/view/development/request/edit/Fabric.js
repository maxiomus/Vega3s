
Ext.define('Vega.view.development.request.edit.Fabric',{
    extend: 'Ext.window.Window',

    requires: [
        'Vega.view.development.request.edit.FabricController',
        'Vega.view.development.request.edit.FabricModel',
        'Ext.data.proxy.Memory',
        'Ext.ux.form.field.MemoryCombo'
    ],

    alias: 'widget.request-edit-fabric',

    controller: 'request-edit-fabric',
    viewModel: {
        type: 'request-edit-fabric'
    },

    bind: '{title}',

    minWidth: 720,
    maxHeight: 560,

    monitorResize: true,
    maximizable: true,
    //alwaysOnTop: true,
    constrain: true,
    //maximized: true,
    closable: true,
    scrollable: 'y',
    //padding: 4,

    layout: 'auto',

    modelValidation: true,

    dockedItems: [{

    }],

    initComponent: function(c){
        var me = this;

        var memComponents = Ext.create('Ext.data.Store', {
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

        var remoteComponents = Ext.create('Vega.store.Components', {
            autoLoad: true,

            listeners: {
                load: function(s){
                    memComponents.getProxy().setData(s.getRange());
                    memComponents.load();
                }
            }
        });

        var memColors = Ext.create('Ext.data.Store', {
            //field: ['id', 'text', 'descript'],
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
                load: function (s) {
                    memColors.getProxy().setData(s.getRange());
                    memColors.load();
                }
            }
        });

        Ext.apply(remoteComponents.getProxy().extraParams, {
            type: 'FABRICS'
        });

        Ext.apply(remoteColors.getProxy().extraParams, {
            type: 'FABRICS'
        });

        Ext.applyIf(me, {
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 90,
                msgTarget: Ext.supports.Touch ? 'side' : 'qtip'
            },
            items: [{
                xtype: 'form',
                //anchor: '80%',
                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                //scrollable: true,
                margin: 10,
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    //flex: 1,
                    defaults: {
                        width: 300
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'PoNo',
                        fieldLabel: 'P.O.W #',
                        bind: '{theFabric.PoNo}',
                        allowBlank: true
                    }]
                },{
                    xtype: 'fieldcontainer',
                    //fieldLabel: 'Name',
                    layout: 'hbox',
                    //combineErrors: true,
                    defaultType: 'datefield',
                    defaults: {
                        width: 300
                        //labelAlign: 'top'
                        //hideLabel: 'true'
                    },
                    //flex: 1,
                    items: [{
                        name: 'Issued',
                        fieldLabel: 'Date Issued',
                        bind: '{theFabric.Issued}',
                        allowBlank: false
                    },{
                        name: 'Due',
                        fieldLabel: 'Due Date',
                        bind: '{theFabric.Due}',
                        margin: '0 0 0 20',
                        allowBlank: true
                    }]
                },{
                    xtype: 'fieldcontainer',
                    //fieldLabel: 'Name',
                    layout: 'hbox',
                    //combineErrors: true,
                    defaultType: 'datefield',
                    defaults: {
                        width: 300
                    },
                    //flex: 1,
                    items: [{
                        name: 'ETA',
                        fieldLabel: 'ETA Date',
                        bind: '{theFabric.ETA}',
                        allowBlank: true
                    },{
                        name: 'Received',
                        fieldLabel: 'Date Received',
                        bind: '{theFabric.Received}',
                        margin: '0 0 0 20',
                        allowBlank: true
                    }]
                },{
                    xtype: 'fieldcontainer',
                    //fieldLabel: 'Name',
                    layout: 'hbox',
                    //combineErrors: true,
                    //defaultType: 'textfield',
                    defaults: {
                        width: 300
                    },
                    //flex: 1,
                    items: [{
                        xtype: "memorycombo",
                        name: 'Fabric',
                        //itemId: "Prints",
                        fieldLabel: "Fabric",
                        //labelWidth: 50,
                        //width: 160,
                        //autoSelect: false,
                        hideTrigger: true,
                        //publishes: 'value',
                        valueField: 'label',
                        displayField: 'label',
                        bind: {
                            //store: '{components}',
                            value: '{theFabric.Fabric}'
                        },
                        store: memComponents,
                        autoLoadOnValue: true,
                        //forceSelection: false,
                        //selectOnFocus: true,
                        pageSize: 50,
                        //minChars: 0,
                        queryMode: 'local',
                        triggerAction: 'query',
                        //lastQuery: '',
                        //queryParam: "filter",
                        matchFieldWidth: false,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
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
                                if(combo.isExpanded){
                                    combo.collapse();
                                }
                                var cboColor = this.ownerCt.ownerCt.query('combo[name="Color"]')[0],
                                    txtDesc = this.ownerCt.ownerCt.query('textfield[name="Descript"]')[0];

                                cboColor.getStore().clearFilter();
                                cboColor.setValue('');
                                txtDesc.setValue('');
                            },
                            /*
                             beforequery: {
                             fn: function(qe){
                             delete qe.combo.lastQuery;
                             }
                             },
                             */
                            select: {
                                fn: function(combo, rec, e){

                                    /*
                                    var cboColor = this.ownerCt.ownerCt.query('combo[name="Color"]')[0],
                                        store = cboColor.getStore();

                                    store.clearFilter();

                                    store.filter([{
                                        property: 'descript',
                                        value: rec.data.label.trim(),
                                        operator: '='
                                    }]);

                                    Ext.apply(store.getProxy().extraParams, {
                                        type: rec.data.text.trim(),
                                        style: rec.data.label.trim()
                                    });

                                    store.reload({
                                        callback: function(){
                                            cboColor.select(store.first());
                                            cboColor.fireEvent('select', combo, [store.first()]);
                                        }
                                    });
                                    */
                                }
                            }
                        }
                    },{
                        xtype: "memorycombo",
                        name: 'Color',
                        //itemId: "cboColor",
                        fieldLabel: "Color",
                        margin: '0 0 0 20',
                        //labelWidth: 50,
                        //width: 160,
                        //autoSelect: false,
                        hideTrigger: true,
                        store: memColors,
                        bind: {
                            //store: '{colors}',
                            value: '{theFabric.Color}'
                        },
                        valueField: 'label',
                        displayField: 'label',
                        //forceSelection: false,
                        //selectOnFocus: true,
                        //autoLoadOnValue: true,
                        pageSize: 50,
                        //minChars: 0,
                        queryMode: 'local',
                        //queryParam: "filter",
                        //triggerAction: 'all',
                        //lastQuery: '',
                        matchFieldWidth: false,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        tpl: '<tpl for=".">' +
                        '<tpl if="[xindex] == 1">' +
                        '<table class="cbo-list">' +
                        '<tr>' +
                        '<th width="65%">Color</th>' +
                        '<th width="35%">Code #</th>' +
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
                        listeners: {
                            triggerClear: function(combo){
                                var txtDesc = this.ownerCt.ownerCt.query('textfield[name="Descript"]')[0];
                                txtDesc.setValue('');
                            },
                            beforequery: {
                                fn: function(qe){
                                    var cboStyle = qe.combo.ownerCt.query('combo[name="Fabric"]')[0],
                                        store = qe.combo.getStore();

                                    //console.log(cboStyle, cboStyle.getValue())

                                    if(!Ext.isEmpty(cboStyle.getValue())){
                                        store.clearFilter();

                                        store.filter([{
                                            property: 'descript',
                                            value: cboStyle.getValue().toUpperCase(),
                                            operator: '='
                                        }]);
                                    }
                                    //delete qe.combo.lastQuery;
                                }
                            },
                            select: {
                                fn: function(combo, record, e){
                                    // Error
                                    //console.log('color select', this.getSelection());
                                    var me = this,
                                        txtDesc = me.ownerCt.ownerCt.query('textfield[name="Descript"]')[0];
                                    txtDesc.setValue(me.getSelection().data.text);
                                },
                                buffer: 10
                            },
                            change: function(combo, newValue, oldValue){

                            }
                        }
                    }]
                },{
                    xtype: 'textfield',
                    name: 'Descript',
                    fieldLabel: 'Description',
                    bind: '{theFabric.Descript}',
                    //flex: 1,
                    allowBlank: true
                },{
                    xtype: 'fieldcontainer',
                    //fieldLabel: 'Name',
                    layout: 'hbox',
                    //combineErrors: true,
                    defaults: {
                        width: 300
                    },
                    //flex: 1,
                    items: [{
                        xtype: "combo",
                        name: 'Vendor',
                        //itemId: "cboStones",
                        fieldLabel: "Vendor",
                        allowBlank: true,
                        //labelWidth: 50,
                        //width: 160,
                        hideTrigger: true,
                        bind: {
                            store: '{vendor}',
                            value: '{theFabric.Vendor}'
                        },
                        //store: vendorStore,
                        autoLoadOnValue: true,
                        valueField: "id",
                        displayField: "text",
                        //forceSelection: false,
                        //selectOnFocus: true,
                        queryMode: 'local',
                        //queryParam: "filter",
                        //triggerAction: 'all',
                        //lastQuery: '',
                        minChars: 1,
                        matchFieldWidth: false,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }]
                },{
                    xtype: 'fieldcontainer',
                    //fieldLabel: 'Name',
                    layout: 'hbox',
                    //combineErrors: true,
                    defaults: {
                        width: 300
                    },
                    //flex: 1,
                    items: [{
                        xtype: "combo",
                        name: 'Coordinator',
                        //itemId: "cboStones",
                        fieldLabel: "Coordinator",
                        allowBlank: true,
                        //labelWidth: 50,
                        //width: 160,
                        hideTrigger: true,
                        bind: {
                            store: '{coordinator}',
                            value: '{theFabric.Coordinator}'
                        },
                        //store: vendorStore,
                        autoLoadOnValue: true,
                        valueField: "text",
                        displayField: "text",
                        //forceSelection: false,
                        //selectOnFocus: true,
                        queryMode: 'local',
                        //queryParam: "filter",
                        //triggerAction: 'all',
                        //lastQuery: '',
                        minChars: 0,
                        matchFieldWidth: true,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    },{
                        xtype: "combo",
                        name: 'Dept',
                        //itemId: "cboStones",
                        fieldLabel: "Account",
                        margin: '0 0 0 20',
                        allowBlank: true,
                        //labelWidth: 50,
                        //width: 160,
                        hideTrigger: true,
                        bind: {
                            store: '{dept}',
                            value: '{theFabric.Dept}'
                        },
                        //store: vendorStore,
                        autoLoadOnValue: true,
                        valueField: "id",
                        displayField: "id",
                        //forceSelection: false,
                        //selectOnFocus: true,
                        queryMode: 'local',
                        //queryParam: "filter",
                        //triggerAction: 'all',
                        //lastQuery: '',
                        minChars: 0,
                        matchFieldWidth: false,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }]
                },{
                    xtype: 'fieldcontainer',
                    //fieldLabel: 'Name',
                    layout: 'hbox',
                    //combineErrors: true,
                    defaultType: 'textfield',
                    defaults: {
                        width: 300
                    },
                    //flex: 1,
                    items: [{
                        name: 'RequestQty',
                        fieldLabel: 'Req. Qty',
                        bind: '{theFabric.RequestQty}',
                        allowBlank: false
                    },{
                        xtype: 'textfield',
                        name: 'LotNo',
                        fieldLabel: 'Lot #',
                        bind: '{theFabric.LotNo}',
                        flex: 1,
                        margin: '0 0 0 20',
                        allowBlank: true
                    }]
                },{
                    xtype: 'textarea',
                    name: 'Memo',
                    fieldLabel: 'Memo',
                    bind: '{theFabric.Memo}',
                    //flex: 1,
                    allowBlank: true,
                    grow: true,
                    growMax: 100
                },{
                    xtype: 'fieldcontainer',
                    //fieldLabel: 'Name',
                    layout: 'hbox',
                    //combineErrors: true,
                    defaultType: 'datefield',
                    defaults: {
                        readOnly: true,
                        width: 300
                        //labelAlign: 'top'
                        //hideLabel: 'true'
                    },
                    //flex: 1,
                    items: [{
                        name: 'CDate',
                        fieldLabel: 'Date Created',
                        bind: '{theFabric.CDate}',
                        allowBlank: false
                    },{
                        xtype: 'textfield',
                        name: 'CUser',
                        fieldLabel: 'Created By',
                        bind: '{theFabric.CUser}',
                        margin: '0 0 0 20',
                        allowBlank: false
                    }]
                },{
                    xtype: 'fieldcontainer',
                    //fieldLabel: 'Name',
                    layout: 'hbox',
                    //combineErrors: true,
                    defaultType: 'datefield',
                    defaults: {
                        readOnly: true,
                        width: 300
                        //labelAlign: 'top'
                        //hideLabel: 'true'
                    },
                    //flex: 1,
                    items: [{
                        name: 'UDate',
                        fieldLabel: 'Date Modified',
                        bind: '{theFabric.UDate}',
                        allowBlank: true
                    },{
                        xtype: 'textfield',
                        name: 'MUser',
                        fieldLabel: 'Updated By',
                        bind: '{theFabric.MUser}',
                        margin: '0 0 0 20',
                        allowBlank: true
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }
});
