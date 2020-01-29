Ext.define('Vega.view.company.work.DefaultModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.work-default',

    stores: {
        users: {
            fields: ["id", "text"],
            autoLoad: false
        }
    }

});
