Ext.define('Vega.model.TnaOrder', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'tnaId', type: 'int'},
        //{ name: 'roleId', type: 'int'},
        { name: 'powdId', type: 'int'},
        { name: 'activity', type: 'string'},
        { name: 'descript', type: 'string'},
        { name: 'due', type: 'date', dateFormat: 'c'},
        { name: 'responder', type: 'string'},
        { name: 'priority', type: 'int'},
        { name: 'duration', type: 'int'},
        { name: 'remind', type: 'date', dateFormat: 'c'},
        { name: 'eta', type: 'date', dateFormat: 'c'},
        { name: 'sent', type: 'date', dateFormat: 'c'},
        { name: 'complete', type: 'date', dateFormat: 'c'},
        { name: 'remarks', type: 'string'},
        { name: 'lineseq', type: 'int', persist: false,
            calculate: function(data){
                return data.priority / 10;
            }
        }
    ],

    idProperty: 'tnaId',
    //identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/api/TnaOrder',

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
});
