Ext.define('Vega.view.sales.edit.FormModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        //'Vega.model.Powh',
        //'Vega.model.Powd',
        //'Vega.model.Powm',
        'Vega.model.sales.File'
    ],

    alias: 'viewmodel.sales-edit-form',

    stores: {
        fileStore: {
            model: 'Vega.model.Media'
        },

        categories: {
            fields: ['id', 'name'],
            proxy: {
                type: 'ajax',
                url: 'data/categories.json'
            }
        },

        factories: {
            fields: ["id", "text"],
            //storeId: 'factories',
            proxy: {
                type: 'ajax',
                url: 'data/factories.json'
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

        users: {
            fields: ['id', 'text'],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/api/Options/users',
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        activities: {
            fields: ['id', 'text'],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/api/Options/activities',
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        customers: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: true,
            remoteFilter: false,
            proxy: {
                type: "ajax",
                url: "/api/Options/customers",
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
            fields: ["id", "text"],
            //storeId: 'type',
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "/api/Options/ordertypes",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        divisions: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "/api/Options/divisions",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        labels: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Options/labels",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        terms: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Options/terms",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        sizeCats: {
            fields: ["id", "text"],
            //storeId: 'sizeCat',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/api/Options/sizes',
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        vendors: {
            fields: ['id', 'text'],

            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/vendors',
                pageParam: null,
                startParam: null,
                limitParam: null,
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

        cboColors: {
            fields: ['id', 'text'],
            //pageSize: 100,
            //remoteFilter: true,
            autoLoad: false,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/stycolors',
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

                /*
                pageParam: '',
                startParam: '',
                limitParam: '',
                */
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
        }
    },

    formulas: {
        // used to enable/disalbe form buttons
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
                this.set('header.salescontact', value.salescontact.toString());
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
                this.set('header.submissions', value.submissions.toString());
            }
        }
    }
});
