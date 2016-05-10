Ext.define('Vega.model.sales.Powd', {
    extend: 'Vega.model.Base',
    
    fields: [
        { name: 'powdId', type: 'int'},
        { name: 'powhId', type: 'int'},
        {
            name: 'powhId',
            type: 'string',
            reference: {
                type: 'Powh',
                role: 'powhId',
                inverse: 'powds'
            }
        },
        { name: 'revision', type: 'int'},
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'descript', type: 'string'},
        { name: 'prevbody', type: 'string'},
        { name: 'bodyref', type: 'string'},
        { name: 'bodydesc', type: 'string'},
        { name: 'stitchdesc', type: 'string'},
        { name: 'cost', type: 'float'},
        { name: 'price', type: 'float'},
        { name: 'msrp', type: 'float'},
        { name: 'units', type: 'float'},
        { name: 'bodyimgsrc', type: 'string'},
        { name: 'printimgsrc', type: 'string'},
        { name: 'factory', type: 'string'},
        { name: 'userId', type: 'string'},
        { name: 'createdon', type: 'date', convert: df},
        { name: 'updatedby', type: 'string'},
        { name: 'updatedon', type: 'date', convert: df},
        { name: 'fabricby', type: 'date', convert: df},
        { name: 'markerby', type: 'date', convert: df},
        { name: 'pnsby', type: 'date', convert: df},
        { name: 'remarks', type: 'string'}
    ],

    idProperty: 'powdId'
});

function df(value, record){
    return value != undefined ? value.replace(/T.+/,''): '';
};