/**
 * Created by tech on 6/11/2014.
 */

Ext.define('Vega.store.Colors', {
    extend: 'Ext.data.Store',

    fields: ['id', 'text'],
    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    pageSize: 0,
    autoLoad: false,

    remoteFilter: true,
    //remoteSort: true

    proxy: {
        type: 'ajax',
        url: '/api/Combos/colors',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
