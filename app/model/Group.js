
Ext.define('Vega.model.Group', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'code', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'fabric_class', type: 'string' },
        { name: 'user1', type: 'string' },
        { name: 'user2', type: 'string' }
    ],

    idProperty: 'code',

    validators: {
        code: 'presence'
    },

    proxy: {
        type: "rest",
        url: "/api/Groups/",

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