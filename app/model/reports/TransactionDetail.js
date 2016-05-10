Ext.define('Vega.model.reports.TransactionDetail', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'logdate', type: 'date' },
        { name: 'trans_type', type: 'string' },
        { name: 'totalUnit', type: 'float' },
        { name: 'price', type: 'float' },
        { name: 'extprice', type: 'float' },
        { name: 'uom', type: 'string' },
        { name: 'wareHouse', type: 'string' },
        { name: 'vendor', type: 'string' },
        { name: 'pono', type: 'int' },
        { name: 'pino', type: 'int' },
        { name: 'poclStyle', type: 'string' },
        { name: 'poclColor', type: 'string' },
        { name: 'actual_yn', type: 'auto' }
    ],

    belongsTo: 'Transaction'
});
