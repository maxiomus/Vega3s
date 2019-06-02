/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.inventory.fabric.panel.Requirements", {
    extend: 'Ext.grid.Panel',

    alias: "widget.fabricrequirements",

    bind: {
        store: "{fabricrequirements}"
    },

    loadMask: true,
    selType: "checkboxmodel",

    selModel: {
        mode: "SINGLE",
        checkOnly: false,
        pruneRemoved: false
    },

    viewConfig: { trackOver: false },

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
    {
        text: "Color",
        dataIndex: "color",
        width: 120,
        align: "center",
        filter: { type: "string"}
    },
    {
        text: "Status",
        dataIndex: "status",
        width: 60,
        align: "center",
        filter: { type: "string"}
    },
    {
        text: "Confirm Date",
        dataIndex: "confirmdate",
        width: 100,
        align: "center",
        filter: { type: "date"}
    },
    {
        text: "Cut Qty",
        dataIndex: "po_qty",
        width: 100,
        align: "center",
        renderer: Ext.util.Format.numberRenderer("0,0.00"),
        summaryType: "sum",
        summaryRenderer: function (f, e, d) {
            return Ext.util.Format.number(f, "0,0.00");
        },
        filter: { type: "number"}
    },
    {
        text: "Req. Qty",
        dataIndex: "poclUnit1",
        width: 100,
        align: "center",
        renderer: Ext.util.Format.numberRenderer("0,0.00"),
        summaryType: "sum",
        summaryRenderer: function (f, e, d) {
            return Ext.util.Format.number(f, "0,0.00");
        },
        filter: { type: "number"}
    },
    {
        text: "Alloc. Qty",
        dataIndex: "alloc_qty",
        width: 100,
        align: "center",
        renderer: Ext.util.Format.numberRenderer("0,0.00"),
        summaryType: "sum",
        summaryRenderer: function (f, e, d) {
            return Ext.util.Format.number(f, "0,0.00");
        },
        filter: { type: "number"}
    },
    {
        text: "Alloc. Bal",
        dataIndex: "c_alloc_bal",
        width: 100,
        align: "center",
        renderer: Ext.util.Format.numberRenderer("0,0.00"),
        summaryType: "sum",
        summaryRenderer: function (f, e, d) {
            return Ext.util.Format.number(f, "0,0.00");
        },
        filter: { type: "number"}
    },
    {
        text: "Used Qty",
        dataIndex: "used_qty",
        width: 100,
        align: "center",
        renderer: Ext.util.Format.numberRenderer("0,0.00"),
        filter: { type: "number"}
    },
    {
        text: "Used Bal",
        dataIndex: "c_balance",
        width: 100,
        align: "center",
        renderer: Ext.util.Format.numberRenderer("0,0.00"),
        summaryType: "sum",
        summaryRenderer: function (f, e, d) {
            return Ext.util.Format.number(f, "0,0.00");
        },
        filter: { type: "number"}
    },
    {
        text: "On-Hand",
        dataIndex: "ohs",
        width: 100,
        align: "center",
        renderer: Ext.util.Format.numberRenderer("0,0.00"),
        summaryType: "sum",
        summaryRenderer: function (f, e, d) {
            return Ext.util.Format.number(f, "0,0.00");
        },
        filter: { type: "number"}
    },
    {
        text: "UOM",
        dataIndex: "uom",
        width: 60,
        align: "center",
        filter: { type: "string"}
    },
    {
        text: "Style Description",
        dataIndex: "descript",
        flex: 1,
        align: "center",
        filter: { type: "string"}
    },
    {
        text: "WH",
        dataIndex: "wareHouse",
        width: 100,
        align: "center",
        hidden: true,
        filter: { type: "string"}
    },
    {
        text: "P.O Style",
        dataIndex: "poclStyle",
        width: 100,
        align: "center",
        hidden: true,
        filter: { type: "string"}
    },
    {
        text: "P.O Color",
        dataIndex: "poclColor",
        width: 100,
        align: "center",
        hidden: true,
        filter: { type: "string"}
    },
    {
        text: "P.O #",
        dataIndex: "pono",
        width: 80,
        align: "center",
        filter: { type: "number"}
    },
    {
        text: "podId",
        dataIndex: "podId",
        width: 100,
        align: "center",
        hidden: true,
        filter: { type: "number"}
    },
    {
        text: "price",
        dataIndex: "price",
        width: 100,
        align: "center",
        renderer: Ext.util.Format.usMoney,
        filter: { type: "number"}
    },
    {
        text: "poclId",
        dataIndex: "poclId",
        width: 100,
        align: "center",
        hidden: true,
        filter: { type: "number"}
    },
    {
        text: "userName",
        dataIndex: "userName",
        width: 100,
        align: "center",
        hidden: true,
        filter: { type: "string"}
    },
    {
        text: "userTime",
        dataIndex: "userTime",
        width: 100,
        align: "center",
        hidden: true,
        filter: { type: "date"}
    },
    {
        text: "req_location",
        dataIndex: "req_location",
        width: 100,
        align: "center",
        hidden: true,
        filter: { type: "string"}
    }],

    initComponent: function () {
        var b = this;
        this.callParent(arguments);
    }
});
