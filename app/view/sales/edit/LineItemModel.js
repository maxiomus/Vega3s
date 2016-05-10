Ext.define('Vega.view.sales.edit.LineItemModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.sales-edit-lineitem',

    data: {

    },

    links: {
        detail: {
            type: 'sales.Powd',
            create: true
        },
        self : null,
        print : null,
        stone : null,
        trim : null,
        contrast1 : null,
        contrast2 : null,
        contrast3 : null
    },

    formulas: {
        // used to enable/disalbe form buttons
        dirty: {
            bind: {
                bindTo: '{powm}',
                deep: true
            },
            get: function(data){
                return data ? data.dirty: false;
            }
        }
    },

    stores: {
        powms: {
            model: 'sales.Powm',
            data: [
                {itemId: -1, matcatetory: 'SELF', mattype: 'FABRICS'},
                {itemId: -2, matcatetory: 'PRINT', mattype: 'PRINTS'},
                {itemId: -3, matcatetory: 'TRIM', mattype: 'TRIMS'},
                {itemId: -4, matcatetory: 'STONE', mattype: 'STONE'},
                {itemId: -5, matcatetory: 'CONTRAST1', mattype: 'FABRICS'},
                {itemId: -6, matcatetory: 'CONTRAST2', mattype: 'FABRICS'},
                {itemId: -7, matcatetory: 'CONTRAST3', mattype: 'FABRICS'}
            ]
        }
    }
});
