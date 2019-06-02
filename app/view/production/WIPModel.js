Ext.define('Vega.view.production.WIPModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.production.WIP',
        'Ext.data.BufferedStore',
        'Ext.data.proxy.Rest',
        'Ext.data.proxy.LocalStorage'
    ],

    alias: 'viewmodel.prod-wip',

    data: {
        cbCache: null
    },

    stores: {
        wips: {
            model: "production.WIP",
            //storeId: "wips",
            //type: 'buffered',
            autoLoad: false,

            //remoteFilter: true,
            //remoteSort: true,

            pageSize: 999999,
            /*
            filters: [{
                property: 'poh_status',
                value: 'Open',
                type: 'string'
            }],
            */

            listeners: {
                beforeload: {
                    fn: 'onBeforeStoreLoad'
                    //single: true,
                }
            }
        },

        tasks: {
            model: 'production.Task',
            autoLoad: false,

            remoteFilter: true
            //remoteSort: true,
        },

        cpos: {
            model: 'production.ChildPO',
            autoLoad: false,

            remoteFilter: true,
            //remoteSort: true,

            listeners: {
                beforeload: 'onChildStoreBeforeLoad'
            }
        },

        activities: {
            fields: ['id', 'text'],
            //pageSize: 50,
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/activities',

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
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
                    rootProperty: "data",
                    totalProperty: "total",
                    successProperty: "success"
                }
            }
        },

        processtype: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            proxy: {
                type: "ajax",
                url: "/api/Combos/processtypes",

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

        poh_status: {
            fields: ["id", "text"],
            data: [
                {"id":"Open", "text":"Open"},
                {"id":"Closed", "text": "Closed"}
            ]
        },

        categories: {
            fields: ["label", "field"],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/production/categories.json'
            }
        }
    }

});
