Ext.define('Vega.view.company.board.DefaultModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.board-default',

    requires: [
        'Vega.model.company.tree.Board',
        'Vega.model.company.Board',
        'Vega.model.company.Topic',
        'Vega.model.company.Post'
    ],

    stores: {
        areas: {
            type: 'tree',

            model: 'Vega.model.company.tree.Board',
            // Preload child nodes before expand request
            lazyFill: false,

            listeners: {
                beforeload: function(store, options, e) {
                    //console.log('Before TreeStore Load', store, options);
                    //options.params.node = '0'
                }
            },

            root: {
                text: 'BOARD',
                name: 'root',
                expanded: true
            }
            /*
            root: {
                text: 'Bluprint',
                routeId: 'base',
                expanded: true,
                children: [
                    {
                        leaf: true,
                        text: 'Announcements',
                        routeId: 'board-announcement'
                    },
                    {
                        text: 'Customers',
                        routeId: 'board-customers',
                        expanded: true,
                        children: [
                            {
                                leaf: true,
                                text: 'Vendor Manuals',
                                routeId: 'board-customers-manual'
                            }
                        ]
                    }
                ]
            }
            */
        },

        boards: {
            model: 'Vega.model.company.Board',
            //storeId: 'boards',
            remoteFilter: true,
            //autoLoad: true,
            session: true,
            listeners: {
                beforeload: function(store, options, e) {
                    //console.log('Board store Load', store, options);
                }
            }
        },

        topics: {
            model: 'Vega.model.company.Topic',
            storeId: 'topics',
            session: true,
            remoteFilter: true,
            autoLoad: false,
            listeners: {
                beforeload: 'onBeforeTopicsLoad'
            }
        },

        posts: {
            model: 'Vega.model.company.Post',
            storeId: 'posts',
            remoteFilter: true,
            autoLoad: false
        }
    }
});
