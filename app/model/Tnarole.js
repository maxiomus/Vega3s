Ext.define('Vega.model.Tnarole', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'id', type: 'int'},
        { name: 'name', type: 'string'},
        { name: 'descript', type: 'string'},
        { name: 'account', type: 'string' },
        { name: 'active', type: 'boolean'}
    ],

    identifier: 'negative',

    validators: {
        name: 'presence'
    },

    proxy: {
        type: 'rest',
        url: '/api/Tnaroles',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            type: 'json',
            //writeAllFields: true,
            allowSingle: false
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('Tnarole - Model', response, operation);
            }
        }
    }
});
