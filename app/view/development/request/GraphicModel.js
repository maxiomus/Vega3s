Ext.define('Vega.view.development.request.GraphicModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.development.GraphicRequest'
    ],

    alias: 'viewmodel.request-graphic',

    stores: {
        requestgraphics: {
            model: 'development.GraphicRequest',

            autoLoad: false,

            remoteFilter: true,
            remoteSort: true,
            pageSize: 999,

            session: true,
            filters: [{
                property: 'Status',
                value: 'In Progress',
                type: 'string'
            }]
        },

        categories: {
            fields: ['label', 'field'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/development/request/graphic/categories.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        styles: {
            fields: ['id', 'text'],
            //pageSize: 100,
            //remoteFilter: true,
            autoLoad: false,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/styles',
                /*
                 pageParam: '',
                 startParam: '',
                 limitParam: '',
                 */
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        /*
        body: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            proxy: {
                type: "ajax",
                url: "/api/Combos/bodies",

                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total"
                }
            }
        },
        */

        colors: {
            fields: ["id", "text"],
            //storeId: 'sizeCat',
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/rawcolors',
                /*
                 pageParam: '',
                 startParam: '',
                 limitParam: '',
                 */
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        customers: {
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

        types: {
            fields: ['id', 'text'],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/development/request/graphic/types.json'
            }
        },

        coordinators: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/users",
                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total"
                }
            }
        },

        status: {
            fields: ["id", "text"],
            data: [{
                id: 'In Progress', text: 'In Progress'
            },{
                id: 'Complete', text: 'Complete'
            }]
        },

        designers: {
            fields: ["label", "field"],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/development/request/graphic/designers.json'
            }
        }
    }

});
