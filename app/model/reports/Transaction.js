Ext.define('Vega.model.reports.Transaction', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'inventoryId', type: 'int' },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'descript', type: 'string' },
        { name: 'rawMatType', type: 'string' },
        { name: 'lotno', type: 'string' },
        { name: 'lotTotal', type: 'float' },
        { name: 'detail', type: 'auto' }
    ],

    hasMany: {model: 'TransactionDetail', name: 'detail'}
});
