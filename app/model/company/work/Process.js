/**
 * Created by tech on 5/22/2019.
 */
Ext.define('Vega.model.company.work.Process', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'id' },
        { name: 'title', type: 'string' },
        { name: 'descript', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'managers', type: 'string' },
        { name: 'processors', type: 'string' },
        { name: 'startOn', type: 'date', dateFormat: 'c' },
        { name: 'dueOn', type: 'date', dateFormat: 'c' },
        { name: 'length' },
        { name: 'unit', type: 'string' },
        { name: 'deadline', type: 'string' },
        { name: 'creator', type: 'string' },
        { name: 'created', type: 'date', dateFormat: 'c' },
        { name: 'updated', type: 'date', dateFormat: 'c' },
        { name: 'name', type: 'string' },
        { name: 'status', type: 'string' }
    ],

    //Uncomment to add validation rules
    validators: {
        title: ['presence', { type: 'length', min: 2, max: 255 }],
        processors: ['presence']
        /*
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
        */
    },

    proxy: {
        type: 'rest',
        url: "/api/Process",

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