Ext.define('Vega.model.sample.Linesheet', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'lineId' },
        { name: 'title' },
        { name: 'description' },
        { name: 'season' },
        { name: 'userId', type: 'string' },
        { name: 'userTime', type: 'date', dateFormat: 'c' }
    ],

    idProperty: 'lineId',
    identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/api/Linesheets",

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
