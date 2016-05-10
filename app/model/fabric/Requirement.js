/**
 * Created by tech on 6/12/2014.
 */


Ext.define('Vega.model.fabric.Requirement', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'status', type: 'string'},
        { name: 'confirmdate', type: 'date'},
        { name: 'po_qty', type: 'float'},
        { name: 'poclUnit1', type: 'float'},
        { name: 'pocltotalUnit', type: 'float'},
        { name: 'alloc_qty', type: 'float'},
        { name: 'c_alloc_bal', type: 'float'},
        { name: 'used_qty', type: 'float'},
        { name: 'c_balance', type: 'float'},
        { name: 'ohs', type: 'string'},
        { name: 'uom', type: 'string'},
        { name: 'descript', type: 'string'},
        { name: 'warehouse', type: 'string'},
        { name: 'poclStyle', type: 'string'},
        { name: 'poclColor', type: 'string'},
        { name: 'pono', type: 'int'},
        { name: 'podId', type: 'int'},
        { name: 'price', type: 'float'},
        { name: 'poclId', type: 'int'},
        { name: 'userName', type: 'string'},
        { name: 'userTime', type: 'date'},
        { name: 'req_location', type: 'string'}
    ],

    idProperty: 'poclId',

    proxy: {
        type: 'rest',
        url: '/api/Requirements',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }//,

        // Parameter name to send filtering information in
        //filterParam: 'filter'

        /*encodeFilters: function(filters) {
         return filters[0].value;
         }*/
    }
});

