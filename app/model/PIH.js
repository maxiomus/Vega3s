Ext.define('Vega.model.PIH', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'pino', type: 'int' },
        { name: 'pidate', type: 'date', format: 'c' },
        { name: 'memo', type: 'string' },
        { name: 'createUser', type: 'string', convert: tr },
        { name: 'createTime', type: 'date', format: 'c' },
        { name: 'updateUser', type: 'string' },
        { name: 'updateTime', type: 'date', format: 'c' },
        { name: 'warehouse', type: 'string', convert: tr },
        { name: 'alter_pack', type: 'string' },
        { name: 'tagNumber', type: 'string' },
        { name: 'pireason', type: 'string' },
        { name: 'status', type: 'string', convert: tr },
        { name: 'user1', type: 'string' },
        { name: 'user2', type: 'string' },
        { name: 'user3', type: 'string' },
        { name: 'user4', type: 'string' }
    ],

    idProperty: 'pino',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/api/PIH',

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

        //extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('Physical - Model', response, operation);
            }
        }
    }
});

function tr(value, record){
    return Ext.String.trim(value);
};