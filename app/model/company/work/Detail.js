/**
 * Created by tech on 5/22/2019.
 */
Ext.define('Vega.model.company.work.Detail', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'id' },
        { name: 'name', type: 'string' },
        { name: 'value', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'property', type: 'string' },
        { name: 'headerId', type: 'int' },
        {
            name: 'processId',
            reference: {
                parent: 'company.work.Process',
                //
                //type: 'sales.Powh',
                //association: 'stylesByHeader',
                role: 'process',
                inverse: 'details'
            }
        }

    ],

    /*
    Uncomment to add validation rules
    validators: {
        age: 'presence',
        name: { type: 'length', min: 2 },
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
    }
    */
    proxy: {
        type: 'rest',
        url: "/api/Detail",

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