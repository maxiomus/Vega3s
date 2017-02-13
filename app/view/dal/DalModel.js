Ext.define("Vega.view.dal.DalModel", {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.Media',
        'Ext.data.proxy.Rest'
    ],

    alias: "viewmodel.dal",

    data: {

    },

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

        sides: {
            fields: ['id', 'text'],
            autoLoad: true,
            //pageSize: 999,
            proxy: {
                type: 'ajax',
                url: 'data/sideTypes.json'
            }
        },

        bomtypes: {
            fields: ["id", "text"],
            autoLoad: true,
            //pageSize: 999,
            proxy: {
                type: "ajax",
                url: "/api/Combos/bomtypes",

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            }
        },

        customers: {
            fields: ["id", "text"],
            autoLoad: true,
            //pageSize: 999,
            proxy: {
                type: "ajax",
                url: "/api/Combos/customers",

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            }
        },

        vendors: {
            fields: ["id", "text"],
            autoLoad: true,
            //pageSize: 999,
            proxy: {
                type: "ajax",
                url: "/api/Combos/vendors",

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            }
        },

        themes: {
            fields: ["id", "text"],

            //pageSize: 999,
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "/api/Combos/themes",

                pageParam: '',
                startParam: '',
                limitParam: '',

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
            //pageSize: 999,
            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/pantones',

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        types: {
            fields: ["id", "text"],
            autoLoad: true,
            //pageSize: 999,
            proxy: {
                type: "ajax",
                url: "/api/Options/types",

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            },

            listeners: {
                refresh: "onTypesRefresh"
            }
        },

        fabricTypes: {
            fields: ['id', 'text'],
            autoLoad: true,
            pageSize: 9999,
            proxy: {
                type: 'ajax',
                url: 'data/dal/fabricTypes.json',

                pageParam: '',
                startParam: '',
                limitParam: ''
            }
        },

        bodyTypes: {
            fields: ['id', 'text'],
            autoLoad: true,
            pageSize: 9999,
            proxy: {
                type: 'ajax',
                url: 'data/dal/bodyTypes.json',

                pageParam: '',
                startParam: '',
                limitParam: ''
            }
        },

        categories: {
            fields: ["id", "text"],
            autoLoad: true,
            pageSize: 9999,
            proxy: {
                type: 'ajax',
                url: 'data/dal/categories.json',

                pageParam: '',
                startParam: '',
                limitParam: ''
            },
            listeners: {load: "onCategoryLoad"}
        },

        dals: {
            model: "Media",
            storeId: "dals",
            session: true,
            autoLoad: false,
            //autoSync: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            isDirty: function(){
                var b=this.getModifiedRecords().length;
                b=b||this.getNewRecords().length;
                b=b||this.getRemovedRecords().length;
                return !!b
            }
        },

        dalsChained: {
            source: "{dals}"
        }
    }
});

