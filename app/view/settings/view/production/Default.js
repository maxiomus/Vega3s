
Ext.define('Vega.view.settings.view.production.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'Vega.view.settings.view.production.DefaultController',
        'Vega.view.settings.view.production.DefaultModel'
    ],

    alias: 'widget.view-production-default',

    controller: 'view-production-default',
    viewModel: {
        type: 'view-production-default'
    }
});
