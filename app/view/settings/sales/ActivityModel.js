Ext.define('Vega.view.settings.sales.ActivityModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.settings.Activity'
    ],

    alias: 'viewmodel.sales-activity',

    stores: {
        activities: {
            model: 'settings.Activity',
            autoLoad: true
        }
    }

});
