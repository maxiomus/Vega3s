/**
 * Model representing a PowLog object
 */
Ext.define('Vega.model.Powlog', {
    extend: 'Vega.model.Base',

    fields: [
        // id field
        {
            name: 'powlogId',
            type: 'int'
        },
        {
            name: 'powdId',
            type: 'int'
        },
        {
            name: 'powno',
            type: 'string'
        },
        {
            name: 'revision',
            type: 'int'
        },
        // simple values
        {
            name: 'content',
            type: 'string'
        },
        {
            name: 'active',
            type: 'boolean'
        },
        {
            name: 'status',
            type: 'string'
        },
        {
            name: 'userId',
            type: 'string'
        },
        {
            name: 'logdate',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'powhId',
            reference: {
                parent: 'Powh',
                //
                //type: 'sales.Powh',
                //association: 'stylesByHeader',
                //role: 'powh',
                inverse: 'powlogs'
            }
        }
    ],

    idProperty: 'powlogId',
    identifier: 'negative',

    proxy: {
        //$configStrict: false,
        type: 'rest',
        url: '/api/Powlog/',
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

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});