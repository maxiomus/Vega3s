Ext.define('Vega.model.Bomh', {
    extend: 'Vega.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'ID', type: 'int' },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'bomno', type: 'int' },
        { name: 'styleCompTotal', type: 'number' },
        { name: 'colorCompTotal', type: 'number' },
        { name: 'markers', type: 'number' },
        { name: 'grading', type: 'number' },
        { name: 'freight', type: 'number' },
        { name: 'insurance', type: 'number' },
        { name: 'warehouse', type: 'number' },
        { name: 'finishing', type: 'number' },
        { name: 'misc', type: 'number' },
        { name: 'quota', type: 'number' },
        { name: 'plainOverHead', type: 'number' },
        { name: 'markup', type: 'number' },
        { name: 'sales', type: 'number' },
        { name: 'chgBack', type: 'number' },
        { name: 'overHead', type: 'number' },
        { name: 'target', type: 'number' },
        { name: 'selling', type: 'number' },
        { name: 'total', type: 'number' },
        { name: 'setDefault', type: 'auto' },
        { name: 'duty', type: 'number' },
        { name: 'createUser', type: 'string', convert: tr },
        { name: 'createTime', type: 'date' },
        { name: 'updateUser', type: 'string', convert: tr },
        { name: 'updateTime', type: 'date' },
        { name: 'processType', type: 'string', convert: tr },
        { name: 'EffStartDate', type: 'date' },
        { name: 'EffEndDate', type: 'date' },
        { name: 'processtotal', type: 'number' },
        { name: 'bommemo', type: 'string', convert: tr },
        { name: 'confirm_yn', type: 'auto' },
        { name: 'assoctotal', type: 'number' },
        { name: 'associate_type', type: 'string', convert: tr }
        /*
        {
            name: 'productId',
            reference: {
                parent: 'Product',
                //
                //type: 'Product',
                //association: 'bomsByProduct',
                //role: 'product',
                inverse: 'bomhs'
            }
        }
        */
    ],

    idProperty: 'ID',
    identifier: 'negative',

    validators: {
        style: 'presence',
        color: 'presence',
        bomno: 'presence'
    },

    proxy: {
        type: 'rest',
        url: '/api/Bomhs',

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
                console.log('BomH - Model', response, operation);
            }
        }
    }
});