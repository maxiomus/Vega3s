Ext.define('Vega.view.inventory.pi.PhysicalModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.Physical'
    ],

    alias: 'viewmodel.physical',

    stores: {
        physicals: {
            model: 'Physical',

            storeId: 'physicals',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/api/Physicals/',
                //url: '../Services/Samples.ashx',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            }
        }
    }
});
