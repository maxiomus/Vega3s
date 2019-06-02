
Ext.define('Vega.view.development.request.edit.Work',{
    extend: 'Ext.window.Window',

    requires: [
        'Vega.view.development.request.edit.WorkController',
        'Vega.view.development.request.edit.WorkModel'
    ],

    alias: 'widget.request-edit-work',

    controller: 'request-edit-work',
    viewModel: {
        type: 'request-edit-work'
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

    initComponent: function(c){
        var me = this;

        /*
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
                    memComponents.getProxy().setData(remoteComponents.getRange());
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

        Ext.apply(Ext.getStore('Components').getProxy().extraParams, {
            type: 'FABRICS'
        });

        Ext.apply(Ext.getStore('remoteRawColors').getProxy().extraParams, {
            type: 'FABRICS'
        });
        */

        Ext.getStore('memComponents').clearFilter();
        Ext.getStore('memComponents').filter('text', 'FABRICS');

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
                        bind: '{theWork.Issued}',
                        allowBlank: false
                    },{
                        name: 'Due',
                        fieldLabel: 'Due Date',
                        bind: '{theWork.Due}',
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
                        bind: '{theWork.ETA}',
                        allowBlank: true
                    },{
                        name: 'Received',
                        fieldLabel: 'Date Received',
                        bind: '{theWork.Received}',
                        margin: '0 0 0 20',
                        allowBlank: true
                    }]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    //flex: 1,
                    defaults: {
                        width: 300
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'Pow',
                        fieldLabel: 'P.O.W #',
                        bind: '{theWork.Pow}',
                        allowBlank: false
                    },{
                        xtype: "combo",
                        name: 'Customer',
                        //itemId: "cboStones",
                        fieldLabel: "Customer",
                        margin: '0 0 0 20',
                        allowBlank: false,
                        //labelWidth: 50,
                        //width: 160,
                        hideTrigger: true,
                        bind: {
                            store: '{customer}',
                            value: '{theWork.Customer}'
                        },
                        //store: vendorStore,
                        autoSelect: false,
                        autoLoadOnValue: true,
                        valueField: "id",
                        displayField: "id",
                        //forceSelection: false,
                        selectOnFocus: true,
                        selectOnTab: true,
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
                        xtype: "combo",
                        name: 'Style',
                        //itemId: "cboPrint",
                        fieldLabel: "Style No.",
                        allowBlank: true,
                        //labelWidth: 50,
                        //width: 160,
                        hideTrigger: true,
                        publishes: 'value',
                        bind: {
                            store: '{styles}',
                            value: '{theWork.Style}'
                        },
                        //store: styleStore,
                        autoSelect: false,
                        valueField: 'id',
                        displayField: 'id',
                        //forceSelection: false,
                        selectOnFocus: true,
                        selectOnTab: true,
                        matchFieldWidth: false,
                        minChars: 0,
                        pageSize: 25,

                        queryMode: "remote",
                        queryParam: "filter",
                        queryDelay: 800,
                        //triggerAction: 'last',
                        lastQuery: '',
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            beforequery: {
                                fn: function(qe){
                                    delete qe.combo.lastQuery;
                                }
                            },
                            select: function(combo, record, e){

                            }
                        }
                    },{
                        xtype: "combo",
                        name: 'Body',
                        //itemId: "cboColor",
                        fieldLabel: "Body No.",
                        margin: '0 0 0 20',
                        allowBlank: true,
                        //labelWidth: 50,
                        //width: 160,
                        //autoSelect: false,
                        hideTrigger: true,
                        bind: {
                            store: '{body}',
                            value: '{theWork.Body}'
                        },
                        autoSelect: false,
                        valueField: 'id',
                        displayField: 'id',
                        //forceSelection: false,
                        selectOnFocus: true,
                        selectOnTab: true,
                        pageSize: 25,
                        minChars: 0,
                        queryMode: "remote",
                        queryParam: "filter",
                        //triggerAction: 'last',
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
                        listeners: {
                            triggerClear: function(combo){

                            },
                            beforequery: {
                                fn: function(qe){
                                    delete qe.combo.lastQuery;
                                }
                            },
                            select: {
                                fn: function(combo, record, e){

                                },
                                buffer: 10
                            },
                            change: function(combo, newValue, oldValue){

                            }
                        }
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
                        xtype: "combo",
                        name: 'Fabric',
                        //itemId: "Prints",
                        fieldLabel: "Fabric",
                        allowBlank: true,
                        //labelWidth: 50,
                        //width: 160,
                        //autoSelect: false,
                        hideTrigger: true,
                        publishes: 'value',
                        valueField: 'label',
                        displayField: 'label',
                        bind: {
                            //store: '{components}',
                            value: '{theWork.Fabric}'
                        },
                        store: 'memComponents',
                        //autoSelect: false,
                        autoLoadOnValue: true,
                        //forceSelection: false,
                        //selectOnFocus: true,
                        //selectOnTab: true,
                        pageSize: 50,
                        minChars: 0,
                        queryMode: 'local',
                        triggerAction: 'query',
                        //queryParam: "filter",
                        //lastQuery: '',
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

                                var cboColor = this.ownerCt.ownerCt.query('combo[name="Color"]')[0];
                                cboColor.getStore().clearFilter();
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

                                }
                            }
                        }
                    },{
                        xtype: "combo",
                        name: 'Color',
                        //itemId: "cboColor",
                        fieldLabel: "Color",
                        margin: '0 0 0 20',
                        //labelWidth: 50,
                        //width: 160,
                        //autoSelect: false,
                        hideTrigger: true,
                        store: 'memRawColors',
                        bind: {
                            //store: '{colors}',
                            value: '{theWork.Color}'
                        },
                        valueField: 'label',
                        displayField: 'label',
                        //forceSelection: false,
                        //selectOnFocus: true,
                        //autoLoadOnValue: true,
                        pageSize: 50,
                        minChars: 0,
                        queryMode: 'local',
                        triggerAction: 'query',
                        //queryParam: "filter",
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
                        '<td>{text}</td>' +
                        '</tr>' +
                        '<tpl if="[xcount-xindex]==0">' +
                        '</table>' +
                        '</tpl>' +
                        '</tpl>',
                        listeners: {
                            triggerClear: function(combo){
                                if(combo.isExpanded){
                                    combo.collapse();
                                }
                            },
                            beforequery: {
                                fn: function(qe){
                                    var cboStyle = qe.combo.ownerCt.query('combo[name="Fabric"]')[0],
                                        store = qe.combo.getStore();

                                    //console.log(cboStyle, cboStyle.getValue())

                                    if(!Ext.isEmpty(cboStyle.getValue())){
                                        store.clearFilter();

                                        store.filter([{
                                            property: 'text',
                                            value: cboStyle.getValue(),
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
                                },
                                buffer: 10
                            },
                            change: function(combo, newValue, oldValue){

                            }
                        }
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
                        name: 'Dept',
                        //itemId: "Dept",
                        fieldLabel: "Dept",
                        allowBlank: false,
                        //labelWidth: 50,
                        //width: 160,
                        //hideTrigger: true,
                        bind: {
                            store: '{dept}',
                            value: '{theWork.Dept}'
                        },
                        //store: vendorStore,
                        autoSelect: false,
                        autoLoadOnValue: true,
                        valueField: "id",
                        displayField: "text",
                        //forceSelection: false,
                        selectOnFocus: true,
                        selectOnTab: true,
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
                    },{
                        xtype: "combo",
                        name: 'Coordinator',
                        //itemId: "cboStones",
                        fieldLabel: "Coordinator",
                        margin: '0 0 0 20',
                        allowBlank: true,
                        //labelWidth: 50,
                        //width: 160,
                        hideTrigger: true,
                        bind: {
                            store: '{coordinator}',
                            value: '{theWork.Coordinator}'
                        },
                        //store: vendorStore,
                        autoLoadOnValue: true,
                        valueField: "text",
                        displayField: "text",
                        //forceSelection: false,
                        selectOnFocus: true,
                        selectOnTab: true,
                        queryMode: 'local',
                        //queryParam: "filter",
                        //triggerAction: 'all',
                        //lastQuery: '',
                        minChars: 0,
                        matchFieldWidth: true,
                        listeners: {
                            change: function(c){
                                console.log(c.getStore());
                            }
                        },
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
                        name: 'Maker',
                        //itemId: "cboStones",
                        fieldLabel: "Cutter",
                        allowBlank: true,
                        //labelWidth: 50,
                        //width: 160,
                        hideTrigger: true,
                        bind: {
                            store: '{samplers}',
                            value: '{theWork.Maker}'
                        },
                        //store: vendorStore,
                        autoSelect: false,
                        autoLoadOnValue: true,
                        valueField: "id",
                        displayField: "id",
                        //forceSelection: false,
                        selectOnFocus: true,
                        selectOnTab: true,
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
                        listeners: {
                            render: function(c){
                                //var s = this.up('viewer').getViewModel().getStore('samplers');
                                //s.load();
                                //c.bindStore(s);
                            },
                            focus: function(c){
                                c.getStore().filter('text', 'Sample Cutter');
                            },
                            scope: this
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    },{
                        xtype: "combo",
                        name: 'Worker',
                        //itemId: "cboStones",
                        fieldLabel: "Sewer",
                        margin: '0 0 0 20',
                        allowBlank: true,
                        //labelWidth: 50,
                        //width: 160,
                        hideTrigger: true,
                        bind: {
                            store: '{samplers}',
                            value: '{theWork.Worker}'
                        },
                        //store: vendorStore,
                        autoLoadOnValue: true,
                        autoSelect: false,
                        valueField: "id",
                        displayField: "id",
                        //forceSelection: false,
                        selectOnFocus: true,
                        selectOnTab: true,
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
                        listeners: {
                            render: function(c){
                                //var s = this.up('viewer').getViewModel().getStore('samplers');
                                //s.load();
                                //c.bindStore(s);
                            },
                            focus: function(c){
                                c.getStore().filter('text', 'Sample Sewer');
                            },
                            scope: this
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
                    defaultType: 'combo',
                    defaults: {
                        width: 300
                    },
                    //flex: 1,
                    items: [{
                        xtype: 'combo',
                        name: 'Type',
                        //itemId: "cboStones",
                        fieldLabel: "Work Type",
                        allowBlank: false,
                        //labelWidth: 50,
                        //width: 160,
                        hideTrigger: true,
                        bind: {
                            store: '{type}',
                            value: '{theWork.Type}'
                        },
                        //store: vendorStore,
                        autoSelect: false,
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
                        xtype: 'combo',
                        name: 'Priority',
                        //itemId: "cboStones",
                        fieldLabel: "Proto Type",
                        margin: '0 0 0 20',
                        allowBlank: false,
                        //labelWidth: 50,
                        //width: 160,
                        hideTrigger: true,
                        bind: {
                            store: '{priority}',
                            value: '{theWork.Priority}'
                        },
                        //store: vendorStore,
                        autoSelect: false,
                        autoLoadOnValue: true,
                        valueField: "id",
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
                    }]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: {
                        xtype: 'numberfield',
                        name: 'RequestQty',
                        fieldLabel: 'Req. Qty',
                        width: 300,
                        minValue: 1,
                        bind: '{theWork.RequestQty}',
                        margin: '0 0 0 0',
                        allowBlank: false
                    }
                },
                {
                    xtype: 'textarea',
                    name: 'Memo',
                    fieldLabel: 'Notes',
                    bind: '{theWork.Memo}',
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
                        name: 'CreatedOn',
                        fieldLabel: 'Date Created',
                        bind: '{theWork.CreatedOn}'
                    },{
                        xtype: 'textfield',
                        name: 'UserID',
                        fieldLabel: 'Created By',
                        bind: '{theWork.UserID}',
                        margin: '0 0 0 20'
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
                        name: 'UpdatedOn',
                        fieldLabel: 'Date Modified',
                        bind: '{theWork.UpdatedOn}'
                    },{
                        xtype: 'textfield',
                        name: 'UpdateUser',
                        fieldLabel: 'Updated By',
                        bind: '{theWork.UpdateUser}',
                        margin: '0 0 0 20'
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }
});
