/**
 * Created by tech on 6/13/2014.
 */

Ext.define('Vega.model.fabric.RollDetail', {
    extend: 'Vega.model.Base',

    requires: [
        'Ext.data.identifier.Negative'
    ],

    //identifier: 'sequential', 1, 2, 3...
    identifier: 'negative', // -1, -2, -3...
    clientIdProperty: 'clientId',

    fields: [
        //{ name: 'uid', type: 'int', mapping: 'id', allowNull: true},
        { name: 'poclid', type: 'int'},
        { name: 'pono', type: 'int'},
        { name: 'status', type: 'string'},
        { name: 'checkStatus', type: 'boolean'},
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'lotno', type: 'string'},
        { name: 'rollno', type: 'string'},
        { name: 'inventoryId', type: 'int'},
        { name: 'unit1', type: 'number'},
        { name: 'alloc_qty_total', type: 'number'},
        { name: 'alloc_qty', type: 'number'},
        { name: 'actual_yn', type: 'string'},
        { name: 'cuttable', type: 'string'},
        { name: 'prelimL', type: 'string'},
        { name: 'prelimL_per', type: 'string'},
        { name: 'prelimW', type: 'string'},
        { name: 'prelimW_per', type: 'string'},
        { name: 'washL', type: 'string'},
        { name: 'washL_per', type: 'string'},
        { name: 'washW', type: 'string'},
        { name: 'washW_per', type: 'string'},
        { name: 'shrinkL', type: 'string'},
        { name: 'shrinkW', type: 'string'},
        { name: 'washname', type: 'string'},
        { name: 'barcode', type: 'string'},
        { name: 'markno', type: 'string'},
        { name: 'memo', type: 'string'}
    ],

    proxy: {
        type: 'rest',

        /*api: {
         create: '/services/RollDetails.ashx?action=create',
         read: '/handlers/rolldetails.hand?action=read',
         update: '/handlers/rolldetails.hand?action=update',
         destroy: '/services/RollDetails.ashx?action=destroy'

         },*/
        batchActions: true,
        timeout: 900000,
        url: '/api/RollDetails',

        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        },

        writer: {
            type: 'json',
            clientIdProperty: 'clientId',
            writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});