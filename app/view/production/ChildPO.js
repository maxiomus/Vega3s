
Ext.define('Vega.view.production.ChildPO',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.production.ChildPOController',
        'Vega.view.production.ChildPOModel'
    ],

    alias: 'widget.prod-childpo',

    controller: 'prod-childpo',
    viewModel: {
        type: 'prod-childpo'
    },

    selModel: {
        mode: 'MULTI'
    },

    viewConfig: {
        loadMask:true,
        stripeRows:true,
        trackOver:true,
        //preserveScrollOnRefresh:true,
        //deferInitialRefresh: true,
        deferEmptyText: true,
        emptyText:'<h1 style="margin:20px">No matching results</h1>',
        plugins: [{
            ptype: 'gridviewdragdrop',
            dragText: 'Drag and drop to reorganize'
        }],

        listeners: {
            drop: function(node, data, dropRec, dropPosition){
                /*
                var factor = 10,
                    store = data.view.grid.store;

                store.each(function(rec){
                    rec.set('priority', (store.indexOf(rec) + 1) * factor);
                })
                */
            }
        }
    },

    columns: [
        { text: 'Style' , dataIndex: 'style', width: 88 },
        { text: 'Color' , dataIndex: 'color', width: 88 },
        { text: 'Type' , dataIndex: 'data_type', width: 88, hidden: true },
        { text: 'PO #' , dataIndex: 'pono', width: 88,
            renderer: function(val, meta, rec, rIdx, cIdx, store){
                var tpl = '<a href="#receiving/{0}">{1}</a>';

                return Ext.String.format(tpl, rec.data.pono, val);
            }
        },
        { text: 'CUT/PO' , dataIndex: 'cut_po', width: 88 },
        { xtype:'datecolumn', text: 'Order Date' , dataIndex: 'orderDate', width: 88, format: 'm-d-Y'},
        { xtype:'datecolumn', text: 'D. ETA' , dataIndex: 'nvlt_pod_etadate', width: 88, format: 'm-d-Y'},
        { text: 'D. Status' , dataIndex: 'nvlt_pod_status', width: 88 },
        { text: 'Total PO Qty' , dataIndex: 'nvlt_pod_unitSum', width: 88 },
        { text: 'Rec. Qty' , dataIndex: 'closed_qty', width: 88 },
        { text: 'Return Qty' , dataIndex: 'returnqty', width: 88 },
        { text: 'Price' , dataIndex: 'nvlt_pod_price', width: 88 },
        { text: 'Vendor' , dataIndex: 'vendor', width: 88  },
        { text: 'D. Memo' , dataIndex: 'nvlt_pod_memo', width: 88 },
        { text: 'Description' , dataIndex: 'descript', width: 88 },
        { xtype:'datecolumn', text: 'Start Date' , dataIndex: 'startDate', width: 88, format: 'm-d-Y'},
        { xtype:'datecolumn', text: 'Cancel Date' , dataIndex: 'cancelDate', width: 88, format: 'm-d-Y'},
        { xtype:'datecolumn', text: 'ETA Date' , dataIndex: 'etaDate', width: 88, format: 'm-d-Y'},
        { xtype:'datecolumn', text: 'Ship Date' , dataIndex: 'SHIPDATE', width: 88, format: 'm-d-Y'},
        { text: 'Division' , dataIndex: 'division', width: 88 },
        { text: 'D. W.H' , dataIndex: 'nvlt_pod_warehouse', width: 88 },
        { text: 'Proc. Type' , dataIndex: 'processType', width: 88 },
        { text: 'Status' , dataIndex: 'status', width: 88 },
        { text: 'Par. Style' , dataIndex: 'par_style', width: 88 },
        { text: 'Par. Color' , dataIndex: 'par_color', width: 88 },
        { text: 'Create User' , dataIndex: 'createUser', width: 88 },
        { xtype:'datecolumn', text: 'Create Date' , dataIndex: 'createDate', width: 88, format: 'm-d-Y'},
        { text: 'Type' , dataIndex: 'type', width: 88 },
        { text: 'W.H' , dataIndex: 'warehouse', width: 88 },
        { text: 'Ship To' , dataIndex: 'shipto', width: 88 },
        { text: 'Terms' , dataIndex: 'terms', width: 88 },
        { text: 'Ship via' , dataIndex: 'shipvia', width: 88 },
        { text: 'Memo Code' , dataIndex: 'memocode', width: 88  },
        { text: 'Pay. Method' , dataIndex: 'paymentcode', width: 88 },
        { text: 'OnHand' , dataIndex: 'ohs', width: 88 },
        { text: 'POD ID' , dataIndex: 'nvlt_pod_id', width: 88 },
        { text: 'Par. PO Key' , dataIndex: 'par_po_key', width: 88 },
        { text: 'P. PO #' , dataIndex: 'parent_pono', width: 88 },
        { text: 'UOM' , dataIndex: 'nvlt_pod_uom', width: 88 },
        { text: 'BOM' , dataIndex: 'poclh_exist', width: 88 },
        { text: 'Last Proc.' , dataIndex: 'last_process', width: 88 },
        { text: 'D. SO #' , dataIndex: 'nvlt_pod_SONo', width: 88 },
        { text: 'SO #' , dataIndex: 'so', width: 88 },
        { text: 'SO Customer' , dataIndex: 'so_customer', width: 88 }
    ],

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {

        });

        me.callParent(arguments);

        //me.relayEvents(me.getStore(), ['load']);
    },

    onGridViewDrop: function(node, data, dropRec, dropPosition){
        /*
        var factor = 10,
            store = data.view.grid.store;

        store.each(function(rec){
            rec.set('priority', (store.indexOf(rec) + 1) * factor);
        })
        */
    }
});
