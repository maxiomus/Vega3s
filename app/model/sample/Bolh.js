Ext.define('Vega.model.sample.Bolh', {
    extend: 'Vega.model.Base',

    fields: [
        {
            name: 'id'
            /*
            calculate: function(data){
                return Ext.String.trim(data.style) + '-' + Ext.String.trim(data.color) + '-' + data.bomno;
            }
            */
        },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'bomno', type: 'int' },
        { name: 'ProcessType', type: 'string' },
        { name: 'TotalCost', type: 'number' },
        { name: 'for_allstyle', defaultValue: 'N' },
        { name: 'createUser', type: 'string' },
        { name: 'createTime', type: 'date', dateFormat: 'c' },
        { name: 'updateUser', type: 'string', allowNull: true },
        { name: 'updateTime', type: 'date', dateFormat: 'c' },
        { name: 'userId', type: 'string', mapping: 'createUser', persist: false},
        {
            name: 'bomhId',
            //reference: 'sample.bolh',
            reference: {
                parent: 'sample.Bomh',
                //association: '',
                field: 'id',
                //role: 'bomh',
                inverse: 'bolhs'
            }
        }

    ],

    //idProperty: 'bolhId',
    //identifier: 'negative',
    //clientIdProperty: 'clientId',
    autoLoad: false,

    validators: {
        style: 'presence',
        color: 'presence',
        bomno: 'presence',
        ProcessType: 'presence'
    },

    proxy: {
        type: 'rest',
        url: '/api/Bolh',

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

        extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('Bolh - Model', response, operation);
            }
        }
    }
});
