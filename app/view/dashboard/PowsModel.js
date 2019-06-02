Ext.define('Vega.view.dashboard.PowsModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.dashboard-pows',

    requires: [
        'Vega.model.Pow'
    ],

    stores: {
        Pows: {
            model: 'Vega.model.Pow',
            autoLoad: true,
            proxy: {
                type: 'rest',
                url: '/api/Widgets/pows',
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
                //beforeload: 'onBeforeLoad',
                //load: 'onLoad'
            }
        }
    }

});
