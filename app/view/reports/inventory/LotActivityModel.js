Ext.define('Vega.view.reports.inventory.LotActivityModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.reports.Transaction'
    ],

    alias: 'viewmodel.lotactivity',

    stores: {
        'lotnos': {
            fields: ['label', 'text', 'descript'],
            // allow the grid to interact with the paging scroller by buffering
            //buffered: true,
            pageSize: 100,
            //numFromEdge: 5,
            //trailingBufferZone: 100,
            //leadingBufferZone: 100,
            autoLoad: false,
            remoteFilter: true,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/lotnos',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total',
                    successProperty: 'success'
                }
            }
        },
        'transactions': {

            model: 'reports.Transaction',

            //buffered: false,
            storeId: 'transactions',
            pageSize: 999999,
            //leadingBufferZone: 100,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'rest',
                url: '/api/LotActivity',
                //format: 'hand',

                // Parameter name to send filtering information in
                pageParam: '',
                startParam: '',
                limitParam: '',
                filterParam: 'filter',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },

            listeners: {
                //beforeload: 'onBeforeStoreLoad'
            }
        }
    }

});
