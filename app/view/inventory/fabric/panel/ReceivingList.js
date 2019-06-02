/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.inventory.fabric.panel.ReceivingList", {
    extend: 'Ext.grid.Panel',

    alias: 'widget.receivings-grid',

    bind: {
        store: "{poreceivings}"
    },

    initComponent: function () {
        var b = this;

        Ext.applyIf(b, {
            selModel: {
                pruneRemoved: false
            },
            viewConfig: {
                trackOver: false,
                preserveScrollOnRefresh: true,
                deferInitialRefresh: true
            },
            features: [{
                id: "groupSummary1",
                ftype: "groupingsummary",
                groupHeaderTpl: '{columnName}: {name} ({rows.length} Roll{[values.rows.length > 1 ? "s" : ""]})',
                hideGroupedHeader: true,
                startCollapsed: false,
                enableGroupMenu: true
            },
            {
                ftype: "summary",
                dock: "bottom"
            }],
            plugins: [{
                ptype: "cellediting",
                clicksToEdit: 1
            }],

            columns: [{
                text: "Style",
                dataIndex: "style",
                width: 120,
                summaryRenderer: function (f, a, e) {
                    return "Total:";
                }
            },
            {
                text: "Color",
                dataIndex: "color",
                width: 120,
                hidden: false
            },
            {
                text: "Lot #",
                dataIndex: "lotno",
                width: 120,
                editor: {
                    xtype: "combo",
                    itemId: "cboLotno",
                    bind: {
                        store: "{lotnos}"
                    },
                    valueField: "id",
                    displayField: "id",
                    selectOnFocus: true,
                    pageSize: 100,
                    matchFieldWidth: false,
                    queryMode: "remote",
                    queryParam: "filter",
                    minChars: 1,
                    tpl: '<tpl for="."><tpl if="[xindex] == 1"><table class="cbo-list"><tr><th width="60%">Lot #</th><th width="40%">On Hand</th></tr></tpl><tr class="x-boundlist-item"><td>{id}</td><td>{text}</td></tr><tpl if="[xcount-xindex]==0"></table></tpl></tpl>',
                    listConfig: {
                        loadindText: "Searching...",
                        emptyText: "No matching items found.",
                        width: 365
                    }
                }
            },
            {
                text: "Roll #",
                dataIndex: "rollno",
                width: 80,
                align: "center",
                sortable: true,
                summaryType: "count",
                editor: {
                    xtype: "combo",
                    itemId: "cboRolls",
                    bind: {
                        store: "{rolls}"
                    },
                    valueField: "id",
                    displayField: "id",
                    selectOnFocus: true,
                    queryMode: "remote",
                    minChars: 1
                },
                summaryRenderer: function (f, a, e) {
                    return Ext.String.format("{0} Roll{1}", f, f !== 1 ? "s" : "");
                }
            },
            {
                text: "Rec. Qty",
                dataIndex: "unit1",
                width: 80,
                align: "center",
                renderer: Ext.util.Format.numberRenderer("0,0.00"),
                editor: {
                    xtype: "textfield",
                    allowBlank: true
                }
            },
            {
                text: "Price",
                dataIndex: "price",
                width: 80,
                align: "center",
                renderer: Ext.util.Format.usMoney,
                editor: {
                    xtype: "textfield",
                    allowBlank: true
                }
            },
            {
                text: "Lot Memo*",
                dataIndex: "lot_memo",
                width: 100,
                align: "center",
                editor: {
                    xtype: "textfield",
                    allowBlank: true
                }
            },
            {
                xtype: 'datecolumn',
                text: "Rec. Date",
                dataIndex: "logdate",
                width: 100,
                format: 'Y-m-d',
                align: "center",
                editor: {
                    xtype: "datefield",
                    format: "Y-m-d"
                }
            },
            {
                text: "Vendor",
                dataIndex: "vendor",
                width: 100,
                align: "center",
                editor: {
                    xtype: "combo",
                    itemId: "cboVendors",
                    store: "Vendors",
                    valueField: "id",
                    displayField: "id",
                    selectOnFocus: true,
                    pageSize: 100,
                    matchFieldWidth: false,
                    queryMode: "remote",
                    minChars: 1
                }
            },
            {
                text: "WH",
                dataIndex: "warehouse",
                width: 60,
                align: "center",
                editor: {
                    xtype: "combo",
                    itemId: "cboWHs",
                    store: "Warehouses",
                    valueField: "id",
                    displayField: "id",
                    selectOnFocus: true,
                    minChars: 1
                }
            },
            {
                text: "WH Type",
                dataIndex: "warehouseType",
                width: 80,
                align: "center"
            },
            {
                text: "Damage Location",
                dataIndex: "damage_location",
                width: 80,
                align: "center",
                editor: {
                    xtype: "textfield",
                    allowBlank: true
                }
            },
            {
                text: "Damage Reason",
                dataIndex: "damageReason",
                width: 100,
                align: "center",
                editor: {
                    xtype: "combobox"
                }
            },
            {
                text: "Memo",
                dataIndex: "memo",
                width: 160,
                align: "center",
                editor: {
                    xtype: "textfield",
                    allowBlank: true
                }
            },
            {
                text: "Lot Total",
                dataIndex: "totalUnit",
                width: 80,
                align: "center",
                renderer: Ext.util.Format.numberRenderer("0,0.00")
            },
            {
                text: "Total Amt",
                dataIndex: "c_total_amt",
                width: 80,
                align: "center",
                renderer: Ext.util.Format.numberRenderer("0,0.00")
            },
            {
                text: "podId",
                dataIndex: "podId",
                width: 80,
                align: "center"
            },
            {
                text: "Inventory Id",
                dataIndex: "inventoryId",
                width: 80,
                align: "center"
            },
            {
                text: "User Name",
                dataIndex: "userName",
                width: 80,
                align: "center"
            },
            {
                xtype: 'datecolumn',
                text: "User Time",
                dataIndex: "userTime",
                width: 100,
                format: 'Y-m-d',
                align: "center"
            },
            {
                text: "Update Date",
                dataIndex: "updateDate",
                width: 100,
                align: "center",
                renderer: function (a) {
                    if (a != null) {
                        var d = new Date(a),
                        f = function(c) {
                            return c < 10 ? "0" + c : c;
                        };
                        
                        return f(d.getUTCFullYear() + '-' + d.getUTCMonth() + 1) + "-" + f(d.getUTCDate());
                    }
                }
            }]
        });

        this.callParent(arguments);
    }
});
