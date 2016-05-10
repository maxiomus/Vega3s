Ext.define('Vega.store.search.Results', {
    extend: 'Ext.data.Store',

    alias: 'store.searchresults',

    model: 'Vega.model.search.Result',

    proxy: {
        type: 'ajax',
        url: '~api/search/results',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: 'true',

    sorters: {
        direction: 'ASC',
        property: 'title'
    }
});
