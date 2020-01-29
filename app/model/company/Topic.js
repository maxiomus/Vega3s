/**
 * Created by tech on 5/22/2019.
 */
Ext.define('Vega.model.company.Topic', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'topicId', type: 'int' },
        { name: 'subject', type: 'string' },
        { name: 'content', type: 'string' },
        //{ name: 'name', mapping: 'subject', persist: false },
        //{ name: 'desc', mapping: 'content', persist: false },
        { name: 'userId', type: 'string' },
        { name: 'created', type: 'date', dateFormat: 'c' },
        { name: 'status', type: 'int' },
        { name: 'boardId', type: 'int' },
        { name: 'categoryId', type: 'int' },
        { name: 'postTotal', persist: false },
        { name: 'files', type: 'auto', persist: false }
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
        url: "/api/BoardTopic",

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