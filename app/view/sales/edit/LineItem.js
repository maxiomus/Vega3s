
Ext.define('Vega.view.sales.edit.LineItem', {
    extend: 'Ext.window.Window',

    requires: [
        //'Vega.view.sales.edit.LineItemController',
        'Vega.model.Powm'
    ],

    alias: 'widget.edit-lineitem',

    //controller: 'sales-edit-lineitem',
    /*viewModel: {
        stores: {
            powms: {
                model: 'sales.Powm'
            }
        }
    },*/

    bind: {
        title: '{title}'
    },

    layout: {
        type: 'hbox'
    },

    defaultType: 'container',
    defaults: {
        margin: '0 5 10 0'
    },

    //modal: true,
    monitorResize: true,
    maximizable: true,
    //alwaysOnTop: true,
    constrain: true,
    //maximized: true,
    //draggable: false,
    closable: true,
    padding: 10,

    style: {
        borderBottom: '1px solid #e3e3e3'
    },

    listeners: {
        render: {
            fn: 'onRendered',
            scope: 'this'
        }
    },

    initComponent: function() {
        var me = this;

        var bodyStore = Ext.create('Ext.data.Store', {
                fields: ['id', 'text'],
                pageSize: 100,
                remoteFilter: true,
                autoLoad: false,

                proxy: {
                    type: 'ajax',
                    url: '/api/Combos/body',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }),
            styleStore = Ext.create('Ext.data.Store', {
                fields: ['id', 'text'],
                pageSize: 100,
                remoteFilter: true,
                autoLoad: false,

                proxy: {
                    type: 'ajax',
                    url: '/api/Combos/styles',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }),
            stColorStore = Ext.create('Ext.data.Store', {
                fields: ['id', 'text'],
                pageSize: 100,
                remoteFilter: true,
                autoLoad: false,

                proxy: {
                    type: 'ajax',
                    url: '/api/Combos/stycolors',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }),

            fabricStore = Ext.create('Vega.store.Components'),
            printStore = Ext.create('Vega.store.Components'),

            vendorStore = Ext.create('Vega.store.Vendors'),
            trimStore = Ext.create('Vega.store.Components'),
            contrastStore = Ext.create('Vega.store.Components'),
            fabricProxy = fabricStore.getProxy(),
            printProxy = printStore.getProxy(),
            //stoneProxy = stoneStore.getProxy(),
            trimProxy = trimStore.getProxy(),
            contrastProxy = contrastStore.getProxy();

        fabricProxy.setUrl(fabricProxy.url + '/fabrics');
        printProxy.setUrl(printProxy.url + '/prints');
        //stoneProxy.setUrl(stoneProxy.url + '/stone');
        trimProxy.setUrl(trimProxy.url + '/trims');
        contrastProxy.setUrl(contrastProxy.url + '/fabrics');

        /*Ext.define('Print', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'FID', type: 'int'},
                { name: 'F_CATEGORY', type: 'string'},
                { name: 'F_LOCATION', type: 'string'},
                { name: 'F_APPLICATION', type: 'string'},
                { name: 'F_LINK', type: 'string'},
                { name: 'F_EXT', type: 'string'},
                { name: 'F_BFLAG', type: 'boolean'},
                { name: 'F_DESC1', type: 'string'},
                { name: 'F_DESC2', type: 'string'},
                { name: 'F_DESC3', type: 'string'},
                { name: 'F_DESC4', type: 'string'},
                { name: 'F_DESC5', type: 'string'},
                { name: 'F_DESC6', type: 'string'},
                { name: 'F_DESC7', type: 'string'},
                { name: 'F_DESC8', type: 'string'},
                { name: 'F_DESC9', type: 'string'}
            ],

            idProperty: 'F_DESC6',

            proxy: {
                type: "rest",
                url: "/api/Dals/2",
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        });*/

        Ext.applyIf(me, {

            items:[{
                layout: 'vbox',
                defaultType: 'button',
                items:[{
                    tooltip: 'Copy',
                    iconCls: 'fa fa-copy',
                    hidden: true,
                    margin: '0 0 2 0',
                    handler: function(btn){
                        var panel = me.ownerCt,
                            clone = me.cloneConfig();

                        panel.add(clone);
                        clone.getForm().setValues(me.getForm().getFieldValues());
                    }
                },{
                    tooltip: 'Delete',
                    hidden: true,
                    iconCls: 'fa fa-remove',
                    handler: function(btn){
                        var panel = me.ownerCt;
                        panel.remove(me);
                    }
                }]
            },{
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'fieldcontainer',
                    referenceHolder: true,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaultType: 'textfield',
                    defaults: {
                        labelAlign: 'top'
                    },
                    items: [{
                        xtype: "combo",
                        name: 'style',
                        reference: 'style',
                        //itemId: "cboPrint",
                        fieldLabel: "Style",
                        //labelWidth: 50,
                        //width: 160,
                        publishes: 'value',
                        bind: {
                            value: '{theStyle.style}'
                        },
                        store: styleStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        //queryMode: "remote",
                        queryParam: "filter",
                        triggerAction: 'last',
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e){
                                var colorCombo = combo.ownerCt.lookupReference('stylecolor'),
                                    colorStore = colorCombo.getStore();

                                Ext.apply(colorStore.getProxy().extraParams, {
                                    style: combo.getValue().trim()
                                });
                                colorStore.reload();
                            }
                        }
                    },{
                        xtype: 'box',
                        width: 10
                    },{
                        xtype: "combo",
                        name: 'stylecolor',
                        reference: 'stylecolor',
                        //itemId: "cboPrint",
                        fieldLabel: "Color",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.color}'
                        },
                        store: stColorStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e){

                            }
                        }
                    }]
                }, {
                    xtype: 'textfield',
                    hideLabel: true,
                    bind: '{theStyle.descirpt}'
                },{
                    xtype: 'multiimageupload',
                    reference: 'fileupload',
                    previewImageSrc: ['resources/images/default.png', 'resources/images/default.png'],
                    previewNames: ["Body", "Prints"]
                }]
            },{
                defaultType: 'fieldcontainer',
                defaults: {
                    layout: 'hbox',
                    labelWidth: 88,
                    width: 460,
                    padding: '0 0 -4 0',
                    defaults: {
                        flex: 1,
                        hideLabel: true,
                        margin: '0 5 0 0'
                    }
                },
                items:[{
                    fieldLabel: 'Pattern #',
                    items:[{
                        xtype: "combo",
                        name: 'Body',
                        //itemId: "cboBody",
                        fieldLabel: 'Pattern #',
                        //labelWidth: 50,
                        //width: 292,
                        bind: {
                            value: '{theStyle.bodyref}'
                        },
                        store: bodyStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        triggerAction: 'last',
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {

                            change: function(combo, newValue, oldValue, eOpts){
                                me.getImageSrc(combo);
                            }
                        }
                    },{
                        xtype: 'displayfield',
                        name: 'prevBody',
                        height: 24,
                        flex: 1
                    }]
                },{
                    fieldLabel: 'Prints/Desc',
                    items:[{
                        xtype: "combo",
                        name: 'prints',
                        //itemId: "cboPrint",
                        fieldLabel: "Prints",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.powms.data.items.1.matcode}'
                        },
                        store: printStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        triggerAction: 'last',
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e){
                                var cboPrintColor = combo.ownerCt.query('combo[name="printcolor"]')[0],
                                    store = cboPrintColor.getStore();

                                Ext.apply(store.getProxy().extraParams, {
                                    style: combo.getValue().trim()
                                });
                                store.reload({
                                    callback: function(){
                                        cboPrintColor.select(store.first());
                                        cboPrintColor.fireEvent('select', combo, record);
                                    }
                                });

                                me.getImageSrc(combo);
                            }
                        }
                    },{
                        xtype: "combo",
                        name: 'printcolor',
                        //itemId: "cboColor",
                        fieldLabel: "Print Color",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.powms.data.items.1.matcolor}'
                        },
                        store: stColorStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e){
                                // Error
                                var me = this,
                                    txtPrintDesc = me.ownerCt.ownerCt.query('textfield[name="printdesc"]')[0];
                                txtPrintDesc.setValue(me.getSelection().data.text);
                            }
                        }
                    }]
                },{
                    xtype: 'textfield',
                    name: 'printdesc',
                    bind: '{theStyle.powms.data.items.1.matdesc}',
                    hideEmptyLabel: false,
                    width: 455
                },{
                    fieldLabel: 'Stone Vendor',
                    items:[{
                        xtype: "combo",
                        name: 'stonevendor',
                        //itemId: "cboStones",
                        fieldLabel: "Vendor",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.powms.data.items.2.matvendor}'
                        },
                        store: vendorStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        triggerAction: 'last',
                        minChars: 1,
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
                        name: 'stonecost',
                        bind: '{theStyle.powms.data.items.2.matcost}',
                        hideEmptyLabel: false,
                        flex: 1
                    }]
                },{
                    fieldLabel: 'Trim/Color',
                    items: [{
                        xtype: "combo",
                        name: 'trims',
                        //itemId: "cboTrim",
                        fieldLabel: "Trims",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.powms.data.items.3.matcode}'
                        },
                        store: trimStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        triggerAction: 'last',
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e){
                                var cboColor = combo.ownerCt.query('combo[name="trimcolor"]')[0],
                                    store = cboColor.getStore();

                                Ext.apply(store.getProxy().extraParams, {
                                    style: combo.getValue().trim()
                                });
                                store.reload({
                                    callback: function(){
                                        cboColor.select(store.first());
                                        cboColor.fireEvent('select', combo, record);
                                    }
                                });
                            }
                        }
                    }, {
                        xtype: "combo",
                        name: 'trimcolor',
                        //itemId: "cboColor",
                        fieldLabel: "Trim Color",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.powms.data.items.3.matcolor}'
                        },
                        store: stColorStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e){
                                var me = this,
                                    txtDesc = me.ownerCt.ownerCt.query('textfield[name="trimdesc"]')[0];
                                txtDesc.setValue(me.getSelection().data.text);
                            }
                        }
                    }]
                },{
                    xtype: 'textfield',
                    name: 'trimdesc',
                    bind: '{theStyle.powms.data.items.3.matdesc}',
                    hideEmptyLabel: false,
                    width: 455
                },{
                    fieldLabel: 'Fabric/Color',
                    items:[{
                        xtype: "combo",
                        name: 'fabric',
                        //itemId: "cboFabric",
                        fieldLabel: "Fabric",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.powms.data.items.0.matcode}'
                        },
                        store: fabricStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        triggerAction: 'last',
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e){
                                var cboColor = combo.ownerCt.query('combo[name="fabriccolor"]')[0],
                                    store = cboColor.getStore();

                                Ext.apply(store.getProxy().extraParams, {
                                    style: combo.getValue().trim()
                                });
                                store.reload({
                                    callback: function(){
                                        cboColor.select(store.first());
                                        cboColor.fireEvent('select', combo, record);
                                    }
                                });
                            }
                        }
                    },{
                        xtype: "combo",
                        name: 'fabriccolor',
                        //itemId: "cboColor",
                        fieldLabel: "Fabric Color",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.powms.data.items.0.matcolor}'
                        },
                        store: stColorStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        triggerAction: 'last',
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e) {
                                var me = this,
                                    txtDesc = me.ownerCt.ownerCt.query('textfield[name="fabricdesc"]')[0];
                                txtDesc.setValue(me.getSelection().data.text);
                            }
                        }
                    }]
                },{
                    xtype: 'textfield',
                    name: 'fabricdesc',
                    bind: '{theStyle.powms.data.items.0.matdesc}',
                    hideEmptyLabel: false,
                    width: 455
                },{
                    xtype: 'textareafield',
                    fieldLabel: 'Body Desc',
                    width: 455,
                    height: 50,
                    bind: '{theStyle.bodydesc}',
                    name: 'bodydesc'
                }]
            },{
                defaultType: 'fieldcontainer',
                defaults: {
                    layout: 'hbox',
                    labelWidth: 78,
                    width: 460,
                    padding: '0 0 -4 0',
                    defaults: {
                        flex: 1,
                        hideLabel: true,
                        margin: '0 5 0 0'
                    }
                },
                items:[{
                    defaultType: 'textfield',
                    defaults: {
                        width: 225,
                        padding: '0 5 0 0',
                        labelWidth: 78
                    },
                    items: [{
                        fieldLabel: 'Cost',
                        hideLabel: false,
                        name: 'cost',
                        bind: '{theStyle.cost}'
                    },{
                        fieldLabel: 'Selling Price',
                        hideLabel: false,
                        name: 'price',
                        bind: '{theStyle.price}'
                    }]
                },{
                    defaultType: 'textfield',
                    defaults: {
                        width: 225,
                        margin: '0 5 0 0',
                        labelWidth: 78
                    },
                    items: [{
                        fieldLabel: 'MSRP',
                        hideLabel: false,
                        name: 'msrp',
                        bind: '{theStyle.msrp}'
                    },{
                        fieldLabel: 'UNITS',
                        hideLabel: false,
                        name: 'units',
                        bind: '{theStyle.units}'
                    }]
                },{
                    fieldLabel: 'Contrast 1',
                    items:[{
                        xtype: "combo",
                        name: 'contrast1',
                        //itemId: "cboContrast1",
                        fieldLabel: "Contrast 1",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.powms.data.items.4.matcode}'
                        },
                        store: contrastStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        triggerAction: 'last',
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e){
                                var cboColor = combo.ownerCt.query('combo[name="contrastcolor1"]')[0],
                                    store = cboColor.getStore();

                                Ext.apply(store.getProxy().extraParams, {
                                    style: combo.getValue().trim()
                                });
                                store.reload({
                                    callback: function(){
                                        cboColor.select(store.first());
                                        cboColor.fireEvent('select', combo, record);
                                    }
                                });
                            }
                        }
                    },{
                        xtype: "combo",
                        name: 'contrastcolor1',
                        fieldLabel: "Contrast Color 1",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.powms.data.items.4.matcolor}'
                        },
                        store: stColorStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e) {
                                var me = this,
                                    txtDesc = me.ownerCt.ownerCt.query('textfield[name="contrastdesc1"]')[0];
                                txtDesc.setValue(me.getSelection().data.text);
                            }
                        }
                    }]
                },{
                    xtype: 'textfield',
                    name: 'contrastdesc1',
                    hideEmptyLabel: false,
                    bind: {
                        value: '{theStyle.powms.data.items.4.matdesc}'
                    },
                    width: 455
                },{
                    fieldLabel: 'Contrast 2',
                    items:[{
                        xtype: "combo",
                        name: 'contrast2',
                        //itemId: "cboContrast2",
                        fieldLabel: "Contrast 2",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.powms.data.items.5.matcode}'
                        },
                        store: contrastStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        triggerAction: 'last',
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e){
                                var cboColor = combo.ownerCt.query('combo[name="contrastcolor2"]')[0],
                                    store = cboColor.getStore();

                                Ext.apply(store.getProxy().extraParams, {
                                    style: combo.getValue().trim()
                                });
                                store.reload({
                                    callback: function(){
                                        cboColor.select(store.first());
                                        cboColor.fireEvent('select', combo, record);
                                    }
                                });
                            }
                        }
                    },{
                        xtype: "combo",
                        name: 'contrastcolor2',
                        fieldLabel: "Contrast Color 2",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.powms.data.items.5.matcolor}'
                        },
                        store: stColorStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e) {
                                var me = this,
                                    txtDesc = me.ownerCt.ownerCt.query('textfield[name="contrastdesc2"]')[0];
                                txtDesc.setValue(me.getSelection().data.text);
                            }
                        }
                    }]
                },{
                    xtype: 'textfield',
                    name: 'contrastdesc2',
                    hideEmptyLabel: false,
                    bind: {
                        value: '{theStyle.powms.data.items.5.matdesc}'
                    },
                    width: 455
                },{
                    fieldLabel: 'Contrast 3',
                    items:[{
                        xtype: "combo",
                        name: 'contrast3',
                        //itemId: "cboContrast3",
                        fieldLabel: "Contrast 3",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.powms.data.items.6.matcode}'
                        },
                        store: contrastStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e){
                                var cboColor = combo.ownerCt.query('combo[name="contrastcolor3"]')[0],
                                    store = cboColor.getStore();

                                Ext.apply(store.getProxy().extraParams, {
                                    style: combo.getValue().trim()
                                });
                                store.reload({
                                    callback: function(){
                                        cboColor.select(store.first());
                                        cboColor.fireEvent('select', combo, record);
                                    }
                                });
                            }
                        }
                    },{
                        xtype: "combo",
                        name: 'contrastcolor3',
                        fieldLabel: "Contrast Color 3",
                        //labelWidth: 50,
                        //width: 160,
                        bind: {
                            value: '{theStyle.powms.data.items.6.matcolor}'
                        },
                        store: stColorStore,
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: false,
                        pageSize: 100,
                        matchFieldWidth: false,
                        queryMode: "remote",
                        queryParam: "filter",
                        triggerAction: 'last',
                        minChars: 1,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            select: function(combo, record, e) {
                                var me = this,
                                    txtDesc = me.ownerCt.ownerCt.query('textfield[name="contrastdesc3"]')[0];
                                txtDesc.setValue(me.getSelection().data.text);
                            }
                        }
                    }]
                },{
                    xtype: 'textfield',
                    name: 'contrastdesc3',
                    hideEmptyLabel: false,
                    bind: '{theStyle.powms.data.items.6.matdesc}',
                    width: 455
                },{
                    xtype: 'textareafield',
                    fieldLabel: 'Stitch Desc',
                    width: 455,
                    height: 50,
                    bind: '{theStyle.stitchdesc}',
                    name: 'stitchdesc'
                }]
            },{
                defaultType: 'datefield',
                defaults: {
                    labelAlign: 'top',
                    padding: '0 0 -5 0'
                },
                items:[{
                    name: 'fabricby',
                    fieldLabel: 'Fabric by',
                    bind: '{theStyle.fabricby}'
                },{
                    name: 'markerby',
                    fieldLabel: 'Marker by',
                    bind: '{theStyle.markerby}'
                },{
                    name: 'pnsby',
                    fieldLabel: 'Print & Stone by',
                    bind: '{theStyle.pnsby}'
                }]
            }]
        });

        me.callParent(arguments);
    },

    onRendered: function(comp){
        var preview = this.down('multiimageupload'),
            previewImages = preview.query('image');

    },

    getImageSrc: function(combo){
        var preview = this.down('multiimageupload'),
            previewImage = preview.query('image[canvas="' + preview.id + '-canvas-' + combo.name.toLowerCase() + '"]')[0];

        //console.log('getI', preview, previewImage);
        Ext.Ajax.request({
            // FID 2 prints
            url: Ext.String.urlAppend('/api/Dals/' + combo.name.toLowerCase() + '/' + combo.getValue()),
            method: 'GET',
            success: function(response, opts){
                var path = '',
                    result = Ext.decode(response.responseText);
                if (result.success){
                    //console.log('success', result.data);
                    //printImage.title = result.data.F_DESC1;
                    if(result.data != null){
                        path = '../' + result.data.F_LINK + 'thumbs/' + result.data.F_LOCATION + '_medium' + result.data.F_EXT;
                    }
                    previewImage.setSrc(path);
                }
            },
            failure: function(response, opts){
                Ext.Msg.alert(response.status.toString(), response.statusText + ', an error occurred during your request. Please try again.' );
            },
            callback: function(response, opts){

            }
        });
    }
})