Ext.define('Vega.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        currentView: null,
        currentUser: null,
        currentSetting: null
    },

    stores: {
        status: {
            fields: ["id", "text"],
            //storeId: 'powStatus',
            proxy: {
                type: 'ajax',
                url: 'data/powStatus.json'
            }
        },

        customer: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            proxy: {
                type: "ajax",
                url: "/api/Options/customers",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total",
                    successProperty: "success"
                }
            }
        },

        ordertype: {
            fields: ["id", "text"],
            //storeId: 'type',
            autoLoad: false,
            proxy: {
                type: "ajax",
                url: "/api/Options/ordertypes",
                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total",
                    successProperty: "success"
                }
            }
        },

        division: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: false,
            proxy: {
                type: "ajax",
                url: "/api/Options/divisions",
                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total",
                    successProperty: "success"
                }
            }
        },

        progress: {
            fields: ["id", "text"],
            //storeId: 'powStatus',
            proxy: {
                type: 'ajax',
                url: 'data/progress.json'
            }
        },

        salesCategories: {
            fields: ["label", "field"],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'data/sales/category.json'
            }
        },

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
    }
});
