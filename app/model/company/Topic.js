/**
 * Created by tech on 5/22/2019.
 */
Ext.define('Vega.model.company.Topic', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'topicId' },
        { name: 'name', mapping: 'subject' },
        { name: 'desc', mapping: 'content' },
        { name: 'userId', type: 'string' },
        { name: 'created' },
        { name: 'status', type: 'int' },
        { name: 'boardId', type: 'int' },
        { name: 'categoryId', type: 'int' }
    ],

    idProperty: 'topicId',
    identifier: 'negative',

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
        url: "/api/Topic",

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