/**
 * Created by tech on 6/11/2014.
 */

Ext.define('Vega.store.Colors', {
    extend: 'Ext.data.Store',

    fields: ['id', 'text'],
    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    storeId: 'Colors',

    pageSize: 0,
    autoLoad: true,

    remoteFilter: true,
    //remoteSort: true

    proxy: {
        type: 'ajax',
        url: '/api/Combos/colors',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    listeners: {
        load: function(s){
            memColors.getProxy().setData(s.getRange());
            //memColors.load();
        }
    }
});

var memColors = Ext.create('Ext.data.Store', {
    storeId: 'memColors',
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
