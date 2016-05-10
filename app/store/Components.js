/**
 * Created by tech on 6/9/2014.
 */

Ext.define('Vega.store.Components', {
    extend: 'Ext.data.Store',

    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    storeId: 'Components',
    fields: ['id', 'text'],

    pageSize: 100,
    //numFromEdge: 5,
    remoteFilter: true,
    //remoteSort: true
    //trailingBufferZone: 100,
    //leadingBufferZone: 100,
    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: '/api/Combos/components',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }

        // Parameter name to send  filtering information in
        //filterParam: 'query',

        //encodeFilters: function(filters) {
        //    return filters[0].value;
        //}
    }
});

