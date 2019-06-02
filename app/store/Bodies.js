Ext.define('Vega.store.Bodies', {
    extend: 'Ext.data.Store',

    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    alias: 'store.Bodies',

    fields: [{
        name: 'id',
        sortType: 'asUCString'
    },{
        name: 'text',
        sortType: 'asUCString'
    }],

    storeId: 'Bodies',

    pageSize: 0,
    remoteFilter: true,
    //remoteSort: true,

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/api/Combos/bodies',

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    listeners: {
        load: function(s){
            memBodies.getProxy().setData(s.getRange());
            //memBodies.load();
        }
    }
});

var memBodies = Ext.create('Ext.data.Store', {
    storeId: 'memBodies',
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