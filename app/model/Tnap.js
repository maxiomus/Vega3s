Ext.define('Vega.model.Tnap', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'dtId', type: 'int'},
        { name: 'tnaId', type: 'int'},
        { name: 'powdId', type: 'int'},
        { name: 'planId', type: 'int', persist: false },
        { name: 'descript', type: 'string'},
        //{ name: 'activity', type: 'string', persist: false },
        //{ name: 'duration', type: 'int', persist: false },
        { name: 'due', type: 'date', dateFormat: 'c'},
        { name: 'responder', type: 'string'},
        { name: 'priority', type: 'int'},
        { name: 'remind', type: 'date', dateFormat: 'c'},
        { name: 'eta', type: 'date', dateFormat: 'c'},
        { name: 'complete', type: 'date', dateFormat: 'c'},
        { name: 'remarks', type: 'string'},
        { name: 'lineseq', type: 'int', persist: false,
            calculate: function(data){
                return data.priority / 10;
            }
        },
        {
            name: 'powdId',
            reference: {
                parent: 'Powd',

                //type: 'sales.Powd',
                //association: 'MaterialsByStyle',
                //role: 'powd',
                inverse: 'tnaps'
            }
        }
    ],

    idProperty: 'dtId',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/api/Tnap/',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            type: 'json',
            //writeAllFields: false,
            allowSingle: false
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('Tna - Model', response, operation);
            }
        }
    }
})