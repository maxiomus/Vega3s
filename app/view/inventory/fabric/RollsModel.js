Ext.define('Vega.view.inventory.fabric.RollsModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.fabric.RollInfo'
    ],

    alias: 'viewmodel.fabricrolls',

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
                    rootProperty: 'data'
                }
            },

            remoteFilter: true
        },
        'rolls': {
            model: 'fabric.RollInfo',

            //storeId: 'Rolls',
            //buffered: true,
            //leadingBufferZone: 300,
            autoLoad: false,

            pageSize: 999999,
            //
            //autoDestroy: false,
            autoSync: true,
            //
            remoteFilter: true,
            remoteSort: true,
            //remoteGroup: true,
            // destroy the store if the grid is destroyed
            //sorters: {property: 'logdate', direction: 'DESC'},

            groupField: 'lotno',
            //groupDir: 'DESC',

            proxy: {
                type: 'rest',
                batchActions: true,
                url: '/api/Rolls',
                //appendId: false, // do not append id portion to url.
                //format: 'hand',

                //pageParam: 'page',
                //limitParam: 'limit',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                },

                writer: {
                    type: 'json',
                    writeAllFields: true,
                    allowSingle: false // set false to send a single record in array
                },

                groupParam: 'group',
                sortParam: 'sort',
                // Parameter name to send filtering information in
                filterParam: 'filter'
            }
        }
    }

});
