/**
 * Created by tech on 6/9/2014.
 */

Ext.define('Vega.store.Components', {
    extend: 'Ext.data.Store',
    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    alias: 'store.Components',

    fields: [{
        name: 'descript',
        sortType: 'asUCString'
    },{
        name: 'text',
        sortType: 'asUCString'
    },{
        name: 'label',
        sortType: 'asUCString'
    }],

    storeId: 'Components',

    pageSize: 0,
    autoLoad: true,

    //remoteFilter: true,
    //remoteSort: true,
    //numFromEdge: 5,
    //trailingBufferZone: 100,
    //leadingBufferZone: 100,

    proxy: {
        type: 'ajax',
        url: '/api/Combos/components',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    listeners: {
        load: function(s){

            memComponents.on('load', function(s){
                //console.log(s.getTotalCount(), s.getData())
            });

            memComponents.getProxy().setData(s.getRange());
            //memComponents.reload();

        }
    }
});

var memComponents = Ext.create('Ext.data.Store', {
    storeId: 'memComponents',
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

