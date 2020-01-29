/**
 * Created by tech on 6/11/2014.
 */

Ext.define('Vega.store.board.Categories', {
    extend: 'Ext.data.Store',

    fields: ['id', 'name'],
    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    storeId: 'boardCategories',

    pageSize: 0,
    autoLoad: true,

    remoteFilter: true,
    //remoteSort: true

    proxy: {
        type: 'ajax',
        url: '/api/Combos/boardcategories',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    listeners: {
        load: function(s){
            memBoardCategories.getProxy().setData(s.getRange());
            //memColors.load();
        }
    }
});

var memBoardCategories = Ext.create('Ext.data.Store', {
    storeId: 'memBoardCategories',
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
