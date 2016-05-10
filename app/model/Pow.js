/**
 * Created by tech on 9/2/2015.
 */
Ext.define('Vega.model.Pow', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'PID', type: 'int'},
        { name: 'PowNo', type: 'string'},
        { name: 'Type', type: 'string'},
        { name: 'Customer', type: 'string'},
        { name: 'Division', type: 'string'},
        { name: 'Descript', type: 'string'},
        { name: 'Link', type: 'string'},
        { name: 'Status', type: 'string'},
        { name: 'UserID', type: 'string'},
        { name: 'CreateOn', type: 'date'},
        { name: 'UpdaterID', type: 'string'},
        { name: 'UpdateOn', type: 'date'},
        { name: 'ConfirmOn', type: 'date'},
        { name: 'ReviseOn', type: 'date'},
        { name: 'CancelOn', type: 'date'},
        { name: 'ParentID', type: 'int'},
        { name: 'Submits', type: 'string'},
        { name: 'visited', type: 'string', persist: false}
    ],

    idProperty: 'PID'
});
