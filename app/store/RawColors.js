/**
 * Created by tech on 6/11/2014.
 */

Ext.define('Vega.store.RawColors', {
    extend: 'Ext.data.Store',

    fields: ['id', 'text'],
    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    //pageSize: 100,

    autoLoad: true,

    //remoteFilter: true,
    //remoteSort: true

    proxy: {
        type: 'ajax',
        url: '/api/Combos/rawcolors',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
