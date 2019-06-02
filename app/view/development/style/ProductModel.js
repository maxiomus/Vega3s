Ext.define('Vega.view.development.style.ProductModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.product',

    stores: {

        products: {
            model: 'sample.Sample',

            storeId: 'products',
            autoLoad: false,

            //session: true,
            //remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/api/Products/',
                //url: '../Services/Samples.ashx',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },
            listeners: {
                beforeload: {
                    fn: 'onBeforeStoreLoad'
                }
            }
        },

        categories: {
            fields: ['label', 'field'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/development/sample/categories.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        processtypes: {
            fields: ["id", "text"],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/processtypes",

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            },

            listeners: {
                refresh: "onTypesRefresh"
            }
        },

        vendors: {
            fields: ["id", "text"],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/vendors",

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            }
        },

        groups: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/groups",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        subcategories: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/subcategories",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        }
    }

});
