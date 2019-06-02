/**
 * Created by tech on 5/4/2015.
 */
Ext.define('Vega.model.settings.users.Role', {
    extend: 'Vega.model.Base',

    fields: [
        {
            name: 'RoleId',
            type: 'string'
        },
        {
            name: 'RoleName',
            type: 'string'
        }
    ],

    idProperty: 'RoleId'
});