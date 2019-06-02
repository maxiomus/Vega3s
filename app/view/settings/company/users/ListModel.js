Ext.define('Vega.view.settings.company.users.ListModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.settings.users.User'
    ],

    alias: 'viewmodel.users-list',

    stores: {
        users: {
            model: 'settings.users.User',
            autoLoad: true
        }
    }
});
