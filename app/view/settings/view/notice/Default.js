
Ext.define('Vega.view.settings.view.notice.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'Vega.view.settings.view.notice.DefaultController',
        'Vega.view.settings.view.notice.DefaultModel'
    ],

    alias: 'widget.view-notice-default',

    controller: 'view-notice-default',
    viewModel: {
        type: 'view-notice-default'
    }
});
