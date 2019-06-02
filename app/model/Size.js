
Ext.define('Vega.model.Size', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'code', type: 'string' },
        { name: 'size1', type: 'string' },
        { name: 'size2', type: 'string' },
        { name: 'size3', type: 'string' },
        { name: 'size4', type: 'string' },
        { name: 'size5', type: 'string' },
        { name: 'size6', type: 'string' },
        { name: 'size7', type: 'string' },
        { name: 'size8', type: 'string' },
        { name: 'size9', type: 'string' },
        { name: 'size10', type: 'string' },
        { name: 'size11', type: 'string' },
        { name: 'size12', type: 'string' },
        { name: 'size13', type: 'string' },
        { name: 'size14', type: 'string' },
        { name: 'size15', type: 'string' },
        { name: 'nrf1', type: 'string' },
        { name: 'nrf2', type: 'string' },
        { name: 'nrf3', type: 'string' },
        { name: 'nrf4', type: 'string' },
        { name: 'nrf5', type: 'string' },
        { name: 'nrf6', type: 'string' },
        { name: 'nrf7', type: 'string' },
        { name: 'nrf8', type: 'string' },
        { name: 'nrf9', type: 'string' },
        { name: 'nrf10', type: 'string' },
        { name: 'nrf11', type: 'string' },
        { name: 'nrf12', type: 'string' },
        { name: 'nrf13', type: 'string' },
        { name: 'nrf14', type: 'string' },
        { name: 'nrf15', type: 'string' },
        { name: 'sizeCount', type: 'int' },
        { name: 'sample_size', type: 'string' }
    ],

    idProperty: 'code',

    validators: {
        code: 'presence'
    },

    proxy: {
        type: "rest",
        url: "/api/Sizes/",

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