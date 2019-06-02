/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.inventory.fabric.panel.OrderList", {
    extend: 'Ext.grid.Panel',

    alias: "widget.orders-list",

    bind: {
        store: "{podetails}"
    },

    loadMask: true,

    selModel: {
        mode: "SINGLE",
        selType: "checkboxmodel",
        checkOnly: false,
        pruneRemoved: false
    },

    viewConfig: {
        trackOver: false
    },

    features: [{
        ftype: "summary",
        dock: "bottom"
    }],

    columns: [{
        text: "Style",
        dataIndex: "style",
        width: 120,
        align: "center",
        filter: { type: "string" },
        summaryRenderer: function (f, e, d) {
            return "Total:";
        }
    },
    { text: "Color",
        dataIndex: "color",
        width: 120,
        align: "center",
        filter: { type: "string"}
    },
    { text: "Lot #",
        dataIndex: "lotno",
        width: 120,
        align: "center",
        filter: { type: "string"}
    },
    {
        text: "PO Qty",
        dataIndex: "unit1",
        width: 80,
        align: "center",
        renderer: Ext.util.Format.numberRenderer("0,0.00"),
        filter: { type: "number"}
    },
    {
        text: "Rec. Qty",
        dataIndex: "totalUnit",
        width: 80,
        align: "center",
        renderer: Ext.util.Format.numberRenderer("0,0.00"),
        filter: { type: "number"}
    },
    {
        text: "Balance",
        dataIndex: "c_balance",
        width: 80,
        align: "center",
        renderer: Ext.util.Format.numberRenderer("0,0.00"),
        summaryType: "sum",
        summaryRenderer: function (f, e, d) {
            return Ext.util.Format.number(f, "0,0.00");
        },
        filter: { type: "number" }
    },
    {
        text: "Price",
        dataIndex: "price",
        width: 80,
        align: "center",
        renderer: Ext.util.Format.usMoney,
        filter: { type: "number"}
    },
    {
        text: "On-Hand",
        dataIndex: "ohs",
        width: 80,
        align: "center",
        renderer: Ext.util.Format.numberRenderer("0,0.00"),
        summaryType: "sum",
        summaryRenderer: function (f, e, d) {
            return Ext.util.Format.number(f, "0,0.00");
        },
        filter: { type: "number" }
    },
    {
        text: "UOM",
        dataIndex: "uom",
        width: 60,
        align: "center",
        filter: { type: "string" }
    },
    {
        xtype: 'datecolumn',
        text: "ETA",
        dataIndex: "etadate",
        width: 100,
        format: 'Y-m-d',
        align: "center",
        filter: { type: "date" }
    },
    {
        text: "Style Desc",
        dataIndex: "descript",
        width: 160,
        align: "center",
        filter: { type: "string" }
    },
    {
        text: "Status",
        dataIndex: "status",
        width: 60,
        align: "center",
        filter: { type: "string" }
    },
    {
        text: "Type",
        dataIndex: "rawmattype",
        width: 80,
        align: "center",
        filter: { type: "string" }
    },
    {
        text: "WH",
        dataIndex: "warehouse",
        width: 60,
        align: "center",
        filter: { type: "string" }
    },
    {
        text: "P.O #",
        dataIndex: "pono",
        width: 80,
        align: "center",
        filter: { type: "number" }
    },
    {
        text: "podId",
        dataIndex: "podId",
        width: 80,
        align: "center",
        filter: { type: "number" }
    },
    {
        text: "Memo",
        dataIndex: "memo",
        flex: 1,
        align: "center",
        filter: { type: "string" }
    }],

    initComponent: function () {
        var b = this;
        this.callParent(arguments);
    }

});
