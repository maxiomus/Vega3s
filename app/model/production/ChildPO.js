Ext.define('Vega.model.production.ChildPO', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'data_type', type: 'string'},
        { name: 'par_po_key', type: 'int'},
        { name: 'pono', type: 'int'},
        { name: 'orderDate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d'},
        { name: 'startDate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d'},
        { name: 'cancelDate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d'},
        { name: 'etaDate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d'},
        { name: 'vendor', type: 'string'},
        { name: 'status', type: 'string'},
        { name: 'type', type: 'string'},
        { name: 'terms', type: 'string'},
        { name: 'shipvia', type: 'string'},
        { name: 'createUser', type: 'string'},
        { name: 'createDate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d'},
        { name: 'memocode', type: 'string'},
        { name: 'processType', type: 'string'},
        { name: 'shipto', type: 'string'},
        { name: 'warehouse', type: 'string'},
        { name: 'cut_po', type: 'string'},
        { name: 'division', type: 'string'},
        { name: 'paymentcode', type: 'string'},
        { name: 'SHIPDATE', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d'},
        //{ name: 'parent_pono', type: 'int'},
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'nvlt_pod_memo', type: 'string'},
        { name: 'nvlt_pod_price', type: 'number'},
        { name: 'nvlt_pod_status', type: 'string'},
        { name: 'nvlt_pod_SONo', type: 'string'},
        { name: 'nvlt_pod_id', type: 'int'},
        { name: 'nvlt_pod_unitSum', type: 'string'},
        { name: 'nvlt_pod_warehouse', type: 'string'},
        { name: 'nvlt_pod_etadate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d'},
        { name: 'nvlt_pod_uom', type: 'string'},
        { name: 'returnqty', type: 'number'},
        { name: 'poclh_exist', type: 'string'},
        { name: 'last_process', type: 'string'},
        { name: 'so', type: 'string'},
        { name: 'so_customer', type: 'string'},
        { name: 'descript', type: 'string'},
        { name: 'ohs', type: 'number'},
        { name: 'closed_qty', type: 'number'},
        { name: 'par_style', type: 'string'},
        { name: 'par_color', type: 'string'},
        {
            name: 'parent_pono',
            reference: {
                //parent: 'production.WIP',
                type: 'production.WIP',
                //association: 'CposByWIP',
                role: 'wip',
                field: 'pono',
                inverse: 'cpos'
            }
        }
    ],

    idProperty: 'nvlt_pod_id',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/api/Children/',

        //batchActions: true,

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        /*
        writer: {
            type: 'json',
            //writeAllFields: true,
            allowSingle: false
        },
        */

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('ChildPO - Model', response, operation);
            }
        }
    }
});
