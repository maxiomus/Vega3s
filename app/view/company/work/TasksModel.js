Ext.define('Vega.view.company.work.TasksModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.work-tasks',

    requires: [
        'Vega.model.company.work.Task'
    ],

    stores: {
        tasks: {
            model: 'company.work.Task',
            remoteFilter: true,
            //autoLoad: true,
            session: true,
            listeners: {
                beforeload: function(store, options, e) {
                    //console.log('Board store Load', store, options);
                }
            }
        }
    }

});
