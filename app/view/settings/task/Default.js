
Ext.define('Vega.view.settings.task.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'Vega.view.settings.task.DefaultController',
        'Vega.view.settings.task.DefaultModel',
        'Vega.view.settings.task.Plan',
        'Vega.view.settings.task.Activity'
    ],

    alias: 'widget.task-default',

    controller: 'task-default',
    viewModel: {
        type: 'task-default'
    },

    initComponent: function(c){
        var me = this;

        me.callParent(arguments);
    }
});
