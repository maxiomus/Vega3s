Ext.define('Vega.store.Pantones', {
    extend: 'Ext.data.Store',

    fields: ['id', 'text'],
    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    pageSize: 999,
    autoLoad: true,

    remoteFilter: false,
    //remoteSort: true

    proxy: {
        type: 'ajax',
        url: '/api/Combos/pantones',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
