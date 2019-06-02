/**
 * Created by tech on 11/21/2014.
 */
Ext.define('Vega.model.settings.users.ADUser', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'FirstName', type: 'string'},
        { name: 'MiddleName', type: 'string'},
        { name: 'LastName', type: 'string'},
        { name: 'LoginName', type: 'string'},
        { name: 'LoginNameWithDomain', type: 'string'},
        { name: 'StreetAddress', type: 'string'},
        { name: 'City', type: 'string'},
        { name: 'State', type: 'string'},
        { name: 'PostalCode', type: 'string'},
        { name: 'Country', type: 'string'},
        { name: 'HomePhone', type: 'string'},
        { name: 'Extension', type: 'string'},
        { name: 'Mobile', type: 'string'},
        { name: 'Fax', type: 'string'},
        { name: 'EmailAddress', type: 'string'},
        { name: 'Title', type: 'string'},
        { name: 'Company', type: 'string'},
        { name: 'Manager', type: 'string'},
        { name: 'ManagerName', type: 'string'},
        { name: 'Department', type: 'string'},
        { name: 'Name', type: 'string'},
        { name: 'DisplayName', type: 'string'},
        { name: 'ContainerName', type: 'string'},
        { name: 'UserPricipalName', type: 'string'},
        { name: 'PasswordNeverExpires', type: 'boolean'},
        { name: 'UserCannotChangePassword', type: 'boolean'}

    ],

    idProperty: 'LoginName'
});
