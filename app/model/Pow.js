/**
 * Created by tech on 9/2/2015.
 */
Ext.define('Vega.model.Pow', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'powhId', type: 'int'},
        { name: 'powno', type: 'string'},
        { name: 'revision', type: 'string'},
        { name: 'ordertype', type: 'string'},
        { name: 'customer', type: 'string'},
        { name: 'division', type: 'string'},
        { name: 'comments', type: 'string'},
        { name: 'link', type: 'string'},
        { name: 'status', type: 'string'},
        { name: 'userId', type: 'string'},
        { name: 'createdon', type: 'date'},
        { name: 'updatedby', type: 'string'},
        { name: 'updatedon', type: 'date'},
        { name: 'confirmon', type: 'date'},
        { name: 'reviseon', type: 'date'},
        { name: 'cancelon', type: 'date'},
        { name: 'submits', type: 'string'},
        { name: 'visited', type: 'string', persist: false}
    ],

    idProperty: 'powhId'
});
