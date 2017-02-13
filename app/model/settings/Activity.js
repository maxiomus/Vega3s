Ext.define('Vega.model.settings.Activity', {
    extend: 'Vega.model.Base',

    fields: [
        {   name: 'activity', type: 'string' },
        {   name: 'descript', type: 'string' },
        {   name: 'duration', type: 'int' }
    ],

    //idProperty: 'fileId',
    //identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/api/Activities",

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
})