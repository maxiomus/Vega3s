Ext.define('Vega.model.fabric.PoDetail', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'descript', type: 'string'},
        { name: 'styletype', type: 'string'},
        { name: 'rawMattype', type: 'number'},
        { name: 'logdate', type: 'date', dateFormat: 'c'},
        { name: 'lotno', type: 'string'},
        { name: 'unit1', type: 'number'},
        { name: 'ohs', type: 'number'},
        { name: 'price', type: 'number'},
        { name: 'etadate', type: 'date', dateFormat: 'c'},
        { name: 'totalUnit', type: 'number'},
        { name: 'warehouse', type: 'string'},
        { name: 'warehouseType', type: 'string'},
        { name: 'status', type: 'string'},
        { name: 'memo', type: 'string'},
        { name: 'unitSum', type: 'number'},
        { name: 'cancelReason', type: 'string'},
        { name: 'CancelReasonDate', type: 'date', dateFormat: 'c'},
        { name: 'vendorPart', type: 'string'},
        { name: 'vendorColor', type: 'string'},
        { name: 'actual_cost', type: 'number'},
        { name: 'act_proc_cost', type: 'number'},
        { name: 'act_bom_cost', type: 'number'},
        { name: 'act_assoc_cost', type: 'number'},
        { name: 'SONo', type: 'int'},
        { name: 'sodid', type: 'int'},
        { name: 'sizeCat', type: 'string'},
        { name: 'pino', type: 'int'},
        {
            name: 'pono',
            type: 'int',
            reference: {
                type: 'Poh',
                role: 'pono',
                inverse: 'podetails'
            }
        }
    ],
    //remoteGroup: false,

    //belongsTo: 'Poh',

    proxy: {
        type: 'rest',
        url: '/api/PoDetails',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        // Parameter name to send filtering information in
        filterParam: 'filter'

        /*
         encodeFilters: function(filters) {
         return filters[0].getValue();
         }
         */

    }
});

function df(value, record){
    return value != undefined ? value.replace(/T.+/,''): '';
}
