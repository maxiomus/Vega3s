
Ext.define('Vega.model.development.GraphicRequest', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'ID', type: 'int' },
        { name: 'RowNo', type: 'int' },
        { name: 'ETA', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d' },
        { name: 'Due', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d' },
        { name: 'Issued', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d' },
        { name: 'Received', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d' },
        { name: 'PrintNo', type: 'string' },
        { name: 'Name', type: 'string' },
        { name: 'Dept', type: 'string' }, // Customer or Account
        { name: 'Coordinator', type: 'string' },
        { name: 'Memo', type: 'string' },
        { name: 'Status', type: 'string' },
        { name: 'Designer', type: 'string' },
        { name: 'Type', type: 'string' },
        { name: 'Active', type: 'bool' },
        { name: 'Priority', type: 'string' },
        { name: 'Complete', type: 'string' },
        { name: 'CDate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d' },
        { name: 'CUser', type: 'string' },
        { name: 'UDate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d' },
        { name: 'MUser', type: 'string' },
        { name: 'RequestQty', type: 'int' }
    ],

    idProperty: 'ID',
    identifier: 'negative',

    validators: {
        Issued: [{
            type: 'presence'
        }],
        Due: 'presence',
        //Dept: 'presence',
        //Type: 'presence',
        RequestQty: 'presence'
    },

    proxy: {
        type: 'rest',
        url: '/api/GraphicRequests',

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
                console.log('GraphicRequest - Model', response, operation);
            }
        }
    }
});
