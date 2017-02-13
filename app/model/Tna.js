Ext.define('Vega.model.Tna', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'tnaId', type: 'int'},
        { name: 'planId', type: 'int'},
        { name: 'lineseq', type: 'int', persist: false,
            calculate: function(data){
                return data.priority / 10;
            }
        },
        { name: 'customer', type: 'string' },
        { name: 'activity', type: 'string'},
        { name: 'descript', type: 'string'},
        { name: 'due', type: 'date'},
        { name: 'duration', type: 'int'},
        { name: 'priority', type: 'int'},
        { name: 'coordinator', type: 'string'},
        { name: 'active', type: 'boolean'}
    ],

    idProperty: 'tnaId',

    proxy: {
        type: 'rest',
        url: '/api/Tna',

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
                console.log('Tna - Model', response, operation);
            }
        }
    }
})