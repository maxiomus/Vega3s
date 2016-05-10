/**
 * Created by tech on 2/17/2015.
 */
Ext.define('Vega.store.Warehouses', {
    extend: 'Ext.data.Store',

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
        url: '/api/Combos/warehouses',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        }
    }

    //remoteSort: true
});
