Ext.define('Vega.model.ComponentType', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'code' },
        { name: 'descript', type: 'string' },
        { name: 'typeOrder', type: 'int' },
        { name: 'nonInventory', allowNull: true,
            convert: function(value, rec){
                return value == 'Y' ? 'Y' : null;
            }
        },
        { name: 'nonActualized', allowNull: true,
            convert: function(value, rec){
                return value == 'Y' ? 'Y' : null;
            }
        },
        { name: 'account', type: 'string' },
        { name: 'cs2Cat', type: 'string'}
    ],

    idProperty: 'code',

    validators: {
        code: 'presence',
        typeOrder: 'presence'
    },

    proxy: {
        type: "rest",
        url: "/api/CompTypes/",

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
