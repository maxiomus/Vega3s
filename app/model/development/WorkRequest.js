
Ext.define('Vega.model.development.WorkRequest', {
    extend: 'Vega.model.Base',

    fields: [
        { name: 'ID' },
        { name: 'RowNo', type: 'int', allowNull: true },
        { name: 'DSID', type: 'int', allowNull: true },
        { name: 'Due', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d' },
        { name: 'ETA', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d' },
        { name: 'Issued', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d' },
        { name: 'Received', type: 'date', dateFormat: 'c', dateWriteFormat: 'Y-m-d' },
        { name: 'Pow', allowNull: true },
        { name: 'Customer' },
        { name: 'Style', type: 'string', allowNull: true },
        { name: 'Body', type: 'string', allowNull: true },
        { name: 'Fabric', type: 'string', allowNull: true },
        { name: 'Color', type: 'string', allowNull: true },
        { name: 'Descript', type: 'string', allowNull: true },
        { name: 'Dept', type: 'string', allowNull: true },
        { name: 'Coordinator', type: 'string', allowNull: true },
        { name: 'Memo', type: 'string', allowNull: true },
        { name: 'Status', type: 'string', allowNull: true },
        { name: 'Maker', type: 'string', allowNull: true },
        { name: 'Worker', type: 'string', allowNull: true },
        { name: 'Type', type: 'string', allowNull: true },
        { name: 'Active', type: 'bool' },
        { name: 'Priority', type: 'string', allowNull: true },
        { name: 'Complete', type: 'string', allowNull: true },
        { name: 'RequestQty', type: 'string', allowNull: true },
        { name: 'UserID', type: 'string', allowNull: true },
        { name: 'CreatedOn', type: 'date', dateFormat: 'c' },
        { name: 'UpdateUser', type: 'string', allowNull: true },
        { name: 'UpdatedOn', type: 'date', dateFormat: 'c' },
        { name: 'userId', type: 'string', mapping: 'UserID', persist: false}
    ],

    idProperty: 'ID',
    identifier: 'negative',

    validators: {
        Issued: [{
            type: 'presence'
        }],
        Pow: 'presence',
        Customer: 'presence',
        Dept: 'presence',
        Type: 'presence',
        Priority: 'presence',
        RequestQty: 'presence'
    },

    proxy: {
        type: 'rest',
        url: '/api/WorkRequests',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('WorkRequest - Model', response, operation);
            }
        }
    }
});
