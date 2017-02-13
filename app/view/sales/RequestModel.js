Ext.define('Vega.view.sales.RequestModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.request',

    data: {
        selectedRequest: null
    },

    stores: {
        requests: {
            model: 'Powh',
            storeId: 'requests',
            autoLoad: false,
            //session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 100,
            filters: [{
                property: 'progress',
                value: 'request',
                type: 'string'
            }]
        },

        factories: {
            fields: ['id', 'label'],
            //storeId: 'factories',
            proxy: {
                type: 'ajax',
                url: 'data/factories.json'
            },
            autoLoad: false
        },

        sales: {
            fields: ['id', 'label'],
            storeId: 'sales',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'data/sales.json'
            },

            listeners: {
                refresh: "onSalesRefresh"
            }
        },

        salescontact: {
            fields: ['id', 'label'],
            storeId: 'salescontact',
            proxy: {
                type: 'ajax',
                url: 'data/sales.json'
            },
            autoLoad: true
        },

        submissions: {
            fields: ['id', 'label'],
            storeId: 'submissions',
            proxy: {
                type: 'ajax',
                url: 'data/submissions.json'
            },
            autoLoad: true
        }
    },

    formulas: {
        /*
        userOwn: {
            bind: '{thePow.userId}',
            get: function(value){
                return value == Vega.user.data.Userid
            }
        }
        */
    }

});
