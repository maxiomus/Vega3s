Ext.define('Vega.model.ProcessLoc', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'code', type: 'string' },
        { name: 'descript', type: 'string' },
        { name: 'CreateUser', type: 'string' },
        { name: 'CreateTime', type: 'date' },
        { name: 'UpdateUser', type: 'string' },
        { name: 'UpdateTime', type: 'date' },
        { name: 'inhouse' },
        { name: 'vendor', type: 'string' },
        { name: 'leadtime', type: 'int' },
        { name: 'price', type: 'number' },
        { name: 'po_autocreate' },
        { name: 'account', type: 'string' },
        { name: 'show_allowance' },
        { name: 'show_in_wip' },
        { name: 'receiving_loc' }
    ],

    idProperty: 'code',

    validators: {
        code: 'presence'
    },

    proxy: {
        type: "rest",
        url: "/api/ProcessLocs/",

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: "json",
            rootProperty: "data"
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});
