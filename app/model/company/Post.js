/**
 * Created by tech on 5/22/2019.
 */
Ext.define('Vega.model.company.Post', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'postId' },
        { name: 'subject', type: 'string'  },
        { name: 'content', type: 'string'  },
        { name: 'userId', type: 'string' },
        { name: 'created' },
        { name: 'files', type: 'auto', persist: false },
        {
            name: 'topicId',
            reference: {
                parent: 'company.Topic',
                //
                //type: 'sales.Powh',
                //association: 'stylesByHeader',
                role: 'topic',
                inverse: 'posts'
            }
        }
    ],

    idProperty: 'postId',
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
        url: "/api/BoardPost",
        timeout: 90000,

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