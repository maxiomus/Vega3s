
Ext.define('Vega.view.settings.vendors.ProcessOrder',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Vega.view.settings.vendors.ProcessOrderController',
        'Vega.view.settings.vendors.ProcessOrderModel'
    ],

    alias: 'widget.vendors-processorder',

    controller: 'vendors-processorder',
    viewModel: {
        type: 'vendors-processorder'
    }
});
