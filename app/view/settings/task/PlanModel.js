Ext.define('Vega.view.settings.task.PlanModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.Tnarole'
    ],

    alias: 'viewmodel.task-plan',

    stores: {
        roles: {
            model: 'Tnarole',
            session: true,
            autoLoad: true
        },

        activities: {
            fields: ['id', 'text'],
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
        }
    }
});
