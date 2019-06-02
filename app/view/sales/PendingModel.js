Ext.define('Vega.view.sales.PendingModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.pending',

    data: {
        selectedPending: null
    },

    stores: {
        pendings: {
            model: 'Powh',
            storeId: 'pendings',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 99,
            filters: [{
                property: 'progress',
                value: 'pending',
                type: 'string'
            }]
        }

        /*
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
        */
    }

});
