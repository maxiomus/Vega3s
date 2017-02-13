/**
 * Created by tech on 3/9/2016.
 */
Ext.define("Vega.view.inventory.fabric.panel.Detail", {
    extend: 'Ext.grid.Panel',

    alias: "widget.fabricrolldetail",

    bind: {
        store: "{rolldetails}"
    },

    loadMask: true,
    selType: "rowmodel",

    selModel: {
        checkOnly: false,
        pruneRemoved: false
    },

    viewConfig: {
        trackOver: false
    },

    features: [{
        id: "group",
        ftype: "groupingsummary",
        groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: false,
        startCollapsed: false,
        enableGroupMenu: true
    },
    {
        ftype: "summary",
        dock: "bottom"
    }],

    columns: [{
        xtype: "checkcolumn",
        text: "",
        dataIndex: "checkStatus",
        width: 40,
        align: "center",
        hidden: false,
        disabled: false
    },
    {
        text: "ID",
        dataIndex: "uid",
        width: 100,
        hidden: true
    },
    {
        text: "POCLID",
        dataIndex: "poclid",
        width: 100,
        hidden: true
    },
    {
        text: "Style",
        dataIndex: "style",
        width: 100,
        hidden: true
    },
    {
        text: "Color",
        dataIndex: "color",
        width: 100,
        hidden: true
    },
    {
        text: "Lot #",
        dataIndex: "lotno",
        width: 100,
        align: "center",
        hideable: false,
        summaryRenderer: function (f, e, d) {
            return "Total Yards:"
        }
    },
    {
        text: "Roll #",
        dataIndex: "rollno",
        width: 60,
        align: "center"
    },
    {
        text: "On-Hand",
        dataIndex: "unit1",
        width: 100,
        align: "center",
        summaryType: "sum",
        summaryRenderer: function (f, e, d) {
            return Ext.util.Format.number(f, "0,0.00")
        }
    },
    {
        text: "Alloc. Total",
        dataIndex: "alloc_qty_total",
        width: 100,
        align: "center",
        summaryType: "sum",
        summaryRenderer: function (f, e, d) {
            return Ext.util.Format.number(f, "0,0.00")
        }
    },
    {
        text: "Alloc. Qty",
        dataIndex: "alloc_qty",
        width: 100,
        align: "center",
        summaryType: "sum",
        summaryRenderer: function (f, e, d) {
            return Ext.util.Format.number(f, "0,0.00")
        }
    },
    {
        text: "Cuttable",
        dataIndex: "cuttable",
        width: 100,
        align: "center"
    },
    {
        text: "Prelim L",
        dataIndex: "prelimL",
        width: 100,
        align: "center",
        hidden: true
    },
    {
        text: "Prelim L %",
        dataIndex: "prelimL_per",
        width: 100,
        align: "center",
        hidden: true
    },
    {
        text: "Prelim W",
        dataIndex: "prelimW",
        width: 100,
        align: "center",
        hidden: true
    },
    {
        text: "Prelim W %",
        dataIndex: "prelimW_per",
        width: 100,
        align: "center",
        hidden: true
    },
    {
        text: "Wash L",
        dataIndex: "washL",
        width: 100,
        align: "center",
        hidden: true
    },
    {
        text: "Wash L",
        dataIndex: "washL_per",
        width: 100,
        align: "center",
        hidden: true
    },
    {
        text: "Wash W",
        dataIndex: "washW",
        width: 100,
        align: "center",
        hidden: true
    },
    {
        text: "Wash W",
        dataIndex: "washW_per",
        width: 100,
        align: "center",
        hidden: true
    },
    {
        text: "Shrink L",
        dataIndex: "shrinkL",
        width: 100,
        align: "center"
    },
    {
        text: "Shrink W",
        dataIndex: "shrinkW",
        width: 100,
        align: "center"
    },
    {
        text: "Wash Name",
        dataIndex: "washname",
        width: 100,
        align: "center",
        hidden: true
    },
    {
        text: "Barcode",
        dataIndex: "barcode",
        width: 100,
        align: "center"
    },
    {
        text: "Mark #",
        dataIndex: "markno",
        width: 100,
        align: "center"
    },
    {
        text: "Memo",
        dataIndex: "memo",
        flex: 1,
        align: "center"
    }],

    initComponent: function () {
        var b = this;
        b.dockedItems = b.buildDockedItems();

        Ext.applyIf(b, {

        });

        this.callParent(arguments);
    },

    buildDockedItems: function(){
        var me = this;

        return [{
            xtype: "toolbar",
            dock: "top",
            items: [{
                xtype: "combo",
                itemId: "cboFabric",
                labelAlign: "left",
                fieldLabel: "Fabric",
                labelWidth: 40,
                width: 200,
                store: "Components",
                valueField: "id",
                displayField: "id",
                selectOnFocus: false,
                pageSize: 100,
                matchFieldWidth: false,
                queryMode: "remote",
                minChars: 1,
                disabled: true,
                listConfig: {
                    loadindText: "Searching...",
                    emptyText: "No matching items found.",
                    width: 340
                }
            },
            {
                xtype: "tbspacer"
            },
            {
                xtype: "combo",
                itemId: "cboColor",
                labelAlign: "left",
                fieldLabel: "Color",
                labelWidth: 38,
                width: 200,
                store: "Colors",
                valueField: "id",
                displayField: "id",
                selectOnFocus: false,
                pageSize: 100,
                matchFieldWidth: false,
                queryMode: "remote",
                minChars: 1,
                disabled: true,
                listConfig: {
                    loadindText: "Searching...",
                    emptyText: "No matching items found.",
                    width: 340
                }
            },
            {
                xtype: "tbspacer"
            },
            {
                xtype: "combo",
                itemId: "cboLotno",
                labelAlign: "left",
                fieldLabel: "Lot #",
                labelWidth: 38,
                width: 200,
                //store: 'memLotnos',
                bind: {
                    store: '{lotnos}'
                },
                valueField: "label",
                displayField: "label",
                selectOnFocus: true,
                pageSize: 50,
                matchFieldWidth: false,
                queryMode: "remote",
                queryParam: "filter",
                minChars: 1,
                plugins: [{
                    ptype: "cleartrigger"
                }],
                tpl: '<tpl for="."><tpl if="[xindex] == 1"><table class="cbo-list"><tr><th width="50%">Lot #</th><th width="10%">WH</th><th width="40%">On Hand</th></tr></tpl><tr class="x-boundlist-item"><td>{label}</td><td>{descript}</td><td>{text}</td></tr><tpl if="[xcount-xindex]==0"></table></tpl></tpl>',
                listConfig: {
                    loadindText: "Searching...",
                    emptyText: "No matching items found.",
                    width: 340
                },
                listeners: {
                    triggerClear: function(c){
                        me.getStore().clearFilter();
                    }
                }
            },
            {
                xtype: "tbspacer"
            },
            {
                xtype: "button",
                ui: "soft-blue",
                text: "Select",
                width: 90,
                iconCls: "fa fa-refresh",
                action: "refresh",
                tooltip: "Refresh"
            },
            {
                xtype: "button",
                ui: "soft-blue",
                text: "Check All",
                iconCls: "fa fa-check-square-o",
                action: "checkall"
            },
            {
                xtype: "button",
                ui: "soft-blue",
                text: "Uncheck All",
                iconCls: "fa fa-square-o",
                action: "uncheckall"
            }]
        }]
    }
});

