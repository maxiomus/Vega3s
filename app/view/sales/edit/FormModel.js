Ext.define('Vega.view.sales.edit.FormModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.Powh',
        'Vega.model.Powd',
        'Vega.model.Powm',
        'Vega.model.Powlog',
        'Vega.model.Media',
        'Vega.model.sales.File'
    ],

    alias: 'viewmodel.sales-edit-form',

    stores: {
        powlogs: {
            model: 'Powlog',
            storeId: "powlogs",
            autoLoad: false
            //autoSync: true,
            //remoteFilter: true,
            //remoteSort: true,
            //pageSize: 50,
        },

        tnaOrders: {
            model: 'TnaOrder',
            storeId: 'tnaOrders',
            autoLoad: false,
            remoteFilter: true
        },

        fileStore: {
            model: 'Media'
        },

        users: {
            fields: ['id', 'text'],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/users',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        sales: {
            fields: ['id', 'label'],
            autoLoad: false
        },

        submissions: {
            fields: ['id', 'label'],
            autoLoad: false
        },
        /*
        activities: {
            fields: ['id', 'text'],
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
        */

        progress: {
            fields: ["id", "text"],
            autoLoad: false
        },

        subcategories: {
            fields: ['id', 'text', 'type'],
            autoLoad: false
            /*
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "resources/data/sales/subcategories.json",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
            */
        },

        factories: {
            fields: ["id", "text"],
            //storeId: 'factories',
            autoLoad: false
        },

        mills: {
            fields: ["id", "text"],
            autoLoad: false
        },

        powStatus: {
            fields: ["id", "text"],
            //storeId: 'powStatus',
            autoLoad: false
        },

        customers: {
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

        customerDept: {
            fields: ["id", "label", "descript"],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/customerdept',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        types: {
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

        divisions: {
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
        },

        labels: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/labels",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        terms: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/terms",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        sizeCats: {
            fields: ["id", "text"],
            //storeId: 'sizeCat',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/sizes',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }

        /*
        vendors: {
            fields: ['id', 'text'],

            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/vendors',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
                //sortParam: null,
            }
        },

        cboBodies: {
            fields: ['id', 'text'],
            //pageSize: 100,
            //remoteFilter: true,
            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/bodies',
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        cboStyles: {
            fields: ['id', 'text'],
            //pageSize: 100,
            //remoteFilter: true,
            autoLoad: false,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/styles',

                //pageParam: '',
                //startParam: '',
                //limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        cboColors: {
            fields: ['id', 'text'],
            //pageSize: 100,
            //remoteFilter: true,
            autoLoad: false,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/stycolors',

                //pageParam: '',
                //startParam: '',
                //limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        components: {
            fields: [{
                name: 'id',
                sortType: 'asUCString'
            },{
                name: 'text',
                sortType: 'asUCString'
            }],

            autoLoad: false,
            //pageSize: 25,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/components',

                //pageParam: '',
                //startParam: '',
                //limitParam: '',

                extraParams: {
                    type: '{material_category.value}'
                },

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        rawcolors: {
            fields: ["id", "text"],
            //storeId: 'sizeCat',
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/rawcolors',

                //pageParam: '',
                //startParam: '',
                //limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
        */
    },

    formulas: {
        // used to enable/disable form buttons
        dirty: {
            bind: {
                bindTo: '{header}',
                deep: true
            },
            get: function(data){
                return data ? data.dirty: false;
            }
        },

        /*
        isRequest: {
            bind: {
                bindTo: '{header}',
                deep: true
            },
            get: function(powh){
                return powh.data.progress == 'request'
            }
        },

        isPending: {
            bind: {
                bindTo: '{header}',
                deep: true
            },
            get: function(powh){
                return powh.data.progress == 'pending'
            }
        },

        isHeaderValid: {
            bind: {
                bindTo: '{header}',
                deep: true
            },
            get: function(powh){
                return powh.isValid();
            }
        },
        */

        preticketValue: {
            bind: '{header.preticket}',
            get: function(value) {
                return {
                    preticket: value
                };
            },
            set: function(value) {
                this.set('header.preticket', value.preticket);
            }
        },

        ediValue: {
            bind: '{header.edi}',
            get: function(value) {
                return {
                    edi: value
                };
            },
            set: function(value) {
                this.set('header.edi', value.edi);
            }
        },

        salesValue: {
            bind: '{header.sales}',
            get: function(value) {

                if(value != null){
                    var va = value.split(',');
                    return {
                        sales: va
                    };
                }

            },
            set: function(value){
                this.set('header.sales', value.sales);
            }
        },

        contactValue: {
            bind: '{header.salescontact}',
            get: function(value) {

                if(value != null){
                    var va = value.split(',');
                    return {
                        salescontact: va
                    };
                }
            },
            set: function(value){
                this.set('header.salescontact', value.salescontact);
            }
        },

        submissionValue: {
            bind: '{header.submissions}',
            get: function(value) {

                if(value != null){
                    var va = value.split(',');
                    return {
                        submissions: va
                    };
                }
            },
            set: function(value){
                this.set('header.submissions', value.submissions);
            }
        }
    }
});
