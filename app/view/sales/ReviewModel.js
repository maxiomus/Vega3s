Ext.define('Vega.view.sales.ReviewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.review',

    data: {
        selectedReview: null
    },

    stores: {
        reviews: {
            model: 'Powh',
            storeId: 'reviews',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 99,
            filters: [{
                property: 'progress',
                value: 'review',
                type: 'string'
            }]
        }

        /*
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
