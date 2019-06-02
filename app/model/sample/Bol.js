Ext.define('Vega.model.sample.Bol', {
    extend: 'Vega.model.Base',

    requires: [
        //'Vega.data.identifier.BolId'
    ],

    fields: [
        {
            name: 'id'
            /*
            calculate: function(data){
                return data.style.trim() + '-' + data.color.trim() + '-' + data.bomno + '-' + data.line + '-' + data.orderNo;
            }
            */
        },
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'bomno', type: 'int' },
        { name: 'line', type: 'int' },
        { name: 'orderNo', type: 'int' },
        { name: 'location', type: 'string' },
        { name: 'ProcessType', type: 'string', convert: tr },
        { name: 'inhouse', defaultValue: 'N' },
        { name: 'vendor', type: 'string', convert: tr },
        { name: 'leadtime', type: 'int' },
        { name: 'price', type: 'number' },
        { name: 'po_autocreate', defaultValue: 'N' },
        { name: 'memo', type: 'string' },
        { name: 'yard_base', defaultValue: 'N' },
        { name: 'receiving_loc' },
        { name: 'inch_qty', type: 'number' },
        {
            name: 'bolhId',
            reference: {
                parent: 'sample.Bolh',
                //type: 'Product',
                //association: 'bomsByProduct',
                //role: 'product',
                field: 'id',
                role: 'bolh',
                inverse: 'bols'
            }
        }
    ],

    //idProperty: 'bolId',
    //identifier: 'negative',
    //clientIdProperty: 'clientId',

    autoLoad: false,

    validators: {
        style: 'presence',
        color: 'presence',
        bomno: 'presence',
        line: 'presence',
        orderNo: 'presence'
    },

    proxy: {
        type: 'rest',
        url: '/api/Bols',

        batchActions: true, // default false when rest proxy.
        //batchOrder: 'destroy,create,update',

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
                console.log('Bol - Model', response, operation);
            }
        }
    }
});


function tr(value, record){
    if(!Ext.isEmpty(value)){
        return Ext.String.trim(value);
    }
    return value;
}
