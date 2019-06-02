Ext.define('Vega.view.settings.task.ActivityModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.settings.Activity'
    ],

    alias: 'viewmodel.task-activity',

    stores: {
        activities: {
            model: 'settings.Activity',
            autoLoad: true
        }
    }

});
