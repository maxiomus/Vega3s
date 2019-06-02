/**
 * Created by tech on 6/11/2014.
 */

Ext.define('Vega.store.StyleColors', {
    extend: 'Ext.data.Store',

    fields: ['id', 'text'],
    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,

    storeId: 'stColors',

    pageSize: 0,
    autoLoad: true,

    remoteFilter: true,
    //remoteSort: true

    proxy: {
        type: 'ajax',
        url: '/api/Combos/stycolors',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    listeners: {
        load: function(s){
            memStColors.getProxy().setData(s.getRange());
            //memStColors.load();
        }
    }
});

var memStColors = Ext.create('Ext.data.Store', {
    storeId: 'memStColors',
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
