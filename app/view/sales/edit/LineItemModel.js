Ext.define('Vega.view.sales.edit.LineItemModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.sales-edit-lineitem',

    data: {

    },

    links: {
        self : null,
        print : null,
        stone : null,
        trim : null,
        contrast1 : null,
        contrast2 : null,
        contrast3 : null
    },

    stores: {
        powms: {
            model: 'Powm'
        }
    }
});
