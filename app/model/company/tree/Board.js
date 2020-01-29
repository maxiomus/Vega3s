/**
 * Created by tech on 5/21/2019.
 */
Ext.define('Vega.model.company.tree.Board', {
    extend: 'Ext.data.TreeModel',

    childType: 'Vega.model.company.tree.BoardTopic',

    entityName: 'Board',

    //idProperty: 'name',
    /*
    identifier: {
        type: 'sequential',
        seed: 1,
        prefix: 'Board_'
    },
    */

    fields: [ 'id',
        { name: 'name', convert: undefined },
        { name: 'text', mapping: 'name', type: 'string', persist: false },
        { name: 'desc', type: 'string' },
        { name: 'status' },
        { name: 'routeId', mapping: 'name', type: 'string', persist: false }
    ],

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

    proxy: {
        type: 'ajax',
        url: '/api/BoardTree',
        reader: {
            type: 'json',
            typeProperty: 'mtype',
            rootProperty: 'data'
        }
    }
});