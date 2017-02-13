Ext.define('Vega.view.development.sample.edit.FormModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sample-edit-form',

    formulas: {

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
                    style: '{theStyle.style}',
                    color: '{theStyle.color}'
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

        seasons: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: true,
            remoteFilter: false,
            proxy: {
                type: "ajax",
                url: "/api/Combos/seasons",
                pageParam: '',
                startParam: '',
                limitParam: '',
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
            remoteFilter: false,
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

        sizeCats: {
            fields: ["id", "text"],
            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/sizes',
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        warehouses: {
            fields: ['id', 'text'],
            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/warehouses',
                pageParam: '',
                startParam: '',
                limitParam: '',
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
            remoteFilter: false,
            proxy: {
                type: "ajax",
                url: "/api/Combos/designers",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        rawmattypes: {
            fields: ['id', 'text'],
            proxy: {
                type: "ajax",
                url: "/api/Combos/rawmats",
                pageParam: '',
                startParam: '',
                limitParam: '',
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
            proxy: {
                type: "ajax",
                url: "/api/Combos/fabrictypes",
                pageParam: '',
                startParam: '',
                limitParam: '',
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
            proxy: {
                type: "ajax",
                url: "/api/Combos/fabriccontents",
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
                url: "/api/Combos/divisions",
                pageParam: '',
                startParam: '',
                limitParam: '',
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
            proxy: {
                type: "ajax",
                url: "/api/Combos/subdivisions",
                pageParam: '',
                startParam: '',
                limitParam: '',
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
            proxy: {
                type: "ajax",
                url: "/api/Combos/groups",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        processtypes: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "/api/Combos/processtypes",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        }
    }

});
