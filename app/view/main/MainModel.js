Ext.define('Vega.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        currentView: null,
        currentUser: null,
        currentSetting: null
    },

    stores: {
        /*
        categories: {
            fields: ["label", "field"],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'data/sales/categories.json'
            }
        },

        dept: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: true,
            pageSize: 999,
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
            //storeId: 'customer',
            autoLoad: false,
            proxy: {
                type: "ajax",
                url: "/api/Combos/customers",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        status: {
            fields: ["id", "text"],
            //storeId: 'powStatus',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'data/powStatus.json'
            }
        },

        type: {
            fields: ["id", "text"],
            //storeId: 'type',
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "/api/Combos/ordertypes",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        division: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "/api/Combos/divisions",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        }

        setting: {
            model: 'Vega.model.settings.Options',
            autoLoad: true,
            proxy: {
                type: 'rest',
                url: '/api/Settings',
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        }
        */
    }
});
