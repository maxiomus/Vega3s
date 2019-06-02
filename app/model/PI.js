Ext.define('Vega.model.PI', {
    extend: 'Vega.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'ref', type: 'string', convert: tr },
        { name: 'logdate', type: 'date', dateFormat: 'c' },
        { name: 'style', type: 'string', convert: tr },
        { name: 'color', type: 'string', convert: tr },
        { name: 'wareHouse', type: 'string', convert: tr },
        { name: 'unit1', type: 'number' },
        { name: 'unit2', type: 'number' },
        { name: 'unit3', type: 'number' },
        { name: 'unit4', type: 'number' },
        { name: 'unit5', type: 'number' },
        { name: 'unit6', type: 'number' },
        { name: 'unit7', type: 'number' },
        { name: 'unit8', type: 'number' },
        { name: 'unit9', type: 'number' },
        { name: 'unit10', type: 'number' },
        { name: 'totalUnit', type: 'number' },
        { name: 'userName', type: 'string', convert: tr },
        { name: 'userTime', type: 'date', dateFormat: 'c' },
        { name: 'cutno', type: 'int' },
        { name: 'damageReason', type: 'string', convert: tr },
        { name: 'inventoryId', type: 'int' },
        { name: 'po_receive_no', type: 'int' },
        { name: 'pono', type: 'int' },
        { name: 'status', type: 'string', convert: tr },
        { name: 'location', type: 'string', convert: tr },
        { name: 'bundle', type: 'string', convert: tr },
        { name: 'pcsPerBundle', type: 'int' },
        { name: 'bundlePerBox', type: 'int' },
        { name: 'pcsPerBox', type: 'int' },
        { name: 'numBox', type: 'int' },
        { name: 'price', type: 'number' },
        { name: 'memo', type: 'string', convert: tr },
        { name: 'ratioID', type: 'int' },
        { name: 'detaildescr', type: 'string', convert: tr },
        { name: 'processNo', type: 'int' },
        { name: 'podId', type: 'int' },
        { name: 'previouscolor', type: 'string', convert: tr },
        { name: 'pocl', type: 'string', convert: tr },
        { name: 'poclUsed', type: 'string', convert: tr },
        { name: 'poclStyle', type: 'string', convert: tr },
        { name: 'poclColor', type: 'string', convert: tr },
        { name: 'updateDate', type: 'date', dateFormat: 'c' },
        { name: 'alter_pack', type: 'string', convert: tr },
        { name: 'pr_line', type: 'int' },
        { name: 'pr_orderno', type: 'int' },
        { name: 'vendor', type: 'string', convert: tr },
        { name: 'prdid', type: 'int' },
        { name: 'damage_pr_line', type: 'int' },
        { name: 'damage_pr_orderno', type: 'int' },
        { name: 'damage_location', type: 'string', convert: tr },
        { name: 'damage_prdid', type: 'int' },
        { name: 'lotno', type: 'string', convert: tr },
        { name: 'terms', type: 'string', convert: tr },
        { name: 'shipvia', type: 'string', convert: tr },
        { name: 'bill_execlude', type: 'auto' },
        { name: 'dmg_short', type: 'auto' },
        { name: 'mobile_fu', type: 'int' },
        { name: 'poclid', type: 'int' },
        { name: 'actual_yn', type: 'auto' },
        { name: 'polid', type: 'int' },
        { name: 'updateUser', type: 'string', convert: tr },
        { name: 'sizeCat', type: 'string', convert: tr },
        { name: 'oh1', type: 'number' },
        { name: 'oh2', type: 'number' },
        { name: 'oh3', type: 'number' },
        { name: 'oh4', type: 'number' },
        { name: 'oh5', type: 'number' },
        { name: 'oh6', type: 'number' },
        { name: 'oh7', type: 'number' },
        { name: 'oh8', type: 'number' },
        { name: 'oh9', type: 'number' },
        { name: 'oh10', type: 'number' },
        { name: 'oh11', type: 'number' },
        { name: 'oh12', type: 'number' },
        { name: 'oh13', type: 'number' },
        { name: 'oh14', type: 'number' },
        { name: 'oh15', type: 'number' },
        { name: 'ohs', type: 'number' },
        { name: 'sz1', type: 'string', convert: tr },
        { name: 'sz2', type: 'string', convert: tr },
        { name: 'sz3', type: 'string', convert: tr },
        { name: 'sz4', type: 'string', convert: tr },
        { name: 'sz5', type: 'string', convert: tr },
        { name: 'sz6', type: 'string', convert: tr },
        { name: 'sz7', type: 'string', convert: tr },
        { name: 'sz8', type: 'string', convert: tr },
        { name: 'sz9', type: 'string', convert: tr },
        { name: 'sz10', type: 'string', convert: tr },
        { name: 'userId', type: 'string', mapping: 'userName', persist: false},
        { name: 'sizeCount', type: 'int' },
        {
            /*
                 When associate models,
                 model name with Id prefixed.
                 ex. pihId
                 or using field...
             */
            name: 'pino',
            reference: {
                parent: 'PIH',
                //
                //type: 'Product',
                //association: 'bomsByProduct',
                //role: 'product',
                field: 'pino',
                inverse: 'pis'
            }
        }
    ],

    idProperty: 'inventoryId',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/api/PIDs',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('PI - Model', response, operation);
            }
        }
    }
});

function tr(value, record){
    return Ext.String.trim(value);
}
