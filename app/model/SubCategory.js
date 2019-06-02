
Ext.define('Vega.model.SubCategory', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'class', type: 'string' },
        { name: 'code', type: 'string' },
        { name: 'descript', type: 'string' },
        { name: 'user1', type: 'string' },
        { name: 'user2', type: 'string' },
        { name: 'user3', type: 'string' },
        { name: 'user4', type: 'string' },
        { name: 'category', type: 'string' }
    ],

    idProperty: 'code',

    validators: {
        code: 'presence'
    },

    proxy: {
        type: "rest",
        url: "/api/SubCategories/",

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