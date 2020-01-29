Ext.define('Vega.view.company.work.ProcessesModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.work-processes',

    requires: [
        'Vega.model.company.work.Process',
        'Vega.model.company.work.Detail'
    ],

    stores: {
        processes: {
            model: 'company.work.Process',
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
