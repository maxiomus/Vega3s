
Ext.define('Vega.view.settings.view.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'Vega.view.settings.view.DefaultController',
        'Vega.view.settings.view.DefaultModel',
        'Vega.view.settings.view.dal.Default',
        'Vega.view.settings.view.development.Default',
        'Vega.view.settings.view.notice.Default',
        'Vega.view.settings.view.production.Default',
        'Vega.view.settings.view.sales.Default'
    ],

    alias: 'widget.view-default',

    controller: 'view-default',
    viewModel: {
        type: 'view-default'
    }
});
