/**
 * Created by tech on 2/17/2015.
 */
Ext.define('Vega.view.reports.inventory.InventoryByLot', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Vega.view.reports.inventory.InventoryByLotController',
        'Vega.view.reports.inventory.InventoryByLotModel'
    ],

    alias: "widget.inventoryByLot",

    controller: "inventorybylot",
    viewModel: {
        type: "inventorybylot"
    },

    cls: "shadow-panel",
    border: false,
    margin: 8,

    layout: {
        type: "fit"
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: "top",
        layout: {
            type: 'hbox',
            align: 'bottom'
        },
        items: [{
            xtype: "combo",
            itemId: "cboFabric",
            labelAlign: "top",
            fieldLabel: "Fabric",
            labelWidth: 50,
            width: 160,
            store: "Components",
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
                width: 380
            },
            triggers: {
                clear: {
                    weight: -1,
                    cls: "x-form-clear-trigger",
                    tooltip: "Clear",
                    hidden: true,
                    handler: function (b) {
                        this.clearValue();
                        this.collapse();
                        this.focus(10);
                    }
                }
            }
        },{
            xtype: "combo",
            itemId: "cboColor",
            labelAlign: "top",
            fieldLabel: "Color",
            labelWidth: 50,
            width: 160,
            store: "Colors",
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
                width: 380
            },
            triggers: {
                clear: {
                    weight: -1,
                    cls: "x-form-clear-trigger",
                    tooltip: "Clear",
                    hidden: true,
                    handler: function (b) {
                        this.clearValue();
                        this.collapse();
                        this.focus(10);
                    }
                }
            }
        },{
            xtype: "combo",
            itemId: "cboLotno",
            labelAlign: "top",
            fieldLabel: "Lot #",
            labelWidth: 50,
            width: 160,
            bind: {
                store: "{lotnos}"
            },
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
                width: 345
            },
            triggers: {
                clear: {
                    weight: -1,
                    cls: "x-form-clear-trigger",
                    tooltip: "Clear",
                    hidden: true,
                    handler: function (b) {
                        this.clearValue();
                        this.collapse();
                        this.focus(10);
                    }
                }
            }
        },{
            xtype: "combo",
            itemId: "cboWH",
            labelAlign: "top",
            fieldLabel: "WH",
            width: 80,
            store: "Warehouses",
            value: "00",
            valueField: "id",
            displayField: "id",
            editable: false,
            selectOnTab: false,
            selectOnFocus: false,
            queryMode: "remote",
            minChars: 1
        },{
            xtype: 'combo',
            itemId: 'cboRawMat',
            labelAlign: 'top',
            fieldLabel: 'Comp. Type',
            labelWidth: 50,
            width: 160,
            store: 'RawMatTypes',
            value: 'FABRICS',
            valueField: "id",
            displayField: "id",
            selectOnFocus: false,
            //pageSize: 10,
            //matchFieldWidth: false,
            queryMode: 'remote',
            minChars: 1
        },
            {
                xtype: "checkbox",
                itemId: "chkOnHand",
                boxLabel: "Include Zero On Hand"
            },
            {
                xtype: "button",
                ui: "default",
                text: "Search",
                width: 85,
                scale: "small",
                iconAlign: "left",
                action: "search",
                iconCls: "fa fa-search"
            },
            "->",
            {
                xtype: "button",
                ui: "default",
                text: "Print",
                width: 85,
                scale: "small",
                iconAlign: "left",
                action: "print",
                iconCls: "fa fa-print"
            },
            {
                xtype: "button",
                ui: "default",
                width: 85,
                text: "Export",
                scale: "small",
                iconAlign: "left",
                action: "export",
                glyph: "xf045@FontAwesome"
            }]
    },{
        xtype: 'toolbar',
        dock: 'top',
        border: 1,
        style: {
            borderTop: '1px solid #c0c0c0'
        },
        items: [{
            xtype: 'container',
            html: '<div class="top-header">' +
                '<div>' +
                '<div class="header-row" style="width: 120px;">Style</div>' +
                '<div class="header-row" style="width: 120px;">Color</div>' +
                '<div class="header-row" style="width: 240px;">Description</div>' +
                '<div class="header-row" style="width: 120px;">Division</div>' +
                '<div class="header-row" style="width: 80px;">UOM</div>' +
                '<div class="header-row" style="width: 120px;">Comp. Type</div>' +
                '<div class="header-row" style="width: 120px;">Status</div>' +
                '<div class="header-row" style="width: 120px;">Memo</div>' +
                '</div>' +
                '</div>'
        }]
    }],

    bbar: [
        {
            xtype: "pagingtoolbar",
            bind: {
                store: "{inventories}"
            },
            defaultButtonUI: "default",
            displayInfo: true
        }
    ],

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: {
                xtype: "dataview",
                reference: "maindataview",
                cls: "fabric-inventory-viewer",
                autoScroll: true,
                bind: {
                    store: "{inventories}"
                },
                tpl: [
                    '<tpl for=".">',
                    '<div class="header">',
                    '<div class="group-row" style="margin-left: 8px;width: 120px;">{style}</div>',
                    '<div class="group-row" style="width: 120px;">{color}</div>',
                    '<div class="group-row" style="width: 240px;">{descript}</div>',
                    '<div class="group-row" style="width: 120px;">{division}</div>',
                    '<div class="group-row" style="width: 80px;">{uom}</div>',
                    '<div class="group-row" style="width: 120px;">{rawMatType}</div>',
                    '<div class="group-row" style="width: 120px;">{status}</div>',
                    '<div class="group-row" style="width: 480px;">{memo:this.MemoRenderer}</div>',
                    '<div class="clear-row"></div>',
                    '</div>',
                        '<div class="header-row" style="width: 100px;margin-left: 24px;">Lot #</div>',
                        '<div class="header-row" style="width: 100px;">Last Date</div>',
                        '<div class="header-row" style="text-align: right;width: 120px;padding-right: 24px;">ONE</div>',
                        '<div class="header-row" style="width: 160px;"></div>',
                        '<div class="header-row" style="text-align: right;width: 100px;">On-Hand</div>',
                        '<div class="header-row" style="text-align: right;width: 100px;">Alloc. Qty</div>',
                        '<div class="header-row" style="text-align: right;width: 100px;">A.T.C</div>',
                        '<div class="header-row" style="text-align: right;width: 100px;">Cost</div>',
                        '<div class="header-row" style="text-align: right;width: 100px;">Ext. Cost</div>',
                        '<div class="header-row" style="text-align: center;width: 100px;">WH</div>',
                    '<tpl for="detail">',
                    '<div class="content">',
                    '<div class="item-row" style="margin-left: 24px;width: 100px;">{lotno}</div>',
                    '<div class="item-row" style="width: 120px;">{logdate:this.DateRenderer}</div>',
                    '<div class="item-row" style="text-align: right;width: 100px;">{unit1:this.UnitRenderer}</div>',
                    '<div class="item-row" style="width: 160px;"></div>',
                    '<div class="item-row" style="text-align: right;width: 100px;">{totalunit:this.UnitRenderer}</div>',
                    '<div class="item-row" style="text-align:right;width: 100px;">{allocqty:this.UnitRenderer}</div>',
                    '<div class="item-row" style="text-align:right;width: 100px;">{[this.subtract(values.totalunit, values.allocqty)]}</div>',
                    '<div class="item-row" style="text-align:right;width: 100px;">{cost:usMoney}</div>',
                    '<div class="item-row" style="text-align:right;width: 100px;">{extcost:usMoney}</div>',
                    '<div class="item-row" style="text-align: center;width: 100px;">{wareHouse}</div>',
                    '<div class="clear-row"></div>',
                    '</div>',
                    '</tpl>',
                    '<div class="footer">',
                    '<div class="item-row" style="margin-left: 24px;width: 100px;"></div>',
                    '<div class="item-row" style="text-decoration:underline;width:150px;">Style / Color Total:</div>',
                    '<div class="item-row" style="text-align:right;width: 70px;">{total:this.UnitRenderer}</div>',
                    '<div class="item-row" style="width: 160px;"></div>',
                    '<div class="item-row" style="text-align: right;width: 100px;">{ohs:this.UnitRenderer}</div>',
                    '<div class="item-row" style="width: 100px;"></div>',
                    '<div class="item-row" style="text-align: right;width: 100px;">{[this.getTotal(values)]}</div>',
                    '<div class="item-row" style="width: 100px;"></div>',
                    '<div class="item-row" style="text-align: right;width: 100px;">{totalcost:usMoney}</div>',
                    '</div>',
                    '</tpl>',
                    '<div class="footer">',
                    '<div class="item-row" style="margin-left: 24px;width: 100px;"></div>',
                    '<div class="item-row" style="text-decoration:underline;width:150px;">Grand Total:</div>',
                    '<div class="item-row" style="text-align:right;width: 70px;">{[this.getGrandTotal(values)]}</div>',
                    '<div></div>',
                    {
                        subtract: function(x, y) {
                            var xf = Ext.util.Format;
                            if (x == null) x = 0;
                            if (y == null) y = 0;
                            return xf.number(x - y, '0,0.00');
                        },

                        toUsMoney: function(x) {
                            var xf = Ext.util.Format;

                            return xf.usMoney(x);
                        },

                        getGrandTotal: function(records){
                            var xf = Ext.util.Format;
                            var total = 0;

                            Ext.each(records, function(item){
                                total += item.total;
                            })

                            return xf.number(total, '0,0.00');
                        },

                        getTotal: function(records){
                            var xf = Ext.util.Format;
                            var total = 0;

                            //console.log(records.detail);
                            Ext.each(records.detail, function(item){
                                var alloc = item.allocqty == null ? 0 : item.allocqty;

                                total += (item.totalunit - alloc);
                            })

                            return xf.number(total, '0,0.00')
                        },

                        MemoRenderer: function(value) {
                            var xf = Ext.util.Format;

                            if (value != null) {
                                value = xf.htmlEncode(value);

                                return xf.ellipsis(value, 80);
                            }

                        },
                        DateRenderer: function(value) {

                            if (value != null) {
                                var d = new Date(value);

                                function pad(n){return n<10 ? '0'+n : n}

                                return pad(d.getUTCMonth()+1)+'-'
                                    + pad(d.getUTCDate())+'-'
                                    + d.getUTCFullYear()
                            }
                        },

                        ExtPriceRenderer: function(value) {
                            var xf = Ext.util.Format;

                            if (value < 0) {
                                return '<span style="color:#ff0000;">' + xf.usMoney(value) + '</span>';
                            }
                            else {
                                return xf.usMoney(value);
                            }
                        },
                        UnitRenderer: function(value) {
                            var xf = Ext.util.Format;
                            var color, str = '<span style="color:{0}">{1}</span>';

                            if (value < 0) {
                                color = 'red';
                            }
                            else {
                                color = 'black';
                            }

                            if (value == null){
                                value = 0;
                            }

                            return Ext.String.format(str, color, xf.number(value, '0,0.00'));
                        },
                        ActualRenderer: function(value) {
                            var str = '<input type="checkbox" name="actual_yn" {0}></input>';

                            if (value == 'Y') {
                                return Ext.String.format(str, 'checked');
                            }
                            else {
                                return str;
                            }
                        }
                    }
                ],
                itemSelector: 'div.item',
                trackOver: true,
                multiSelect: false,
                overItemCls: 'x-item-over',
                emptyText: 'No items to dispaly',
                border: 1,
                style: {
                    borderTop: '1px solid #c0c0c0',
                    borderBottom: '1px solid #c0c0c0'
                }
            }
        });

        me.callParent(arguments);
    }
})
