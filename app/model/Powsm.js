Ext.define('Vega.model.Powsm', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'smId', type: 'int'},
        { name: 'submission', type: 'int'},
        {
            name: 'powdId',
            type: 'int'
            /*
             reference: {
             type: 'Powd',
             role: 'powdId',
             inverse: 'powms'
             }
             */
        }
    ],

    idProperty: 'smId'
});