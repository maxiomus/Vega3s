
Ext.define('Vega.view.settings.vendors.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'Vega.view.settings.vendors.DefaultController',
        'Vega.view.settings.vendors.DefaultModel',
        'Vega.view.settings.vendors.ProcessLoc',
        'Vega.view.settings.vendors.ProcessOrder',
        'Vega.view.settings.vendors.ProcessType',
        'Vega.view.settings.vendors.VendorType'
    ],

    alias: 'widget.vendors-default',

    controller: 'vendors-default',
    viewModel: {
        type: 'vendors-default'
    }
});
