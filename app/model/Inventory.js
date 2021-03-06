
Ext.define('Vega.model.Inventory', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'logno', type: 'int' },
        { name: 'ref', type: 'string' },
        { name: 'logdate', type: 'date' },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'wareHouse', type: 'string' },
        { name: 'unit1', type: 'number' },
        { name: 'unit2', type: 'number' },
        { name: 'unit3', type: 'number' },
        { name: 'unit4', type: 'number' },
        { name: 'unit5', type: 'number' },
        { name: 'unit6', type: 'number' },
        { name: 'unit7', type: 'number' },
        { name: 'unit8', type: 'number' },
        { name: 'unit9', type: 'number' },
        { name: 'unit10', type: 'number' },
        { name: 'unit11', type: 'number' },
        { name: 'unit12', type: 'number' },
        { name: 'unit13', type: 'number' },
        { name: 'unit14', type: 'number' },
        { name: 'unit15', type: 'number' },
        { name: 'unit16', type: 'number' },
        { name: 'unit17', type: 'number' },
        { name: 'unit18', type: 'number' },
        { name: 'unit19', type: 'number' },
        { name: 'unit20', type: 'number' },
        { name: 'unit21', type: 'number' },
        { name: 'unit22', type: 'number' },
        { name: 'unit23', type: 'number' },
        { name: 'unit24', type: 'number' },
        { name: 'unit25', type: 'number' },
        { name: 'unit26', type: 'number' },
        { name: 'unit27', type: 'number' },
        { name: 'unit28', type: 'number' },
        { name: 'unit29', type: 'number' },
        { name: 'unit30', type: 'number' },
        { name: 'totalUnit', type: 'number' },
        { name: 'userName', type: 'string' },
        { name: 'userTime', type: 'date' },
        { name: 'cutno', type: 'int' },
        { name: 'pino', type: 'int' },
        { name: 'damageReason', type: 'string' },
        { name: 'inventoryId', type: 'int' },
        { name: 'po_receive_no', type: 'int' },
        { name: 'pono', type: 'int' },
        { name: 'status', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'bundle', type: 'string' },
        { name: 'pcsPerBundle', type: 'int' },
        { name: 'bundlePerBox', type: 'int' },
        { name: 'pcsPerBox', type: 'int' },
        { name: 'numBox', type: 'int' },
        { name: 'price', type: 'number' },
        { name: 'memo', type: 'string' },
        { name: 'bun1', type: 'int' },
        { name: 'bun2', type: 'int' },
        { name: 'bun3', type: 'int' },
        { name: 'bun4', type: 'int' },
        { name: 'bun5', type: 'int' },
        { name: 'bun6', type: 'int' },
        { name: 'bun7', type: 'int' },
        { name: 'bun8', type: 'int' },
        { name: 'bun9', type: 'int' },
        { name: 'bun10', type: 'int' },
        { name: 'bun11', type: 'int' },
        { name: 'bun12', type: 'int' },
        { name: 'bun13', type: 'int' },
        { name: 'bun14', type: 'int' },
        { name: 'bun15', type: 'int' },
        { name: 'ratioID', type: 'int' },
        { name: 'detaildescr', type: 'string' },
        { name: 'processNo', type: 'int' },
        { name: 'podId', type: 'int' },
        { name: 'previouscolor', type: 'string' },
        { name: 'pocl', type: 'string' },
        { name: 'poclUnit1', type: 'number' },
        { name: 'poclUnit2', type: 'number' },
        { name: 'poclUnit3', type: 'number' },
        { name: 'poclUnit4', type: 'number' },
        { name: 'poclUnit5', type: 'number' },
        { name: 'poclUnit6', type: 'number' },
        { name: 'poclUnit7', type: 'number' },
        { name: 'poclUnit8', type: 'number' },
        { name: 'poclUnit9', type: 'number' },
        { name: 'poclUnit10', type: 'number' },
        { name: 'poclUnit11', type: 'number' },
        { name: 'poclUnit12', type: 'number' },
        { name: 'poclUnit13', type: 'number' },
        { name: 'poclUnit14', type: 'number' },
        { name: 'poclUnit15', type: 'number' },
        { name: 'poclUsed', type: 'string' },
        { name: 'poclStyle', type: 'string' },
        { name: 'poclColor', type: 'string' },
        { name: 'updateDate', type: 'date' },
        { name: 'totalBun', type: 'int' },
        { name: 'alter_pack', type: 'string' },
        { name: 'pr_line', type: 'int' },
        { name: 'pr_orderno', type: 'int' },
        { name: 'vendor', type: 'string' },
        { name: 'prdid', type: 'int' },
        { name: 'damage_pr_line', type: 'int' },
        { name: 'damage_pr_orderno', type: 'int' },
        { name: 'damage_location', type: 'string' },
        { name: 'damage_prdid', type: 'int' },
        { name: 'lotno', type: 'string' },
        { name: 'pr_startdate', type: 'date' },
        { name: 'pr_canceldate', type: 'date' },
        { name: 'pr_finished', type: 'auto' },
        { name: 'pr_no', type: 'int' },
        { name: 'top_due_date', type: 'date' },
        { name: 'pr_issue', type: 'auto' },
        { name: 'pr_issuedate', type: 'date' },
        { name: 'pr_shipto', type: 'string' },
        { name: 'terms', type: 'string' },
        { name: 'shipvia', type: 'string' },
        { name: 'bill_execlude', type: 'auto' },
        { name: 'dmg_short', type: 'auto' },
        { name: 'vscdId', type: 'int' },
        { name: 'mobile_fu', type: 'int' },
        { name: 'poclid', type: 'int' },
        { name: 'adjustment', type: 'auto' },
        { name: 'actual_yn', type: 'auto' },
        { name: 'polid', type: 'int' },
        { name: 'transferno', type: 'int' },
        { name: 'wh_transfer', type: 'auto' },
        { name: 'transfer_id', type: 'int' },
        { name: 'updateUser', type: 'string' },
        { name: 'Prof_Group', type: 'string' },
        { name: 'Prof_Code', type: 'string' },
        { name: 'custom_entry', type: 'string' },
        { name: 'inb_receiveno', type: 'int' },
        { name: 'Bomid', type: 'int' },
        { name: 'Out_allocno', type: 'int' },
        { name: 'yard_base', type: 'auto' },
        { name: 'receiving_loc', type: 'auto' },
        { name: 'userId', type: 'string', mapping: 'userName', persist: false}
    ],

    idProperty: 'inventoryId',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/api/Inventories',

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
                console.log('Inventory - Model', response, operation);
            }
        }
    }
});