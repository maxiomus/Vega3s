
Ext.define('Vega.view.development.request.edit.Graphic',{
    extend: 'Ext.window.Window',

    requires: [
        //'Vega.view.development.request.edit.GraphicController',
        //'Vega.view.development.request.edit.GraphicModel'
    ],

    alias: 'widget.request-edit-graphic',

    /*
    controller: 'request-edit-graphic',
    viewModel: {
        type: 'request-edit-graphic'
    },
    */

    bind: '{title}',

    minWidth: 660,
    maxHeight: 560,

    monitorResize: true,
    maximizable: true,
    //alwaysOnTop: true,
    constrain: true,
    //maximized: true,
    closable: true,
    scrollable: 'y',
    //padding: 4,

    layout: {
        type: 'auto'
    },

    dockedItems: [{

    }],

    initComponent: function(c){
        var me = this;

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
                    //pack: 'start',
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
                        minWidth: 300
                        //labelAlign: 'top'
                        //hideLabel: 'true'
                    },
                    items: [{
                        name: 'Issued',
                        fieldLabel: 'Date Issued',
                        bind: '{theGraphic.Issued}',
                        allowBlank: false
                    },{
                        name: 'Due',
                        fieldLabel: 'Due Date',
                        bind: '{theGraphic.Due}',
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
                        minWidth: 300
                    },
                    //flex: 1,
                    items: [{
                        name: 'ETA',
                        fieldLabel: 'ETA Date',
                        bind: '{theGraphic.ETA}',
                        allowBlank: true
                    },{
                        name: 'Received',
                        fieldLabel: 'Date Received',
                        bind: '{theGraphic.Received}',
                        margin: '0 0 0 20',
                        allowBlank: true
                    }]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    //flex: 1,
                    defaults: {
                        minWidth: 300
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'PrintNo',
                        fieldLabel: 'Print #',
                        bind: '{theGraphic.PrintNo}',
                        allowBlank: false
                    },{
                        xtype: "combo",
                        name: 'Designer',
                        //itemId: "Dept",
                        fieldLabel: "Designer",
                        allowBlank: false,
                        //labelWidth: 50,
                        //width: 160,
                        hideTrigger: true,
                        margin: '0 0 0 20',
                        bind: {
                            store: '{designers}',
                            value: '{theGraphic.Designer}'
                        },
                        //store: vendorStore,
                        autoSelect: false,
                        autoLoadOnValue: true,
                        valueField: "label",
                        displayField: "label",
                        //forceSelection: false,
                        selectOnFocus: true,
                        selectOnTab: true,
                        queryMode: 'local',
                        //queryParam: "filter",
                        //triggerAction: 'all',
                        //lastQuery: '',
                        minChars: 1,
                        //matchFieldWidth: false,
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
                    layout: 'hbox',
                    //combineErrors: true,
                    defaults: {
                        minWidth: 620
                    },
                    //flex: 1,
                    items: [{
                        xtype: 'textfield',
                        name: 'Name',
                        fieldLabel: 'Name',
                        bind: '{theGraphic.Name}',
                        allowBlank: false
                    }]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    //combineErrors: true,
                    defaults: {
                        minWidth: 300
                    },
                    //flex: 1,
                    items: [{
                        xtype: "combo",
                        name: 'Dept',
                        //itemId: "Dept",
                        fieldLabel: "Account",
                        allowBlank: false,
                        //labelWidth: 50,
                        //width: 160,
                        //hideTrigger: true,
                        bind: {
                            store: '{customers}',
                            value: '{theGraphic.Dept}'
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
                            store: '{coordinators}',
                            value: '{theGraphic.Coordinator}'
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
                                //console.log(c.getStore())
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
                    defaultType: 'combo',
                    defaults: {
                        width: 300
                    },
                    //flex: 1,
                    items: [{
                        xtype: 'combo',
                        name: 'Type',
                        //itemId: "cboStones",
                        fieldLabel: "Type",
                        allowBlank: false,
                        //labelWidth: 50,
                        //width: 160,
                        hideTrigger: true,
                        bind: {
                            store: '{types}',
                            value: '{theGraphic.Type}'
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
                        xtype: 'numberfield',
                        name: 'RequestQty',
                        fieldLabel: 'Req. Qty',
                        //width: 300,
                        minValue: 1,
                        bind: '{theGraphic.RequestQty}',
                        margin: '0 0 0 20',
                        allowBlank: false
                    }]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    //combineErrors: true,
                    defaults: {
                        width: 620
                    },
                    //flex: 1,
                    items: [{
                        xtype: 'textarea',
                        name: 'Memo',
                        fieldLabel: 'Memo',
                        bind: '{theGraphic.Memo}',
                        //flex: 1,
                        allowBlank: true,
                        grow: true,
                        growMax: 100
                    }]
                }, {
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
                        bind: '{theGraphic.CDate}'
                    },{
                        xtype: 'textfield',
                        name: 'CUser',
                        fieldLabel: 'Created By',
                        bind: '{theGraphic.CUser}',
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
                        name: 'UDate',
                        fieldLabel: 'Date Modified',
                        bind: '{theGraphic.UDate}'
                    },{
                        xtype: 'textfield',
                        name: 'MUser',
                        fieldLabel: 'Updated By',
                        bind: '{theGraphic.MUser}',
                        margin: '0 0 0 20'
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }
});
