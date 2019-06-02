
Ext.define('Vega.store.Lotnos', {
    extend: 'Ext.data.Store',

    fields: ['id', 'label', 'text', 'descript'],

    storeId: 'Lotnos',
    autoLoad: true,
    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: '/api/Combos/lotnos',

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    listeners: {
        load: function(s){
            memLotnos.getProxy().setData(s.getRange());
            //memLotnos.load();
        }
    }
});

var memLotnos = Ext.create('Ext.data.Store', {
    storeId: 'memLotnos',
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