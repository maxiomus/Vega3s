Ext.define('Vega.view.development.TopBarModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.development-topbar',

    stores: {
        categories: {
            fields: ["label", "field"],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/development/sample/categories.json'
            }
        },

        dept: {
            fields: ["id", "text"],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/departments",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        customer: {
            fields: ["id", "text"],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/customers",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        status: {
            fields: ["id", "text"],
            //storeId: 'powStatus',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/powStatus.json'
            }
        },

        type: {
            fields: ["id", "text"],
            //storeId: 'type',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/ordertypes",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        division: {
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
        }
    }

});
