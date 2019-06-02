Ext.define('Vega.model.sample.Reqd', {
    extend: 'Vega.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'reqdId'},
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'rawmattype', type: 'string'},
        { name: 'label', type: 'string'},
        { name: 'description', type: 'string'},
        { name: 'qty1', type: 'number'},
        { name: 'qty2', type: 'number'},
        { name: 'qty3', type: 'number'},
        { name: 'width', type: 'number'},
        { name: 'length', type: 'number'},
        { name: 'weight', type: 'number'},
        { name: 'lineseq', type: 'int' },
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
                inverse: 'reqds'
            }
        }
    ],

    idProperty: 'reqdId',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/api/Reqd',

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
