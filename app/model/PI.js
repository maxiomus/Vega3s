Ext.define('Vega.model.PI', {
    extend: 'Vega.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'ref', type: 'string' },
        { name: 'logdate', type: 'date' },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'wareHouse', type: 'string' },
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
        { name: 'userName', type: 'string' },
        { name: 'userTime', type: 'date' },
        { name: 'cutno', type: 'int' },
        { name: 'damageReason', type: 'string' },
        { name: 'inventoryId', type: 'int' },
        { name: 'po_receive_no', type: 'int' },
        { name: 'pono', type: 'int' },
        { name: 'status', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'bundle', type: 'string' },
        { name: 'pcsPerBundle', type: 'int' },
        { name: 'bundlePerBox', type: 'int' },
        { name: 'pcsPerBox', type: 'int' },
        { name: 'numBox', type: 'int' },
        { name: 'price', type: 'number' },
        { name: 'memo', type: 'string' },
        { name: 'ratioID', type: 'int' },
        { name: 'detaildescr', type: 'string' },
        { name: 'processNo', type: 'int' },
        { name: 'podId', type: 'int' },
        { name: 'previouscolor', type: 'string' },
        { name: 'pocl', type: 'string' },
        { name: 'poclUsed', type: 'string' },
        { name: 'poclStyle', type: 'string' },
        { name: 'poclColor', type: 'string' },
        { name: 'updateDate', type: 'date' },
        { name: 'alter_pack', type: 'string' },
        { name: 'pr_line', type: 'int' },
        { name: 'pr_orderno', type: 'int' },
        { name: 'vendor', type: 'string' },
        { name: 'prdid', type: 'int' },
        { name: 'damage_pr_line', type: 'int' },
        { name: 'damage_pr_orderno', type: 'int' },
        { name: 'damage_location', type: 'string' },
        { name: 'damage_prdid', type: 'int' },
        { name: 'lotno', type: 'string' },
        { name: 'terms', type: 'string' },
        { name: 'shipvia', type: 'string' },
        { name: 'bill_execlude', type: 'auto' },
        { name: 'dmg_short', type: 'auto' },
        { name: 'mobile_fu', type: 'int' },
        { name: 'poclid', type: 'int' },
        { name: 'actual_yn', type: 'auto' },
        { name: 'polid', type: 'int' },
        { name: 'updateUser', type: 'string' },
        { name: 'sizeCat', type: 'string' },
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
        { name: 'sz1', type: 'string' },
        { name: 'sz2', type: 'string' },
        { name: 'sz3', type: 'string' },
        { name: 'sz4', type: 'string' },
        { name: 'sz5', type: 'string' },
        { name: 'sz6', type: 'string' },
        { name: 'sz7', type: 'string' },
        { name: 'sz8', type: 'string' },
        { name: 'sz9', type: 'string' },
        { name: 'sz10', type: 'string' },
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
        url: '/api/PIs',

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