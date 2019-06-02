Ext.define('Vega.view.development.request.FabricModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.development.FabricRequest'
    ],

    alias: 'viewmodel.request-fabric',

    stores: {
        requestfabrics: {
            model: 'development.FabricRequest',
            storeId: "requestfabrics",
            autoLoad: false,

            remoteFilter: true,
            remoteSort: true,
            pageSize: 9999999,

            session: true,

            filters: [{
                property: 'Status',
                value: 'In Progress',
                type: 'string'
            }],

            proxy: {
                type: 'rest',
                url: '/api/FabricRequests',

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                },

                writer: {
                    type: 'json',
                    //clientIdProperty: 'clientId',
                    //writeAllFields: true,
                    allowSingle: false // set false to send a single record in array
                },

                extraParams: {},

                listeners: {
                    exception: function (proxy, response, operation) {

                        Vega.util.Utils.showErrorMsg(response.status.toString() + ' - ' + response.statusText.toString());
                    }
                }
            }
        },

        categories: {
            fields: ['label', 'field'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resource/data/development/request/fabric/categories.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        colors: {
            //fields: ["id", "text"],
            //storeId: 'sizeCat',
            autoLoad: false,
            pageSize: 50,
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
                },

                extraParams: {
                    type: 'FABRICS'
                }
            }
        },

        vendor: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            proxy: {
                type: "ajax",
                url: "/api/Combos/vendors",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data"
                    //totalProperty: "total",
                    //successProperty: "success"
                }
            }
        },

        dept: {
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

        coordinator: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            proxy: {
                type: "ajax",
                url: "/api/Combos/users",
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

        status: {
            fields: ["id", "text"],
            data: [{
                id: 'In Progress', text: 'In Progress'
            },{
                id: 'Complete', text: 'Complete'
            }]
        }
    }

});
