Ext.define('Vega.model.settings.users.User', {
    extend: 'Vega.model.Base',

    fields: [
        {name: 'UserId', type: 'auto'},
        {name: 'FullName', type: 'string' //persist: false,
            /*convert: function (v, record) {
                return record.get('FirstName') + ' ' + record.get('LastName');
            }*/
        },
        {name: 'FirstName', type: 'string'},
        {name: 'LastName', type: 'string'},
        {name: 'UserName', type: 'string'},
        {name: 'Password', type: 'string'},
        {name: 'Email', type: 'string'},
        {name: 'EmailPass', type: 'string'},
        {name: 'IsApproved', type: 'boolean' },
        {name: 'IsLockedOut', type: 'boolean' },
        {name: 'CreateDate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d', persist: false},
        {name: 'LastLoginDate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d', persist: false},
        {name: 'LastActivityDate', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d', persist: false},
        {name: 'IsOnline', type: 'boolean', persist: false},
        {name: 'IsADUser', type: 'boolean'},
        {name: 'RemoteAccess', type: 'boolean'},
        {name: 'Department', type: 'string'},
        {name: 'Office', type: 'string'},
        {name: 'Roles', type: 'auto'}
    ],

    idProperty: 'UserId',
    //identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/api/Users",

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: "json",
            rootProperty: "data"
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }

});
