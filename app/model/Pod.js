/**
 * Created by tech on 9/2/2015.
 */
Ext.define('Vega.model.Pod', {
    extend: 'Vega.model.Base',

    fields: [
        {
            name: 'pono',
            type: 'int',
            reference: {
                type: 'Poh',
                role: 'pono',
                inverse: 'pods'
            }
        },
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'bundle', type: 'string'},
        { name: 'pcsPerBundle', type: 'int'},
        { name: 'bundlePerBox', type: 'int'},
        { name: 'pcsPerBox', type: 'int'},
        { name: 'numBox', type: 'int'},
        { name: 'memo', type: 'string'},
        { name: 'unit1', type: 'float'},
        { name: 'unit2', type: 'float'},
        { name: 'unit3', type: 'float'},
        { name: 'unit4', type: 'float'},
        { name: 'unit5', type: 'float'},
        { name: 'unit6', type: 'float'},
        { name: 'unit7', type: 'float'},
        { name: 'unit8', type: 'float'},
        { name: 'unit9', type: 'float'},
        { name: 'unit10', type: 'float'},
        { name: 'unit11', type: 'float'},
        { name: 'unit12', type: 'float'},
        { name: 'unit13', type: 'float'},
        { name: 'unit14', type: 'float'},
        { name: 'unit15', type: 'float'},
        { name: 'unitSum', type: 'float'},
        { name: 'price', type: 'float'},
        { name: 'status', type: 'string'},
        { name: 'SONo', type: 'int'},
        { name: 'id', type: 'int'},
        { name: 'bun1', type: 'int'},
        { name: 'bun2', type: 'int'},
        { name: 'bun3', type: 'int'},
        { name: 'bun4', type: 'int'},
        { name: 'bun5', type: 'int'},
        { name: 'bun6', type: 'int'},
        { name: 'bun7', type: 'int'},
        { name: 'bun8', type: 'int'},
        { name: 'bun9', type: 'int'},
        { name: 'bun10', type: 'int'},
        { name: 'bun11', type: 'int'},
        { name: 'bun12', type: 'int'},
        { name: 'bun13', type: 'int'},
        { name: 'bun14', type: 'int'},
        { name: 'bun15', type: 'int'},
        { name: 'pack', type: 'string'},
        { name: 'ratioID', type: 'int'},
        { name: 'line', type: 'int'},
        { name: 'cancelReason', type: 'string'},
        { name: 'CancelReasonDate', type: 'date'},
        { name: 'descript', type: 'string'},
        { name: 'vendorPart', type: 'string'},
        { name: 'vendorColor', type: 'string'},
        { name: 'warehouse', type: 'string'},
        //{ name: 'etadate', type: 'date'},
        //{ name: 'systemUpdated', type: 'boolean'},
        { name: 'uom', type: 'string'},
        { name: 'season', type: 'string'},
        { name: 'actual_cost', type: 'float'},
        { name: 'act_proc_cost', type: 'float'},
        { name: 'act_bom_cost', type: 'float'},
        { name: 'sodid', type: 'int'},
        { name: 'child_pono', type: 'int'},
        { name: 'child_podid', type: 'int'},
        { name: 'Prof_Group', type: 'string'},
        { name: 'Prof_Code', type: 'string'},
        { name: 'sto_sodid', type: 'int'},
        { name: 'sto_invdid', type: 'int'},
        { name: 'ReturnQty', type: 'float'},
        { name: 'act_assoc_cost', type: 'float'}
    ],
    //remoteGroup: false,

    //belongsTo: 'Poh',

    proxy: {
        type: 'rest',
        url: '/api/Pods',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        },

        // Parameter name to send filtering information in
        filterParam: 'filter'

        /*
        encodeFilters: function(filters) {
            return filters[0].getValue();
        }
        */

    }
});
