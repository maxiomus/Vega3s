
Ext.define("Vega.view.sales.Grid", {
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.sales.GridController',
        'Vega.view.sales.GridModel'
    ],

    alias: 'widget.sales-grid',

    /*
    itemId: "pow-grid",

    controller: "pow-grid",
    viewModel: {
        type: "pow-grid"
    },
    */

    //cls: "pow-grid",
    //stateful:true,
    //stateId: "pow-grid",
    //stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],

    style: {
        //borderTop: '1px solid #cfcfcf',
        //borderBottom: '1px solid #cfcfcf'
    },

    initComponent: function(){
        var me = this;
        me.columns = this.buildColumns();

        Ext.applyIf(me, {
            /*
            viewConfig: {
                loadMask:true,
                stripeRows:true,
                trackOver:true,
                preserveScrollOnRefresh:true,
                deferInitialRefresh:true,
                emptyText:'<h1 style="margin:20px">No matching results</h1>',
                getRowClass: function(rec, idx, rowParams, store){
                    return "custom-row-style"
                },
                prepareData: function(){

                },
                listeners:{

                }
            },
            */
            selModel: {
                pruneRemoved: false
            },
            plugins:[{
                ptype:"gridfilters"
            }]
        });

        me.callParent(arguments);
    },

    buildColumns: function(){
        return[{
            text: "ID",
            dataIndex: "powhId",
            locked: false,
            hidden: true,
            filter: {
                type: "number"
            }
        },
        {
            xtype: 'datecolumn',
            text: "Date & Time",
            dataIndex: "createdon",
            width: 140,
            format: 'Y-m-d h:i a',
            filter: {
                type: "date"
            }
        },
        {
            text: "P.O.W #",
            dataIndex: "powno",
            width: 140,
            filter: {
                type: "string"
            },
            renderer: function(g,e,f){
                var h = "";
                if(localStorage.getItem("pow-seen-" + f.data.powhId)){
                    e.tdCls += "visited";
                    h = ' <i class="x-fa fa-check-square-o fa-lg"></i>';
                }
                return g + h;
            }
        },
        {
            text: "Status",
            dataIndex: "status",
            width: 140,
            hidden: false,
            filter: {
                type: "string"
            }
        },
        {
            text: "Customer",
            dataIndex: "customer",
            width: 140,
            filter: {
                type: "string"
            },
            renderer: function(c, d){
                return Ext.util.Format.uppercase(c);
            }
        },
        {
            text: "Type",
            dataIndex: "ordertype",
            width: 140,
            hidden: false,
            filter: {
                type: "string"
            }
        },
        {
            text: "Division",
            dataIndex: "division",
            width: 140,
            filter: {
                type: "string"
            }
        },
        {
            xtype: 'datecolumn',
            text: "CXL Date",
            dataIndex: "cxldate",
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        },
        {
            text: "User ID",
            dataIndex: "userId",
            width:140,
            hidden:false,
            filter: {
                type: "string"
            }
        },
        {
            text: "Progress",
            dataIndex: "progress",
            hidden: false,
            filter: {
                type: "string"
            }
        },
        {
            text: "Comments",
            dataIndex: "comments",
            flex:1,
            hidden:false,
            filter: {
                type: "string"
            }
        },
        {
            text: "Update User",
            dataIndex: "updatedby",
            width:140,
            hidden:true,
            filter: {
                type: "string"
            }
        },
        {
            xtype: 'datecolumn',
            text: "Update Date",
            width: 140,
            dataIndex: "updatedon",
            format: 'Y-m-d H:i a',
            hidden: true,
            filter: {
                type: "date"
            }
        }];
    },

    loadStore: function(){
        this.getStore().load();
    }
});
