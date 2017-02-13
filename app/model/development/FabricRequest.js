Ext.define('Vega.model.development.FabricRequest', {
    extend: 'Vega.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],
    fields: [
        { name: 'ID', type: 'int'},
        { name: 'RowNo', type: 'int', allowNull: true },
        { name: 'ETA', type: 'date', dateFormat: 'c'},
        { name: 'Due', type: 'date', dateFormat: 'c'},
        { name: 'Issued', type: 'date', dateFormat: 'c'},
        { name: 'Received', type: 'date', dateFormat: 'c'},
        { name: 'Fabric', type: 'string', allowNull: true},
        { name: 'Color', type: 'string', allowNull: true},
        { name: 'Descript', type: 'string', allowNull: true},
        { name: 'RequestQty', type: 'string', allowNull: true},
        { name: 'Dept', type: 'string', allowNull: true},
        { name: 'Coordinator', type: 'string', allowNull: true},
        { name: 'LotNo', type: 'string', allowNull: true},
        { name: 'Memo', type: 'string', allowNull: true},
        { name: 'Status', type: 'string', allowNull: true},
        { name: 'Vendor', type: 'string', allowNull: true},
        { name: 'PoNo', type: 'string', allowNull: true},
        { name: 'Active', type: 'bool'},
        { name: 'Priority', type: 'string', allowNull: true},
        { name: 'Complete', type: 'string', allowNull: true},
        { name: 'CDate', type: 'date', dateFormat: 'c'},
        { name: 'CUser', type: 'string', allowNull: true},
        { name: 'UDate', type: 'date', dateFormat: 'c'},
        { name: 'MUser', type: 'string', allowNull: true}
    ],

    idProperty: 'ID',
    identifier: 'negative',

    validators: {
        Issued: [{
            type: 'presence'
        }],
        Fabric: 'presence',
        Color: 'presence',
        RequestQty: 'presence',
        Coordinator: 'presence'
    },

    proxy: {
        type: 'rest',
        url: '/api/FabricRequests',

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
                console.log('FabricRequest - Model', response, operation);
            }
        }
    }
})