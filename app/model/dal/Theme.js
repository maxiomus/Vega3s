/**
 * Created by tech on 5/09/2018.
 */

Ext.define('Vega.model.dal.Theme', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'CODE', type: 'string' },
        { name: 'TITLE', type: 'string' },
        { name: 'DESCRIPTION', type: 'string' }
    ],

    idProperty: 'CODE',

    validators: {
        code: 'presence'
    },

    proxy: {
        type: "rest",
        url: "/api/Themes/",

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
