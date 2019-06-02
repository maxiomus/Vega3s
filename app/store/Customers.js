/**
 * Created by tech on 6/11/2014.
 */
Ext.define('Vega.store.Customers', {
    extend: 'Ext.data.Store',

    fields: ['id', 'text'],

    storeId: 'Customers',
    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    autoLoad: true,
    pageSize: 0,

    proxy: {
        type: 'ajax',
        url: '/api/Combos/customers',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
