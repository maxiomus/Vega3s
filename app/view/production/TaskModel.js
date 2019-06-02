Ext.define('Vega.view.production.TaskModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.prod-task',

    data: {

    },

    stores: {
        plans: {
            fields: ['id', 'text'],
            //pageSize: 50,
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/plans',
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                refresh: "onPlansRefresh"
            }
        },

        activities: {
            fields: ['id', 'text'],
            storeId: 'activities',
            //pageSize: 50,
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

        users: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "/api/Combos/users",
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total"
                }
            }
        },

        tnaOrders: {
            model: 'TnaOrder',
            autoLoad: false,
            remoteFilter: true
        }
    }

});
