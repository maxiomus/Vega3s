Ext.define("Vega.view.sales.PowModel", {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.Pow',
        'Ext.data.proxy.Rest',
        'Ext.data.proxy.LocalStorage'
    ],

    alias: "viewmodel.pow",

    data: {
        selectedPows: null
    },

    stores: {
        views: {
            fields: ["id", "pid", "status"],
            proxy: {
                type: "localstorage",
                id: "pow-views"
            }
        },

        pows: {
            model: "Pow",
            storeId: "pows",
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 99,
            proxy: {
                type: "rest",
                url: "/api/Pows/",
                reader: {
                    type: "json",
                    rootProperty: "data"
                },
                listeners: {

                }},

            listeners: {
                beforeload: "onBeforeLoad",
                load: "onLoad"
            },

            isDirty:function(){
                var b = this.getModifiedRecords().length;
                b = b || this.getNewRecords().length;
                b = b || this.getRemovedRecords().length;
                return !!b;
            }
        },

        previews: {

        },

        category: {
            fields: ["label", "field"],
            data: [{
                label: "P.O.W #",
                field: "PowNo"
            },
            {
                label: "Customer",
                field: "Customer"
            },
            {
                label: "Status",
                field: "Status"
            },
            {
                label: "Type",
                field: "Type"
            },
            {
                label: "Division",
                field: "Division"
            },
            {
                label: "Desc",
                field: "Descript"
            },
            {
                label: "User",
                field: "UserID"
            }],
            listeners: {

            }
        },

        factories: {
            fields: ['value', 'label'],
            storeId: 'sales',
            proxy: {
                type: 'ajax',
                url: 'data/sales.json'
            },
            autoLoad: false
        },

        sales: {
            fields: ['id', 'label'],
            storeId: 'sales',
            proxy: {
                type: 'ajax',
                url: 'data/sales.json'
            },
            autoLoad: true
        },

        submissions: {
            fields: ['id', 'label'],
            storeId: 'submissions',
            proxy: {
                type: 'ajax',
                url: 'data/submissions.json'
            },
            autoLoad: true
        },

        status: {
            fields: ["id", "label"],
            storeId: 'powStatus',
            proxy: {
                type: 'ajax',
                url: 'data/powStatus.json'
            }
        },

        customer: {
            fields: ["id", "text"],
            storeId: 'customer',
            autoLoad: false,
            proxy: {
                type: "ajax",
                url: "/api/Options/customers",
                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total",
                    successProperty: "success"
                }
            }
        },

        type: {
            fields: ["id", "text"],
            storeId: 'type',
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
            storeId: 'division',
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

        sizeCat: {
            fields: ["id", "text"],
            storeId: 'sizeCat',
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/api/Options/sizes',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        powsChained: {
            source: "{pows}"
        }
    }
});
