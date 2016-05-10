Ext.define('Vega.model.sales.Powsm', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'smId', type: 'int'},
        {
            name: 'powdId',
            type: 'int',
            reference: {
                type: 'Powd',
                role: 'powdId',
                inverse: 'powms'
            }
        },
        { name: 'submission', type: 'int'}
    ],

    idProperty: 'smId'
});