Ext.define('Vega.view.company.board.PanelModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.company.Topic',
        'Vega.model.company.TopicFile'
    ],

    alias: 'viewmodel.board-panel',

    stores: {
        topics: {
            model: 'company.Topic',
            storeId: 'topics',
            session: true,
            remoteFilter: true,
            autoLoad: true,
            listeners: {
                beforeload: 'onBeforeTopicsLoad'
            }
        }
    }

});
