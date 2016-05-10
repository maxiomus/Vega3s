Ext.define('Vega.view.reports.inventory.InventoryByLotModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.reports.InventoryByLot'
    ],

    alias: 'viewmodel.inventorybylot',

    stores: {
        'lotnos': {
            fields: ['id', 'text'],

            // allow the grid to interact with the paging scroller by buffering
            //buffered: true,
            pageSize: 100,
            //numFromEdge: 5,
            //trailingBufferZone: 100,
            //leadingBufferZone: 100,
            autoLoad: false,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/lotnos',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total',
                    successProperty: 'success'
                }
            },

            remoteFilter: true
        },
        'inventories': {
            model: 'reports.InventoryByLot',

            storeId: 'inventories',
            //buffered: true,
            pageSize: 9999999,
            autoLoad: false,

            remoteFilter: true,
            remoteSort: true,

            proxy: {
                type: 'rest',
                url: '/api/InventoryByLots',
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
                beforeload: 'onBeforeStoreLoad'
            }
        }
    }

});
