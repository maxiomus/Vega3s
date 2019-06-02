Ext.define('Vega.view.development.style.SampleModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.sample',

    requires: [
        'Vega.model.sample.Sample',
        'Vega.model.sample.Sil'
    ],

    stores: {

        samples: {
            model: 'sample.Sample',

            storeId: 'samples',
            autoLoad: false,

            //session: true,
            //remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/api/Samples/',
                //url: '../Services/Samples.ashx',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },
            listeners: {
                beforeload: function(s){
                    s.setRemoteFilter(true);
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

        /*
        bodies: {
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

        styles: {
            fields: ['id', 'text'],
            //pageSize: 100,
            //remoteFilter: true,
            autoLoad: false,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/styles',

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        prints: {
            fields: ['id', 'text'],

            autoLoad: true,
            //pageSize: 25,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/components',

                pageParam: '',
                startParam: '',
                limitParam: '',

                extraParams: {
                    type: 'PRINTS'
                },

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        */
    },

    formulas: {
        currentSample: {
            bind: {
                bindTo: '{grid.selection}',
                deep: true
            },

            get: function(sample){
                return sample;
            },

            set: function(sample){
                if(!sample.isModel){
                    sample = this.get('samples').getById(sample);
                }
                this.set('currentSample', sample);
            }
        }
    }

});
