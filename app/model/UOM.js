/**
 * Created by tech on 5/09/2018.
 */
Ext.define('Vega.model.UOM', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'code', type: 'string' },
        { name: 'descript', type: 'string' },
        { name: 'def' }
    ],

    idProperty: 'code',

    validators: {
        code: 'presence'
    },

    proxy: {
        type: "rest",
        url: "/api/UOM/",

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