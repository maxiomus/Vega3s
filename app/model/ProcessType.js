Ext.define('Vega.model.ProcessType', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'code', type: 'string' },
        { name: 'descript', type: 'string' },
        { name: 'def', allowNull: true,
            convert: function(value, rec){
                return value == 'Y' ? 'Y' : null;
            } },
        { name: 'line_name_1', type: 'string' },
        { name: 'line_name_2', type: 'string' },
        { name: 'line_name_3', type: 'string' },
        { name: 'line_name_4', type: 'string' },
        { name: 'line_name_5', type: 'string' },
        { name: 'memo', type: 'string' },
        { name: 'house_only', allowNull: true,
            convert: function(value, rec){
                return value == 'Y' ? 'Y' : null;
            } },
        { name: 'cut_po', type: 'string' },
        { name: 'wms_use'}
    ],

    idProperty: 'code',

    /*
    validators: {
        code: 'presence'
    },
    */

    proxy: {
        type: "rest",
        url: "/api/ProcessTypes/",

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
