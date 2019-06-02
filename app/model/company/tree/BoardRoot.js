/**
 * Created by tech on 5/21/2019.
 */
Ext.define('Vega.model.company.tree.BoardRoot', {
    extend: 'Ext.data.TreeModel',

    childType: 'Vega.model.company.tree.Board',

    entityName: 'BoardRoot',

    fields: [ 'id',
        { name: 'name', convert: undefined }
    ]

    /*
    Uncomment to add validation rules
    validators: {
        age: 'presence',
        name: { type: 'length', min: 2 },
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
    }
    */

    /*
    Uncomment to add a rest proxy that syncs data with the back end.
    proxy: {
        type: 'rest',
        url : '/users'
    }
    */
});