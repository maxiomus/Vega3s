Ext.define('Vega.view.settings.DefaultModel', {
    extend: 'Ext.app.ViewModel',

    requires: [

    ],

    alias: 'viewmodel.settings-default',

    stores: {
        areas: {
            type: 'tree',

            root: {
                text: 'Settings',
                routeId: 'base',
                expanded: true,
                children: [
                    {
                        leaf: true,
                        text: 'Notice',
                        routeId: 'notice-default'
                    },
                    {
                        text: 'Sales',
                        routeId: 'sales-default',
                        //expanded: true,
                        children: [
                            { leaf:true, text: 'Activity', routeId: 'sales-activity' }
                        ]
                    },
                    {
                        leaf: true,
                        text: 'D.A.L',
                        routeId: 'dal-default'
                    },
                    {
                        leaf: true,
                        text: 'Development',
                        routeId: 'development-default'
                    },
                    {
                        leaf: true,
                        text: 'Production',
                        routeId: 'production-default'
                    }
                ]
            }
        },

        coordinator: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "/api/Options/users",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total",
                    successProperty: "success"
                }
            }
        }
    }
});
