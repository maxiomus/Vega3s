Ext.define('Vega.model.sales.Powm', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'itemId', type: 'int'},
        {
            name: 'powdId',
            type: 'int',
            reference: {
                type: 'Powd',
                role: 'powdId',
                inverse: 'powms'
            }
        },
        { name: 'revision', type: 'int'},
        { name: 'matcategory', type: 'string'},
        { name: 'mattype', type: 'string'},
        { name: 'matcode', type: 'string'},
        { name: 'matcolor', type: 'string'},
        { name: 'matdesc', type: 'string'},
        { name: 'matvendor', type: 'string'},
        { name: 'matcost', type: 'float'},
        { name: 'LINESEQ', type: 'int'}
    ],

    idProperty: 'itemId'
});