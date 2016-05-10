Ext.define('Vega.model.fabric.PoDetail', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'descript', type: 'string'},
        { name: 'styletype', type: 'string'},
        { name: 'rawMattype', type: 'float'},
        { name: 'logdate', convert: df },
        { name: 'unit1', type: 'float'},
        { name: 'ohs', type: 'float'},
        { name: 'price', type: 'float'},
        { name: 'etadate', convert: df },
        { name: 'totalUnit', type: 'float'},
        { name: 'warehouse', type: 'string'},
        { name: 'warehouseType', type: 'string'},
        { name: 'status', type: 'string'},
        { name: 'memo', type: 'string'},
        { name: 'unitSum', type: 'float'},
        { name: 'cancelReason', type: 'string'},
        { name: 'CancelReasonDate', convert: df },
        { name: 'vendorPart', type: 'string'},
        { name: 'vendorColor', type: 'string'},
        { name: 'actual_cost', type: 'float'},
        { name: 'act_proc_cost', type: 'float'},
        { name: 'act_bom_cost', type: 'float'},
        { name: 'act_assoc_cost', type: 'float'},
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
};
