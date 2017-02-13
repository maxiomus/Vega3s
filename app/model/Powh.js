Ext.define('Vega.model.Powh', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'powhId'},
        { name: 'powno', type: 'string'},
        { name: 'revision', type: 'int'},
        { name: 'ordertype', type: 'string'},
        { name: 'customer', type: 'string'},
        { name: 'division', type: 'string'},
        { name: 'status', type: 'string'},
        { name: 'label', type: 'string'},
        { name: 'custpo', type: 'string'},
        { name: 'custdept', type: 'string'},
        { name: 'preticket', type: 'boolean'},
        { name: 'pack', type: 'string'},
        { name: 'edi', type: 'boolean'},
        { name: 'terms', type: 'string'},
        { name: 'sales', type: 'string'},
        { name: 'salescontact', type: 'string'},
        { name: 'totalqty', type: 'number'},
        { name: 'mainfabric', type: 'string'},
        { name: 'content', type: 'string'},
        { name: 'sizes', type: 'string'},
        { name: 'ratio', type: 'string'},
        { name: 'cxldate', type: 'date', dateFormat: 'c'},
        { name: 'dcdate', type: 'date', dateFormat: 'c'},
        { name: 'userId', type: 'string'},
        { name: 'createdon', type: 'date', dateFormat: 'c'},
        { name: 'updatedby', type: 'string'},
        { name: 'updatedon', type: 'date', dateFormat: 'c'},
        { name: 'comments', type: 'string', allowNull: true },
        { name: 'buyer', type: 'string'},
        { name: 'routing', type: 'date', dateFormat: 'c'},
        { name: 'factory', type: 'string'},
        { name: 'incidentals', type: 'string'},
        { name: 'link', type: 'string', allowNull: true },
        { name: 'remarks', type: 'string', allowNull: true },
        { name: 'submissions', type: 'string'},
        { name: 'confirmon', type: 'date', dateFormat: 'c'},
        { name: 'reviseon', type: 'date', dateFormat: 'c'},
        { name: 'cancelon', type: 'date', dateFormat: 'c'},
        { name: 'submits', type: 'string', allowNull: true},
        { name: 'progress', type: 'string'}
    ],

    idProperty: 'powhId',
    identifier: 'negative',

    validators: {
        customer: 'presence',
        ordertype: 'presence'
        /*
        ordertype: { type: 'length', min: 2 },
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
        */
    },

    proxy: {
        type: 'rest',
        url: '/api/Powh/',

        /*
        pageParam: '',
        startParam: '',
        limitParam: '',
        */

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: true // set false to send a single record in array
        },

        extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
})