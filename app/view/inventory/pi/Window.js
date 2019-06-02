Ext.define('Vega.view.inventory.pi.Window', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.data.proxy.Memory'
    ],

    alias: 'widget.pi-window',

    bind: {
        title: '{title}'
    },

    layout: 'fit',

    monitorResize: true,
    maximizable: true,
    constrain: true,
    //maximized: true,
    //scrollable: true,
    closable: true,
    padding: 4,

    initComponent: function(w){
        var me = this;

        /*
        var memStyles = Ext.create('Ext.data.Store', {
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

        var remoteStyles = Ext.create('Vega.store.Styles', {
            autoLoad: true,

            listeners: {
                load: function(s){
                    memStyles.getProxy().setData(s.getRange());
                    memStyles.load();
                }
            }
        });

        var memStColors = Ext.create('Ext.data.Store', {
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

        var remoteStColors = Ext.create('Vega.store.StyleColors', {
            autoLoad: true,
            remoteFilter: true,
            listeners: {
                load: function(s){
                    memStColors.getProxy().setData(s.getRange());
                    memStColors.load();
                }
            }
        });
        */

        Ext.getStore('memComponents').clearFilter();

        var html =
            '<div class="item-boxer" style="width: 1486px;margin: 1px;">'+
            '<div class="box-row" style="height: 24px;">'+
            '<div class="box ab center" style="width:30px;">Line</div>'+
            '<div class="box ab center" style="width:160px;">Style</div>'+
            '<div class="box">'+
            '<div class="item-boxer">'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:74px;"></div>'+
            '</div>'+
            '</div>'+
            '<div class="box ab center" style="width:80px;">UOM</div>'+
            '<div class="box ab center" style="width:120px;">WH/Lot#</div>'+
            '<div class="box ab center" style="width:120px;">P.I Date</div>'+
            '<div class="box ab">'+
            '<div class="item-boxer">'+
            '<div class="box rb center" style="width:100px;">Lot Memo</div>'+
            '<div class="box rb center" style="width:110px;">PO #</div>'+
            '<div class="box nb" style="width:120px;"></div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="box-row" style="height: 24px;">'+
            '<div class="box nb" style="width:30px;"></div>'+
            '<div class="box ab center" style="width:160px;">Color</div>'+
            '<div class="box">'+
            '<div class="item-boxer">'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:80px;"></div>'+
            '<div class="box nb" style="width:74px;"></div>'+
            '</div>'+
            '</div>'+
            '<div class="box ab center" style="width:80px;">Total Qty</div>'+
            '<div class="box ab center" style="width:120px;">Price</div>'+
            '<div class="box ab center" style="width:120px;">User/Update</div>'+
            '<div class="box ab">'+
            '<div class="item-boxer">'+
            '<div class="box rb center" style="width:100px;">Status/Loc</div>'+
            '<div class="box rb center" style="width:110px;">ID</div>'+
            '<div class="box nb center" style="width:120px;">Date/Ref</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';

        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                reference: 'pi-edit-form',
                modelValidation: true,
                border: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'start'
                },

                items: [{
                    xtype: 'container',
                    defaultType: 'fieldcontainer',
                    scrollable: true,
                    margin: '0 0 4 0',
                    defaults: {
                        margin: '0 0 1 32'
                    },
                    items:[{
                        xtype: 'component',
                        margin: '0 0 0 0',
                        html: html
                    },{
                        layout: 'hbox',
                        //combineErrors: true,
                        defaultType: 'textfield',
                        defaults: {
                            width: 80,
                            hideLabel: true,
                            border: false,
                            style: {
                                borderStyle: 'none'
                            }
                        },
                        items: [{
                            xtype: "combo",
                            name: 'style',
                            reference: 'style',
                            //itemId: "cboPrint",
                            fieldLabel: "Style",
                            //labelWidth: 50,
                            width: 160,
                            hideTrigger: true,
                            //emptyText: 'Style',
                            //publishes: 'value',
                            bind: {
                                value: '{theItem.style}'
                            },
                            store: 'memComponents',
                            remoteStore: 'Components',
                            valueField: 'label',
                            displayField: 'label',
                            //forceSelection: false,
                            //selectOnFocus: true,
                            matchFieldWidth: false,
                            autoLoadOnValue: true,
                            //minChars: 0,
                            pageSize: 50,
                            queryMode: "local",
                            triggerAction: 'query',
                            //queryParam: "filter",
                            //queryDelay: 800,
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
                                beforequery: {
                                    fn: function(qe){
                                        //delete qe.combo.lastQuery;
                                    }
                                },
                                select: function(combo, record, e){
                                    var colorCombo = this.ownerCt.ownerCt.query('combo[name="stylecolor"]')[0],
                                        colorStore = colorCombo.getStore();

                                    Ext.apply(colorStore.getProxy().extraParams, {
                                        style: combo.getValue().trim()
                                    });

                                    colorStore.reload({
                                        callback: function(){
                                            colorCombo.select(colorStore.first());
                                            //colorCombo.fireEvent('select', combo, [store.first()]);
                                        }
                                    });
                                }
                            }
                        },{
                            name: 'sz1',
                            readOnly: true,
                            bind: '{theItem.sz1}'
                        },{
                            name: 'sz2',
                            readOnly: true,
                            bind: '{theItem.sz2}'
                        },{
                            name: 'sz3',
                            readOnly: true,
                            bind: '{theItem.sz3}'
                        },{
                            name: 'sz4',
                            readOnly: true,
                            bind: '{theItem.sz4}'
                        },{
                            name: 'sz5',
                            readOnly: true,
                            bind: '{theItem.sz5}'
                        },{
                            name: 'sz6',
                            readOnly: true,
                            bind: '{theItem.sz6}'
                        },{
                            name: 'sz7',
                            readOnly: true,
                            bind: '{theItem.sz7}'
                        },{
                            name: 'sz8',
                            readOnly: true,
                            bind: '{theItem.sz8}'
                        },{
                            name: 'uom',
                            readOnly: true,
                            bind: '{theItem.uom}'
                        },{
                            xtype: 'combo',
                            name: 'wareHouse',
                            width: 120,
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
                            //store: ['00', 'OS', 'SA'],
                            bind: {
                                store: '{warehouses}',
                                value: '{theItem.wareHouse}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            name: 'pidate',
                            format: 'Y-m-d',
                            width: 120,
                            //editable: false,
                            bind: {
                                value: '{theItem.logdate}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        },{
                            name: 'memo',
                            width: 335,
                            emptyText: 'Memo:',
                            bind: '{theItem.memo}'
                        }]
                    },{
                        layout: 'hbox',
                        //combineErrors: true,
                        defaultType: 'textfield',
                        defaults: {
                            width: 80,
                            hideLabel: true
                        },
                        items: [{
                            xtype: "combo",
                            name: 'stylecolor',
                            reference: 'stylecolor',
                            //itemId: "cboPrint",
                            fieldLabel: "Color",
                            //emptyText: 'Color',
                            //labelWidth: 50,
                            width: 160,
                            hideTrigger: true,
                            bind: {
                                value: '{theItem.color}'
                            },
                            store: 'memRawColors',
                            remoteStore: 'rawColors',
                            valueField: "label",
                            displayField: "label",
                            //forceSelection: false,
                            //selectOnFocus: true,
                            pageSize: 50,
                            autoLoadOnValue: true,
                            matchFieldWidth: false,
                            //minChars: 0,
                            queryMode: "local",
                            triggerAction: 'query',
                            //queryParam: "filter",
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
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                beforequery: {
                                    fn: function(qe){
                                        var cboStyle = this.ownerCt.ownerCt.query('combo[name="style"]')[0],
                                            store = this.getStore();

                                        //console.log(cboStyle, cboStyle.getValue())

                                        if(!Ext.isEmpty(cboStyle.getValue())){
                                            store.clearFilter();

                                            store.filter([{
                                                property: 'text',
                                                value: cboStyle.getValue().toUpperCase(),
                                                operator: '='
                                            }]);
                                        }
                                        //delete qe.combo.lastQuery;
                                    }
                                }
                            }
                        },{
                            name: 'unit1',
                            bind: '{theItem.unit1}'
                        },{
                            name: 'unit2',
                            bind: '{theItem.unit2}'
                        },{
                            name: 'unit3',
                            bind: '{theItem.unit3}'
                        },{
                            name: 'unit4',
                            bind: '{theItem.unit4}'
                        },{
                            name: 'unit5',
                            bind: '{theItem.unit5}'
                        },{
                            name: 'unit6',
                            bind: '{theItem.unit6}'
                        },{
                            name: 'unit7',
                            bind: '{theItem.unit7}'
                        },{
                            name: 'unit8',
                            bind: '{theItem.unit8}'
                        },{
                            name: 'totalUnit',
                            bind: '{theItem.totalUnit}'
                        },{
                            xtype: 'combo',
                            name: 'lotno',
                            width: 120,
                            hideTrigger: true,
                            displayField: 'label',
                            valueField: 'label',
                            //editable: false,
                            //selectOnFocus: true,
                            //allowBlank: false,
                            //forceSelection: true,
                            //msgTarget: 'side',
                            matchFieldWidth: false,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            //store: ['00', 'OS', 'SA'],
                            store: 'memLotnos',
                            pageSize: 50,
                            bind: {
                                value: '{theItem.lotno}'
                            },
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 340
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            name: 'userName',
                            width: 120,
                            readOnly: true,
                            bind: '{theItem.userName}'
                        },{
                            name: 'status',
                            width: 102,
                            readOnly: true,
                            bind: '{theItem.status}'
                        },{
                            name: 'pono',
                            width: 111,
                            readOnly: true,
                            bind: '{theItem.pono}'
                        },{
                            name: 'updateDate',
                            width: 122,
                            readOnly: true,
                            bind: '{theItem.updateDate:date("Y-m-d h:i a")}'
                        }]
                    },{
                        layout: 'hbox',
                        //combineErrors: true,
                        defaultType: 'textfield',
                        defaults: {
                            width: 80,
                            hideLabel: true
                        },
                        items: [{
                            width: 160,
                            name: ''
                        },{
                            name: 'unit1',
                            bind: '{theItem.oh1}'
                        },{
                            name: 'unit2',
                            bind: '{theItem.oh2}'
                        },{
                            name: 'unit3',
                            bind: '{theItem.oh3}'
                        },{
                            name: 'unit4',
                            bind: '{theItem.oh4}'
                        },{
                            name: 'unit5',
                            bind: '{theItem.oh5}'
                        },{
                            name: 'unit6',
                            bind: '{theItem.oh6}'
                        },{
                            name: 'unit7',
                            bind: '{theItem.oh7}'
                        },{
                            name: 'unit8',
                            bind: '{theItem.oh8}'
                        },{
                            name: 'totalunit',
                            bind: '{theItem.ohs}'
                        },{
                            name: 'price',
                            width: 120,
                            bind: '{theItem.price}'
                        },{
                            name: 'userTime',
                            width: 120,
                            readOnly: true,
                            bind: '{theItem.userTime:date("Y-m-d h:i a")}'
                        },{
                            name: 'location',
                            width: 102,
                            readOnly: true,
                            bind: '{theItem.location}'
                        },{
                            name: 'inventoryId',
                            width: 111,
                            readOnly: true,
                            bind: '{theItem.inventoryId}'
                        },{
                            name: 'ref',
                            width: 122,
                            readOnly: true,
                            bind: '{theItem.ref}'
                        }]
                    }]
                },{
                    xtype: 'grid',
                    title: 'Rolls',
                    reference: 'pirolls',
                    scrollable: true,
                    flex: 1,
                    bind: {
                        store: '{theItem.pirolls}'
                    },
                    selModel: {
                        //mode: "MULTI",
                        //type: 'cellmodel',
                        pruneRemoved: false
                    },
                    viewConfig: {
                        loadMask: true,
                        stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh: true,
                        deferInitialRefresh: true,
                        emptyText: '<h1 style="margin: 20px">No matching results</h1>'
                    },
                    plugins: [{
                        ptype: 'cellediting',
                        clicksToEdit: 1
                    }],
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [{
                            xtype: 'button',
                            iconCls: 'x-fa fa-plus-circle',
                            text: 'Add'
                        },{
                            xtype: 'button',
                            text: 'Remove',
                            iconCls: 'x-fa fa-minus-circle'
                        },{
                            xtype: 'button',
                            text: 'Remove All',
                            iconCls: 'x-fa fa-remove'
                        },{
                            xtype: 'button',
                            iconCls: 'x-fa fa-list',
                            text: 'Add Multiple'
                        },{
                            xtype: 'textfield',
                            width: 50,
                            fieldLabel: 'lines',
                            hideLabel: true
                        },{
                            xtype: 'checkbox',
                            name: 'chkCopy',
                            value: true,
                            boxLabel: 'Copy data to new lines'
                        },{
                            xtype: 'checkbox',
                            name: 'chkLot',
                            hidden: true,
                            boxLabel: '<i class="x-fa fa-arrow-up"></i> Lot # by 1'
                        },{
                            xtype: 'checkbox',
                            name: 'chkRoll',
                            hidden: true,
                            boxLabel: '<i class="x-fa fa-arrow-up"></i> Roll # by 1'
                        }]
                    }],
                    columns: [{
                        text: 'ID',
                        dataIndex: 'id',
                        hidden: true,
                        width: 50
                    }, {
                        text: 'Roll #',
                        dataIndex: 'rollno',
                        editor:{
                            xtype: 'textfield'
                        }
                    }, {
                        text: 'ATC (Available to Cut)',
                        dataIndex: 'atc',
                        width: 160
                    }, {
                        text: 'P.I Qty',
                        dataIndex: 'unit1',
                        editor:{
                            xtype: 'textfield'
                        }
                    },{
                        text: 'Memo',
                        dateIndex: 'memo',
                        flex: 1,
                        editor:{
                            xtype: 'textfield'
                        }
                    },{
                        xtype: 'actioncolumn',
                        text: '<i class="x-fa fa-close fa-lg red-txt"></i>',
                        //iconCls: 'x-fa fa-close red-txt',
                        width: 50,
                        align: 'center',
                        menuDisabled: true,
                        sortable: false,
                        items: [{
                            //icon: 'resources/images/shared/icon-error.png',
                            //glyph: 45,
                            //ui: 'default',
                            iconCls: 'x-fa fa-remove red-txt',
                            tooltip: 'Remove',
                            handler: function(view, rowIndex, colIndex) {
                                var rec = view.getStore().getAt(rowIndex);
                                rec.drop();
                            }
                        }]
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }
});
