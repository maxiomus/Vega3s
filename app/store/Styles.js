Ext.define('Vega.store.Styles', {
    extend: 'Ext.data.Store',

    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    alias: 'store.Styles',

    storeId: 'Styles',
    fields: [{
        name: 'id',
        sortType: 'asUCString'
    },{
        name: 'text',
        sortType: 'asUCString'
    }],

    pageSize: 0,
    remoteFilter: true,
    //remoteSort: true,
    //numFromEdge: 5,
    //trailingBufferZone: 100,
    //leadingBufferZone: 100,
    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: '/api/Combos/styles',

        /*
         pageParam: '',
         startParam: '',
         limitParam: '',
         */

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});