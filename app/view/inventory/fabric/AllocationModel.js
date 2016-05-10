Ext.define('Vega.view.inventory.fabric.AllocationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.allocation',

    requires:[
        'Vega.model.fabric.Requirement',
        'Vega.model.fabric.RollDetail',
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
                load: function(store){
                    console.log('lot store', store);
                }
            }
        },

        'fabricrequirements': {
            model: 'fabric.Requirement',

            //storeId: 'requirements',
            autoLoad: false,
            // destroy the store if the grid is destroyed
            //autoDestroy: true,
            //remoteGroup: false,
            remoteSort: true,
            remoteFilter: true
        },

        'rolldetails': {
            model: 'fabric.RollDetail',

            //storeId: 'rolldetails',
            autoLoad: false,
            // destroy the store if the grid is destroyed
            //autoDestroy: false,
            //remoteGroup: true,
            remoteSort: true,
            groupField: 'lotno'
        }
    }

});
