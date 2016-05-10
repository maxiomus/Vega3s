
Ext.define("Vega.view.sales.edit.Detail",{
    extend: "Ext.grid.Panel",

    requires: [
        "Vega.view.sales.edit.DetailController",
        "Vega.view.sales.edit.DetailModel"
    ],

    controller: "sales-edit-detail",
    viewModel: {
        type: "sales-edit-detail"
    },

    alias: 'widget.sales-edit-detail',

    publishes: ["selectedStyles"],

    bind: {
        store: "{powds}",
        selection: "{selectedStyles}"
    },

    config: {

    },

    stateful:true,
    stateId: "detail-grid",
    stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],

    listeners: {

    },

    initComponent: function(){
        var me = this;
        me.columns = this.buildColumns();

        Ext.applyIf(me, {
            selModel: {
                pruneRemoved: false
            },
            viewConfig: {
                loadMask: true,
                stripeRows: true,
                trackOver: true,
                preserveScrollOnRefresh: true,
                deferInitialRefresh: true,
                emptyText: '<h1 style="margin:20px">No matching results</h1>',
                getRowClass: function(a, g, f, h){
                    return "custom-row-style";
                },
                listeners: {

                }
            },
            plugins: [{
                ptype: "gridfilters"
            }]
        });

        me.callParent(arguments);
    },

    buildColumns: function(){
        return[{
            text: "POWD ID",
            dataIndex: "powdId",
            locked: false,
            hidden: true,
            filter: {
                type: "number"
            }
        },
        {
            text: "MERCHANDISE",
            columns: [{
                text: "Style",
                width: 140,
                dataIndex: "style",
                filter: {
                    type: "string"
                }
            },
            {
                text: "Color",
                dataIndex: "color",
                width: 140,
                filter:{
                    type: "string"
                }
            }]
        },
        {
            text: "DESCRIPTION",
            dataIndex: "",
            width: 140,
            hidden: false,
            filter: {
                type: "string"
            }
        },
        {
            text:"Cost",
            dataIndex: "cost",
            width: 140,
            filter: {
                type: "float"
            }
        },
        {
            text: "Selling Price",
            dataIndex: "price",
            width: 140,
            hidden: false,
            filter: {
                type: "float"
            }
        },
        {
            text: "MSRP",
            dataIndex: "msrp",
            width: 140,
            filter: {
                type: "float"
            }
        },
        {
            text: "UNITS",
            dataIndex: "units",
            filter: {
                type: "float"
            }
        },
        {
            text: "Fabric By",
            dataIndex: "fabricby",
            width: 140,
            hidden: false,
            filter: {
                type: "date"
            }
        },
        {
            text: "Marker By",
            dataIndex: "markerby",
            hidden: false,
            filter: {
                type: "date"
            }
        },
        {
            text: "Print & Stone By",
            dataIndex: "pnsby",
            hidden: false,
            filter: {
                type: "date"
            }
        }]
    }
});
