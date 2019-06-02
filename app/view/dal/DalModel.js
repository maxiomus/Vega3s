Ext.define("Vega.view.dal.DalModel", {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.Media',
        'Ext.data.proxy.Rest'
    ],

    alias: "viewmodel.dal",

    formulas: {
        currentComp: {
            bind: '{components.selection}',
            get: function(comp){
                this.set('current.component', comp);
                return comp;
            }
        }
    },

    filters: {
        all: ["Body", "Photos", "Prints"],
        body: ["Body"],
        photos: ["Photos"],
        prints: ["Prints"]
    },

    stores: {
        /*
        bodies: {
            fields: ['id', 'text'],
            pageSize: 25,
            //remoteFilter: true,
            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/bodies',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        */

        categories: {
            fields: ["id", "text"],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/dal/categories.json'
            },
            listeners: {load: "onCategoryLoad"}
        },

        /*
        styles: {
            fields: ['id', 'text'],
            pageSize: 25,
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

        components: {
            fields: ["id", "text"],
            //storeId: 'components',
            pageSize: 25,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/components',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        compColors: {
            fields: ['id', 'text'],
            pageSize: 25,
            //remoteFilter: true,
            autoLoad: false,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/rawcolors',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        */

        customers: {
            fields: ["id", "text"],
            autoLoad: true,
            //pageSize: 999,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/customers",
                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            }
        },

        vendors: {
            fields: ["id", "text"],
            autoLoad: true,
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

        themes: {
            fields: ["id", "text"],

            pageSize: 0,
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "/api/Combos/themes",

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            }
        },

        pantones: {
            fields: ['id', 'text'],
            // allow the grid to interact with the paging scroller by buffering
            //buffered: true,
            pageSize: 0,
            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/pantones',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        types: {
            fields: ["id", "text"],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/types",

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            },

            listeners: {
                refresh: "onTypesRefresh"
            }
        },

        sides: {
            fields: ['id', 'text'],
            autoLoad: false
        },

        fabricTypes: {
            fields: ['id', 'text'],
            autoLoad: false
        },

        bodyTypes: {
            fields: ['id', 'text'],
            autoLoad: false
            /*
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "resources/data/dal/bodyTypes.json",

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            }
            */
        },

        bomtypes: {
            fields: ["id", "text"],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/Combos/bomtypes",

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            }
        },

        dals: {
            model: "Media",
            storeId: "dals",
            session: true,
            autoLoad: false,
            //autoSync: true,
            //remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            listeners: {
                beforeload: function(s){
                    s.setRemoteFilter(true);
                }
            },

            isDirty: function(){
                var b=this.getModifiedRecords().length;
                b=b||this.getNewRecords().length;
                b=b||this.getRemovedRecords().length;
                return !!b;
            }
        },

        dalsChained: {
            source: "{dals}"
        }
    }
});
