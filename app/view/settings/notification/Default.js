
Ext.define('Vega.view.settings.notification.Default',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Vega.view.settings.notification.DefaultController',
        'Vega.view.settings.notification.DefaultModel'
    ],

    alias: 'widget.notification-default',

    controller: 'notification-default',
    viewModel: {
        type: 'notification-default'
    },

    title: 'Notification',

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
            items: []
        });

        me.callParent(arguments);
    }
});
