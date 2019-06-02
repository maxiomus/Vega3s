/**
 * Created by tech on 6/11/2014.
 */

Ext.define('Vega.store.RawColors', {
    extend: 'Ext.data.Store',

    fields: ['label', 'text', 'descript'],
    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    pageSize: 0,

    storeId: 'rawColors',
    autoLoad: true,
    remoteFilter: true,

    proxy: {
        type: 'ajax',
        url: '/api/Combos/rawcolors',

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    listeners: {
        load: function(s){
            memRawColors.getProxy().setData(s.getRange());
            //memRawColors.load();
        }
    }
});

var memRawColors = Ext.create('Ext.data.Store', {
    storeId: 'memRawColors',
    pageSize: 50,
    remoteFilter: true,
    proxy: {
        type: 'memory',
        enablePaging: true,
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
