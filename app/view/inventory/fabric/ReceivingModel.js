Ext.define('Vega.view.inventory.fabric.ReceivingModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.receiving',

    requires: [
        'Vega.model.Poh',
        'Vega.model.fabric.PoDetail',
        'Vega.model.fabric.PoReceiving',
        'Ext.data.proxy.Ajax'
    ],

    data: {

    },

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

            remoteFilter: true,
            listeners: {
                beforeload: 'onLotnosBeforeload'
            }
        },
        'rolls': {
            fields: ['id', 'text'],

            autoLoad: false,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/rolls',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total',
                    successProperty: 'success'
                }
            },

            remoteFilter: true,
            listeners: {
                beforeload: 'onRollsBeforeload'
            }
        },
        'pohs': {
            model: 'Poh',

            storeId: 'pohs',
            autoLoad: false,

            remoteFilter: true,
            remoteSort: true
        },

        'podetails': {
            model: 'fabric.PoDetail',

            //storeId: 'fabricorders',
            autoLoad: false,

            // destroy the store if the grid is destroyed
            //autoDestroy: true,
            remoteSort: true,
            remoteFilter: true
        },

        'poreceivings': {
            model: 'fabric.PoReceiving',
            autoLoad: false,

            //autoDestroy: true,
            remoteSort: true,
            remoteFilter: true
        }
    }

});
