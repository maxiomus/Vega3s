Ext.define('Vega.view.company.board.PostModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.company.Post'
    ],

    alias: 'viewmodel.board-post',

    stores: {

        posts: {
            model: 'company.Post',
            storeId: 'posts',
            remoteFilter: true,
            autoLoad: true,
            listeners: {
                beforeload: 'onBeforePostsLoad'
            }
        }

    }

});
