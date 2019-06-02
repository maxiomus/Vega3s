Ext.define('Vega.view.development.request.WorkModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.development.WorkRequest'
    ],

    alias: 'viewmodel.request-work',

    stores: {
        requestworks: {
            model: 'development.WorkRequest',

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
                url: '/api/WorkRequests',

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
                        console.log('WorkRequests - Model', response, operation);
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
                url: 'resources/data/development/request/work/categories.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        styles: {
            fields: ['id', 'text'],
            pageSize: 0,
            //remoteFilter: true,
            autoLoad: false,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/styles',

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
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/rawcolors',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        dept: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: true,
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
            //storeId: 'customer',
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

        type: {
            fields: ['id', 'text'],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/development/request/work/workTypes.json'
            }
        },

        priority: {
            fields: ['id', 'text'],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/development/request/work/protoTypes.json'
            }
        },

        samplers: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/samplers",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        coordinator: {
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
        }
    }

});
