Ext.define('Vega.view.development.style.edit.FormModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.style-edit-form',

    data: {
        current: {
            costSheet: null,
            quote: null
        }
    },

    formulas: {
        isEdit: function(get){
            return get('title').indexOf('Edit') != -1;
        },

        confirmValue: {
            bind: '{theCosting.confirm_yn}',
            get: function(value) {
                return value;
            },
            set: function(value){
                this.set('theCosting.confirm_yn', value ? 'Y' : null);
            }
        },

        marketValue: {
            bind: '{theSample.user3}',
            get: function(value) {
                return value;
            },
            set: function(value){
                this.set('theSample.user3', Ext.Date.format(value, 'Ym'));
            }
        }
    },

    stores: {
        /*
        boms: {
            model: 'Bom',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 0,

            session: true,

            proxy: {
                type: "rest",
                url: "/api/Boms/",
                reader: {
                    type: "json",
                    rootProperty: "data"
                },
                extraParams: {
                    style: '{theSample.style}',
                    color: '{theSample.color}'
                },
                listeners: {

                }},

            sorters:[{
                property: 'rawMaType',
                direction: 'ASC'
            }],

            listeners: {
                //beforeload: "onBeforeLoad",
                //load: "onLoad"
            }
        },
        */

        costsheets: {
            fields: ['label'],
            autoLoad: false
            /*
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/development/sample/costsheets.json',

                reader: {
                    type: 'array'
                }
            }
            */
        },

        labeltypes: {
            fields: ['id', 'text', 'type'],
            autoLoad: false
        },

        tags: {
            fields: ['label', 'field'],
            autoLoad: false
            /*
             pageSize: 0,
             proxy: {
             type: 'ajax',
             url: 'resources/data/development/sample/categories.json',
             reader: {
             type: 'json',
             rootProperty: 'data'
             }
             }
             */
        },

        seasons: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/seasons",
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        customers: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: true,
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

        /*
        bodies: {
            fields: ['id', 'text'],
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
        */

        sizeCats: {
            fields: ["id", "text"],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/sizes',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        warehouses: {
            fields: ['id', 'text'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/warehouses',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        designers: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/designers",
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        rawmattypes: {
            fields: ['id', 'text'],
            //autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/rawmats",
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        fabrictypes: {
            fields: ["id", "text"],
            //storeId: 'type',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/fabrictypes",
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        fabriccontents: {
            fields: ["id", "text"],
            //storeId: 'type',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/fabriccontents",
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

        subdivisions: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/subdivisions",
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        subcategories: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/subcategories",
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        groups: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: true,
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

        vendors: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/vendors",
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        bomnos: {
            fields: ['id', 'text'],
            //autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/bomnos",
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        }
    }

});
