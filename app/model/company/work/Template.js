/**
 * Created by tech on 5/22/2019.
 */
Ext.define('Vega.model.company.work.Template', {
    extend: 'Vega.model.company.work.Process',

    fields: [
        //{ name: 'id' },
        { name: 'name', type: 'string' },
        { name: 'status', type: 'string' }
        /*
        { name: 'creator', type: 'string' },
        { name: 'created', type: 'date', dateFormat: 'c' },
        {
            name: 'processId',
            reference: {
                //parent: 'company.work.Process',
                //
                type: 'company.work.Process',
                //association: 'stylesByHeader',
                unique: true
            }
        }
        */
    ],

    //Uncomment to add validation rules
    validators: {
        name: ['presence', { type: 'length', min: 2, max: 255 }]
        /*
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
        */
    },

    /*
    proxy: {
        type: 'rest',
        url: "/api/Template",

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
    },
    */

    getName: function(){
        return this.data.name;
    },

    setName: function(name){
        this.set('name', name);
    },

    getStatus: function(){
        return this.data.status;
    },

    setStatus: function (status) {
        this.set('status', status)
    }
});