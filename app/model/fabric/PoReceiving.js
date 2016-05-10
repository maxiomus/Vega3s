Ext.define('Vega.model.fabric.PoReceiving', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'style', type: 'string', convert: tr },
        { name: 'color', type: 'string', convert: tr },
        { name: 'lotno', type: 'string', convert: tr },
        { name: 'rollno', type: 'string', convert: tr },
        { name: 'unit1', type: 'float'},
        { name: 'price', type: 'float'},
        { name: 'logdate', convert: df },
        { name: 'vendor', type: 'string', convert: tr },
        { name: 'warehouse', type: 'string', convert: tr },
        { name: 'warehouseType', type: 'string', convert: tr },
        { name: 'damage_location', type: 'string', convert: tr },
        { name: 'damageReason', type: 'string', convert: tr },
        { name: 'memo', type: 'string', convert: tr },
        { name: 'totalUnit', type: 'float'},
        { name: 'c_total_amt', type: 'float'},
        { name: 'podId', type: 'int'},
        { name: 'inventoryId', type: 'int'},
        { name: 'userName', type: 'string', convert: tr },
        { name: 'userTime', convert: df },
        { name: 'updateDate', convert: df },
        { name: 'location', type: 'string', convert: tr },
        { name: 'ref', type: 'string', convert: tr },
        { name: 'pino', type: 'int'},
        {
            name: 'pono',
            type: 'int'
        }
    ],
    //remoteGroup: false,

    //belongsTo: 'Poh',

    proxy: {
        type: 'rest',
        url: '/api/PoReceivings',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
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
    return value != undefined ? new Date(value.replace(/-/g, '\/').replace(/T.+/,'')): '';
};

function tr(value, record){
    return Ext.String.trim(value);
};

