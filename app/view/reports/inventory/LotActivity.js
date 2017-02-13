/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.reports.inventory.LotActivity", {
    extend: 'Ext.panel.Panel',

    requires: [
        'Vega.view.reports.inventory.LotActivityController',
        'Vega.view.reports.inventory.LotActivityModel'
    ],

    alias: "widget.lotactivity",

    controller: "lotactivity",
    viewModel: {
        type: "lotactivity"
    },

    autoScroll: false,
    layout: "fit",
    cls: "shadow-panel",
    border: false,
    margin: 8,

    bbar: [{
        xtype: "pagingtoolbar",
        bind: {
            store: "{transactions}"
        },
        defaultButtonUI: "default",
        displayInfo: true
    },
    "-",
    {
        text: "Encode: Off",
        action: "encode",
        tooltip: "Toggle filter encoding on/off",
        enableToggle: true,
        pressed: false
    }],

    initComponent: function () {
        var me = this;

        me.dockedItems = me.buildDockedItems();

        Ext.applyIf(me, {
            items: [{
                xtype: "dataview",
                reference: "maindataview",
                cls: "activity-viewer",
                autoScroll: true,
                bind: {
                    store: "{transactions}"
                },
                tpl: ['<tpl for=".">',
                '<div class="header">',
                '<div class="group-row" style="margin-left: 8px;width: 120px;">{style}</div>',
                '<div class="group-row" style="width: 120px;">{color}</div>',
                '<div class="group-row" style="width: 240px;">{descript}</div>',
                '<div class="group-row" style="width: 120px;">{lotno}</div>',
                '<div class="group-row" style="width: 360px;">{uom}</div>',
                '<div class="group-row" style="width: 120px;">{rawMatType}</div>',
                '<div class="group-row" style="width: 120px;">{status}</div>',
                '<div class="group-row" style="width: 120px;">{memo}</div>',
                '<div class="clear-row"></div>',
                    '</div>',
                    '<tpl for="detail">',
                    '<div class="content">',
                    '<div class="item-row" style="margin-left: 28px;width: 80px;">{logdate:this.DateRenderer}</div>',
                '<div class="item-row" style="width: 100px;">{trans_type}</div>',
                '<div class="item-row" style="text-align:right;width: 100px;">{totalUnit:this.UnitRenderer}</div>',
                '<div class="item-row" style="text-align:right;width: 100px;">{price:usMoney}</div>',
                '<div class="item-row" style="margin-right: 50px;text-align:right;width: 100px;">{extprice:this.ExtPriceRenderer}</div>',
                '<div class="item-row" style="width: 60px;">{uom}</div>',
                '<div class="item-row" style="width: 100px;">{wareHouse}</div>',
                '<div class="item-row" style="width: 100px;">{vendor}</div>',
                '<div class="item-row" style="width: 100px;"><a href="#receiving/{pono}">{pono}</a></div>',
                '<div class="item-row" style="width: 100px;"><a href="#physical/edit/{pino}">{pino}</a></div>',
                '<div class="item-row" style="width: 100px;">{poclStyle}</div>',
                '<div class="item-row" style="width: 100px;">{poclColor}</div>',
                '<div class="item-row" style="width: 100px;">{actual_yn:this.ActualRenderer}</div>',
                '<div class="clear-row"></div>',
                    '</div>',
                    '</tpl>',
                    '<div class="footer">',
                    '<div class="item-row" style="margin-left: 28px;width: 80px;"></div>',
                '<div class="item-row" style="text-decoration:underline;width:100px;">Lot Total:</div>',
                '<div class="item-row" style="background-color:#E1F5A9;text-align:right;width:100px;">{lotTotal:this.UnitRenderer}</div>',
                "</div>",
                    "</tpl>",
                    '<div class="footer">',
                    '<div class="item-row" style="margin-left: 28px;width: 80px;"></div>',
                '<div class="item-row" style="text-decoration:underline;width: 100px;">Grand Total:</div>',
                '<div class="item-row" style="text-align:right;width: 100px;">{[this.getTotal(values)]}</div>',
                "<div></div>",
                {
                    getTotal: function (a) {
                        var f = Ext.util.Format;
                        var e = 0;
                        Ext.each(a, function (c) {
                            e += c.lotTotal
                        });
                        return f.number(e, "0,0.00");
                    },
                    DateRenderer: function (a) {
                        if (a != null) {
                            var d = new Date(a);
                            function f(c) {
                                return c < 10 ? "0" + c : c
                            }
                            return f(d.getUTCMonth() + 1) + "-" + f(d.getUTCDate()) + "-" + d.getUTCFullYear();
                        }
                    },
                    ExtPriceRenderer: function (d) {
                        var a = Ext.util.Format;
                        if (d < 0) {
                            return '<span style="color:#ff0000;">' + a.usMoney(d) + '</span>'
                        } else {
                            return a.usMoney(d)
                        }
                    },
                    UnitRenderer: function (g) {
                        var h = Ext.util.Format;
                        var a,
                            f = '<span style="color:{0}">{1}</span>';
                        if (g < 0) {
                            a = "red"
                        } else {
                            a = "black"
                        }
                        return Ext.String.format(f, a, h.number(g, "0,0.00"))
                    },
                    ActualRenderer: function (a) {
                        var d = '<input type="checkbox" name="actual_yn" {0} />';
                        if (a == "Y") {
                            return Ext.String.format(d, "checked")
                        } else {
                            return d;
                        }
                    }
                }],

                itemSelector: "div.item",
                trackOver: true,
                multiSelect: false,
                overItemCls: "x-item-over",
                emptyText: "No items to dispaly",
                border: 1,
                style: {
                    borderTop: "1px solid #c0c0c0",
                    borderBottom: "1px solid #c0c0c0"
                }
            }]
        });

        me.callParent(arguments);
    },

    buildDockedItems: function(){
        var me = this;

        /*
        var fabricStore = Ext.create('Vega.store.Components'),
            proxy = fabricStore.getProxy();

        proxy.setUrl(proxy.url + '/fabrics');
        */

        return [{
            xtype: "toolbar",
            dock: "top",
            layout: {
                type: "hbox",
                align: "bottom"
            },
            items: [{
                xtype: "memorycombo",
                itemId: "cboFabric",
                labelAlign: "top",
                fieldLabel: "Fabric",
                labelWidth: 50,
                width: 160,
                store: 'memComponents',
                valueField: "label",
                displayField: "label",
                forceSelection: false,
                selectOnFocus: false,
                pageSize: 50,
                matchFieldWidth: false,
                queryMode: "local",
                //queryParam: "filter",
                minChars: 1,
                listConfig: {
                    loadindText: "Searching...",
                    emptyText: "No matching items found.",
                    width: 340
                },
                plugins: [{
                    ptype: "cleartrigger"
                }],
                /*
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
                },
                */
                listeners: {
                    triggerClear: function(combo){

                        var cboColor = combo.ownerCt.query('combo[itemId="cboColor"]')[0];
                        cboColor.getStore().clearFilter();
                        cboColor.setValue('');
                    },
                    beforequery: {
                        fn: function(qe){
                            var store = qe.combo.getStore();
                            console.log(qe.combo, qe.combo.getValue())
                            store.clearFilter();
                            store.filter([{
                                property: 'text',
                                value: 'FABRICS',
                                operator: '='
                            }]);
                        }
                    }
                }
            },
            {
                xtype: "memorycombo",
                itemId: "cboColor",
                labelAlign: "top",
                fieldLabel: "Color",
                labelWidth: 50,
                width: 160,
                store: 'memColors',
                valueField: "label",
                displayField: "label",
                forceSelection: false,
                selectOnFocus: false,
                pageSize: 50,
                matchFieldWidth: false,
                queryMode: "local",
                //queryParam: "filter",
                minChars: 1,
                listConfig: {
                    loadindText: "Searching...",
                    emptyText: "No matching items found.",
                    width: 340
                },
                plugins: [{
                    ptype: "cleartrigger"
                }],
                /*
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
                },
                */
                listeners: {
                    triggerClear: function(combo){

                    },
                    beforequery: {
                        fn: function(qe){
                            var cboStyle = qe.combo.ownerCt.query('combo[itemId="cboFabric"]')[0],
                                store = qe.combo.getStore();

                            console.log(cboStyle, cboStyle.getValue())
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
                    }
                }
            },
            {
                xtype: "memorycombo",
                itemId: "cboLotno",
                labelAlign: "top",
                fieldLabel: "Lot #",
                //labelWidth: 50,
                width: 160,
                store: 'memLotnos',
                valueField: "label",
                displayField: "label",
                forceSelection: false,
                selectOnFocus: false,
                pageSize: 50,
                matchFieldWidth: false,
                queryMode: 'local',
                //queryParam: "filter",
                minChars: 1,
                listConfig: {
                    loadindText: "Searching...",
                    emptyText: "No matching items found.",
                    width: 340
                },
                plugins: [{
                    ptype: "cleartrigger"
                }]
            },
            {
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
            },
            {
                xtype: "container",
                itemId: "checkboxes",
                defaults: {
                    margin: 0,
                    padding: 0,
                    border: false,
                    style: {
                        borderColor: "black",
                        borderStyle: "solid"
                    }
                },
                items: [{
                    xtype: "checkbox",
                    itemId: "chkDamage",
                    boxLabel: "Include Damage WH"
                },
                    {
                        xtype: "checkbox",
                        itemId: "chkOnHand",
                        boxLabel: "Include Zero On Hand"
                    }]
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
        },
        {
            xtype: "toolbar",
            dock: "top",
            border: 1,
            style: { borderTop: "1px solid #c0c0c0"},
            items: [{
                xtype: "container",
                html:
                '<div class="activity-header">' +
                '<div>' +
                '<div class="header-row" style="width: 120px;">Style</div>' +
                '<div class="header-row" style="width: 120px;">Color</div>' +
                '<div class="header-row" style="width: 240px;">Description</div>' +
                '<div class="header-row" style="width: 120px;">Lot #</div>' +
                '<div class="header-row" style="width: 360px;">Lot Memo</div>' +
                '<div class="header-row" style="width: 120px;">Comp. Type</div>' +
                '</div>' +
                '<div>' +
                '<div class="info-row" style="margin-left: 20px;width: 80px;">Date</div>' +
                '<div class="info-row" style="width: 100px;">Trans. Type</div>' +
                '<div class="info-row" style="text-align:right;width: 100px;">Qty</div>' +
                '<div class="info-row" style="text-align:right;width: 100px;">Price</div>' +
                '<div class="info-row" style="margin-right: 50px;text-align:right;width: 100px;">Ext. Price</div>' +
                '<div class="info-row" style="width: 60px;">UOM</div>' +
                '<div class="info-row" style="width: 100px;">Warehouse</div>' +
                '<div class="info-row" style="width: 100px;">Vendor</div>' +
                '<div class="info-row" style="width: 100px;">P.O #</div>' +
                '<div class="info-row" style="width: 100px;">P.I #</div>' +
                '<div class="info-row" style="width: 100px;">Parent Style</div>' +
                '<div class="info-row" style="width: 100px;">Parent Color</div>' +
                '<div class="info-row" style="width: 100px;">Actualized</div>' +
                '</div>' +
                '</div>'
            }]
        }]
    },

    renderTip: function (d, c) {
        if (d != undefined) {
            c.tdAttr = 'data-qtip="' + d + '"'
        }
        return d;
    }
});

