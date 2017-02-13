/**
 * Model representing a PowProg object
 */
Ext.define('Vega.model.PowProg', {
    extend: 'Vega.model.Base',

    fields: [
        // id field
        {
            name: 'progId',
            type: 'int',
            useNull : true
        },
        // simple values
        {
            name: 'remarks',
            type: 'string'
        },
        {
            name: 'approved',
            type: 'boolean'
        },
        // relational properties
        {
            name: 'LastProgress',
            type: 'string'
        },
        {
            name: 'NextProgress',
            type: 'string'
        },
        {
            name: 'userId',
            type: 'string'
        },
        {
            name: 'logdate',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'powhId',
            reference: {
                parent: 'Powh',
                //
                //type: 'sales.Powh',
                //association: 'stylesByHeader',
                //role: 'powh',
                inverse: 'powprogs'
            }
        }
    ],

    idProperty: 'progId'
});