Ext.define('Vega.model.Tna', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'tnaId', type: 'int'},
        { name: 'lineseq', type: 'int', persist: false,
            calculate: function(data){
                return data.priority / 10;
            }
        },
        { name: 'customer', type: 'string', allowNull: true },
        { name: 'activity', type: 'string', allowNull: true},
        { name: 'descript', type: 'string', allowNull: true},
        { name: 'duration', type: 'int'},
        { name: 'priority', type: 'int'},
        { name: 'coordinator', type: 'string', allowNull: true},
        { name: 'active', type: 'boolean'},
        {
            name: 'roleId',
            reference: {
                parent: 'Tnarole',
                //
                //type: 'sales.Powh',
                //association: 'stylesByHeader',
                //role: 'tnarole',
                //field: 'roleId',
                inverse: 'tnas'
            }
        }
    ],

    idProperty: 'tnaId',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/api/Tna/',

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
