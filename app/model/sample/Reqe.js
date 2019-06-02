Ext.define('Vega.model.sample.Reqe', {
    extend: 'Vega.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'reqeId'},
        { name: 'recipients', type: 'string'},
        { name: 'subject', type: 'string'},
        { name: 'body', type: 'string'},
        { name: 'sender', type: 'string'},
        { name: 'created', type: 'date'},
        {
            name: 'reqhId',
            //If the association isn't given data,
            // it will attempt to retrieve the data.
            // Only way to stop it currently is to override the association or give it dummy data.
            reference: {
                parent: 'sample.Reqh',
                //type: 'Product',
                //association: 'bomsByProduct',
                //field: 'reqhId',
                role: 'reqh',
                inverse: 'reqes'
            }
        }
    ],

    idProperty: 'reqdId',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/api/Reqe',

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
                console.log('reqds - Model', response, operation);
            }
        }
    }
});
