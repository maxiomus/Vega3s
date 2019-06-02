/**
 * Created by tech on 6/11/2014.
 */
Ext.define('Vega.model.Color', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'code', type: 'string' },
        { name: 'descript', type: 'string' },
        { name: 'nrf', type: 'string' },
        { name: 'edi_descript', type: 'string' },
        { name: 'pfd', allowNull: true,
            convert: function(value, rec){
                return value == 'Y' ? 'Y' : null;
            } },
        { name: 'colorGroup', type: 'string' },
        { name: 'vendor', type: 'string' },
        { name: 'vendor_code', type: 'string' },
        { name: 'inactive_yn', allowNull: true,
            convert: function(value, rec){
                return value == 'Y' ? 'Y' : null;
            } },
        { name: 'cuser', type: 'string' },
        { name: 'updateDate', type: 'date' }
    ],

    idProperty: 'code',

    validators: {
        code: 'presence'
    },

    proxy: {
        type: "rest",
        url: "/api/Colors/",

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
