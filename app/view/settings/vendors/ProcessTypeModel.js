Ext.define('Vega.view.settings.vendors.ProcessTypeModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        //'Vega.model.ProcessType'
    ],

    alias: 'viewmodel.vendors-processtype',

    stores: {
        types: {
            model: 'ProcessType',
            autoLoad: true,
            session: true
        },

        processlocs: {
            fields: ["label", "text"],
            //storeId: 'division',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/processlocs",
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        }
    }
});
