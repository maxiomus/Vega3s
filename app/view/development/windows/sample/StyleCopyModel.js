Ext.define('Vega.view.development.windows.sample.StyleCopyModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.windows-sample-stylecopy',

    stores: {
        divisions: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/divisions",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        sizeCats: {
            fields: ["id", "text"],
            //storeId: 'sizeCat',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/sizes',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    },

    formulas: {
        onDivision: {
            bind: {
                bindTo: '{selected}',
                deep: true
            },
            get: function(p){
                return p.data.division;
            }
        }
    }
});
