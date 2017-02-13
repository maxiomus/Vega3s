Ext.define('Vega.view.dashboard.FavoriteModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard-favorite',

    requires: [
        'Vega.model.Bookmark'
    ],

    stores: {
        bookmarks: {
            model: 'Bookmark',
            storeId: 'bookmarks',
            autoLoad: true,
            proxy: {
                type: 'rest',
                url: '/api/Bookmarks',
                //noCache: true,
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                beforeload: 'onBeforeLoad',
                load: 'onLoad'
            }
        }
    }

});
