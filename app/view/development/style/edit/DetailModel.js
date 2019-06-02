Ext.define('Vega.view.development.style.edit.DetailModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.style-edit-detail',

    stores: {
        processtypes: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/processtypes",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
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
        },

        processorders: {
            model: 'ProcessOrder',
            autoLoad: true,
            pageSize: 0,
            sorters: [{
                property: 'orderNo',
                direction: 'ASC'
            }]
        }
    }

});
