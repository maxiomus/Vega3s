
Ext.define("Vega.view.sales.Grid", {
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.sales.GridController',
        'Vega.view.sales.GridModel'
    ],

    alias: 'widget.pow-grid',

    itemId: "pow-grid",

    controller: "pow-grid",
    viewModel: {
        type: "pow-grid"
    },

    publishes: ["selectedPows"],

    bind: {
        store: "{pows}",
        selection: "{selectedPows}"
    },

    config: {

    },

    stateful:true,
    stateId: "pow-grid",
    stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],

    listeners: {
        select: {
            fn: "onSelect"
        }
    },

    initComponent: function(){
        var me = this;
        me.columns = this.buildColumns();

        Ext.applyIf(me, {
            selModel: {
                pruneRemoved: false
            },
            viewConfig: {
                loadMask:true,
                stripeRows:true,
                trackOver:true,
                preserveScrollOnRefresh:true,
                deferInitialRefresh:true,
                emptyText:'<h1 style="margin:20px">No matching results</h1>',
                getRowClass: function(a, g, f, h){
                    return"custom-row-style"
                },
                listeners:{

                }
            },
            plugins:[{
                ptype:"gridfilters"
            }]
        });

        me.callParent(arguments)
    },

    buildColumns: function(){
        return[{
            text:"PID",
            dataIndex:"PID",
            locked:false,
            hidden:true,
            filter:{
                type:"number"
            }
        },
        {
            text:"Date",
            width:140,
            dataIndex:"CreateOn",
            filter: {
                type:"date"
            },
            renderer: this.formatDate
        },
        {
            text:"P.O.W #",
            dataIndex:"PowNo",
            width:140,
            filter:{
                type:"string"
            },
            renderer: "renderPowNoColumn"
        },
        {
            text:"Status",
            dataIndex:"Status",
            width:140,
            hidden:false,
            filter: {
                type:"string"
            }
        },
        {
            text:"Customer",
            dataIndex:"Customer",
            width:140,
            filter: {
                type:"string"
            },
            renderer: function(c, d){
                return Ext.util.Format.uppercase(c)
            }
        },
        {
            text:"Type",
            dataIndex:"Type",
            width:140,
            hidden:false,
            filter: {
                type:"string"
            }
        },
        {
            text:"Division",
            dataIndex:"Division",
            width:140,
            filter: {
                type:"string"
            }
        },
        {
            text:"CXL Date",
            dataIndex:"CancelOn",
            filter: {
                type:"date"
            }
        },
        {
            text:"User ID",
            dataIndex:"UserID",
            width:140,
            hidden:false,
            filter: {
                type:"string"
            }
        },
        {
            text:"Description",
            dataIndex:"Descript",
            flex:1,
            hidden:false,
            filter: {
                type:"string"
            }
        }]
    },

    onSelect: function(e, f, h, g){

    },

    loadStore: function(){
        this.getStore().load()
    }
});
