
Ext.define('Vega.view.settings.company.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'Vega.view.settings.company.DefaultController',
        'Vega.view.settings.company.DefaultModel',
        'Vega.view.settings.company.users.List'
    ],

    alias: 'widget.company-default',

    controller: 'company-default',
    viewModel: {
        type: 'company-default'
    }
});
